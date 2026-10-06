import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

const QUERY = '(prefers-reduced-motion: reduce)'

/** True when the user asks for reduced motion. Live: re-renders when the setting changes. */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => typeof window !== 'undefined' && window.matchMedia(QUERY).matches)
  useEffect(() => {
    const mq = window.matchMedia(QUERY)
    const on = () => setReduced(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return reduced
}

let lenis: Lenis | null = null

/** The single Lenis instance, or null when motion is reduced. */
export const getLenis = () => lenis

/** Starts Lenis synced with ScrollTrigger. Returns a cleanup. One call, from <MotionRoot/>. */
export function startSmoothScroll(): () => void {
  lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
  const tick = (t: number) => lenis?.raf(t * 1000)
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)
  return () => {
    gsap.ticker.remove(tick)
    lenis?.destroy()
    lenis = null
  }
}

/** Scrolls to an element or y offset, using Lenis when on and a jump when reduced. */
export function scrollToTarget(target: string | HTMLElement | number) {
  if (lenis) lenis.scrollTo(target, { duration: 1.2 })
  else if (typeof target === 'number') window.scrollTo(0, target)
  else {
    const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target
    el?.scrollIntoView()
  }
}

/**
 * Convention for every section: run all GSAP work inside gsap.context so it can be reverted.
 *   useEffect(() => { const ctx = gsap.context(() => {...}, rootRef); return () => ctx.revert() }, [])
 * and skip decorative tweens when useReducedMotion() is true.
 */
export { gsap, ScrollTrigger }

/** The roast-heat ramp (MO-02): background and ink for each of the 5 steps, from tokens.css. */
export const HEAT_STEPS = [1, 2, 3, 4, 5] as const

/** Writes --roast-bg, --roast-ink, --roast-p on <html> for a scroll progress p in 0..1. */
export function applyRoast(p: number, reduced: boolean) {
  const pos = Math.min(Math.max(p, 0), 1) * (HEAT_STEPS.length - 1)
  const root = document.documentElement.style
  root.setProperty('--roast-p', p.toFixed(4))
  if (reduced) {
    // no blending: snap to the nearest step (section colours only)
    const n = Math.round(pos) + 1
    root.setProperty('--roast-bg', `var(--heat-${n})`)
    root.setProperty('--roast-ink', `var(--heat-${n}-ink)`)
    root.setProperty('--roast-head', n >= 4 ? 'var(--turmeric)' : n === 3 ? 'var(--ember)' : 'var(--cinnamon)')
    return
  }
  const i = Math.min(Math.floor(pos), HEAT_STEPS.length - 2)
  const mix = Math.round((pos - i) * 100)
  root.setProperty('--roast-bg', `color-mix(in srgb, var(--heat-${i + 2}) ${mix}%, var(--heat-${i + 1}))`)
  // text flips ember -> ivory at the midpoint between steps 3 and 4, where contrast is equal
  root.setProperty('--roast-ink', pos >= 2.5 ? 'var(--heat-5-ink)' : 'var(--heat-1-ink)')
  // headings: cinnamon on pale steps, ember on the mid-roast band, turmeric on the dark steps.
  // The blend has a short mid-band (about pos 2.3 to 2.7) where either ink is near 3:1; reduced motion snaps and avoids it.
  root.setProperty('--roast-head', pos >= 2.6 ? 'var(--turmeric)' : pos >= 1.5 ? 'var(--ember)' : 'var(--cinnamon)')
}
