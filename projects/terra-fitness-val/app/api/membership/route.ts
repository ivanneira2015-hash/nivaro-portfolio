import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const user = await requireAuth()
    const { planType, billingPeriod } = await req.json()

    const planPrices: Record<string, Record<string, number>> = {
      basic: { monthly: 25000, quarterly: 22500, yearly: 20000 },
      premium: { monthly: 35000, quarterly: 31500, yearly: 28000 },
      elite: { monthly: 55000, quarterly: 49500, yearly: 44000 },
    }

    const discounts: Record<string, number> = { monthly: 0, quarterly: 10, yearly: 20 }

    const price = planPrices[planType]?.[billingPeriod] || 35000
    const discount = discounts[billingPeriod] || 0

    const now = new Date()
    const endDate = new Date(now)

    if (billingPeriod === 'monthly') endDate.setMonth(endDate.getMonth() + 1)
    else if (billingPeriod === 'quarterly') endDate.setMonth(endDate.getMonth() + 3)
    else if (billingPeriod === 'yearly') endDate.setFullYear(endDate.getFullYear() + 1)

    // Cancel any active membership
    await prisma.membership.updateMany({
      where: { userId: user.id, status: 'ACTIVE' },
      data: { status: 'CANCELLED' },
    })

    const membership = await prisma.membership.create({
      data: {
        userId: user.id,
        planType: planType.toUpperCase(),
        billingPeriod: billingPeriod.toUpperCase(),
        price,
        startDate: now,
        endDate,
        status: 'ACTIVE',
        autoRenew: true,
        discountApplied: discount,
      },
    })

    // Create pending payment
    await prisma.payment.create({
      data: {
        userId: user.id,
        membershipId: membership.id,
        amount: price,
        currency: 'ARS',
        status: 'PENDING',
        method: 'CASH',
        description: `Pago ${billingPeriod} ${planType}`,
        month: now.getMonth() + 1,
        year: now.getFullYear(),
      },
    })

    return NextResponse.json({ membership })
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }
    console.error('Membership API error:', error)
    return NextResponse.json({ error: 'Error al crear membresía' }, { status: 500 })
  }
}
