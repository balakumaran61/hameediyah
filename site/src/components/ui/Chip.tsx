import type { ButtonHTMLAttributes } from 'react'

/** Toggle chip. Pass `pressed` for filters; omit for a plain label button. */
export function Chip({ pressed, className = '', ...p }: ButtonHTMLAttributes<HTMLButtonElement> & { pressed?: boolean }) {
  return <button type="button" className={`chip ${className}`} aria-pressed={pressed} {...p} />
}
