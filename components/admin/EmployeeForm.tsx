'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Card from '@/components/Card'

interface EmployeeFormProps {
  employeeId?: string
}

export default function EmployeeForm({ employeeId }: EmployeeFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    employeeId: '',
    name: '',
    role: '',
    department: '',
    bio: '',
    imageUrl: '',
    email: '',
    phone: '',
    address: '',
    linkedin: '',
    twitter: '',
    github: '',
    hireDate: '',
    employmentType: 'FULL_TIME',
    salary: '',
    salaryType: 'MONTHLY',
    displayOrder: 0,
    isActive: true,
  })

  useEffect(() => {
    if (employeeId) {
      fetchEmployee()
    }
  }, [employeeId])

  const fetchEmployee = async () => {
    try {
      const res = await fetch(`/api/team/${employeeId}`)
      if (!res.ok) throw new Error('Failed to fetch employee')
      const employee = await res.json()
      
      setFormData({
        employeeId: employee.employeeId || '',
        name: employee.name || '',
        role: employee.role || '',
        department: employee.department || '',
        bio: employee.bio || '',
        imageUrl: employee.imageUrl || '',
        email: employee.email || '',
        phone: employee.phone || '',
        address: employee.address || '',
        linkedin: employee.linkedin || '',
        twitter: employee.twitter || '',
        github: employee.github || '',
        hireDate: employee.hireDate ? new Date(employee.hireDate).toISOString().split('T')[0] : '',
        employmentType: employee.employmentType || 'FULL_TIME',
        salary: employee.salary?.toString() || '',
        salaryType: employee.salaryType || 'MONTHLY',
        displayOrder: employee.displayOrder || 0,
        isActive: employee.isActive ?? true,
      })
    } catch (error) {
      console.error('Error fetching employee:', error)
      alert('Failed to load employee')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const payload = {
        ...formData,
        salary: formData.salary ? parseFloat(formData.salary) : null,
      }

      const url = employeeId ? `/api/team/${employeeId}` : '/api/team'
      const method = employeeId ? 'PATCH' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Failed to save employee')
      }

      router.push('/admin/team')
    } catch (error: any) {
      console.error('Error saving employee:', error)
      alert(error.message || 'Failed to save employee')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="p-6">
        <h3 className="text-2xl font-heading text-foreground mb-6">
          {employeeId ? 'Edit Employee' : 'Add New Employee'}
        </h3>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-heading text-foreground mb-2">
                Employee ID
              </label>
              <input
                type="text"
                value={formData.employeeId}
                onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                className="w-full border border-border bg-white px-4 py-3 rounded-xl text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="EMP-001"
              />
            </div>

            <div>
              <label className="block text-sm font-heading text-foreground mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full border border-border bg-white px-4 py-3 rounded-xl text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-heading text-foreground mb-2">
                Role/Job Title *
              </label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                required
                className="w-full border border-border bg-white px-4 py-3 rounded-xl text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="e.g., Senior Developer"
              />
            </div>

            <div>
              <label className="block text-sm font-heading text-foreground mb-2">
                Department
              </label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full border border-border bg-white px-4 py-3 rounded-xl text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="e.g., Development, Marketing"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-heading text-foreground mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border border-border bg-white px-4 py-3 rounded-xl text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div>
              <label className="block text-sm font-heading text-foreground mb-2">
                Phone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full border border-border bg-white px-4 py-3 rounded-xl text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-heading text-foreground mb-2">
              Address
            </label>
            <textarea
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              rows={2}
              className="w-full border border-border bg-white px-4 py-3 rounded-xl text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-heading text-foreground mb-2">
              Bio
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={4}
              className="w-full border border-border bg-white px-4 py-3 rounded-xl text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent resize-none"
              placeholder="Employee bio/description"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-heading text-foreground mb-2">
                LinkedIn
              </label>
              <input
                type="url"
                value={formData.linkedin}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                className="w-full border border-border bg-white px-4 py-3 rounded-xl text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="https://linkedin.com/in/..."
              />
            </div>

            <div>
              <label className="block text-sm font-heading text-foreground mb-2">
                Twitter
              </label>
              <input
                type="url"
                value={formData.twitter}
                onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                className="w-full border border-border bg-white px-4 py-3 rounded-xl text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="https://twitter.com/..."
              />
            </div>

            <div>
              <label className="block text-sm font-heading text-foreground mb-2">
                GitHub
              </label>
              <input
                type="url"
                value={formData.github}
                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                className="w-full border border-border bg-white px-4 py-3 rounded-xl text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="https://github.com/..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-heading text-foreground mb-2">
              Image URL
            </label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="w-full border border-border bg-white px-4 py-3 rounded-xl text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="https://example.com/photo.jpg"
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-xl font-heading text-foreground mb-4">Employment Details</h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-heading text-foreground mb-2">
                Hire Date
              </label>
              <input
                type="date"
                value={formData.hireDate}
                onChange={(e) => setFormData({ ...formData, hireDate: e.target.value })}
                className="w-full border border-border bg-white px-4 py-3 rounded-xl text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div>
              <label className="block text-sm font-heading text-foreground mb-2">
                Employment Type
              </label>
              <select
                value={formData.employmentType}
                onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                className="w-full border border-border bg-white px-4 py-3 rounded-xl text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="FULL_TIME">Full Time</option>
                <option value="PART_TIME">Part Time</option>
                <option value="CONTRACT">Contract</option>
                <option value="INTERN">Intern</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-heading text-foreground mb-2">
                Display Order
              </label>
              <input
                type="number"
                value={formData.displayOrder}
                onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })}
                className="w-full border border-border bg-white px-4 py-3 rounded-xl text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-heading text-foreground mb-2">
                Salary
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                className="w-full border border-border bg-white px-4 py-3 rounded-xl text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-heading text-foreground mb-2">
                Salary Type
              </label>
              <select
                value={formData.salaryType}
                onChange={(e) => setFormData({ ...formData, salaryType: e.target.value })}
                className="w-full border border-border bg-white px-4 py-3 rounded-xl text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="MONTHLY">Monthly</option>
                <option value="YEARLY">Yearly</option>
                <option value="HOURLY">Hourly</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-xl font-heading text-foreground mb-4">Status</h3>
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={formData.isActive}
            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
            className="w-5 h-5 text-accent rounded focus:ring-accent"
          />
          <span className="text-foreground font-heading">Active Employee</span>
        </label>
      </Card>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-accent text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-heading transition-all duration-300 hover:bg-accent-hover shadow-depth-3 hover:shadow-depth-4 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base w-full sm:w-auto"
        >
          {loading ? 'Saving...' : employeeId ? 'Update Employee' : 'Create Employee'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/team')}
          className="bg-gray-200 text-gray-700 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-heading transition-all duration-300 hover:bg-gray-300 text-sm sm:text-base w-full sm:w-auto"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

