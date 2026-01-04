'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import DataTable from '@/components/admin/DataTable'

interface Task {
  id: string
  title: string
  description: string | null
  status: string
  priority: string | null
  dueDate: string | null
}

export default function EmployeeTasksPage() {
  const params = useParams()
  const employeeId = params.id as string
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTasks()
  }, [employeeId])

  const fetchTasks = async () => {
    try {
      const res = await fetch(`/api/tasks?employeeId=${employeeId}`)
      if (!res.ok) throw new Error('Failed to fetch tasks')
      const data = await res.json()
      setTasks(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching tasks:', error)
      setTasks([])
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      ASSIGNED: 'bg-blue-100 text-blue-800',
      IN_PROGRESS: 'bg-yellow-100 text-yellow-800',
      COMPLETED: 'bg-green-100 text-green-800',
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  const columns = [
    { header: 'Title', accessor: 'title' },
    {
      header: 'Status',
      accessor: (row: Task) => (
        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(row.status)}`}>
          {row.status.replace('_', ' ')}
        </span>
      ),
    },
    {
      header: 'Priority',
      accessor: (row: Task) => row.priority || 'N/A',
    },
    {
      header: 'Due Date',
      accessor: (row: Task) =>
        row.dueDate ? new Date(row.dueDate).toLocaleDateString() : 'N/A',
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-heading text-foreground">Task Assignments</h2>
        <Link
          href={`/admin/team/tasks/new?employeeId=${employeeId}`}
          className="bg-accent text-white px-6 py-3 rounded-xl font-heading transition-all duration-300 hover:bg-accent-hover shadow-depth-3 hover:shadow-depth-4"
        >
          Assign Task
        </Link>
      </div>
      <DataTable
        title=""
        columns={columns}
        data={tasks}
        loading={loading}
        editLink={(row) => `/admin/team/tasks/${row.id}/edit`}
      />
    </div>
  )
}

