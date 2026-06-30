import { useState } from 'react'
import { useCollection } from '../../hooks/useCollection'
import type { Project } from '../../types'
import AdminTable, { type Column } from '../../components/admin/components/AdminTable'
import AdminModal from '../../components/admin/modals/AdminModal'
import { useToast } from '../../components/admin/components/AdminToast'
import { uploadImage } from '../../services/storage'
import { Icon } from '@iconify/react'

const defaultFormData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'> = {
  order: 0,
  title: '',
  tagline: '',
  description: '',
  techStack: [],
  coverImage: '',
  images: [],
  githubLink: '',
  liveUrl: ''
}

export default function AdminProjectsPage() {
  const { items, loading, addItem, updateItem, removeItem } = useCollection<Project>('projects')
  const { addToast } = useToast()
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState(defaultFormData)
  const [techStackText, setTechStackText] = useState('')
  const [imagesText, setImagesText] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingImage(true)
    try {
      const storedImage = await uploadImage(file, `projects/${Date.now()}_${file.name}`)
      setFormData(prev => ({ ...prev, coverImage: storedImage.url }))
      addToast('Image uploaded successfully', 'success')
    } catch (err: any) {
      addToast(err.message || 'Failed to upload image', 'error')
    } finally {
      setUploadingImage(false)
    }
  }

  const columns: Column<Project>[] = [
    { key: 'order', label: 'Order' },
    { 
      key: 'coverImage', 
      label: 'Cover',
      render: (val) => val ? <img src={val} alt="cover" className="w-10 h-10 object-cover rounded" /> : null,
      sortable: false
    },
    { key: 'title', label: 'Title' },
    { key: 'tagline', label: 'Tagline' }
  ]

  const handleAdd = () => {
    setEditingId(null)
    setFormData(defaultFormData)
    setTechStackText('')
    setImagesText('')
    setIsModalOpen(true)
  }

  const handleEdit = (item: Project & { id: string }) => {
    setEditingId(item.id)
    setFormData({
      order: item.order,
      title: item.title,
      tagline: item.tagline,
      description: item.description,
      techStack: item.techStack || [],
      coverImage: item.coverImage,
      images: item.images || [],
      githubLink: item.githubLink,
      liveUrl: item.liveUrl
    })
    setTechStackText(item.techStack?.join(', ') || '')
    setImagesText(item.images?.join(', ') || '')
    setIsModalOpen(true)
  }

  const handleDelete = async (item: Project & { id: string }) => {
    try {
      await removeItem(item.id)
      addToast('Project deleted successfully', 'success')
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
        techStack: techStackText.split(',').map(s => s.trim()).filter(s => s),
        images: imagesText.split(',').map(s => s.trim()).filter(s => s)
      }

      if (editingId) {
        await updateItem(editingId, payload)
        addToast('Project updated successfully', 'success')
      } else {
        await addItem(payload)
        addToast('Project added successfully', 'success')
      }
      setIsModalOpen(false)
    } catch (err: any) {
      addToast(err.message || 'Failed to save', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = formData.title.trim() && formData.description.trim() && formData.coverImage.trim()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-white">Projects</h1>
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
        title={editingId ? 'Edit Project' : 'Add Project'}
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
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Title <span className="text-red-500">*</span></label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-gray-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-purple-500/50 transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Tagline</label>
            <input
              type="text"
              value={formData.tagline}
              onChange={e => setFormData({ ...formData, tagline: e.target.value })}
              className="w-full bg-gray-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-purple-500/50 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Description <span className="text-red-500">*</span></label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-gray-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-purple-500/50 transition-colors resize-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Tech Stack (comma separated)</label>
            <input
              type="text"
              value={techStackText}
              onChange={e => setTechStackText(e.target.value)}
              className="w-full bg-gray-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-purple-500/50 transition-colors"
              placeholder="React, TypeScript, Firebase"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Cover Image <span className="text-red-500">*</span></label>
            <div className="flex items-center gap-4">
              {formData.coverImage && (
                <img src={formData.coverImage} alt="Cover Preview" className="w-16 h-16 object-cover rounded-xl border border-white/10" />
              )}
              <div className="flex-1 flex items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="project-cover-upload"
                  disabled={uploadingImage}
                />
                <label 
                  htmlFor="project-cover-upload"
                  className={`flex-1 flex items-center justify-center gap-2 border border-dashed border-white/20 hover:border-purple-500/50 hover:bg-purple-500/10 rounded-xl px-4 py-3 text-sm text-gray-400 hover:text-white transition-colors cursor-pointer ${uploadingImage ? 'opacity-50' : ''}`}
                >
                  <Icon icon={uploadingImage ? 'lucide:loader-2' : 'lucide:image-plus'} className={uploadingImage ? 'animate-spin' : ''} />
                  {uploadingImage ? 'Uploading...' : formData.coverImage ? 'Change Image' : 'Upload Cover Image'}
                </label>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Gallery Image URLs (comma separated)</label>
            <textarea
              rows={2}
              value={imagesText}
              onChange={e => setImagesText(e.target.value)}
              className="w-full bg-gray-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-purple-500/50 transition-colors resize-none"
              placeholder="https://img1.png, https://img2.png"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">GitHub Link</label>
              <input
                type="text"
                value={formData.githubLink}
                onChange={e => setFormData({ ...formData, githubLink: e.target.value })}
                className="w-full bg-gray-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-purple-500/50 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Live URL / Drive Link</label>
              <input
                type="text"
                value={formData.liveUrl || ''}
                onChange={e => setFormData({ ...formData, liveUrl: e.target.value })}
                className="w-full bg-gray-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-purple-500/50 transition-colors"
              />
            </div>
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