'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
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
}

export default function EmployeeLeavesPage() {
  const params = useParams()
  const employeeId = params.id as string
  const [leaves, setLeaves] = useState<Leave[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLeaves()
  }, [employeeId])

  const fetchLeaves = async () => {
    try {
      const res = await fetch(`/api/leaves?employeeId=${employeeId}`)
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

  const columns = [
    {
      header: 'Type',
      accessor: (row: Leave) => row.type,
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
    {
      header: 'Reason',
      accessor: (row: Leave) => row.reason || 'N/A',
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-heading text-foreground">Leave History</h2>
        <Link
          href={`/admin/team/leaves/new?employeeId=${employeeId}`}
          className="bg-accent text-white px-6 py-3 rounded-xl font-heading transition-all duration-300 hover:bg-accent-hover shadow-depth-3 hover:shadow-depth-4"
        >
          Request Leave
        </Link>
      </div>
      <DataTable
        title=""
        columns={columns}
        data={leaves}
        loading={loading}
        editLink={(row) => `/admin/team/leaves/${row.id}/edit`}
      />
    </div>
  )
}

