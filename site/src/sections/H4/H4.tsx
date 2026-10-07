import { Img } from '../../components/ui/Img'
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import { ButtonLink } from '../../components/ui/Button'
import { useReducedMotion } from '../../lib/motion'

const SPICES = [
  { id: 'cumin', en: 'Cumin', ms: 'jintan putih', colour: 'var(--turmeric)' },
  { id: 'fennel', en: 'Fennel', ms: 'jintan manis', colour: 'var(--lime)' },
  { id: 'cardamom', en: 'Cardamom', ms: 'buah pelaga', colour: 'var(--leaf)' },
  { id: 'clove', en: 'Clove', ms: 'bunga cengkih', colour: 'var(--saffron)' },
  { id: 'cinnamon', en: 'Cinnamon', ms: 'kayu manis', colour: 'var(--brass)' },
  { id: 'coriander', en: 'Coriander', ms: 'ketumbar', colour: 'var(--lime)' },
  { id: 'staranise', en: 'Star anise', ms: 'bunga lawang', colour: 'var(--cinnamon)' },
  { id: 'chilli', en: 'Chilli', ms: 'cili kering', colour: 'var(--chilli)' },
] as const

const STEPS = ['Choose whole spices.', 'Add them to the kuali.', 'Roast slowly until they darken.', 'Grind and mix into the masala.']

