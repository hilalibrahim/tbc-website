'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import DataTable from '@/components/admin/DataTable'

interface Payroll {
  id: string
  period: string
  baseSalary: number
  bonuses: number
  deductions: number
  tax: number
  netPay: number
  status: string
  paymentDate: string | null
  employee: {
    name: string
    employeeId: string | null
  }
}

export default function PayrollPage() {
  const [payrolls, setPayrolls] = useState<Payroll[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPayrolls()
  }, [])

  const fetchPayrolls = async () => {
    try {
      const res = await fetch('/api/payroll')
      if (!res.ok) throw new Error('Failed to fetch payrolls')
      const data = await res.json()
      setPayrolls(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching payrolls:', error)
      setPayrolls([])
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      PROCESSED: 'bg-blue-100 text-blue-800',
      PAID: 'bg-green-100 text-green-800',
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  const columns = [
    {
      header: 'Employee',
      accessor: (row: Payroll) => (
        <div>
          <div className="font-medium">{row.employee.name}</div>
          {row.employee.employeeId && (
            <div className="text-sm text-secondary">{row.employee.employeeId}</div>
          )}
        </div>
      ),
    },
    { header: 'Period', accessor: 'period' },
    {
      header: 'Base Salary',
      accessor: (row: Payroll) => `₹${row.baseSalary.toFixed(2)}`,
    },
    {
      header: 'Net Pay',
      accessor: (row: Payroll) => (
        <span className="font-medium text-foreground">₹{row.netPay.toFixed(2)}</span>
      ),
    },
    {
      header: 'Status',
      accessor: (row: Payroll) => (
        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(row.status)}`}>
          {row.status}
        </span>
      ),
    },
    {
      header: 'Payment Date',
      accessor: (row: Payroll) =>
        row.paymentDate ? new Date(row.paymentDate).toLocaleDateString() : 'N/A',
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-heading text-foreground">Payroll Management</h2>
        <Link
          href="/admin/team/payroll/new"
          className="bg-accent text-white px-6 py-3 rounded-xl font-heading transition-all duration-300 hover:bg-accent-hover shadow-depth-3 hover:shadow-depth-4"
        >
          Create Payroll
        </Link>
      </div>
      <DataTable
        title="Payroll Records"
        columns={columns}
        data={payrolls}
        loading={loading}
        viewLink={(row) => `/admin/team/payroll/${row.id}`}
        editLink={(row) => `/admin/team/payroll/${row.id}/edit`}
      />
    </div>
  )
}

