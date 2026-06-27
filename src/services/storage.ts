import { ref, uploadBytesResumable, getDownloadURL, deleteObject, listAll } from 'firebase/storage'
import { storage } from './firebaseConfig'

const IMAGES_PREFIX = 'images'

export interface StoredImage {
  name: string
  url: string
  fullPath: string
}

export async function uploadImage(blob: Blob, fileName: string, onProgress?: (pct: number) => void): Promise<StoredImage> {
  const storageRef = ref(storage, `${IMAGES_PREFIX}/${fileName}`)
  const task = uploadBytesResumable(storageRef, blob)

  return new Promise((resolve, reject) => {
    task.on(
      'state_changed',
      (snap) => {
        onProgress?.(Math.round((snap.bytesTransferred / snap.totalBytes) * 100))
      },
      reject,
      async () => {
        const url = await getDownloadURL(task.snapshot.ref)
        resolve({ name: fileName, url, fullPath: task.snapshot.ref.fullPath })
      }
    )
  })
}

export async function listImages(): Promise<StoredImage[]> {
  const storageRef = ref(storage, IMAGES_PREFIX)
  const result = await listAll(storageRef)

  const items = await Promise.all(
    result.items.map(async (itemRef) => {
      const url = await getDownloadURL(itemRef)
      return { name: itemRef.name, url, fullPath: itemRef.fullPath }
    })
  )

  return items.sort((a, b) => b.name.localeCompare(a.name))
}

export async function deleteImage(fullPath: string): Promise<void> {
  await deleteObject(ref(storage, fullPath))
}
