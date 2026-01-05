'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { Download, Plus, Eye, Edit, Trash2 } from 'lucide-react'

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
        <div className="text-[#8C8C8C]">Loading...</div>
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#D9D9D9] via-[#BFBFBF] to-[#8C8C8C] bg-clip-text text-transparent">{title}</h2>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
          {safeData.length > 0 && (
            <button
              onClick={exportToCSV}
              className="group flex items-center justify-center gap-2 bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] text-[#D9D9D9] px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 border border-[#BFBFBF]/20 hover:border-[#D9D9D9]/30 text-sm sm:text-base w-full sm:w-auto"
            >
              <Download className="w-4 h-4" />
              <span>Download CSV</span>
            </button>
          )}
          {createLink && (
            <Link
              href={createLink}
              className="group flex items-center justify-center gap-2 bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] text-[#D9D9D9] px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 border border-[#BFBFBF]/20 hover:border-[#D9D9D9]/30 text-sm sm:text-base w-full sm:w-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Create New</span>
            </Link>
          )}
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="overflow-hidden hidden md:block rounded-xl border border-[#BFBFBF]/10 bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A]">
        <div className="overflow-x-auto">
          {safeData.length === 0 ? (
            <div className="py-12 text-center text-[#8C8C8C]">{emptyMessage}</div>
          ) : (
            <table className="w-full">
              <thead className="bg-gradient-to-br from-[#0A0A0A] to-[#151515] border-b border-[#BFBFBF]/10">
                <tr>
                  {columns.map((column, index) => (
                    <th
                      key={index}
                      className={`px-4 lg:px-6 py-3 text-left text-xs font-semibold text-[#8C8C8C] uppercase tracking-wider ${
                        column.className || ''
                      }`}
                    >
                      {column.header}
                    </th>
                  ))}
                  {(viewLink || editLink || onDelete) && (
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-[#8C8C8C] uppercase tracking-wider">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#BFBFBF]/10">
                {safeData.map((row, rowIndex) => (
                  <tr key={rowIndex} className="hover:bg-gradient-to-r hover:from-[#0A0A0A] hover:to-[#151515] transition-all duration-300">
                    {columns.map((column, colIndex) => (
                      <td
                        key={colIndex}
                        className={`px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-[#BFBFBF] ${
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
                              className="flex items-center gap-1 text-[#BFBFBF] hover:text-[#D9D9D9] transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                              <span>View</span>
                            </Link>
                          )}
                          {editLink && (
                            <Link
                              href={editLink(row)}
                              className="flex items-center gap-1 text-[#BFBFBF] hover:text-[#D9D9D9] transition-colors"
                            >
                              <Edit className="w-4 h-4" />
                              <span>Edit</span>
                            </Link>
                          )}
                          {onDelete && (
                            <button
                              onClick={() => onDelete(row)}
                              className="flex items-center gap-1 text-[#BFBFBF] hover:text-red-400 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                              <span>Delete</span>
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
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {safeData.length === 0 ? (
          <div className="p-6 rounded-xl border border-[#BFBFBF]/10 bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A]">
            <div className="py-8 text-center text-[#8C8C8C]">{emptyMessage}</div>
          </div>
        ) : (
          safeData.map((row, rowIndex) => (
            <div key={rowIndex} className="p-4 rounded-xl border border-[#BFBFBF]/10 bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A]">
              <div className="space-y-3">
                {columns.map((column, colIndex) => (
                  <div key={colIndex} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <span className="text-xs font-semibold text-[#8C8C8C] uppercase">
                      {column.header}:
                    </span>
                    <span className="text-sm text-[#BFBFBF]">
                      {typeof column.accessor === 'function'
                        ? column.accessor(row)
                        : row[column.accessor] || 'N/A'}
                    </span>
                  </div>
                ))}
                {(viewLink || editLink || onDelete) && (
                  <div className="flex gap-3 pt-2 border-t border-[#BFBFBF]/10">
                    {viewLink && (
                      <Link
                        href={viewLink(row)}
                        className="flex items-center gap-1 text-sm text-[#BFBFBF] hover:text-[#D9D9D9] transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </Link>
                    )}
                    {editLink && (
                      <Link
                        href={editLink(row)}
                        className="flex items-center gap-1 text-sm text-[#BFBFBF] hover:text-[#D9D9D9] transition-colors"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </Link>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(row)}
                        className="flex items-center gap-1 text-sm text-[#BFBFBF] hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

