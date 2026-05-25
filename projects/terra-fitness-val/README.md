# Terra Fitness Val - Webing Style

Sistema completo de gestión de gimnasio con estilo Webing (Next.js + Tailwind + autenticación JWT + SQLite).

## Características

- **Landing page** profesional con estilo Webing
- **Registro/Login** de usuarios con JWT
- **Panel de usuario**: Membresía, pagos, tienda, perfil
- **Panel de administrador**: Estadísticas, clientes, membresías, pagos, tienda
- **Sistema de membresías**: Básico, Premium, Elite (Mensual/Trimestral/Anual)
- **Gestión de pagos**: Registro de pagos con estados (pendiente, completado, fallido, reembolsado)
- **Tienda interna**: Productos y suplementos con carrito de compras
- **Base de datos SQLite** con Prisma ORM

## Stack Tecnológico

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Prisma ORM + SQLite
- JWT (jose)
- bcryptjs
- Lucide React (iconos)

## Instalación

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar base de datos

```bash
# Generar cliente Prisma
npx prisma generate

# Crear base de datos y aplicar schema
npx prisma db push

# Cargar datos de prueba
npm run db:seed
```

### 3. Iniciar servidor de desarrollo

```bash
npm run dev
```

La app estará disponible en `http://localhost:3000`

## Credenciales de prueba

| Rol | Email | Contraseña |
|-----|-------|------------|
| Admin | admin@terrafitnessval.com | admin123 |
| Usuario | demo@terrafitnessval.com | user123 |

## Estructura del proyecto

```
terra-fitness-val-webing/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.ts
│   │   │   ├── register/route.ts
│   │   │   ├── logout/route.ts
│   │   │   └── me/route.ts
│   │   ├── users/route.ts
│   │   ├── membership/route.ts
│   │   ├── payments/route.ts
│   │   ├── admin/
│   │   │   ├── stats/route.ts
│   │   │   ├── users/route.ts
│   │   │   ├── memberships/route.ts
│   │   │   └── payments/route.ts
│   │   └── store/
│   │       ├── products/route.ts
│   │       └── purchase/route.ts
│   ├── dashboard/
│   │   ├── admin/
│   │   │   ├── page.tsx
│   │   │   ├── users/page.tsx
│   │   │   ├── memberships/page.tsx
│   │   │   ├── payments/page.tsx
│   │   │   └── store/page.tsx
│   │   └── user/
│   │       ├── page.tsx
│   │       ├── payments/page.tsx
│   │       ├── store/page.tsx
│   │       └── profile/page.tsx
│   ├── page.tsx (Landing)
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── input.tsx
│   │   └── select.tsx
│   ├── auth/
│   │   ├── login-form.tsx
│   │   └── register-form.tsx
│   └── dashboard/
│       ├── sidebar.tsx
│       ├── header.tsx
│       ├── plan-card.tsx
│       ├── stats-card.tsx
│       └── payment-table.tsx
├── lib/
│   ├── db.ts
│   ├── jwt.ts
│   ├── auth.ts
│   └── utils.ts
├── hooks/
│   └── useAuth.tsx
├── types/
│   └── index.ts
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── middleware.ts
└── package.json
```

## Cómo agregar funcionalidades

### Agregar un nuevo producto a la tienda

1. Ir al panel de admin → Tienda
2. Click en "Nuevo producto"
3. Completar el formulario (o usar Prisma Studio: `npx prisma studio`)

### Cambiar precios de planes

Editar el archivo `types/index.ts`:

```typescript
export const PLAN_PRICES: PlanPricing = {
  basic: { monthly: 25000, quarterly: 22500, yearly: 20000 },
  premium: { monthly: 35000, quarterly: 31500, yearly: 28000 },
  elite: { monthly: 55000, quarterly: 49500, yearly: 44000 },
}
```

### Integrar pasarela de pago (Stripe/MercadoPago)

1. Configurar variables de entorno en `.env.local`:
```
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
```

2. Crear endpoint de checkout en `app/api/payments/stripe/route.ts`

3. Agregar componente de pago en el frontend

### Cambiar datos de contacto

Editar en la landing page (`app/page.tsx`) y en el panel de usuario.

### Agregar nuevos campos al usuario

1. Actualizar `prisma/schema.prisma`
2. Ejecutar `npx prisma db push`
3. Actualizar formularios de registro y perfil

## Variables de entorno

Copiar `.env.local` y configurar:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="tu-clave-secreta-aqui"
ADMIN_EMAIL="admin@terrafitnessval.com"
ADMIN_PASSWORD="admin123"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## Deploy en Vercel

1. Subir a GitHub
2. Conectar con Vercel
3. Configurar variables de entorno en Vercel Dashboard
4. Deploy automático en cada push

**Nota**: Para producción, cambiar SQLite por PostgreSQL (Railway/Supabase) y usar un JWT_SECRET seguro.

## Comandos útiles

```bash
# Desarrollo
npm run dev

# Build
npm run build

# Prisma
npx prisma studio          # Editor visual de BD
npx prisma db push         # Sincronizar schema
npx prisma migrate dev     # Crear migración
npm run db:seed            # Cargar datos de prueba

# Lint
npm run lint
```

## Personalización rápida

| Qué cambiar | Dónde |
|-------------|-------|
| Colores | `tailwind.config.ts` y `app/globals.css` |
| Precios planes | `types/index.ts` |
| Productos tienda | `prisma/seed.ts` + `npm run db:seed` |
| Datos contacto | `app/page.tsx` |
| Logo/nombre | `app/page.tsx` y `components/dashboard/sidebar.tsx` |

---

**Desarrollado con el stack Webing:** Next.js + Tailwind CSS + Prisma + JWT
