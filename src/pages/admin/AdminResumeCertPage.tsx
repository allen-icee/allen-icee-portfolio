import { useState } from 'react'
import { useCollection } from '../../hooks/useCollection'
import type { Certificate } from '../../types'
import AdminTable, { type Column } from '../../components/admin/components/AdminTable'
import AdminModal from '../../components/admin/modals/AdminModal'
import { useToast } from '../../components/admin/components/AdminToast'
import { uploadImage } from '../../services/storage'
import { Icon } from '@iconify/react'
import { useEffect } from 'react'
import { ref, getDownloadURL } from 'firebase/storage'
import { storage } from '../../services/firebaseConfig'

const defaultFormData: Omit<Certificate, 'id' | 'createdAt' | 'updatedAt'> = {
  title: '',
  issuer: '',
  date: '',
  credentialId: '',
  category: '',
  verificationUrl: '',
  image: ''
}

export default function AdminResumeCertPage() {
  const { items, loading, addItem, updateItem, removeItem } = useCollection<Certificate>('certificates')
  const { addToast } = useToast()
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState(defaultFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [uploadingResume, setUploadingResume] = useState(false)
  const [currentResumeUrl, setCurrentResumeUrl] = useState<string | null>(null)

  useEffect(() => {
    getDownloadURL(ref(storage, 'images/resume.pdf'))
      .then(url => setCurrentResumeUrl(url))
      .catch(() => setCurrentResumeUrl(null)) // Usually means it doesn't exist yet
  }, [])

  const columns: Column<Certificate>[] = [
    { 
      key: 'image', 
      label: 'Image',
      render: (val) => val ? <img src={val} alt="cert" className="w-12 h-8 object-cover rounded" /> : null,
      sortable: false
    },
    { key: 'title', label: 'Title' },
    { key: 'issuer', label: 'Issuer' },
    { key: 'date', label: 'Date' }
  ]

  const handleAdd = () => {
    setEditingId(null)
    setFormData(defaultFormData)
    setIsModalOpen(true)
  }

  const handleEdit = (item: Certificate & { id: string }) => {
    setEditingId(item.id)
    setFormData({
      title: item.title,
      issuer: item.issuer,
      date: item.date,
      credentialId: item.credentialId,
      category: item.category,
      verificationUrl: item.verificationUrl,
      image: item.image
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (item: Certificate & { id: string }) => {
    try {
      await removeItem(item.id)
      addToast('Certificate deleted successfully', 'success')
    } catch (err: any) {
      addToast(err.message, 'error')
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingImage(true)
    try {
      const stored = await uploadImage(file, `cert_${Date.now()}_${file.name}`)
      setFormData(prev => ({ ...prev, image: stored.url }))
      addToast('Image uploaded', 'success')
    } catch (err: any) {
      addToast(err.message, 'error')
    } finally {
      setUploadingImage(false)
    }
  }

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingResume(true)
    try {
      await uploadImage(file, `resume.pdf`)
      addToast('Resume uploaded and updated successfully', 'success')
    } catch (err: any) {
      addToast(err.message, 'error')
    } finally {
      setUploadingResume(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      if (editingId) await updateItem(editingId, formData)
      else await addItem(formData)
      addToast(`Certificate ${editingId ? 'updated' : 'added'} successfully`, 'success')
      setIsModalOpen(false)
    } catch (err: any) {
      addToast(err.message, 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = formData.title.trim() && formData.issuer.trim() && formData.date.trim() && formData.image.trim()

  return (
    <div className="flex flex-col gap-8">
      {/* Resume Section */}
      <div className="bg-gray-900/50 border border-white/10 rounded-2xl p-6">
        <h2 className="text-lg font-bold text-white mb-4">Resume Document</h2>
        <div className="flex items-center gap-4">
          <input
            type="file"
            accept="application/pdf"
            onChange={handleResumeUpload}
            className="hidden"
            id="resume-upload"
            disabled={uploadingResume}
          />
          <label 
            htmlFor="resume-upload"
            className={`flex items-center justify-center gap-2 border border-purple-500/30 bg-purple-600/10 text-purple-400 hover:bg-purple-600/20 rounded-xl px-6 py-3 font-medium cursor-pointer transition-colors ${uploadingResume ? 'opacity-50' : ''}`}
          >
            <Icon icon={uploadingResume ? 'lucide:loader-2' : 'lucide:file-text'} className={uploadingResume ? 'animate-spin' : ''} />
            {uploadingResume ? 'Uploading Resume...' : 'Upload New Resume (PDF)'}
          </label>
        </div>
        
        <div className="mt-4 text-sm flex items-center justify-between">
          <p className="text-gray-400">This will overwrite the existing resume.pdf in storage.</p>
          {currentResumeUrl && (
            <a 
              href={currentResumeUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 flex items-center gap-1 font-medium"
            >
              <Icon icon="lucide:external-link" />
              View Current Resume
            </a>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight text-white">Certificates</h1>
        </div>

        <AdminTable
          columns={columns}
          data={items}
          loading={loading}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
          defaultSortKey="date"
        />
      </div>

      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Edit Certificate' : 'Add Certificate'}
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
                  id="cert-image-upload"
                  disabled={uploadingImage}
                />
                <label 
                  htmlFor="cert-image-upload"
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
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
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Issuer <span className="text-red-500">*</span></label>
              <input
                type="text"
                required
                value={formData.issuer}
                onChange={e => setFormData({ ...formData, issuer: e.target.value })}
                className="w-full bg-gray-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-purple-500/50 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Date (Month Year) <span className="text-red-500">*</span></label>
              <input
                type="text"
                required
                value={formData.date}
                onChange={e => setFormData({ ...formData, date: e.target.value })}
                className="w-full bg-gray-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-purple-500/50 transition-colors"
                placeholder="e.g. October 2023"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Category</label>
              <input
                type="text"
                value={formData.category || ''}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-gray-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-purple-500/50 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Credential ID</label>
              <input
                type="text"
                value={formData.credentialId || ''}
                onChange={e => setFormData({ ...formData, credentialId: e.target.value })}
                className="w-full bg-gray-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-purple-500/50 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Verification URL</label>
              <input
                type="text"
                value={formData.verificationUrl || ''}
                onChange={e => setFormData({ ...formData, verificationUrl: e.target.value })}
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
