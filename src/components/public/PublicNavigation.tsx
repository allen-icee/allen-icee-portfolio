import { useState, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@iconify/react'
import type Lenis from 'lenis'
import { ThemeContext } from '../../context/ThemeContext'

interface NavItem {
  id: string
  label: string
}

const items: NavItem[] = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'art', label: 'Art' },
  { id: 'resume', label: 'Resume' },
]

function scrollToSection(id: string) {
  const target = document.getElementById(id)
  if (!target) return
  const lenis = (window as unknown as Record<string, Lenis | undefined>).__LENIS__
  if (lenis) {
    lenis.scrollTo(target)
  } else {
    target.scrollIntoView({ behavior: 'smooth' })
  }
}

const labelVariants = {
  idle: { opacity: 0, x: 10, width: 0 },
  hover: { opacity: 1, x: 0, width: 'auto' },
}

const drawerVariants = {
  closed: { x: '100%' },
  open: { x: 0 },
}

export default function PublicNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, toggleTheme } = useContext(ThemeContext)

  function handleNav(id: string) {
    setIsOpen(false)
    scrollToSection(id)
  }

  return (
    <>
      {/* ===== Desktop side nav (unchanged) ===== */}
      <nav
        className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-5 md:flex"
        aria-label="Section navigation"
      >
        <span className="h-10 w-px bg-lavender/30" aria-hidden />

        {items.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className="group flex items-center gap-3 outline-none"
            initial="idle"
            whileHover="hover"
            aria-label={`Scroll to ${item.label}`}
          >
            <motion.span
              className="block size-2.5 rounded-full bg-lavender transition-colors group-focus-visible:ring-2 group-focus-visible:ring-purple-brand/50"
              variants={{
                idle: { scale: 1 },
                hover: { scale: 1.6, backgroundColor: 'rgb(107, 76, 154)' },
              }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            />
            <motion.span
              className="overflow-hidden whitespace-nowrap text-xs font-medium text-charcoal/60"
              variants={labelVariants}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              {item.label}
            </motion.span>
          </motion.button>
        ))}

        <span className="h-10 w-px bg-lavender/30" aria-hidden />
      </nav>

      {/* ===== Mobile bookmark trigger ===== */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed right-4 top-4 z-50 flex size-10 items-center justify-center rounded-xl bg-white/70 shadow-md backdrop-blur-md transition-colors hover:bg-white/90 md:hidden dark:bg-white/10 dark:hover:bg-white/20"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open navigation"
      >
        <Icon icon="lucide:bookmark" className="size-4 text-charcoal dark:text-lavender" />
      </motion.button>

      {/* ===== Mobile drawer overlay ===== */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              className="paper-texture fixed inset-y-0 right-0 z-50 flex w-72 flex-col bg-warm-paper shadow-2xl md:hidden dark:bg-surface"
              variants={drawerVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            >
              {/* Close button */}
              <div className="flex items-center justify-between px-5 pt-5 pb-3">
                <span
                  className="text-xs tracking-widest uppercase text-charcoal/30"
                  style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                >
                  Library
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex size-8 items-center justify-center rounded-lg text-charcoal/40 transition-colors hover:bg-black/5 hover:text-charcoal/70 dark:hover:bg-white/[0.06]"
                  aria-label="Close navigation"
                >
                  <Icon icon="lucide:x" className="size-4" />
                </button>
              </div>

              {/* Nav items */}
              <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-2" aria-label="Mobile navigation">
                {items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNav(item.id)}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-charcoal/70 transition-colors hover:bg-purple-brand/10 hover:text-purple-brand dark:text-white/80 dark:hover:text-purple-brand/90"
                  >
                    <span className="size-2 rounded-full bg-lavender dark:bg-purple-brand/40" />
                    {item.label}
                  </button>
                ))}
              </nav>

              {/* Theme toggle inside drawer */}
              <div className="border-t border-charcoal/5 px-5 py-4 dark:border-white/[0.06]">
                <button
                  onClick={toggleTheme}
                  className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm text-charcoal/50 transition-colors hover:bg-black/5 dark:text-white/40 dark:hover:bg-white/[0.04]"
                >
                  <span className="flex items-center gap-2">
                    <Icon
                      icon={theme === 'light' ? 'lucide:moon' : 'lucide:sun'}
                      className="size-4"
                    />
                    {theme === 'light' ? 'Dark mode' : 'Light mode'}
                  </span>
                  <Icon
                    icon={theme === 'light' ? 'lucide:moon' : 'lucide:sun'}
                    className="size-3 text-charcoal/30 dark:text-white/20"
                  />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
