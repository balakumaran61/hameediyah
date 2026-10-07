import { forwardRef } from 'react'
import { Img } from '../../components/ui/Img'
import type { RealId } from '../../data/realAssets'

const map = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`

// Outlets and addresses from the Hameediyah company profile (2025)
const OUTLETS: { name: string; area: string; addr: string; img: RealId; note?: string }[] = [
  { name: 'Campbell Street', area: 'George Town, Penang · the original', addr: '164-A Lebuh Campbell, 10100 George Town, Pulau Pinang', img: 'R-outlet-campbell' },
  { name: 'Prai', area: 'Seberang Perai, Penang', addr: '2730 Jalan Baru, Taman Pauh Jaya, 13600 Perai, Pulau Pinang', img: 'R-outlet-prai' },
  { name: 'Sungai Ara', area: 'Bayan Lepas, Penang', addr: '300-X-1 Jalan Dato Ismail Hashim, Desa Ria, 11900 Bayan Lepas, Pulau Pinang', img: 'R-outlet-sungai-ara' },
  { name: 'Ampang', area: 'Ampang Jaya, Selangor', addr: 'Lot 36904, PT 27423, Jalan Kolam Ayer Lama, Taman Dato Ahmad Razali, 68000 Ampang Jaya, Selangor', img: 'R-outlet-ampang' },
  { name: 'Bukit Bintang', area: 'Kuala Lumpur · HQ', addr: '138 Jalan Bukit Bintang, 55100 Kuala Lumpur', img: 'R-outlet-bukit-bintang', note: 'Classic nasi kandar, plus Hameediyah Fine Dining upstairs.' },
  { name: 'Masjid India', area: 'Kuala Lumpur', addr: 'GF-01 Semua House, City Centre, 50100 Kuala Lumpur', img: 'R-outlet-masjid-india' },
]

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
          <figure className="photo own"><Img id="R-outlet-campbell" /></figure>
          <figure className="photo"><Img id="IMG-04" alt="A lunchtime queue stretches along the shophouses outside Hameediyah." /></figure>
          </div>
      </div>

      <h3 className="outlets-h" id="outlets">Six outlets, one recipe book.</h3>
      <p className="lede">Campbell Street is where it began, but the same pots are now on the fire in Penang, Selangor and Kuala Lumpur.</p>
      <ul className="outlets">
        {OUTLETS.map((o) => (
          <li key={o.name} className="panel">
            <figure className="photo"><Img id={o.img} /></figure>
            <div className="util">{o.area}</div>
            <h4>{o.name}</h4>
            <p>{o.addr}</p>
            {o.note && <p className="gloss">{o.note}</p>}
            <a href={map(`Hameediyah ${o.addr}`)} target="_blank" rel="noreferrer">Directions →</a>
          </li>
        ))}
      </ul>

      <div className="events" id="events">
        <div>
          <div className="util">Events &amp; catering</div>
          <h3>Bring the counter to your table.</h3>
          <p>Business lunches, weddings, birthdays, launches and private dining, from the family that has catered royal lunches and state hi-teas. Tell the team the date and the headcount.</p>
          <div style={{ display: 'flex', gap: 'var(--space-12)', flexWrap: 'wrap' }}>
            <a className="btn" href="tel:+6042611095">Call 04-261 1095</a>
            <a className="btn ghost" href="mailto:hameediyah1907@gmail.com?subject=Event%20enquiry">Email the team</a>
          </div>
        </div>
        <figure className="photo own">
          <Img id="R-rendang-pouch" />
          <figcaption>Take it home: Hameediyah&apos;s beef rendang, sealed in a pouch.</figcaption>
        </figure>
      </div>
    </section>
  )
})
