import { useEffect, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { applyRoast, ScrollTrigger, scrollToTarget, startSmoothScroll, useReducedMotion } from '../../lib/motion'

/**
 * One place for global motion: Lenis (off when reduced), the pole progress (MO-01),
 * roast-heat colour (MO-02), and scroll-to-hash on route changes.
 */
export function MotionRoot({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion()
  const { pathname: full, hash } = useLocation()
  // /menu/:dish is the same page: opening a dish must not reset scroll
  const pathname = '/' + full.split('/')[1]

  useEffect(() => {
    const stop = reduced ? () => {} : startSmoothScroll()
    const root = document.documentElement
    const update = () => {
      const max = root.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0
      root.style.setProperty('--pole-p', p.toFixed(4))
      document.querySelector('[data-pole]')?.setAttribute('aria-valuenow', String(Math.round(p * 100)))
      applyRoast(p, reduced)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    const ro = new ResizeObserver(update)
    ro.observe(document.body)
    return () => {
      stop()
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      ro.disconnect()
    }
  }, [reduced, pathname])

  useEffect(() => {
    if (hash) requestAnimationFrame(() => scrollToTarget(hash))
    else window.scrollTo(0, 0)
    ScrollTrigger.refresh()
  }, [pathname, hash])

  return <>{children}</>
}
