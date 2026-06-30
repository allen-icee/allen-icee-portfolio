// src/components/ui/CompButton.tsx
import { type ButtonHTMLAttributes, type ReactNode } from 'react'

interface CompButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  children: ReactNode
}

export default function CompButton({
  children,
  ...props
}: CompButtonProps) {
  return (
    <button {...props}>
      {children}
    </button>
  )
}