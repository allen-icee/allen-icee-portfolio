// src/components/navigation/NavItem.tsx
import { motion } from 'framer-motion'


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

      <span className="relative z-10">{label}</span>

      {isActive && (
        <motion.div
          layoutId="activeNavIndicator"
          className="absolute inset-0 rounded-lg bg-charcoal/5 dark:bg-white/10"
          initial={false}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 30,
          }}
        />
      )}
    </motion.button>
  )
}