'use client'

import { useAuth } from '@/hooks/useAuth'
import { Bell, Menu } from 'lucide-react'
import { useState } from 'react'

export function DashboardHeader() {
  const { user } = useAuth()
  const [showMenu, setShowMenu] = useState(false)

  return (
    <header className="h-16 bg-bg-elevated border-b border-border flex items-center justify-between px-6 sticky top-0 z-10">
      <h1 className="font-display font-bold text-xl text-text-main">
        {user?.role === 'ADMIN' ? 'Panel de Administración' : 'Mi Panel'}
      </h1>

      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-lg text-text-secondary hover:text-text-main hover:bg-surface transition-all">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-text-main">{user?.name}</p>
            <p className="text-xs text-text-muted capitalize">{user?.role === 'ADMIN' ? 'Administrador' : 'Miembro'}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
