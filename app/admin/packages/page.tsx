'use client'

import { useState, useEffect } from 'react'
import DataTable from '@/components/admin/DataTable'

interface Package {
  id: string
  name: string
  slug: string
  price: number | null
  priceType: string
  startsFrom: boolean
  isActive: boolean
  isFeatured: boolean
  createdAt: string
}

export default function PackagesPage() {
  const [packages, setPackages] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPackages()
  }, [])

  const fetchPackages = async () => {
    try {
      const res = await fetch('/api/packages')
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Unknown error' }))
        console.error('API Error:', errorData)
        throw new Error(errorData.error || `Failed to fetch packages: ${res.status} ${res.statusText}`)
      }
      const data = await res.json()
      // Ensure data is an array
      setPackages(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching packages:', error)
      // Set empty array on error but don't show error to user if it's just no data
      setPackages([])
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (pkg: Package) => {
    if (!confirm(`Are you sure you want to delete "${pkg.name}"?`)) return

    try {
      const res = await fetch(`/api/packages/${pkg.id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        fetchPackages()
      }
    } catch (error) {
      console.error('Error deleting package:', error)
      alert('Failed to delete package')
    }
  }

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Slug', accessor: 'slug' },
    {
      header: 'Price',
      accessor: (row: Package) =>
        row.price
          ? `${row.startsFrom ? 'Starts from ' : ''}₹${row.price.toFixed(2)}/${row.priceType.toLowerCase()}`
          : 'Custom',
    },
    {
      header: 'Status',
      accessor: (row: Package) => (
        <div className="flex gap-2">
          <span
            className={`px-2 py-1 text-xs font-semibold rounded-full ${
              row.isActive
                ? 'bg-gradient-to-r from-[#0A0A0A] to-[#1A1A1A] text-[#D9D9D9] border border-[#BFBFBF]/20'
                : 'bg-gradient-to-r from-[#0A0A0A] to-[#1A1A1A] text-[#8C8C8C] border border-[#BFBFBF]/10'
            }`}
          >
            {row.isActive ? 'Active' : 'Inactive'}
          </span>
          {row.isFeatured && (
            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] text-[#BFBFBF] border border-[#BFBFBF]/20">
              Featured
            </span>
          )}
        </div>
      ),
    },
    {
      header: 'Created',
      accessor: (row: Package) =>
        new Date(row.createdAt).toLocaleDateString(),
    },
  ]

  return (
    <DataTable
      title="Packages"
      columns={columns}
      data={packages}
      loading={loading}
      createLink="/admin/packages/new"
      editLink={(row) => `/admin/packages/${row.id}/edit`}
      onDelete={handleDelete}
    />
  )
}

