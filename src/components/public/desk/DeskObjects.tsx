// src/components/public/desk/DeskObjects.tsx
import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'

export function Keychain() {
  const playRoar = () => {
    const audio = new Audio('/sounds/roar.mp3')
    audio.play().catch(e => console.error("Audio play failed, file might be missing", e))
  }
  return (
    <motion.div
      className="group relative flex flex-col items-center cursor-pointer w-32 h-32 sm:w-48 sm:h-48"
      whileHover={{ scale: 1.1, rotate: [0, -10, 10, -10, 10, 0] }}
      transition={{ duration: 0.5 }}
      onClick={playRoar}
      onMouseEnter={playRoar}
    >
      <img src="/svg/other/keychain.svg" alt="Dinosaur Keychain" className="w-full h-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)] dark:drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]" />
    </motion.div>
  )
}

export function Glasses({ onClick }: { onClick?: () => void }) {
  return (
    <motion.div
      className="group relative flex gap-1 cursor-pointer w-48 h-20 sm:w-[30rem] sm:h-[30rem] rotate-180"
      onClick={onClick}
    >
      <img src="/svg/other/glasses.svg" alt="Glasses" className="w-full h-full object-contain filter drop-shadow-none dark:drop-shadow-[-5px_5px_10px_rgba(0,0,0,0.7)]" />
    </motion.div>
  )
}

export function QuillPen() {
  return (
    <motion.div className="group relative flex items-center justify-center cursor-pointer w-64 h-64 sm:w-[28rem] sm:h-[28rem] z-20 pointer-events-auto" whileHover="hover" initial="rest">
      <motion.div
        className="absolute bottom-8 -left-4 sm:bottom-1 sm:-left-20 font-serif text-2xl sm:text-4xl text-[#8B5A2B]/80 dark:text-[#EAE0D5]/60 italic whitespace-nowrap z-0 origin-left rotate-15"
        variants={{
          rest: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
          hover: { opacity: 1, clipPath: "inset(0 0% 0 0)", transition: { duration: 1.5, ease: "linear" } }
        }}
      >
        MTCY
      </motion.div>
      <motion.div
        className="relative origin-[20%_80%] z-10 w-full h-full pointer-events-none"
        variants={{
          rest: { rotate: 0 },
          hover: {
            rotate: [0, -5, 10, -5, 0],
            transition: { duration: 1.2, ease: "easeInOut", repeat: Infinity }
          }
        }}
      >
        <img src="/svg/other/quill.svg" alt="Quill" className="w-full h-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)] dark:drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]" />
      </motion.div>
    </motion.div>
  )
}

const FALLBACK_POEMS = [
  { title: "The Pour I Contemplate", author: "Allen Icee Dequiros", lines: ["And thus, like rain.", "I am but a mere plant of Yours,", "Raindrops from You may have hurt me,", "But I knew it would help me grow."] },
  { title: "Oh Fire, Let It Be", author: "Allen Icee Dequiros", lines: ["Even in the dark, I would be there,", "Even when I'm in pain and you are too, I will be there,", "I am willing to endure the fire if it means melting my armor for you,", "I will kneel before you and give flowers,", "Till these temporary things in my hand,", "Turn into a permanent ring for you."] },
  { title: "A Gray Life That Became A Lavender Colored", author: "Allen Icee Dequiros", lines: ["Ever since you came into my life,", "Something change from the way I see,", "You made this eyes discover this lavender colored life,", "As if you tainted me with that color of yours,", "And now we coexist", "How did you do it? Miss?"] },
  { title: "In the Deepest Well", author: "Allen Icee Dequiros", lines: ["At the brink of being engulfted by the darkness,", "What more is to be drowned?", "If it means all of this ends,", "Pull me in somehow."] },
  { title: "Petal in the Wind", author: "Allen Icee Dequiros", lines: ["Your heart was on the verge of closing,", "But you opened it for me,", "Like a petal in the wind,", "Death would be the only thing,", "That would keep me from being with you."] },
  { title: "Divided Family", author: "Allen Icee Dequiros", lines: ["An awkward feeling has began to float,", "A hidden border was drawn,", "The once was close,", "Slowly fade away,", "If love could make us closer,", "Then it can also break us apart."] }
];

