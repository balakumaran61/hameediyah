import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation } from 'react-router-dom'
import { ProgressPole } from './ProgressPole'
import { ButtonLink } from '../ui/Button'
import { LOGO } from '../../data/realAssets'
import { getLenis, scrollToTarget } from '../../lib/motion'

export const DIRECTIONS = 'https://www.google.com/maps/search/?api=1&query=Hameediyah+Restaurant+164A+Lebuh+Campbell+George+Town+Penang'
export const PHONE = { href: 'tel:+6042611095', label: '04-261 1095' }

type Key = 'story' | 'family' | 'menu' | 'outlets' | 'events'
const LINKS: { key: Key; to: string; label: string; desc: string }[] = [
  { key: 'story', to: '/#story', label: 'Story', desc: 'From Kerala to Campbell Street, 1907' },
  { key: 'family', to: '/#legacy', label: 'Family', desc: 'Seven generations and the archive' },
  { key: 'menu', to: '/menu', label: 'Menu', desc: 'Every dish on the counter, with photos' },
  { key: 'outlets', to: '/#outlets', label: 'Outlets', desc: 'Six outlets in Penang, Selangor and KL' },
  { key: 'events', to: '/#events', label: 'Events', desc: 'Catering, weddings and private dining' },
]
// Which nav item each home-page section belongs to, in page order
const SECTIONS: [string, Key][] = [
  ['story', 'story'], ['angsana', 'story'], ['ritual', 'story'], ['counter', 'menu'], ['signatures', 'menu'], ['banjir', 'menu'],
  ['legacy', 'family'], ['archive', 'family'], ['visit', 'outlets'], ['outlets', 'outlets'], ['events', 'events'],
]

/** Tracks which nav item matches the part of the home page in view. */
function useActive(pathname: string): Key | null {
  const [active, setActive] = useState<Key | null>(null)
  useEffect(() => {
    if (pathname.startsWith('/menu')) { setActive('menu'); return }
    if (pathname !== '/') { setActive(null); return }
    const pick = () => {
      const line = window.innerHeight * 0.35
      let cur: Key | null = null
      for (const [id, key] of SECTIONS) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) cur = key
      }
      setActive(cur)
    }
    pick()
    window.addEventListener('scroll', pick, { passive: true })
    return () => window.removeEventListener('scroll', pick)
  }, [pathname])
  return active
}

