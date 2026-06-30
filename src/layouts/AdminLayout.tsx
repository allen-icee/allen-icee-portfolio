import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Icon } from '@iconify/react'
import AdminSidebar from '../components/admin/components/AdminSidebar'
import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router-dom'

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>
  }

  if (!user) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-gray-100">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-60 shrink-0 flex-col border-r border-white/[0.06] bg-gray-950 backdrop-blur-xl transition-transform duration-200 md:static md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <AdminSidebar />
      </aside>

      {/* Main */}
      <main className="relative min-h-screen flex-1 overflow-auto p-4 pt-14 md:p-8 md:pt-8">
        {/* Mobile menu button */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed left-4 top-4 z-20 flex size-9 items-center justify-center rounded-xl bg-gray-800 text-white/60 shadow-md md:hidden"
          aria-label="Open menu"
        >
          <Icon icon="lucide:menu" className="size-5" />
        </button>

        <Outlet />
      </main>
    </div>
  )
}
