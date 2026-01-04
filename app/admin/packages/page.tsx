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
        throw new Error('Failed to fetch packages')
      }
      const data = await res.json()
      // Ensure data is an array
      setPackages(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching packages:', error)
      setPackages([]) // Set empty array on error
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
            className={`px-2 py-1 text-xs rounded-full ${
              row.isActive
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {row.isActive ? 'Active' : 'Inactive'}
          </span>
          {row.isFeatured && (
            <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
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

