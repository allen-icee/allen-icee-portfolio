import { useState, useEffect } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { Icon } from '@iconify/react'
import type Lenis from 'lenis'

import { NavItem } from './NavItem'
import { MobileMenu } from './MobileMenu'
import { SearchButton } from './SearchButton'
import { ThemeToggle } from './ThemeToggle'
import { Logo } from '../ui/Logo'

const ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'art', label: 'Gallery' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
]

function scrollToSection(id: string) {
  if (id === 'home') {
    const lenis = (window as unknown as Record<string, Lenis | undefined>).__LENIS__
    if (lenis) {
      lenis.scrollTo(0)
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    return
  }
  
  const target = document.getElementById(id)
  if (!target) {
    console.warn(`Section with id "${id}" not found.`)
    return
  }
  
  const lenis = (window as unknown as Record<string, Lenis | undefined>).__LENIS__
  if (lenis) {
    lenis.scrollTo(target, { offset: -100 }) // offset for the fixed navbar
  } else {
    // Standard scroll fallback with offset calculation
    const y = target.getBoundingClientRect().top + window.scrollY - 100
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeId, setActiveId] = useState('home')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const { scrollY } = useScroll()

  // Transition to floating state after 80px
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 80)
  })

  // Intersection Observer for Active State Tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the topmost intersecting entry
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      // Root margin creates a detection window in the center of the screen
      { rootMargin: '-20% 0px -60% 0px' }
    )

    ITEMS.forEach(({ id }) => {
      if (id === 'home') return // Handled via default or scroll position
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  // Explicitly check for 'home' state when scrolled to the very top
  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (latest < 100) {
      setActiveId('home')
    }
  })

  function handleNav(id: string) {
    setActiveId(id)
    setIsMobileMenuOpen(false)
    scrollToSection(id)
  }

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 top-0 z-40 mx-auto w-full max-w-[1200px] transition-all duration-400 ease-out ${
          isScrolled 
            ? 'mt-4 rounded-2xl border border-charcoal/5 bg-warm-paper/90 px-6 py-3 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-surface/90 md:px-8'
            : 'mt-0 border-transparent bg-transparent px-6 py-6 md:px-8'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <button 
            onClick={() => handleNav('home')}
            className="group flex items-center outline-none focus-visible:ring-2 focus-visible:ring-lavender rounded-md px-1"
            aria-label="Go to Home"
          >
            <Logo className="h-8 w-auto text-charcoal dark:text-white transition-transform group-hover:scale-105" />
          </button>

          {/* Desktop Nav */}
          <nav className="hidden items-center md:flex" aria-label="Main navigation">
            {ITEMS.map((item) => (
              <NavItem
                key={item.id}
                id={item.id}
                label={item.label}
                isActive={activeId === item.id}
                onClick={handleNav}
              />
            ))}
          </nav>

          {/* Utilities */}
          <div className="flex items-center gap-1 md:gap-2">
            <div className="hidden md:block">
              <SearchButton />
            </div>
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            
            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="flex size-10 items-center justify-center rounded-xl bg-white/70 shadow-sm backdrop-blur-md transition-colors hover:bg-white/90 md:hidden dark:bg-white/10 dark:hover:bg-white/20"
              aria-label="Open mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <Icon icon="lucide:menu" className="size-5 text-charcoal dark:text-lavender" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
        items={ITEMS}
        activeId={activeId}
        onNavigate={handleNav}
      />
    </>
  )
}
