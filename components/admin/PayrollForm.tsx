'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Card from '@/components/Card'

interface PayrollFormProps {
  payrollId?: string
  employeeId?: string
}

export default function PayrollForm({ payrollId, employeeId }: PayrollFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [employees, setEmployees] = useState<any[]>([])
  const [formData, setFormData] = useState({
    employeeId: employeeId || '',
    period: new Date().toISOString().slice(0, 7), // YYYY-MM format
    baseSalary: '',
    bonuses: '0',
    deductions: '0',
    tax: '0',
    netPay: '0',
    status: 'PENDING',
    paymentDate: '',
    paymentMethod: '',
    notes: '',
  })

  useEffect(() => {
    fetchEmployees()
    if (payrollId) {
      fetchPayroll()
    }
  }, [payrollId])

  useEffect(() => {
    // Get employeeId from URL params if present
    const urlParams = new URLSearchParams(window.location.search)
    const empId = urlParams.get('employeeId')
    if (empId && !employeeId) {
      setFormData(prev => ({ ...prev, employeeId: empId }))
    }
  }, [])

  const fetchEmployees = async () => {
    try {
      const res = await fetch('/api/team')
      const data = await res.json()
      setEmployees(data)
    } catch (error) {
      console.error('Error fetching employees:', error)
    }
  }

  const fetchPayroll = async () => {
    try {
      const res = await fetch(`/api/payroll/${payrollId}`)
      if (!res.ok) throw new Error('Failed to fetch payroll')
      const payroll = await res.json()
      
      setFormData({
        employeeId: payroll.employeeId || '',
        period: payroll.period || '',
        baseSalary: payroll.baseSalary?.toString() || '',
        bonuses: payroll.bonuses?.toString() || '0',
        deductions: payroll.deductions?.toString() || '0',
        tax: payroll.tax?.toString() || '0',
        netPay: payroll.netPay?.toString() || '0',
        status: payroll.status || 'PENDING',
        paymentDate: payroll.paymentDate ? new Date(payroll.paymentDate).toISOString().split('T')[0] : '',
        paymentMethod: payroll.paymentMethod || '',
        notes: payroll.notes || '',
      })
    } catch (error) {
      console.error('Error fetching payroll:', error)
      alert('Failed to load payroll')
    }
  }

  const calculateNetPay = () => {
    const base = parseFloat(formData.baseSalary) || 0
    const bonuses = parseFloat(formData.bonuses) || 0
    const deductions = parseFloat(formData.deductions) || 0
    const tax = parseFloat(formData.tax) || 0
    return base + bonuses - deductions - tax
  }

  useEffect(() => {
    const netPay = calculateNetPay()
    setFormData(prev => ({ ...prev, netPay: netPay.toFixed(2) }))
  }, [formData.baseSalary, formData.bonuses, formData.deductions, formData.tax])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const payload = {
        ...formData,
        baseSalary: parseFloat(formData.baseSalary),
        bonuses: parseFloat(formData.bonuses) || 0,
        deductions: parseFloat(formData.deductions) || 0,
        tax: parseFloat(formData.tax) || 0,
        netPay: parseFloat(formData.netPay),
      }

      const url = payrollId ? `/api/payroll/${payrollId}` : '/api/payroll'
      const method = payrollId ? 'PATCH' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Failed to save payroll')
      }

      router.push(employeeId ? `/admin/team/${employeeId}` : '/admin/team/payroll')
    } catch (error: any) {
      console.error('Error saving payroll:', error)
      alert(error.message || 'Failed to save payroll')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="p-6">
        <h3 className="text-2xl font-heading text-foreground mb-6">
          {payrollId ? 'Edit Payroll' : 'Create Payroll'}
        </h3>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-heading text-foreground mb-2">
                Employee *
              </label>
              <select
                value={formData.employeeId}
                onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                required
                disabled={!!employeeId}
                className="w-full border border-border bg-white px-4 py-3 rounded-xl text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent disabled:bg-gray-100"
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
              <label className="block text-sm font-heading text-foreground mb-2">
                Period (YYYY-MM) *
              </label>
              <input
                type="month"
                value={formData.period}
                onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                required
                className="w-full border border-border bg-white px-4 py-3 rounded-xl text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-heading text-foreground mb-2">
                Base Salary *
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.baseSalary}
                onChange={(e) => setFormData({ ...formData, baseSalary: e.target.value })}
                required
                className="w-full border border-border bg-white px-4 py-3 rounded-xl text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div>
              <label className="block text-sm font-heading text-foreground mb-2">
                Bonuses
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.bonuses}
                onChange={(e) => setFormData({ ...formData, bonuses: e.target.value })}
                className="w-full border border-border bg-white px-4 py-3 rounded-xl text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-heading text-foreground mb-2">
                Deductions
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.deductions}
                onChange={(e) => setFormData({ ...formData, deductions: e.target.value })}
                className="w-full border border-border bg-white px-4 py-3 rounded-xl text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div>
              <label className="block text-sm font-heading text-foreground mb-2">
                Tax
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.tax}
                onChange={(e) => setFormData({ ...formData, tax: e.target.value })}
                className="w-full border border-border bg-white px-4 py-3 rounded-xl text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl">
            <div className="flex justify-between items-center">
              <span className="text-lg font-heading text-foreground">Net Pay:</span>
              <span className="text-2xl font-heading text-accent">
                ₹{parseFloat(formData.netPay).toFixed(2)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-heading text-foreground mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full border border-border bg-white px-4 py-3 rounded-xl text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="PENDING">Pending</option>
                <option value="PROCESSED">Processed</option>
                <option value="PAID">Paid</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-heading text-foreground mb-2">
                Payment Date
              </label>
              <input
                type="date"
                value={formData.paymentDate}
                onChange={(e) => setFormData({ ...formData, paymentDate: e.target.value })}
                className="w-full border border-border bg-white px-4 py-3 rounded-xl text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-heading text-foreground mb-2">
              Payment Method
            </label>
            <select
              value={formData.paymentMethod}
              onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
              className="w-full border border-border bg-white px-4 py-3 rounded-xl text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="">Select Method</option>
              <option value="BANK_TRANSFER">Bank Transfer</option>
              <option value="CHECK">Check</option>
              <option value="CASH">Cash</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-heading text-foreground mb-2">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="w-full border border-border bg-white px-4 py-3 rounded-xl text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent resize-none"
            />
          </div>
        </div>
      </Card>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-accent text-white px-8 py-4 rounded-xl font-heading transition-all duration-300 hover:bg-accent-hover shadow-depth-3 hover:shadow-depth-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : payrollId ? 'Update Payroll' : 'Create Payroll'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="bg-gray-200 text-gray-700 px-8 py-4 rounded-xl font-heading transition-all duration-300 hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

