import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    await requireAdmin()

    const payments = await prisma.payment.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
        membership: true,
      },
      take: 100,
    })

    return NextResponse.json({ payments })
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
    const { id, status } = await req.json()

    const payment = await prisma.payment.update({
      where: { id },
      data: { status },
    })

    return NextResponse.json({ payment })
  } catch (error: any) {
    if (error.message === 'Forbidden') {
      return NextResponse.json({ error: 'Acceso denegado' }, { status: 403 })
    }
    return NextResponse.json({ error: 'Error al actualizar' }, { status: 500 })
  }
}
