import { forwardRef, useRef, useState } from 'react'
import { Img } from '../../components/ui/Img'
import type { RealId } from '../../data/realAssets'

interface Node { year: string; tag: string; text: React.ReactNode }

// Facts from the Hameediyah company profiles (2022, 2025) and docs/FACTS.md
const NODES: Node[] = [
  { year: 'Early 1900s', tag: 'The family', text: 'M. Mohamed Thamby Rawther and his three sons sail from Kerala and settle on Campbell Street, Penang.' },
  { year: '1907', tag: 'The pole', text: 'They sell rice and curry on foot, two baskets balanced on a kandar pole. The way of selling gives nasi kandar its name.' },
  { year: '1940s', tag: 'Wartime', text: 'Even during the Japanese occupation the pots stay full: soldiers and generals order the beef curry.' },
  { year: '1950s', tag: 'Indoors at 164-A', text: 'After the war, food may be sold in shophouses. The family opens at 164-A Lebuh Campbell, where it still stands.' },
  { year: '1960s–70s', tag: '5,000 tins', text: 'Hameediyah supplies 5,000 tinned portions of beef rendang to American soldiers serving in the Vietnam War.' },
  { year: '2014', tag: 'Renovated', text: 'Renovated in line with Penang’s heritage rules, keeping the yellow-green front and old wall tiles.' },
  { year: '2020', tag: 'On the record', text: 'Named Malaysia’s oldest nasi kandar restaurant by the Malaysia Book of Records.' },
  { year: '2021', tag: 'The pole returns', text: 'Staff carry 250 packets of nasi kandar to people in need, on shoulder poles.' },
  { year: 'Today', tag: 'Six outlets', text: 'Abdul Sukkoor’s sons, Seeni Pakir and Syed Ibrahim, lead the family business, with outlets in Penang, Selangor and Kuala Lumpur.' },
]

const ANCESTORS: { id: RealId; title: string; name: string; years: string }[] = [
  { id: 'R-anc-1', title: 'K.M.P.', name: 'Mohamed Sheriff Rawther', years: '1886–1963' },
  { id: 'R-anc-2', title: 'N.M.S.', name: 'Aboo Backer Rawther', years: '1907–1957' },
  { id: 'R-anc-3', title: 'N.M.P.', name: 'Abdul Hameed Rawther', years: '1912–1966' },
  { id: 'R-anc-4', title: 'N.M.P.', name: 'Abdul Aziz Rawther', years: '1914–1989' },
  { id: 'R-anc-5', title: 'N.M.A.', name: 'Mohamed Mohideen Rawther', years: '1921–1950' },
  { id: 'R-anc-6', title: 'N.M.A.', name: 'Abdul Sukkoor Rawther', years: '1923–1992' },
]

const firstYear = (y: string) => { if (y === 'Early 1900s') return 1905; if (y === 'Today') return new Date().getFullYear(); const m = y.match(/\d{4}/); return m ? Number(m[0]) : null }

/** H7 · Seven generations. The ancestors, a draggable timeline along the pole, and the record. */
export const H7 = forwardRef<HTMLElement>(function H7(_, ref) {
  const [open, setOpen] = useState<number | null>(0)
  const [year, setYear] = useState(1907)
  const scroller = useRef<HTMLDivElement>(null)

  const onScroll = () => {
    const el = scroller.current!
    const idx = Math.min(NODES.length - 1, Math.round((el.scrollLeft / (el.scrollWidth - el.clientWidth || 1)) * (NODES.length - 1)))
    for (let i = idx; i >= 0; i--) { const y = firstYear(NODES[i].year); if (y) { setYear(y); break } }
  }

  return (
    <section ref={ref} id="legacy" data-section="H7" className="sec wrap" aria-label="Seven generations">
      <div className="util">VI · The family</div>
      <h2>Seven generations at one counter.</h2>
      <p className="sub">From a family&apos;s shoulder pole to the Malaysia Book of Records.</p>
      <p className="lede">M. Mohamed Thamby Rawther and his sons started it. For more than a century the Rawther family has passed down the recipes and the counter. Today Abdul Sukkoor&apos;s sons, Seeni Pakir and Syed Ibrahim, lead Hameediyah, with the next generation beside them.</p>

      <ul className="ancestors" aria-label="The Rawther ancestors">
        {ANCESTORS.map((a) => (
          <li key={a.id}>
            <figure className="photo"><Img id={a.id} /></figure>
            <small>{a.title}</small>
            <b>{a.name}</b>
            <span className="util">{a.years}</span>
          </li>
        ))}
      </ul>
      <p className="gloss">Portraits from the family archive.</p>

      <div className="counter" aria-live="polite"><span className="sr-only">Year </span>{year}</div>
      <p className="gloss">Drag or swipe along the pole.</p>
      <div className="tl" ref={scroller} onScroll={onScroll} tabIndex={0} role="region" aria-label="Family timeline, scrollable">
        <ol>
          {NODES.map((n, i) => (
            <li key={i} className="node">
              <button type="button" className="dot" aria-expanded={open === i} aria-label={`${open === i ? 'Hide' : 'Show this chapter'}: ${n.tag}`} onClick={() => setOpen(open === i ? null : i)}>{i + 1}</button>
              <div className="yr">{n.year}</div>
              <b>{n.tag}</b>
              {(open === i) && <p>{n.text}</p>}
            </li>
          ))}
        </ol>
      </div>

      <div className="certs">
        <figure className="photo"><Img id="R-cert-records" /><figcaption>Malaysia Book of Records: oldest nasi kandar restaurant, 7 July 2020.</figcaption></figure>
        <figure className="photo"><Img id="R-cert-heritage" /><figcaption>George Town World Heritage Incorporated: Cultural Continuity Recognition, Platinum status.</figcaption></figure>
      </div>
      <a className="btn" href="#archive" style={{ marginTop: 'var(--space-16)' }}>Open the archive</a>
    </section>
  )
})
