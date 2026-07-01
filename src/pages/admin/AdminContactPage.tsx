import { useState, useEffect } from 'react'
import { useCollection } from '../../hooks/useCollection'
import type { ContactInfo } from '../../types'
import { useToast } from '../../components/admin/components/AdminToast'
import { Icon } from '@iconify/react'

const defaultFormData: Omit<ContactInfo, 'id' | 'createdAt' | 'updatedAt'> = {
  email: '',
  github: '',
  linkedin: '',
  facebook: '',
  instagram: ''
}

export default function AdminContactPage() {
  const { items, loading, addItem, updateItem } = useCollection<ContactInfo>('contactInfo')
  const { addToast } = useToast()
  
  const [formData, setFormData] = useState(defaultFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const existingDoc = items[0]

  useEffect(() => {
    if (existingDoc) {
      setFormData({
        email: existingDoc.email || '',
        github: existingDoc.github || '',
        linkedin: existingDoc.linkedin || '',
        facebook: existingDoc.facebook || '',
        instagram: existingDoc.instagram || ''
      })
    }
  }, [existingDoc])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      if (existingDoc) {
        await updateItem(existingDoc.id, formData)
        addToast('Contact info updated successfully', 'success')
      } else {
        await addItem(formData)
        addToast('Contact info created successfully', 'success')
      }
    } catch (err: any) {
      addToast(err.message, 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = formData.email.trim() !== ''

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-white/40">
        <Icon icon="lucide:loader-circle" className="size-6 animate-spin mr-3" />
        Loading...
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-white">Contact Information</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 bg-gray-900/50 border border-white/10 rounded-2xl p-6">
        <div className="grid grid-cols-1 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Email Address <span className="text-red-500">*</span></label>
            <div className="relative">
              <Icon icon="lucide:mail" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-purple-500/50 transition-colors"
                placeholder="your.email@example.com"
              />
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-white/5 my-2" />

        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Social Links</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">GitHub</label>
            <div className="relative">
              <Icon icon="lucide:github" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input
                type="url"
                value={formData.github}
                onChange={e => setFormData({ ...formData, github: e.target.value })}
                className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-purple-500/50 transition-colors"
                placeholder="https://github.com/yourusername"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">LinkedIn</label>
            <div className="relative">
              <Icon icon="lucide:linkedin" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input
                type="url"
                value={formData.linkedin}
                onChange={e => setFormData({ ...formData, linkedin: e.target.value })}
                className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-purple-500/50 transition-colors"
                placeholder="https://linkedin.com/in/yourusername"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Facebook</label>
            <div className="relative">
              <Icon icon="lucide:facebook" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input
                type="url"
                value={formData.facebook}
                onChange={e => setFormData({ ...formData, facebook: e.target.value })}
                className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-purple-500/50 transition-colors"
                placeholder="https://facebook.com/yourusername"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Instagram</label>
            <div className="relative">
              <Icon icon="lucide:instagram" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input
                type="url"
                value={formData.instagram}
                onChange={e => setFormData({ ...formData, instagram: e.target.value })}
                className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-purple-500/50 transition-colors"
                placeholder="https://instagram.com/yourusername"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-4 pt-6 border-t border-white/10">
          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className="px-8 py-2.5 text-sm font-medium bg-purple-600 hover:bg-purple-500 disabled:bg-gray-800 disabled:text-gray-500 text-white rounded-xl transition-colors flex items-center gap-2"
          >
            {isSubmitting ? (
              <><Icon icon="lucide:loader-2" className="animate-spin w-4 h-4" /> Saving...</>
            ) : (
              <><Icon icon="lucide:save" className="w-4 h-4" /> Save Changes</>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
