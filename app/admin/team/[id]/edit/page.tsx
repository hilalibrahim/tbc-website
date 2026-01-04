'use client'

import { useParams } from 'next/navigation'
import EmployeeForm from '@/components/admin/EmployeeForm'

export default function EditEmployeePage() {
  const params = useParams()
  const employeeId = params.id as string

  return (
    <div>
      <h1 className="mb-8 text-4xl font-heading text-foreground">Edit Employee</h1>
      <EmployeeForm employeeId={employeeId} />
    </div>
  )
}

