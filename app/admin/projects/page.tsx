'use client'

import { useState, useEffect } from 'react'
import DataTable from '@/components/admin/DataTable'

interface Project {
  id: string
  title: string
  slug: string
  category: string
  clientName: string | null
  isPublished: boolean
  featured: boolean
  createdAt: string
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects')
      if (!res.ok) {
        throw new Error('Failed to fetch projects')
      }
      const data = await res.json()
      // Ensure data is an array
      setProjects(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching projects:', error)
      setProjects([]) // Set empty array on error
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (project: Project) => {
    if (!confirm(`Are you sure you want to delete "${project.title}"?`)) return

    try {
      const res = await fetch(`/api/projects/${project.id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        fetchProjects()
      }
    } catch (error) {
      console.error('Error deleting project:', error)
      alert('Failed to delete project')
    }
  }

  const columns = [
    { header: 'Title', accessor: 'title' },
    { header: 'Category', accessor: 'category' },
    { header: 'Client', accessor: (row: Project) => row.clientName || 'N/A' },
    {
      header: 'Status',
      accessor: (row: Project) => (
        <div className="flex gap-2">
          <span
            className={`px-2 py-1 text-xs font-semibold rounded-full ${
              row.isPublished
                ? 'bg-gradient-to-r from-[#0A0A0A] to-[#1A1A1A] text-[#D9D9D9] border border-[#BFBFBF]/20'
                : 'bg-gradient-to-r from-[#0A0A0A] to-[#1A1A1A] text-[#8C8C8C] border border-[#BFBFBF]/10'
            }`}
          >
            {row.isPublished ? 'Published' : 'Draft'}
          </span>
          {row.featured && (
            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] text-[#BFBFBF] border border-[#BFBFBF]/20">
              Featured
            </span>
          )}
        </div>
      ),
    },
    {
      header: 'Created',
      accessor: (row: Project) =>
        new Date(row.createdAt).toLocaleDateString(),
    },
  ]

  return (
    <DataTable
      title="Projects"
      columns={columns}
      data={projects}
      loading={loading}
      createLink="/admin/projects/new"
      editLink={(row) => `/admin/projects/${row.id}/edit`}
      onDelete={handleDelete}
    />
  )
}

