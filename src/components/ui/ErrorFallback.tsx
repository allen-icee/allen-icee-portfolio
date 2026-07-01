import type { FallbackProps } from 'react-error-boundary'
import { Icon } from '@iconify/react'

export default function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black p-4 text-center">
      <div className="flex max-w-md flex-col items-center gap-6 rounded-2xl border border-red-500/20 bg-red-950/20 p-8 shadow-2xl">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20 text-red-500">
          <Icon icon="lucide:alert-triangle" className="h-8 w-8" />
        </div>
        
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-white">Something went wrong</h1>
          <p className="text-sm text-gray-400">
            We've encountered an unexpected error. Please try again or return home.
          </p>
        </div>

        {import.meta.env.DEV && (
          <div className="w-full rounded-lg bg-black/50 p-4 text-left">
            <p className="text-xs font-mono text-red-400 break-words">
              {(error as Error).message || String(error)}
            </p>
          </div>
        )}

        <div className="flex w-full flex-col gap-3 sm:flex-row">
          <button
            onClick={resetErrorBoundary}
            className="flex-1 rounded-xl bg-purple-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-purple-500"
          >
            Try Again
          </button>
          <a
            href="/"
            className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            Return Home
          </a>
        </div>
      </div>
    </div>
  )
}
