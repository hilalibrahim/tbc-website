'use client'

import { useState, useEffect } from 'react'
import DataTable from '@/components/admin/DataTable'

interface TeamMember {
  id: string
  name: string
  role: string
  email: string | null
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
    { header: 'Name', accessor: 'name' },
    { header: 'Role', accessor: 'role' },
    { header: 'Email', accessor: 'email' || 'N/A' },
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
    { header: 'Order', accessor: 'displayOrder' },
  ]

  return (
    <DataTable
      title="Team Members"
      columns={columns}
      data={teamMembers}
      loading={loading}
      createLink="/admin/team/new"
      editLink={(row) => `/admin/team/${row.id}/edit`}
      onDelete={handleDelete}
    />
  )
}

