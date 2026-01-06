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
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<string>('all')

  useEffect(() => {
    fetchLeads()
  }, [filter])

  const fetchLeads = async () => {
    setLoading(true)
    setError(null)
    try {
      const url = filter !== 'all' ? `/api/leads?status=${filter}` : '/api/leads'
      const res = await fetch(url)
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Unknown error' }))
        throw new Error(errorData.error || `Failed to fetch leads: ${res.status} ${res.statusText}`)
      }
      const data = await res.json()
      // Ensure data is an array
      setLeads(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching leads:', error)
      setError(error instanceof Error ? error.message : 'Failed to fetch leads')
      setLeads([]) // Set empty array on error
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      NEW: 'bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] text-[#D9D9D9] border border-[#BFBFBF]/20',
      CONTACTED: 'bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] text-[#BFBFBF] border border-[#BFBFBF]/20',
      QUALIFIED: 'bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] text-[#D9D9D9] border border-[#BFBFBF]/20',
      CONVERTED: 'bg-gradient-to-r from-[#0A0A0A] to-[#1A1A1A] text-[#D9D9D9] border border-[#BFBFBF]/20',
      LOST: 'bg-gradient-to-r from-[#0A0A0A] to-[#1A1A1A] text-red-400 border border-red-400/20',
    }
    return colors[status] || 'bg-gradient-to-r from-[#0A0A0A] to-[#1A1A1A] text-[#8C8C8C] border border-[#BFBFBF]/10'
  }

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Company', accessor: (row: Lead) => row.company || 'N/A' },
    { header: 'Phone', accessor: (row: Lead) => row.phone || 'N/A' },
    { header: 'Service', accessor: (row: Lead) => row.service || 'N/A' },
    {
      header: 'Status',
      accessor: (row: Lead) => (
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(row.status)}`}>
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
      <div className="flex gap-2 sm:gap-3 flex-wrap">
        {['all', 'NEW', 'CONTACTED', 'QUALIFIED', 'CONVERTED', 'LOST'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-3 sm:px-4 py-2 rounded-lg transition-all duration-300 font-semibold text-xs sm:text-sm ${
              filter === status
                ? 'bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] text-[#D9D9D9] border border-[#D9D9D9]/30'
                : 'bg-gradient-to-r from-[#0A0A0A] to-[#1A1A1A] text-[#8C8C8C] border border-[#BFBFBF]/20 hover:text-[#D9D9D9] hover:border-[#D9D9D9]/30'
            }`}
          >
            {status.charAt(0) + status.slice(1).toLowerCase()}
          </button>
        ))}
      </div>
      {error && (
        <div className="p-4 rounded-xl border border-red-400/20 bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A]">
          <p className="text-red-400 text-sm">{error}</p>
          <button
            onClick={fetchLeads}
            className="mt-2 px-4 py-2 bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] text-[#D9D9D9] rounded-lg border border-[#BFBFBF]/20 hover:border-[#D9D9D9]/30 transition-all duration-300 text-sm font-semibold"
          >
            Retry
          </button>
        </div>
      )}
      <DataTable
        title="Leads"
        columns={columns}
        data={leads}
        loading={loading}
        createLink="/admin/leads/new"
        viewLink={(row) => `/admin/leads/${row.id}`}
        editLink={(row) => `/admin/leads/${row.id}/edit`}
      />
    </div>
  )
}

