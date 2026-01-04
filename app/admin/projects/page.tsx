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
    { header: 'Client', accessor: 'clientName' || 'N/A' },
    {
      header: 'Status',
      accessor: (row: Project) => (
        <div className="flex gap-2">
          <span
            className={`px-2 py-1 text-xs rounded-full ${
              row.isPublished
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {row.isPublished ? 'Published' : 'Draft'}
          </span>
          {row.featured && (
            <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
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

