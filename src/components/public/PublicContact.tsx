import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@iconify/react'

const socialLinks = [
  {
    platform: 'GitHub',
    username: '@macee',
    url: 'https://github.com',
    icon: 'lucide:github',
    description: 'Where I store my code chapters.'
  },
  {
    platform: 'LinkedIn',
    username: 'Macee',
    url: 'https://linkedin.com',
    icon: 'lucide:linkedin',
    description: 'My professional archive.'
  },
  {
    platform: 'Instagram',
    username: '@macee.creates',
    url: 'https://instagram.com',
    icon: 'lucide:instagram',
    description: 'Captured light and daily moments.'
  }
]

export default function PublicContact() {
  const [copied, setCopied] = useState(false)
  const email = 'hello@macee.com' // Placeholder email

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  return (
    <section id="contact" className="relative overflow-hidden py-32 md:py-48 flex flex-col">
      {/* The Final Chapter Atmosphere */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-30 mix-blend-multiply dark:opacity-[0.03] dark:mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\\\'0 0 200 200\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\'%3E%3Cfilter id=\\\'noise\\\'%3E%3CfeTurbulence type=\\\'fractalNoise\\\' baseFrequency=\\\'0.9\\\' numOctaves=\\\'2\\\' stitchTiles=\\\'stitch\\\'/%3E%3C/filter%3E%3Crect width=\\\'100%25\\\' height=\\\'100%25\\\' filter=\\\'url(%23noise)\\\'/%3E%3C/svg%3E")' }} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.2),transparent_80%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02),transparent_80%)]" />

      {/* Floating Dust Particles */}
      <div className="pointer-events-none absolute left-[20%] top-[10%] h-1 w-1 rounded-full bg-white/40 blur-[1px] dark:bg-white/10" />
      <div className="pointer-events-none absolute right-[15%] top-[30%] h-1.5 w-1.5 rounded-full bg-purple-brand/20 blur-[1px] dark:bg-purple-brand/10" />
      <div className="pointer-events-none absolute left-[30%] bottom-[20%] h-2 w-2 rounded-full bg-charcoal/5 blur-[2px] dark:bg-white/5" />

      <div className="relative z-10 mx-auto w-full max-w-4xl px-6 md:px-8 flex-1">
        
        {/* Header */}
        <motion.div
          className="mb-24 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-4 opacity-50 mb-6">
            <div className="h-px w-12 bg-charcoal dark:bg-white" />
            <Icon icon="lucide:book-check" className="size-5 text-charcoal dark:text-white" />
            <div className="h-px w-12 bg-charcoal dark:bg-white" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-charcoal dark:text-white/90 drop-shadow-sm">
            The Final Chapter
          </h2>
          <p className="mt-6 font-serif italic text-lg md:text-xl text-charcoal/60 dark:text-white/50">
            "Every great story begins with a conversation."
          </p>
        </motion.div>

        {/* The Handwritten Letter */}
        <motion.div
          className="relative mx-auto mb-32 max-w-2xl rotate-[-1deg] rounded-sm bg-[#FDFBF7] p-8 shadow-[0_15px_30px_rgba(0,0,0,0.1)] ring-1 ring-charcoal/5 dark:bg-[#EAE5D9] md:p-12"
          initial={{ opacity: 0, y: 40, rotate: -5 }}
          whileInView={{ opacity: 1, y: 0, rotate: -1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          {/* Subtle paper lines */}
          <div className="pointer-events-none absolute inset-0 z-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, rgba(0,0,0,0.05) 31px, rgba(0,0,0,0.05) 32px)' }} />
          
          {/* Bookmark tucked inside */}
          <div className="absolute right-8 top-[-10px] h-16 w-6 bg-purple-brand shadow-sm dark:bg-[#6B4C9A]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%)' }} />

          <div className="relative z-10 font-serif text-lg leading-[32px] text-charcoal/80">
            <p className="mb-6">Dear Visitor,</p>
            <p className="mb-6">
              Thank you for taking the time to wander through my little library.
            </p>
            <p className="mb-6">
              Whether you came for my projects, illustrations, stories, or simply curiosity, I'm grateful you stayed. 
            </p>
            <p className="mb-6">
              If you'd like to collaborate, ask a question, discuss ideas, or simply say hello, my door is always open. 
            </p>
            <p className="mb-10">
              Looking forward to hearing your story as well.
            </p>
            <p className="text-right font-serif text-2xl italic text-charcoal opacity-90 mr-4" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
              — Macee
            </p>
          </div>
        </motion.div>

        {/* Contact Methods Area */}
        <div className="mb-32 flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          
          {/* Main Featured Email Card */}
          <motion.div
            className="group relative flex-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative rounded-lg bg-white p-8 shadow-[0_10px_40px_rgba(0,0,0,0.08)] ring-1 ring-charcoal/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:bg-[#1A181E] dark:ring-white/10 dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
              {/* Lavender Glow on Hover */}
              <div className="absolute inset-0 z-0 bg-gradient-to-br from-purple-brand/0 to-purple-brand/0 opacity-0 transition-all duration-500 group-hover:from-purple-brand/5 group-hover:to-transparent group-hover:opacity-100" />
              
              <div className="relative z-10">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-purple-brand/10 text-purple-brand dark:bg-purple-brand/20 dark:text-purple-brand-light">
                    <Icon icon="lucide:feather" className="size-5 transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110" />
                  </div>
                  <h3 className="font-serif text-2xl font-medium text-charcoal dark:text-white/90">Write Me a Letter</h3>
                </div>
                
                <p className="mb-8 font-body text-sm text-charcoal/60 dark:text-white/60">
                  Send a direct message to my inbox. I usually reply within a day or two.
                </p>

                <div className="mb-8 flex items-center gap-4 rounded-sm bg-warm-paper px-4 py-3 ring-1 ring-charcoal/5 dark:bg-[#222] dark:ring-white/5">
                  <Icon icon="lucide:mail" className="size-4 text-charcoal/40 dark:text-white/40" />
                  <span className="font-mono text-sm text-charcoal/80 dark:text-white/80">{email}</span>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href={`mailto:${email}`}
                    className="inline-flex items-center gap-2 rounded-sm bg-purple-brand px-6 py-3 font-serif text-sm font-medium text-white shadow-md transition-all hover:bg-purple-brand/90 hover:shadow-lg dark:bg-[#6B4C9A]"
                  >
                    <Icon icon="lucide:send" className="size-4" />
                    Compose Email
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="relative inline-flex items-center gap-2 rounded-sm border border-charcoal/10 bg-transparent px-6 py-3 font-serif text-sm font-medium text-charcoal transition-colors hover:bg-charcoal/5 dark:border-white/10 dark:text-white/90 dark:hover:bg-white/5"
                  >
                    <Icon icon={copied ? "lucide:check" : "lucide:copy"} className={`size-4 ${copied ? 'text-green-600 dark:text-green-400' : ''}`} />
                    {copied ? 'Copied!' : 'Copy Address'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Social Links (Archival Index Cards) */}
          <div className="flex flex-1 flex-col gap-4 lg:pl-12">
            {socialLinks.map((link, i) => (
              <motion.a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-between rounded-sm bg-[#FDFBF7] p-5 shadow-[0_4px_10px_rgba(0,0,0,0.05)] ring-1 ring-charcoal/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.1)] dark:bg-[#1A181E] dark:ring-white/5 dark:hover:shadow-[0_8px_20px_rgba(0,0,0,0.5)]"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                {/* Tiny corner fold decoration */}
                <div className="absolute right-0 top-0 h-0 w-0 border-b-[8px] border-r-[8px] border-b-transparent border-r-warm-paper dark:border-r-surface" />
                <div className="absolute right-0 top-0 h-0 w-0 border-b-[8px] border-l-[8px] border-b-charcoal/10 border-l-transparent dark:border-b-white/10" />

                <div className="flex items-center gap-4">
                  <div className="flex size-10 items-center justify-center rounded-full bg-charcoal/5 text-charcoal transition-colors group-hover:bg-purple-brand/10 group-hover:text-purple-brand dark:bg-white/5 dark:text-white/80 dark:group-hover:bg-purple-brand/20 dark:group-hover:text-purple-brand-light">
                    <Icon icon={link.icon} className="size-5 transition-transform group-hover:scale-110" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-medium text-charcoal dark:text-white/90">{link.platform}</h4>
                    <p className="font-body text-xs text-charcoal/50 dark:text-white/50">{link.username}</p>
                  </div>
                </div>
                
                <Icon icon="lucide:arrow-up-right" className="size-4 text-charcoal/30 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-purple-brand dark:text-white/30 dark:group-hover:text-purple-brand-light" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Personality Corners */}
        <motion.div
          className="mb-32 flex flex-wrap justify-between gap-8 border-t border-charcoal/10 pt-12 dark:border-white/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="flex items-center gap-3 opacity-60 transition-opacity hover:opacity-100">
            <Icon icon="lucide:headphones" className="size-4 text-charcoal dark:text-white" />
            <div>
              <p className="font-sans text-[10px] uppercase tracking-widest text-charcoal dark:text-white">Currently Listening</p>
              <p className="font-serif text-sm italic text-charcoal dark:text-white">Lo-fi beats & soft piano</p>
            </div>
          </div>
          <div className="flex items-center gap-3 opacity-60 transition-opacity hover:opacity-100">
            <Icon icon="lucide:book-open-text" className="size-4 text-charcoal dark:text-white" />
            <div>
              <p className="font-sans text-[10px] uppercase tracking-widest text-charcoal dark:text-white">Current Read</p>
              <p className="font-serif text-sm italic text-charcoal dark:text-white">A Fantasy Webtoon</p>
            </div>
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          <p className="font-serif text-2xl md:text-3xl italic text-charcoal/80 dark:text-white/80">
            "The library is always open."
          </p>
        </motion.div>
      </div>
    </section>
  )
}
