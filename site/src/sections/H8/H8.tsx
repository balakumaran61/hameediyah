import { forwardRef, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Img, imageOf, type AnyImageId } from '../../components/ui/Img'
import { VideoEmbed } from '../../components/ui/VideoEmbed'

const PHOTOS: { id: AnyImageId; alt?: string }[] = [
  { id: 'R-1970-crew' }, { id: 'R-1970-griddle' }, { id: 'R-1970-trays' },
  { id: 'R-1970-counter' }, { id: 'R-1970-murtabak' }, { id: 'R-1970-doorway' },
  { id: 'IMG-02', alt: 'A long queue along the covered walkway outside Hameediyah’s yellow-and-green shophouses on Lebuh Campbell.' },
  { id: 'IMG-03', alt: 'Customers queue outside Hameediyah while motorbikes line Lebuh Campbell.' },
]
const caption = (id: AnyImageId) => { const a = imageOf(id); return a.credit === 'Hameediyah Restaurant' ? 'Family archive, 1970s' : `Today · ${a.credit} · ${a.license}` }

/** H8 · From the archive. Click-to-load video, a pull-quote, and a lightbox for photos. */
export const H8 = forwardRef<HTMLElement>(function H8(_, ref) {
  const dlg = useRef<HTMLDialogElement>(null)
  const [i, setI] = useState(0)
  const show = (n: number) => { setI((n + PHOTOS.length) % PHOTOS.length) }

  return (
    <section ref={ref} id="archive" data-section="H8" className="sec wrap" aria-label="From the archive">
      <div className="util">VII · From the archive</div>
      <h2>Told and retold since 1907.</h2>
      <p className="sub">The family album, the films and a queue that never seems to end.</p>
      <p className="lede">The murtabak was $1.50, the crew wore sarongs and the trays looked much as they do now. Photographs from the family&apos;s own album, and the queue that still forms outside.</p>
      <div className="arch">
        <div>
          <VideoEmbed id="VID-01" />
          <p className="gloss" style={{ marginTop: 'var(--space-8)' }}>The Oldest Nasi Kandar in Malaysia (Foodie, YouTube). Sound on.</p>
          <blockquote className="q">&ldquo;Our customers often tell us that the taste has never changed.&rdquo;<cite>Ahamed Seeni Pakir Abdul Shukor, owner, to Free Malaysia Today, 7 Jul 2020</cite></blockquote>
          <p><Link to="/credits">See all credits</Link></p>
        </div>
        <div className="photos">
          {PHOTOS.map((p, n) => (
            <figure className="photo" key={p.id}>
              <button type="button" aria-label={`Open photo: ${p.alt ?? imageOf(p.id).alt}`} onClick={() => { setI(n); dlg.current?.showModal() }}>
                <Img id={p.id} alt={p.alt} />
              </button>
              <figcaption>{caption(p.id)}</figcaption>
            </figure>
          ))}
        </div>
      </div>
      <dialog ref={dlg} className="lb" aria-label="Photo viewer" onClick={(e) => { if (e.target === dlg.current) dlg.current?.close() }}>
        <img src={imageOf(PHOTOS[i].id).src} alt={PHOTOS[i].alt ?? imageOf(PHOTOS[i].id).alt} />
        <div className="bar">
          <button type="button" className="btn ghost" style={{ color: 'var(--ivory)' }} onClick={() => show(i - 1)}>Previous</button>
          <button type="button" className="btn ghost" style={{ color: 'var(--ivory)' }} onClick={() => show(i + 1)}>Next</button>
          <button type="button" className="btn" onClick={() => dlg.current?.close()}>Close</button>
        </div>
      </dialog>
    </section>
  )
})
