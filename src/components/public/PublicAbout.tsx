import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../services/firebaseConfig'
import { mockJournal } from '../../utils/mockData'

export default function PublicAbout() {
  const [title, setTitle] = useState(mockJournal.title)
  const [bodyHTML, setBodyHTML] = useState('')
  const [signature, setSignature] = useState('')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const snap = await getDoc(doc(db, 'settings', 'journal'))
        if (cancelled) return

        if (snap.exists()) {
          const data = snap.data()
          setTitle(data.title ?? mockJournal.title)
          setBodyHTML(data.body ?? mockJournal.body)
          setSignature(data.signature ?? mockJournal.signature)
        } else {
          setBodyHTML(mockJournal.body)
          setSignature(mockJournal.signature)
        }
      } catch {
        if (!cancelled) {
          setBodyHTML(mockJournal.body)
          setSignature(mockJournal.signature)
        }
      } finally {
        if (!cancelled) setReady(true)
      }
    }

    load()
    return () => { cancelled = true }
  }, [])

  if (!ready) return null

  return (
    <section id="about" className="relative overflow-hidden px-4 py-20 md:px-8 md:py-32">
      {/* Decorative coffee stain on the desk */}
      <span
        className="pointer-events-none absolute -left-10 top-1/4 size-40 rounded-[60%_40%_70%_30%/45%_55%_45%_55%] bg-[#8B5A2B]/10 -rotate-12 blur-[2px] dark:bg-[#8B5A2B]/20"
        aria-hidden
      />

      <motion.div
        className="relative mx-auto max-w-5xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* The Physical Journal Container */}
        <div className="relative flex flex-col overflow-hidden rounded-r-2xl rounded-l-md bg-[#FDFBF7] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] dark:bg-[#2A2A2D] dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.7)] md:flex-row md:rounded-2xl md:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)]">
          
          {/* Paper stacking edges (bottom & right) */}
          <div className="pointer-events-none absolute bottom-0 right-0 top-0 w-[4px] border-l border-black/5 bg-[repeating-linear-gradient(to_bottom,#f5f5f5,#f5f5f5_2px,#e0e0e0_2px,#e0e0e0_4px)] opacity-50 dark:border-black/40 dark:bg-[repeating-linear-gradient(to_bottom,#222,#222_2px,#1a1a1a_2px,#1a1a1a_4px)]" />
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[4px] border-t border-black/5 bg-[repeating-linear-gradient(to_right,#f5f5f5,#f5f5f5_2px,#e0e0e0_2px,#e0e0e0_4px)] opacity-50 dark:border-black/40 dark:bg-[repeating-linear-gradient(to_right,#222,#222_2px,#1a1a1a_2px,#1a1a1a_4px)]" />

          {/* Center Spine (Desktop only) */}
          <div className="pointer-events-none absolute bottom-0 left-1/2 top-0 hidden w-12 -translate-x-1/2 bg-gradient-to-r from-transparent via-black/5 to-transparent dark:via-black/40 md:block" />
          <div className="pointer-events-none absolute bottom-0 left-1/2 top-0 hidden w-px -translate-x-1/2 bg-black/10 dark:bg-black/50 md:block" />

          {/* Left Page */}
          <div className="relative w-full p-8 md:w-1/2 md:p-12 lg:p-16">
            {/* Ruled lines background */}
            <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(transparent,transparent_31px,#e5e7eb_31px,#e5e7eb_32px)] opacity-60 dark:bg-[repeating-linear-gradient(transparent,transparent_31px,#ffffff10_31px,#ffffff10_32px)]" style={{ backgroundPositionY: '2.5rem' }} />
            
            {/* Margin line */}
            <div className="pointer-events-none absolute bottom-0 left-8 top-0 w-px bg-red-400/20 dark:bg-red-500/15 md:left-12 lg:left-16" />

            <div className="relative z-10 ml-4">
              <div className="mb-6 border-b border-charcoal/10 pb-2 dark:border-white/10 md:mb-8 md:pb-4">
                <h2 className="font-serif text-2xl font-medium tracking-tight text-charcoal md:text-3xl dark:text-white/90">
                  {title}
                </h2>
                <span className="mt-1 block font-sans text-[10px] tracking-widest uppercase text-charcoal/40 md:text-xs dark:text-white/40">
                  Vol. I &mdash; The Beginning
                </span>
              </div>

              <div
                className="prose prose-sm max-w-none font-body leading-8 text-charcoal/80 dark:text-white/80 md:prose-base [&_p]:mb-8 [&_p:last-child]:mb-0 [&_p]:break-words"
                dangerouslySetInnerHTML={{ __html: bodyHTML }}
              />
            </div>
          </div>

          {/* Right Page (Visible on Desktop) */}
          <div className="relative hidden w-1/2 p-8 md:block md:p-12 lg:p-16">
            {/* Ruled lines background */}
            <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(transparent,transparent_31px,#e5e7eb_31px,#e5e7eb_32px)] opacity-60 dark:bg-[repeating-linear-gradient(transparent,transparent_31px,#ffffff10_31px,#ffffff10_32px)]" style={{ backgroundPositionY: '2.5rem' }} />
            
            <div className="relative z-10 ml-4 flex h-full flex-col justify-between">
              <div className="rounded-xl border border-charcoal/5 bg-white/40 p-6 shadow-sm dark:border-white/[0.05] dark:bg-black/20">
                <p className="font-serif text-lg italic leading-relaxed text-charcoal/60 dark:text-white/60">
                  &ldquo;Every project begins as a blank page.&rdquo;
                </p>
              </div>

              <div className="mt-auto pt-12">
                <motion.p
                  className="text-right font-serif text-xl italic text-purple-brand/80 dark:text-purple-brand/90"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  &mdash; {signature}
                </motion.p>
              </div>
            </div>
          </div>

          {/* Mobile Signature */}
          <div className="relative p-8 pt-0 md:hidden">
            <div className="relative z-10 ml-4">
              <motion.p
                className="text-right font-serif text-lg italic text-purple-brand/80 dark:text-purple-brand/90"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                &mdash; {signature}
              </motion.p>
            </div>
          </div>

        </div>

        {/* Sticky Notes */}
        <div
          className="pointer-events-none absolute -right-4 top-10 hidden rotate-6 rounded-sm bg-[#FFF9C4] px-4 py-3 shadow-[2px_4px_8px_rgba(0,0,0,0.1)] lg:-right-12 lg:block lg:top-24 dark:bg-[#FFF59D]/90"
          aria-hidden
        >
          <p className="font-sans text-[9px] font-bold tracking-wider uppercase text-amber-800/60">Ideas &rarr;</p>
          <p className="mt-1 font-body text-xs italic text-amber-900/80">&ldquo;Less is more&rdquo;</p>
        </div>

        <div
          className="pointer-events-none absolute -left-2 bottom-12 hidden -rotate-3 rounded-sm bg-[#FFCC80] px-3 py-2 shadow-[2px_4px_8px_rgba(0,0,0,0.1)] lg:-left-10 lg:block lg:bottom-24 dark:bg-[#FFB74D]/90"
          aria-hidden
        >
          <p className="font-body text-[10px] text-amber-900/80">TODO: update portfolio</p>
        </div>

      </motion.div>
    </section>
  )
}
