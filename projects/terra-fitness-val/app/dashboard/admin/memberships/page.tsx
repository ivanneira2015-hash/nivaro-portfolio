'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  CreditCard,
  Ban,
  CheckCircle,
  AlertCircle,
  Calendar,
  DollarSign,
  User,
} from 'lucide-react'

interface MembershipData {
  id: string
  planType: string
  billingPeriod: string
  price: number
  startDate: string
  endDate: string
  status: string
  autoRenew: boolean
  discountApplied: number
  user: {
    id: string
    name: string
    email: string
    phone: string | null
  }
  payments: any[]
}

export default function AdminMembershipsPage() {
  const [memberships, setMemberships] = useState<MembershipData[]>([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState<string | null>(null)

  useEffect(() => {
    fetchMemberships()
  }, [])

  async function fetchMemberships() {
    try {
      const res = await fetch('/api/admin/memberships')
      if (res.ok) {
        const data = await res.json()
        setMemberships(data.memberships)
      }
    } catch (error) {
      console.error('Error fetching memberships:', error)
    } finally {
      setLoading(false)
    }
  }

  async function updateMembershipStatus(membershipId: string, newStatus: string) {
    setUpdating(membershipId)
    try {
      const res = await fetch('/api/admin/memberships', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: membershipId, status: newStatus }),
      })

      if (res.ok) {
        fetchMemberships()
      }
    } catch (error) {
      console.error('Error updating membership:', error)
    } finally {
      setUpdating(null)
    }
  }

  const statusColors: Record<string, string> = {
    ACTIVE: 'success',
    EXPIRED: 'warning',
    CANCELLED: 'danger',
    SUSPENDED: 'danger',
  }

  const statusLabels: Record<string, string> = {
    ACTIVE: 'Activa',
    EXPIRED: 'Vencida',
    CANCELLED: 'Cancelada',
    SUSPENDED: 'Suspendida',
  }

  const planNames: Record<string, string> = {
    BASIC: 'Básico',
    PREMIUM: 'Premium',
    ELITE: 'Elite',
  }

  const billingNames: Record<string, string> = {
    MONTHLY: 'Mensual',
    QUARTERLY: 'Trimestral',
    YEARLY: 'Anual',
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
      <div>
        <h2 className="font-display text-2xl font-bold text-text-main">Membresías</h2>
        <p className="text-text-secondary mt-1">
          Gestión de todas las membresías activas e inactivas
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
              <CheckCircle size={20} className="text-success" />
            </div>
            <div>
              <p className="text-2xl font-display font-bold text-text-main">
                {memberships.filter((m) => m.status === 'ACTIVE').length}
              </p>
              <p className="text-xs text-text-muted">Activas</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="w-10 h-10 rounded-lg bg-warning/20 flex items-center justify-center">
              <AlertCircle size={20} className="text-warning" />
            </div>
            <div>
              <p className="text-2xl font-display font-bold text-text-main">
                {memberships.filter((m) => m.status === 'EXPIRED').length}
              </p>
              <p className="text-xs text-text-muted">Vencidas</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="w-10 h-10 rounded-lg bg-danger/20 flex items-center justify-center">
              <Ban size={20} className="text-danger" />
            </div>
            <div>
              <p className="text-2xl font-display font-bold text-text-main">
                {memberships.filter((m) => m.status === 'CANCELLED' || m.status === 'SUSPENDED').length}
              </p>
              <p className="text-xs text-text-muted">Canceladas/Suspendidas</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <DollarSign size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-2xl font-display font-bold text-text-main">
                ${memberships
                  .filter((m) => m.status === 'ACTIVE')
                  .reduce((sum, m) => sum + m.price, 0)
                  .toLocaleString('es-AR')}
              </p>
              <p className="text-xs text-text-muted">Ingreso mensual estimado</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Memberships Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-text-muted uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-text-muted uppercase tracking-wider">
                    Plan
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-text-muted uppercase tracking-wider">
                    Período
                  </th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-text-muted uppercase tracking-wider">
                    Precio
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-text-muted uppercase tracking-wider">
                    Vencimiento
                  </th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-text-muted uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-text-muted uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {memberships.map((membership) => {
                  const daysLeft = Math.max(0, Math.ceil(
                    (new Date(membership.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
                  ))

                  return (
                    <tr
                      key={membership.id}
                      className="border-b border-border/50 hover:bg-surface/30 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                            {membership.user.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-text-main">{membership.user.name}</p>
                            <p className="text-xs text-text-muted">{membership.user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="primary">
                          {planNames[membership.planType] || membership.planType}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-text-secondary">
                          {billingNames[membership.billingPeriod] || membership.billingPeriod}
                        </span>
                        {membership.autoRenew && (
                          <p className="text-xs text-success">Auto-renovación</p>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <p className="text-sm font-medium text-text-main">
                          ${membership.price.toLocaleString('es-AR')}/mes
                        </p>
                        {membership.discountApplied > 0 && (
                          <p className="text-xs text-success">-{membership.discountApplied}%</p>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-sm text-text-secondary">
                          {new Date(membership.endDate).toLocaleDateString('es-AR')}
                        </p>
                        <p className={`text-xs ${daysLeft < 7 ? 'text-danger' : 'text-text-muted'}`}>
                          {daysLeft} días restantes
                        </p>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <Badge variant={statusColors[membership.status] as any}>
                          {statusLabels[membership.status]}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {membership.status === 'ACTIVE' ? (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateMembershipStatus(membership.id, 'SUSPENDED')}
                              disabled={updating === membership.id}
                              className="text-danger hover:text-danger hover:bg-danger/10"
                            >
                              <Ban size={14} />
                            </Button>
                          ) : (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateMembershipStatus(membership.id, 'ACTIVE')}
                              disabled={updating === membership.id}
                              className="text-success hover:text-success hover:bg-success/10"
                            >
                              <CheckCircle size={14} />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
                {memberships.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-text-muted text-sm">
                      No hay membresías registradas
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
