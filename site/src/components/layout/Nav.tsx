import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation } from 'react-router-dom'
import { ProgressPole } from './ProgressPole'
import { ButtonLink } from '../ui/Button'

export const DIRECTIONS = 'https://www.google.com/maps/search/?api=1&query=164A+Lebuh+Campbell+George+Town+Penang'

const LINKS = [
  { to: '/#story', label: 'Story' },
  { to: '/menu', label: 'Menu' },
  { to: '/#legacy', label: 'Legacy' },
  { to: '/#visit', label: 'Visit' },
]

export function Nav() {
  const [open, setOpen] = useState(false)
  const btn = useRef<HTMLButtonElement>(null)
  const first = useRef<HTMLAnchorElement>(null)
  const { pathname, hash } = useLocation()

  useEffect(() => setOpen(false), [pathname, hash])

  // overlay: lock page scroll, close on Esc, return focus to the button
  useEffect(() => {
    if (!open) return
    const prev = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    first.current?.focus()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); btn.current?.focus() } }
    window.addEventListener('keydown', onKey)
    return () => { document.documentElement.style.overflow = prev; window.removeEventListener('keydown', onKey) }
  }, [open])

  return (
    <header className="site-nav">
      <Link to="/" className="brand">Hameediyah</Link>
      <nav aria-label="Main" className="links">
        {LINKS.map((l) => <Link key={l.label} to={l.to}>{l.label}</Link>)}
        <ButtonLink to={DIRECTIONS} target="_blank" rel="noreferrer" className="pill">Visit 164A</ButtonLink>
      </nav>
      <button ref={btn} type="button" className="menu-btn" aria-expanded={open} aria-controls="overlay" onClick={() => setOpen((o) => !o)}>
        {open ? 'Close' : 'Menu'}
      </button>
      <ProgressPole />
      <style>{`
        .site-nav{position:sticky;top:0;z-index:50;display:flex;align-items:center;justify-content:space-between;gap:var(--space-16);padding:var(--space-12) var(--space-16);background:color-mix(in srgb,var(--roast-bg) 88%,transparent);backdrop-filter:blur(6px)}
        @media(min-width:768px){.site-nav{padding:var(--space-16) var(--space-32)}}
        .brand{font:700 var(--step-lg) var(--font-display);font-variation-settings:var(--roast-end);text-decoration:none;min-height:44px;display:inline-flex;align-items:center}
        .links{display:none;align-items:center;gap:var(--space-24)}
        @media(min-width:768px){.links{display:flex}.menu-btn{display:none}}
        .links a:not(.btn){text-decoration:none;font:600 var(--step-sm) var(--font-utility);min-height:44px;display:inline-flex;align-items:center}
        .links a:not(.btn):hover{text-decoration:underline;text-underline-offset:6px}
        .pill{min-height:40px!important}
        .menu-btn{min-width:44px;min-height:44px;border:1.5px solid currentColor;border-radius:var(--radius-pill);background:none;color:inherit;font:600 var(--step-sm) var(--font-utility);padding:0 var(--space-16);cursor:pointer}
        .overlay{position:fixed;inset:0;top:0;z-index:60;background:var(--ember);color:var(--ivory);display:grid;align-content:center;justify-items:start;gap:var(--space-32);padding:var(--space-32);border:6px solid var(--brass)}
        .overlay ul{list-style:none;margin:0;padding:0}
        .overlay li a{display:block;font:700 var(--step-3xl) var(--font-display);font-variation-settings:var(--roast-end);text-decoration:none;line-height:1.2;min-height:44px}
      `}</style>
      {open && createPortal(
        <div id="overlay" className="overlay" role="dialog" aria-modal="true" aria-label="Site menu">
          <ul>
            {LINKS.map((l, i) => (
              <li key={l.label}><Link ref={i === 0 ? first : undefined} to={l.to}>{l.label}</Link></li>
            ))}
          </ul>
          <ButtonLink to={DIRECTIONS} target="_blank" rel="noreferrer">Directions to 164A</ButtonLink>
        </div>
      , document.body)}
    </header>
  )
}
