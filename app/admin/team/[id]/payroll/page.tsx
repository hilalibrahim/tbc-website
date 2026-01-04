'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Card from '@/components/Card'
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
}

export default function EmployeePayrollPage() {
  const params = useParams()
  const employeeId = params.id as string
  const [payrolls, setPayrolls] = useState<Payroll[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPayrolls()
  }, [employeeId])

  const fetchPayrolls = async () => {
    try {
      const res = await fetch(`/api/payroll?employeeId=${employeeId}`)
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
    { header: 'Period', accessor: 'period' },
    {
      header: 'Base Salary',
      accessor: (row: Payroll) => `₹${row.baseSalary.toFixed(2)}`,
    },
    {
      header: 'Bonuses',
      accessor: (row: Payroll) => `₹${row.bonuses.toFixed(2)}`,
    },
    {
      header: 'Deductions',
      accessor: (row: Payroll) => `₹${row.deductions.toFixed(2)}`,
    },
    {
      header: 'Tax',
      accessor: (row: Payroll) => `₹${row.tax.toFixed(2)}`,
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
        <h2 className="text-3xl font-heading text-foreground">Payroll History</h2>
        <Link
          href={`/admin/team/payroll/new?employeeId=${employeeId}`}
          className="bg-accent text-white px-6 py-3 rounded-xl font-heading transition-all duration-300 hover:bg-accent-hover shadow-depth-3 hover:shadow-depth-4"
        >
          Add Payroll
        </Link>
      </div>
      <DataTable
        title=""
        columns={columns}
        data={payrolls}
        loading={loading}
        editLink={(row) => `/admin/team/payroll/${row.id}/edit`}
      />
    </div>
  )
}

