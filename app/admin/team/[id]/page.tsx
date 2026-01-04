'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Card from '@/components/Card'

interface Employee {
  id: string
  employeeId: string | null
  name: string
  role: string
  department: string | null
  email: string | null
  phone: string | null
  address: string | null
  bio: string | null
  salary: number | null
  salaryType: string | null
  employmentType: string | null
  hireDate: string | null
  isActive: boolean
  payrolls: any[]
  leaves: any[]
  assignments: any[]
}

export default function EmployeeDetailPage() {
  const params = useParams()
  const router = useRouter()
  const employeeId = params.id as string
  const [employee, setEmployee] = useState<Employee | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEmployee()
  }, [employeeId])

  const fetchEmployee = async () => {
    try {
      const res = await fetch(`/api/team/${employeeId}`)
      if (!res.ok) throw new Error('Failed to fetch employee')
      const data = await res.json()
      setEmployee(data)
    } catch (error) {
      console.error('Error fetching employee:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-secondary">Loading employee details...</div>
      </div>
    )
  }

  if (!employee) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-red-600">Employee not found</div>
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading text-foreground">{employee.name}</h1>
          <p className="mt-2 text-secondary">{employee.role}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
          <Link
            href={`/admin/team/${employeeId}/edit`}
            className="bg-accent text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-heading hover:bg-accent-hover transition-colors text-center text-sm sm:text-base"
          >
            Edit Employee
          </Link>
          <Link
            href="/admin/team"
            className="bg-gray-200 text-gray-700 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-heading hover:bg-gray-300 transition-colors text-center text-sm sm:text-base"
          >
            Back to List
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <Card className="p-6">
          <h3 className="text-xl font-heading text-foreground mb-4">Employee Information</h3>
          <div className="space-y-3 text-secondary">
            {employee.employeeId && (
              <div>
                <span className="font-medium text-foreground">Employee ID:</span> {employee.employeeId}
              </div>
            )}
            <div>
              <span className="font-medium text-foreground">Department:</span> {employee.department || 'N/A'}
            </div>
            <div>
              <span className="font-medium text-foreground">Email:</span> {employee.email || 'N/A'}
            </div>
            <div>
              <span className="font-medium text-foreground">Phone:</span> {employee.phone || 'N/A'}
            </div>
            {employee.address && (
              <div>
                <span className="font-medium text-foreground">Address:</span> {employee.address}
              </div>
            )}
            {employee.hireDate && (
              <div>
                <span className="font-medium text-foreground">Hire Date:</span>{' '}
                {new Date(employee.hireDate).toLocaleDateString()}
              </div>
            )}
            <div>
              <span className="font-medium text-foreground">Employment Type:</span>{' '}
              {employee.employmentType?.replace('_', ' ') || 'N/A'}
            </div>
            <div>
              <span className="font-medium text-foreground">Status:</span>{' '}
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  employee.isActive
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {employee.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-heading text-foreground mb-4">Salary Information</h3>
          <div className="space-y-3 text-secondary">
            <div>
              <span className="font-medium text-foreground">Salary:</span>{' '}
              {employee.salary
                ? `₹${employee.salary.toFixed(2)}/${employee.salaryType?.toLowerCase() || 'monthly'}`
                : 'Not set'}
            </div>
            {employee.bio && (
              <div className="mt-4">
                <span className="font-medium text-foreground block mb-2">Bio:</span>
                <p className="text-secondary">{employee.bio}</p>
              </div>
            )}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-heading text-foreground">Payroll</h3>
            <Link
              href={`/admin/team/${employeeId}/payroll`}
              className="text-accent hover:text-accent-hover text-sm font-heading"
            >
              Manage →
            </Link>
          </div>
          <div className="text-3xl font-heading text-foreground mb-2">
            {employee.payrolls?.length || 0}
          </div>
          <div className="text-sm text-secondary">Payroll records</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-heading text-foreground">Leaves</h3>
            <Link
              href={`/admin/team/${employeeId}/leaves`}
              className="text-accent hover:text-accent-hover text-sm font-heading"
            >
              Manage →
            </Link>
          </div>
          <div className="text-3xl font-heading text-foreground mb-2">
            {employee.leaves?.length || 0}
          </div>
          <div className="text-sm text-secondary">Leave requests</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-heading text-foreground">Tasks</h3>
            <Link
              href={`/admin/team/${employeeId}/tasks`}
              className="text-accent hover:text-accent-hover text-sm font-heading"
            >
              Manage →
            </Link>
          </div>
          <div className="text-3xl font-heading text-foreground mb-2">
            {employee.assignments?.length || 0}
          </div>
          <div className="text-sm text-secondary">Task assignments</div>
        </Card>
      </div>
    </div>
  )
}

