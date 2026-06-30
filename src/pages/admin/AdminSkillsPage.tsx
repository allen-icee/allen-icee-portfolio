import { useState } from 'react'
import { useCollection } from '../../hooks/useCollection'
import type { Skill, SkillCategory } from '../../types'
import AdminTable, { type Column } from '../../components/admin/components/AdminTable'
import AdminModal from '../../components/admin/modals/AdminModal'
import { useToast } from '../../components/admin/components/AdminToast'
import { Icon } from '@iconify/react'

const defaultCategoryData: Omit<SkillCategory, 'id' | 'createdAt' | 'updatedAt'> = { name: '', classification: 'technical' }
const defaultSkillData: Omit<Skill, 'id' | 'createdAt' | 'updatedAt'> = { name: '', categoryId: '', icon: '' }

export default function AdminSkillsPage() {
  const { items: categories, loading: catsLoading, addItem: addCat, updateItem: updateCat, removeItem: removeCat } = useCollection<SkillCategory>('skillCategories')
  const { items: skills, loading: skillsLoading, addItem: addSkill, updateItem: updateSkill, removeItem: removeSkill } = useCollection<Skill>('skills')
  
  const { addToast } = useToast()
  
  // Category State
  const [isCatModalOpen, setIsCatModalOpen] = useState(false)
  const [editingCatId, setEditingCatId] = useState<string | null>(null)
  const [catFormData, setCatFormData] = useState(defaultCategoryData)
  
  // Skill State
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false)
  const [editingSkillId, setEditingSkillId] = useState<string | null>(null)
  const [skillFormData, setSkillFormData] = useState(defaultSkillData)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState<'skills' | 'categories'>('skills')

  // --- Category Handlers ---
  const handleCatAdd = () => {
    setEditingCatId(null)
    setCatFormData(defaultCategoryData)
    setIsCatModalOpen(true)
  }
  const handleCatEdit = (item: SkillCategory & { id: string }) => {
    setEditingCatId(item.id)
    setCatFormData({ name: item.name, classification: item.classification || 'technical' })
    setIsCatModalOpen(true)
  }
  const handleCatSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      if (editingCatId) await updateCat(editingCatId, catFormData)
      else await addCat(catFormData)
      addToast(`Category ${editingCatId ? 'updated' : 'added'} successfully`, 'success')
      setIsCatModalOpen(false)
    } catch (err: any) {
      addToast(err.message, 'error')
    } finally {
      setIsSubmitting(false)
    }
  }
  const handleCatDelete = async (item: SkillCategory & { id: string }) => {
    try {
      await removeCat(item.id)
      addToast('Category deleted', 'success')
    } catch (err: any) { addToast(err.message, 'error') }
  }

  // --- Skill Handlers ---
  const handleSkillAdd = () => {
    setEditingSkillId(null)
    setSkillFormData({ ...defaultSkillData, categoryId: categories[0]?.id || '' })
    setIsSkillModalOpen(true)
  }
  const handleSkillEdit = (item: Skill & { id: string }) => {
    setEditingSkillId(item.id)
    setSkillFormData({ name: item.name, categoryId: item.categoryId, icon: item.icon })
    setIsSkillModalOpen(true)
  }
  const handleSkillSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      if (editingSkillId) await updateSkill(editingSkillId, skillFormData)
      else await addSkill(skillFormData)
      addToast(`Skill ${editingSkillId ? 'updated' : 'added'} successfully`, 'success')
      setIsSkillModalOpen(false)
    } catch (err: any) {
      addToast(err.message, 'error')
    } finally {
      setIsSubmitting(false)
    }
  }
  const handleSkillDelete = async (item: Skill & { id: string }) => {
    try {
      await removeSkill(item.id)
      addToast('Skill deleted', 'success')
    } catch (err: any) { addToast(err.message, 'error') }
  }

  // --- Columns ---
  const catColumns: Column<SkillCategory>[] = [
    { key: 'name', label: 'Category Name' },
    { key: 'classification', label: 'Classification', render: (val) => val === 'professional' ? 'Professional/Soft' : 'Technical' }
  ]
  const skillColumns: Column<Skill>[] = [
    { 
      key: 'icon', 
      label: 'Icon', 
      sortable: false,
      render: (val) => <Icon icon={val as string || 'lucide:code'} className="w-6 h-6 text-purple-400" /> 
    },
    { key: 'name', label: 'Skill Name' },
    { 
      key: 'categoryId', 
      label: 'Category',
      render: (val) => categories.find(c => c.id === val)?.name || 'Unknown'
    }
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-white">Skills & Categories</h1>
      </div>

      <div className="flex gap-2 border-b border-white/10 pb-2">
        <button
          onClick={() => setActiveTab('skills')}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
            activeTab === 'skills' ? 'bg-purple-600/20 text-purple-400' : 'text-gray-400 hover:bg-white/5'
          }`}
        >
          Skills
        </button>
        <button
          onClick={() => setActiveTab('categories')}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
            activeTab === 'categories' ? 'bg-purple-600/20 text-purple-400' : 'text-gray-400 hover:bg-white/5'
          }`}
        >
          Categories
        </button>
      </div>

      {activeTab === 'skills' ? (
        <AdminTable
          columns={skillColumns}
          data={skills}
          loading={skillsLoading || catsLoading}
          onAdd={handleSkillAdd}
          onEdit={handleSkillEdit}
          onDelete={handleSkillDelete}
          defaultSortKey="name"
        />
      ) : (
        <AdminTable
          columns={catColumns}
          data={categories}
          loading={catsLoading}
          onAdd={handleCatAdd}
          onEdit={handleCatEdit}
          onDelete={handleCatDelete}
          defaultSortKey="name"
        />
      )}

      {/* Category Modal */}
      <AdminModal
        isOpen={isCatModalOpen}
        onClose={() => setIsCatModalOpen(false)}
        title={editingCatId ? 'Edit Category' : 'Add Category'}
      >
        <form onSubmit={handleCatSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              required
              value={catFormData.name}
              onChange={e => setCatFormData({ ...catFormData, name: e.target.value })}
              className="w-full bg-gray-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-purple-500/50 transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Classification <span className="text-red-500">*</span></label>
            <select
              value={catFormData.classification}
              onChange={e => setCatFormData({ ...catFormData, classification: e.target.value as 'technical' | 'professional' })}
              className="w-full bg-gray-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-purple-500/50 transition-colors"
            >
              <option value="technical">Technical</option>
              <option value="professional">Professional / Soft</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-white/10">
            <button type="button" onClick={() => setIsCatModalOpen(false)} className="px-4 py-2 text-sm font-medium text-white/50 hover:text-white transition-colors">Cancel</button>
            <button type="submit" disabled={!catFormData.name.trim() || isSubmitting} className="px-6 py-2 text-sm font-medium bg-purple-600 hover:bg-purple-500 disabled:bg-gray-800 disabled:text-gray-500 text-white rounded-xl transition-colors">
              {isSubmitting ? 'Saving...' : editingCatId ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </AdminModal>

      {/* Skill Modal */}
      <AdminModal
        isOpen={isSkillModalOpen}
        onClose={() => setIsSkillModalOpen(false)}
        title={editingSkillId ? 'Edit Skill' : 'Add Skill'}
      >
        <form onSubmit={handleSkillSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              required
              value={skillFormData.name}
              onChange={e => setSkillFormData({ ...skillFormData, name: e.target.value })}
              className="w-full bg-gray-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-purple-500/50 transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Category <span className="text-red-500">*</span></label>
            <select
              required
              value={skillFormData.categoryId}
              onChange={e => setSkillFormData({ ...skillFormData, categoryId: e.target.value })}
              className="w-full bg-gray-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-purple-500/50 transition-colors"
            >
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Iconify Icon <span className="text-red-500">*</span></label>
            <input
              type="text"
              required
              value={skillFormData.icon}
              onChange={e => setSkillFormData({ ...skillFormData, icon: e.target.value })}
              className="w-full bg-gray-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-purple-500/50 transition-colors"
              placeholder="e.g. logos:react"
            />
            <a href="https://icon-sets.iconify.design/" target="_blank" rel="noopener noreferrer" className="text-xs text-purple-400 hover:underline">Find icons here</a>
          </div>
          <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-white/10">
            <button type="button" onClick={() => setIsSkillModalOpen(false)} className="px-4 py-2 text-sm font-medium text-white/50 hover:text-white transition-colors">Cancel</button>
            <button type="submit" disabled={!skillFormData.name.trim() || !skillFormData.icon.trim() || isSubmitting} className="px-6 py-2 text-sm font-medium bg-purple-600 hover:bg-purple-500 disabled:bg-gray-800 disabled:text-gray-500 text-white rounded-xl transition-colors">
              {isSubmitting ? 'Saving...' : editingSkillId ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  )
}