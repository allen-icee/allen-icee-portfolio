// src/components/navigation/MobileMenu.tsx
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@iconify/react'

interface MobileMenuProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  items: { id: string; label: string }[]
  activeId: string
  onNavigate: (id: string) => void
}

const ICON_MAP: Record<string, string> = {
  home: 'pixelarticons:home',
  about: 'pixelarticons:user',
  experience: 'pixelarticons:briefcase',
  projects: 'pixelarticons:folder',
  art: 'pixelarticons:image',
  skills: 'pixelarticons:zap',
  resume: 'lucide:file-text',
  contact: 'pixelarticons:mail',
}

export function MobileMenu({ isOpen, setIsOpen, items, activeId, onNavigate }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>

          <motion.div
            key="backdrop"
            className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm dark:bg-black/50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            aria-hidden
          />

          <motion.div
            key="sidebar"
            className="fixed left-0 top-0 bottom-0 z-30 flex w-24 flex-col items-center border-r border-charcoal/10 bg-warm-paper/60 backdrop-blur-xl pt-[6.5rem] pb-8 shadow-2xl dark:border-white/10 dark:bg-surface/60 md:hidden"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            role="navigation"
            aria-label="Mobile Sidebar"
          >
            <div className="flex w-full flex-col items-center gap-4 overflow-y-auto px-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {items.map((item) => {
                const isActive = activeId === item.id
                const iconName = ICON_MAP[item.id] || 'pixelarticons:circle'

                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`relative flex size-12 shrink-0 items-center justify-center rounded-2xl transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-lavender ${isActive
                      ? 'bg-lavender text-charcoal shadow-sm dark:bg-purple-brand dark:text-white scale-110'
                      : 'text-charcoal/60 hover:bg-black/5 hover:text-charcoal dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white'
                      }`}
                    aria-label={`Navigate to ${item.label}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon icon={iconName} className="size-6" />
                  </button>
                )
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}