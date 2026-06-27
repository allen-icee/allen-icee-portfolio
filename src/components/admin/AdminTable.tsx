import { useState, type ReactNode } from 'react'
import { Icon } from '@iconify/react'

export interface Column<T> {
  key: keyof T
  label: string
  render?: (value: T[keyof T], row: T & { id: string }) => ReactNode
  sortable?: boolean
}

interface AdminTableProps<T> {
  columns: Column<T>[]
  data: (T & { id: string })[]
  loading?: boolean
  onEdit: (item: T & { id: string }) => void
  onDelete: (item: T & { id: string }) => void
  onAdd: () => void
}

export default function AdminTable<T>({
  columns,
  data,
  loading,
  onEdit,
  onDelete,
  onAdd,
}: AdminTableProps<T>) {
  const [deletingId, setDeletingId] = useState<string | null>(null)

  if (loading) {
    return (
      <div className="flex items-center gap-3 py-12 text-sm text-white/40">
        <Icon icon="lucide:loader-circle" className="size-4 animate-spin" />
        Loading…
      </div>
    )
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-xs text-white/40">{data.length} item{data.length !== 1 ? 's' : ''}</p>
        <button
          onClick={onAdd}
          className="flex items-center gap-1.5 rounded-lg bg-purple-brand/80 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-purple-brand"
        >
          <Icon icon="lucide:plus" className="size-3.5" />
          Add
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/[0.06]">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/[0.06] bg-white/[0.02]">
              {columns.map((col) => (
                <th key={String(col.key)} className="px-4 py-3 font-medium text-white/50">
                  {col.label}
                </th>
              ))}
              <th className="px-4 py-3 text-right text-white/50">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-4 py-12 text-center text-white/30">
                  No items yet.
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr key={row.id} className="border-b border-white/[0.03] transition-colors hover:bg-white/[0.02]">
                  {columns.map((col) => (
                    <td key={String(col.key)} className="px-4 py-3 text-white/70">
                      {col.render
                        ? col.render(row[col.key], row)
                        : String(row[col.key] ?? '')}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => onEdit(row)}
                        className="rounded-lg p-1.5 text-white/30 transition-colors hover:bg-white/[0.06] hover:text-white/60"
                        aria-label="Edit"
                      >
                        <Icon icon="lucide:pencil" className="size-3.5" />
                      </button>

                      {deletingId === row.id ? (
                        <span className="flex items-center gap-1">
                          <button
                            onClick={() => { onDelete(row); setDeletingId(null) }}
                            className="rounded-lg bg-red-500/20 px-2 py-1 text-[10px] text-red-400 transition-colors hover:bg-red-500/30"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setDeletingId(null)}
                            className="rounded-lg px-2 py-1 text-[10px] text-white/40 transition-colors hover:bg-white/[0.06]"
                          >
                            Cancel
                          </button>
                        </span>
                      ) : (
                        <button
                          onClick={() => setDeletingId(row.id)}
                          className="rounded-lg p-1.5 text-white/30 transition-colors hover:bg-white/[0.06] hover:text-red-400"
                          aria-label="Delete"
                        >
                          <Icon icon="lucide:trash-2" className="size-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
