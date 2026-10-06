import { forwardRef, useRef, useState } from 'react'

interface Node { year: string; tag: string; text: React.ReactNode }

const NODES: Node[] = [
  { year: 'Early 1900s', tag: 'The founder', text: 'M. Mohamed Thamby Rawther, spice trader from Tamil Nadu, arrives with his sons.' },
  { year: '1907', tag: 'The stall', text: 'Rice and curry sold under a tree in the field on Campbell Street, carried there on a pole.' },
  { year: 'Later', tag: 'Indoors at No. 164', text: 'The stall moves indoors to No. 164 Lebuh Campbell, where it still stands.' },
  { year: '2014', tag: 'Renovated', text: 'Renovated, keeping the yellow-green front and old wall tiles.' },
  { year: '2020', tag: 'On the record', text: 'Named Malaysia’s oldest nasi kandar restaurant by the Malaysia Book of Records.' },
  { year: '2021', tag: 'The pole returns', text: 'Staff carried 250 packets of nasi kandar to people in need, on shoulder poles.' },
  { year: 'Today', tag: 'The family', text: 'Ahamed Seeni Pakir Abdul Shukor runs the restaurant; the next generation works beside him.' },
]

const yearOf = (y: string) => (/^\d{4}$/.test(y) ? Number(y) : y === 'Early 1900s' ? 1905 : y === 'Today' ? new Date().getFullYear() : null)

/** H7 · Seven generations. Drag/scroll along the pole; each node expands; the year counter follows. */
export const H7 = forwardRef<HTMLElement>(function H7(_, ref) {
  const [open, setOpen] = useState<number | null>(0)
  const [year, setYear] = useState(1907)
  const scroller = useRef<HTMLDivElement>(null)

  const onScroll = () => {
    const el = scroller.current!
    const idx = Math.min(NODES.length - 1, Math.round((el.scrollLeft / (el.scrollWidth - el.clientWidth || 1)) * (NODES.length - 1)))
    for (let i = idx; i >= 0; i--) { const y = yearOf(NODES[i].year); if (y) { setYear(y); break } }
  }

  return (
    <section ref={ref} id="legacy" data-section="H7" className="sec wrap" aria-label="Seven generations">
      <div className="util">VI · The family</div>
      <h2>Seven generations at one counter.</h2>
      <p className="sub">From a spice trader&apos;s pole to the Malaysia Book of Records.</p>
      <p className="lede">M. Mohamed Thamby Rawther and his sons started it. For more than a century the family has passed the masala and the counter down. Today Ahamed Seeni Pakir Abdul Shukor runs Hameediyah, with the next generation beside him.</p>
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
      <a className="btn" href="#archive" style={{ marginTop: 'var(--space-16)' }}>Watch the family tell it</a>
    </section>
  )
})
