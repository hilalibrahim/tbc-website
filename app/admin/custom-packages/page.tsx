'use client'

import { useState, useEffect } from 'react'
import DataTable from '@/components/admin/DataTable'

interface CustomPackage {
  id: string
  name: string
  totalPrice: number
  status: string
  createdAt: string
  lead: {
    name: string
    email: string
  } | null
}

export default function CustomPackagesPage() {
  const [customPackages, setCustomPackages] = useState<CustomPackage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCustomPackages()
  }, [])

  const fetchCustomPackages = async () => {
    try {
      const res = await fetch('/api/custom-packages')
      if (!res.ok) {
        throw new Error('Failed to fetch custom packages')
      }
      const data = await res.json()
      // Ensure data is an array
      setCustomPackages(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching custom packages:', error)
      setCustomPackages([]) // Set empty array on error
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      APPROVED: 'bg-green-100 text-green-800',
      REJECTED: 'bg-red-100 text-red-800',
      QUOTED: 'bg-blue-100 text-blue-800',
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  const columns = [
    { header: 'Name', accessor: 'name' },
    {
      header: 'Client',
      accessor: (row: CustomPackage) =>
        row.lead ? `${row.lead.name} (${row.lead.email})` : 'N/A',
    },
    {
      header: 'Total Price',
      accessor: (row: CustomPackage) => `₹${row.totalPrice.toFixed(2)}`,
    },
    {
      header: 'Status',
      accessor: (row: CustomPackage) => (
        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(row.status)}`}>
          {row.status}
        </span>
      ),
    },
    {
      header: 'Created',
      accessor: (row: CustomPackage) =>
        new Date(row.createdAt).toLocaleDateString(),
    },
  ]

  return (
    <DataTable
      title="Custom Packages"
      columns={columns}
      data={customPackages}
      loading={loading}
      viewLink={(row) => `/admin/custom-packages/${row.id}`}
    />
  )
}

