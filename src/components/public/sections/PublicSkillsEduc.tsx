// src/components/public/sections/PublicSkillsEduc.tsx
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@iconify/react'
import { useCollection } from '../../../hooks/useCollection'
import { mockSkills } from '../../../data/portfolioData'
import type { Skill } from '../../../types'
import { Fireflies, FloatingPetal } from '../../ui/Particles'

const BOOK_COLORS = [
  { base: 'bg-[#2B2329]', border: 'border-[#1E181D]', text: 'text-[#C9A98E]' }, 
  { base: 'bg-[#1F2226]', border: 'border-[#141618]', text: 'text-[#B4AE9F]' }, 
  { base: 'bg-[#312323]', border: 'border-[#221818]', text: 'text-[#D2BBA0]' }, 
  { base: 'bg-[#212421]', border: 'border-[#161816]', text: 'text-[#A0B09A]' }, 
  { base: 'bg-[#3C3228]', border: 'border-[#28211A]', text: 'text-[#E3D4B6]' }, 
]

const HEIGHTS = ['180px', '200px', '160px', '220px', '190px', '170px', '210px']

type BookType = 'category' | 'individual' | 'dummy'

interface BookProps {
  title: string
  type: BookType
  index: number
  skills?: Skill[]
  icon?: string
  onClick?: () => void
}

