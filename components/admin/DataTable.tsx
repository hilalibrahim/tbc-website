'use client'

import { useMemo } from 'react'
import Card from '@/components/Card'
import Link from 'next/link'

interface Column {
  header: string
  accessor: string | ((row: any) => React.ReactNode)
  className?: string
}

interface DataTableProps {
  title: string
  columns: Column[]
  data: any[]
  loading?: boolean
  createLink?: string
  viewLink?: (row: any) => string
  editLink?: (row: any) => string
  onDelete?: (row: any) => void
  emptyMessage?: string
  exportFileName?: string
}

export default function DataTable({
  title,
  columns,
  data,
  loading = false,
  createLink,
  viewLink,
  editLink,
  onDelete,
  emptyMessage = 'No data found',
  exportFileName,
}: DataTableProps) {
  // Ensure data is always an array
  const safeData = Array.isArray(data) ? data : []

  // Extract text content from React nodes
  const extractText = (node: any): string => {
    if (node === null || node === undefined) {
      return ''
    }
    if (typeof node === 'string' || typeof node === 'number') {
      return String(node)
    }
    if (typeof node === 'boolean') {
      return node ? 'Yes' : 'No'
    }
    // Handle React elements
    if (node?.props) {
      if (node.props.children) {
        return extractText(node.props.children)
      }
      // For elements like <span>, try to get text content
      if (node.type === 'span' && node.props.children) {
        return extractText(node.props.children)
      }
    }
    // Handle arrays
    if (Array.isArray(node)) {
      return node.map(extractText).filter(Boolean).join(' ')
    }
    // Handle objects with toString
    if (typeof node === 'object' && node.toString) {
      const str = node.toString()
      if (str !== '[object Object]') {
        return str
      }
    }
    return ''
  }

  // Convert data to CSV format
  const exportToCSV = () => {
    if (safeData.length === 0) {
      alert('No data to export')
      return
    }

    // Create CSV headers
    const headers = columns.map((col) => col.header)

    // Create CSV rows
    const rows = safeData.map((row) => {
      return columns.map((column) => {
        let value: any
        if (typeof column.accessor === 'function') {
          const result = column.accessor(row)
          value = extractText(result)
        } else {
          value = row[column.accessor] || ''
        }
        // Escape commas and quotes in CSV
        const stringValue = String(value || '')
        if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
          return `"${stringValue.replace(/"/g, '""')}"`
        }
        return stringValue
      })
    })

    // Combine headers and rows
    const csvContent = [headers, ...rows]
      .map((row) => row.join(','))
      .join('\n')

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', exportFileName || `${title.toLowerCase().replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-secondary">Loading...</div>
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-2xl sm:text-3xl font-heading text-foreground">{title}</h2>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
          {safeData.length > 0 && (
            <button
              onClick={exportToCSV}
              className="bg-green-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-heading transition-all duration-300 hover:bg-green-700 shadow-depth-3 hover:shadow-depth-4 text-sm sm:text-base w-full sm:w-auto text-center flex items-center justify-center gap-2"
            >
              <span>📥</span>
              <span>Download CSV</span>
            </button>
          )}
          {createLink && (
            <Link
              href={createLink}
              className="bg-accent text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-heading transition-all duration-300 hover:bg-accent-hover shadow-depth-3 hover:shadow-depth-4 text-sm sm:text-base w-full sm:w-auto text-center"
            >
              Create New
            </Link>
          )}
        </div>
      </div>

      {/* Desktop Table View */}
      <Card className="overflow-hidden hidden md:block">
        <div className="overflow-x-auto">
          {safeData.length === 0 ? (
            <div className="py-12 text-center text-secondary">{emptyMessage}</div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  {columns.map((column, index) => (
                    <th
                      key={index}
                      className={`px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                        column.className || ''
                      }`}
                    >
                      {column.header}
                    </th>
                  ))}
                  {(viewLink || editLink || onDelete) && (
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {safeData.map((row, rowIndex) => (
                  <tr key={rowIndex} className="hover:bg-gray-50 transition-colors">
                    {columns.map((column, colIndex) => (
                      <td
                        key={colIndex}
                        className={`px-4 lg:px-6 py-4 whitespace-nowrap text-sm ${
                          column.className || ''
                        }`}
                      >
                        {typeof column.accessor === 'function'
                          ? column.accessor(row)
                          : row[column.accessor]}
                      </td>
                    ))}
                    {(viewLink || editLink || onDelete) && (
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2 sm:gap-3">
                          {viewLink && (
                            <Link
                              href={viewLink(row)}
                              className="text-accent hover:text-accent-hover transition-colors"
                            >
                              View
                            </Link>
                          )}
                          {editLink && (
                            <Link
                              href={editLink(row)}
                              className="text-blue-600 hover:text-blue-800 transition-colors"
                            >
                              Edit
                            </Link>
                          )}
                          {onDelete && (
                            <button
                              onClick={() => onDelete(row)}
                              className="text-red-600 hover:text-red-800 transition-colors"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Card>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {safeData.length === 0 ? (
          <Card className="p-6">
            <div className="py-8 text-center text-secondary">{emptyMessage}</div>
          </Card>
        ) : (
          safeData.map((row, rowIndex) => (
            <Card key={rowIndex} className="p-4">
              <div className="space-y-3">
                {columns.map((column, colIndex) => (
                  <div key={colIndex} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <span className="text-xs font-medium text-gray-500 uppercase">
                      {column.header}:
                    </span>
                    <span className="text-sm text-foreground">
                      {typeof column.accessor === 'function'
                        ? column.accessor(row)
                        : row[column.accessor] || 'N/A'}
                    </span>
                  </div>
                ))}
                {(viewLink || editLink || onDelete) && (
                  <div className="flex gap-3 pt-2 border-t border-gray-200">
                    {viewLink && (
                      <Link
                        href={viewLink(row)}
                        className="text-sm text-accent hover:text-accent-hover transition-colors"
                      >
                        View
                      </Link>
                    )}
                    {editLink && (
                      <Link
                        href={editLink(row)}
                        className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        Edit
                      </Link>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(row)}
                        className="text-sm text-red-600 hover:text-red-800 transition-colors"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                )}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

