'use client'

import { useParams } from 'next/navigation'
import PayrollForm from '@/components/admin/PayrollForm'

export default function EditPayrollPage() {
  const params = useParams()
  const payrollId = params.id as string

  return (
    <div>
      <h1 className="mb-8 text-4xl font-heading text-foreground">Edit Payroll</h1>
      <PayrollForm payrollId={payrollId} />
    </div>
  )
}

