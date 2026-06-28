import { Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useSmoothScroll } from '../hooks/useSmoothScroll'
import { Navbar } from '../components/navigation/Navbar'
import PublicSecretTrigger from '../components/public/PublicSecretTrigger'
import CompEnvironment from '../components/public/CompEnvironment'
import CompWanderingCat from '../components/public/CompWanderingCat'

const publicPageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
}

export default function PublicLayout() {
  useSmoothScroll()
  const location = useLocation()

  return (
    <div className="paper-texture min-h-screen overflow-x-hidden bg-warm-paper dark:bg-surface text-charcoal dark:text-white transition-colors duration-700">
      <CompEnvironment />
      <CompWanderingCat />
      <Navbar />
      <PublicSecretTrigger />
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
