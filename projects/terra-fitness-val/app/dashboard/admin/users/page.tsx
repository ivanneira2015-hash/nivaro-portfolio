'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Users,
  Search,
  Ban,
  CheckCircle,
  CreditCard,
  Phone,
  Mail,
} from 'lucide-react'

interface UserData {
  id: string
  name: string
  email: string
  phone: string | null
  dni: string | null
  status: string
  role: string
  createdAt: string
  memberships: any[]
  payments: any[]
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserData[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [updating, setUpdating] = useState<string | null>(null)

  useEffect(() => {
    fetchUsers()
  }, [search, statusFilter])

  async function fetchUsers() {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (search) params.set('search', search)
      if (statusFilter !== 'all') params.set('status', statusFilter)

      const res = await fetch(`/api/admin/users?${params}`)
      if (res.ok) {
        const data = await res.json()
        setUsers(data.users)
      }
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  async function updateUserStatus(userId: string, newStatus: string) {
    setUpdating(userId)
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: userId, status: newStatus }),
      })

      if (res.ok) {
        fetchUsers()
      }
    } catch (error) {
      console.error('Error updating user:', error)
    } finally {
      setUpdating(null)
    }
  }

  const statusOptions = [
    { value: 'all', label: 'Todos los estados' },
    { value: 'active', label: 'Activo' },
    { value: 'inactive', label: 'Inactivo' },
    { value: 'suspended', label: 'Suspendido' },
  ]

  const statusColors: Record<string, string> = {
    ACTIVE: 'success',
    INACTIVE: 'default',
    SUSPENDED: 'danger',
  }

  const statusLabels: Record<string, string> = {
    ACTIVE: 'Activo',
    INACTIVE: 'Inactivo',
    SUSPENDED: 'Suspendido',
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-2xl font-bold text-text-main">Clientes</h2>
        <p className="text-text-secondary mt-1">
          Gestión de usuarios registrados en el sistema
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
          <Input
            placeholder="Buscar por nombre, email, teléfono o DNI..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full sm:w-48 bg-surface border border-border rounded-lg px-4 py-3 text-text-main focus:outline-none focus:border-primary"
        >
          {statusOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* Users Table */}
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
                    Contacto
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-text-muted uppercase tracking-wider">
                    Membresía
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-text-muted uppercase tracking-wider">
                    Pagos
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
                {users.map((user) => {
                  const membership = user.memberships?.[0]
                  const completedPayments = user.payments?.filter((p: any) => p.status === 'COMPLETED') || []
                  const totalPaid = completedPayments.reduce((sum: number, p: any) => sum + p.amount, 0)

                  return (
                    <tr
                      key={user.id}
                      className="border-b border-border/50 hover:bg-surface/30 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-text-main">{user.name}</p>
                            <p className="text-xs text-text-muted">
                              {new Date(user.createdAt).toLocaleDateString('es-AR')}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="space-y-1">
                          <p className="text-sm text-text-secondary flex items-center gap-1.5">
                            <Mail size={12} /> {user.email}
                          </p>
                          {user.phone && (
                            <p className="text-sm text-text-secondary flex items-center gap-1.5">
                              <Phone size={12} /> {user.phone}
                            </p>
                          )}
                          {user.dni && (
                            <p className="text-sm text-text-muted">DNI: {user.dni}</p>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        {membership ? (
                          <div>
                            <Badge variant={membership.status === 'ACTIVE' ? 'success' : 'danger'}>
                              {membership.planType}
                            </Badge>
                            <p className="text-xs text-text-muted mt-1">
                              Vence: {new Date(membership.endDate).toLocaleDateString('es-AR')}
                            </p>
                          </div>
                        ) : (
                          <span className="text-sm text-text-muted">Sin membresía</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="text-sm font-medium text-text-main">
                            ${totalPaid.toLocaleString('es-AR')}
                          </p>
                          <p className="text-xs text-text-muted">
                            {completedPayments.length} pagos
                          </p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <Badge variant={statusColors[user.status] as any}>
                          {statusLabels[user.status]}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {user.status === 'ACTIVE' ? (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateUserStatus(user.id, 'SUSPENDED')}
                              disabled={updating === user.id}
                              className="text-danger hover:text-danger hover:bg-danger/10"
                            >
                              <Ban size={14} />
                            </Button>
                          ) : (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateUserStatus(user.id, 'ACTIVE')}
                              disabled={updating === user.id}
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
                {users.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-text-muted text-sm">
                      No se encontraron clientes
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
