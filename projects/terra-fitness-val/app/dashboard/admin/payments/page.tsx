'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PaymentTable } from '@/components/dashboard/payment-table'
import { StatsCard } from '@/components/dashboard/stats-card'
import {
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  Wallet,
} from 'lucide-react'

interface PaymentData {
  id: string
  amount: number
  currency: string
  status: string
  method: string
  description: string
  month: number
  year: number
  createdAt: string
  user: {
    id: string
    name: string
    email: string
  }
  membership: {
    planType: string
    billingPeriod: string
  } | null
}

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<PaymentData[]>([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState<string | null>(null)

  useEffect(() => {
    fetchPayments()
  }, [])

  async function fetchPayments() {
    try {
      const res = await fetch('/api/admin/payments')
      if (res.ok) {
        const data = await res.json()
        setPayments(data.payments)
      }
    } catch (error) {
      console.error('Error fetching payments:', error)
    } finally {
      setLoading(false)
    }
  }

  async function updatePaymentStatus(paymentId: string, newStatus: string) {
    setUpdating(paymentId)
    try {
      const res = await fetch('/api/admin/payments', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: paymentId, status: newStatus }),
      })

      if (res.ok) {
        fetchPayments()
      }
    } catch (error) {
      console.error('Error updating payment:', error)
    } finally {
      setUpdating(null)
    }
  }

  const completedPayments = payments.filter((p) => p.status === 'COMPLETED')
  const pendingPayments = payments.filter((p) => p.status === 'PENDING')
  const failedPayments = payments.filter((p) => p.status === 'FAILED')
  const totalCompleted = completedPayments.reduce((sum, p) => sum + p.amount, 0)
  const totalPending = pendingPayments.reduce((sum, p) => sum + p.amount, 0)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-2xl font-bold text-text-main">Pagos</h2>
        <p className="text-text-secondary mt-1">
          Gestión de todos los pagos del gimnasio
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total completados"
          value={`$${totalCompleted.toLocaleString('es-AR')}`}
          subtitle={`${completedPayments.length} pagos`}
          icon={DollarSign}
        />
        <StatsCard
          title="Pendientes"
          value={`$${totalPending.toLocaleString('es-AR')}`}
          subtitle={`${pendingPayments.length} pagos por confirmar`}
          icon={Clock}
        />
        <StatsCard
          title="Fallidos"
          value={`${failedPayments.length}`}
          subtitle="requieren atención"
          icon={AlertCircle}
        />
        <StatsCard
          title="Promedio"
          value={`$${completedPayments.length > 0 ? Math.round(totalCompleted / completedPayments.length).toLocaleString('es-AR') : '0'}`}
          subtitle="por pago completado"
          icon={TrendingUp}
        />
      </div>

      {/* Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Todos los pagos</CardTitle>
          <CardDescription>
            {payments.length} pagos registrados en el sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PaymentTable payments={payments} isAdmin />
        </CardContent>
      </Card>
    </div>
  )
}
