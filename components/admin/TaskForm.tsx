'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Card from '@/components/Card'

interface TaskFormProps {
  taskId?: string
  employeeId?: string
}

export default function TaskForm({ taskId, employeeId }: TaskFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [employees, setEmployees] = useState<any[]>([])
  const [projects, setProjects] = useState<any[]>([])
  const [formData, setFormData] = useState({
    employeeId: employeeId || '',
    projectId: '',
    title: '',
    description: '',
    status: 'ASSIGNED',
    priority: 'MEDIUM',
    dueDate: '',
  })

  useEffect(() => {
    fetchEmployees()
    fetchProjects()
    if (taskId) {
      fetchTask()
    }
  }, [taskId])

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

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects')
      const data = await res.json()
      setProjects(data)
    } catch (error) {
      console.error('Error fetching projects:', error)
    }
  }

  const fetchTask = async () => {
    try {
      const res = await fetch(`/api/tasks/${taskId}`)
      if (!res.ok) throw new Error('Failed to fetch task')
      const task = await res.json()
      
      setFormData({
        employeeId: task.employeeId || '',
        projectId: task.projectId || '',
        title: task.title || '',
        description: task.description || '',
        status: task.status || 'ASSIGNED',
        priority: task.priority || 'MEDIUM',
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
      })
    } catch (error) {
      console.error('Error fetching task:', error)
      alert('Failed to load task')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const payload = {
        ...formData,
        projectId: formData.projectId || undefined,
      }

      const url = taskId ? `/api/tasks/${taskId}` : '/api/tasks'
      const method = taskId ? 'PATCH' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Failed to save task')
      }

      router.push(employeeId ? `/admin/team/${employeeId}` : '/admin/team/tasks')
    } catch (error: any) {
      console.error('Error saving task:', error)
      alert(error.message || 'Failed to save task')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="p-6">
        <h3 className="text-2xl font-heading text-foreground mb-6">
          {taskId ? 'Edit Task' : 'Assign New Task'}
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
                Project (Optional)
              </label>
              <select
                value={formData.projectId}
                onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
                className="w-full border border-border bg-white px-4 py-3 rounded-xl text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="">No Project</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-heading text-foreground mb-2">
              Task Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="w-full border border-border bg-white px-4 py-3 rounded-xl text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Enter task title"
            />
          </div>

          <div>
            <label className="block text-sm font-heading text-foreground mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full border border-border bg-white px-4 py-3 rounded-xl text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent resize-none"
              placeholder="Task description"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-heading text-foreground mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full border border-border bg-white px-4 py-3 rounded-xl text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="ASSIGNED">Assigned</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-heading text-foreground mb-2">
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full border border-border bg-white px-4 py-3 rounded-xl text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="URGENT">Urgent</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-heading text-foreground mb-2">
                Due Date
              </label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="w-full border border-border bg-white px-4 py-3 rounded-xl text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>
        </div>
      </Card>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-accent text-white px-8 py-4 rounded-xl font-heading transition-all duration-300 hover:bg-accent-hover shadow-depth-3 hover:shadow-depth-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : taskId ? 'Update Task' : 'Assign Task'}
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

