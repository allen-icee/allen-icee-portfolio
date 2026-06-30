import { useState, useMemo, memo, type ReactNode } from 'react'
import { Icon } from '@iconify/react'

export interface Column<T> {
  key: keyof T | 'actions'
  label: string
  render?: (value: any, row: T & { id: string }) => ReactNode
  sortable?: boolean
}

interface AdminTableProps<T> {
  columns: Column<T>[]
  data: (T & { id: string })[]
  loading?: boolean
  searchable?: boolean
  onEdit: (item: T & { id: string }) => void
  onDelete: (item: T & { id: string }) => void
  onAdd: () => void
  defaultSortKey?: keyof T | 'order' | 'createdAt'
}

interface TableRowProps<T> {
  row: T & { id: string }
  columns: Column<T>[]
  onEdit: (item: T & { id: string }) => void
  onDelete: (item: T & { id: string }) => void
  deletingId: string | null
  setDeletingId: (id: string | null) => void
}

const TableRowInner = function <T>({
  row,
  columns,
  onEdit,
  onDelete,
  deletingId,
  setDeletingId,
}: TableRowProps<T>) {
  return (
    <tr className="border-b border-white/5 transition-colors hover:bg-white/5">
      {columns.map((col) => (
        <td key={String(col.key)} className="px-4 py-3 text-white/80">
          {col.render
            ? col.render(row[col.key as keyof T], row)
            : String(row[col.key as keyof T] ?? '')}
        </td>
      ))}
      <td className="px-4 py-3 text-right">
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => onEdit(row)}
            className="rounded-md p-1.5 text-white/40 transition-colors hover:bg-purple-500/20 hover:text-purple-400"
            aria-label="Edit"
          >
            <Icon icon="lucide:pencil" className="size-4" />
          </button>

          {deletingId === row.id ? (
            <div className="flex items-center gap-1 bg-red-950/50 border border-red-900/50 rounded-lg p-1">
              <button
                onClick={() => { onDelete(row); setDeletingId(null) }}
                className="rounded px-2 py-1 text-xs font-medium text-red-400 hover:bg-red-900/50 transition-colors"
              >
                Confirm
              </button>
              <button
                onClick={() => setDeletingId(null)}
                className="rounded px-2 py-1 text-xs text-white/50 hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setDeletingId(row.id)}
              className="rounded-md p-1.5 text-white/40 transition-colors hover:bg-red-500/20 hover:text-red-400"
              aria-label="Delete"
            >
              <Icon icon="lucide:trash-2" className="size-4" />
            </button>
          )}
        </div>
      </td>
    </tr>
  )
}

const TableRow = memo(TableRowInner) as typeof TableRowInner

export default function AdminTable<T>({
  columns,
  data,
  loading,
  searchable = true,
  onEdit,
  onDelete,
  onAdd,
  defaultSortKey = 'order' as keyof T
}: AdminTableProps<T>) {
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortConfig, setSortConfig] = useState<{ key: keyof T, direction: 'asc' | 'desc' } | null>({
    key: defaultSortKey as keyof T,
    direction: 'asc'
  })
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const handleSort = (key: keyof T | 'actions') => {
    if (key === 'actions') return
    let direction: 'asc' | 'desc' = 'asc'
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key: key as keyof T, direction })
  }

  const processedData = useMemo(() => {
    let result = [...data]

    // Search
    if (searchable && searchTerm) {
      result = result.filter(item => 
        Object.values(item).some(val => 
          String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    }

    // Sort
    if (sortConfig !== null) {
      result.sort((a, b) => {
        const aVal = a[sortConfig.key]
        const bVal = b[sortConfig.key]
        
        if (aVal === bVal) return 0
        if (aVal == null) return 1
        if (bVal == null) return -1
        
        const aStr = String(aVal)
        const bStr = String(bVal)
        
        if (sortConfig.direction === 'asc') {
          return aStr.localeCompare(bStr, undefined, { numeric: true })
        }
        return bStr.localeCompare(aStr, undefined, { numeric: true })
      })
    }

    return result
  }, [data, searchTerm, sortConfig, searchable])

  const totalPages = Math.ceil(processedData.length / itemsPerPage)
  const paginatedData = processedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  if (loading) {
    return (
      <div className="flex items-center gap-3 py-12 text-sm text-white/40">
        <Icon icon="lucide:loader-circle" className="size-4 animate-spin" />
        Loading…
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {searchable && (
          <div className="relative w-full sm:w-64">
            <Icon icon="lucide:search" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-gray-900 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm outline-none focus:border-purple-500/50 transition-colors placeholder:text-gray-600"
            />
          </div>
        )}
        <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
          <p className="text-xs text-white/40">{processedData.length} item{processedData.length !== 1 ? 's' : ''}</p>
          <button
            onClick={onAdd}
            className="flex items-center gap-1.5 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-500 shadow-lg shadow-purple-900/20"
          >
            <Icon icon="lucide:plus" className="size-4" />
            Create
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/10 bg-gray-900/50">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead>
            <tr className="border-b border-white/10 bg-black/40">
              {columns.map((col) => (
                <th 
                  key={String(col.key)} 
                  className={`px-4 py-3 font-medium text-white/60 ${col.sortable !== false ? 'cursor-pointer select-none hover:text-white transition-colors' : ''}`}
                  onClick={() => col.sortable !== false && handleSort(col.key)}
                >
                  <div className="flex items-center gap-2">
                    {col.label}
                    {col.sortable !== false && sortConfig?.key === col.key && (
                      <Icon icon={sortConfig.direction === 'asc' ? 'lucide:chevron-up' : 'lucide:chevron-down'} className="size-3" />
                    )}
                  </div>
                </th>
              ))}
              <th className="px-4 py-3 text-right text-white/60 w-24">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-4 py-12 text-center text-white/40">
                  No records found.
                </td>
              </tr>
            ) : (
              paginatedData.map((row) => (
                <TableRow
                  key={row.id}
                  row={row}
                  columns={columns}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  deletingId={deletingId}
                  setDeletingId={setDeletingId}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm text-gray-400">
          <div>
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, processedData.length)} of {processedData.length}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1 rounded hover:bg-white/10 disabled:opacity-50 disabled:hover:bg-transparent"
            >
              <Icon icon="lucide:chevron-left" className="size-5" />
            </button>
            <span className="font-medium text-white/80">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1 rounded hover:bg-white/10 disabled:opacity-50 disabled:hover:bg-transparent"
            >
              <Icon icon="lucide:chevron-right" className="size-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}