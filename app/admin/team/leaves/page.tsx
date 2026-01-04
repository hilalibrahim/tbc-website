'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import DataTable from '@/components/admin/DataTable'

interface Leave {
  id: string
  type: string
  startDate: string
  endDate: string
  days: number
  status: string
  reason: string | null
  employee: {
    name: string
    employeeId: string | null
  }
}

export default function LeavesPage() {
  const [leaves, setLeaves] = useState<Leave[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')

  useEffect(() => {
    fetchLeaves()
  }, [filter])

  const fetchLeaves = async () => {
    try {
      const url = filter !== 'all' ? `/api/leaves?status=${filter}` : '/api/leaves'
      const res = await fetch(url)
      if (!res.ok) throw new Error('Failed to fetch leaves')
      const data = await res.json()
      setLeaves(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching leaves:', error)
      setLeaves([])
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      APPROVED: 'bg-green-100 text-green-800',
      REJECTED: 'bg-red-100 text-red-800',
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      VACATION: 'bg-blue-100 text-blue-800',
      SICK: 'bg-red-100 text-red-800',
      PERSONAL: 'bg-purple-100 text-purple-800',
      MATERNITY: 'bg-pink-100 text-pink-800',
      PATERNITY: 'bg-indigo-100 text-indigo-800',
    }
    return colors[type] || 'bg-gray-100 text-gray-800'
  }

  const columns = [
    {
      header: 'Employee',
      accessor: (row: Leave) => (
        <div>
          <div className="font-medium">{row.employee.name}</div>
          {row.employee.employeeId && (
            <div className="text-sm text-secondary">{row.employee.employeeId}</div>
          )}
        </div>
      ),
    },
    {
      header: 'Type',
      accessor: (row: Leave) => (
        <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(row.type)}`}>
          {row.type}
        </span>
      ),
    },
    {
      header: 'Period',
      accessor: (row: Leave) =>
        `${new Date(row.startDate).toLocaleDateString()} - ${new Date(row.endDate).toLocaleDateString()}`,
    },
    { header: 'Days', accessor: 'days' },
    {
      header: 'Status',
      accessor: (row: Leave) => (
        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(row.status)}`}>
          {row.status}
        </span>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-heading text-foreground">Leave Management</h2>
        <Link
          href="/admin/team/leaves/new"
          className="bg-accent text-white px-6 py-3 rounded-xl font-heading transition-all duration-300 hover:bg-accent-hover shadow-depth-3 hover:shadow-depth-4"
        >
          Create Leave Request
        </Link>
      </div>

      <div className="flex gap-4">
        {['all', 'PENDING', 'APPROVED', 'REJECTED'].map((status) => (
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
        title="Leave Requests"
        columns={columns}
        data={leaves}
        loading={loading}
        editLink={(row) => `/admin/team/leaves/${row.id}/edit`}
      />
    </div>
  )
}

