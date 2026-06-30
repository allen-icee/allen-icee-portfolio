// src/components/navigation/ThemeToggle.tsx
import { useContext } from 'react'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { ThemeContext } from '../../context/ThemeContext'

export function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <button
      onClick={toggleTheme}
      className="relative flex h-8 w-14 items-center rounded-full bg-purple-brand/20 p-1 transition-colors dark:bg-purple-brand/40 outline-none focus-visible:ring-2 focus-visible:ring-lavender/50"
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >

      <div className="absolute inset-x-0 flex justify-between px-2 pointer-events-none">
        <Icon icon="lucide:sun" className="size-3.5 text-charcoal/40 dark:text-white/40" />
        <Icon icon="lucide:moon" className="size-3.5 text-charcoal/40 dark:text-white/40" />
      </div>

      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="z-10 flex size-6 items-center justify-center rounded-full bg-white shadow-sm dark:bg-purple-brand"
        initial={false}
        animate={{
          x: theme === 'dark' ? 24 : 0,
        }}
      >
        {theme === 'light' ? (
          <Icon icon="lucide:sun" className="size-3.5 text-purple-brand" />
        ) : (
          <Icon icon="lucide:moon" className="size-3.5 text-lavender" />
        )}
      </motion.div>
    </button>
  )
}