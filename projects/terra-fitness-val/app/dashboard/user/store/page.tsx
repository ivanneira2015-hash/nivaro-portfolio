'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, Plus, Minus, Package, Check } from 'lucide-react'

interface Product {
  id: string
  name: string
  description: string
  price: number
  stock: number
  image: string
  category: string
}

export default function UserStorePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [cart, setCart] = useState<Map<string, number>>(new Map())
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('all')
  const [purchasing, setPurchasing] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [category])

  async function fetchProducts() {
    try {
      const url = category === 'all' ? '/api/store/products' : `/api/store/products?category=${category}`
      const res = await fetch(url)
      if (res.ok) {
        const data = await res.json()
        setProducts(data.products)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  function addToCart(productId: string) {
    setCart((prev) => {
      const next = new Map(prev)
      const current = next.get(productId) || 0
      const product = products.find((p) => p.id === productId)
      if (product && current < product.stock) {
        next.set(productId, current + 1)
      }
      return next
    })
  }

  function removeFromCart(productId: string) {
    setCart((prev) => {
      const next = new Map(prev)
      const current = next.get(productId) || 0
      if (current <= 1) {
        next.delete(productId)
      } else {
        next.set(productId, current - 1)
      }
      return next
    })
  }

  const cartTotal = Array.from(cart.entries()).reduce((sum, [productId, qty]) => {
    const product = products.find((p) => p.id === productId)
    return sum + (product?.price || 0) * qty
  }, 0)

  const cartCount = Array.from(cart.values()).reduce((sum, qty) => sum + qty, 0)

  async function handlePurchase() {
    if (cartCount === 0) return
    setPurchasing(true)

    const items = Array.from(cart.entries()).map(([productId, quantity]) => ({
      productId,
      quantity,
    }))

    try {
      const res = await fetch('/api/store/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      })

      if (res.ok) {
        alert('¡Compra realizada con éxito!')
        setCart(new Map())
        fetchProducts()
      } else {
        const data = await res.json()
        alert(data.error || 'Error al procesar la compra')
      }
    } catch (error) {
      alert('Error al procesar la compra')
    } finally {
      setPurchasing(false)
    }
  }

  const categories = [
    { value: 'all', label: 'Todos' },
    { value: 'suplementos', label: 'Suplementos' },
    { value: 'accesorios', label: 'Accesorios' },
    { value: 'ropa', label: 'Ropa' },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-text-main">Tienda Terra</h2>
          <p className="text-text-secondary mt-1">
            Productos y suplementos para potenciar tu entrenamiento
          </p>
        </div>
        <div className="flex items-center gap-2 bg-surface rounded-lg px-4 py-2">
          <ShoppingCart size={18} className="text-primary" />
          <span className="text-sm font-medium text-text-main">{cartCount} items</span>
          <span className="text-sm text-primary font-bold">${cartTotal.toLocaleString('es-AR')}</span>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setCategory(cat.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              category === cat.value
                ? 'bg-primary text-bg'
                : 'bg-surface text-text-secondary hover:text-text-main'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map((product) => {
          const qty = cart.get(product.id) || 0
          return (
            <Card key={product.id} hover className="overflow-hidden">
              <div className="aspect-square bg-surface/50 flex items-center justify-center">
                <Package size={48} className="text-text-muted" />
              </div>
              <CardContent className="p-4">
                <Badge variant="default" className="mb-2 capitalize">
                  {product.category}
                </Badge>
                <h3 className="font-display font-bold text-text-main text-sm mb-1">
                  {product.name}
                </h3>
                <p className="text-text-secondary text-xs mb-3 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-display font-bold text-primary">
                    ${product.price.toLocaleString('es-AR')}
                  </span>
                  <span className="text-xs text-text-muted">
                    Stock: {product.stock}
                  </span>
                </div>

                {qty > 0 ? (
                  <div className="flex items-center justify-between mt-3 bg-surface rounded-lg p-1">
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="w-8 h-8 flex items-center justify-center rounded-md bg-surface-hover text-text-main hover:bg-primary/20"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-sm font-medium text-text-main">{qty}</span>
                    <button
                      onClick={() => addToCart(product.id)}
                      className="w-8 h-8 flex items-center justify-center rounded-md bg-surface-hover text-text-main hover:bg-primary/20"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-3"
                    onClick={() => addToCart(product.id)}
                  >
                    <Plus size={14} /> Agregar
                  </Button>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Cart Summary */}
      {cartCount > 0 && (
        <Card className="sticky bottom-6">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Total a pagar</p>
              <p className="text-2xl font-display font-bold text-primary">
                ${cartTotal.toLocaleString('es-AR')}
              </p>
            </div>
            <Button
              onClick={handlePurchase}
              isLoading={purchasing}
              className="gap-2"
            >
              <Check size={16} />
              Confirmar compra
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
