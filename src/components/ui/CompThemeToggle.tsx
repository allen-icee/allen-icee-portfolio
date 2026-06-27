import { useContext } from 'react'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { ThemeContext } from '../../context/ThemeContext'

export default function CompThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed bottom-14 right-5 z-40 hidden size-10 items-center justify-center rounded-full bg-white/70 shadow-md backdrop-blur-md transition-colors hover:bg-white/90 md:flex dark:bg-white/10 dark:hover:bg-white/20"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        <Icon
          icon={theme === 'light' ? 'lucide:moon' : 'lucide:sun'}
          className="size-4 text-charcoal dark:text-lavender"
        />
      </motion.div>
    </motion.button>
  )
}
