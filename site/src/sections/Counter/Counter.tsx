import { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import { ButtonLink } from '../../components/ui/Button'
import { Img } from '../../components/ui/Img'
import { DISHES } from '../../data/menu'
import type { RealId } from '../../data/realAssets'

const PICKS: { slug: string; img: RealId }[] = [
  { slug: 'murtabak', img: 'R-murtabak' },
  { slug: 'ayam-bawang', img: 'R-ayam-bawang' },
  { slug: 'mutton-kurma', img: 'R-mutton-kurma' },
  { slug: 'ayam-kapitan', img: 'R-ayam-kapitan' },
  { slug: 'mutton-mysore', img: 'R-mutton-mysore' },
  { slug: 'kari-kepala-ikan', img: 'R-kari-kepala-ikan' },
]

/** From the counter: real dishes straight after the hero, so the menu is found in the first scroll. */
export const Counter = forwardRef<HTMLElement>(function Counter(_, ref) {
  return (
    <section ref={ref} id="counter" data-section="counter" className="wrap counter-strip" aria-label="From the counter">
      <div className="cs-head">
        <div>
          <div className="util">From the counter</div>
          <h2>What&apos;s in the pots today.</h2>
        </div>
        <ButtonLink to="/menu">See the full menu · {DISHES.length} dishes</ButtonLink>
      </div>
      <ul className="cs-list">
        {PICKS.map((p) => {
          const d = DISHES.find((x) => x.slug === p.slug)!
          return (
            <li key={p.slug}>
              <Link to={`/menu/${p.slug}`} className="cs-card">
                <span className="cs-img"><Img id={p.img} alt="" /></span>
                <b>{d.en}</b>
                <small>{d.ms}</small>
              </Link>
            </li>
          )
        })}
      </ul>
      <p className="gloss">All photographs from Hameediyah&apos;s kitchen. Order at the counter; prices on the day.</p>
      <style>{`
        .counter-strip{padding-top:var(--space-24);padding-bottom:var(--space-48)}
        .cs-head{display:flex;flex-wrap:wrap;align-items:end;justify-content:space-between;gap:var(--space-16);margin-bottom:var(--space-16)}
        .cs-head h2{font-size:var(--step-2xl);margin-top:var(--space-8)}
        .cs-list{list-style:none;margin:0;padding:0 0 var(--space-8);display:grid;grid-auto-flow:column;grid-auto-columns:minmax(160px,42%);gap:var(--space-12);overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:thin}
        @media(min-width:900px){.cs-list{grid-auto-flow:row;grid-template-columns:repeat(6,1fr);overflow:visible}}
        .cs-list li{scroll-snap-align:start}
        .cs-card{display:grid;gap:2px;text-decoration:none;border-radius:var(--radius-md);padding:var(--space-8);background:color-mix(in srgb,var(--ivory) 70%,transparent);box-shadow:var(--shadow-lift);transition:transform var(--dur-base) var(--ease-out)}
        .cs-card:hover{transform:translateY(-4px)}
        .cs-img{display:block;border-radius:var(--radius-sm);overflow:hidden;background:var(--sign-yellow);aspect-ratio:3/2;margin-bottom:var(--space-8)}
        .cs-img img{width:100%;height:100%!important;object-fit:cover;display:block}
        .cs-card b{font:600 var(--step-base) / 1.2 var(--font-display);font-variation-settings:var(--roast-end)}
        .cs-card small{font:var(--step-xs) var(--font-utility);opacity:.8}
      `}</style>
    </section>
  )
})
