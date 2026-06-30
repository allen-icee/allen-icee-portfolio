import { useCallback } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAll, create, update, remove } from '../services/db'
import { mockSkills, mockArtworks, mockExperiences } from '../data/portfolioData'
import { MOCK_PROJECTS } from '../data/projectsData'

// ponytail: Firestore-first with mock fallback. Replace mockMaps with real data
// once Firebase env vars are configured and collections are seeded.
const mockMaps: Record<string, unknown[]> = {
  projects: MOCK_PROJECTS,
  skills: mockSkills,
  artworks: mockArtworks,
  experience: mockExperiences,
  skillCategories: [
    { id: 'frontend', name: 'Frontend', classification: 'technical' },
    { id: 'backend', name: 'Backend', classification: 'technical' },
    { id: 'database', name: 'Database', classification: 'technical' },
    { id: 'mobile', name: 'Mobile', classification: 'technical' },
    { id: 'desktop', name: 'Desktop', classification: 'technical' },
    { id: 'language', name: 'Language', classification: 'technical' },
    { id: 'design', name: 'Design', classification: 'technical' },
    { id: 'tools', name: 'Tools', classification: 'technical' },
    { id: 'testing', name: 'Testing', classification: 'technical' },
    { id: 'networking', name: 'Networking', classification: 'technical' },
    { id: 'creative', name: 'Creative', classification: 'technical' },
    { id: 'professional', name: 'Professional', classification: 'professional' },
    { id: 'soft-skills', name: 'Soft Skills', classification: 'professional' },
  ],
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
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: [collectionName],
    queryFn: async () => {
      try {
        const data = await getAll<T>(collectionName)
        if (data.length > 0) return data
        
        // Fallback to mocks if empty
        const fallback = mockMaps[collectionName]
        return fallback ? (fallback as (T & { id: string })[]) : []
      } catch (err) {
        console.warn(`Firestore read failed for ${collectionName}, falling back to mocks.`, err)
        const fallback = mockMaps[collectionName]
        return fallback ? (fallback as (T & { id: string })[]) : []
      }
    },
  })

  const addMutation = useMutation({
    mutationFn: async (data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>) => {
      const now = Date.now()
      const payload = { ...data, createdAt: now, updatedAt: now } as unknown as T
      const id = await create<T>(collectionName, payload)
      return { id, ...payload } as T & { id: string }
    },
    onSuccess: (newItem) => {
      queryClient.setQueryData([collectionName], (old: (T & { id: string })[] = []) => [...old, newItem])
    },
  })

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<T> }) => {
      await update<T>(collectionName, id, { ...data, updatedAt: Date.now() } as Partial<T>)
      return { id, data }
    },
    onSuccess: ({ id, data }) => {
      queryClient.setQueryData([collectionName], (old: (T & { id: string })[] = []) =>
        old.map((item) => (item.id === id ? { ...item, ...data, updatedAt: Date.now() } : item))
      )
    },
  })

  const removeMutation = useMutation({
    mutationFn: async (id: string) => {
      await remove(collectionName, id)
      return id
    },
    onSuccess: (id) => {
      queryClient.setQueryData([collectionName], (old: (T & { id: string })[] = []) =>
        old.filter((item) => item.id !== id)
      )
    },
  })

  const addItem = useCallback(
    async (data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>) => {
      await addMutation.mutateAsync(data)
    },
    [addMutation]
  )

  const updateItem = useCallback(
    async (id: string, data: Partial<T>) => {
      await updateMutation.mutateAsync({ id, data })
    },
    [updateMutation]
  )

  const removeItem = useCallback(
    async (id: string) => {
      await removeMutation.mutateAsync(id)
    },
    [removeMutation]
  )

  return {
    items: query.data || [],
    loading: query.isLoading,
    error: query.error instanceof Error ? query.error.message : null,
    addItem,
    updateItem,
    removeItem,
    refresh: query.refetch as any,
  }
}
