import { forwardRef, useState } from 'react'
import { ButtonLink } from '../../components/ui/Button'
import { Img } from '../../components/ui/Img'
import { videos } from '../../data/assets'
import { useReducedMotion } from '../../lib/motion'

const POTS = [
  { id: 'kurma', label: 'Kurma', gloss: 'mild, creamy', pc: 'var(--turmeric)', lt: false },
  { id: 'ketam', label: 'Crab (ketam)', gloss: 'deep red', pc: 'var(--chilli)', lt: true },
  { id: 'ikan', label: 'Fish head (kepala ikan)', gloss: 'sour, spiced', pc: 'var(--leaf)', lt: true },
  { id: 'ayam', label: 'Chicken (ayam)', gloss: 'thick, rich', pc: 'var(--saffron)', lt: false },
]

/** H6 · Banjir (MO-08). Tap pots to ladle kuah over the rice; four pots is a full flood. */
export const H6 = forwardRef<HTMLElement>(function H6(_, ref) {
  const [on, setOn] = useState<string[]>([])
  const reduced = useReducedMotion()
  const names = on.map((id) => POTS.find((p) => p.id === id)!.label.split(' ')[0].toLowerCase())
  const text = on.length === 0 ? 'Plain rice. Tap a pot to start.'
    : on.length === 1 ? `Kuah ${names[0]}.`
    : on.length === 2 ? `Kuah campur: ${names[0]} + ${names[1]}.`
    : 'Banjir! Fully flooded.'
  const flood = [0, 0.35, 0.65, 0.9, 1][on.length]

  return (
    <section ref={ref} id="banjir" data-section="H6" className="sec wrap" aria-label="Banjir: the kuah pour">
      <div className="banjir">
        <div>
          <div className="util">V · Banjir</div>
          <h2>Let the curries flood the rice.</h2>
          <p className="sub">Ask for <i>kuah campur</i>: a ladle of every gravy.</p>
          <p className="lede">Pick your rice, point at your pieces, then ask for the <i>kuah</i> (curry gravy). Regulars ask for it mixed and poured until the rice is flooded. That&apos;s <i>banjir</i>, &ldquo;flood&rdquo;. Tap the pots to ladle.</p>
          <div className="pots" role="group" aria-label="Curry pots">
            {POTS.map((p) => (
              <button key={p.id} type="button" className={`pot${p.lt ? ' lt' : ''}`} style={{ ['--pc' as string]: p.pc }} aria-pressed={on.includes(p.id)}
                onClick={() => setOn((o) => (o.includes(p.id) ? o.filter((x) => x !== p.id) : [...o, p.id]))}>
                <svg viewBox="0 0 30 24" aria-hidden="true"><path d="M2 8h26a13 13 0 0 1-26 0z" fill="currentColor" /><rect x="0" y="6" width="30" height="3" rx="1.5" fill="var(--brass)" /></svg>
                <span>{p.label}<br /><small className="gloss">{p.gloss}</small></span>
              </button>
            ))}
          </div>
          <p className="readout" aria-live="polite">{text}</p>
          <div style={{ display: 'flex', gap: 'var(--space-12)', flexWrap: 'wrap', marginTop: 'var(--space-8)' }}>
            <button type="button" className="btn ghost" onClick={() => setOn([])}>Fresh plate</button>
            <ButtonLink to="/menu#builder">Build your own plate</ButtonLink>
          </div>
          <p style={{ marginTop: 'var(--space-12)' }}><a href={`https://www.youtube.com/watch?v=${videos['VID-03'].youtubeId}`} target="_blank" rel="noreferrer">Watch it poured at Campbell Street (YouTube)</a></p>
        </div>
        <div className="plate-wrap">
          <div className="round" style={{ ['--flood' as string]: flood }}>
            <Img id="IMG-13" alt="A nasi kandar plate: rice soaked in dark curry gravy with fried chicken and vegetables." />
            <div className="flood" aria-hidden="true" style={reduced ? { transition: 'none' } : undefined} />
          </div>
          <p className="gloss" style={{ textAlign: 'center', marginTop: 'var(--space-8)' }}>Representative photo, not Hameediyah&apos;s own dish.</p>
        </div>
      </div>
    </section>
  )
})
