// src/components/navigation/Navbar.tsx
import { useState, useEffect } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { Icon } from '@iconify/react'
import type Lenis from 'lenis'

import { NavItem } from './NavItem'
import { MobileMenu } from './MobileMenu'

import { ThemeToggle } from './ThemeToggle'
import { Logo } from '../ui/Logo'

const ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'art', label: 'Gallery' },
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
    lenis.scrollTo(target, { offset: -100 }) 
  } else {

    const y = target.getBoundingClientRect().top + window.scrollY - 100
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
}

export function Navbar() {
  const { scrollY } = useScroll()
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeId, setActiveId] = useState('home')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 80)
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },

      { rootMargin: '-20% 0px -79% 0px' }
    )

    const observedElements = new Set<string>()

    const tryObserve = () => {
      ITEMS.forEach(({ id }) => {
        if (!observedElements.has(id)) {
          const element = document.getElementById(id)
          if (element) {
            observer.observe(element)
            observedElements.add(id)
          }
        }
      })
    }

    tryObserve()

    const interval = setInterval(tryObserve, 1000)

    return () => {
      clearInterval(interval)
      observer.disconnect()
    }
  }, [])

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
            ? 'mt-4 md:rounded-full border-transparent md:border-charcoal/10 bg-transparent md:bg-warm-paper/60 px-6 py-3 md:shadow-lg md:backdrop-blur-xl md:dark:border-white/10 md:dark:bg-surface/60 md:px-8'
            : 'mt-0 border-transparent bg-transparent px-6 py-6 md:px-8'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="flex items-center justify-between">

          <div className="flex items-center gap-1">
            <button 
              onClick={() => handleNav('home')}
              className="group flex items-center outline-none focus-visible:ring-2 focus-visible:ring-lavender rounded-md px-1"
              aria-label="Go to Home"
            >
              <Logo className="h-8 w-auto text-charcoal dark:text-white transition-transform group-hover:scale-105" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex items-center justify-center p-1 text-charcoal/60 hover:text-charcoal dark:text-white/60 dark:hover:text-white transition-colors duration-300"
              aria-label="Toggle mobile menu"
            >
              <Icon icon="ep:menu" className="size-6" />
            </button>
          </div>

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

          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </motion.header>

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