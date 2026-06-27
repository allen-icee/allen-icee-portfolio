import { type ButtonHTMLAttributes, type ReactNode } from 'react'

interface CompButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  children: ReactNode
}

export default function CompButton({
  variant = 'primary',
  children,
  ...props
}: CompButtonProps) {
  return (
    <button {...props}>
      {children}
    </button>
  )
}
