'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Card from '@/components/Card'
import Link from 'next/link'

interface Invoice {
  id: string
  invoiceNumber: string
  issueDate: string
  dueDate: string
  paidDate: string | null
  status: string
  subtotal: number
  tax: number
  discount: number
  total: number
  currency: string
  notes: string | null
  terms: string | null
  lead: {
    name: string
    email: string
    phone: string | null
    company: string | null
  }
  items: Array<{
    id: string
    description: string
    quantity: number
    unitPrice: number
    total: number
  }>
  payments: Array<{
    id: string
    amount: number
    paymentMethod: string
    status: string
    paidAt: string | null
  }>
}

export default function InvoiceDetailPage() {
  const params = useParams()
  const invoiceId = params.id as string
  const [invoice, setInvoice] = useState<Invoice | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchInvoice()
  }, [invoiceId])

  const fetchInvoice = async () => {
    try {
      const res = await fetch(`/api/invoices/${invoiceId}`)
      const data = await res.json()
      setInvoice(data)
    } catch (error) {
      console.error('Error fetching invoice:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (newStatus: string) => {
    try {
      const res = await fetch(`/api/invoices/${invoiceId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      if (res.ok) {
        fetchInvoice()
      }
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-secondary">Loading invoice...</div>
      </div>
    )
  }

  if (!invoice) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600">Invoice not found</div>
      </div>
    )
  }

  const totalPaid = invoice.payments
    .filter(p => p.status === 'COMPLETED')
    .reduce((sum, p) => sum + p.amount, 0)
  const remaining = invoice.total - totalPaid

  return (
    <div>
      <div className="max-w-5xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-heading text-foreground">Invoice Details</h1>
            <p className="mt-2 text-secondary">Invoice #{invoice.invoiceNumber}</p>
          </div>
          <div className="flex gap-4">
            <a
              href={`/api/invoices/${invoiceId}/pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-heading hover:bg-blue-700 transition-colors"
            >
              Download PDF
            </a>
            <Link
              href="/admin/invoices"
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-heading hover:bg-gray-300 transition-colors"
            >
              Back to List
            </Link>
          </div>
        </div>

        {/* Invoice Info */}
        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card className="p-6">
            <h3 className="mb-4 text-xl font-heading text-foreground">Client Information</h3>
            <div className="space-y-2 text-secondary">
              <p className="font-medium text-foreground">{invoice.lead.name}</p>
              {invoice.lead.company && <p>{invoice.lead.company}</p>}
              <p>{invoice.lead.email}</p>
              {invoice.lead.phone && <p>{invoice.lead.phone}</p>}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-4 text-xl font-heading text-foreground">Invoice Details</h3>
            <div className="space-y-2 text-secondary">
              <div className="flex justify-between">
                <span>Status:</span>
                <span className={`font-medium ${
                  invoice.status === 'PAID' ? 'text-green-600' :
                  invoice.status === 'OVERDUE' ? 'text-red-600' :
                  'text-foreground'
                }`}>
                  {invoice.status}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Issue Date:</span>
                <span>{new Date(invoice.issueDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Due Date:</span>
                <span>{new Date(invoice.dueDate).toLocaleDateString()}</span>
              </div>
              {invoice.paidDate && (
                <div className="flex justify-between">
                  <span>Paid Date:</span>
                  <span>{new Date(invoice.paidDate).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Items */}
        <Card className="mb-6 p-6">
          <h3 className="mb-4 text-xl font-heading text-foreground">Invoice Items</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-left text-sm font-heading text-foreground">Description</th>
                  <th className="px-4 py-3 text-right text-sm font-heading text-foreground">Quantity</th>
                  <th className="px-4 py-3 text-right text-sm font-heading text-foreground">Unit Price</th>
                  <th className="px-4 py-3 text-right text-sm font-heading text-foreground">Total</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item) => (
                  <tr key={item.id} className="border-b border-border">
                    <td className="px-4 py-3 text-secondary">{item.description}</td>
                    <td className="px-4 py-3 text-right text-secondary">{item.quantity}</td>
                    <td className="px-4 py-3 text-right text-secondary">
                      ₹{item.unitPrice.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-foreground">
                      ₹{item.total.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="mt-6 border-t border-border pt-6">
            <div className="ml-auto max-w-xs space-y-2">
              <div className="flex justify-between text-secondary">
                <span>Subtotal:</span>
                <span>₹{invoice.subtotal.toFixed(2)}</span>
              </div>
              {invoice.discount > 0 && (
                <div className="flex justify-between text-secondary">
                  <span>Discount:</span>
                  <span>-₹{invoice.discount.toFixed(2)}</span>
                </div>
              )}
              {invoice.tax > 0 && (
                <div className="flex justify-between text-secondary">
                  <span>Tax:</span>
                  <span>₹{invoice.tax.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-border pt-2 text-lg font-bold text-foreground">
                <span>Total:</span>
                <span>₹{invoice.total.toFixed(2)}</span>
              </div>
              {totalPaid > 0 && (
                <>
                  <div className="flex justify-between text-green-600">
                    <span>Paid:</span>
                    <span>₹{totalPaid.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-red-600">
                    <span>Remaining:</span>
                    <span>₹{remaining.toFixed(2)}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </Card>

        {/* Payments */}
        {invoice.payments.length > 0 && (
          <Card className="mb-6 p-6">
            <h3 className="mb-4 text-xl font-heading text-foreground">Payments</h3>
            <div className="space-y-3">
              {invoice.payments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between border-b border-border pb-3">
                  <div>
                    <p className="font-medium text-foreground">{payment.paymentMethod}</p>
                    <p className="text-sm text-secondary">
                      {payment.paidAt ? new Date(payment.paidAt).toLocaleDateString() : 'Pending'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-foreground">
                      ₹{payment.amount.toFixed(2)}
                    </p>
                    <p className={`text-sm ${
                      payment.status === 'COMPLETED' ? 'text-green-600' :
                      payment.status === 'FAILED' ? 'text-red-600' :
                      'text-secondary'
                    }`}>
                      {payment.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Notes and Terms */}
        {(invoice.notes || invoice.terms) && (
          <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            {invoice.notes && (
              <Card className="p-6">
                <h3 className="mb-2 text-lg font-heading text-foreground">Notes</h3>
                <p className="text-secondary whitespace-pre-wrap">{invoice.notes}</p>
              </Card>
            )}
            {invoice.terms && (
              <Card className="p-6">
                <h3 className="mb-2 text-lg font-heading text-foreground">Terms & Conditions</h3>
                <p className="text-secondary whitespace-pre-wrap">{invoice.terms}</p>
              </Card>
            )}
          </div>
        )}

        {/* Status Actions */}
        <Card className="p-6">
          <h3 className="mb-4 text-xl font-heading text-foreground">Actions</h3>
          <div className="flex flex-wrap gap-3">
            {invoice.status === 'DRAFT' && (
              <button
                onClick={() => updateStatus('SENT')}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-heading hover:bg-blue-700 transition-colors"
              >
                Mark as Sent
              </button>
            )}
            {invoice.status !== 'PAID' && invoice.status !== 'CANCELLED' && (
              <button
                onClick={() => updateStatus('PAID')}
                className="bg-green-600 text-white px-6 py-2 rounded-lg font-heading hover:bg-green-700 transition-colors"
              >
                Mark as Paid
              </button>
            )}
            {invoice.status !== 'CANCELLED' && (
              <button
                onClick={() => updateStatus('CANCELLED')}
                className="bg-red-600 text-white px-6 py-2 rounded-lg font-heading hover:bg-red-700 transition-colors"
              >
                Cancel Invoice
              </button>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}

