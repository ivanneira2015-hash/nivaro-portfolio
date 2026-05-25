'use client'

import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  CreditCard,
  ShoppingBag,
  Settings,
  LogOut,
  Dumbbell,
  Package,
  BarChart3,
  UserCircle,
  Wallet,
} from 'lucide-react'

interface SidebarProps {
  isAdmin?: boolean
}

const userLinks = [
  { href: '/dashboard/user', label: 'Mi Panel', icon: LayoutDashboard },
  { href: '/dashboard/user/payments', label: 'Mis Pagos', icon: Wallet },
  { href: '/dashboard/user/store', label: 'Tienda', icon: ShoppingBag },
  { href: '/dashboard/user/profile', label: 'Mi Perfil', icon: UserCircle },
]

const adminLinks = [
  { href: '/dashboard/admin', label: 'Dashboard', icon: BarChart3 },
  { href: '/dashboard/admin/users', label: 'Clientes', icon: Users },
  { href: '/dashboard/admin/memberships', label: 'Membresías', icon: CreditCard },
  { href: '/dashboard/admin/payments', label: 'Pagos', icon: Wallet },
  { href: '/dashboard/admin/store', label: 'Tienda', icon: Package },
]

export function DashboardSidebar({ isAdmin = false }: SidebarProps) {
  const { logout, user } = useAuth()
  const pathname = usePathname()
  const links = isAdmin ? adminLinks : userLinks

  return (
    <aside className="w-64 min-h-screen bg-bg-elevated border-r border-border flex flex-col sticky top-0">
      <div className="p-6 border-b border-border">
        <Link href="/" className="flex items-center gap-2 text-text-main font-display font-bold text-lg">
          <Dumbbell className="w-6 h-6 text-primary" />
          TERRA <span className="text-primary">FITNESS</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {links.map((link) => {
          const Icon = link.icon
          const isActive = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-text-secondary hover:text-text-main hover:bg-surface'
              )}
            >
              <Icon size={18} />
              {link.label}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="px-4 py-3 mb-3">
          <p className="text-xs text-text-muted">Conectado como</p>
          <p className="text-sm font-medium text-text-main truncate">{user?.name}</p>
          <p className="text-xs text-text-muted truncate">{user?.email}</p>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sm font-medium text-text-secondary hover:text-danger hover:bg-danger/10 transition-all duration-200"
        >
          <LogOut size={18} />
          Cerrar sesión
        </button>
      </div>
    </aside>
  )
}
