import { useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@iconify/react'
import { ThemeContext } from '../../context/ThemeContext'

export function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <button
      onClick={toggleTheme}
      className="group relative flex size-9 items-center justify-center rounded-full text-charcoal/60 transition-colors hover:bg-black/5 hover:text-charcoal dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white"
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="absolute"
        >
          {theme === 'light' ? (
            <Icon icon="lucide:moon" className="size-4.5" />
          ) : (
            <Icon icon="lucide:sun" className="size-4.5" />
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  )
}
