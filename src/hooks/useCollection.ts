import { useState, useEffect, useCallback } from 'react'
import { getAll, create, update, remove } from '../services/db'
import { mockProjects, mockSkills, mockArtworks } from '../utils/mockData'

// ponytail: Firestore-first with mock fallback. Replace mockMaps with real data
// once Firebase env vars are configured and collections are seeded.
const mockMaps: Record<string, unknown[]> = {
  projects: mockProjects,
  skills: mockSkills,
  artworks: mockArtworks,
}

interface UseCollectionResult<T> {
  items: (T & { id: string })[]
  loading: boolean
  error: string | null
  addItem: (data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  updateItem: (id: string, data: Partial<T>) => Promise<void>
  removeItem: (id: string) => Promise<void>
  refresh: () => void
}

export function useCollection<T extends { createdAt?: number; updatedAt?: number }>(
  collectionName: string
): UseCollectionResult<T> {
  const [items, setItems] = useState<(T & { id: string })[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [revision, setRevision] = useState(0)

  const refresh = useCallback(() => setRevision((r) => r + 1), [])

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)

      try {
        const data = await getAll<T>(collectionName)
        if (cancelled) return

        if (data.length > 0) {
          setItems(data)
        } else {
          // ponytail: fall back to mocks when Firestore is empty / not configured
          const fallback = mockMaps[collectionName]
          if (fallback) {
            setItems(fallback as (T & { id: string })[])
          } else {
            setItems([])
          }
        }
      } catch {
        if (cancelled) return
        const fallback = mockMaps[collectionName]
        if (fallback) {
          setItems(fallback as (T & { id: string })[])
        } else {
          setItems([])
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [collectionName, revision])

  const addItem = useCallback(async (data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = Date.now()
    const payload = { ...data, createdAt: now, updatedAt: now } as unknown as T
    const id = await create<T>(collectionName, payload)
    setItems((prev) => [...prev, { id, ...payload } as T & { id: string }])
  }, [collectionName])

  const updateItem = useCallback(async (id: string, data: Partial<T>) => {
    await update<T>(collectionName, id, { ...data, updatedAt: Date.now() } as Partial<T>)
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...data, updatedAt: Date.now() } : item)))
  }, [collectionName])

  const removeItem = useCallback(async (id: string) => {
    await remove(collectionName, id)
    setItems((prev) => prev.filter((item) => item.id !== id))
  }, [collectionName])

  return { items, loading, error, addItem, updateItem, removeItem, refresh }
}
