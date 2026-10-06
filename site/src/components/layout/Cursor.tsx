import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../../lib/motion'

/** MO-11: custom cursor on pointer devices. Grows over interactive elements. Off for reduced motion. */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  useEffect(() => {
    if (reduced || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const el = ref.current!
    const move = (e: PointerEvent) => {
      el.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      el.classList.toggle('big', !!(e.target as HTMLElement).closest('a,button,[role=button],input,select,summary'))
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [reduced])
  if (reduced) return null
  return <div ref={ref} className="cursor" aria-hidden="true" />
}
