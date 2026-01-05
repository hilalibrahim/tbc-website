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
    { header: 'Category', accessor: (row: BlogPost) => row.category || 'N/A' },
    {
      header: 'Status',
      accessor: (row: BlogPost) => (
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full ${
            row.isPublished
              ? 'bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] text-[#D9D9D9] border border-[#BFBFBF]/20'
              : 'bg-gradient-to-r from-[#0A0A0A] to-[#1A1A1A] text-[#8C8C8C] border border-[#BFBFBF]/10'
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

