import { useState, useEffect, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@iconify/react'

interface Field {
  key: string
  label: string
  type?: 'text' | 'textarea' | 'number' | 'select' | 'url'
  options?: { label: string; value: string }[]
  placeholder?: string
  required?: boolean
}

interface AdminFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: Record<string, unknown>) => Promise<void>
  fields: Field[]
  initialData?: Record<string, unknown> | null
  title: string
}

export default function AdminFormModal({
  isOpen,
  onClose,
  onSubmit,
  fields,
  initialData,
  title,
}: AdminFormModalProps) {
  const [form, setForm] = useState<Record<string, unknown>>({})
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isOpen) {
      const initial: Record<string, unknown> = {}
      for (const f of fields) {
        initial[String(f.key)] = initialData?.[f.key] ?? ''
      }
      setForm(initial)
      setError('')
    }
  }, [isOpen, fields, initialData])

  function setValue(key: string, value: unknown) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      await onSubmit(form)
      onClose()
    } catch (err: unknown) {
      setError((err as Error).message ?? 'Failed to save.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className="relative w-full max-w-lg rounded-2xl border border-white/[0.08] bg-gray-900/95 p-6 shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-base font-medium text-white">{title}</h2>
              <button
                onClick={onClose}
                className="flex size-7 items-center justify-center rounded-lg text-white/30 transition-colors hover:bg-white/[0.06] hover:text-white/60"
                aria-label="Close"
              >
                <Icon icon="lucide:x" className="size-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {fields.map((field) => (
                <div key={String(field.key)} className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-white/50">
                    {field.label}
                    {field.required && <span className="text-red-400"> *</span>}
                  </label>

                  {field.type === 'textarea' ? (
                    <textarea
                      value={String(form[String(field.key)] ?? '')}
                      onChange={(e) => setValue(String(field.key), e.target.value)}
                      placeholder={field.placeholder}
                      required={field.required}
                      rows={4}
                      className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-3.5 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-purple-brand/50 focus:ring-1 focus:ring-purple-brand/30"
                    />
                  ) : field.type === 'select' && field.options ? (
                    <select
                      value={String(form[String(field.key)] ?? '')}
                      onChange={(e) => setValue(String(field.key), e.target.value)}
                      required={field.required}
                      className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-3.5 py-2.5 text-sm text-white outline-none transition-colors focus:border-purple-brand/50 focus:ring-1 focus:ring-purple-brand/30"
                    >
                      <option value="" className="bg-gray-900">Select…</option>
                      {field.options.map((opt) => (
                        <option key={opt.value} value={opt.value} className="bg-gray-900">
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type === 'number' ? 'number' : 'text'}
                      value={String(form[String(field.key)] ?? '')}
                      onChange={(e) =>
                        setValue(
                          String(field.key),
                          field.type === 'number' ? Number(e.target.value) : e.target.value
                        )
                      }
                      placeholder={field.placeholder}
                      required={field.required}
                      className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-3.5 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-purple-brand/50 focus:ring-1 focus:ring-purple-brand/30"
                    />
                  )}
                </div>
              ))}

              {error && (
                <p className="text-sm text-red-400" role="alert">{error}</p>
              )}

              <div className="mt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl px-4 py-2 text-xs font-medium text-white/50 transition-colors hover:bg-white/[0.06] hover:text-white/70"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-xl bg-purple-brand/80 px-5 py-2 text-xs font-medium text-white transition-colors hover:bg-purple-brand disabled:opacity-50"
                >
                  {submitting ? 'Saving…' : 'Save'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
