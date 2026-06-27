import { Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useSmoothScroll } from '../hooks/useSmoothScroll'
import PublicNavigation from '../components/public/PublicNavigation'
import PublicSecretTrigger from '../components/public/PublicSecretTrigger'
import CompEnvironment from '../components/public/CompEnvironment'
import CompWanderingCat from '../components/public/CompWanderingCat'
import CompThemeToggle from '../components/ui/CompThemeToggle'

const publicPageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
}

export default function PublicLayout() {
  useSmoothScroll()
  const location = useLocation()

  return (
    <div className="paper-texture min-h-screen overflow-x-hidden bg-warm-paper text-charcoal">
      <CompEnvironment />
      <CompWanderingCat />
      <PublicNavigation />
      <PublicSecretTrigger />
      <CompThemeToggle />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          variants={publicPageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
    </div>
  )
}
