import { motion } from 'framer-motion'

export function KeeperRecord() {
  return (
    <motion.div
      className="relative w-64 rounded-lg bg-[#EAE0D5] p-5 shadow-[2px_4px_12px_rgba(0,0,0,0.15)] dark:bg-[#D4C3B3] dark:shadow-[2px_4px_12px_rgba(0,0,0,0.4)] border border-[#C8B8A6] dark:border-[#B5A391]"
      whileHover={{ y: -5, scale: 1.02, rotateZ: 1, boxShadow: '4px 8px 20px rgba(0,0,0,0.2)' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Decorative inner border */}
      <div className="absolute inset-1.5 rounded-md border border-[#C8B8A6]/60 dark:border-[#8c6b5d]/30 pointer-events-none" />

      {/* Stamped Header */}
      <div className="mb-4 flex items-center justify-between border-b border-[#C8B8A6]/80 pb-2 dark:border-[#8c6b5d]/40">
        <span className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-[#8B5A2B]/80 dark:text-[#5C3A21]/80">
          Record No. 2846
        </span>
        <span className="font-serif text-sm italic text-[#8B5A2B]/60 dark:text-[#5C3A21]/70">
          2003
        </span>
      </div>

      <h3 className="mb-4 text-center font-serif text-xl font-bold tracking-tight text-[#3E2723] dark:text-[#2D1B15] drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)]">
        Allen Icee Dequiros
      </h3>

      <div className="space-y-3 font-mono text-xs text-[#5D4037] dark:text-[#4E342E]">
        <div className="flex justify-between border-b border-[#C8B8A6]/30 pb-1 border-dashed">
          <span className="opacity-70">Alias</span>
          <span className="font-semibold">Ice</span>
        </div>
        <div className="flex justify-between border-b border-[#C8B8A6]/30 pb-1 border-dashed">
          <span className="opacity-70">Role</span>
          <span className="font-semibold">Alien</span>
        </div>
        <div className="flex justify-between border-b border-[#C8B8A6]/30 pb-1 border-dashed">
          <span className="opacity-70">Gender</span>
          <span className="font-semibold">He/Him</span>
        </div>
        <div className="flex justify-between border-b border-[#C8B8A6]/30 pb-1 border-dashed">
          <span className="opacity-70">Energy Level</span>
          <span className="font-semibold">Battery Saving Mode</span>
        </div>
        <div className="flex justify-between border-b border-[#C8B8A6]/30 pb-1 border-dashed">
          <span className="opacity-70">Current Status</span>
          <span className="font-semibold">Borderline Crazy</span>
        </div>
      </div>

      {/* Wax seal SVG */}
      <div className="absolute -bottom-6 -right-6 flex size-14 items-center justify-center pointer-events-none z-10">
        <img src="/svg/other/melted-wax.svg" alt="Wax Seal" className="w-full h-full object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] dark:drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]" />
      </div>
    </motion.div>
  )
}
