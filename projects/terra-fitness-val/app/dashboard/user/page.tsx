'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { StatsCard } from '@/components/dashboard/stats-card'
import { PlanCard } from '@/components/dashboard/plan-card'
import { PaymentTable } from '@/components/dashboard/payment-table'
import { useAuth } from '@/hooks/useAuth'
import {
  Wallet,
  Calendar,
  Package,
  TrendingUp,
  CreditCard,
  Clock,
  CheckCircle,
  AlertCircle,
} from 'lucide-react'
import { PLAN_PRICES, PLAN_NAMES, BILLING_NAMES } from '@/types'

export default function UserDashboardPage() {
  const { user } = useAuth()
  const [userData, setUserData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly')

  useEffect(() => {
    fetchUserData()
  }, [])

  async function fetchUserData() {
    try {
      const res = await fetch('/api/users')
      if (res.ok) {
        const data = await res.json()
        setUserData(data.user)
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
    } finally {
      setLoading(false)
    }
  }

  const membership = userData?.memberships?.[0]
  const payments = userData?.payments || []
  const purchases = userData?.purchases || []

  const totalSpent = payments
    .filter((p: any) => p.status === 'COMPLETED')
    .reduce((sum: number, p: any) => sum + p.amount, 0)

  const nextPayment = membership
    ? new Date(membership.endDate).toLocaleDateString('es-AR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '—'

  const daysLeft = membership
    ? Math.max(0, Math.ceil((new Date(membership.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0

  async function handleSelectPlan(planType: string) {
    try {
      const res = await fetch('/api/membership', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planType, billingPeriod: selectedPeriod }),
      })

      if (res.ok) {
        alert('Plan seleccionado correctamente. Te contactaremos para coordinar el pago.')
        fetchUserData()
      } else {
        const data = await res.json()
        alert(data.error || 'Error al seleccionar plan')
      }
    } catch (error) {
      alert('Error al procesar la solicitud')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h2 className="font-display text-2xl font-bold text-text-main">
          Hola, {user?.name?.split(' ')[0]}
        </h2>
        <p className="text-text-secondary mt-1">
          Acá podés ver tu membresía, pagos y compras
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Membresía"
          value={membership ? PLAN_NAMES[membership.planType.toLowerCase() as keyof typeof PLAN_NAMES] : 'Sin plan'}
          subtitle={membership ? `${BILLING_NAMES[membership.billingPeriod.toLowerCase() as keyof typeof BILLING_NAMES]}` : 'Elegí un plan'}
          icon={CreditCard}
        />
        <StatsCard
          title="Próximo vencimiento"
          value={daysLeft}
          subtitle={nextPayment}
          icon={Calendar}
          trend={daysLeft < 7 ? { value: daysLeft, positive: false } : undefined}
        />
        <StatsCard
          title="Total pagado"
          value={`$${totalSpent.toLocaleString('es-AR')}`}
          subtitle={`${payments.filter((p: any) => p.status === 'COMPLETED').length} pagos`}
          icon={Wallet}
        />
        <StatsCard
          title="Compras"
          value={purchases.length}
          subtitle="en la tienda"
          icon={Package}
        />
      </div>

      {/* Current Membership */}
      {membership && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Tu membresía actual</CardTitle>
                <CardDescription>Detalles de tu plan activo</CardDescription>
              </div>
              <Badge variant={membership.status === 'ACTIVE' ? 'success' : 'danger'}>
                {membership.status === 'ACTIVE' ? 'Activa' : membership.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-surface/50">
                <p className="text-xs text-text-muted uppercase tracking-wider">Plan</p>
                <p className="text-lg font-display font-bold text-text-main mt-1">
                  {PLAN_NAMES[membership.planType.toLowerCase() as keyof typeof PLAN_NAMES]}
                </p>
                <p className="text-sm text-text-secondary">
                  {BILLING_NAMES[membership.billingPeriod.toLowerCase() as keyof typeof BILLING_NAMES]}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-surface/50">
                <p className="text-xs text-text-muted uppercase tracking-wider">Precio</p>
                <p className="text-lg font-display font-bold text-primary mt-1">
                  ${membership.price.toLocaleString('es-AR')}/mes
                </p>
                {membership.discountApplied > 0 && (
                  <p className="text-sm text-success">-{membership.discountApplied}% de descuento</p>
                )}
              </div>
              <div className="p-4 rounded-lg bg-surface/50">
                <p className="text-xs text-text-muted uppercase tracking-wider">Válida hasta</p>
                <p className="text-lg font-display font-bold text-text-main mt-1">
                  {nextPayment}
                </p>
                <p className="text-sm text-text-secondary">
                  {daysLeft} días restantes
                </p>
              </div>
            </div>

            {membership.autoRenew && (
              <div className="mt-4 flex items-center gap-2 p-3 rounded-lg bg-success/10 border border-success/20">
                <CheckCircle size={16} className="text-success" />
                <p className="text-sm text-success">
                  Renovación automática activada. Tu membresía se renovará el {nextPayment}.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Recent Payments */}
      <Card>
        <CardHeader>
          <CardTitle>Últimos pagos</CardTitle>
          <CardDescription>Historial de tus pagos realizados</CardDescription>
        </CardHeader>
        <CardContent>
          <PaymentTable payments={payments.slice(0, 5)} />
        </CardContent>
      </Card>

      {/* Plans */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-display text-xl font-bold text-text-main">Elegí o cambiá de plan</h3>
            <p className="text-text-secondary text-sm mt-1">
              Seleccioná el período de facturación y el plan que mejor se adapte a vos
            </p>
          </div>
          <div className="flex bg-surface rounded-lg p-1">
            {(['monthly', 'quarterly', 'yearly'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  selectedPeriod === period
                    ? 'bg-surface-hover text-primary'
                    : 'text-text-secondary hover:text-text-main'
                }`}
              >
                {period === 'monthly' ? 'Mensual' : period === 'quarterly' ? 'Trimestral' : 'Anual'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(['basic', 'premium', 'elite'] as const).map((plan) => (
            <PlanCard
              key={plan}
              planType={plan}
              billingPeriod={selectedPeriod}
              price={PLAN_PRICES[plan][selectedPeriod]}
              isFeatured={plan === 'premium'}
              currentPlan={
                membership?.planType.toLowerCase() === plan &&
                membership?.billingPeriod.toLowerCase() === selectedPeriod
              }
              onSelect={() => handleSelectPlan(plan)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
