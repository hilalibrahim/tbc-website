'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Edit, ArrowLeft } from 'lucide-react'

interface Lead {
  id: string
  name: string
  email: string
  phone: string | null
  company: string | null
  service: string | null
  message: string | null
  source: string | null
  status: string
  notes: string | null
  assignedTo: string | null
  createdAt: string
  updatedAt: string
}

export default function LeadDetailPage() {
  const params = useParams()
  const router = useRouter()
  const leadId = params.id as string
  const [lead, setLead] = useState<Lead | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLead()
  }, [leadId])

  const fetchLead = async () => {
    try {
      const res = await fetch(`/api/leads/${leadId}`)
      if (!res.ok) throw new Error('Failed to fetch lead')
      const data = await res.json()
      setLead(data)
    } catch (error) {
      console.error('Error fetching lead:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      NEW: 'bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] text-[#D9D9D9] border border-[#BFBFBF]/20',
      CONTACTED: 'bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] text-[#BFBFBF] border border-[#BFBFBF]/20',
      QUALIFIED: 'bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] text-[#D9D9D9] border border-[#BFBFBF]/20',
      CONVERTED: 'bg-gradient-to-r from-[#0A0A0A] to-[#1A1A1A] text-[#D9D9D9] border border-[#BFBFBF]/20',
      LOST: 'bg-gradient-to-r from-[#0A0A0A] to-[#1A1A1A] text-red-400 border border-red-400/20',
    }
    return colors[status] || 'bg-gradient-to-r from-[#0A0A0A] to-[#1A1A1A] text-[#8C8C8C] border border-[#BFBFBF]/10'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-[#8C8C8C]">Loading lead...</div>
      </div>
    )
  }

  if (!lead) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-red-400">Lead not found</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/leads"
            className="flex items-center gap-2 text-[#BFBFBF] hover:text-[#D9D9D9] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Leads
          </Link>
        </div>
        <Link
          href={`/admin/leads/${leadId}/edit`}
          className="flex items-center gap-2 bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] text-[#D9D9D9] px-4 py-2 rounded-xl font-semibold hover:border-[#D9D9D9]/30 border border-[#BFBFBF]/20 transition-all duration-300"
        >
          <Edit className="w-4 h-4" />
          Edit Lead
        </Link>
      </div>

      <div className="p-6 rounded-xl border border-[#BFBFBF]/10 bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A]">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#D9D9D9] via-[#BFBFBF] to-[#8C8C8C] bg-clip-text text-transparent mb-2">
              {lead.name}
            </h1>
            <p className="text-[#8C8C8C]">{lead.email}</p>
          </div>
          <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(lead.status)}`}>
            {lead.status}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-semibold text-[#8C8C8C] mb-2">Contact Information</h3>
            <div className="space-y-2 text-[#BFBFBF]">
              <p><span className="text-[#8C8C8C]">Email:</span> {lead.email}</p>
              {lead.phone && <p><span className="text-[#8C8C8C]">Phone:</span> {lead.phone}</p>}
              {lead.company && <p><span className="text-[#8C8C8C]">Company:</span> {lead.company}</p>}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[#8C8C8C] mb-2">Lead Details</h3>
            <div className="space-y-2 text-[#BFBFBF]">
              {lead.service && <p><span className="text-[#8C8C8C]">Service:</span> {lead.service}</p>}
              {lead.source && <p><span className="text-[#8C8C8C]">Source:</span> {lead.source}</p>}
              {lead.assignedTo && <p><span className="text-[#8C8C8C]">Assigned To:</span> {lead.assignedTo}</p>}
              <p><span className="text-[#8C8C8C]">Created:</span> {new Date(lead.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {lead.message && (
          <div className="mt-6 pt-6 border-t border-[#BFBFBF]/10">
            <h3 className="text-sm font-semibold text-[#8C8C8C] mb-2">Message</h3>
            <p className="text-[#BFBFBF] whitespace-pre-wrap">{lead.message}</p>
          </div>
        )}

        {lead.notes && (
          <div className="mt-6 pt-6 border-t border-[#BFBFBF]/10">
            <h3 className="text-sm font-semibold text-[#8C8C8C] mb-2">Notes</h3>
            <p className="text-[#BFBFBF] whitespace-pre-wrap">{lead.notes}</p>
          </div>
        )}
      </div>
    </div>
  )
}

