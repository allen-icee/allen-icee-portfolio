import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { useSmoothScroll } from '../hooks/useSmoothScroll'
import { Navbar } from '../components/navigation/Navbar'
import { doc, setDoc, increment } from 'firebase/firestore'
import { db } from '../services/firebaseConfig'

import CompEnvironment from '../components/public/components/CompEnvironment'
import CompWanderingCat from '../components/public/components/CompWanderingCat'

const publicPageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
}

export default function PublicLayout() {
  useSmoothScroll()
  const location = useLocation()

  useEffect(() => {
    if (!sessionStorage.getItem('visited')) {
      const ref = doc(db, 'stats', 'visitors')
      setDoc(ref, { count: increment(1) }, { merge: true }).catch(console.error)
      sessionStorage.setItem('visited', 'true')
    }
  }, [])

  return (
    <div className="paper-texture relative min-h-screen overflow-x-hidden bg-warm-paper dark:bg-surface text-charcoal dark:text-white transition-colors duration-700 font-sans">
      <Helmet>
        <title>Allen Icee Dequiros - Portfolio</title>
        <meta name="description" content="Portfolio of Allen Icee Dequiros, showcasing projects, artwork, and experience." />
        <meta property="og:title" content="Allen Icee Dequiros - Portfolio" />
        <meta property="og:description" content="Portfolio of Allen Icee Dequiros, showcasing projects, artwork, and experience." />
        <meta property="og:type" content="website" />
      </Helmet>
      <CompEnvironment />
      <CompWanderingCat />
      <Navbar />
      
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
