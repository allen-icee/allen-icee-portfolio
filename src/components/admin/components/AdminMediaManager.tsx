// src/components/admin/components/AdminMediaManager.tsx
import { useState, useRef, type DragEvent } from 'react'
import { Icon } from '@iconify/react'
import { compressImage } from '../../../utils/compressImage'
import { uploadImage, listImages, deleteImage, type StoredImage } from '../../../services/storage'

interface UploadingFile {
  name: string
  progress: number
}

export default function AdminMediaManager() {
  const [images, setImages] = useState<StoredImage[]>([])
  const [uploading, setUploading] = useState<UploadingFile[]>([])
  const [loading, setLoading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  async function load() {
    setLoading(true)
    try {
      const items = await listImages()
      setImages(items)
    } catch {

    } finally {
      setLoading(false)
    }
  }

  useState(() => { load() })

  async function handleFiles(files: FileList) {
    const fileArray = Array.from(files).filter((f) => f.type.startsWith('image/'))
    if (fileArray.length === 0) return

    for (const file of fileArray) {
      setUploading((prev) => [...prev, { name: file.name, progress: 0 }])

      try {
        const compressed = await compressImage(file)
        setUploading((prev) =>
          prev.map((u) => (u.name === file.name ? { ...u, progress: 50 } : u))
        )

        const stored = await uploadImage(compressed.blob, compressed.fileName, (pct: any) => {
          setUploading((prev) =>
            prev.map((u) => (u.name === file.name ? { ...u, progress: pct } : u))
          )
        })

        setImages((prev) => [stored, ...prev])
      } catch (err) {
        console.error('Upload failed:', file.name, err)
      } finally {
        setUploading((prev) => prev.filter((u) => u.name !== file.name))
      }
    }
  }

  async function handleDelete(image: StoredImage) {
    try {
      await deleteImage(image.fullPath)
      setImages((prev) => prev.filter((i) => i.fullPath !== image.fullPath))
    } catch (err) {
      console.error('Delete failed:', image.name, err)
    }
  }

  function handleDragOver(e: DragEvent) {
    e.preventDefault()
    setDragOver(true)
  }

  function handleDragLeave() {
    setDragOver(false)
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault()
    setDragOver(false)
    if (e.dataTransfer.files) handleFiles(e.dataTransfer.files)
  }

  async function copyUrl(url: string) {
    try {
      await navigator.clipboard.writeText(url)
    } catch {

    }
  }

  return (
    <div>
      <h1 className="mb-6 text-lg font-medium text-white">Media Manager</h1>

      <div
        className={`mb-6 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-10 transition-colors ${
          dragOver
            ? 'border-purple-brand/50 bg-purple-brand/10'
            : 'border-white/[0.08] bg-white/[0.02] hover:border-white/[0.15]'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <Icon icon="lucide:cloud-upload" className="mb-3 size-8 text-white/30" />
        <p className="text-sm text-white/50">Drop images here or click to browse</p>
        <p className="mt-1 text-[10px] text-white/20">Auto-compressed to 1920px · JPEG</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />
      </div>

      {uploading.length > 0 && (
        <div className="mb-6 space-y-2">
          {uploading.map((u) => (
            <div key={u.name} className="flex items-center gap-3 rounded-xl bg-white/[0.03] px-4 py-2.5">
              <Icon icon="lucide:loader-circle" className="size-4 animate-spin text-white/40" />
              <p className="flex-1 truncate text-xs text-white/50">{u.name}</p>
              <div className="h-1.5 w-24 overflow-hidden rounded-full bg-white/[0.06]">
                <span
                  className="block h-full rounded-full bg-purple-brand transition-all"
                  style={{ width: `${u.progress}%` }}
                />
              </div>
              <span className="text-[10px] text-white/30">{u.progress}%</span>
            </div>
          ))}
        </div>
      )}

      {loading ? (
        <div className="flex items-center gap-3 py-12 text-sm text-white/40">
          <Icon icon="lucide:loader-circle" className="size-4 animate-spin" />
          Loading…
        </div>
      ) : images.length === 0 ? (
        <p className="py-12 text-center text-sm text-white/30">No images yet.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {images.map((img) => (
            <div key={img.fullPath} className="group relative overflow-hidden rounded-xl bg-white/[0.03]">
              <img
                src={img.url}
                alt={img.name}
                className="aspect-square w-full object-cover"
              />
              <div className="absolute inset-0 flex items-end gap-1 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  onClick={() => copyUrl(img.url)}
                  className="rounded-lg bg-white/20 p-1.5 backdrop-blur-sm transition-colors hover:bg-white/30"
                  aria-label="Copy URL"
                >
                  <Icon icon="lucide:link" className="size-3 text-white" />
                </button>
                <button
                  onClick={() => handleDelete(img)}
                  className="rounded-lg bg-red-500/30 p-1.5 backdrop-blur-sm transition-colors hover:bg-red-500/50"
                  aria-label="Delete"
                >
                  <Icon icon="lucide:trash-2" className="size-3 text-white" />
                </button>
              </div>
              <p className="truncate px-2 py-1 text-[10px] text-white/30">{img.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}