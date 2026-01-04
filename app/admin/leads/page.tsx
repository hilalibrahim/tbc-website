'use client'

import { useState, useEffect } from 'react'
import DataTable from '@/components/admin/DataTable'

interface Lead {
  id: string
  name: string
  email: string
  company: string | null
  phone: string | null
  service: string | null
  status: string
  createdAt: string
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')

  useEffect(() => {
    fetchLeads()
  }, [filter])

  const fetchLeads = async () => {
    try {
      const url = filter !== 'all' ? `/api/leads?status=${filter}` : '/api/leads'
      const res = await fetch(url)
      if (!res.ok) {
        throw new Error('Failed to fetch leads')
      }
      const data = await res.json()
      // Ensure data is an array
      setLeads(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching leads:', error)
      setLeads([]) // Set empty array on error
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      NEW: 'bg-blue-100 text-blue-800',
      CONTACTED: 'bg-yellow-100 text-yellow-800',
      QUALIFIED: 'bg-purple-100 text-purple-800',
      CONVERTED: 'bg-green-100 text-green-800',
      LOST: 'bg-red-100 text-red-800',
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Company', accessor: 'company' || 'N/A' },
    { header: 'Phone', accessor: 'phone' || 'N/A' },
    { header: 'Service', accessor: 'service' || 'N/A' },
    {
      header: 'Status',
      accessor: (row: Lead) => (
        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(row.status)}`}>
          {row.status}
        </span>
      ),
    },
    {
      header: 'Created',
      accessor: (row: Lead) => new Date(row.createdAt).toLocaleDateString(),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        {['all', 'NEW', 'CONTACTED', 'QUALIFIED', 'CONVERTED', 'LOST'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg transition-colors font-heading ${
              filter === status
                ? 'bg-accent text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {status.charAt(0) + status.slice(1).toLowerCase()}
          </button>
        ))}
      </div>
      <DataTable
        title="Leads"
        columns={columns}
        data={leads}
        loading={loading}
        viewLink={(row) => `/admin/leads/${row.id}`}
      />
    </div>
  )
}

