'use client'

import { useParams } from 'next/navigation'
import LeadForm from '@/components/admin/LeadForm'

export default function EditLeadPage() {
  const params = useParams()
  const leadId = params.id as string

  return (
    <div>
      <h1 className="mb-4 sm:mb-8 text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#D9D9D9] via-[#BFBFBF] to-[#8C8C8C] bg-clip-text text-transparent">Edit Lead</h1>
      <LeadForm leadId={leadId} />
    </div>
  )
}

