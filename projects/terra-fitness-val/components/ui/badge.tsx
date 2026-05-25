import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'primary'
  className?: string
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold',
        {
          'bg-surface text-text-secondary': variant === 'default',
          'bg-success/20 text-success': variant === 'success',
          'bg-primary/20 text-primary': variant === 'warning',
          'bg-danger/20 text-danger': variant === 'danger',
          'bg-primary/20 text-primary-light': variant === 'primary',
        },
        className
      )}
    >
      {children}
    </span>
  )
}
