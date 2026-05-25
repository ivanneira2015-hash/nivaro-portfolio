import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const user = await requireAuth()
    const { items } = await req.json()

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Items requeridos' },
        { status: 400 }
      )
    }

    // Verify stock and calculate total
    let total = 0
    const productIds = items.map((i: any) => i.productId)
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    })

    const productMap = new Map(products.map((p) => [p.id, p]))

    for (const item of items) {
      const product = productMap.get(item.productId)
      if (!product) {
        return NextResponse.json(
          { error: `Producto no encontrado: ${item.productId}` },
          { status: 400 }
        )
      }
      if (product.stock < item.quantity) {
        return NextResponse.json(
          { error: `Stock insuficiente: ${product.name}` },
          { status: 400 }
        )
      }
      total += product.price * item.quantity
    }

    // Create purchase and update stock
    const purchase = await prisma.$transaction(async (tx) => {
      const newPurchase = await tx.purchase.create({
        data: {
          userId: user.id,
          total,
          status: 'COMPLETED',
          items: {
            create: items.map((item: any) => ({
              productId: item.productId,
              quantity: item.quantity,
              unitPrice: productMap.get(item.productId)!.price,
            })),
          },
        },
        include: {
          items: {
            include: { product: true },
          },
        },
      })

      // Update stock
      for (const item of items) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        })
      }

      return newPurchase
    })

    return NextResponse.json({ purchase })
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }
    console.error('Purchase error:', error)
    return NextResponse.json({ error: 'Error al procesar compra' }, { status: 500 })
  }
}
