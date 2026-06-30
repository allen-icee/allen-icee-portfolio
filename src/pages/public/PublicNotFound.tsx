// src/pages/public/PublicNotFound.tsx
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import CompButton from '../../components/ui/CompButton'

export default function PublicNotFound() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Icon icon="lucide:book-x" className="mx-auto size-16 text-charcoal/15" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
      >
        <h1
          className="text-4xl font-light text-charcoal"
          style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
        >
          Page Not Found
        </h1>
        <p className="mt-3 text-sm text-charcoal/50">
          This page seems to have been checked out by another reader.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.35 }}
      >
        <CompButton
          onClick={() => navigate('/')}
          className="cursor-pointer rounded-xl bg-purple-brand px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-purple-brand/20 transition-all hover:bg-purple-brand/90 active:scale-[0.97]"
        >
          Back to the Library
        </CompButton>
      </motion.div>
    </div>
  )
}