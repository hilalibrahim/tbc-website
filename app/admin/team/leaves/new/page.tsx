import LeaveForm from '@/components/admin/LeaveForm'

export const metadata = {
  title: 'Create Leave Request - Admin Dashboard',
  description: 'Create a new leave request',
}

export default function NewLeavePage() {
  return (
    <div>
      <h1 className="mb-8 text-4xl font-heading text-foreground">Create Leave Request</h1>
      <LeaveForm />
    </div>
  )
}

