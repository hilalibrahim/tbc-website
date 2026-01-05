'use client'

import { useState, useEffect } from 'react'
import DataTable from '@/components/admin/DataTable'

interface Service {
  id: string
  name: string
  slug: string
  category: string | null
  basePrice: number | null
  isActive: boolean
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/services')
      if (!res.ok) {
        throw new Error('Failed to fetch services')
      }
      const data = await res.json()
      // Ensure data is an array
      setServices(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching services:', error)
      setServices([]) // Set empty array on error
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (service: Service) => {
    if (!confirm(`Are you sure you want to delete "${service.name}"?`)) return

    try {
      const res = await fetch(`/api/services/${service.id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        fetchServices()
      }
    } catch (error) {
      console.error('Error deleting service:', error)
      alert('Failed to delete service')
    }
  }

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Slug', accessor: 'slug' },
    { header: 'Category', accessor: (row: Service) => row.category || 'N/A' },
    {
      header: 'Base Price',
      accessor: (row: Service) =>
        row.basePrice ? `₹${row.basePrice.toFixed(2)}` : 'N/A',
    },
    {
      header: 'Status',
      accessor: (row: Service) => (
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full ${
            row.isActive
              ? 'bg-gradient-to-r from-[#0A0A0A] to-[#1A1A1A] text-[#D9D9D9] border border-[#BFBFBF]/20'
              : 'bg-gradient-to-r from-[#0A0A0A] to-[#1A1A1A] text-[#8C8C8C] border border-[#BFBFBF]/10'
          }`}
        >
          {row.isActive ? 'Active' : 'Inactive'}
        </span>
      ),
    },
  ]

  return (
    <DataTable
      title="Services"
      columns={columns}
      data={services}
      loading={loading}
      createLink="/admin/services/new"
      editLink={(row) => `/admin/services/${row.id}/edit`}
      onDelete={handleDelete}
    />
  )
}

