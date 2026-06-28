import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { Icon } from '@iconify/react'
import { ThemeToggle } from './ThemeToggle'
import { SearchButton } from './SearchButton'

interface MobileMenuProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  items: { id: string; label: string }[]
  activeId: string
  onNavigate: (id: string) => void
}

const menuVariants: Variants = {
  closed: { y: '-120%', opacity: 0 },
  open: { 
    y: 0, 
    opacity: 1,
    transition: { type: 'spring', damping: 25, stiffness: 200, staggerChildren: 0.05, delayChildren: 0.1 }
  },
  exit: { y: '-120%', opacity: 0, transition: { duration: 0.3, ease: 'easeInOut' } }
}

const itemVariants: Variants = {
  closed: { opacity: 0, y: -10 },
  open: { opacity: 1, y: 0 }
}

export function MobileMenu({ isOpen, setIsOpen, items, activeId, onNavigate }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm dark:bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            aria-hidden
          />

          {/* Notebook Dropdown */}
          <motion.div
            className="paper-texture fixed inset-x-4 top-4 z-50 overflow-hidden rounded-2xl bg-warm-paper shadow-2xl dark:bg-surface"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="exit"
            role="dialog"
            aria-label="Mobile Navigation"
            aria-modal="true"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-charcoal/10 px-6 py-5 dark:border-white/10">
              <span className="font-serif text-lg font-bold tracking-widest text-charcoal/80 dark:text-white/80">
                ❀ Ice
              </span>
              <div className="flex items-center gap-2">
                <SearchButton />
                <ThemeToggle />
                <span className="h-6 w-px bg-charcoal/10 dark:bg-white/10" aria-hidden />
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex size-10 items-center justify-center rounded-full bg-black/5 text-charcoal/60 transition-colors hover:bg-black/10 hover:text-charcoal dark:bg-white/5 dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white"
                  aria-label="Close menu"
                >
                  <Icon icon="lucide:x" className="size-5" />
                </button>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col p-4" aria-label="Main menu">
              {items.map((item) => {
                const isActive = activeId === item.id
                return (
                  <motion.button
                    key={item.id}
                    variants={itemVariants}
                    onClick={() => onNavigate(item.id)}
                    className={`relative flex w-full items-center justify-between rounded-xl px-5 py-4 text-left font-serif text-lg transition-colors outline-none focus-visible:ring-2 focus-visible:ring-lavender ${
                      isActive
                        ? 'bg-lavender/10 text-charcoal dark:bg-purple-brand/20 dark:text-white'
                        : 'text-charcoal/70 hover:bg-black/5 hover:text-charcoal dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <Icon icon="lucide:bookmark" className="size-5 text-lavender dark:text-purple-brand/60" fill="currentColor" />
                    )}
                  </motion.button>
                )
              })}
            </nav>
            
            {/* Bottom decoration mimicking notebook binding */}
            <div className="h-4 w-full bg-black/5 dark:bg-white/5" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
