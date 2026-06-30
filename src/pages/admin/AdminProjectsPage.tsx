// src/pages/admin/AdminProjectsPage.tsx
import { useState } from 'react'
import { useCollection } from '../../hooks/useCollection'
import AdminTable, { type Column } from '../../components/admin/components/AdminTable'
import AdminFormModal from '../../components/admin/modals/AdminFormModal'
import type { Project } from '../../types'

const columns: Column<Project>[] = [
  { key: 'title', label: 'Title' },
  { key: 'tagline', label: 'Tagline', render: (v: any) => String(v).slice(0, 50) + (String(v).length > 50 ? '…' : '') },
  { key: 'isFeatured', label: 'Featured', render: (v: any) => (v ? '⭐' : '—') },
  { key: 'updatedAt', label: 'Updated', render: (v: any) => new Date(v as number).toLocaleDateString() },
]

const formFields = [
  { key: 'title', label: 'Title', required: true },
  { key: 'tagline', label: 'Tagline', required: true },
  { key: 'description', label: 'Description', type: 'textarea' as const, required: true },
  { key: 'techStack', label: 'Tech Stack (comma-separated)' },
  { key: 'coverImage', label: 'Cover Image URL', type: 'url' as const },
  { key: 'githubLink', label: 'GitHub URL', type: 'url' as const },
  { key: 'liveUrl', label: 'Live URL', type: 'url' as const },
  { key: 'figmaUrl', label: 'Figma URL', type: 'url' as const },
  {
    key: 'isFeatured',
    label: 'Featured',
    type: 'select' as const,
    options: [
      { label: 'No', value: 'false' },
      { label: 'Yes', value: 'true' },
    ],
  },
]

export default function AdminProjectsPage() {
  const { items, loading, addItem, updateItem, removeItem } = useCollection<Project>('projects')
  const [editing, setEditing] = useState<(Project & { id: string }) | null>(null)
  const [showForm, setShowForm] = useState(false)

  function parseForm(data: Record<string, unknown>) {
    return {
      ...data,
      isFeatured: data.isFeatured === 'true' || data.isFeatured === true,
      techStack: typeof data.techStack === 'string'
        ? String(data.techStack).split(',').map((s) => s.trim()).filter(Boolean)
        : data.techStack,
    } as Omit<Project, 'id' | 'createdAt' | 'updatedAt'>
  }

  async function handleAdd(data: Record<string, unknown>) {
    await addItem(parseForm(data))
  }

  async function handleEdit(data: Record<string, unknown>) {
    if (!editing) return
    await updateItem(editing.id, parseForm(data) as Partial<Project>)
    setEditing(null)
  }

  async function handleDelete(item: Project & { id: string }) {
    await removeItem(item.id)
  }

  return (
    <div>
      <h1 className="mb-6 text-lg font-medium text-white">Projects</h1>
      <AdminTable
        columns={columns}
        data={items}
        loading={loading}
        onEdit={(item: any) => { setEditing(item); setShowForm(true) }}
        onDelete={handleDelete}
        onAdd={() => { setEditing(null); setShowForm(true) }}
      />

      <AdminFormModal
        isOpen={showForm}
        onClose={() => { setShowForm(false); setEditing(null) }}
        onSubmit={editing ? handleEdit : handleAdd}
        fields={formFields}
        initialData={editing ? {
          ...editing,
          techStack: Array.isArray(editing.techStack) ? editing.techStack.join(', ') : '',
          isFeatured: String(editing.isFeatured),
        } : null}
        title={editing ? 'Edit Project' : 'Add Project'}
      />
    </div>
  )
}