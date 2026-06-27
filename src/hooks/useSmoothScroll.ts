import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

export function useSmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    lenisRef.current = lenis
    ;(window as unknown as Record<string, unknown>).__LENIS__ = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      lenisRef.current = null
      delete (window as unknown as Record<string, unknown>).__LENIS__
    }
  }, [])

  return lenisRef
}
