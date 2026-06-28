import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'

interface BookmarkButtonProps {
  onClick?: () => void
  className?: string
}

export default function BookmarkButton({ onClick, className = '' }: BookmarkButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`group relative flex items-center gap-3 px-7 py-3.5 bg-[#FAF9F6] dark:bg-[#2A2A2D] text-charcoal/90 dark:text-white/90 font-serif text-lg tracking-wide shadow-[2px_6px_15px_rgba(0,0,0,0.06)] dark:shadow-[2px_6px_15px_rgba(0,0,0,0.4)] transition-colors hover:bg-white dark:hover:bg-[#343438] ${className}`}
      style={{
        borderTopRightRadius: '4px',
        borderBottomRightRadius: '24px',
        borderTopLeftRadius: '4px',
        borderBottomLeftRadius: '4px',
      }}
      whileHover={{ y: -2, x: 2 }}
      whileTap={{ y: 1, x: 0 }}
    >
      {/* Small ribbon strip on the left edge */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-purple-brand/50 rounded-l-md transition-colors group-hover:bg-purple-brand/70" />
      
      <Icon icon="lucide:book-open" className="size-5 text-purple-brand/70 transition-transform group-hover:-rotate-12" />
      <span>Open Library</span>
    </motion.button>
  )
}
