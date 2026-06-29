import { useState } from 'react'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import MessageModal from './MessageModal'

const socialLinks = [
  {
    platform: 'Email',
    username: 'hello@allen-icee.com',
    url: 'mailto:hello@allen-icee.com',
    icon: 'lucide:mail',
  },
  {
    platform: 'GitHub',
    username: '@allenicee',
    url: 'https://github.com',
    icon: 'lucide:github',
  },
  {
    platform: 'LinkedIn',
    username: 'Allen Icee A. Dequiros',
    url: 'https://linkedin.com',
    icon: 'lucide:linkedin',
  },
  {
    platform: 'Facebook',
    username: 'Allen Icee A. Dequiros',
    url: 'https://facebook.com',
    icon: 'lucide:facebook',
  }
]

export default function PublicContact() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSending, setIsSending] = useState(false)
  const [isSent, setIsSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSending(true)
    setTimeout(() => {
      setIsSending(false)
      setIsSent(true)
      setTimeout(() => {
        setIsSent(false)
        setFormData({ name: '', email: '', message: '' })
      }, 3000)
    }, 1000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <section id="contact" className="relative overflow-hidden py-20 md:py-28 flex flex-col bg-[#F9F6F0] dark:bg-[#141316]">
      {/* Background Atmosphere */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-30 mix-blend-multiply dark:opacity-[0.03] dark:mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\\\'0 0 200 200\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\'%3E%3Cfilter id=\\\'noise\\\'%3E%3CfeTurbulence type=\\\'fractalNoise\\\' baseFrequency=\\\'0.9\\\' numOctaves=\\\'2\\\' stitchTiles=\\\'stitch\\\'/%3E%3C/filter%3E%3Crect width=\\\'100%25\\\' height=\\\'100%25\\\' filter=\\\'url(%23noise)\\\'/%3E%3C/svg%3E")' }} />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 flex-1 flex flex-col items-center">

        {/* Header */}
        <motion.div
          className="mb-12 md:mb-16 text-center w-full flex flex-col items-center"
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
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-charcoal dark:text-white/90 drop-shadow-sm">
              Let's Talk
            </h2>
            {/* Quick Message Modal Trigger */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-purple-brand/30 bg-purple-brand/10 dark:bg-purple-brand/20 px-4 py-2 font-sans text-xs uppercase tracking-widest text-purple-brand dark:text-purple-brand-light transition-colors hover:bg-purple-brand hover:text-white dark:hover:bg-purple-brand"
            >
              <Icon icon="lucide:message-square-plus" className="size-4" />
              Message Me
            </button>
          </div>
          <p className="mt-6 font-serif italic text-lg md:text-xl text-charcoal/60 dark:text-white/50">
            I usually reply fast (unless I don't want to).
          </p>
        </motion.div>

        {/* The Open Guest Book */}
        <motion.div
          className="relative w-full max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          {/* Leather Book Cover Background */}
          <div className="absolute inset-0 -mx-2 -my-2 md:-mx-4 md:-my-4 rounded-xl bg-[#2A1D15] shadow-[0_20px_40px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] dark:bg-[#150F0B]">
            <div className="absolute inset-0 opacity-[0.25] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\\\'0 0 200 200\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\'%3E%3Cfilter id=\\\'noise\\\'%3E%3CfeTurbulence type=\\\'fractalNoise\\\' baseFrequency=\\\'0.6\\\' numOctaves=\\\'4\\\' stitchTiles=\\\'stitch\\\'/%3E%3C/filter%3E%3Crect width=\\\'100%25\\\' height=\\\'100%25\\\' filter=\\\'url(%23noise)\\\'/%3E%3C/svg%3E")' }} />
          </div>

          {/* Book Spine Center */}
          <div className="absolute left-1/2 top-0 bottom-0 w-8 -translate-x-1/2 bg-gradient-to-r from-black/40 via-black/10 to-black/40 z-10 hidden md:block" />

          {/* The Pages Container */}
          <div className="relative z-10 flex flex-col md:flex-row overflow-hidden rounded-md bg-[#FDFBF7] dark:bg-[#221E1C] shadow-inner ring-1 ring-black/10 dark:ring-white/5">
            
            {/* Left Page: Contact Info & Plaques */}
            <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-12 border-b md:border-b-0 md:border-r border-charcoal/10 dark:border-black/50 relative">
              {/* Paper texture overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply dark:opacity-[0.15] dark:mix-blend-overlay" style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, rgba(0,0,0,0.03) 31px, rgba(0,0,0,0.03) 32px)' }} />

              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-6 md:mb-8">
                  <h3 className="font-serif text-xl md:text-2xl font-medium text-charcoal dark:text-white/90 flex items-center gap-2">
                    <Icon icon="lucide:book-open" className="size-5 text-[#8B5A2B] dark:text-[#C9A98E]" />
                    Visitor Directory
                  </h3>
                  <p className="mt-2 font-sans text-xs uppercase tracking-widest text-charcoal/50 dark:text-white/50">
                    Official Contact Channels
                  </p>
                </div>

                {/* Social Plaques */}
                <div className="flex flex-col gap-3 flex-1 justify-center">
                  {socialLinks.map((link) => (
                    <a
                      key={link.platform}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-3 sm:p-4 rounded-[2px] bg-gradient-to-r from-[#EAE5D9] to-[#DFD8C8] dark:from-[#2A2421] dark:to-[#1E1917] border border-white/50 dark:border-white/5 shadow-[2px_2px_5px_rgba(0,0,0,0.05),inset_1px_1px_1px_rgba(255,255,255,0.4)] dark:shadow-[2px_2px_5px_rgba(0,0,0,0.3),inset_1px_1px_1px_rgba(255,255,255,0.05)] transition-transform hover:-translate-y-0.5"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex size-8 items-center justify-center rounded-full bg-black/5 dark:bg-white/5 text-charcoal/80 dark:text-white/80">
                          <Icon icon={link.icon} className="size-4" />
                        </div>
                        <div>
                          <p className="font-serif text-sm font-medium text-charcoal dark:text-white/90">{link.platform}</p>
                          <p className="font-mono text-[9px] text-charcoal/60 dark:text-white/50">{link.username}</p>
                        </div>
                      </div>
                      <Icon icon="lucide:arrow-right" className="size-4 text-charcoal/30 dark:text-white/30 group-hover:text-purple-brand dark:group-hover:text-purple-brand-light transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Page: Guest Book Form */}
            <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-12 relative flex flex-col min-h-[400px]">
              {/* Paper texture overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply dark:opacity-[0.15] dark:mix-blend-overlay" style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, rgba(0,0,0,0.03) 31px, rgba(0,0,0,0.03) 32px)' }} />
              
              <div className="relative z-10 flex flex-col h-full flex-1">
                <div className="mb-6 flex justify-between items-end border-b border-charcoal/20 dark:border-white/10 pb-2">
                  <h3 className="font-serif text-xl font-medium text-charcoal dark:text-white/90">Sign the Guestbook</h3>
                  <span className="font-mono text-[9px] uppercase text-charcoal/40 dark:text-white/40">No. {Math.floor(Math.random() * 9000) + 1000}</span>
                </div>

                {isSent ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center flex-1 py-12 text-center"
                  >
                    <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400">
                      <Icon icon="lucide:feather" className="size-6" />
                    </div>
                    <h4 className="mb-2 font-serif text-xl text-charcoal dark:text-white/90">Entry Recorded</h4>
                    <p className="font-serif italic text-sm text-charcoal/60 dark:text-white/60">
                      Your message has been added to the archives.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5 flex-1">
                    <div className="flex flex-col">
                      <label htmlFor="gb-name" className="font-sans text-[9px] uppercase tracking-widest text-charcoal/50 dark:text-white/50 mb-1">
                        Visitor Name
                      </label>
                      <input
                        type="text"
                        id="gb-name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-charcoal/20 dark:border-white/20 py-1 font-serif text-sm text-charcoal outline-none focus:border-purple-brand dark:text-white transition-colors"
                      />
                    </div>
                    
                    <div className="flex flex-col">
                      <label htmlFor="gb-email" className="font-sans text-[9px] uppercase tracking-widest text-charcoal/50 dark:text-white/50 mb-1">
                        Return Address (Email)
                      </label>
                      <input
                        type="email"
                        id="gb-email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-charcoal/20 dark:border-white/20 py-1 font-serif text-sm text-charcoal outline-none focus:border-purple-brand dark:text-white transition-colors"
                      />
                    </div>

                    <div className="flex flex-col flex-1 min-h-[100px]">
                      <label htmlFor="gb-message" className="font-sans text-[9px] uppercase tracking-widest text-charcoal/50 dark:text-white/50 mb-1">
                        Message / Remark
                      </label>
                      <textarea
                        id="gb-message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full h-full resize-none bg-transparent border-b border-charcoal/20 dark:border-white/20 py-1 font-serif text-sm text-charcoal outline-none focus:border-purple-brand dark:text-white transition-colors"
                      />
                    </div>

                    <div className="mt-2 flex justify-end">
                      <button
                        type="submit"
                        disabled={isSending}
                        className="inline-flex items-center gap-2 px-4 py-2 font-serif text-sm italic text-charcoal dark:text-white hover:text-purple-brand dark:hover:text-purple-brand-light transition-colors disabled:opacity-50"
                      >
                        {isSending ? 'Inscribing...' : 'Seal & Send'}
                        {!isSending && <Icon icon="lucide:send" className="size-4" />}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

          </div>
        </motion.div>
      </div>

      <MessageModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  )
}
