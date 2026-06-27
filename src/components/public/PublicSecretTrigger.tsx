import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import UIModal from '../ui/UIModal'
import CompButton from '../ui/CompButton'

export default function PublicSecretTrigger() {
  const { user, login } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  const openGateway = useCallback(() => {
    if (user) {
      navigate('/admin')
    } else {
      setIsOpen(true)
    }
  }, [user, navigate])

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'l') {
        e.preventDefault()
        openGateway()
      }
    }

    function catHandler() {
      openGateway()
    }

    window.addEventListener('keydown', handler)
    window.addEventListener('library:open-gate', catHandler)
    return () => {
      window.removeEventListener('keydown', handler)
      window.removeEventListener('library:open-gate', catHandler)
    }
  }, [openGateway])

  useEffect(() => {
    if (!user) return
    setIsOpen(false)
    navigate('/admin')
  }, [user, navigate])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      await login(email, password)
    } catch (err: unknown) {
      const code = (err as { code?: string }).code
      if (code === 'auth/invalid-credential') {
        setError('Invalid email or password.')
      } else if (code === 'auth/user-not-found') {
        setError('No account found with this email.')
      } else if (code === 'auth/wrong-password') {
        setError('Incorrect password.')
      } else if (code === 'auth/too-many-requests') {
        setError('Too many attempts. Please try again later.')
      } else {
        setError('An unexpected error occurred.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  function handleClose() {
    setIsOpen(false)
    setError('')
    setEmail('')
    setPassword('')
  }

  return (
    <UIModal isOpen={isOpen} onClose={handleClose} title="Admin Login">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="secret-email" className="text-sm font-medium text-charcoal/70">
            Email
          </label>
          <input
            id="secret-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-xl border border-charcoal/10 bg-white/60 px-4 py-2.5 text-sm text-charcoal outline-none transition-colors placeholder:text-charcoal/30 focus:border-purple-brand/40 focus:ring-2 focus:ring-purple-brand/20"
            placeholder="you@example.com"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="secret-password" className="text-sm font-medium text-charcoal/70">
            Password
          </label>
          <input
            id="secret-password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-xl border border-charcoal/10 bg-white/60 px-4 py-2.5 text-sm text-charcoal outline-none transition-colors placeholder:text-charcoal/30 focus:border-purple-brand/40 focus:ring-2 focus:ring-purple-brand/20"
            placeholder="••••••••"
          />
        </div>

        {error && (
          <p className="text-sm text-red-500" role="alert">
            {error}
          </p>
        )}

        <CompButton
          type="submit"
          disabled={submitting}
          className="flex w-full items-center justify-center rounded-xl bg-purple-brand px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-purple-brand/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? 'Signing in…' : 'Sign In'}
        </CompButton>
      </form>
    </UIModal>
  )
}
