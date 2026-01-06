import LeadForm from '@/components/admin/LeadForm'

export const metadata = {
  title: 'Create Lead - Admin Dashboard',
  description: 'Create a new lead',
}

export default function NewLeadPage() {
  return (
    <div>
      <h1 className="mb-4 sm:mb-8 text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#D9D9D9] via-[#BFBFBF] to-[#8C8C8C] bg-clip-text text-transparent">Create New Lead</h1>
      <LeadForm />
    </div>
  )
}

