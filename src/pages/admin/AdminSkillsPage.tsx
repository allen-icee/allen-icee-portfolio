// src/pages/admin/AdminSkillsPage.tsx
import { useState } from 'react'
import { useCollection } from '../../hooks/useCollection'
import AdminTable, { type Column } from '../../components/admin/components/AdminTable'
import AdminFormModal from '../../components/admin/modals/AdminFormModal'
import type { Skill } from '../../types'

const columns: Column<Skill>[] = [
  { key: 'name', label: 'Name' },
  { key: 'category', label: 'Category' },
  { key: 'confidence', label: 'Confidence', render: (v: any) => `${v}%` },
  { key: 'yearsOfExperience', label: 'Years' },
]

const formFields = [
  { key: 'name', label: 'Name', required: true },
  { key: 'category', label: 'Category', required: true },
  { key: 'icon', label: 'Iconify ID (e.g. logos:react)' },
  { key: 'confidence', label: 'Confidence (0-100)', type: 'number' as const },
  { key: 'yearsOfExperience', label: 'Years of Experience', type: 'number' as const },
]

export default function AdminSkillsPage() {
  const { items, loading, addItem, updateItem, removeItem } = useCollection<Skill>('skills')
  const [editing, setEditing] = useState<(Skill & { id: string }) | null>(null)
  const [showForm, setShowForm] = useState(false)

  function parseForm(data: Record<string, unknown>) {
    return {
      name: String(data.name),
      category: String(data.category),
      icon: String(data.icon),
      confidence: Number(data.confidence),
      yearsOfExperience: Number(data.yearsOfExperience),
    } as Omit<Skill, 'id' | 'createdAt' | 'updatedAt'>
  }

  async function handleAdd(data: Record<string, unknown>) {
    await addItem(parseForm(data))
  }

  async function handleEdit(data: Record<string, unknown>) {
    if (!editing) return
    await updateItem(editing.id, parseForm(data) as Partial<Skill>)
    setEditing(null)
  }

  async function handleDelete(item: Skill & { id: string }) {
    await removeItem(item.id)
  }

  return (
    <div>
      <h1 className="mb-6 text-lg font-medium text-white">Skills</h1>
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
        initialData={editing ? { ...editing } : null}
        title={editing ? 'Edit Skill' : 'Add Skill'}
      />
    </div>
  )
}