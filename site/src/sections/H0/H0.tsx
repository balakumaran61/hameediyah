import { forwardRef, useEffect, useState } from 'react'
import { gsap, useReducedMotion } from '../../lib/motion'

const KEY = 'ham-preloader-seen'
const seen = () => { try { return sessionStorage.getItem(KEY) === '1' } catch { return false } }

/** H0 · Lighting the stove. Counter 1907 to the current year, then reveals the page. Skippable; not shown for reduced motion or repeat visits. */
export const H0 = forwardRef<HTMLElement>(function H0(_, ref) {
  const reduced = useReducedMotion()
  const [done, setDone] = useState(() => reduced || seen())
  const [yr, setYr] = useState(1907)
  const [p, setP] = useState(0)
  const end = new Date().getFullYear()

  useEffect(() => {
    if (done) return
    const o = { v: 0 }
    document.documentElement.style.overflow = 'hidden'
    const tw = gsap.to(o, {
      v: 1, duration: 2.4, ease: 'power2.inOut',
      onUpdate: () => { setP(o.v); setYr(Math.round(1907 + (end - 1907) * o.v)) },
      onComplete: finish,
    })
    function finish() {
      try { sessionStorage.setItem(KEY, '1') } catch { /* private mode: fine */ }
      document.documentElement.style.overflow = ''
      setDone(true)
    }
    ;(window as unknown as { __preSkip?: () => void }).__preSkip = () => { tw.kill(); finish() }
    return () => { tw.kill(); document.documentElement.style.overflow = '' }
  }, [done, end])

  return (
    <section ref={ref} id="preloader" data-section="H0" aria-label="Hameediyah, since 1907. Loading." hidden={done && undefined}>
      {!done && (
        <div className="pre" role="status" style={{ ['--pre-p' as string]: p }}>
          <div className="util">Lighting the stove</div>
          <div className="yr" aria-hidden="true">{yr}</div>
          <div className="line" aria-hidden="true"><i /></div>
          <p style={{ margin: 0 }}>Malaysia&apos;s oldest nasi kandar.</p>
          <button type="button" className="btn ghost" onClick={() => (window as unknown as { __preSkip: () => void }).__preSkip()}>Skip</button>
        </div>
      )}
    </section>
  )
})
