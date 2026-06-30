// src/pages/admin/AdminJournalPage.tsx
import { useState, useEffect } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { Icon } from '@iconify/react'
import { db } from '../../services/firebaseConfig'
import { mockJournal } from '../../data/portfolioData'
import AdminRichEditor from '../../components/admin/components/AdminRichEditor'

const JOURNAL_DOC = 'settings'
const JOURNAL_ID = 'journal'

export default function AdminJournalPage() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [signature, setSignature] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const snap = await getDoc(doc(db, JOURNAL_DOC, JOURNAL_ID))
        if (cancelled) return

        if (snap.exists()) {
          const data = snap.data()
          setTitle(data.title ?? '')
          setBody(data.body ?? '')
          setSignature(data.signature ?? '')
        } else {

          setTitle(mockJournal.title)
          setBody(mockJournal.body)
          setSignature(mockJournal.signature)
        }
      } catch {
        if (!cancelled) {
          setTitle(mockJournal.title)
          setBody(mockJournal.body)
          setSignature(mockJournal.signature)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [])

  async function handleSave() {
    setSaving(true)
    setMessage(null)

    try {
      await setDoc(doc(db, JOURNAL_DOC, JOURNAL_ID), { title, body, signature, updatedAt: Date.now() })
      setMessage({ type: 'success', text: 'Journal saved.' })
    } catch {
      setMessage({ type: 'error', text: 'Failed to save. Check Firebase config.' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center gap-3 py-12 text-sm text-white/40">
        <Icon icon="lucide:loader-circle" className="size-4 animate-spin" />
        Loading…
      </div>
    )
  }

  return (
    <div className="max-w-3xl">
      <h1 className="mb-6 text-lg font-medium text-white">The Open Journal</h1>

      <div className="space-y-5">

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-white/50">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-3.5 py-2.5 text-sm text-white outline-none transition-colors focus:border-purple-brand/50 focus:ring-1 focus:ring-purple-brand/30"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-white/50">Body</label>
          <AdminRichEditor
            content={body}
            onChange={setBody}
            placeholder="Dear Visitor…"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-white/50">Signature</label>
          <input
            value={signature}
            onChange={(e) => setSignature(e.target.value)}
            className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-3.5 py-2.5 text-sm text-white outline-none transition-colors focus:border-purple-brand/50 focus:ring-1 focus:ring-purple-brand/30"
          />
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-xl bg-purple-brand/80 px-5 py-2 text-xs font-medium text-white transition-colors hover:bg-purple-brand disabled:opacity-50"
          >
            {saving ? 'Saving…' : 'Save Journal'}
          </button>

          {message && (
            <span
              className={`text-xs ${
                message.type === 'success' ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {message.text}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}