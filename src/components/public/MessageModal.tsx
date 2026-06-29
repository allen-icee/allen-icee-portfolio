import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@iconify/react'

interface MessageModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function MessageModal({ isOpen, onClose }: MessageModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  
  const [isSending, setIsSending] = useState(false)
  const [isSent, setIsSent] = useState(false)

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Reset form when closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setIsSent(false)
        setFormData({ name: '', email: '', subject: '', message: '' })
      }, 300)
    }
  }, [isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSending(true)
    // Simulate sending
    setTimeout(() => {
      setIsSending(false)
      setIsSent(true)
      setTimeout(() => {
        onClose()
      }, 2000)
    }, 1000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0F0D12]/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-lg overflow-hidden rounded-md bg-[#FDFBF7] dark:bg-[#1A181C] shadow-[0_20px_50px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-charcoal/10 dark:border-white/10"
          >
            {/* Museum/Archive Header */}
            <div className="flex items-center justify-between border-b border-charcoal/10 dark:border-white/10 bg-[#EAE5D9]/50 dark:bg-white/5 px-6 py-4">
              <div className="flex items-center gap-3">
                <Icon icon="lucide:mail-plus" className="size-5 text-charcoal/60 dark:text-white/60" />
                <h3 className="font-serif text-lg font-medium text-charcoal dark:text-white/90">Send a Message</h3>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-1.5 text-charcoal/50 hover:bg-charcoal/5 hover:text-charcoal dark:text-white/50 dark:hover:bg-white/10 dark:hover:text-white transition-colors"
              >
                <Icon icon="lucide:x" className="size-5" />
              </button>
            </div>

            <div className="p-6 md:p-8">
              {isSent ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="mb-6 flex size-16 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400">
                    <Icon icon="lucide:check" className="size-8" />
                  </div>
                  <h4 className="mb-2 font-serif text-2xl text-charcoal dark:text-white/90">Message Sent</h4>
                  <p className="font-sans text-sm text-charcoal/60 dark:text-white/60">
                    Thank you. I'll review it and get back to you shortly.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="name" className="font-sans text-[10px] uppercase tracking-widest text-charcoal/60 dark:text-white/60">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full rounded-sm border border-charcoal/10 bg-transparent px-3 py-2 font-serif text-sm text-charcoal outline-none focus:border-purple-brand dark:border-white/10 dark:text-white dark:focus:border-purple-brand-light transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="font-sans text-[10px] uppercase tracking-widest text-charcoal/60 dark:text-white/60">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full rounded-sm border border-charcoal/10 bg-transparent px-3 py-2 font-serif text-sm text-charcoal outline-none focus:border-purple-brand dark:border-white/10 dark:text-white dark:focus:border-purple-brand-light transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="subject" className="font-sans text-[10px] uppercase tracking-widest text-charcoal/60 dark:text-white/60">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full rounded-sm border border-charcoal/10 bg-transparent px-3 py-2 font-serif text-sm text-charcoal outline-none focus:border-purple-brand dark:border-white/10 dark:text-white dark:focus:border-purple-brand-light transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="font-sans text-[10px] uppercase tracking-widest text-charcoal/60 dark:text-white/60">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full resize-none rounded-sm border border-charcoal/10 bg-transparent px-3 py-2 font-serif text-sm text-charcoal outline-none focus:border-purple-brand dark:border-white/10 dark:text-white dark:focus:border-purple-brand-light transition-colors"
                    />
                  </div>

                  <div className="mt-4 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="rounded-sm px-4 py-2 font-sans text-xs font-medium uppercase tracking-wider text-charcoal/70 hover:bg-charcoal/5 dark:text-white/70 dark:hover:bg-white/5 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSending}
                      className="inline-flex items-center gap-2 rounded-sm bg-purple-brand px-6 py-2 font-sans text-xs font-medium uppercase tracking-wider text-white transition-colors hover:bg-purple-brand/90 disabled:opacity-70 dark:bg-purple-brand/80 dark:hover:bg-purple-brand"
                    >
                      {isSending ? (
                        <>
                          <Icon icon="lucide:loader-2" className="size-4 animate-spin" />
                          Sending
                        </>
                      ) : (
                        <>
                          <Icon icon="lucide:send" className="size-4" />
                          Send
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
