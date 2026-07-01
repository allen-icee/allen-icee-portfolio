import { ref, uploadBytesResumable, getDownloadURL, deleteObject, listAll } from 'firebase/storage'
import { storage } from './firebaseConfig'
import imageCompression from 'browser-image-compression'

const IMAGES_PREFIX = 'images'

export interface StoredImage {
  name: string
  url: string
  fullPath: string
}

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'application/pdf'
]

export function validateFile(file: File | Blob) {
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('File size exceeds the 5MB limit (even after compression). Please choose a smaller file.')
  }
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    throw new Error('Invalid file type. Only JPEG, PNG, WEBP, GIF, and PDF are allowed.')
  }
}

export async function uploadImage(blob: Blob, fileName: string, onProgress?: (pct: number) => void): Promise<StoredImage> {
  let finalBlob = blob
  let finalFileName = fileName

  // Compress JPEGs, PNGs, and WEBPs (Skip PDFs and GIFs)
  if (blob.type.startsWith('image/') && blob.type !== 'image/gif') {
    const fileToCompress = blob instanceof File ? blob : new File([blob], fileName, { type: blob.type })
    
    try {
      const options = {
        maxSizeMB: 1.5,
        maxWidthOrHeight: 2048,
        useWebWorker: true,
        fileType: 'image/webp' as const
      }
      
      const compressedFile = await imageCompression(fileToCompress, options)
      finalBlob = compressedFile
      
      // Update extension to .webp since we converted it
      if (finalFileName.includes('.')) {
        finalFileName = finalFileName.substring(0, finalFileName.lastIndexOf('.')) + '.webp'
      } else {
        finalFileName += '.webp'
      }
    } catch (error) {
      console.warn('Image compression failed, falling back to original blob', error)
    }
  }

  validateFile(finalBlob)
  const storageRef = ref(storage, `${IMAGES_PREFIX}/${finalFileName}`)
  const task = uploadBytesResumable(storageRef, finalBlob)

  return new Promise((resolve, reject) => {
    task.on(
      'state_changed',
      (snap) => {
        onProgress?.(Math.round((snap.bytesTransferred / snap.totalBytes) * 100))
      },
      reject,
      async () => {
        const url = await getDownloadURL(task.snapshot.ref)
        resolve({ name: finalFileName, url, fullPath: task.snapshot.ref.fullPath })
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
