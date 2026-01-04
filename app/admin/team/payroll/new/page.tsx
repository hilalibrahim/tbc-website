import PayrollForm from '@/components/admin/PayrollForm'

export const metadata = {
  title: 'Create Payroll - Admin Dashboard',
  description: 'Create a new payroll record',
}

export default function NewPayrollPage() {
  return (
    <div>
      <h1 className="mb-8 text-4xl font-heading text-foreground">Create Payroll</h1>
      <PayrollForm />
    </div>
  )
}

