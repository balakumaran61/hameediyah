import { forwardRef, useCallback, useRef, useState } from 'react'
import { Img } from '../../components/ui/Img'
import { images } from '../../data/assets'

/** H3 · Under the Angsana tree. MO-05: Then/Now wipe by drag or arrow keys. */
export const H3 = forwardRef<HTMLElement>(function H3(_, ref) {
  const [pos, setPos] = useState(50)
  const box = useRef<HTMLDivElement>(null)
  const drag = useRef(false)

  const fromX = useCallback((x: number) => {
    const r = box.current!.getBoundingClientRect()
    setPos(Math.min(100, Math.max(0, ((x - r.left) / r.width) * 100)))
  }, [])

  return (
    <section ref={ref} id="angsana" data-section="H3" className="sec wrap" aria-label="Under the Angsana tree">
      <div className="angsana">
        <div style={{ position: 'relative' }}>
          <div className="util">II · The stall, 1907</div>
          <h2>Under the Angsana tree.</h2>
          <p className="sub">Campbell Street, 1907. Two baskets, one pole.</p>
          <p className="lede">Under the rules of the day, cooked food wasn&apos;t sold inside shops. So the family cooked at home and carried the curries out to the street and the field across the road, two baskets on one shoulder pole: the <i>kandar</i>. Only after the war were shophouses allowed to serve food, and the family moved indoors at 164-A.</p>
          <p className="kandar"><b><i>kandar</i></b> (Malay): the shoulder pole. <i>Nasi kandar</i> is &ldquo;pole rice&rdquo;, named for how it was carried.</p>
          <img className="leaf" src={images['IMG-20'].src} alt="Botanical plate of the Angsana tree (Pterocarpus indicus): leaves, yellow flowers and a round winged seed pod." loading="lazy" />
        </div>
        <div>
          <div
            ref={box}
            className="then-now"
            style={{ ['--pos' as string]: pos }}
            onPointerDown={(e) => { drag.current = true; (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); fromX(e.clientX) }}
            onPointerMove={(e) => drag.current && fromX(e.clientX)}
            onPointerUp={() => (drag.current = false)}
            onPointerCancel={() => (drag.current = false)}
          >
            <Img id="R-1970-doorway" className="then" />
            <div className="now" style={{ position: 'absolute', inset: 0 }}><Img id="IMG-01" alt="Hameediyah's yellow-and-green shophouse front on Lebuh Campbell today." /></div>
            <span className="lab" style={{ left: 12 }}>Then · 1970s</span>
            <span className="lab" style={{ right: 12 }}>Now · 164A Lebuh Campbell</span>
            <button
              type="button" className="handle" role="slider" aria-label="Drag to compare the shop in the 1970s with today"
              aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(pos)} aria-valuetext={`${Math.round(pos)} percent of the old photograph shown`}
              onKeyDown={(e) => {
                if (e.key === 'ArrowLeft') { e.preventDefault(); setPos((p) => Math.max(0, p - 5)) }
                if (e.key === 'ArrowRight') { e.preventDefault(); setPos((p) => Math.min(100, p + 5)) }
                if (e.key === 'Home') setPos(0)
                if (e.key === 'End') setPos(100)
              }}
            />
          </div>
          <p className="gloss" style={{ marginTop: 'var(--space-8)' }}>Use the left and right arrow keys to compare. &lsquo;Then&rsquo; is the Hameediyah doorway on Campbell Street in the 1970s, from the family&apos;s archive. No photo of the 1907 stall is known to survive.</p>
        </div>
      </div>
    </section>
  )
})