/** H4 · The roasting ritual (MO-06). Tap / drag / Enter to add spices; hold the button (or Space) to roast. */
export const H4 = forwardRef<HTMLElement>(function H4(_, ref) {
  const reduced = useReducedMotion()
  const [added, setAdded] = useState<string[]>([])
  const [roast, setRoast] = useState(0)
  const [holding, setHolding] = useState(false)
  const [msg, setMsg] = useState('Tap a spice to add it.')
  const raf = useRef(0)
  const roastRef = useRef(0)

  const toggle = useCallback((id: string) => {
    setAdded((a) => {
      const has = a.includes(id)
      const next = has ? a.filter((x) => x !== id) : [...a, id]
      const s = SPICES.find((x) => x.id === id)!
      setMsg(`${s.en} ${has ? 'removed' : 'added'}. ${next.length} of 8 spices in the kuali.`)
      return next
    })
  }, [])

  const stop = useCallback(() => { cancelAnimationFrame(raf.current); setHolding(false) }, [])
  const start = useCallback(() => {
    if (added.length === 0) { setMsg('Add at least one spice first.'); return }
    setHolding(true)
    let last = performance.now()
    const tick = (t: number) => {
      roastRef.current = Math.min(1, roastRef.current + (t - last) / 5000)
      last = t
      setRoast(roastRef.current)
      if (roastRef.current >= 1) { setHolding(false); setMsg('Roasted. This is how every pot has started since 1907.'); return }
      setMsg(roastRef.current < 0.5 ? 'Toasting… keep going.' : 'Roast level: toasted. Nearly there.')
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
  }, [added.length])

  useEffect(() => () => cancelAnimationFrame(raf.current), [])

  const reset = () => { stop(); roastRef.current = 0; setRoast(0); setAdded([]); setMsg('Tap a spice to add it.') }
  const label = roast >= 1 ? 'Roasted' : roast > 0.5 ? 'Toasted' : roast > 0 ? 'Toasting' : 'Raw'
  const colourA = `color-mix(in srgb, var(--heat-5) ${Math.round(roast * 100)}%, var(--heat-3))`

  return (
    <section ref={ref} id="ritual" data-section="H4" className="sec wrap" aria-label="The roasting ritual">
      <div className="ritual">
        <div>
          <div className="util">III · The roasting ritual</div>
          <h2>Every pot starts with whole spices.</h2>
          <p className="sub">Bought whole. Roasted, ground and mixed in-house.</p>
          <p className="lede">The masala behind every Hameediyah curry still starts as whole spices. Fennel and cumin are in the founder&apos;s blend to this day. Drag a spice into the <i>kuali</i> (a wide wok) and roast it slowly.</p>
          <blockquote className="q">&ldquo;We still buy whole spices, mix, roast and grind them ourselves.&rdquo;<cite>Abdul Sukkor Syed Ibrahim, seventh generation, New Straits Times, 20 Aug 2019</cite></blockquote>
          <div style={{ marginTop: 'var(--space-24)', display: 'grid', gap: 'var(--space-8)', justifyItems: 'start' }}>
            <ButtonLink to="#signatures">Meet the four signatures</ButtonLink>
            <a href="#signatures" style={{ minHeight: 44, display: 'inline-flex', alignItems: 'center' }}>Skip the ritual</a>
          </div>
        </div>

        {reduced ? (
          <div className="rit">
            <div className="util">Four steps to every Hameediyah curry.</div>
            <ol className="story4" style={{ marginTop: 'var(--space-16)' }}>{STEPS.map((s, i) => <li key={s}><b>{i + 1}.</b> {s}</li>)}</ol>
          </div>
        ) : (
          <div className="rit" style={{ ['--roast' as string]: roast, ['--smoke' as string]: holding || (roast > 0 && roast < 1) ? Math.min(1, roast * 2 + 0.3) : 0 }}>
            <div className="util">{roast >= 1 ? 'Done' : 'The kuali'}</div>
            <div
              className="kuali"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => { const id = e.dataTransfer.getData('text/plain'); if (id && !added.includes(id)) toggle(id) }}
            >
              <div className="smoke" aria-hidden="true"><i /><i /><i /></div>
              <svg viewBox="0 0 400 210" role="img" aria-label={`A kuali with ${added.length} whole spices, roast level ${label}`}>
                <path d="M30 110h340c0 62-70 96-170 96S30 172 30 110z" fill="var(--ember)" stroke="var(--brass)" strokeWidth="3" />
                <ellipse cx="200" cy="110" rx="170" ry="26" fill={colourA} stroke="var(--brass)" strokeWidth="3" />
                {added.map((id, i) => {
                  const s = SPICES.find((x) => x.id === id)!
                  return <circle key={id} cx={80 + ((i * 47) % 240)} cy={106 + ((i * 13) % 18)} r={6} fill={s.colour} />
                })}
                <rect x="364" y="100" width="50" height="9" rx="4" fill="var(--brass)" /><rect x="-14" y="100" width="50" height="9" rx="4" fill="var(--brass)" />
              </svg>
            </div>
            <p className="util" style={{ textAlign: 'center' }} aria-live="polite">{msg}</p>
            <div className="meter"><i /></div>
            <div className="lab"><span>Raw</span><span>Toasted</span><span>Roasted</span></div>
            <div className="spices" role="group" aria-label="Whole spices">
              {SPICES.map((s) => (
                <button
                  key={s.id} type="button" className="sp" style={{ ['--sc' as string]: s.colour }} aria-pressed={added.includes(s.id)}
                  draggable onDragStart={(e) => e.dataTransfer.setData('text/plain', s.id)}
                  onClick={() => toggle(s.id)}
                ><b>{s.en}</b>{s.ms}</button>
              ))}
            </div>
            <div className="row">
              <span className="util">{added.length} of 8 in the kuali</span>
              <button
                type="button" className={`hold${holding ? ' on' : ''}`}
                onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); start() }}
                onPointerUp={stop} onPointerCancel={stop}
                onKeyDown={(e) => { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) { e.preventDefault(); start() } }}
                onKeyUp={(e) => { if (e.key === ' ' || e.key === 'Enter') stop() }}
                aria-describedby="hold-help"
              >Hold to roast</button>
              <button type="button" className="btn ghost" onClick={reset} style={{ color: 'var(--ivory)' }}>Start over</button>
            </div>
            <p id="hold-help" className="gloss" style={{ marginTop: 'var(--space-8)' }}>Hold the button, or hold Space or Enter, to roast. Roast level: {label}.</p>
            {roast >= 1 && <p className="readout" style={{ color: 'var(--turmeric)' }}>This is how every pot has started since 1907.</p>}
          </div>
        )}
      </div>
      <aside className="chef" aria-label="The chef">
        <figure className="photo own"><Img id="R-chef" /></figure>
        <div>
          <div className="util">The keeper of the masala</div>
          <h3>Chef A.S.S. Haji Ithrees</h3>
          <p>For more than 25 years Chef Haji Ithrees has cooked from the family&apos;s secret recipes, balancing the original spices and training every new cook to do the same.</p>
          <blockquote className="q">&ldquo;We add in original spices to our food and we kept it as a secret recipe since our forefathers&apos; golden era.&rdquo;<cite>Hameediyah company profile</cite></blockquote>
        </div>
      </aside>
    </section>
  )
})
