import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const user = await requireAuth()

    const fullUser = await prisma.user.findUnique({
      where: { id: user.id },
      include: {
        memberships: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
        payments: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        purchases: {
          orderBy: { createdAt: 'desc' },
          take: 10,
          include: {
            items: {
              include: { product: true },
            },
          },
        },
      },
    })

    if (!fullUser) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
    }

    const { password, ...userWithoutPassword } = fullUser
    return NextResponse.json({ user: userWithoutPassword })
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }
    console.error('Users API error:', error)
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const user = await requireAuth()
    const { name, phone, dni } = await req.json()

    const updated = await prisma.user.update({
      where: { id: user.id },
      data: { name, phone, dni },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        dni: true,
        role: true,
        status: true,
      },
    })

    return NextResponse.json({ user: updated })
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }
    return NextResponse.json({ error: 'Error al actualizar' }, { status: 500 })
  }
}
