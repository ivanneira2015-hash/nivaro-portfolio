'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { StatsCard } from '@/components/dashboard/stats-card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Users,
  DollarSign,
  CreditCard,
  Clock,
  TrendingUp,
  UserPlus,
  AlertCircle,
} from 'lucide-react'

interface DashboardStats {
  totalUsers: number
  totalRevenue: number
  activeMemberships: number
  pendingPayments: number
  monthlyRevenue: number
  newUsersThisMonth: number
  monthlyData: { month: number; year: number; revenue: number }[]
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  async function fetchStats() {
    try {
      const res = await fetch('/api/admin/stats')
      if (res.ok) {
        const data = await res.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="text-center py-12">
        <AlertCircle size={48} className="text-danger mx-auto mb-4" />
        <p className="text-text-secondary">Error al cargar las estadísticas</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-2xl font-bold text-text-main">Dashboard</h2>
        <p className="text-text-secondary mt-1">
          Resumen general del gimnasio
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatsCard
          title="Total clientes"
          value={stats.totalUsers}
          subtitle="usuarios registrados"
          icon={Users}
        />
        <StatsCard
          title="Ingresos totales"
          value={`$${stats.totalRevenue.toLocaleString('es-AR')}`}
          subtitle="desde el inicio"
          icon={DollarSign}
        />
        <StatsCard
          title="Membresías activas"
          value={stats.activeMemberships}
          subtitle="clientes activos"
          icon={CreditCard}
        />
        <StatsCard
          title="Pagos pendientes"
          value={stats.pendingPayments}
          subtitle="por confirmar"
          icon={Clock}
        />
        <StatsCard
          title="Ingresos del mes"
          value={`$${stats.monthlyRevenue.toLocaleString('es-AR')}`}
          subtitle="este mes"
          icon={TrendingUp}
        />
        <StatsCard
          title="Nuevos clientes"
          value={stats.newUsersThisMonth}
          subtitle="este mes"
          icon={UserPlus}
        />
      </div>

      {/* Monthly Revenue Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Ingresos mensuales</CardTitle>
            <CardDescription>Últimos 12 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.monthlyData.map((data, i) => {
                const maxRevenue = Math.max(...stats.monthlyData.map((d) => d.revenue), 1)
                const percentage = (data.revenue / maxRevenue) * 100
                return (
                  <div key={i} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-text-secondary">
                        {data.month}/{data.year}
                      </span>
                      <span className="text-text-main font-medium">
                        ${data.revenue.toLocaleString('es-AR')}
                      </span>
                    </div>
                    <div className="h-2 bg-surface rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
              {stats.monthlyData.length === 0 && (
                <p className="text-text-muted text-sm text-center py-4">
                  No hay datos de ingresos aún
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Acciones rápidas</CardTitle>
            <CardDescription>Gestión del gimnasio</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <a href="/dashboard/admin/users">
              <Button variant="outline" className="w-full justify-start gap-3">
                <Users size={16} />
                Ver todos los clientes
              </Button>
            </a>
            <a href="/dashboard/admin/memberships">
              <Button variant="outline" className="w-full justify-start gap-3">
                <CreditCard size={16} />
                Gestionar membresías
              </Button>
            </a>
            <a href="/dashboard/admin/payments">
              <Button variant="outline" className="w-full justify-start gap-3">
                <DollarSign size={16} />
                Ver pagos pendientes
              </Button>
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
