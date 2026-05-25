'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Eye, EyeOff, Dumbbell } from 'lucide-react'
import Link from 'next/link'

export function LoginForm() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(email, password)
      window.location.href = '/dashboard/user'
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <Dumbbell className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-display text-3xl font-bold text-text-main mb-2">
            Bienvenido de vuelta
          </h1>
          <p className="text-text-secondary">
            Ingresá a tu cuenta de Terra Fitness Val
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Email"
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="relative">
            <Input
              label="Contraseña"
              type={showPassword ? 'text' : 'password'}
              placeholder="Tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[38px] text-text-muted hover:text-text-secondary"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-danger/10 border border-danger/20 text-danger text-sm">
              {error}
            </div>
          )}

          <Button type="submit" size="lg" className="w-full" isLoading={loading}>
            Iniciar sesión
          </Button>
        </form>

        <p className="text-center mt-6 text-text-secondary text-sm">
          ¿No tenés cuenta?{' '}
          <Link href="/register" className="text-primary hover:text-primary-light font-medium">
            Registrate acá
          </Link>
        </p>

        <div className="mt-8 p-4 rounded-lg bg-surface/50 border border-border text-center">
          <p className="text-xs text-text-muted mb-2">Credenciales de prueba:</p>
          <p className="text-xs text-text-secondary">Admin: admin@terrafitnessval.com / admin123</p>
          <p className="text-xs text-text-secondary">Usuario: demo@terrafitnessval.com / user123</p>
        </div>
      </div>
    </div>
  )
}
