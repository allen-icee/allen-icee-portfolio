import { useState } from 'react'
import { useCollection } from '../../hooks/useCollection'
import AdminTable, { type Column } from '../../components/admin/AdminTable'
import AdminFormModal from '../../components/admin/AdminFormModal'
import type { Artwork } from '../../types'

const columns: Column<Artwork>[] = [
  { key: 'title', label: 'Title' },
  { key: 'medium', label: 'Medium' },
  { key: 'updatedAt', label: 'Updated', render: (v) => new Date(v as number).toLocaleDateString() },
]

const formFields = [
  { key: 'title', label: 'Title', required: true },
  { key: 'imageURL', label: 'Image URL', type: 'url' as const, required: true },
  { key: 'medium', label: 'Medium', required: true },
  { key: 'story', label: 'Story', type: 'textarea' as const, required: true },
]

export default function AdminArtPage() {
  const { items, loading, addItem, updateItem, removeItem } = useCollection<Artwork>('artworks')
  const [editing, setEditing] = useState<(Artwork & { id: string }) | null>(null)
  const [showForm, setShowForm] = useState(false)

  function parseForm(data: Record<string, unknown>) {
    return {
      title: String(data.title),
      imageURL: String(data.imageURL),
      medium: String(data.medium),
      story: String(data.story),
    } as Omit<Artwork, 'id' | 'createdAt' | 'updatedAt'>
  }

  async function handleAdd(data: Record<string, unknown>) {
    await addItem(parseForm(data))
  }

  async function handleEdit(data: Record<string, unknown>) {
    if (!editing) return
    await updateItem(editing.id, parseForm(data) as Partial<Artwork>)
    setEditing(null)
  }

  async function handleDelete(item: Artwork & { id: string }) {
    await removeItem(item.id)
  }

  return (
    <div>
      <h1 className="mb-6 text-lg font-medium text-white">Artworks</h1>
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
        initialData={editing ? { ...editing } : null}
        title={editing ? 'Edit Artwork' : 'Add Artwork'}
      />
    </div>
  )
}