export function PoemNote({ className = '' }: { className?: string }) {

  const [poem, setPoem] = useState<any>(FALLBACK_POEMS[0]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {

    setPoem(FALLBACK_POEMS[Math.floor(Math.random() * FALLBACK_POEMS.length)]);
  }, []);

  const fetchPoem = async () => {
    try {
      setPoem({ title: "Writing a new note...", lines: [] } as any);

      const famousAuthors = [
        "Emily Dickinson", "Robert Frost", "Walt Whitman", "William Wordsworth", "Thomas Hardy", "Christina Rossetti",
        "John Keats", "Percy Bysshe Shelley", "Lord Byron", "Elizabeth Barrett Browning", "Edmund Spenser", "William Shakespeare",
        "Edgar Allan Poe", "Ernest Dowson", "A. E. Housman", "Dante Gabriel Rossetti", "Algernon Charles Swinburne",
        "Henry Wadsworth Longfellow", "Ella Wheeler Wilcox", "Paul Laurence Dunbar",
        "William Blake", "Samuel Taylor Coleridge", "Alfred, Lord Tennyson",
        "Sara Teasdale", "James Joyce", "John Clare", "Matthew Arnold", "Thomas Moore"
      ];
      const author = famousAuthors[Math.floor(Math.random() * famousAuthors.length)];

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const res = await fetch(`https://poetrydb.org/author/${author}/title,author,lines`, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!res.ok) throw new Error("API Error");

      const data = await res.json();

      if (data && data.length > 0) {
        const shortPoems = data.filter((p: any) => p.lines && p.lines.length > 0 && p.lines.length <= 14);
        const pool = shortPoems.length > 0 ? shortPoems : data.filter((p: any) => p.lines && p.lines.length > 0);
        const randomPoem = pool[Math.floor(Math.random() * pool.length)];

        setPoem(randomPoem);
      } else {
        throw new Error("Empty response");
      }
    } catch (e) {
      console.warn("Poetry API took too long or failed. Using fallback.", e);
      setPoem(FALLBACK_POEMS[Math.floor(Math.random() * FALLBACK_POEMS.length)]);
    }
  }

  return (
    <>
      <motion.div
        className={`group relative flex flex-col p-4 shadow-[2px_4px_12px_rgba(0,0,0,0.3)] dark:shadow-[2px_4px_16px_rgba(0,0,0,0.5)] bg-[#FFF9C4] dark:bg-[#FFF59D]/90 rotate-[-3deg] cursor-pointer origin-top-left ${className}`}
        style={{ width: '120px', minHeight: '140px', fontFamily: '"Comic Sans MS", cursive, sans-serif' }}
        whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
        onClick={() => setIsOpen(true)}
      >

        <div className="absolute -top-4 -right-3 z-20 rotate-[30deg]">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 drop-shadow-[1px_4px_3px_rgba(0,0,0,0.5)]" viewBox="0 0 24 24">
            <defs>
              <linearGradient id="purple-pin-thumb" x1="20%" y1="0%" x2="80%" y2="100%">
                <stop offset="0%" stopColor="#e9d5ff" />
                <stop offset="30%" stopColor="#9333ea" />
                <stop offset="70%" stopColor="#581c87" />
                <stop offset="100%" stopColor="#2e1065" />
              </linearGradient>
            </defs>
            <path fill="url(#purple-pin-thumb)" d="m16 12l2 2v2h-5v6l-1 1l-1-1v-6H6v-2l2-2V5H7V3h10v2h-1z"></path>
          </svg>
        </div>

        {poem.lines.length === 0 ? (
          <div className="animate-pulse w-full mt-4">
            <div className="h-3 bg-black/10 rounded w-full mb-3" />
            <div className="space-y-1.5 flex flex-col">
              <div className="h-2 bg-black/5 rounded w-5/6" />
              <div className="h-2 bg-black/5 rounded w-4/6" />
              <div className="h-2 bg-black/5 rounded w-full" />
            </div>
          </div>
        ) : (
          <>
            <h4 className="text-sm font-bold text-[#2A2A2A] mb-1 mt-4 leading-tight">{poem.title}</h4>
            <div className="text-[10px] text-[#3A3A3A] leading-relaxed overflow-hidden border-t border-black/10 pt-1 mt-1" style={{ display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical' }}>
              {poem.lines.slice(0, 4).map((line: string, i: number) => <div key={i}>{line || '...'}</div>)}
            </div>
          </>
        )}
      </motion.div>

      {isOpen && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 md:p-8" onClick={() => setIsOpen(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2, y: 20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative shadow-[10px_25px_60px_rgba(0,0,0,0.5)] max-w-md w-full aspect-square flex flex-col text-[#2A2A2A]"
            style={{ fontFamily: '"Comic Sans MS", cursive, sans-serif' }}
          >

            <div className="absolute inset-0 z-0 bg-[#FFF9C4] dark:bg-[#FFF59D]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 64px), calc(100% - 64px) 100%, 0 100%)' }} />

            <div
              className="relative z-10 flex-1 overflow-y-auto px-8 md:px-12 py-12 md:py-16 [&::-webkit-scrollbar]:hidden"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              data-lenis-prevent
            >
              {poem.lines.length === 0 ? (
                <div className="animate-pulse flex flex-col items-center mt-2 w-full">
                  <div className="h-6 md:h-7 bg-black/10 rounded-full w-3/4 mb-4" />
                  <div className="h-4 bg-black/5 rounded-full w-1/4 mb-8" />
                  <div className="w-full space-y-3 flex flex-col items-center">
                    <div className="h-4 bg-black/5 rounded-full w-5/6" />
                    <div className="h-4 bg-black/5 rounded-full w-4/6" />
                    <div className="h-4 bg-black/5 rounded-full w-full" />
                    <div className="h-4 bg-black/5 rounded-full w-3/6" />
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="text-lg md:text-xl font-bold mb-1 text-center text-[#2A2A2A]">
                    {poem.title}
                  </h3>
                  {(poem as any).author && (
                    <p className="text-xs md:text-sm text-center italic text-[#3A3A3A]/70 mb-4 border-b border-black/10 pb-3">
                      by {(poem as any).author}
                    </p>
                  )}
                  <div className="text-sm md:text-base leading-tight text-center space-y-1 text-[#3A3A3A] font-medium pb-8">
                    {poem.lines.map((line: string, i: number) => <div key={i}>{line || <br />}</div>)}
                  </div>
                </>
              )}
            </div>

            {poem.lines.length > 6 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 pointer-events-none flex flex-col items-center opacity-80 animate-bounce drop-shadow-[0_0_6px_rgba(255,249,196,0.9)] dark:drop-shadow-[0_0_6px_rgba(255,245,157,0.9)]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-[#1A1A1A]">
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}

            <div
              className="absolute bottom-0 right-0 w-16 h-16 z-20 cursor-pointer group/fold transition-transform duration-300 hover:scale-105 origin-bottom-right"
              style={{ filter: 'drop-shadow(-3px -3px 4px rgba(0,0,0,0.2))' }}
              onClick={(e) => { e.stopPropagation(); fetchPoem(); }}
              title="Fold over for a new poem"
            >
              <div
                className="w-full h-full bg-[#E6E0B0] dark:bg-[#E6DB8A] rounded-tl-lg transition-colors group-hover/fold:bg-[#DDD59C]"
                style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}
              />
              <div className="absolute inset-0 flex items-start justify-start pl-[6px] pt-[6px] opacity-0 group-hover/fold:opacity-100 transition-opacity pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" className="text-black/60">
                  <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                    <path strokeDasharray="56" strokeDashoffset="56" d="M3 21L4.9 15.3L15.8 4.4C17.4 2.8 20 2.8 21.6 4.4C23.2 6 23.2 8.6 21.6 10.2L10.7 21.1L3 21Z">
                      <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="56;0" />
                    </path>
                    <path strokeDasharray="6" strokeDashoffset="6" d="M13.5 6.5L17.5 10.5">
                      <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="6;0" />
                    </path>
                    <path fill="currentColor" fillOpacity="0" stroke="none" d="M10.7 21.1L3 21L4.9 15.3L15.8 4.4C17.4 2.8 20 2.8 21.6 4.4C23.2 6 23.2 8.6 21.6 10.2L10.7 21.1Z">
                      <animate fill="freeze" attributeName="fill-opacity" begin="0.8s" dur="0.15s" values="0;0.3" />
                    </path>
                  </g>
                </svg>
              </div>
            </div>

            <div
              className="absolute -top-6 -right-4 md:-top-8 md:-right-6 z-30 cursor-pointer group/pin rotate-[30deg] origin-center hover:rotate-[15deg] transition-all hover:scale-110"
              onClick={() => setIsOpen(false)}
              title="Close Note"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 md:w-14 md:h-14 drop-shadow-[2px_6px_5px_rgba(0,0,0,0.5)]" viewBox="0 0 24 24">
                <defs>
                  <linearGradient id="purple-pin-modal" x1="20%" y1="0%" x2="80%" y2="100%">
                    <stop offset="0%" stopColor="#e9d5ff" />
                    <stop offset="30%" stopColor="#9333ea" />
                    <stop offset="70%" stopColor="#581c87" />
                    <stop offset="100%" stopColor="#2e1065" />
                  </linearGradient>
                </defs>
                <path fill="url(#purple-pin-modal)" d="m16 12l2 2v2h-5v6l-1 1l-1-1v-6H6v-2l2-2V5H7V3h10v2h-1z"></path>
              </svg>
            </div>

          </motion.div>
        </div>,
        document.body
      )}
    </>
  )
}

export function StickyNote({ title, content, color, rotate, className = '' }: { title: string, content: string, color: string, rotate: string, className?: string }) {
  return (
    <motion.div
      className={`group relative flex flex-col p-4 shadow-[2px_4px_8px_rgba(0,0,0,0.15)] dark:shadow-[2px_4px_12px_rgba(0,0,0,0.3)] origin-top-left cursor-pointer ${color} ${rotate} ${className}`}
      whileHover={{ scale: 1.05, rotateZ: 0, zIndex: 10 }}
      transition={{ duration: 0.3 }}
    >

      <motion.div
        className="absolute bottom-0 right-0 w-6 h-6 bg-black/5 rounded-tl-xl transition-transform origin-bottom-right"
        variants={{ hover: { scale: 1.5, opacity: 0.8 } }}
      />
      <span className="font-sans text-[10px] font-bold tracking-wider uppercase text-black/60 dark:text-black/70 mb-2 border-b border-black/10 dark:border-black/20 pb-1 transition-colors">
        {title}
      </span>
      <p className="font-body text-sm leading-relaxed text-black/80 dark:text-black/90 transition-colors" style={{ fontFamily: '"Comic Sans MS", cursive, sans-serif' }}>
        {content}
      </p>
    </motion.div>
  )
}

export function AnalogClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {

      const manilaTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Manila" });
      setTime(new Date(manilaTime));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  const secondDeg = seconds * 6;
  const minuteDeg = minutes * 6 + seconds * 0.1;
  const hourDeg = (hours % 12) * 30 + minutes * 0.5;

  const monthStr = String(time.getMonth() + 1).padStart(2, '0');
  const dateStr = String(time.getDate()).padStart(2, '0');
  const displayDate = `${monthStr}/${dateStr}`;

  return (
    <motion.div className="relative flex flex-col items-center gap-3 cursor-default shrink-0 mt-8" whileHover={{ scale: 1.05 }}>

      <div className="absolute -top-12 sm:-top-16 w-16 sm:w-20 h-16 sm:h-24 bg-gradient-to-b from-[#2a1a10] to-[#1a0f0a] rounded-t-sm shadow-[0_5px_15px_rgba(0,0,0,0.5)] z-0 flex justify-center border-x-2 border-black/40" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)' }}>

        <div className="w-[85%] h-full border-x border-dashed border-white/20 mt-1" />
      </div>

      <div className="absolute -bottom-12 sm:-bottom-16 w-16 sm:w-20 h-16 sm:h-24 bg-gradient-to-t from-[#2a1a10] to-[#1a0f0a] rounded-b-lg shadow-[0_5px_15px_rgba(0,0,0,0.5)] z-0 flex justify-center border-x-2 border-black/40" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)' }}>

        <div className="w-[85%] h-full border-x border-dashed border-white/20 mb-1" />
      </div>

      <div className="absolute top-0 w-20 sm:w-28 h-4 bg-gradient-to-r from-[#888] via-[#CCC] to-[#888] dark:from-[#444] dark:via-[#666] dark:to-[#444] z-0 rounded-t-sm shadow-md transition-colors" />
      <div className="absolute bottom-0 w-20 sm:w-28 h-4 bg-gradient-to-r from-[#888] via-[#CCC] to-[#888] dark:from-[#444] dark:via-[#666] dark:to-[#444] z-0 rounded-b-sm shadow-md transition-colors" />

      <div className="relative w-36 h-36 sm:w-48 sm:h-48 rounded-full bg-gradient-to-br from-[#E0E0E0] via-[#F5F5F5] to-[#999999] dark:from-[#555] dark:via-[#777] dark:to-[#333] shadow-[0_15px_30px_rgba(0,0,0,0.6),inset_0_2px_5px_rgba(255,255,255,0.9)] dark:shadow-[0_15px_30px_rgba(0,0,0,0.8),inset_0_2px_5px_rgba(255,255,255,0.2)] flex items-center justify-center p-2 sm:p-3 z-10 border border-[#777] dark:border-[#444] transition-colors">

        <div className="relative w-full h-full rounded-full bg-[#1A1A1A] shadow-[inset_0_8px_20px_rgba(0,0,0,0.9)] flex items-center justify-center p-1">

          <div className="relative w-full h-full rounded-full bg-[#FAF0E6] dark:bg-[#111] bg-[radial-gradient(circle_at_center,#FFFFFF_0%,#E0E0E0_100%)] dark:bg-[radial-gradient(circle_at_center,#333_0%,#000_100%)] shadow-[inset_0_2px_10px_rgba(0,0,0,0.2)] dark:shadow-[inset_0_2px_10px_rgba(0,0,0,0.8)] flex items-center justify-center overflow-hidden transition-colors">

            <div className="absolute inset-0 w-full h-full rounded-full">
              {[...Array(12)].map((_, i) => {
                const num = i + 1;
                return (
                  <div key={num} className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 flex flex-col justify-start py-0.5 sm:py-1 pointer-events-none" style={{ transform: `rotate(${num * 30}deg)` }}>
                    <span className="font-serif text-[14px] sm:text-[18px] font-bold text-black dark:text-white drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] dark:drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] text-center transition-colors" style={{ transform: `rotate(-${num * 30}deg)` }}>
                      {num}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="absolute left-1/2 -translate-x-1/2 bottom-[18%] sm:bottom-[20%] w-10 sm:w-12 h-5 sm:h-6 bg-white dark:bg-[#222] border border-[#999]/50 dark:border-[#555] shadow-[inset_0_2px_5px_rgba(0,0,0,0.4)] dark:shadow-[inset_0_2px_5px_rgba(0,0,0,0.8)] flex items-center justify-center rounded-[2px] z-10 transition-colors">
              <span className="font-mono text-[9px] sm:text-[10px] font-bold text-black dark:text-[#EEE] tracking-tighter transition-colors">{displayDate}</span>
            </div>

            <div className="absolute bottom-1/2 left-1/2 w-2 sm:w-2.5 h-8 sm:h-12 bg-gradient-to-t from-[#222] to-[#444] dark:from-[#CCC] dark:to-[#FFF] shadow-[2px_2px_4px_rgba(0,0,0,0.4)] origin-bottom z-20 transition-colors" style={{ transform: `translateX(-50%) rotate(${hourDeg}deg)`, clipPath: 'polygon(50% 0%, 100% 20%, 80% 100%, 20% 100%, 0% 20%)' }} />

            <div className="absolute bottom-1/2 left-1/2 w-1.5 sm:w-2 h-12 sm:h-16 bg-gradient-to-t from-[#222] to-[#444] dark:from-[#CCC] dark:to-[#FFF] shadow-[2px_2px_5px_rgba(0,0,0,0.4)] origin-bottom z-20 transition-colors" style={{ transform: `translateX(-50%) rotate(${minuteDeg}deg)`, clipPath: 'polygon(50% 0%, 100% 15%, 80% 100%, 20% 100%, 0% 15%)' }} />

            <div className="absolute bottom-1/2 left-1/2 w-0.5 sm:w-[2px] h-14 sm:h-20 bg-[#D32F2F] dark:bg-[#FF5252] shadow-[1px_2px_3px_rgba(0,0,0,0.3)] origin-bottom z-30 transition-colors" style={{ transform: `translateX(-50%) rotate(${secondDeg}deg)`, clipPath: 'polygon(50% 0%, 100% 10%, 100% 100%, 0% 100%, 0% 10%)' }} />

            <div className="absolute top-1/2 left-1/2 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#E0E0E0] dark:bg-[#333] shadow-[0_4px_6px_rgba(0,0,0,0.6)] z-40 -translate-x-1/2 -translate-y-1/2 border-2 border-[#555] dark:border-[#888] transition-colors" />

            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 to-transparent pointer-events-none z-50" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}