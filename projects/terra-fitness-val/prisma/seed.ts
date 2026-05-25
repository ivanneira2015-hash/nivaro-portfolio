import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@terrafitnessval.com' },
    update: {},
    create: {
      email: 'admin@terrafitnessval.com',
      password: adminPassword,
      name: 'Administrador',
      role: 'ADMIN',
      status: 'ACTIVE',
    },
  })
  console.log('Admin created:', admin.email)

  // Create demo user
  const userPassword = await bcrypt.hash('user123', 10)
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@terrafitnessval.com' },
    update: {},
    create: {
      email: 'demo@terrafitnessval.com',
      password: userPassword,
      name: 'Usuario Demo',
      phone: '11 2345-6789',
      dni: '12345678',
      role: 'USER',
      status: 'ACTIVE',
    },
  })
  console.log('Demo user created:', demoUser.email)

  // Create demo membership
  const now = new Date()
  const endDate = new Date(now)
  endDate.setMonth(endDate.getMonth() + 1)

  const membership = await prisma.membership.create({
    data: {
      userId: demoUser.id,
      planType: 'PREMIUM',
      billingPeriod: 'MONTHLY',
      price: 35000,
      startDate: now,
      endDate: endDate,
      status: 'ACTIVE',
      autoRenew: true,
    },
  })
  console.log('Demo membership created:', membership.planType)

  // Create demo payment
  const payment = await prisma.payment.create({
    data: {
      userId: demoUser.id,
      membershipId: membership.id,
      amount: 35000,
      currency: 'ARS',
      status: 'COMPLETED',
      method: 'TRANSFER',
      description: 'Pago mensual Premium',
      month: now.getMonth() + 1,
      year: now.getFullYear(),
    },
  })
  console.log('Demo payment created:', payment.amount)

  // Create store products
  const products = [
    {
      name: 'Shaker Terra Fitness',
      description: 'Shaker de 700ml con compartimento para suplementos',
      price: 8500,
      stock: 50,
      category: 'accesorios',
      image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400&q=80',
    },
    {
      name: 'Straps de Levantamiento',
      description: 'Straps acolchados para deadlift y dominadas',
      price: 12000,
      stock: 30,
      category: 'accesorios',
      image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&q=80',
    },
    {
      name: 'Cinturón de Cuero',
      description: 'Cinturón de cuero genuino 10mm para powerlifting',
      price: 35000,
      stock: 20,
      category: 'accesorios',
      image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&q=80',
    },
    {
      name: 'Toalla Premium',
      description: 'Toalla microfibra ultra absorbente con logo Terra',
      price: 6500,
      stock: 100,
      category: 'accesorios',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80',
    },
    {
      name: 'Whey Protein 1kg',
      description: 'Proteína de suero de leche sabor chocolate',
      price: 45000,
      stock: 40,
      category: 'suplementos',
      image: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=400&q=80',
    },
    {
      name: 'Creatina Monohidratada 300g',
      description: 'Creatina pura micronizada para rendimiento',
      price: 28000,
      stock: 60,
      category: 'suplementos',
      image: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=400&q=80',
    },
    {
      name: 'Pre-Workout 300g',
      description: 'Energía y focus para tus entrenamientos',
      price: 32000,
      stock: 35,
      category: 'suplementos',
      image: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=400&q=80',
    },
    {
      name: 'BCAA 500g',
      description: 'Aminoácidos ramificados 2:1:1',
      price: 25000,
      stock: 45,
      category: 'suplementos',
      image: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=400&q=80',
    },
    {
      name: 'Remera Terra Fitness',
      description: 'Remera dry-fit con logo Terra, disponible en varios colores',
      price: 15000,
      stock: 80,
      category: 'ropa',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80',
    },
    {
      name: 'Short de Entrenamiento',
      description: 'Short ligero con bolsillo para celular',
      price: 18000,
      stock: 60,
      category: 'ropa',
      image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&q=80',
    },
  ]

  for (const product of products) {
    await prisma.product.upsert({
      where: { id: undefined },
      update: {},
      create: product,
    })
  }
  console.log(`${products.length} products created`)

  console.log('\n✅ Seed completed!')
  console.log('Admin login: admin@terrafitnessval.com / admin123')
  console.log('User login: demo@terrafitnessval.com / user123')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
