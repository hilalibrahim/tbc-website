'use client'

import { useState, useEffect } from 'react'
import DataTable from '@/components/admin/DataTable'

interface Offer {
  id: string
  title: string
  discount: number
  code: string | null
  validFrom: string
  validUntil: string
  isActive: boolean
  usedCount: number
  usageLimit: number | null
}

export default function OffersPage() {
  const [offers, setOffers] = useState<Offer[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOffers()
  }, [])

  const fetchOffers = async () => {
    try {
      const res = await fetch('/api/offers')
      if (!res.ok) {
        throw new Error('Failed to fetch offers')
      }
      const data = await res.json()
      // Ensure data is an array
      setOffers(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching offers:', error)
      setOffers([]) // Set empty array on error
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (offer: Offer) => {
    if (!confirm(`Are you sure you want to delete "${offer.title}"?`)) return

    try {
      const res = await fetch(`/api/offers/${offer.id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        fetchOffers()
      }
    } catch (error) {
      console.error('Error deleting offer:', error)
      alert('Failed to delete offer')
    }
  }

  const columns = [
    { header: 'Title', accessor: 'title' },
    {
      header: 'Discount',
      accessor: (row: Offer) => `${row.discount}%`,
    },
    { header: 'Code', accessor: 'code' || 'N/A' },
    {
      header: 'Valid Period',
      accessor: (row: Offer) =>
        `${new Date(row.validFrom).toLocaleDateString()} - ${new Date(row.validUntil).toLocaleDateString()}`,
    },
    {
      header: 'Usage',
      accessor: (row: Offer) =>
        `${row.usedCount}${row.usageLimit ? ` / ${row.usageLimit}` : ''}`,
    },
    {
      header: 'Status',
      accessor: (row: Offer) => (
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            row.isActive
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {row.isActive ? 'Active' : 'Inactive'}
        </span>
      ),
    },
  ]

  return (
    <DataTable
      title="Offers"
      columns={columns}
      data={offers}
      loading={loading}
      createLink="/admin/offers/new"
      editLink={(row) => `/admin/offers/${row.id}/edit`}
      onDelete={handleDelete}
    />
  )
}

