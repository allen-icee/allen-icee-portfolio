// src/components/admin/components/AdminSidebar.tsx
import { NavLink } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { useAuth } from '../../../hooks/useAuth'

const links = [
  { to: '/admin', label: 'Dashboard', icon: 'lucide:layout-dashboard' },
  { to: '/admin/projects', label: 'Projects', icon: 'lucide:library' },
  { to: '/admin/skills', label: 'Skills', icon: 'lucide:wand-2' },
  { to: '/admin/experience', label: 'Experience', icon: 'lucide:briefcase' },
  { to: '/admin/art', label: 'Art', icon: 'lucide:palette' },
  { to: '/admin/resume-cert', label: 'Resume & Certs', icon: 'lucide:file-text' },
  { to: '/admin/contact', label: 'Contact Info', icon: 'lucide:phone' },
]

export default function AdminSidebar() {
  const { user } = useAuth()

  return (
    <aside className="flex h-full flex-col">
      <div className="border-b border-white/[0.06] px-5 py-5">
        <p className="text-sm font-medium text-white/80">Admin Panel</p>
        <p className="mt-0.5 text-[10px] text-white/30">{user?.email}</p>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4" aria-label="Admin navigation">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/admin'}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                isActive
                  ? 'bg-purple-600/20 text-purple-400'
                  : 'text-white/50 hover:bg-white/[0.04] hover:text-white/70'
              }`
            }
          >
            <Icon icon={link.icon} className="size-4" />
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-white/[0.06] px-5 py-4">
        <NavLink
          to="/"
          className="flex items-center gap-2 text-xs text-white/30 transition-colors hover:text-white/50"
        >
          <Icon icon="lucide:arrow-left" className="size-3" />
          Back to site
        </NavLink>
      </div>
    </aside>
  )
}