import { forwardRef, useEffect, useRef } from 'react'
import { ButtonLink } from '../../components/ui/Button'
import { Img } from '../../components/ui/Img'
import { gsap, scrollToTarget, useReducedMotion } from '../../lib/motion'

/** H1 · Hero. MO-03: the pole sways with the cursor; steam rises from the pots. */
export const H1 = forwardRef<HTMLElement>(function H1(_, ref) {
  const pole = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !pole.current) return
    const rot = gsap.quickTo(pole.current, 'rotation', { duration: 0.8, ease: 'power3.out' })
    const move = (e: PointerEvent) => rot(((e.clientX / window.innerWidth) - 0.5) * 8)
    window.addEventListener('pointermove', move, { passive: true })
    // touch devices: a slow idle sway so the pole is alive without tilt permission
    const idle = window.matchMedia('(pointer: coarse)').matches
      ? gsap.to(pole.current, { rotation: 3, duration: 2.4, yoyo: true, repeat: -1, ease: 'sine.inOut' })
      : null
    return () => { window.removeEventListener('pointermove', move); idle?.kill() }
  }, [reduced])

  return (
    <section ref={ref} id="hero" data-section="H1" className="wrap" aria-label="Hero">
      <div className="hero">
        <div>
          <div className="util">Since 1907 · Lebuh Campbell, Penang</div>
          <h1>Seven generations. <em>One pole</em> that never rested.</h1>
          <p className="sub">Malaysia&apos;s oldest nasi kandar, Lebuh Campbell, Penang.</p>
          <p className="lede">In 1907 a spice trader&apos;s family carried rice and curry across a field on Campbell Street, two baskets balanced on one pole. That pole gave <i>nasi kandar</i> its name. The family has kept the pots full ever since.</p>
          <div className="ctas">
            <a className="btn" href="#story" onClick={(e) => { e.preventDefault(); scrollToTarget('#story') }}>Begin the journey</a>
            <ButtonLink to="/menu" variant="ghost">See the menu</ButtonLink>
          </div>
          <div className="proof">Malaysia&apos;s oldest nasi kandar restaurant · Malaysia Book of Records, 2020</div>
          <p className="hint">Move your cursor. The pole keeps its balance.</p>
        </div>
        <div className="stage">
          <div className="polesvg" ref={pole} aria-hidden="true">
            <svg viewBox="0 0 600 150" preserveAspectRatio="none">
              <defs><linearGradient id="pf" x1="0" x2="1"><stop offset="0" stopColor="var(--brass)" /><stop offset=".3" stopColor="var(--turmeric)" /><stop offset=".55" stopColor="var(--brass)" /><stop offset="1" stopColor="var(--cinnamon)" /></linearGradient></defs>
              <rect x="0" y="22" width="600" height="9" rx="4.5" fill="url(#pf)" />
              <line x1="40" y1="31" x2="40" y2="92" stroke="var(--brass)" strokeWidth="3" /><line x1="560" y1="31" x2="560" y2="92" stroke="var(--brass)" strokeWidth="3" />
              <path d="M12 92h56a28 28 0 0 1-56 0z" fill="var(--cinnamon)" /><path d="M532 92h56a28 28 0 0 1-56 0z" fill="var(--cinnamon)" />
            </svg>
            <i className="steam" style={{ left: '5%', top: '30%' }} /><i className="steam" style={{ left: '8%', top: '30%', animationDelay: '1s' }} />
            <i className="steam" style={{ right: '5%', top: '30%', animationDelay: '.5s' }} /><i className="steam" style={{ right: '8%', top: '30%', animationDelay: '1.6s' }} />
          </div>
          <figure className="photo">
            <Img id="IMG-01" eager alt="Hameediyah's yellow-and-green shophouse front on Lebuh Campbell, with diners at the door and a motorbike outside." />
          </figure>
          <div className="stamp"><div><b>1907</b>Lebuh<br />Campbell</div></div>
        </div>
      </div>
    </section>
  )
})
