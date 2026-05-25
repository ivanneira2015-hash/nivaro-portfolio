'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { PaymentTable } from '@/components/dashboard/payment-table'
import { StatsCard } from '@/components/dashboard/stats-card'
import { Wallet, TrendingUp, CheckCircle, Clock } from 'lucide-react'

export default function UserPaymentsPage() {
  const [payments, setPayments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPayments()
  }, [])

  async function fetchPayments() {
    try {
      const res = await fetch('/api/payments')
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

  const completedPayments = payments.filter((p) => p.status === 'COMPLETED')
  const pendingPayments = payments.filter((p) => p.status === 'PENDING')
  const totalPaid = completedPayments.reduce((sum, p) => sum + p.amount, 0)
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
        <h2 className="font-display text-2xl font-bold text-text-main">Mis Pagos</h2>
        <p className="text-text-secondary mt-1">
          Historial completo de tus pagos y facturación
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total pagado"
          value={`$${totalPaid.toLocaleString('es-AR')}`}
          subtitle={`${completedPayments.length} pagos completados`}
          icon={Wallet}
        />
        <StatsCard
          title="Pendiente"
          value={`$${totalPending.toLocaleString('es-AR')}`}
          subtitle={`${pendingPayments.length} pagos pendientes`}
          icon={Clock}
        />
        <StatsCard
          title="Promedio mensual"
          value={`$${completedPayments.length > 0 ? Math.round(totalPaid / completedPayments.length).toLocaleString('es-AR') : '0'}`}
          subtitle="por pago"
          icon={TrendingUp}
        />
        <StatsCard
          title="Pagos al día"
          value={`${completedPayments.length}`}
          subtitle="sin atrasos"
          icon={CheckCircle}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Historial de pagos</CardTitle>
          <CardDescription>Todos tus pagos registrados en el sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <PaymentTable payments={payments} />
        </CardContent>
      </Card>
    </div>
  )
}
