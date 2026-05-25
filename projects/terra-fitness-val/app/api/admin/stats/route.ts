import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    await requireAdmin()

    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

    const [
      totalUsers,
      totalRevenue,
      activeMemberships,
      pendingPayments,
      monthlyRevenue,
      newUsersThisMonth,
    ] = await Promise.all([
      prisma.user.count({ where: { role: 'USER' } }),
      prisma.payment.aggregate({
        where: { status: 'COMPLETED' },
        _sum: { amount: true },
      }),
      prisma.membership.count({ where: { status: 'ACTIVE' } }),
      prisma.payment.count({ where: { status: 'PENDING' } }),
      prisma.payment.aggregate({
        where: {
          status: 'COMPLETED',
          createdAt: { gte: startOfMonth },
        },
        _sum: { amount: true },
      }),
      prisma.user.count({
        where: {
          role: 'USER',
          createdAt: { gte: startOfMonth },
        },
      }),
    ])

    // Monthly revenue data for chart
    const monthlyData = await prisma.payment.groupBy({
      by: ['month', 'year'],
      where: { status: 'COMPLETED' },
      _sum: { amount: true },
      orderBy: [{ year: 'asc' }, { month: 'asc' }],
      take: 12,
    })

    return NextResponse.json({
      stats: {
        totalUsers,
        totalRevenue: totalRevenue._sum.amount || 0,
        activeMemberships,
        pendingPayments,
        monthlyRevenue: monthlyRevenue._sum.amount || 0,
        newUsersThisMonth,
      },
      monthlyData: monthlyData.map((d) => ({
        month: d.month,
        year: d.year,
        revenue: d._sum.amount || 0,
      })),
    })
  } catch (error: any) {
    if (error.message === 'Forbidden') {
      return NextResponse.json({ error: 'Acceso denegado' }, { status: 403 })
    }
    console.error('Admin stats error:', error)
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 })
  }
}
