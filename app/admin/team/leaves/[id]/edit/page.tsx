'use client'

import { useParams } from 'next/navigation'
import LeaveForm from '@/components/admin/LeaveForm'

export default function EditLeavePage() {
  const params = useParams()
  const leaveId = params.id as string

  return (
    <div>
      <h1 className="mb-8 text-4xl font-heading text-foreground">Edit Leave Request</h1>
      <LeaveForm leaveId={leaveId} />
    </div>
  )
}

