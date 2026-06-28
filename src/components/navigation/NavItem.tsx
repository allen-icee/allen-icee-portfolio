import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'

interface NavItemProps {
  id: string
  label: string
  isActive: boolean
  onClick: (id: string) => void
}

export function NavItem({ id, label, isActive, onClick }: NavItemProps) {
  return (
    <motion.button
      onClick={() => onClick(id)}
      className={`group relative px-4 py-2 font-serif text-sm transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-lavender/50 rounded-lg ${
        isActive
          ? 'text-charcoal dark:text-white'
          : 'text-charcoal/60 hover:text-charcoal dark:text-white/60 dark:hover:text-white'
      }`}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      aria-current={isActive ? 'page' : undefined}
    >
      {/* The text label */}
      <span className="relative z-10">{label}</span>

      {/* Hover underline (Expands from center) */}
      {!isActive && (
        <span className="absolute bottom-1.5 left-4 right-4 block h-[1px] origin-center scale-x-0 bg-lavender opacity-0 transition-all duration-300 group-hover:scale-x-100 group-hover:opacity-60 dark:bg-purple-brand/50" />
      )}
      
      {/* Active Indicator (Shared Layout ID for smooth gliding) */}
      {isActive && (
        <motion.div
          layoutId="activeNavIndicator"
          className="absolute inset-x-4 -bottom-1 flex flex-col items-center justify-end"
          initial={false}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 30,
          }}
        >
          {/* Soft lavender underline */}
          <div className="h-[2px] w-full rounded-t-sm bg-lavender dark:bg-purple-brand/60" />
          
          {/* Tiny bookmark indicator hanging below */}
          <Icon 
            icon="lucide:bookmark" 
            className="absolute top-[2px] size-2.5 text-lavender drop-shadow-sm dark:text-purple-brand/60" 
            fill="currentColor"
          />
        </motion.div>
      )}
    </motion.button>
  )
}
