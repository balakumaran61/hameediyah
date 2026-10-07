import { forwardRef, useEffect, useRef } from 'react'
import { Img } from '../../components/ui/Img'
import { gsap, ScrollTrigger, useReducedMotion } from '../../lib/motion'

/** H2 · The voyage. MO-04: scroll draws the route and sails the ship. Reduced motion: full route drawn. */
export const H2 = forwardRef<HTMLElement>(function H2(_, ref) {
  const root = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const path = root.current!.querySelector<SVGPathElement>('.route')!
    const ship = root.current!.querySelector<SVGGElement>('.ship')!
    const len = path.getTotalLength()
    const place = (p: number) => {
      const pt = path.getPointAtLength(len * p)
      const ahead = path.getPointAtLength(Math.min(len, len * p + 2))
      ship.setAttribute('transform', `translate(${pt.x} ${pt.y}) rotate(${(Math.atan2(ahead.y - pt.y, ahead.x - pt.x) * 180) / Math.PI})`)
    }
    path.style.strokeDasharray = String(len)
    if (reduced) { path.style.strokeDashoffset = '0'; place(1); return }
    path.style.strokeDashoffset = String(len)
    place(0)
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: root.current, start: 'top 70%', end: 'bottom 60%', scrub: true,
        onUpdate: (s) => { path.style.strokeDashoffset = String(len * (1 - s.progress)); place(s.progress) },
      })
    }, root)
    return () => { ctx.revert(); path.style.strokeDashoffset = '0' }
  }, [reduced])

  return (
    <section ref={ref} id="story" data-section="H2" className="sec wrap" aria-label="The voyage">
      <div className="util">I · The voyage</div>
      <h2>A family sails for Penang.</h2>
      <p className="sub">From the Kerala coast to the Penang docks, early 1900s.</p>
      <p className="lede">Before there was a restaurant, there was a family and its recipes for Indian Muslim cooking. They sailed around the tip of India, crossed the Bay of Bengal and settled on Campbell Street.</p>
      <div className="voyage" ref={root}>
        <div className="map">
          <svg viewBox="0 0 400 520" role="img" aria-label="Route from the Kerala coast, around southern India and across the Bay of Bengal, to Penang">
            <path className="route-bg" d="M70 40 C 60 160, 330 170, 250 280 S 120 400, 300 480" />
            <path className="route" d="M70 40 C 60 160, 330 170, 250 280 S 120 400, 300 480" />
            <circle className="port" cx="70" cy="40" r="9" /><text className="portlabel" x="88" y="44">Kerala coast</text>
            <circle className="port" cx="300" cy="480" r="9" /><text className="portlabel" x="190" y="510">Penang</text>
            <g className="ship"><path d="M-14 -5h28l-6 10h-16z" fill="var(--cinnamon)" /><path d="M0 -5V-24l12 15z" fill="var(--ivory)" stroke="var(--brass)" /></g>
          </svg>
          <p className="gloss">Scroll to sail. Route is indicative.</p>
        </div>
        <div>
          <article className="beat panel"><div className="n">1 · The family</div><h3>The family</h3>
            <p>The Rawthers were a family of cooks from Kerala, on India&apos;s south-west coast. They carried their recipes with them, and the family still cooks from them today.</p>
            <figure className="photo"><Img id="R-anc-1" /><figcaption>K.M.P. Mohamed Sheriff Rawther (1886–1963), patriarch of the family. From the family archive.</figcaption></figure></article>
          <article className="beat panel"><div className="n">2 · The crossing</div><h3>The crossing</h3>
            <p>Early in the 1900s M. Mohamed Thamby Rawther sailed east with his three sons, Seeni Packeer, Packeer Mohamed and Abdul Ghaney.</p></article>
          <article className="beat panel"><div className="n">3 · The docks</div><h3>The docks</h3>
            <p>They came ashore at Penang&apos;s docks at Weld Quay and made their home on Lebuh Campbell.</p>
            <figure className="photo"><Img id="IMG-06" alt="Sepia photograph of Weld Quay around 1910: warehouses, a tramline and boats along the waterfront." /><figcaption>Weld Quay, c.1910. Public domain.</figcaption></figure></article>
          <article className="beat panel"><div className="n">4 · Feeding the docks</div><h3>Feeding the docks</h3>
            <p>Soon the family were cooking, and selling on foot. They carried rice and curry door to door, to the docks, to Pitt Street and as far as Tanjung Tokong.</p>
            <figure className="photo"><Img id="IMG-09" alt="The Kapitan Keling Mosque on Pitt Street around 1900, with its arched verandah and minaret." /><figcaption>Pitt Street (now Jalan Kapitan Keling), c.1900.</figcaption></figure></article>
        </div>
      </div>
    </section>
  )
})
