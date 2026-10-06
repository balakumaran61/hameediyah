import { ButtonLink } from '../ui/Button'
import { DIRECTIONS } from './Nav'

/** Sticky bottom bar on mobile only: Menu and Directions. */
export function MobileBar() {
  return (
    <div className="mobile-bar" role="region" aria-label="Quick actions">
      <ButtonLink to="/menu" variant="dark">Menu</ButtonLink>
      <ButtonLink to={DIRECTIONS} target="_blank" rel="noreferrer">Directions</ButtonLink>
      <style>{`
        .mobile-bar{position:fixed;left:0;right:0;bottom:0;z-index:40;display:flex;gap:var(--space-12);padding:var(--space-8) var(--space-16);padding-bottom:calc(var(--space-8) + env(safe-area-inset-bottom));background:color-mix(in srgb,var(--roast-bg) 92%,transparent);backdrop-filter:blur(6px);border-top:1.5px solid var(--brass)}
        .mobile-bar .btn{flex:1}
        @media(min-width:768px){.mobile-bar{display:none}}
      `}</style>
    </div>
  )
}
