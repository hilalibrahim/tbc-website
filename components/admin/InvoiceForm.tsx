'use client'

import { useState, useEffect } from 'react'
import { Save, X, Plus, Trash2 } from 'lucide-react'

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
    currency: 'INR',
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
      <div className="p-6 rounded-xl border border-[#BFBFBF]/10 bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A]">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-[#D9D9D9] via-[#BFBFBF] to-[#8C8C8C] bg-clip-text text-transparent mb-6">Invoice Details</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[#BFBFBF] mb-2">
              Client *
            </label>
            <select
              value={formData.leadId}
              onChange={(e) => setFormData({ ...formData, leadId: e.target.value })}
              required
              className="w-full border border-[#BFBFBF]/20 bg-gradient-to-br from-[#0A0A0A] to-[#151515] px-4 py-3 rounded-xl text-[#D9D9D9] focus:border-[#D9D9D9]/50 focus:outline-none focus:ring-1 focus:ring-[#D9D9D9]/20"
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
              <label className="block text-sm font-semibold text-[#BFBFBF] mb-2">
                Issue Date *
              </label>
              <input
                type="date"
                value={formData.issueDate}
                onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                required
                className="w-full border border-[#BFBFBF]/20 bg-gradient-to-br from-[#0A0A0A] to-[#151515] px-4 py-3 rounded-xl text-[#D9D9D9] focus:border-[#D9D9D9]/50 focus:outline-none focus:ring-1 focus:ring-[#D9D9D9]/20"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#BFBFBF] mb-2">
                Payment Terms (Days) *
              </label>
              <input
                type="number"
                value={formData.dueDays}
                onChange={(e) => setFormData({ ...formData, dueDays: parseInt(e.target.value) || 30 })}
                required
                min="1"
                className="w-full border border-[#BFBFBF]/20 bg-gradient-to-br from-[#0A0A0A] to-[#151515] px-4 py-3 rounded-xl text-[#D9D9D9] focus:border-[#D9D9D9]/50 focus:outline-none focus:ring-1 focus:ring-[#D9D9D9]/20"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-xl border border-[#BFBFBF]/10 bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A]">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-[#D9D9D9]">Invoice Items</h3>
          <button
            type="button"
            onClick={addItem}
            className="flex items-center gap-2 bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] text-[#D9D9D9] px-4 py-2 rounded-lg font-semibold hover:border-[#D9D9D9]/30 border border-[#BFBFBF]/20 transition-all duration-300"
          >
            <Plus className="w-4 h-4" />
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
                  className="w-full border border-[#BFBFBF]/20 bg-gradient-to-br from-[#0A0A0A] to-[#151515] px-4 py-3 rounded-xl text-[#D9D9D9] focus:border-[#D9D9D9]/50 focus:outline-none focus:ring-1 focus:ring-[#D9D9D9]/20"
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
                  className="w-full border border-[#BFBFBF]/20 bg-gradient-to-br from-[#0A0A0A] to-[#151515] px-4 py-3 rounded-xl text-[#D9D9D9] focus:border-[#D9D9D9]/50 focus:outline-none focus:ring-1 focus:ring-[#D9D9D9]/20"
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
                  className="w-full border border-[#BFBFBF]/20 bg-gradient-to-br from-[#0A0A0A] to-[#151515] px-4 py-3 rounded-xl text-[#D9D9D9] focus:border-[#D9D9D9]/50 focus:outline-none focus:ring-1 focus:ring-[#D9D9D9]/20"
                />
              </div>
              <div className="col-span-1 text-right font-medium text-[#D9D9D9]">
                ₹{(item.quantity * item.unitPrice).toFixed(2)}
              </div>
              <div className="col-span-1">
                {formData.items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="flex items-center gap-1 text-[#BFBFBF] hover:text-red-400 font-semibold transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 rounded-xl border border-[#BFBFBF]/10 bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A]">
        <h3 className="text-2xl font-bold text-[#D9D9D9] mb-6">Totals</h3>
        
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-[#8C8C8C]">Subtotal:</span>
            <span className="font-medium text-[#D9D9D9]">
              ₹{totals.subtotal.toFixed(2)}
            </span>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-[#BFBFBF] mb-2">
              Discount (%)
            </label>
            <input
              type="number"
              value={formData.discount}
              onChange={(e) => setFormData({ ...formData, discount: parseFloat(e.target.value) || 0 })}
              min="0"
              max="100"
              step="0.01"
              className="w-full border border-[#BFBFBF]/20 bg-gradient-to-br from-[#0A0A0A] to-[#151515] px-4 py-3 rounded-xl text-[#D9D9D9] placeholder-[#8C8C8C] focus:border-[#D9D9D9]/50 focus:outline-none focus:ring-1 focus:ring-[#D9D9D9]/20"
            />
            <div className="text-right mt-1 text-sm text-[#8C8C8C]">
              Discount: ₹{totals.discount.toFixed(2)}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#BFBFBF] mb-2">
              Tax Rate (%)
            </label>
            <input
              type="number"
              value={formData.taxRate}
              onChange={(e) => setFormData({ ...formData, taxRate: parseFloat(e.target.value) || 0 })}
              min="0"
              step="0.01"
              className="w-full border border-[#BFBFBF]/20 bg-gradient-to-br from-[#0A0A0A] to-[#151515] px-4 py-3 rounded-xl text-[#D9D9D9] placeholder-[#8C8C8C] focus:border-[#D9D9D9]/50 focus:outline-none focus:ring-1 focus:ring-[#D9D9D9]/20"
            />
            <div className="text-right mt-1 text-sm text-[#8C8C8C]">
              Tax: ₹{totals.tax.toFixed(2)}
            </div>
          </div>

          <div className="pt-4 border-t border-[#BFBFBF]/10 flex justify-between text-lg font-bold">
            <span className="text-[#D9D9D9]">Total:</span>
            <span className="bg-gradient-to-r from-[#D9D9D9] to-[#BFBFBF] bg-clip-text text-transparent">
              ₹{totals.total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-xl border border-[#BFBFBF]/10 bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A]">
        <h3 className="text-2xl font-bold text-[#D9D9D9] mb-6">Additional Information</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[#BFBFBF] mb-2">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={4}
              className="w-full border border-[#BFBFBF]/20 bg-gradient-to-br from-[#0A0A0A] to-[#151515] px-4 py-3 rounded-xl text-[#D9D9D9] placeholder-[#8C8C8C] focus:border-[#D9D9D9]/50 focus:outline-none focus:ring-1 focus:ring-[#D9D9D9]/20 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#BFBFBF] mb-2">
              Terms & Conditions
            </label>
            <textarea
              value={formData.terms}
              onChange={(e) => setFormData({ ...formData, terms: e.target.value })}
              rows={4}
              className="w-full border border-[#BFBFBF]/20 bg-gradient-to-br from-[#0A0A0A] to-[#151515] px-4 py-3 rounded-xl text-[#D9D9D9] placeholder-[#8C8C8C] focus:border-[#D9D9D9]/50 focus:outline-none focus:ring-1 focus:ring-[#D9D9D9]/20 resize-none"
              placeholder="Payment terms, late fees, etc."
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <button
          type="submit"
          disabled={loading}
          className="group flex items-center justify-center gap-2 bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] text-[#D9D9D9] px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 border border-[#BFBFBF]/20 hover:border-[#D9D9D9]/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-sm sm:text-base w-full sm:w-auto"
        >
          <Save className="w-4 h-4" />
          {loading ? 'Saving...' : invoiceId ? 'Update Invoice' : 'Create Invoice'}
        </button>
        <a
          href="/admin/invoices"
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#0A0A0A] to-[#1A1A1A] text-[#BFBFBF] px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 hover:text-[#D9D9D9] border border-[#BFBFBF]/20 hover:border-[#D9D9D9]/30 text-sm sm:text-base w-full sm:w-auto"
        >
          <X className="w-4 h-4" />
          Cancel
        </a>
      </div>
    </form>
  )
}

