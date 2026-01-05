'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Save, X, Plus, Trash2 } from 'lucide-react'

interface PackageFormProps {
  packageId?: string
}

interface Feature {
  name: string
  included: boolean
}

export default function PackageForm({ packageId }: PackageFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    shortDescription: '',
    price: '',
    priceType: 'ONE_TIME',
    startsFrom: false,
    features: [{ name: '', included: true }] as Feature[],
    isActive: true,
    isFeatured: false,
    displayOrder: 0,
    discount: '',
    originalPrice: '',
    imageUrl: '',
  })

  useEffect(() => {
    if (packageId) {
      fetchPackage()
    }
  }, [packageId])

  const fetchPackage = async () => {
    try {
      const res = await fetch(`/api/packages/${packageId}`)
      if (!res.ok) throw new Error('Failed to fetch package')
      const pkg = await res.json()
      
      setFormData({
        name: pkg.name || '',
        slug: pkg.slug || '',
        description: pkg.description || '',
        shortDescription: pkg.shortDescription || '',
        price: pkg.price?.toString() || '',
        priceType: pkg.priceType || 'ONE_TIME',
        startsFrom: pkg.startsFrom ?? false,
        features: Array.isArray(pkg.features) ? pkg.features : [{ name: '', included: true }],
        isActive: pkg.isActive ?? true,
        isFeatured: pkg.isFeatured ?? false,
        displayOrder: pkg.displayOrder || 0,
        discount: pkg.discount?.toString() || '',
        originalPrice: pkg.originalPrice?.toString() || '',
        imageUrl: pkg.imageUrl || '',
      })
    } catch (error) {
      console.error('Error fetching package:', error)
      alert('Failed to load package')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const payload = {
        ...formData,
        price: formData.price ? parseFloat(formData.price) : null,
        discount: formData.discount ? parseFloat(formData.discount) : null,
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
        features: formData.features.filter(f => f.name.trim() !== ''),
      }

      const url = packageId ? `/api/packages/${packageId}` : '/api/packages'
      const method = packageId ? 'PATCH' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Failed to save package')
      }

      router.push('/admin/packages')
    } catch (error: any) {
      console.error('Error saving package:', error)
      alert(error.message || 'Failed to save package')
    } finally {
      setLoading(false)
    }
  }

  const addFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, { name: '', included: true }],
    })
  }

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index),
    })
  }

  const updateFeature = (index: number, field: keyof Feature, value: any) => {
    const newFeatures = [...formData.features]
    newFeatures[index] = { ...newFeatures[index], [field]: value }
    setFormData({ ...formData, features: newFeatures })
  }

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-6 rounded-xl border border-[#BFBFBF]/10 bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A]">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-[#D9D9D9] via-[#BFBFBF] to-[#8C8C8C] bg-clip-text text-transparent mb-6">
          {packageId ? 'Edit Package' : 'Create New Package'}
        </h3>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#BFBFBF] mb-2">
                Package Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value })
                  if (!packageId && !formData.slug) {
                    setFormData(prev => ({ ...prev, slug: generateSlug(e.target.value) }))
                  }
                }}
                required
                className="w-full border border-[#BFBFBF]/20 bg-gradient-to-br from-[#0A0A0A] to-[#151515] px-4 py-3 rounded-xl text-[#D9D9D9] placeholder-[#8C8C8C] focus:border-[#D9D9D9]/50 focus:outline-none focus:ring-1 focus:ring-[#D9D9D9]/20"
                placeholder="e.g., Starter Package"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#BFBFBF] mb-2">
                Slug *
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                required
                className="w-full border border-[#BFBFBF]/20 bg-gradient-to-br from-[#0A0A0A] to-[#151515] px-4 py-3 rounded-xl text-[#D9D9D9] placeholder-[#8C8C8C] focus:border-[#D9D9D9]/50 focus:outline-none focus:ring-1 focus:ring-[#D9D9D9]/20"
                placeholder="e.g., starter-package"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-heading text-foreground mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows={4}
              className="w-full border border-[#BFBFBF]/20 bg-gradient-to-br from-[#0A0A0A] to-[#151515] px-4 py-3 rounded-xl text-[#D9D9D9] placeholder-[#8C8C8C] focus:border-[#D9D9D9]/50 focus:outline-none focus:ring-1 focus:ring-[#D9D9D9]/20 resize-none"
              placeholder="Full description of the package"
            />
          </div>

          <div>
            <label className="block text-sm font-heading text-foreground mb-2">
              Short Description
            </label>
            <input
              type="text"
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              className="w-full border border-border bg-white px-4 py-3 rounded-xl text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Brief one-line description"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#BFBFBF] mb-2">
                Price
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full border border-[#BFBFBF]/20 bg-gradient-to-br from-[#0A0A0A] to-[#151515] px-4 py-3 rounded-xl text-[#D9D9D9] placeholder-[#8C8C8C] focus:border-[#D9D9D9]/50 focus:outline-none focus:ring-1 focus:ring-[#D9D9D9]/20"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#BFBFBF] mb-2">
                Price Type *
              </label>
              <select
                value={formData.priceType}
                onChange={(e) => setFormData({ ...formData, priceType: e.target.value })}
                required
                className="w-full border border-[#BFBFBF]/20 bg-gradient-to-br from-[#0A0A0A] to-[#151515] px-4 py-3 rounded-xl text-[#D9D9D9] placeholder-[#8C8C8C] focus:border-[#D9D9D9]/50 focus:outline-none focus:ring-1 focus:ring-[#D9D9D9]/20"
              >
                <option value="MONTHLY">Monthly</option>
                <option value="ONE_TIME">One Time</option>
                <option value="YEARLY">Yearly</option>
                <option value="CUSTOM">Custom</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#BFBFBF] mb-2">
                Display Order
              </label>
              <input
                type="number"
                value={formData.displayOrder}
                onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })}
                className="w-full border border-[#BFBFBF]/20 bg-gradient-to-br from-[#0A0A0A] to-[#151515] px-4 py-3 rounded-xl text-[#D9D9D9] placeholder-[#8C8C8C] focus:border-[#D9D9D9]/50 focus:outline-none focus:ring-1 focus:ring-[#D9D9D9]/20"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={formData.startsFrom}
                onChange={(e) => setFormData({ ...formData, startsFrom: e.target.checked })}
                className="w-5 h-5 rounded border-[#BFBFBF]/20 bg-gradient-to-br from-[#0A0A0A] to-[#151515] text-[#D9D9D9] focus:ring-[#D9D9D9]/20"
              />
              <span className="text-[#BFBFBF] font-semibold">Show "Starts from" prefix</span>
            </label>
            <p className="text-sm text-[#8C8C8C] mt-1 ml-8">
              Enable this for packages like website development where price varies based on features and requirements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#BFBFBF] mb-2">
                Discount (%)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="100"
                value={formData.discount}
                onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                className="w-full border border-[#BFBFBF]/20 bg-gradient-to-br from-[#0A0A0A] to-[#151515] px-4 py-3 rounded-xl text-[#D9D9D9] placeholder-[#8C8C8C] focus:border-[#D9D9D9]/50 focus:outline-none focus:ring-1 focus:ring-[#D9D9D9]/20"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#BFBFBF] mb-2">
                Original Price
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.originalPrice}
                onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                className="w-full border border-[#BFBFBF]/20 bg-gradient-to-br from-[#0A0A0A] to-[#151515] px-4 py-3 rounded-xl text-[#D9D9D9] placeholder-[#8C8C8C] focus:border-[#D9D9D9]/50 focus:outline-none focus:ring-1 focus:ring-[#D9D9D9]/20"
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-heading text-foreground mb-2">
              Image URL
            </label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="w-full border border-border bg-white px-4 py-3 rounded-xl text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>
      </div>

      <div className="p-6 rounded-xl border border-[#BFBFBF]/10 bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-[#D9D9D9]">Features</h3>
          <button
            type="button"
            onClick={addFeature}
            className="flex items-center gap-2 bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] text-[#D9D9D9] px-4 py-2 rounded-lg font-semibold hover:border-[#D9D9D9]/30 border border-[#BFBFBF]/20 transition-all duration-300"
          >
            <Plus className="w-4 h-4" />
            Add Feature
          </button>
        </div>

        <div className="space-y-3">
          {formData.features.map((feature, index) => (
            <div key={index} className="flex gap-3 items-start">
              <input
                type="text"
                value={feature.name}
                onChange={(e) => updateFeature(index, 'name', e.target.value)}
                placeholder="Feature name"
                className="flex-1 border border-[#BFBFBF]/20 bg-gradient-to-br from-[#0A0A0A] to-[#151515] px-4 py-3 rounded-xl text-[#D9D9D9] placeholder-[#8C8C8C] focus:border-[#D9D9D9]/50 focus:outline-none focus:ring-1 focus:ring-[#D9D9D9]/20"
              />
              <label className="flex items-center gap-2 px-4 py-3">
                <input
                  type="checkbox"
                  checked={feature.included}
                  onChange={(e) => updateFeature(index, 'included', e.target.checked)}
                  className="w-4 h-4 rounded border-[#BFBFBF]/20 bg-gradient-to-br from-[#0A0A0A] to-[#151515] text-[#D9D9D9] focus:ring-[#D9D9D9]/20"
                />
                <span className="text-sm text-[#8C8C8C]">Included</span>
              </label>
              {formData.features.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="flex items-center gap-1 text-[#BFBFBF] hover:text-red-400 px-3 py-3 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 rounded-xl border border-[#BFBFBF]/10 bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A]">
        <h3 className="text-xl font-bold text-[#D9D9D9] mb-4">Settings</h3>
        <div className="space-y-4">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="w-5 h-5 rounded border-[#BFBFBF]/20 bg-gradient-to-br from-[#0A0A0A] to-[#151515] text-[#D9D9D9] focus:ring-[#D9D9D9]/20"
            />
            <span className="text-[#BFBFBF] font-semibold">Active</span>
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={formData.isFeatured}
              onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
              className="w-5 h-5 rounded border-[#BFBFBF]/20 bg-gradient-to-br from-[#0A0A0A] to-[#151515] text-[#D9D9D9] focus:ring-[#D9D9D9]/20"
            />
            <span className="text-[#BFBFBF] font-semibold">Featured</span>
          </label>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <button
          type="submit"
          disabled={loading}
          className="group flex items-center justify-center gap-2 bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] text-[#D9D9D9] px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 border border-[#BFBFBF]/20 hover:border-[#D9D9D9]/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-sm sm:text-base w-full sm:w-auto"
        >
          <Save className="w-4 h-4" />
          {loading ? 'Saving...' : packageId ? 'Update Package' : 'Create Package'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/packages')}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#0A0A0A] to-[#1A1A1A] text-[#BFBFBF] px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 hover:text-[#D9D9D9] border border-[#BFBFBF]/20 hover:border-[#D9D9D9]/30 text-sm sm:text-base w-full sm:w-auto"
        >
          <X className="w-4 h-4" />
          Cancel
        </button>
      </div>
    </form>
  )
}

