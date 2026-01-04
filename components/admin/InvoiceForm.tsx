'use client'

import { useState, useEffect } from 'react'
import Card from '@/components/Card'

interface InvoiceFormProps {
  invoiceId?: string
  orderId?: string
  leadId?: string
  onSuccess?: () => void
}

interface Lead {
  id: string
  name: string
  email: string
  company: string | null
}

export default function InvoiceForm({ invoiceId, orderId, leadId, onSuccess }: InvoiceFormProps) {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    leadId: leadId || '',
    issueDate: new Date().toISOString().split('T')[0],
    dueDays: 30,
    items: [{ description: '', quantity: 1, unitPrice: 0 }],
    taxRate: 0,
    discount: 0,
    notes: '',
    terms: '',
    currency: 'USD',
  })

  useEffect(() => {
    fetchLeads()
    if (invoiceId) {
      fetchInvoice()
    }
  }, [invoiceId])

  const fetchLeads = async () => {
    try {
      const res = await fetch('/api/leads')
      const data = await res.json()
      setLeads(data)
    } catch (error) {
      console.error('Error fetching leads:', error)
    }
  }

  const fetchInvoice = async () => {
    try {
      const res = await fetch(`/api/invoices/${invoiceId}`)
      const invoice = await res.json()
      
      setFormData({
        leadId: invoice.leadId,
        issueDate: new Date(invoice.issueDate).toISOString().split('T')[0],
        dueDays: Math.ceil((new Date(invoice.dueDate).getTime() - new Date(invoice.issueDate).getTime()) / (1000 * 60 * 60 * 24)),
        items: invoice.items.map((item: any) => ({
          description: item.description,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        })),
        taxRate: invoice.tax / invoice.subtotal * 100,
        discount: invoice.discount / invoice.subtotal * 100,
        notes: invoice.notes || '',
        terms: invoice.terms || '',
        currency: invoice.currency,
      })
    } catch (error) {
      console.error('Error fetching invoice:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = invoiceId ? `/api/invoices/${invoiceId}` : '/api/invoices'
      const method = invoiceId ? 'PATCH' : 'POST'

      const payload = {
        ...formData,
        orderId: orderId || undefined,
        issueDate: formData.issueDate,
      }

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        throw new Error('Failed to save invoice')
      }

      if (onSuccess) {
        onSuccess()
      } else {
        window.location.href = '/admin/invoices'
      }
    } catch (error) {
      console.error('Error saving invoice:', error)
      alert('Failed to save invoice. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { description: '', quantity: 1, unitPrice: 0 }],
    })
  }

  const removeItem = (index: number) => {
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index),
    })
  }

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...formData.items]
    newItems[index] = { ...newItems[index], [field]: value }
    if (field === 'quantity' || field === 'unitPrice') {
      newItems[index].total = newItems[index].quantity * newItems[index].unitPrice
    }
    setFormData({ ...formData, items: newItems })
  }

  const calculateTotal = () => {
    const subtotal = formData.items.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice,
      0
    )
    const discountAmount = (subtotal * formData.discount) / 100
    const afterDiscount = subtotal - discountAmount
    const tax = (afterDiscount * formData.taxRate) / 100
    return {
      subtotal,
      discount: discountAmount,
      tax,
      total: afterDiscount + tax,
    }
  }

  const totals = calculateTotal()

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="p-6">
        <h3 className="text-2xl font-heading text-foreground mb-6">Invoice Details</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-heading text-foreground mb-2">
              Client *
            </label>
            <select
              value={formData.leadId}
              onChange={(e) => setFormData({ ...formData, leadId: e.target.value })}
              required
              className="w-full border border-border bg-white px-4 py-3 rounded-xl text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="">Select a client</option>
              {leads.map((lead) => (
                <option key={lead.id} value={lead.id}>
                  {lead.name} {lead.company && `(${lead.company})`}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-heading text-foreground mb-2">
                Issue Date *
              </label>
              <input
                type="date"
                value={formData.issueDate}
                onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                required
                className="w-full border border-border bg-white px-4 py-3 rounded-xl text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-heading text-foreground mb-2">
                Payment Terms (Days) *
              </label>
              <input
                type="number"
                value={formData.dueDays}
                onChange={(e) => setFormData({ ...formData, dueDays: parseInt(e.target.value) || 30 })}
                required
                min="1"
                className="w-full border border-border bg-white px-4 py-3 rounded-xl text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-heading text-foreground">Invoice Items</h3>
          <button
            type="button"
            onClick={addItem}
            className="bg-accent text-white px-4 py-2 rounded-lg font-heading hover:bg-accent-hover transition-colors"
          >
            Add Item
          </button>
        </div>

        <div className="space-y-4">
          {formData.items.map((item, index) => (
            <div key={index} className="grid grid-cols-12 gap-4 items-end">
              <div className="col-span-5">
                <input
                  type="text"
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) => updateItem(index, 'description', e.target.value)}
                  required
                  className="w-full border border-border bg-white px-4 py-3 rounded-xl text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div className="col-span-2">
                <input
                  type="number"
                  placeholder="Qty"
                  value={item.quantity}
                  onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value) || 0)}
                  required
                  min="0.01"
                  step="0.01"
                  className="w-full border border-border bg-white px-4 py-3 rounded-xl text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div className="col-span-3">
                <input
                  type="number"
                  placeholder="Unit Price"
                  value={item.unitPrice}
                  onChange={(e) => updateItem(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                  required
                  min="0"
                  step="0.01"
                  className="w-full border border-border bg-white px-4 py-3 rounded-xl text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div className="col-span-1 text-right font-medium text-foreground">
                {formData.currency} {(item.quantity * item.unitPrice).toFixed(2)}
              </div>
              <div className="col-span-1">
                {formData.items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="text-red-600 hover:text-red-800 font-heading"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-2xl font-heading text-foreground mb-6">Totals</h3>
        
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-secondary">Subtotal:</span>
            <span className="font-medium text-foreground">
              {formData.currency} {totals.subtotal.toFixed(2)}
            </span>
          </div>
          
          <div>
            <label className="block text-sm font-heading text-foreground mb-2">
              Discount (%)
            </label>
            <input
              type="number"
              value={formData.discount}
              onChange={(e) => setFormData({ ...formData, discount: parseFloat(e.target.value) || 0 })}
              min="0"
              max="100"
              step="0.01"
              className="w-full border border-border bg-white px-4 py-3 rounded-xl text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <div className="text-right mt-1 text-sm text-secondary">
              Discount: {formData.currency} {totals.discount.toFixed(2)}
            </div>
          </div>

          <div>
            <label className="block text-sm font-heading text-foreground mb-2">
              Tax Rate (%)
            </label>
            <input
              type="number"
              value={formData.taxRate}
              onChange={(e) => setFormData({ ...formData, taxRate: parseFloat(e.target.value) || 0 })}
              min="0"
              step="0.01"
              className="w-full border border-border bg-white px-4 py-3 rounded-xl text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <div className="text-right mt-1 text-sm text-secondary">
              Tax: {formData.currency} {totals.tax.toFixed(2)}
            </div>
          </div>

          <div className="pt-4 border-t border-border flex justify-between text-lg font-bold">
            <span className="text-foreground">Total:</span>
            <span className="text-foreground">
              {formData.currency} {totals.total.toFixed(2)}
            </span>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-2xl font-heading text-foreground mb-6">Additional Information</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-heading text-foreground mb-2">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={4}
              className="w-full border border-border bg-white px-4 py-3 rounded-xl text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-heading text-foreground mb-2">
              Terms & Conditions
            </label>
            <textarea
              value={formData.terms}
              onChange={(e) => setFormData({ ...formData, terms: e.target.value })}
              rows={4}
              className="w-full border border-border bg-white px-4 py-3 rounded-xl text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent resize-none"
              placeholder="Payment terms, late fees, etc."
            />
          </div>
        </div>
      </Card>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-accent text-white px-8 py-4 rounded-xl font-heading transition-all duration-300 hover:bg-accent-hover shadow-depth-3 hover:shadow-depth-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : invoiceId ? 'Update Invoice' : 'Create Invoice'}
        </button>
        <a
          href="/admin/invoices"
          className="bg-gray-200 text-gray-700 px-8 py-4 rounded-xl font-heading transition-all duration-300 hover:bg-gray-300"
        >
          Cancel
        </a>
      </div>
    </form>
  )
}