export function Nav() {
  const [open, setOpen] = useState(false)
  const btn = useRef<HTMLButtonElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const { pathname, hash } = useLocation()
  const active = useActive(pathname)

  useEffect(() => setOpen(false), [pathname, hash])

  // Same-page section links: scroll directly, so a second click on the same link still works
  const go = (e: MouseEvent, to: string) => {
    const wasOpen = open
    setOpen(false)
    if (!to.startsWith('/#') || pathname !== '/') return
    e.preventDefault()
    window.history.replaceState(null, '', to)
    // from the overlay, wait until it has closed and smooth scroll is running again
    if (wasOpen) window.setTimeout(() => scrollToTarget(to.slice(1)), 80)
    else scrollToTarget(to.slice(1))
  }

  // Overlay: lock scroll, trap focus, close on Esc, return focus to the button
  useEffect(() => {
    if (!open) return
    const prev = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    getLenis()?.stop()
    panel.current?.querySelector<HTMLElement>('button, a')?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); btn.current?.focus(); return }
      if (e.key !== 'Tab' || !panel.current) return
      const f = [...panel.current.querySelectorAll<HTMLElement>('a, button')]
      const first = f[0], last = f[f.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    window.addEventListener('keydown', onKey)
    return () => { document.documentElement.style.overflow = prev; getLenis()?.start(); window.removeEventListener('keydown', onKey) }
  }, [open])

  const onMenu = pathname.startsWith('/menu')

  return (
    <header className="site-nav">
      <Link to="/" className="brand" onClick={(e) => { if (pathname === '/') { e.preventDefault(); scrollToTarget(0) } }}>
        <img className="logo-img" src={LOGO.src} width={LOGO.width} height={LOGO.height} alt="Hameediyah, established 1907. Oldest nasi kandar in Malaysia." />
      </Link>
      <nav aria-label="Main" className="links">
        {LINKS.map((l) => (
          <Link key={l.key} to={l.to} onClick={(e) => go(e, l.to)} className={`nl${l.key === 'menu' ? ' nl-menu' : ''}${active === l.key ? ' on' : ''}`}
            aria-current={l.key === 'menu' && onMenu ? 'page' : active === l.key ? 'location' : undefined}>{l.label}</Link>
        ))}
        {onMenu
          ? <ButtonLink to="/#outlets" className="pill">Find an outlet</ButtonLink>
          : <ButtonLink to="/menu" className="pill">See the menu</ButtonLink>}
      </nav>
      <button ref={btn} type="button" className="menu-btn" aria-expanded={open} aria-controls="site-nav-panel" aria-label="Open site navigation" onClick={() => setOpen(true)}>
        <span className="burger" aria-hidden="true"><i /><i /><i /></span>
      </button>
      <ProgressPole />
      <style>{`
        .site-nav{position:sticky;top:0;z-index:50;display:flex;align-items:center;justify-content:space-between;gap:var(--space-16);padding:var(--space-12) var(--space-16);background:color-mix(in srgb,var(--roast-bg) 90%,transparent);backdrop-filter:blur(6px)}
        @media(min-width:900px){.site-nav{padding:var(--space-12) var(--space-32)}}
        .brand{text-decoration:none;min-height:44px;display:inline-flex;align-items:center;flex:none}
        .links{display:none;align-items:center;gap:var(--space-4)}
        .nl{position:relative;text-decoration:none;font:600 var(--step-sm) var(--font-utility);min-height:44px;display:inline-flex;align-items:center;padding:0 var(--space-12);border-radius:var(--radius-pill)}
        .nl::after{content:"";position:absolute;left:var(--space-12);right:var(--space-12);bottom:8px;height:3px;border-radius:2px;background:var(--sign-green);transform:scaleX(0);transform-origin:left;transition:transform var(--dur-base) var(--ease-out)}
        .nl:hover::after,.nl.on::after{transform:scaleX(1)}
        .nl-menu{background:var(--sign-black);color:var(--sign-yellow);margin:0 var(--space-4)}
        .nl-menu::after{display:none}
        .nl-menu.on,.nl-menu:hover{box-shadow:inset 0 0 0 2px var(--sign-yellow)}
        .pill{min-height:44px!important;margin-left:var(--space-8)}
        .menu-btn{width:48px;height:48px;border:1.5px solid currentColor;border-radius:50%;background:none;color:inherit;cursor:pointer;display:grid;place-items:center;flex:none}
        @media(min-width:900px){.links{display:flex}.site-nav .menu-btn{display:none}}
        .burger{display:grid;gap:4px}.burger i{display:block;width:20px;height:2px;border-radius:1px;background:currentColor}
        .ovl{position:fixed;inset:0;z-index:90;background:var(--sign-black);color:var(--ivory);display:flex;flex-direction:column;overflow:auto;padding:var(--space-12) var(--space-16) calc(var(--space-24) + env(safe-area-inset-bottom));border-top:6px solid var(--sign-yellow)}
        .ovl-top{display:flex;align-items:center;justify-content:space-between;gap:var(--space-16);margin-bottom:var(--space-24)}
        .ovl-x{display:inline-flex;align-items:center;gap:var(--space-8);min-height:48px;padding:0 var(--space-16);border:1.5px solid var(--ivory);border-radius:var(--radius-pill);background:none;color:var(--ivory);font:600 var(--step-sm) var(--font-utility);cursor:pointer}
        .ovl ul{list-style:none;margin:0;padding:0;display:grid}
        .ovl li a{display:grid;gap:2px;padding:var(--space-12) 0;border-bottom:1px solid color-mix(in srgb,var(--ivory) 18%,transparent);text-decoration:none}
        .ovl li b{font:700 var(--step-xl) var(--font-display);font-variation-settings:var(--roast-end)}
        .ovl li small{font:var(--step-sm) var(--font-utility);opacity:.75}
        .ovl li a[aria-current]{color:var(--sign-yellow)}
        .ovl li a[aria-current] b::after{content:" ●";font-size:.5em;vertical-align:middle;color:var(--sign-green)}
        .ovl-cta{display:grid;gap:var(--space-12);margin-top:var(--space-24)}
        .ovl-cta .btn{width:100%}
        .ovl-cta .ghost{color:var(--ivory)}
      `}</style>
      {open && createPortal(
        <div id="site-nav-panel" className="ovl" ref={panel} role="dialog" aria-modal="true" aria-label="Site navigation">
          <div className="ovl-top">
            <Link to="/" onClick={() => setOpen(false)}><img className="logo-img" src={LOGO.src} width={LOGO.width} height={LOGO.height} alt="Hameediyah home" /></Link>
            <button type="button" className="ovl-x" onClick={() => { setOpen(false); btn.current?.focus() }}>✕ Close</button>
          </div>
          <ul>
            {LINKS.map((l) => (
              <li key={l.key}>
                <Link to={l.to} onClick={(e) => go(e, l.to)} aria-current={(l.key === 'menu' && onMenu) || active === l.key ? 'location' : undefined}>
                  <b>{l.label}</b><small>{l.desc}</small>
                </Link>
              </li>
            ))}
          </ul>
          <div className="ovl-cta">
            <ButtonLink to="/menu" onClick={() => setOpen(false)}>See the food menu</ButtonLink>
            <ButtonLink to={DIRECTIONS} target="_blank" rel="noreferrer" variant="ghost">Directions to 164-A Lebuh Campbell</ButtonLink>
            <a className="btn ghost" href={PHONE.href}>Call {PHONE.label}</a>
          </div>
        </div>
      , document.body)}
    </header>
  )
}
