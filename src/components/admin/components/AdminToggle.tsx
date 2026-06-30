import { motion } from 'framer-motion'

interface AdminToggleProps {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

export default function AdminToggle({ label, checked, onChange }: AdminToggleProps) {
  return (
    <label className="flex items-center justify-between cursor-pointer group py-2">
      <span className="text-sm font-semibold text-gray-400 group-hover:text-gray-300 transition-colors uppercase tracking-wider">{label}</span>
      <div
        className={`relative w-12 h-6 rounded-full transition-colors duration-300 ease-in-out ${
          checked ? 'bg-purple-600' : 'bg-gray-800 border border-white/10'
        }`}
        onClick={() => onChange(!checked)}
      >
        <motion.div
          className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm"
          animate={{ x: checked ? 24 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </div>
    </label>
  )
}
