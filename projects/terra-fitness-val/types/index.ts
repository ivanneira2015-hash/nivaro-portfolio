export interface User {
  id: string
  email: string
  name: string
  phone?: string
  dni?: string
  role: 'USER' | 'ADMIN'
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED'
  createdAt: Date
}

export interface Membership {
  id: string
  userId: string
  planType: 'BASIC' | 'PREMIUM' | 'ELITE'
  billingPeriod: 'MONTHLY' | 'QUARTERLY' | 'YEARLY'
  price: number
  startDate: Date
  endDate: Date
  status: 'ACTIVE' | 'EXPIRED' | 'CANCELLED' | 'SUSPENDED'
  autoRenew: boolean
  discountApplied: number
  notes?: string
  user?: User
  payments?: Payment[]
}

export interface Payment {
  id: string
  userId: string
  membershipId?: string
  amount: number
  currency: string
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED' | 'CANCELLED'
  method: 'CASH' | 'TRANSFER' | 'CARD' | 'STRIPE' | 'MERCADOPAGO'
  stripePaymentId?: string
  description?: string
  month: number
  year: number
  createdAt: Date
  user?: User
  membership?: Membership
}

export interface Product {
  id: string
  name: string
  description?: string
  price: number
  stock: number
  image?: string
  category: string
  active: boolean
  createdAt: Date
}

export interface Purchase {
  id: string
  userId: string
  total: number
  status: 'COMPLETED' | 'PENDING' | 'CANCELLED'
  createdAt: Date
  items?: PurchaseItem[]
  user?: User
}

export interface PurchaseItem {
  id: string
  purchaseId: string
  productId: string
  quantity: number
  unitPrice: number
  product?: Product
}

export interface DashboardStats {
  totalUsers: number
  totalRevenue: number
  activeMemberships: number
  pendingPayments: number
  monthlyRevenue: number
  newUsersThisMonth: number
}

export interface PlanPricing {
  basic: { monthly: number; quarterly: number; yearly: number }
  premium: { monthly: number; quarterly: number; yearly: number }
  elite: { monthly: number; quarterly: number; yearly: number }
}

export const PLAN_PRICES: PlanPricing = {
  basic: { monthly: 25000, quarterly: 22500, yearly: 20000 },
  premium: { monthly: 35000, quarterly: 31500, yearly: 28000 },
  elite: { monthly: 55000, quarterly: 49500, yearly: 44000 },
}

export const PLAN_FEATURES = {
  basic: [
    'Acceso a sala de musculación',
    'Horario limitado (7-14h)',
    'Vestuarios y duchas',
    'App de seguimiento',
  ],
  premium: [
    'Acceso ilimitado 7-22h',
    'Todas las clases grupales',
    '1 sesión personal/mes',
    'Vestuarios premium',
    'App de seguimiento',
    'Nutrición básica',
  ],
  elite: [
    'Acceso 24/7 con llave',
    'Entrenador personal (4x/mes)',
    'Plan de nutrición completo',
    'Clases exclusivas',
    'Vestuarios VIP',
    'Prioridad en reservas',
  ],
}

export const BILLING_DISCOUNTS = {
  monthly: 0,
  quarterly: 10,
  yearly: 20,
}

export const PLAN_NAMES = {
  basic: 'Básico',
  premium: 'Premium',
  elite: 'Elite',
}

export const BILLING_NAMES = {
  monthly: 'Mensual',
  quarterly: 'Trimestral',
  yearly: 'Anual',
}
