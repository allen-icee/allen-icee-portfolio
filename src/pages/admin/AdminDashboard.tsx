import { useAuth } from '../../hooks/useAuth'

export default function AdminDashboard() {
  const { user, loading } = useAuth()

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {user ? <p>Welcome, {user.email}</p> : <p>Please sign in</p>}
    </div>
  )
}
