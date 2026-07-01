import { useState } from 'react'
import type { ImgHTMLAttributes } from 'react'

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  skeletonClassName?: string
}

export default function OptimizedImage({ className, skeletonClassName = '', alt, src, ...props }: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(false)

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Skeleton loader */}
      {!isLoaded && !error && (
        <div className={`absolute inset-0 bg-white/5 animate-pulse ${skeletonClassName}`} />
      )}
      
      {/* Fallback for error state */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/5 text-white/30 text-xs">
          Image Failed
        </div>
      )}

      {/* Actual Image */}
      {src && !error && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => { setIsLoaded(true); setError(true); }}
          className={`w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
          {...props}
        />
      )}
    </div>
  )
}
