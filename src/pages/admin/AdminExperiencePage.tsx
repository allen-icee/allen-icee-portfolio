import { useState } from 'react'
import { useCollection } from '../../hooks/useCollection'
import type { Experience } from '../../types'
import AdminTable, { type Column } from '../../components/admin/components/AdminTable'
import AdminModal from '../../components/admin/modals/AdminModal'
import { useToast } from '../../components/admin/components/AdminToast'
import AdminToggle from '../../components/admin/components/AdminToggle'

const defaultFormData: Omit<Experience, 'id' | 'createdAt' | 'updatedAt'> = {
  order: 0,
  role: '',
  company: '',
  startMonth: 'January',
  startYear: new Date().getFullYear().toString(),
  description: '',
  skillsAcquired: []
}

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export default function AdminExperiencePage() {
  const { items, loading, addItem, updateItem, removeItem } = useCollection<Experience>('experience')
  const { addToast } = useToast()
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState(defaultFormData)
  const [isPresent, setIsPresent] = useState(false)
  const [skillsText, setSkillsText] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const columns: Column<Experience>[] = [
    { key: 'order', label: 'Order' },
    { key: 'role', label: 'Role' },
    { key: 'company', label: 'Company' },
    { 
      key: 'startYear', 
      label: 'Duration',
      render: (_, row) => `${row.startMonth} ${row.startYear} - ${row.endYear ? `${row.endMonth} ${row.endYear}` : 'Present'}`
    }
  ]

  const handleAdd = () => {
    setEditingId(null)
    setFormData(defaultFormData)
    setIsPresent(true)
    setSkillsText('')
    setIsModalOpen(true)
  }

  const handleEdit = (item: Experience & { id: string }) => {
    setEditingId(item.id)
    setFormData({
      order: item.order || 0,
      role: item.role || '',
      company: item.company || '',
      startMonth: item.startMonth || 'January',
      startYear: item.startYear || new Date().getFullYear().toString(),
      endMonth: item.endMonth,
      endYear: item.endYear,
      description: item.description || '',
      skillsAcquired: item.skillsAcquired || []
    })
    setIsPresent(!item.endYear)
    setSkillsText(item.skillsAcquired?.join(', ') || '')
    setIsModalOpen(true)
  }

  const handleDelete = async (item: Experience & { id: string }) => {
    try {
      await removeItem(item.id)
      addToast('Experience deleted successfully', 'success')
    } catch (err: any) {
      addToast(err.message || 'Failed to delete', 'error')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const payload = {
        ...formData,
        endMonth: isPresent ? undefined : formData.endMonth,
        endYear: isPresent ? undefined : formData.endYear,
        skillsAcquired: skillsText.split(',').map(s => s.trim()).filter(s => s)
      }

      if (editingId) {
        await updateItem(editingId, payload)
        addToast('Experience updated successfully', 'success')
      } else {
        await addItem(payload)
        addToast('Experience added successfully', 'success')
      }
      setIsModalOpen(false)
    } catch (err: any) {
      addToast(err.message || 'Failed to save', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = formData.role.trim() && formData.company.trim() && formData.startYear.trim() && formData.description.trim()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-white">Experience</h1>
      </div>

      <AdminTable
        columns={columns}
        data={items}
        loading={loading}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        defaultSortKey="order"
      />

      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Edit Experience' : 'Add Experience'}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Order <span className="text-red-500">*</span></label>
              <input
                type="number"
                value={formData.order}
                onChange={e => setFormData({ ...formData, order: Number(e.target.value) })}
                className="w-full bg-gray-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-purple-500/50 transition-colors"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Role <span className="text-red-500">*</span></label>
              <input
                type="text"
                required
                value={formData.role}
                onChange={e => setFormData({ ...formData, role: e.target.value })}
                className="w-full bg-gray-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-purple-500/50 transition-colors"
                placeholder="e.g. Senior Developer"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Company <span className="text-red-500">*</span></label>
              <input
                type="text"
                required
                value={formData.company}
                onChange={e => setFormData({ ...formData, company: e.target.value })}
                className="w-full bg-gray-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-purple-500/50 transition-colors"
                placeholder="e.g. Google"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Start Month</label>
              <select
                value={formData.startMonth}
                onChange={e => setFormData({ ...formData, startMonth: e.target.value })}
                className="w-full bg-gray-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-purple-500/50 transition-colors"
              >
                {months.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Start Year <span className="text-red-500">*</span></label>
              <input
                type="text"
                required
                value={formData.startYear}
                onChange={e => setFormData({ ...formData, startYear: e.target.value })}
                className="w-full bg-gray-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-purple-500/50 transition-colors"
              />
            </div>
          </div>

          <AdminToggle
            label="Currently working here (Present)"
            checked={isPresent}
            onChange={setIsPresent}
          />

          {!isPresent && (
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">End Month</label>
                <select
                  value={formData.endMonth || ''}
                  onChange={e => setFormData({ ...formData, endMonth: e.target.value })}
                  className="w-full bg-gray-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-purple-500/50 transition-colors"
                >
                  <option value="">Select Month...</option>
                  {months.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">End Year</label>
                <input
                  type="text"
                  value={formData.endYear || ''}
                  onChange={e => setFormData({ ...formData, endYear: e.target.value })}
                  className="w-full bg-gray-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-purple-500/50 transition-colors"
                />
              </div>
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Description <span className="text-red-500">*</span></label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-gray-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-purple-500/50 transition-colors resize-none"
              placeholder="What did you do?"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Skills Acquired (comma separated)</label>
            <input
              type="text"
              value={skillsText}
              onChange={e => setSkillsText(e.target.value)}
              className="w-full bg-gray-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-purple-500/50 transition-colors"
              placeholder="React, TypeScript, Node.js"
            />
          </div>

          <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-white/50 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className="px-6 py-2 text-sm font-medium bg-purple-600 hover:bg-purple-500 disabled:bg-gray-800 disabled:text-gray-500 text-white rounded-xl transition-colors"
            >
              {isSubmitting ? 'Saving...' : editingId ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  )
}