function BookSpine({ title, type, index, skills, icon, onClick }: BookProps) {
  const color = BOOK_COLORS[index % BOOK_COLORS.length]
  const heightVal = HEIGHTS[index % HEIGHTS.length]

  const widthVal = type === 'category'
    ? ['32px', '40px', '48px'][index % 3]
    : ['28px', '32px', '36px'][index % 3]

  const hasRibs = index % 3 !== 0
  const ribCount = (index % 3) + 2

  return (
    <div
      className="relative group cursor-pointer shrink-0 transition-transform duration-300 hover:!-translate-y-4 hover:!rotate-[-2deg] z-10 hover:z-50"
      style={{ width: widthVal, height: heightVal }}
      onClick={onClick}
    >

      <div className={`absolute inset-0 ${color.base} ${color.border} border-x border-t rounded-t-sm flex-col py-4 shadow-[inset_2px_0_4px_rgba(255,255,255,0.05),inset_-2px_0_4px_rgba(0,0,0,0.3),2px_0_10px_rgba(0,0,0,0.5)] flex items-center justify-between`}>

        <div className="w-full flex-col gap-1 px-2 flex items-center opacity-70 shrink-0">
          <div className="h-0.5 w-full bg-current opacity-30" />
          <div className="h-px w-3/4 bg-current opacity-30" />
        </div>

        {hasRibs && (
          <div className="absolute top-[20%] bottom-[30%] w-full flex-col flex justify-between opacity-40 pointer-events-none">
            {Array.from({ length: ribCount }).map((_, i) => (
              <div key={i} className="h-1 w-full border-y shadow-[0_2px_2px_rgba(0,0,0,0.5)] bg-black/40 border-white/10" />
            ))}
          </div>
        )}

        {type !== 'dummy' && (
          <div
            className={`flex-1 flex items-center justify-center font-serif ${type === 'category' ? 'text-[10px]' : 'text-[8px]'} font-bold tracking-widest uppercase ${color.text} drop-shadow-sm whitespace-nowrap overflow-hidden text-ellipsis py-2 w-full`}
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            {title}
          </div>
        )}

        {type === 'dummy' && (
          <div className="flex-1 w-full flex flex-col justify-center gap-4 py-4 px-2 opacity-20">
            <div className="h-px w-full bg-current shadow-[0_1px_1px_rgba(255,255,255,0.1)]" />
            <div className="h-px w-full bg-current shadow-[0_1px_1px_rgba(255,255,255,0.1)]" />
            <div className="h-px w-full bg-current shadow-[0_1px_1px_rgba(255,255,255,0.1)]" />
          </div>
        )}

        {type !== 'dummy' && (
          <div className="mt-1 flex items-center justify-center opacity-70 shrink-0">
            <Icon icon={icon || 'lucide:library'} className={`${type === 'category' ? 'size-4 md:size-5' : 'size-3'} text-current drop-shadow-sm`} />
          </div>
        )}
      </div>

      {type === 'category' && skills && (
        <div className="hidden md:flex absolute left-full top-1/2 -translate-y-1/2 ml-2 w-64 bg-[#F9F6F0] dark:bg-[#1A1816] rounded-sm p-4 shadow-[5px_5px_20px_rgba(0,0,0,0.1)] dark:shadow-[5px_5px_20px_rgba(0,0,0,0.6)] border border-black/10 dark:border-white/10 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 origin-left scale-95 group-hover:scale-100 flex-col gap-3 z-[100]">
          <h4 className="font-serif font-bold text-sm text-charcoal dark:text-white/90 border-b border-black/10 dark:border-white/10 pb-2">
            {title}
          </h4>
          <div className="grid grid-cols-2 gap-y-3 gap-x-2">
            {skills.map(s => (
              <div key={s.id} className="flex items-center gap-2 overflow-hidden">
                <Icon icon={s.icon} className="size-4 shrink-0 text-charcoal/70 dark:text-white/70" />
                <span className="font-sans text-[10px] text-charcoal/80 dark:text-white/80 truncate">
                  {s.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function WallDiplomas() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 w-full relative">

      <motion.div
        className="relative group shrink-0"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-black/20 dark:bg-black/40 blur-xl translate-y-6 translate-x-4 -z-10" />
        <a href="https://www.tsu.edu.ph/" target="_blank" rel="noopener noreferrer" className="block w-[340px] h-[260px] md:w-[420px] md:h-[300px] bg-[#1e1512] p-4 shadow-2xl rounded-sm border-2 border-[#120D0A] relative overflow-hidden transition-transform duration-500 hover:scale-[1.02] cursor-pointer">
          <div className="w-full h-full bg-[#EFEBE4] p-3 md:p-4 border shadow-inner flex">
            <div className="w-full h-full border border-black/15 flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                <img src="/assets/images/TSULogo.png" alt="" className="w-32 h-32 object-contain" />
              </div>
              <div className="w-full flex items-center justify-start gap-3 mb-3 relative z-10">
                <img src="/assets/images/TSULogo.png" alt="TSU Logo" className="w-8 h-8 object-contain" />
                <h3 className="font-serif text-xs md:text-sm text-black/80 tracking-[0.15em] uppercase font-bold">Tarlac State University</h3>
              </div>
              <h2 className="font-serif text-lg md:text-xl font-bold text-[#3B2519] mb-1 leading-tight relative z-10">Bachelor of Science in Information Technology</h2>
              <p className="font-sans text-[9px] md:text-[10px] text-black/60 tracking-wider uppercase mb-5 relative z-10">Specialization in Web & Mobile Application</p>
              <div className="flex w-full items-end justify-between px-2 mt-auto relative z-10">
                <div className="text-left">
                  <p className="font-serif text-[10px] md:text-xs font-bold text-[#8B5A2B] uppercase tracking-widest mb-1">Magna Cum Laude</p>
                  <p className="font-serif text-xs font-bold text-black/80">July 2026</p>
                </div>
                <div className="bg-gradient-to-br from-[#D4AF37] via-[#F3E5AB] to-[#AA7C11] text-[#4A3500] size-12 rounded-full flex flex-col items-center justify-center shadow-md border-2 border-[#E9C967] relative">
                  <div className="absolute inset-1 border border-[#4A3500]/20 rounded-full" />
                  <Icon icon="lucide:award" className="size-5 opacity-70" />
                </div>
              </div>
            </div>
          </div>

          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-white/30 to-transparent opacity-40 mix-blend-overlay" />
            <div className="absolute -inset-full top-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -rotate-45 translate-x-1/3 opacity-80" />
            <div className="absolute inset-0 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]" />
          </div>
        </a>
      </motion.div>

      <motion.div
        className="relative group shrink-0"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-black/20 dark:bg-black/40 blur-xl translate-y-6 translate-x-4 -z-10" />
        <a href="https://www.facebook.com/p/Corazon-C-Aquino-High-School-100063686300516/" target="_blank" rel="noopener noreferrer" className="block w-[340px] h-[260px] md:w-[420px] md:h-[300px] bg-[#1a1a1a] p-4 shadow-2xl rounded-sm border-2 border-[#0A0A0A] relative overflow-hidden transition-transform duration-500 hover:scale-[1.02] cursor-pointer">
          <div className="w-full h-full bg-[#EFEBE4] p-3 md:p-4 border shadow-inner flex">
            <div className="w-full h-full border border-black/15 flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                <img src="/assets/images/CCAHSLogo.png" alt="" className="w-32 h-32 object-contain" />
              </div>
              <div className="w-full flex items-center justify-start gap-3 mb-3 relative z-10">
                <img src="/assets/images/CCAHSLogo.png" alt="CCAHS Logo" className="w-8 h-8 object-contain" />
                <h3 className="font-serif text-xs md:text-sm text-black/80 tracking-[0.1em] uppercase font-bold">Corazon C. Aquino HS</h3>
              </div>
              <h2 className="font-serif text-lg md:text-xl font-bold text-[#3B2519] mb-1 relative z-10">TVL-Information and Communications Technology</h2>
              <p className="font-sans text-[9px] md:text-[10px] text-black/60 tracking-wider uppercase mb-5 relative z-10">Computer Systems Servicing (CSS)</p>
              <div className="flex w-full items-end justify-between px-2 mt-auto relative z-10">
                <div className="text-left">
                  <p className="font-serif text-[10px] md:text-xs font-bold text-[#8B5A2B] uppercase tracking-widest mb-1">With High Honors</p>
                  <p className="font-serif text-xs font-bold text-black/80">July 2022</p>
                </div>
                <div className="bg-gradient-to-br from-[#D4AF37] via-[#F3E5AB] to-[#AA7C11] text-[#4A3500] size-12 rounded-full flex flex-col items-center justify-center shadow-md border-2 border-[#E9C967] relative">
                  <div className="absolute inset-1 border border-[#4A3500]/20 rounded-full" />
                  <Icon icon="lucide:award" className="size-5 opacity-70" />
                </div>
              </div>
            </div>
          </div>

          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-white/30 to-transparent opacity-40 mix-blend-overlay" />
            <div className="absolute -inset-full top-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -rotate-45 translate-x-1/3 opacity-80" />
            <div className="absolute inset-0 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]" />
          </div>
        </a>
      </motion.div>
    </div>
  )
}

export default function PublicSkillsEduc() {
  const { items: skills, loading } = useCollection<Skill>('skills')
  const [activeCategory, setActiveCategory] = useState<{ title: string, skills: Skill[] } | null>(null)

  const displaySkills = (skills.length > 0 ? skills : mockSkills) as unknown as Skill[]

  const technicalSkills = displaySkills.filter(s => s.category !== 'Professional')
  const professionalSkills = displaySkills.filter(s => s.category === 'Professional')

  const groupedTechSkills = technicalSkills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = []
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  return (
    <section id="skills" className="relative w-full overflow-hidden bg-transparent px-6 py-20 md:py-32 transition-colors duration-700">

      <Fireflies count={15} />
      <FloatingPetal petalIndex={1} className="top-[10%] left-[5%] w-6 md:w-8" duration={12} delay={0} opacity={0.4} />
      <FloatingPetal petalIndex={4} className="bottom-[30%] right-[8%] w-4 md:w-6" duration={19} delay={3} opacity={0.3} />

      <div className="absolute inset-0 pointer-events-none opacity-[0.02] dark:opacity-[0.01]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

      <div className="relative z-20 mx-auto max-w-[1400px]">

        <motion.div
          className="mb-8 md:mb-12 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-serif text-3xl md:text-5xl font-medium tracking-tight text-charcoal dark:text-white/90 drop-shadow-sm mb-4">
            My Expertise & Education
          </h2>
          <p className="font-sans text-xs md:text-sm tracking-widest uppercase text-purple-brand dark:text-purple-brand/90">
            Proof that I can actually read and write.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center gap-2 py-12 text-[#8B5A2B] dark:text-[#FFB74D]/80">
            <Icon icon="lucide:loader-circle" className="size-5 animate-spin" />
            Dusting the shelves…
          </div>
        ) : (
          <div className="flex flex-col gap-12 w-full items-center">

            <WallDiplomas />

            <div className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 gap-16 px-4 md:px-0">

              <div className="relative w-full flex flex-col justify-end z-20">

                <div className="absolute right-4 bottom-14 md:hidden text-charcoal/60 dark:text-[#EAE0D5]/60 flex items-center gap-1 animate-pulse pointer-events-none z-[60]">
                  <span className="text-[10px] font-bold tracking-widest uppercase">Swipe ▶</span>
                </div>

                <div className="relative z-10 flex items-end justify-start flex-nowrap md:flex-wrap overflow-x-auto md:overflow-visible gap-[2px] min-h-[250px] px-4 lg:px-8 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden w-full">
                  {Object.entries(groupedTechSkills).map(([category, categorySkills], i) => (
                    <React.Fragment key={category}>
                      {i > 0 && i % 5 === 0 && <div className="w-8 shrink-0" />}
                      <BookSpine
                        title={category}
                        type="category"
                        index={i}
                        skills={categorySkills}
                        onClick={() => setActiveCategory({ title: category, skills: categorySkills })}
                      />
                    </React.Fragment>
                  ))}

                  {Array.from({ length: 2 }).map((_, i) => (
                    <BookSpine
                      key={`d-t-${i}`}
                      title=""
                      type="dummy"
                      index={i + 15}
                    />
                  ))}
                </div>

                <div className="relative w-full h-10 rounded-sm bg-gradient-to-b from-[#2A231E] to-[#14100E] shadow-[0_20px_40px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.9)] border-t-2 border-[#4A3D34] z-0 flex items-center justify-center">
                  <div className="absolute inset-x-0 bottom-0 h-4 bg-black/60 blur-[4px]" />

                  <div className="relative z-10 px-6 py-1 bg-gradient-to-b from-[#E0E0E0] to-[#999999] shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),_0_2px_4px_rgba(0,0,0,0.5)] rounded-sm border border-[#666666] flex items-center justify-center translate-y-0.5">
                    <div className="absolute left-1 top-1/2 -translate-y-1/2 size-0.5 rounded-full bg-[#444444] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]" />
                    <div className="absolute right-1 top-1/2 -translate-y-1/2 size-0.5 rounded-full bg-[#444444] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]" />
                    <span className="font-serif text-[10px] md:text-xs font-bold tracking-[0.2em] text-[#1A1A1A] uppercase">
                      Technical Skills
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative w-full flex flex-col justify-end z-10">
                <div className="relative z-10 flex items-end justify-start flex-nowrap md:flex-wrap overflow-x-auto md:overflow-visible gap-[2px] min-h-[250px] px-4 lg:px-8 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden w-full">
                  {professionalSkills.map((skill, i) => (
                    <React.Fragment key={skill.id}>
                      {i > 0 && i % 5 === 0 && <div className="w-8 shrink-0" />}
                      <BookSpine
                        title={skill.name}
                        type="individual"
                        icon={skill.icon}
                        index={i}
                      />
                    </React.Fragment>
                  ))}

                  {Array.from({ length: 2 }).map((_, i) => (
                    <BookSpine
                      key={`d-p-${i}`}
                      title=""
                      type="dummy"
                      index={i + 30}
                    />
                  ))}
                </div>

                <div className="relative w-full h-10 rounded-sm bg-gradient-to-b from-[#2A231E] to-[#14100E] shadow-[0_20px_40px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.9)] border-t-2 border-[#4A3D34] z-0 flex items-center justify-center">
                  <div className="absolute inset-x-0 bottom-0 h-4 bg-black/60 blur-[4px]" />

                  <div className="relative z-10 px-6 py-1 bg-gradient-to-b from-[#E0E0E0] to-[#999999] shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),_0_2px_4px_rgba(0,0,0,0.5)] rounded-sm border border-[#666666] flex items-center justify-center translate-y-0.5">
                    <div className="absolute left-1 top-1/2 -translate-y-1/2 size-0.5 rounded-full bg-[#444444] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]" />
                    <div className="absolute right-1 top-1/2 -translate-y-1/2 size-0.5 rounded-full bg-[#444444] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]" />
                    <span className="font-serif text-[10px] md:text-xs font-bold tracking-[0.2em] text-[#1A1A1A] uppercase">
                      Professional Skills
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>

      <AnimatePresence>
        {activeCategory && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm cursor-pointer"
              onClick={() => setActiveCategory(null)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-[#F9F6F0] dark:bg-[#1A1816] w-full max-w-sm rounded-md p-6 shadow-2xl border border-black/10 dark:border-white/10"
            >
              <button
                onClick={() => setActiveCategory(null)}
                className="absolute top-4 right-4 p-2 text-charcoal/50 dark:text-white/50 hover:text-charcoal dark:hover:text-white transition-colors rounded-full hover:bg-black/5 dark:hover:bg-white/5"
              >
                <Icon icon="lucide:x" className="size-5" />
              </button>

              <h3 className="font-serif font-bold text-xl text-charcoal dark:text-white/90 border-b border-black/10 dark:border-white/10 pb-4 mb-5 flex items-center gap-2">
                <Icon icon="lucide:library" className="size-5 text-[#8B5A2B] dark:text-[#C9A98E]" />
                {activeCategory.title}
              </h3>

              <div className="grid grid-cols-2 gap-y-4 gap-x-4">
                {activeCategory.skills.map(s => (
                  <div key={s.id} className="flex items-center gap-2.5 overflow-hidden group/item">
                    <div className="size-8 rounded bg-black/5 dark:bg-white/5 flex items-center justify-center shrink-0 group-hover/item:bg-[#8B5A2B]/10 dark:group-hover/item:bg-[#C9A98E]/10 transition-colors">
                      <Icon icon={s.icon} className="size-4.5 text-charcoal/70 dark:text-white/70 group-hover/item:text-[#8B5A2B] dark:group-hover/item:text-[#C9A98E] transition-colors" />
                    </div>
                    <span className="font-sans text-sm font-medium text-charcoal/80 dark:text-white/80 truncate">
                      {s.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}