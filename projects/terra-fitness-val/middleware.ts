import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'terra-fitness-val-secret-key-2026-change-in-production'
)

const PROTECTED_ROUTES = ['/dashboard']
const AUTH_ROUTES = ['/login', '/register']
const ADMIN_ROUTES = ['/dashboard/admin']

async function verifyToken(token: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload
  } catch {
    return null
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('token')?.value

  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  )
  const isAuthRoute = AUTH_ROUTES.some((route) =>
    pathname.startsWith(route)
  )
  const isAdminRoute = ADMIN_ROUTES.some((route) =>
    pathname.startsWith(route)
  )

  // If accessing protected route, verify token
  if (isProtectedRoute) {
    if (!token) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(loginUrl)
    }

    const payload = await verifyToken(token)
    if (!payload) {
      const response = NextResponse.redirect(new URL('/login', request.url))
      response.cookies.delete('token')
      return response
    }

    // Check admin routes
    if (isAdminRoute && payload.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard/user', request.url))
    }

    // Check user trying to access admin
    if (pathname === '/dashboard' || pathname === '/dashboard/') {
      if (payload.role === 'ADMIN') {
        return NextResponse.redirect(new URL('/dashboard/admin', request.url))
      } else {
        return NextResponse.redirect(new URL('/dashboard/user', request.url))
      }
    }
  }

  // If logged in and trying to access auth routes, redirect to dashboard
  if (isAuthRoute && token) {
    const payload = await verifyToken(token)
    if (payload) {
      const redirectUrl = payload.role === 'ADMIN' ? '/dashboard/admin' : '/dashboard/user'
      return NextResponse.redirect(new URL(redirectUrl, request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\.(?:png|jpg|jpeg|gif|svg|ico|webp)$).*)',
  ],
}
