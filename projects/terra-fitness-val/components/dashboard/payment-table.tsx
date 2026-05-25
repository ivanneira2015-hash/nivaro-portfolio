'use client'

import { Badge } from '@/components/ui/badge'
import { Payment } from '@/types'

interface PaymentTableProps {
  payments: Payment[]
  isAdmin?: boolean
}

const statusColors: Record<string, string> = {
  PENDING: 'warning',
  COMPLETED: 'success',
  FAILED: 'danger',
  REFUNDED: 'default',
  CANCELLED: 'default',
}

const statusLabels: Record<string, string> = {
  PENDING: 'Pendiente',
  COMPLETED: 'Completado',
  FAILED: 'Fallido',
  REFUNDED: 'Reembolsado',
  CANCELLED: 'Cancelado',
}

const methodLabels: Record<string, string> = {
  CASH: 'Efectivo',
  TRANSFER: 'Transferencia',
  CARD: 'Tarjeta',
  STRIPE: 'Stripe',
  MERCADOPAGO: 'MercadoPago',
}

export function PaymentTable({ payments, isAdmin = false }: PaymentTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 text-xs font-semibold text-text-muted uppercase tracking-wider">
              Fecha
            </th>
            {isAdmin && (
              <th className="text-left py-3 px-4 text-xs font-semibold text-text-muted uppercase tracking-wider">
                Cliente
              </th>
            )}
            <th className="text-left py-3 px-4 text-xs font-semibold text-text-muted uppercase tracking-wider">
              Descripción
            </th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-text-muted uppercase tracking-wider">
              Método
            </th>
            <th className="text-right py-3 px-4 text-xs font-semibold text-text-muted uppercase tracking-wider">
              Monto
            </th>
            <th className="text-center py-3 px-4 text-xs font-semibold text-text-muted uppercase tracking-wider">
              Estado
            </th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr
              key={payment.id}
              className="border-b border-border/50 hover:bg-surface/30 transition-colors"
            >
              <td className="py-3 px-4 text-sm text-text-secondary">
                {new Date(payment.createdAt).toLocaleDateString('es-AR')}
              </td>
              {isAdmin && (
                <td className="py-3 px-4 text-sm text-text-secondary">
                  {(payment as any).user?.name || '—'}
                </td>
              )}
              <td className="py-3 px-4 text-sm text-text-main">
                {payment.description || 'Pago de membresía'}
              </td>
              <td className="py-3 px-4 text-sm text-text-secondary">
                {methodLabels[payment.method] || payment.method}
              </td>
              <td className="py-3 px-4 text-sm text-text-main font-medium text-right">
                ${payment.amount.toLocaleString('es-AR')}
              </td>
              <td className="py-3 px-4 text-center">
                <Badge variant={statusColors[payment.status] as any}>
                  {statusLabels[payment.status]}
                </Badge>
              </td>
            </tr>
          ))}
          {payments.length === 0 && (
            <tr>
              <td
                colSpan={isAdmin ? 6 : 5}
                className="py-8 text-center text-text-muted text-sm"
              >
                No hay pagos registrados
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
