'use client'

import { useState, useEffect } from 'react'
import DataTable from '@/components/admin/DataTable'

interface Order {
  id: string
  amount: number
  finalAmount: number
  status: string
  paymentMethod: string | null
  createdAt: string
  lead: {
    name: string
    email: string
  }
  package: {
    name: string
  } | null
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders')
      if (!res.ok) {
        throw new Error('Failed to fetch orders')
      }
      const data = await res.json()
      // Ensure data is an array
      setOrders(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching orders:', error)
      setOrders([]) // Set empty array on error
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      PAID: 'bg-green-100 text-green-800',
      CANCELLED: 'bg-red-100 text-red-800',
      REFUNDED: 'bg-gray-100 text-gray-800',
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  const columns = [
    { header: 'Order ID', accessor: 'id' },
    {
      header: 'Client',
      accessor: (row: Order) => (
        <div>
          <div className="font-medium">{row.lead.name}</div>
          <div className="text-sm text-secondary">{row.lead.email}</div>
        </div>
      ),
    },
    {
      header: 'Package',
      accessor: (row: Order) => row.package?.name || 'Custom',
    },
    {
      header: 'Amount',
      accessor: (row: Order) => `₹${row.finalAmount.toFixed(2)}`,
    },
    {
      header: 'Status',
      accessor: (row: Order) => (
        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(row.status)}`}>
          {row.status}
        </span>
      ),
    },
    {
      header: 'Payment Method',
      accessor: (row: Order) => row.paymentMethod || 'N/A',
    },
    {
      header: 'Created',
      accessor: (row: Order) => new Date(row.createdAt).toLocaleDateString(),
    },
  ]

  return (
    <DataTable
      title="Orders"
      columns={columns}
      data={orders}
      loading={loading}
      viewLink={(row) => `/admin/orders/${row.id}`}
    />
  )
}

