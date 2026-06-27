import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import PublicLayout from './layouts/PublicLayout'
import AdminLayout from './layouts/AdminLayout'
import PublicHome from './pages/public/PublicHome'
import PublicProjectDetail from './pages/public/PublicProjectDetail'
import PublicNotFound from './pages/public/PublicNotFound'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminJournalPage from './pages/admin/AdminJournalPage'
import AdminProjectsPage from './pages/admin/AdminProjectsPage'
import AdminSkillsPage from './pages/admin/AdminSkillsPage'
import AdminExperiencePage from './pages/admin/AdminExperiencePage'
import AdminArtPage from './pages/admin/AdminArtPage'
import AdminMediaPage from './pages/admin/AdminMediaPage'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<PublicHome />} />
          <Route path="/project/:id" element={<PublicProjectDetail />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="journal" element={<AdminJournalPage />} />
          <Route path="projects" element={<AdminProjectsPage />} />
          <Route path="skills" element={<AdminSkillsPage />} />
          <Route path="experience" element={<AdminExperiencePage />} />
          <Route path="art" element={<AdminArtPage />} />
          <Route path="media" element={<AdminMediaPage />} />
        </Route>
        <Route path="*" element={<PublicNotFound />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
