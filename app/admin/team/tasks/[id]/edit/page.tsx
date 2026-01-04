'use client'

import { useParams } from 'next/navigation'
import TaskForm from '@/components/admin/TaskForm'

export default function EditTaskPage() {
  const params = useParams()
  const taskId = params.id as string

  return (
    <div>
      <TaskForm taskId={taskId} />
    </div>
  )
}
