'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Save, X } from 'lucide-react'

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
      <div className="p-6 rounded-xl border border-[#BFBFBF]/10 bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A]">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-[#D9D9D9] via-[#BFBFBF] to-[#8C8C8C] bg-clip-text text-transparent mb-6">
          {employeeId ? 'Edit Employee' : 'Add New Employee'}
        </h3>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#BFBFBF] mb-2">
                Employee ID
              </label>
              <input
                type="text"
                value={formData.employeeId}
                onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                className="w-full border border-[#BFBFBF]/20 bg-gradient-to-br from-[#0A0A0A] to-[#151515] px-4 py-3 rounded-xl text-[#D9D9D9] placeholder-[#8C8C8C] focus:border-[#D9D9D9]/50 focus:outline-none focus:ring-1 focus:ring-[#D9D9D9]/20"
                placeholder="EMP-001"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#BFBFBF] mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full border border-[#BFBFBF]/20 bg-gradient-to-br from-[#0A0A0A] to-[#151515] px-4 py-3 rounded-xl text-[#D9D9D9] placeholder-[#8C8C8C] focus:border-[#D9D9D9]/50 focus:outline-none focus:ring-1 focus:ring-[#D9D9D9]/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#BFBFBF] mb-2">
                Role/Job Title *
              </label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                required
                className="w-full border border-[#BFBFBF]/20 bg-gradient-to-br from-[#0A0A0A] to-[#151515] px-4 py-3 rounded-xl text-[#D9D9D9] placeholder-[#8C8C8C] focus:border-[#D9D9D9]/50 focus:outline-none focus:ring-1 focus:ring-[#D9D9D9]/20"
                placeholder="e.g., Senior Developer"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#BFBFBF] mb-2">
                Department
              </label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full border border-[#BFBFBF]/20 bg-gradient-to-br from-[#0A0A0A] to-[#151515] px-4 py-3 rounded-xl text-[#D9D9D9] placeholder-[#8C8C8C] focus:border-[#D9D9D9]/50 focus:outline-none focus:ring-1 focus:ring-[#D9D9D9]/20"
                placeholder="e.g., Development, Marketing"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#BFBFBF] mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border border-[#BFBFBF]/20 bg-gradient-to-br from-[#0A0A0A] to-[#151515] px-4 py-3 rounded-xl text-[#D9D9D9] placeholder-[#8C8C8C] focus:border-[#D9D9D9]/50 focus:outline-none focus:ring-1 focus:ring-[#D9D9D9]/20"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#BFBFBF] mb-2">
                Phone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full border border-[#BFBFBF]/20 bg-gradient-to-br from-[#0A0A0A] to-[#151515] px-4 py-3 rounded-xl text-[#D9D9D9] placeholder-[#8C8C8C] focus:border-[#D9D9D9]/50 focus:outline-none focus:ring-1 focus:ring-[#D9D9D9]/20"
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
                className="w-full border border-[#BFBFBF]/20 bg-gradient-to-br from-[#0A0A0A] to-[#151515] px-4 py-3 rounded-xl text-[#D9D9D9] placeholder-[#8C8C8C] focus:border-[#D9D9D9]/50 focus:outline-none focus:ring-1 focus:ring-[#D9D9D9]/20 resize-none"
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
                className="w-full border border-[#BFBFBF]/20 bg-gradient-to-br from-[#0A0A0A] to-[#151515] px-4 py-3 rounded-xl text-[#D9D9D9] placeholder-[#8C8C8C] focus:border-[#D9D9D9]/50 focus:outline-none focus:ring-1 focus:ring-[#D9D9D9]/20 resize-none"
              placeholder="Employee bio/description"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#BFBFBF] mb-2">
                LinkedIn
              </label>
              <input
                type="url"
                value={formData.linkedin}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                className="w-full border border-[#BFBFBF]/20 bg-gradient-to-br from-[#0A0A0A] to-[#151515] px-4 py-3 rounded-xl text-[#D9D9D9] placeholder-[#8C8C8C] focus:border-[#D9D9D9]/50 focus:outline-none focus:ring-1 focus:ring-[#D9D9D9]/20"
                placeholder="https://linkedin.com/in/..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#BFBFBF] mb-2">
                Twitter
              </label>
              <input
                type="url"
                value={formData.twitter}
                onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                className="w-full border border-[#BFBFBF]/20 bg-gradient-to-br from-[#0A0A0A] to-[#151515] px-4 py-3 rounded-xl text-[#D9D9D9] placeholder-[#8C8C8C] focus:border-[#D9D9D9]/50 focus:outline-none focus:ring-1 focus:ring-[#D9D9D9]/20"
                placeholder="https://twitter.com/..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#BFBFBF] mb-2">
                GitHub
              </label>
              <input
                type="url"
                value={formData.github}
                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                className="w-full border border-[#BFBFBF]/20 bg-gradient-to-br from-[#0A0A0A] to-[#151515] px-4 py-3 rounded-xl text-[#D9D9D9] placeholder-[#8C8C8C] focus:border-[#D9D9D9]/50 focus:outline-none focus:ring-1 focus:ring-[#D9D9D9]/20"
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
                className="w-full border border-[#BFBFBF]/20 bg-gradient-to-br from-[#0A0A0A] to-[#151515] px-4 py-3 rounded-xl text-[#D9D9D9] focus:border-[#D9D9D9]/50 focus:outline-none focus:ring-1 focus:ring-[#D9D9D9]/20"
              placeholder="https://example.com/photo.jpg"
            />
          </div>
        </div>
      </div>

      <div className="p-6 rounded-xl border border-[#BFBFBF]/10 bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A]">
        <h3 className="text-xl font-bold text-[#D9D9D9] mb-4">Employment Details</h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#BFBFBF] mb-2">
                Hire Date
              </label>
              <input
                type="date"
                value={formData.hireDate}
                onChange={(e) => setFormData({ ...formData, hireDate: e.target.value })}
                className="w-full border border-[#BFBFBF]/20 bg-gradient-to-br from-[#0A0A0A] to-[#151515] px-4 py-3 rounded-xl text-[#D9D9D9] placeholder-[#8C8C8C] focus:border-[#D9D9D9]/50 focus:outline-none focus:ring-1 focus:ring-[#D9D9D9]/20"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#BFBFBF] mb-2">
                Employment Type
              </label>
              <select
                value={formData.employmentType}
                onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                className="w-full border border-[#BFBFBF]/20 bg-gradient-to-br from-[#0A0A0A] to-[#151515] px-4 py-3 rounded-xl text-[#D9D9D9] placeholder-[#8C8C8C] focus:border-[#D9D9D9]/50 focus:outline-none focus:ring-1 focus:ring-[#D9D9D9]/20"
              >
                <option value="FULL_TIME">Full Time</option>
                <option value="PART_TIME">Part Time</option>
                <option value="CONTRACT">Contract</option>
                <option value="INTERN">Intern</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#BFBFBF] mb-2">
                Display Order
              </label>
              <input
                type="number"
                value={formData.displayOrder}
                onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })}
                className="w-full border border-[#BFBFBF]/20 bg-gradient-to-br from-[#0A0A0A] to-[#151515] px-4 py-3 rounded-xl text-[#D9D9D9] placeholder-[#8C8C8C] focus:border-[#D9D9D9]/50 focus:outline-none focus:ring-1 focus:ring-[#D9D9D9]/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#BFBFBF] mb-2">
                Salary
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                className="w-full border border-[#BFBFBF]/20 bg-gradient-to-br from-[#0A0A0A] to-[#151515] px-4 py-3 rounded-xl text-[#D9D9D9] placeholder-[#8C8C8C] focus:border-[#D9D9D9]/50 focus:outline-none focus:ring-1 focus:ring-[#D9D9D9]/20"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#BFBFBF] mb-2">
                Salary Type
              </label>
              <select
                value={formData.salaryType}
                onChange={(e) => setFormData({ ...formData, salaryType: e.target.value })}
                className="w-full border border-[#BFBFBF]/20 bg-gradient-to-br from-[#0A0A0A] to-[#151515] px-4 py-3 rounded-xl text-[#D9D9D9] placeholder-[#8C8C8C] focus:border-[#D9D9D9]/50 focus:outline-none focus:ring-1 focus:ring-[#D9D9D9]/20"
              >
                <option value="MONTHLY">Monthly</option>
                <option value="YEARLY">Yearly</option>
                <option value="HOURLY">Hourly</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-xl border border-[#BFBFBF]/10 bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A]">
        <h3 className="text-xl font-bold text-[#D9D9D9] mb-4">Status</h3>
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={formData.isActive}
            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
            className="w-5 h-5 rounded border-[#BFBFBF]/20 bg-gradient-to-br from-[#0A0A0A] to-[#151515] text-[#D9D9D9] focus:ring-[#D9D9D9]/20"
          />
          <span className="text-[#BFBFBF] font-semibold">Active Employee</span>
        </label>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <button
          type="submit"
          disabled={loading}
          className="group flex items-center justify-center gap-2 bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] text-[#D9D9D9] px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 border border-[#BFBFBF]/20 hover:border-[#D9D9D9]/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-sm sm:text-base w-full sm:w-auto"
        >
          <Save className="w-4 h-4" />
          {loading ? 'Saving...' : employeeId ? 'Update Employee' : 'Create Employee'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/team')}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#0A0A0A] to-[#1A1A1A] text-[#BFBFBF] px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 hover:text-[#D9D9D9] border border-[#BFBFBF]/20 hover:border-[#D9D9D9]/30 text-sm sm:text-base w-full sm:w-auto"
        >
          <X className="w-4 h-4" />
          Cancel
        </button>
      </div>
    </form>
  )
}

