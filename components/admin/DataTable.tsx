'use client'

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
}: DataTableProps) {
  // Ensure data is always an array
  const safeData = Array.isArray(data) ? data : []

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-secondary">Loading...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-heading text-foreground">{title}</h2>
        {createLink && (
          <Link
            href={createLink}
            className="bg-accent text-white px-6 py-3 rounded-xl font-heading transition-all duration-300 hover:bg-accent-hover shadow-depth-3 hover:shadow-depth-4"
          >
            Create New
          </Link>
        )}
      </div>

      <Card className="overflow-hidden">
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
                      className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                        column.className || ''
                      }`}
                    >
                      {column.header}
                    </th>
                  ))}
                  {(viewLink || editLink || onDelete) && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                        className={`px-6 py-4 whitespace-nowrap ${
                          column.className || ''
                        }`}
                      >
                        {typeof column.accessor === 'function'
                          ? column.accessor(row)
                          : row[column.accessor]}
                      </td>
                    ))}
                    {(viewLink || editLink || onDelete) && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-3">
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
    </div>
  )
}

