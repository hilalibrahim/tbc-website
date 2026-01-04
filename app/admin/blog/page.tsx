'use client'

import { useState, useEffect } from 'react'
import DataTable from '@/components/admin/DataTable'

interface BlogPost {
  id: string
  title: string
  slug: string
  category: string | null
  isPublished: boolean
  views: number
  createdAt: string
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/blog')
      if (!res.ok) {
        throw new Error('Failed to fetch blog posts')
      }
      const data = await res.json()
      // Ensure data is an array
      setPosts(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching blog posts:', error)
      setPosts([]) // Set empty array on error
    } finally {
      setLoading(false)
    }
  }

  const columns = [
    { header: 'Title', accessor: 'title' },
    { header: 'Slug', accessor: 'slug' },
    { header: 'Category', accessor: 'category' || 'N/A' },
    {
      header: 'Status',
      accessor: (row: BlogPost) => (
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            row.isPublished
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {row.isPublished ? 'Published' : 'Draft'}
        </span>
      ),
    },
    { header: 'Views', accessor: 'views' },
    {
      header: 'Created',
      accessor: (row: BlogPost) => new Date(row.createdAt).toLocaleDateString(),
    },
  ]

  return (
    <DataTable
      title="Blog Posts"
      columns={columns}
      data={posts}
      loading={loading}
      createLink="/admin/blog/new"
      editLink={(row) => `/admin/blog/${row.id}/edit`}
    />
  )
}

