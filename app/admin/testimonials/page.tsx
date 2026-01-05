'use client'

import { useState, useEffect } from 'react'
import DataTable from '@/components/admin/DataTable'

interface Testimonial {
  id: string
  quote: string
  author: string
  company: string | null
  rating: number | null
  isPublished: boolean
  featured: boolean
  createdAt: string
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const res = await fetch('/api/testimonials')
      if (!res.ok) {
        throw new Error('Failed to fetch testimonials')
      }
      const data = await res.json()
      // Ensure data is an array
      setTestimonials(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching testimonials:', error)
      setTestimonials([]) // Set empty array on error
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (testimonial: Testimonial) => {
    if (!confirm(`Are you sure you want to delete this testimonial?`)) return

    try {
      const res = await fetch(`/api/testimonials/${testimonial.id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        fetchTestimonials()
      }
    } catch (error) {
      console.error('Error deleting testimonial:', error)
      alert('Failed to delete testimonial')
    }
  }

  const columns = [
    {
      header: 'Quote',
      accessor: (row: Testimonial) => (
        <div className="max-w-md truncate">{row.quote}</div>
      ),
    },
    { header: 'Author', accessor: 'author' },
    { header: 'Company', accessor: (row: Testimonial) => row.company || 'N/A' },
    {
      header: 'Rating',
      accessor: (row: Testimonial) =>
        row.rating ? '⭐'.repeat(row.rating) : 'N/A',
    },
    {
      header: 'Status',
      accessor: (row: Testimonial) => (
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
  ]

  return (
    <DataTable
      title="Testimonials"
      columns={columns}
      data={testimonials}
      loading={loading}
      createLink="/admin/testimonials/new"
      editLink={(row) => `/admin/testimonials/${row.id}/edit`}
      onDelete={handleDelete}
    />
  )
}

