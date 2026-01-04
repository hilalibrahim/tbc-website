'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import DataTable from '@/components/admin/DataTable'

interface Task {
  id: string
  title: string
  description: string | null
  status: string
  priority: string | null
  dueDate: string | null
  employee: {
    name: string
    employeeId: string | null
  }
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')

  useEffect(() => {
    fetchTasks()
  }, [filter])

  const fetchTasks = async () => {
    try {
      const url = filter !== 'all' ? `/api/tasks?status=${filter}` : '/api/tasks'
      const res = await fetch(url)
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

  const getPriorityColor = (priority: string | null) => {
    if (!priority) return 'bg-gray-100 text-gray-800'
    const colors: Record<string, string> = {
      LOW: 'bg-green-100 text-green-800',
      MEDIUM: 'bg-yellow-100 text-yellow-800',
      HIGH: 'bg-orange-100 text-orange-800',
      URGENT: 'bg-red-100 text-red-800',
    }
    return colors[priority] || 'bg-gray-100 text-gray-800'
  }

  const columns = [
    { header: 'Title', accessor: 'title' },
    {
      header: 'Employee',
      accessor: (row: Task) => (
        <div>
          <div className="font-medium">{row.employee.name}</div>
          {row.employee.employeeId && (
            <div className="text-sm text-secondary">{row.employee.employeeId}</div>
          )}
        </div>
      ),
    },
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
      accessor: (row: Task) => (
        <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(row.priority)}`}>
          {row.priority || 'N/A'}
        </span>
      ),
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
          href="/admin/team/tasks/new"
          className="bg-accent text-white px-6 py-3 rounded-xl font-heading transition-all duration-300 hover:bg-accent-hover shadow-depth-3 hover:shadow-depth-4"
        >
          Assign Task
        </Link>
      </div>

      <div className="flex gap-4">
        {['all', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg transition-colors font-heading ${
              filter === status
                ? 'bg-accent text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {status.replace('_', ' ').toLowerCase()}
          </button>
        ))}
      </div>

      <DataTable
        title="Tasks"
        columns={columns}
        data={tasks}
        loading={loading}
        editLink={(row) => `/admin/team/tasks/${row.id}/edit`}
      />
    </div>
  )
}

