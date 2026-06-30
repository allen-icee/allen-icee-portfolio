import { useAuth } from '../../hooks/useAuth'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../../services/firebaseConfig'

export default function AdminDashboard() {
  const { user } = useAuth()
  const [visitorCount, setVisitorCount] = useState<number>(0)

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'stats', 'visitors'), (doc) => {
      if (doc.exists()) {
        setVisitorCount(doc.data().count || 0)
      }
    })
    return () => unsub()
  }, [])

  const quickActions = [
    { label: 'Add Project', to: '/admin/projects', icon: 'lucide:folder-plus' },
    { label: 'Update Resume', to: '/admin/resume-cert', icon: 'lucide:file-up' },
    { label: 'Manage Skills', to: '/admin/skills', icon: 'lucide:wand-2' },
    { label: 'Edit Contact Info', to: '/admin/contact', icon: 'lucide:contact' },
  ]

  return (
    <div className="flex flex-col gap-8 max-w-5xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-white">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-900/50 border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-gray-400 text-sm">You are logged in as <span className="text-purple-400 font-medium">{user?.email}</span></p>
          </div>
          <div className="mt-8 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">System Status</span>
            <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              All Systems Operational
            </span>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-900/20 to-purple-600/10 border border-purple-500/20 rounded-2xl p-6 flex flex-col justify-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
              <Icon icon="lucide:users" className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-purple-200/60 mb-1">Total Visitors</p>
              <h3 className="text-3xl font-black text-white tracking-tight">{visitorCount.toLocaleString()}</h3>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.to}
              to={action.to}
              className="flex flex-col items-center justify-center gap-3 bg-gray-900/40 border border-white/5 rounded-2xl p-6 hover:bg-white/5 transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-purple-400 group-hover:bg-purple-500/20 transition-colors">
                <Icon icon={action.icon} className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}