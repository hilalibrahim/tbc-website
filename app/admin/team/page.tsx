'use client'

import { useState, useEffect } from 'react'
import DataTable from '@/components/admin/DataTable'

interface TeamMember {
  id: string
  employeeId: string | null
  name: string
  role: string
  department: string | null
  email: string | null
  phone: string | null
  salary: number | null
  salaryType: string | null
  employmentType: string | null
  hireDate: string | null
  isActive: boolean
  displayOrder: number
}

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTeamMembers()
  }, [])

  const fetchTeamMembers = async () => {
    try {
      const res = await fetch('/api/team')
      if (!res.ok) {
        throw new Error('Failed to fetch team members')
      }
      const data = await res.json()
      // Ensure data is an array
      setTeamMembers(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching team members:', error)
      setTeamMembers([]) // Set empty array on error
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (member: TeamMember) => {
    if (!confirm(`Are you sure you want to delete "${member.name}"?`)) return

    try {
      const res = await fetch(`/api/team/${member.id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        fetchTeamMembers()
      }
    } catch (error) {
      console.error('Error deleting team member:', error)
      alert('Failed to delete team member')
    }
  }

  const columns = [
    { header: 'Employee ID', accessor: 'employeeId' || 'N/A' },
    { header: 'Name', accessor: 'name' },
    { header: 'Role', accessor: 'role' },
    { header: 'Department', accessor: 'department' || 'N/A' },
    { header: 'Email', accessor: 'email' || 'N/A' },
    {
      header: 'Salary',
      accessor: (row: TeamMember) =>
        row.salary
          ? `₹${row.salary.toFixed(2)}/${row.salaryType?.toLowerCase() || 'monthly'}`
          : 'N/A',
    },
    {
      header: 'Type',
      accessor: (row: TeamMember) => {
        const types: Record<string, string> = {
          FULL_TIME: 'Full Time',
          PART_TIME: 'Part Time',
          CONTRACT: 'Contract',
          INTERN: 'Intern',
        }
        return types[row.employmentType || ''] || row.employmentType || 'N/A'
      },
    },
    {
      header: 'Status',
      accessor: (row: TeamMember) => (
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            row.isActive
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {row.isActive ? 'Active' : 'Inactive'}
        </span>
      ),
    },
  ]

  return (
    <DataTable
      title="Team Members / Employees"
      columns={columns}
      data={teamMembers}
      loading={loading}
      createLink="/admin/team/new"
      viewLink={(row) => `/admin/team/${row.id}`}
      editLink={(row) => `/admin/team/${row.id}/edit`}
      onDelete={handleDelete}
    />
  )
}

