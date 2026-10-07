import { useLocation } from 'react-router-dom'
import { ButtonLink } from '../ui/Button'
import { DIRECTIONS, PHONE } from './Nav'

/** Sticky bottom bar on mobile only. Food menu + directions; on the menu page, directions + call. */
export function MobileBar() {
  const onMenu = useLocation().pathname.startsWith('/menu')
  return (
    <div className="mobile-bar" role="region" aria-label="Quick actions">
      {onMenu
        ? <a className="btn dark" href={PHONE.href}>Call {PHONE.label}</a>
        : <ButtonLink to="/menu" variant="dark">Food menu</ButtonLink>}
      <ButtonLink to={DIRECTIONS} target="_blank" rel="noreferrer">Directions</ButtonLink>
      <style>{`
        .mobile-bar{position:fixed;left:0;right:0;bottom:0;z-index:40;display:flex;gap:var(--space-12);padding:var(--space-8) var(--space-16);padding-bottom:calc(var(--space-8) + env(safe-area-inset-bottom));background:color-mix(in srgb,var(--roast-bg) 92%,transparent);backdrop-filter:blur(6px);border-top:1.5px solid var(--brass)}
        .mobile-bar .btn{flex:1}
        @media(min-width:900px){.mobile-bar{display:none}}
        @media(max-width:899px){body{padding-bottom:76px}}
      `}</style>
    </div>
  )
}
