import { useState } from 'react'
import { useCollection } from '../../hooks/useCollection'
import AdminTable, { type Column } from '../../components/admin/AdminTable'
import AdminFormModal from '../../components/admin/AdminFormModal'
import type { Experience } from '../../types'

const columns: Column<Experience>[] = [
  { key: 'role', label: 'Role' },
  { key: 'company', label: 'Company' },
  { key: 'timeline', label: 'Period', render: (v) => {
    const t = v as { start: string; end?: string }
    return `${t.start} – ${t.end ?? 'Present'}`
  }},
]

const formFields = [
  { key: 'role', label: 'Role', required: true },
  { key: 'company', label: 'Company', required: true },
  { key: 'description', label: 'Description', type: 'textarea' as const, required: true },
  { key: 'technologies', label: 'Technologies (comma-separated)' },
  { key: 'timelineStart', label: 'Start Date (e.g. 2021-06)', required: true },
  { key: 'timelineEnd', label: 'End Date (leave blank for present)' },
]

export default function AdminExperiencePage() {
  const { items, loading, addItem, updateItem, removeItem } = useCollection<Experience>('experience')
  const [editing, setEditing] = useState<(Experience & { id: string }) | null>(null)
  const [showForm, setShowForm] = useState(false)

  function parseForm(data: Record<string, unknown>) {
    return {
      role: String(data.role),
      company: String(data.company),
      description: String(data.description),
      timeline: {
        start: String(data.timelineStart),
        end: data.timelineEnd ? String(data.timelineEnd) : undefined,
      },
      technologies: typeof data.technologies === 'string'
        ? String(data.technologies).split(',').map((s) => s.trim()).filter(Boolean)
        : data.technologies,
    } as Omit<Experience, 'id' | 'createdAt' | 'updatedAt'>
  }

  async function handleAdd(data: Record<string, unknown>) {
    await addItem(parseForm(data))
  }

  async function handleEdit(data: Record<string, unknown>) {
    if (!editing) return
    await updateItem(editing.id, parseForm(data) as Partial<Experience>)
    setEditing(null)
  }

  async function handleDelete(item: Experience & { id: string }) {
    await removeItem(item.id)
  }

  return (
    <div>
      <h1 className="mb-6 text-lg font-medium text-white">Experience</h1>
      <AdminTable
        columns={columns}
        data={items}
        loading={loading}
        onEdit={(item) => { setEditing(item); setShowForm(true) }}
        onDelete={handleDelete}
        onAdd={() => { setEditing(null); setShowForm(true) }}
      />

      <AdminFormModal
        isOpen={showForm}
        onClose={() => { setShowForm(false); setEditing(null) }}
        onSubmit={editing ? handleEdit : handleAdd}
        fields={formFields}
        initialData={editing ? { ...editing, timelineStart: editing.timeline.start, timelineEnd: editing.timeline.end ?? '' } : null}
        title={editing ? 'Edit Experience' : 'Add Experience'}
      />
    </div>
  )
}
