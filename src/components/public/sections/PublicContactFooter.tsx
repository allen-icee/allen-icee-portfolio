// src/components/public/sections/PublicContactFooter.tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import QRCode from 'react-qr-code'
import { Fireflies, FloatingPetal } from '../../ui/Particles'
import type Lenis from 'lenis'

const socialLinks = [
  { platform: 'Email', username: 'alleniceedequiros@gmail.com', url: 'mailto:alleniceedequiros@gmail.com', qty: 1 },
  { platform: 'GitHub', username: '@mr-dearest', url: 'https://github.com/mr-dearest', qty: 1 },
  { platform: 'LinkedIn', username: 'in/allen-icee-dequiros/', url: 'https://www.linkedin.com/in/allen-icee-dequiros/', qty: 1 },
  { platform: 'Facebook', username: 'Allen Icee Dequiros', url: 'https://www.facebook.com/AllenIceeDequiros', qty: 1 },
  { platform: 'Instagram', username: '@allen_icee', url: 'https://www.instagram.com/allen_icee/', qty: 1 }
]

export default function PublicContactFooter() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
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
      }, 4000)
    }, 1500)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleScrollToTop = () => {
    const lenis = (window as unknown as Record<string, Lenis | undefined>).__LENIS__
    if (lenis) {
      lenis.scrollTo(0)
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const upperRippedMask = {
    WebkitMask: `
      radial-gradient(circle at 50% 0, transparent 4px, black 4.5px) top left / 12px 10px repeat-x,
      linear-gradient(black, black) center / 100% calc(100% - 20px) no-repeat,
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 20' preserveAspectRatio='none'%3E%3Cpolygon points='0,0 100,0 100,5 95,18 90,5 85,15 80,8 75,19 70,10 65,16 60,6 55,18 50,9 45,19 40,8 35,17 30,5 25,18 20,11 15,19 10,7 5,16 0,5' fill='black'/%3E%3C/svg%3E") bottom left / 100% 20px no-repeat
    `,
    mask: `
      radial-gradient(circle at 50% 0, transparent 4px, black 4.5px) top left / 12px 10px repeat-x,
      linear-gradient(black, black) center / 100% calc(100% - 20px) no-repeat,
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 20' preserveAspectRatio='none'%3E%3Cpolygon points='0,0 100,0 100,5 95,18 90,5 85,15 80,8 75,19 70,10 65,16 60,6 55,18 50,9 45,19 40,8 35,17 30,5 25,18 20,11 15,19 10,7 5,16 0,5' fill='black'/%3E%3C/svg%3E") bottom left / 100% 20px no-repeat
    `
  }

  const lowerRippedMask = {
    WebkitMask: `
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 20' preserveAspectRatio='none'%3E%3Cpolygon points='0,20 100,20 100,15 95,2 90,15 85,5 80,12 75,1 70,10 65,4 60,14 55,2 50,11 45,1 40,12 35,3 30,15 25,2 20,9 15,1 10,13 5,4 0,15' fill='black'/%3E%3C/svg%3E") top left / 100% 20px no-repeat,
      linear-gradient(black, black) center / 100% calc(100% - 20px) no-repeat,
      radial-gradient(circle at 50% 100%, transparent 4px, black 4.5px) bottom left / 12px 10px repeat-x
    `,
    mask: `
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 20' preserveAspectRatio='none'%3E%3Cpolygon points='0,20 100,20 100,15 95,2 90,15 85,5 80,12 75,1 70,10 65,4 60,14 55,2 50,11 45,1 40,12 35,3 30,15 25,2 20,9 15,1 10,13 5,4 0,15' fill='black'/%3E%3C/svg%3E") top left / 100% 20px no-repeat,
      linear-gradient(black, black) center / 100% calc(100% - 20px) no-repeat,
      radial-gradient(circle at 50% 100%, transparent 4px, black 4.5px) bottom left / 12px 10px repeat-x
    `
  }

  return (
    <section id="contact" className="relative overflow-hidden py-16 md:py-24 bg-transparent transition-colors duration-500 min-h-[90vh] flex flex-col justify-center">

      <Fireflies count={10} />
      <FloatingPetal petalIndex={2} className="top-[20%] right-[15%] w-5 md:w-7" duration={13} delay={1} opacity={0.4} />
      <FloatingPetal petalIndex={4} className="bottom-[30%] left-[8%] w-4 md:w-6" duration={19} delay={3} opacity={0.3} />

      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" />

      <div className="relative z-10 w-full flex flex-col md:flex-row justify-center items-center md:items-start gap-0 md:gap-8 max-w-4xl mx-auto">

        <motion.div
          className="w-full max-w-[320px] px-2 md:px-0 md:-rotate-2"
          initial={{ y: "20vh", opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ type: "spring", bounce: 0.2, duration: 1.2 }}
          style={{ filter: "drop-shadow(0 25px 25px rgb(0 0 0 / 0.35))" }}
        >
          <div
            className="relative bg-gradient-to-br from-[#FAF9F6] via-[#F2F0E6] to-[#E8E5D5] text-neutral-800 px-4 sm:px-6 pt-10 pb-6 font-mono text-[11px] sm:text-xs overflow-hidden leading-tight flex flex-col opacity-90 [text-shadow:0_0_1px_rgba(0,0,0,0.2)] shadow-[inset_0_0_20px_rgba(0,0,0,0.05)]"
            style={upperRippedMask}
          >

            <div className="absolute inset-0 opacity-[0.2] pointer-events-none mix-blend-multiply" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />

            <div className="relative z-10 flex flex-col gap-2">

              <div className="text-center flex flex-col items-center gap-0">
                <h2 className="text-2xl font-black uppercase tracking-widest mb-1">
                  CONTACT ME
                </h2>
                <p className="tracking-widest opacity-80 mt-1">
                  0916-3153-670
                </p>
                <p className="tracking-widest opacity-80 leading-none">
                  Tarlac, Philippines
                </p>

                <div className="w-full text-center tracking-tighter opacity-40 mt-2 mb-0 overflow-hidden whitespace-nowrap leading-none">
                  =================================================
                </div>
                <p className="tracking-wide max-w-[250px] leading-none my-0">
                  "I usually reply fast (unless I don't want to)."
                </p>
                <div className="w-full text-center tracking-tighter opacity-40 mt-0 overflow-hidden whitespace-nowrap leading-none">
                  -------------------------------------------------
                </div>
              </div>

              <div className="flex flex-col gap-2 mb-2">
                <div className="flex justify-between font-bold opacity-60 mb-1">
                  <span>QTY &nbsp; ITEM</span>
                  <span>PRICE</span>
                </div>

                {socialLinks.map((link) => (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start justify-between hover:bg-neutral-800 hover:text-[#FAF9F6] -mx-2 px-2 py-0.5 transition-colors group cursor-pointer"
                  >
                    <div className="flex gap-2 shrink-0">
                      <span className="font-bold">{link.qty}</span>
                      <span className="uppercase">{link.platform}</span>
                    </div>
                    <div className="text-right truncate opacity-80 group-hover:opacity-100 pl-2">
                      {link.username} <span className="opacity-50">↗</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="w-full max-w-[320px] px-2 md:px-0 mt-2 md:mt-4 md:rotate-1"
          initial={{ y: "20vh", opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ type: "spring", bounce: 0.2, duration: 1.2, delay: 0.1 }}
          style={{ filter: "drop-shadow(0 25px 25px rgb(0 0 0 / 0.35))" }}
        >
          <div
            className="relative bg-gradient-to-br from-[#FAF9F6] via-[#F2F0E6] to-[#E8E5D5] text-neutral-800 px-4 sm:px-6 pt-6 pb-10 font-mono text-[11px] sm:text-xs overflow-hidden leading-tight flex flex-col opacity-90 [text-shadow:0_0_1px_rgba(0,0,0,0.2)] shadow-[inset_0_0_20px_rgba(0,0,0,0.05)]"
            style={lowerRippedMask}
          >

            <div className="absolute inset-0 opacity-[0.2] pointer-events-none mix-blend-multiply" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />

            <div className="relative z-10 flex flex-col gap-4">

              <div className="flex flex-col relative min-h-[220px]">
                <div className="text-center font-bold opacity-60 mb-3">
                  *** CUSTOMER DETAILS ***
                </div>

                <AnimatePresence mode="wait">
                  {isSent ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center z-20 bg-[#FAF9F6]"
                    >

                      <motion.div
                        initial={{ scale: 2, rotate: -10, opacity: 0 }}
                        animate={{ scale: 1, rotate: -5, opacity: 1 }}
                        transition={{ type: "spring", bounce: 0.6, duration: 0.6 }}
                        className="text-neutral-900"
                      >
                        <span className="text-2xl font-black tracking-widest uppercase block text-center">
                          *** RECEIVED ***
                        </span>
                      </motion.div>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-4 flex-1"
                    >

                      <div className="flex flex-col gap-1 group">
                        <label className="uppercase font-bold shrink-0 opacity-60 group-focus-within:opacity-100 transition-opacity">
                          NAME:
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="YOUR NAME"
                          className="w-full bg-transparent border-b border-dashed border-neutral-400 outline-none text-sm focus:border-neutral-800 transition-colors font-bold uppercase placeholder:opacity-30"
                        />
                      </div>

                      <div className="flex flex-col gap-1 group">
                        <label className="uppercase font-bold shrink-0 opacity-60 group-focus-within:opacity-100 transition-opacity">
                          EMAIL:
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="YOUR EMAIL"
                          className="w-full bg-transparent border-b border-dashed border-neutral-400 outline-none text-sm focus:border-neutral-800 transition-colors font-bold uppercase placeholder:opacity-30"
                        />
                      </div>

                      <div className="flex flex-col gap-1 group flex-1">
                        <label className="uppercase font-bold opacity-60 group-focus-within:opacity-100 transition-opacity">
                          MESSAGE:
                        </label>
                        <textarea
                          name="message"
                          required
                          rows={3}
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="WHAT'S ON YOUR MIND?"
                          className="w-full resize-none bg-transparent border-b border-dashed border-neutral-400 outline-none text-sm focus:border-neutral-800 transition-colors font-bold uppercase leading-relaxed placeholder:opacity-30"
                          style={{ backgroundSize: '100% 1.5rem', backgroundImage: 'linear-gradient(transparent 1.4rem, rgba(0,0,0,0.1) 1.4rem, rgba(0,0,0,0.1) 1.5rem)' }}
                        />
                      </div>

                      <div className="mt-4 flex justify-center w-full">
                        <button
                          type="submit"
                          disabled={isSending || !formData.name.trim() || !formData.email.trim() || !formData.message.trim()}
                          className="w-full border-2 border-neutral-800 py-1.5 font-black uppercase hover:bg-neutral-800 hover:text-[#FAF9F6] transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-neutral-800 disabled:cursor-not-allowed"
                        >
                          {isSending ? '[ PRINTING... ]' : '[ SUBMIT MESSAGE ]'}
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>

              <div className="w-full text-center tracking-tighter opacity-40 overflow-hidden whitespace-nowrap mt-2">
                =================================================
              </div>

              <div className="flex flex-col items-center gap-0 mt-0">
                <p className="font-bold tracking-widest text-center mb-0">
                  THANK YOU FOR VISITING
                </p>
                <p className="opacity-60 mt-0">© {new Date().getFullYear()} ⊂⁠(⁠≽^•⩊•^≼⁠)⁠つ</p>

                <a href="https://www.youtube.com/watch?v=L8XbI9aJOXk" target="_blank" rel="noopener noreferrer" className="my-1 p-1 hover:scale-105 transition-transform duration-300 cursor-pointer mix-blend-multiply opacity-80">
                  <QRCode
                    value="https://www.youtube.com/watch?v=L8XbI9aJOXk"
                    size={70}
                    level="L"
                    bgColor="transparent"
                    fgColor="#000000"
                  />
                </a>

                <button
                  onClick={handleScrollToTop}
                  className="mt-1 font-bold opacity-60 hover:opacity-100 hover:bg-neutral-800 hover:text-[#FAF9F6] px-3 py-1 rounded-sm transition-colors leading-none"
                >
                  [ SCROLL TO TOP ]
                </button>
              </div>

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}