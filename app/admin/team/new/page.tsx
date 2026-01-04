import EmployeeForm from '@/components/admin/EmployeeForm'

export const metadata = {
  title: 'Add Employee - Admin Dashboard',
  description: 'Add a new employee to the team',
}

export default function NewEmployeePage() {
  return (
    <div>
      <h1 className="mb-4 sm:mb-8 text-2xl sm:text-3xl lg:text-4xl font-heading text-foreground">Add New Employee</h1>
      <EmployeeForm />
    </div>
  )
}

