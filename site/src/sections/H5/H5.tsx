import { forwardRef, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { HeatMarks } from '../../components/ui/HeatMarks'
import { Img } from '../../components/ui/Img'
import type { ImageId } from '../../data/assets'

interface Chapter { n: string; slug: string; name: string; ms: string; layout: 'a' | 'b' | 'c' | 'd'; story: React.ReactNode; spices: string[]; heat: 1 | 2 | 3 | 4 | 5; img?: ImageId; alt?: string; best: string }

const CHAPTERS: Chapter[] = [
  { n: 'I', slug: 'murtabak', name: 'Murtabak', ms: 'Murtabak', layout: 'a', heat: 2, img: 'IMG-16', alt: 'Golden squares of murtabak with a lemon wedge on a white plate.', spices: ['cumin', 'fennel', 'cardamom'], best: 'kari daging',
    story: <>Folded and seared on the griddle right at the front door. Watch it being made while you queue.</> },
  { n: 'II', slug: 'ayam-bawang', name: 'Chicken with onion', ms: 'Ayam Bawang', layout: 'b', heat: 2, img: 'IMG-22', alt: 'Chicken pieces in a dark, glossy onion gravy on a steel platter.', spices: ['fennel', 'cinnamon', 'clove'], best: 'nasi kandar',
    story: <>Fried chicken left to soak in a slow, sweet onion gravy. The gentlest way into nasi kandar.</> },
  { n: 'III', slug: 'mutton-kurma', name: 'Mutton kurma', ms: 'Kurma Kambing', layout: 'c', heat: 1, img: 'IMG-23', alt: 'Pale, creamy kurma over white rice in a green bowl.', spices: ['cardamom', 'cinnamon', 'star anise'], best: 'biryani rice',
    story: <>Pale, thick and mild. One of the house signatures, and the gentlest curry on the counter.</> },
  { n: 'IV', slug: 'kari-ketam', name: 'Crab curry', ms: 'Kari Ketam', layout: 'd', heat: 4, img: 'IMG-17', alt: 'Crab curry in a white dish: crab pieces in a thick red-orange gravy, with a fork.', spices: ['dried chilli', 'coriander', 'fennel'], best: 'nasi kandar',
    story: <>Whole crab in a deep red kuah, best eaten with your hands.</> },
]

function Vis({ c }: { c: Chapter }) {
  if (!c.img) {
    return (
      <figure className="photo vis">
        <img src={`${import.meta.env.BASE_URL}art/${c.slug === 'ayam-bawang' ? 'ayam-bawang' : 'mutton-kurma'}.svg`} alt={`Illustration of ${c.name}, drawn for this site`} width={400} height={300} loading="lazy" style={{ width: '100%', height: 'auto' }} />
        <figcaption>Illustration, not a photograph. No licensed photo of this dish yet.</figcaption>
      </figure>
    )
  }
  const photo = <Img id={c.img} alt={c.alt} />
  return (
    <figure className="photo vis">
      {c.layout === 'a' ? <div className="round">{photo}</div> : photo}
      <figcaption>Representative photo, not Hameediyah&apos;s own dish.</figcaption>
    </figure>
  )
}

/** H5 · The four signatures (MO-07). Four chapters in four layouts; a swipe deck on mobile. */
export const H5 = forwardRef<HTMLElement>(function H5(_, ref) {
  const deck = useRef<HTMLDivElement>(null)
  const [page, setPage] = useState(1)

  return (
    <section ref={ref} id="signatures" data-section="H5" className="sec wrap" aria-label="The four signatures">
      <div className="util">IV · The four signatures</div>
      <h2>Four plates worth the queue.</h2>
      <p className="sub">The dishes people cross Penang for.</p>
      <p className="lede">Four chapters, four plates. Each one starts with the same masala and ends at the same counter on Campbell Street.</p>
      <div
        className="sigs" ref={deck}
        onScroll={() => { const d = deck.current!; setPage(Math.round(d.scrollLeft / (d.scrollWidth / 4)) + 1) }}
      >
        {CHAPTERS.map((c) => (
          <article key={c.slug} className={`chap ${c.layout}`} aria-label={c.name}>
            <div className="num" aria-hidden="true" data-n={c.n} />
            <Vis c={c} />
            <div>
              <div className="util">Chapter {c.n} · {c.name}</div>
              <h3>{c.name}</h3>
              <i className="gloss">{c.ms}</i>
              <p className="story">{c.story}</p>
              <div className="meta"><HeatMarks level={c.heat} /><span className="util">Heat {c.heat} of 5</span><span className="util">Best with {c.best}</span></div>
              <div className="spchips">{c.spices.map((s) => <a key={s} href="#ritual" title="See it roast in the ritual ↑">{s}</a>)}</div>
              <Link className="btn dark" to={`/menu/${c.slug}`} style={{ marginTop: 'var(--space-16)' }}>Find it on the menu</Link>
            </div>
          </article>
        ))}
      </div>
      <div className="pager" aria-live="polite">{page} / 4 · Swipe for the next plate</div>
    </section>
  )
})
