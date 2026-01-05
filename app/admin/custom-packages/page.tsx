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
      PENDING: 'bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] text-[#D9D9D9] border border-[#BFBFBF]/20',
      APPROVED: 'bg-gradient-to-r from-[#0A0A0A] to-[#1A1A1A] text-[#D9D9D9] border border-[#BFBFBF]/20',
      REJECTED: 'bg-gradient-to-r from-[#0A0A0A] to-[#1A1A1A] text-red-400 border border-red-400/20',
      QUOTED: 'bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] text-[#BFBFBF] border border-[#BFBFBF]/20',
    }
    return colors[status] || 'bg-gradient-to-r from-[#0A0A0A] to-[#1A1A1A] text-[#8C8C8C] border border-[#BFBFBF]/10'
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
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(row.status)}`}>
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

