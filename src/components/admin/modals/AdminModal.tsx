import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@iconify/react'

interface AdminModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export default function AdminModal({ isOpen, onClose, title, children }: AdminModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="w-full max-w-2xl bg-gray-950 border border-white/10 rounded-2xl shadow-2xl overflow-hidden text-gray-200 my-auto"
          >
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <h2 className="text-xl font-bold text-white tracking-tight">{title}</h2>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <Icon icon="lucide:x" className="w-5 h-5 opacity-60" />
              </button>
            </div>
            <div className="p-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
