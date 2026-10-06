import { forwardRef } from 'react'
import { Img } from '../../components/ui/Img'

const MAPS = 'https://www.google.com/maps/search/?api=1&query=Hameediyah+Restaurant+164A+Lebuh+Campbell+George+Town+Penang'

/** H9 · Visit. Address, hours, directions and a small schematic of the landmarks. */
export const H9 = forwardRef<HTMLElement>(function H9(_, ref) {
  return (
    <section ref={ref} id="visit" data-section="H9" className="sec wrap" aria-label="Visit 164A Lebuh Campbell">
      <div className="util">VIII · Visit</div>
      <h2>Come hungry to 164A Lebuh Campbell.</h2>
      <p className="sub">George Town, Penang. Follow the queue.</p>
      <p className="lede">Expect a queue at lunch. The murtabak griddle is at the front door, and there&apos;s extra seating a few doors down. Point at what you want; the counter staff will do the rest.</p>
      <div className="visit">
        <div>
          <dl className="facts factcard">
            <div><dt>Address</dt><dd>164A Lebuh Campbell, 10100 George Town, Pulau Pinang</dd></div>
            <div><dt>Hours</dt><dd>Daily, from about 10am to 10pm, with a break for Friday prayers. Check Google Maps for today&apos;s hours.</dd></div>
          </dl>
          <div style={{ display: 'flex', gap: 'var(--space-12)', flexWrap: 'wrap' }}>
            <a className="btn" href={MAPS} target="_blank" rel="noreferrer">Get directions</a>
          </div>
          <div className="panel minimap" style={{ marginTop: 'var(--space-24)' }}>
            <svg viewBox="0 0 400 220" role="img" aria-label="Schematic of landmarks near Hameediyah: Kapitan Keling Mosque, Lebuh Chulia, Jalan Penang and Komtar. Not to scale.">
              <path d="M0 150h400M0 80h400M120 0v220M290 0v220" stroke="var(--brass)" strokeWidth="6" opacity=".5" />
              <text x="8" y="72" fontSize="11" fill="var(--ember)" fontFamily="var(--font-utility)">Lebuh Chulia</text>
              <text x="296" y="14" fontSize="11" fill="var(--ember)" fontFamily="var(--font-utility)">Jalan Penang</text>
              <circle cx="210" cy="150" r="12" fill="var(--saffron)" stroke="var(--ember)" strokeWidth="3" />
              <text x="228" y="154" fontSize="12" fontWeight="700" fill="var(--ember)" fontFamily="var(--font-utility)">Hameediyah, 164A</text>
              <rect x="40" y="100" width="16" height="16" fill="var(--cinnamon)" /><text x="62" y="112" fontSize="11" fill="var(--ember)" fontFamily="var(--font-utility)">Kapitan Keling Mosque</text>
              <rect x="320" y="30" width="16" height="16" fill="var(--cinnamon)" /><text x="296" y="62" fontSize="11" fill="var(--ember)" fontFamily="var(--font-utility)">Komtar</text>
            </svg>
            <p className="gloss" style={{ margin: 0 }}>Schematic, not to scale.</p>
          </div>
        </div>
        <div style={{ display: 'grid', gap: 'var(--space-16)' }}>
          <figure className="photo"><Img id="IMG-04" alt="A lunchtime queue stretches along the shophouses outside Hameediyah." /></figure>
          <figure className="photo"><Img id="IMG-05" alt="Pastel shophouses and street lamps along Lebuh Campbell under a blue sky, May 2026." /><figcaption>Lebuh Campbell, May 2026. Photo: CC BY-SA 4.0</figcaption></figure>
        </div>
      </div>
    </section>
  )
})
