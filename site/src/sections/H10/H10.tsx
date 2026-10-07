import { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import { LOGO } from '../../data/realAssets'

/** H10 · Footer. The pole as a sign-off. */
export const H10 = forwardRef<HTMLElement>(function H10(_, ref) {
  return (
    <section ref={ref} id="closing" data-section="H10" className="wrap closing" aria-label="Closing">
      <svg viewBox="0 0 300 70" width="260" aria-hidden="true" style={{ maxWidth: '70%' }}>
        <rect x="0" y="14" width="300" height="7" rx="3.5" fill="var(--brass)" /><circle cx="150" cy="18" r="7" fill="var(--turmeric)" />
        <path d="M20 22v26M280 22v26" stroke="var(--brass)" strokeWidth="2" /><path d="M0 48h40a20 20 0 0 1-40 0zM260 48h40a20 20 0 0 1-40 0z" fill="var(--cinnamon)" />
      </svg>
      <img src={LOGO.src} width={LOGO.width} height={LOGO.height} alt="Hameediyah, established 1907. Oldest nasi kandar in Malaysia." style={{ display: 'block', width: 'min(360px, 80%)', height: 'auto', margin: 'var(--space-24) auto 0' }} loading="lazy" />
      <h2 style={{ marginTop: 'var(--space-24)' }}>Since 1907.</h2>
      <p className="sub" style={{ margin: '0 auto' }}>The pole is still moving.</p>
      <p>164A Lebuh Campbell, 10100 George Town, Penang.</p>
      <nav className="links" aria-label="Footer">
        <Link to="/menu">Menu</Link><a href="#visit">Visit</a><Link to="/credits">Credits</Link>
      </nav>
      <small>Family, archive, outlet and signature-dish photographs courtesy of Hameediyah Restaurant. Other photographs from Wikimedia Commons, KITLV and NYPL. <Link to="/credits">Full credits →</Link></small>
      <small>A concept site made for a design challenge. Not affiliated with Hameediyah Restaurant.</small>
    </section>
  )
})
