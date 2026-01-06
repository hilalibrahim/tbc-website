'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Save, X } from 'lucide-react'

interface LeadFormProps {
  leadId?: string
}

export default function LeadForm({ leadId }: LeadFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
    source: '',
    status: 'NEW',
    notes: '',
    assignedTo: '',
  })

  useEffect(() => {
    if (leadId) {
      fetchLead()
    }
  }, [leadId])

  const fetchLead = async () => {
    try {
      const res = await fetch(`/api/leads/${leadId}`)
      if (!res.ok) throw new Error('Failed to fetch lead')
      const lead = await res.json()
      
      setFormData({
        name: lead.name || '',
        email: lead.email || '',
        phone: lead.phone || '',
        company: lead.company || '',
        service: lead.service || '',
        message: lead.message || '',
        source: lead.source || '',
        status: lead.status || 'NEW',
        notes: lead.notes || '',
        assignedTo: lead.assignedTo || '',
      })
    } catch (error) {
      console.error('Error fetching lead:', error)
      alert('Failed to load lead')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        company: formData.company || undefined,
        service: formData.service || undefined,
        message: formData.message || undefined,
        source: formData.source || undefined,
        ...(leadId && {
          status: formData.status,
          notes: formData.notes || undefined,
          assignedTo: formData.assignedTo || undefined,
        }),
      }

      const url = leadId ? `/api/leads/${leadId}` : '/api/leads'
      const method = leadId ? 'PATCH' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Failed to save lead')
      }

      router.push('/admin/leads')
    } catch (error: any) {
      console.error('Error saving lead:', error)
      alert(error.message || 'Failed to save lead')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-6 rounded-xl border border-[#BFBFBF]/10 bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A]">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-[#D9D9D9] via-[#BFBFBF] to-[#8C8C8C] bg-clip-text text-transparent mb-6">
          {leadId ? 'Edit Lead' : 'Create New Lead'}
        </h3>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#BFBFBF] mb-2">
                Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full border border-[#BFBFBF]/20 bg-gradient-to-br from-[#0A0A0A] to-[#151515] px-4 py-3 rounded-xl text-[#D9D9D9] placeholder-[#8C8C8C] focus:border-[#D9D9D9]/50 focus:outline-none focus:ring-1 focus:ring-[#D9D9D9]/20"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#BFBFBF] mb-2">
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full border border-[#BFBFBF]/20 bg-gradient-to-br from-[#0A0A0A] to-[#151515] px-4 py-3 rounded-xl text-[#D9D9D9] placeholder-[#8C8C8C] focus:border-[#D9D9D9]/50 focus:outline-none focus:ring-1 focus:ring-[#D9D9D9]/20"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#BFBFBF] mb-2">
                Phone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full border border-[#BFBFBF]/20 bg-gradient-to-br from-[#0A0A0A] to-[#151515] px-4 py-3 rounded-xl text-[#D9D9D9] placeholder-[#8C8C8C] focus:border-[#D9D9D9]/50 focus:outline-none focus:ring-1 focus:ring-[#D9D9D9]/20"
                placeholder="+1234567890"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#BFBFBF] mb-2">
                Company
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full border border-[#BFBFBF]/20 bg-gradient-to-br from-[#0A0A0A] to-[#151515] px-4 py-3 rounded-xl text-[#D9D9D9] placeholder-[#8C8C8C] focus:border-[#D9D9D9]/50 focus:outline-none focus:ring-1 focus:ring-[#D9D9D9]/20"
                placeholder="Company Name"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#BFBFBF] mb-2">
                Service
              </label>
              <input
                type="text"
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full border border-[#BFBFBF]/20 bg-gradient-to-br from-[#0A0A0A] to-[#151515] px-4 py-3 rounded-xl text-[#D9D9D9] placeholder-[#8C8C8C] focus:border-[#D9D9D9]/50 focus:outline-none focus:ring-1 focus:ring-[#D9D9D9]/20"
                placeholder="Service interested in"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#BFBFBF] mb-2">
                Source
              </label>
              <input
                type="text"
                value={formData.source}
                onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                className="w-full border border-[#BFBFBF]/20 bg-gradient-to-br from-[#0A0A0A] to-[#151515] px-4 py-3 rounded-xl text-[#D9D9D9] placeholder-[#8C8C8C] focus:border-[#D9D9D9]/50 focus:outline-none focus:ring-1 focus:ring-[#D9D9D9]/20"
                placeholder="Website, Referral, etc."
              />
            </div>
          </div>

          {leadId && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#BFBFBF] mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full border border-[#BFBFBF]/20 bg-gradient-to-br from-[#0A0A0A] to-[#151515] px-4 py-3 rounded-xl text-[#D9D9D9] focus:border-[#D9D9D9]/50 focus:outline-none focus:ring-1 focus:ring-[#D9D9D9]/20"
                >
                  <option value="NEW">New</option>
                  <option value="CONTACTED">Contacted</option>
                  <option value="QUALIFIED">Qualified</option>
                  <option value="CONVERTED">Converted</option>
                  <option value="LOST">Lost</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#BFBFBF] mb-2">
                  Assigned To
                </label>
                <input
                  type="text"
                  value={formData.assignedTo}
                  onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                  className="w-full border border-[#BFBFBF]/20 bg-gradient-to-br from-[#0A0A0A] to-[#151515] px-4 py-3 rounded-xl text-[#D9D9D9] placeholder-[#8C8C8C] focus:border-[#D9D9D9]/50 focus:outline-none focus:ring-1 focus:ring-[#D9D9D9]/20"
                  placeholder="User ID or name"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-[#BFBFBF] mb-2">
              Message
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={4}
              className="w-full border border-[#BFBFBF]/20 bg-gradient-to-br from-[#0A0A0A] to-[#151515] px-4 py-3 rounded-xl text-[#D9D9D9] placeholder-[#8C8C8C] focus:border-[#D9D9D9]/50 focus:outline-none focus:ring-1 focus:ring-[#D9D9D9]/20 resize-none"
              placeholder="Lead's message or inquiry..."
            />
          </div>

          {leadId && (
            <div>
              <label className="block text-sm font-semibold text-[#BFBFBF] mb-2">
                Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                className="w-full border border-[#BFBFBF]/20 bg-gradient-to-br from-[#0A0A0A] to-[#151515] px-4 py-3 rounded-xl text-[#D9D9D9] placeholder-[#8C8C8C] focus:border-[#D9D9D9]/50 focus:outline-none focus:ring-1 focus:ring-[#D9D9D9]/20 resize-none"
                placeholder="Internal notes about this lead..."
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-4 justify-end">
        <button
          type="button"
          onClick={() => router.push('/admin/leads')}
          className="flex items-center gap-2 bg-gradient-to-r from-[#0A0A0A] to-[#1A1A1A] text-[#BFBFBF] px-6 py-3 rounded-xl font-semibold hover:text-[#D9D9D9] border border-[#BFBFBF]/20 hover:border-[#D9D9D9]/30 transition-all duration-300"
        >
          <X className="w-4 h-4" />
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] text-[#D9D9D9] px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 border border-[#BFBFBF]/20 hover:border-[#D9D9D9]/30 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save className="w-4 h-4" />
          {loading ? 'Saving...' : leadId ? 'Update Lead' : 'Create Lead'}
        </button>
      </div>
    </form>
  )
}

