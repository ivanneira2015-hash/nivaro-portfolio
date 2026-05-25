'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, X } from 'lucide-react'
import { PLAN_FEATURES, PLAN_NAMES, BILLING_NAMES, BILLING_DISCOUNTS } from '@/types'

interface PlanCardProps {
  planType: 'basic' | 'premium' | 'elite'
  billingPeriod: 'monthly' | 'quarterly' | 'yearly'
  price: number
  isFeatured?: boolean
  onSelect: () => void
  currentPlan?: boolean
}

export function PlanCard({
  planType,
  billingPeriod,
  price,
  isFeatured = false,
  onSelect,
  currentPlan = false,
}: PlanCardProps) {
  const features = PLAN_FEATURES[planType]
  const discount = BILLING_DISCOUNTS[billingPeriod]
  const allFeatures = [
    'Acceso a sala de musculación',
    'Horario limitado (7-14h)',
    'Vestuarios y duchas',
    'App de seguimiento',
    'Todas las clases grupales',
    '1 sesión personal/mes',
    'Vestuarios premium',
    'Nutrición básica',
    'Acceso 24/7 con llave',
    'Entrenador personal (4x/mes)',
    'Plan de nutrición completo',
    'Clases exclusivas',
    'Vestuarios VIP',
    'Prioridad en reservas',
  ]

  return (
    <Card
      className={`relative overflow-hidden ${isFeatured ? 'border-primary scale-[1.02]' : ''} ${
        currentPlan ? 'ring-2 ring-primary' : ''
      }`}
      hover
    >
      {isFeatured && (
        <div className="absolute top-0 right-0 bg-primary text-bg text-xs font-bold px-3 py-1 rounded-bl-lg">
          MÁS POPULAR
        </div>
      )}
      {currentPlan && (
        <div className="absolute top-0 left-0 bg-success text-bg text-xs font-bold px-3 py-1 rounded-br-lg">
          TU PLAN
        </div>
      )}

      <CardHeader>
        <CardTitle className="text-xl">{PLAN_NAMES[planType]}</CardTitle>
        <CardDescription>
          {billingPeriod === 'monthly' ? 'Facturación mensual' : billingPeriod === 'quarterly' ? 'Facturación trimestral' : 'Facturación anual'}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <span className="text-3xl font-display font-bold text-primary">
            ${price.toLocaleString('es-AR')}
          </span>
          <span className="text-text-muted text-sm">/mes</span>
          {discount > 0 && (
            <Badge variant="success" className="ml-2">
              -{discount}%
            </Badge>
          )}
        </div>

        <ul className="space-y-2.5">
          {allFeatures.map((feature) => {
            const included = features.includes(feature)
            return (
              <li
                key={feature}
                className={`flex items-center gap-2 text-sm ${
                  included ? 'text-text-secondary' : 'text-text-muted line-through'
                }`}
              >
                {included ? (
                  <Check size={14} className="text-accent flex-shrink-0" />
                ) : (
                  <X size={14} className="text-text-muted flex-shrink-0" />
                )}
                {feature}
              </li>
            )
          })}
        </ul>

        <Button
          variant={isFeatured ? 'primary' : 'outline'}
          className="w-full"
          onClick={onSelect}
          disabled={currentPlan}
        >
          {currentPlan ? 'Plan actual' : 'Elegir plan'}
        </Button>
      </CardContent>
    </Card>
  )
}
