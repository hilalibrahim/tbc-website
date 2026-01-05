'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Save, X } from 'lucide-react'

interface LeaveFormProps {
  leaveId?: string
  employeeId?: string
}

export default function LeaveForm({ leaveId, employeeId }: LeaveFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [employees, setEmployees] = useState<any[]>([])
  const [formData, setFormData] = useState({
    employeeId: employeeId || '',
    type: 'VACATION',
    startDate: '',
    endDate: '',
    days: 1,
    status: 'PENDING',
    reason: '',
    approvedBy: '',
  })

  useEffect(() => {
    fetchEmployees()
    if (leaveId) {
      fetchLeave()
    }
  }, [leaveId])

  useEffect(() => {
    // Get employeeId from URL params if present
    const urlParams = new URLSearchParams(window.location.search)
    const empId = urlParams.get('employeeId')
    if (empId && !employeeId) {
      setFormData(prev => ({ ...prev, employeeId: empId }))
    }
  }, [])

  useEffect(() => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate)
      const end = new Date(formData.endDate)
      const diffTime = Math.abs(end.getTime() - start.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
      setFormData(prev => ({ ...prev, days: diffDays }))
    }
  }, [formData.startDate, formData.endDate])

  const fetchEmployees = async () => {
    try {
      const res = await fetch('/api/team')
      const data = await res.json()
      setEmployees(data)
    } catch (error) {
      console.error('Error fetching employees:', error)
    }
  }

  const fetchLeave = async () => {
    try {
      const res = await fetch(`/api/leaves/${leaveId}`)
      if (!res.ok) throw new Error('Failed to fetch leave')
      const leave = await res.json()
      
      setFormData({
        employeeId: leave.employeeId || '',
        type: leave.type || 'VACATION',
        startDate: leave.startDate ? new Date(leave.startDate).toISOString().split('T')[0] : '',
        endDate: leave.endDate ? new Date(leave.endDate).toISOString().split('T')[0] : '',
        days: leave.days || 1,
        status: leave.status || 'PENDING',
        reason: leave.reason || '',
        approvedBy: leave.approvedBy || '',
      })
    } catch (error) {
      console.error('Error fetching leave:', error)
      alert('Failed to load leave')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const payload = {
        ...formData,
        days: formData.days,
      }

      const url = leaveId ? `/api/leaves/${leaveId}` : '/api/leaves'
      const method = leaveId ? 'PATCH' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Failed to save leave')
      }

      router.push(employeeId ? `/admin/team/${employeeId}` : '/admin/team/leaves')
    } catch (error: any) {
      console.error('Error saving leave:', error)
      alert(error.message || 'Failed to save leave')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-6 rounded-xl border border-[#BFBFBF]/10 bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A]">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-[#D9D9D9] via-[#BFBFBF] to-[#8C8C8C] bg-clip-text text-transparent mb-6">
          {leaveId ? 'Edit Leave Request' : 'Create Leave Request'}
        </h3>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#BFBFBF] mb-2">
                Employee *
              </label>
              <select
                value={formData.employeeId}
                onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                required
                disabled={!!employeeId}
                className="w-full border border-[#BFBFBF]/20 bg-gradient-to-br from-[#0A0A0A] to-[#151515] px-4 py-3 rounded-xl text-[#D9D9D9] focus:border-[#D9D9D9]/50 focus:outline-none focus:ring-1 focus:ring-[#D9D9D9]/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">Select Employee</option>
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name} {emp.employeeId && `(${emp.employeeId})`}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#BFBFBF] mb-2">
                Leave Type *
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                required
                className="w-full border border-[#BFBFBF]/20 bg-gradient-to-br from-[#0A0A0A] to-[#151515] px-4 py-3 rounded-xl text-[#D9D9D9] focus:border-[#D9D9D9]/50 focus:outline-none focus:ring-1 focus:ring-[#D9D9D9]/20"
              >
                <option value="VACATION">Vacation</option>
                <option value="SICK">Sick Leave</option>
                <option value="PERSONAL">Personal</option>
                <option value="MATERNITY">Maternity</option>
                <option value="PATERNITY">Paternity</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#BFBFBF] mb-2">
                Start Date *
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                required
                className="w-full border border-[#BFBFBF]/20 bg-gradient-to-br from-[#0A0A0A] to-[#151515] px-4 py-3 rounded-xl text-[#D9D9D9] focus:border-[#D9D9D9]/50 focus:outline-none focus:ring-1 focus:ring-[#D9D9D9]/20"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#BFBFBF] mb-2">
                End Date *
              </label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                required
                min={formData.startDate}
                className="w-full border border-[#BFBFBF]/20 bg-gradient-to-br from-[#0A0A0A] to-[#151515] px-4 py-3 rounded-xl text-[#D9D9D9] focus:border-[#D9D9D9]/50 focus:outline-none focus:ring-1 focus:ring-[#D9D9D9]/20"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#BFBFBF] mb-2">
                Days
              </label>
              <input
                type="number"
                value={formData.days}
                readOnly
                className="w-full border border-[#BFBFBF]/20 bg-gradient-to-br from-[#0A0A0A] to-[#151515] px-4 py-3 rounded-xl text-[#8C8C8C] opacity-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-heading text-foreground mb-2">
              Reason
            </label>
            <textarea
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              rows={3}
              className="w-full border border-[#BFBFBF]/20 bg-gradient-to-br from-[#0A0A0A] to-[#151515] px-4 py-3 rounded-xl text-[#D9D9D9] placeholder-[#8C8C8C] focus:border-[#D9D9D9]/50 focus:outline-none focus:ring-1 focus:ring-[#D9D9D9]/20 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#BFBFBF] mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full border border-[#BFBFBF]/20 bg-gradient-to-br from-[#0A0A0A] to-[#151515] px-4 py-3 rounded-xl text-[#D9D9D9] focus:border-[#D9D9D9]/50 focus:outline-none focus:ring-1 focus:ring-[#D9D9D9]/20"
              >
                <option value="PENDING">Pending</option>
                <option value="APPROVED">Approved</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#BFBFBF] mb-2">
                Approved By
              </label>
              <input
                type="text"
                value={formData.approvedBy}
                onChange={(e) => setFormData({ ...formData, approvedBy: e.target.value })}
                className="w-full border border-[#BFBFBF]/20 bg-gradient-to-br from-[#0A0A0A] to-[#151515] px-4 py-3 rounded-xl text-[#D9D9D9] focus:border-[#D9D9D9]/50 focus:outline-none focus:ring-1 focus:ring-[#D9D9D9]/20"
                placeholder="Manager name"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <button
          type="submit"
          disabled={loading}
          className="group flex items-center justify-center gap-2 bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] text-[#D9D9D9] px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 border border-[#BFBFBF]/20 hover:border-[#D9D9D9]/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-sm sm:text-base w-full sm:w-auto"
        >
          <Save className="w-4 h-4" />
          {loading ? 'Saving...' : leaveId ? 'Update Leave' : 'Create Leave Request'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#0A0A0A] to-[#1A1A1A] text-[#BFBFBF] px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 hover:text-[#D9D9D9] border border-[#BFBFBF]/20 hover:border-[#D9D9D9]/30 text-sm sm:text-base w-full sm:w-auto"
        >
          <X className="w-4 h-4" />
          Cancel
        </button>
      </div>
    </form>
  )
}

