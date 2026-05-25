'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Package,
  Plus,
  Edit3,
  Trash2,
  ShoppingBag,
  DollarSign,
  AlertCircle,
} from 'lucide-react'

interface Product {
  id: string
  name: string
  description: string
  price: number
  stock: number
  image: string
  category: string
  active: boolean
  createdAt: string
}

export default function AdminStorePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: 'accesorios',
  })

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    try {
      const res = await fetch('/api/store/products?category=all')
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // In a real app, you'd have a POST endpoint for creating products
    // For now, we'll just show an alert
    alert('Función de agregar producto - implementar endpoint POST /api/admin/products')
    setShowForm(false)
  }

  function handleEdit(product: Product) {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      stock: product.stock.toString(),
      category: product.category,
    })
    setShowForm(true)
  }

  const totalStock = products.reduce((sum, p) => sum + p.stock, 0)
  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0)
  const lowStock = products.filter((p) => p.stock < 10)

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
          <h2 className="font-display text-2xl font-bold text-text-main">Tienda</h2>
          <p className="text-text-secondary mt-1">
            Gestión de productos y stock
          </p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <Plus size={16} />
          {showForm ? 'Cancelar' : 'Nuevo producto'}
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Package size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-2xl font-display font-bold text-text-main">{products.length}</p>
              <p className="text-xs text-text-muted">Productos</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
              <ShoppingBag size={20} className="text-success" />
            </div>
            <div>
              <p className="text-2xl font-display font-bold text-text-main">{totalStock}</p>
              <p className="text-xs text-text-muted">Unidades en stock</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
              <DollarSign size={20} className="text-accent" />
            </div>
            <div>
              <p className="text-2xl font-display font-bold text-text-main">
                ${totalValue.toLocaleString('es-AR')}
              </p>
              <p className="text-xs text-text-muted">Valor total del inventario</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Low Stock Alert */}
      {lowStock.length > 0 && (
        <div className="p-4 rounded-lg bg-warning/10 border border-warning/20 flex items-center gap-3">
          <AlertCircle size={20} className="text-warning flex-shrink-0" />
          <p className="text-sm text-warning">
            {lowStock.length} productos con stock bajo ({'<'}10 unidades)
          </p>
        </div>
      )}

      {/* Add/Edit Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingProduct ? 'Editar producto' : 'Nuevo producto'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Nombre"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <Input
                label="Categoría"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              />
              <Input
                label="Precio"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
              <Input
                label="Stock"
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                required
              />
              <div className="md:col-span-2">
                <Input
                  label="Descripción"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="md:col-span-2 flex gap-2">
                <Button type="submit">Guardar</Button>
                <Button variant="outline" onClick={() => setShowForm(false)}>
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map((product) => (
          <Card key={product.id} hover className="overflow-hidden">
            <div className="aspect-square bg-surface/50 flex items-center justify-center">
              <Package size={48} className="text-text-muted" />
            </div>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <Badge variant="default" className="capitalize">
                  {product.category}
                </Badge>
                {product.stock < 10 && (
                  <Badge variant="warning">Stock bajo</Badge>
                )}
              </div>
              <h3 className="font-display font-bold text-text-main text-sm mb-1">
                {product.name}
              </h3>
              <p className="text-text-secondary text-xs mb-3 line-clamp-2">
                {product.description}
              </p>
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-display font-bold text-primary">
                  ${product.price.toLocaleString('es-AR')}
                </span>
                <span className="text-xs text-text-muted">
                  Stock: {product.stock}
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleEdit(product)}
                >
                  <Edit3 size={14} /> Editar
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-danger hover:text-danger hover:bg-danger/10"
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
