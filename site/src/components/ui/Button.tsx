import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import { Link } from 'react-router-dom'

type Variant = 'solid' | 'ghost' | 'dark'
const cls = (v: Variant) => `btn${v === 'ghost' ? ' ghost' : v === 'dark' ? ' dark' : ''}`

export function Button({ variant = 'solid', className = '', ...p }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button type="button" className={`${cls(variant)} ${className}`} {...p} />
}

/** Router link for internal paths, plain anchor for hashes and external URLs. */
export function ButtonLink({ to, variant = 'solid', className = '', ...p }: AnchorHTMLAttributes<HTMLAnchorElement> & { to: string; variant?: Variant }) {
  const internal = to.startsWith('/') && !to.startsWith('//')
  return internal
    ? <Link to={to} className={`${cls(variant)} ${className}`} {...p} />
    : <a href={to} className={`${cls(variant)} ${className}`} {...p} />
}
