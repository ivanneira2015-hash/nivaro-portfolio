import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET(req: Request) {
  try {
    await requireAdmin()

    const { searchParams } = new URL(req.url)
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status') || 'all'

    const where: any = { role: 'USER' }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search } },
        { dni: { contains: search } },
      ]
    }

    if (status !== 'all') {
      where.status = status.toUpperCase()
    }

    const users = await prisma.user.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        memberships: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
        payments: {
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
      },
    })

    const usersWithoutPassword = users.map(({ password, ...u }) => u)
    return NextResponse.json({ users: usersWithoutPassword })
  } catch (error: any) {
    if (error.message === 'Forbidden') {
      return NextResponse.json({ error: 'Acceso denegado' }, { status: 403 })
    }
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    await requireAdmin()
    const { id, status, notes } = await req.json()

    const user = await prisma.user.update({
      where: { id },
      data: { status, ...(notes && { name: notes }) },
      select: {
        id: true,
        email: true,
        name: true,
        status: true,
        role: true,
      },
    })

    return NextResponse.json({ user })
  } catch (error: any) {
    if (error.message === 'Forbidden') {
      return NextResponse.json({ error: 'Acceso denegado' }, { status: 403 })
    }
    return NextResponse.json({ error: 'Error al actualizar' }, { status: 500 })
  }
}
