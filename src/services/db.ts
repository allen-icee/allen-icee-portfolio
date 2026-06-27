import { db } from './firebaseConfig'
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  type FirestoreDataConverter,
  type DocumentData,
} from 'firebase/firestore'

const COLLECTIONS = {
  projects: 'projects',
  experience: 'experience',
  skills: 'skills',
  artworks: 'artworks',
  library: 'library',
} as const

function converter<T extends DocumentData>(): FirestoreDataConverter<T> {
  return {
    toFirestore(data: T) { return data },
    fromFirestore(snap) { return snap.data() as T },
  }
}

async function getAll<T extends DocumentData>(collectionName: string): Promise<(T & { id: string })[]> {
  const ref = collection(db, collectionName).withConverter(converter<T>())
  const snapshot = await getDocs(ref)
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as T & { id: string }))
}

async function getById<T extends DocumentData>(collectionName: string, id: string): Promise<(T & { id: string }) | null> {
  const ref = doc(db, collectionName, id).withConverter(converter<T>())
  const snap = await getDoc(ref)
  if (!snap.exists()) return null
  return { id: snap.id, ...snap.data() } as T & { id: string }
}

async function create<T extends DocumentData>(collectionName: string, data: T): Promise<string> {
  const ref = collection(db, collectionName).withConverter(converter<T>())
  const docRef = await addDoc(ref, data)
  return docRef.id
}

async function updateItem<T extends DocumentData>(collectionName: string, id: string, data: Partial<T>): Promise<void> {
  const ref = doc(db, collectionName, id).withConverter(converter<T>())
  await updateDoc(ref, data as Record<string, unknown>)
}

async function removeItem(collectionName: string, id: string): Promise<void> {
  await deleteDoc(doc(db, collectionName, id))
}

export { COLLECTIONS, getAll, getById, create, updateItem as update, removeItem as remove }
