'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Eye, FileText } from 'lucide-react'

interface Invoice {
  id: string
  invoiceNumber: string
  issueDate: string
  dueDate: string
  status: string
  total: number
  currency: string
  lead: {
    name: string
    company: string | null
  }
}

export default function InvoiceList() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')

  useEffect(() => {
    fetchInvoices()
  }, [filter])

  const fetchInvoices = async () => {
    try {
      const url = filter !== 'all' 
        ? `/api/invoices?status=${filter}`
        : '/api/invoices'
      const res = await fetch(url)
      const data = await res.json()
      setInvoices(data)
    } catch (error) {
      console.error('Error fetching invoices:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      DRAFT: 'bg-gray-500',
      SENT: 'bg-blue-500',
      VIEWED: 'bg-purple-500',
      PAID: 'bg-green-500',
      OVERDUE: 'bg-red-500',
      CANCELLED: 'bg-gray-400',
      REFUNDED: 'bg-orange-500',
    }
    return colors[status] || 'bg-gray-500'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-[#8C8C8C]">Loading invoices...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#D9D9D9] via-[#BFBFBF] to-[#8C8C8C] bg-clip-text text-transparent">Invoices</h2>
        <Link
          href="/admin/invoices/new"
          className="group flex items-center gap-2 bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] text-[#D9D9D9] px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 border border-[#BFBFBF]/20 hover:border-[#D9D9D9]/30 text-sm sm:text-base"
        >
          <Plus className="w-4 h-4" />
          Create Invoice
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-2 sm:gap-3 flex-wrap">
        {['all', 'DRAFT', 'SENT', 'PAID', 'OVERDUE'].map((status) => (
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

      {/* Invoice Table */}
      <div className="overflow-hidden rounded-xl border border-[#BFBFBF]/10 bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A]">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-br from-[#0A0A0A] to-[#151515] border-b border-[#BFBFBF]/10">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-[#8C8C8C] uppercase tracking-wider">
                  Invoice #
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-[#8C8C8C] uppercase tracking-wider">
                  Client
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-[#8C8C8C] uppercase tracking-wider">
                  Issue Date
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-[#8C8C8C] uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-[#8C8C8C] uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-[#8C8C8C] uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-[#8C8C8C] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#BFBFBF]/10">
              {invoices.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-[#8C8C8C]">
                    No invoices found
                  </td>
                </tr>
              ) : (
                invoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gradient-to-r hover:from-[#0A0A0A] hover:to-[#151515] transition-all duration-300">
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap font-medium text-[#D9D9D9]">
                      {invoice.invoiceNumber}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="font-medium text-[#D9D9D9]">{invoice.lead.name}</div>
                        {invoice.lead.company && (
                          <div className="text-sm text-[#8C8C8C]">
                            {invoice.lead.company}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-[#8C8C8C]">
                      {new Date(invoice.issueDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-[#8C8C8C]">
                      {new Date(invoice.dueDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap font-medium text-[#D9D9D9]">
                      ₹{invoice.total.toFixed(2)}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          invoice.status
                        )}`}
                      >
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-3">
                        <Link
                          href={`/admin/invoices/${invoice.id}`}
                          className="flex items-center gap-1 text-[#BFBFBF] hover:text-[#D9D9D9] transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </Link>
                        <a
                          href={`/api/invoices/${invoice.id}/pdf`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-[#BFBFBF] hover:text-[#D9D9D9] transition-colors"
                        >
                          <FileText className="w-4 h-4" />
                          PDF
                        </a>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

