// ponytail: client-side image compression via Canvas API.
// Max dimension 1920px, JPEG quality 0.8. Upgrade path: WebP encoding, EXIF stripping.

export interface CompressResult {
  blob: Blob
  fileName: string
  width: number
  height: number
}

export function compressImage(file: File, maxDimension = 1920, quality = 0.8): Promise<CompressResult> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)

    img.onload = () => {
      URL.revokeObjectURL(url)

      let { width, height } = img
      if (width > maxDimension || height > maxDimension) {
        const ratio = Math.min(maxDimension / width, maxDimension / height)
        width = Math.round(width * ratio)
        height = Math.round(height * ratio)
      }

      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        reject(new Error('Canvas context unavailable'))
        return
      }

      ctx.drawImage(img, 0, 0, width, height)

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Compression failed'))
            return
          }
          const ext = file.name.split('.').pop() ?? 'jpg'
          const baseName = file.name.replace(/\.[^.]+$/, '')
          resolve({ blob, fileName: `${baseName}-${Date.now()}.${ext}`, width, height })
        },
        'image/jpeg',
        quality
      )
    }

    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Failed to load image'))
    }

    img.src = url
  })
}
