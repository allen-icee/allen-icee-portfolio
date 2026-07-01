import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './context/AuthContext'
import { ToastProvider } from './components/admin/components/AdminToast'
import PublicLayout from './layouts/PublicLayout'
import AdminLayout from './layouts/AdminLayout'
import SplashScreen from './components/public/components/SplashScreen'
import { Icon } from '@iconify/react'

const PublicHome = lazy(() => import('./pages/public/PublicHome'))
const PublicProjectDetail = lazy(() => import('./pages/public/PublicProjectDetail'))
const PublicNotFound = lazy(() => import('./pages/public/PublicNotFound'))

const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
const AdminProjectsPage = lazy(() => import('./pages/admin/AdminProjectsPage'))
const AdminSkillsPage = lazy(() => import('./pages/admin/AdminSkillsPage'))
const AdminExperiencePage = lazy(() => import('./pages/admin/AdminExperiencePage'))
const AdminArtPage = lazy(() => import('./pages/admin/AdminArtPage'))
const AdminResumeCertPage = lazy(() => import('./pages/admin/AdminResumeCertPage'))
const AdminContactPage = lazy(() => import('./pages/admin/AdminContactPage'))

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes cache
      refetchOnWindowFocus: false,
    },
  },
})

// Simple generic loader that doesn't cause drastic layout shifts
function PageLoader() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-warm-paper dark:bg-surface text-charcoal/40 dark:text-white/40">
      <Icon icon="lucide:loader-2" className="size-6 animate-spin mb-4" />
      <p className="font-sans text-xs tracking-widest uppercase">Loading...</p>
    </div>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ToastProvider>
          <SplashScreen />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route element={<PublicLayout />}>
                <Route path="/" element={<PublicHome />} />
                <Route path="/project/:id" element={<PublicProjectDetail />} />
              </Route>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="projects" element={<AdminProjectsPage />} />
                <Route path="skills" element={<AdminSkillsPage />} />
                <Route path="experience" element={<AdminExperiencePage />} />
                <Route path="art" element={<AdminArtPage />} />
                <Route path="resume-cert" element={<AdminResumeCertPage />} />
                <Route path="contact" element={<AdminContactPage />} />
              </Route>
              <Route path="*" element={<PublicNotFound />} />
            </Routes>
          </Suspense>
        </ToastProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
