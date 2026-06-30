import { useState } from 'react'
import { useCollection } from '../../hooks/useCollection'
import type { Artwork } from '../../types'
import AdminTable, { type Column } from '../../components/admin/components/AdminTable'
import AdminModal from '../../components/admin/modals/AdminModal'
import { useToast } from '../../components/admin/components/AdminToast'
import { uploadImage } from '../../services/storage'
import { Icon } from '@iconify/react'

const defaultFormData: Omit<Artwork, 'id' | 'createdAt' | 'updatedAt'> = {
  title: '',
  medium: '',
  image: ''
}

export default function AdminArtPage() {
  const { items, loading, addItem, updateItem, removeItem } = useCollection<Artwork>('artworks')
  const { addToast } = useToast()
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState(defaultFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [uploadingImage, setUploadingImage] = useState(false)

  const columns: Column<Artwork>[] = [
    { 
      key: 'image', 
      label: 'Image',
      render: (val) => val ? <img src={val} alt="artwork" className="w-12 h-12 object-cover rounded-md" /> : null,
      sortable: false
    },
    { key: 'title', label: 'Title' },
    { key: 'medium', label: 'Medium' }
  ]

  const handleAdd = () => {
    setEditingId(null)
    setFormData(defaultFormData)
    setIsModalOpen(true)
  }

  const handleEdit = (item: Artwork & { id: string }) => {
    setEditingId(item.id)
    setFormData({
      title: item.title || '',
      medium: item.medium || '',
      image: item.image || ''
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (item: Artwork & { id: string }) => {
    try {
      await removeItem(item.id)
      addToast('Artwork deleted successfully', 'success')
    } catch (err: any) {
      addToast(err.message || 'Failed to delete', 'error')
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingImage(true)
    try {
      const stored = await uploadImage(file, `art_${Date.now()}_${file.name}`)
      setFormData(prev => ({ ...prev, image: stored.url }))
      addToast('Image uploaded', 'success')
    } catch (err: any) {
      addToast(err.message || 'Image upload failed', 'error')
    } finally {
      setUploadingImage(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      if (editingId) {
        await updateItem(editingId, formData)
        addToast('Artwork updated successfully', 'success')
      } else {
        await addItem(formData)
        addToast('Artwork added successfully', 'success')
      }
      setIsModalOpen(false)
    } catch (err: any) {
      addToast(err.message || 'Failed to save', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = formData.title.trim() && formData.image.trim()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-white">Artworks</h1>
      </div>

      <AdminTable
        columns={columns}
        data={items}
        loading={loading}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        defaultSortKey="title"
      />

      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Edit Artwork' : 'Add Artwork'}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Image Upload <span className="text-red-500">*</span></label>
            <div className="flex items-center gap-4">
              {formData.image && (
                <img src={formData.image} alt="preview" className="w-20 h-20 object-cover rounded-lg border border-white/10" />
              )}
              <div className="flex flex-col gap-2 flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="art-image-upload"
                  disabled={uploadingImage}
                />
                <label 
                  htmlFor="art-image-upload"
                  className={`flex items-center justify-center gap-2 border border-white/20 rounded-xl px-4 py-3 text-sm cursor-pointer transition-colors ${uploadingImage ? 'opacity-50' : 'hover:bg-white/5'}`}
                >
                  <Icon icon={uploadingImage ? 'lucide:loader-2' : 'lucide:upload'} className={uploadingImage ? 'animate-spin' : ''} />
                  {uploadingImage ? 'Uploading...' : 'Choose Image'}
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={e => setFormData({ ...formData, image: e.target.value })}
                  placeholder="Or paste image URL directly..."
                  className="w-full bg-gray-900 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-purple-500/50 transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 mt-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Title <span className="text-red-500">*</span></label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-gray-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-purple-500/50 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Medium</label>
            <input
              type="text"
              value={formData.medium}
              onChange={e => setFormData({ ...formData, medium: e.target.value })}
              className="w-full bg-gray-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-purple-500/50 transition-colors"
              placeholder="e.g. Digital Art, Oil on Canvas"
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
              disabled={!isFormValid || isSubmitting || uploadingImage}
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