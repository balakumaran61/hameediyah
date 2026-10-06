import { forwardRef, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Img } from '../../components/ui/Img'
import { VideoEmbed } from '../../components/ui/VideoEmbed'
import { images, type ImageId } from '../../data/assets'

const PHOTOS: { id: ImageId; alt: string }[] = [
  { id: 'IMG-02', alt: 'A long queue along the covered walkway outside Hameediyah’s yellow-and-green shophouses on Lebuh Campbell.' },
  { id: 'IMG-03', alt: 'Customers queue outside Hameediyah while motorbikes line Lebuh Campbell.' },
]

/** H8 · From the archive. Click-to-load video, a pull-quote, and a lightbox for photos. */
export const H8 = forwardRef<HTMLElement>(function H8(_, ref) {
  const dlg = useRef<HTMLDialogElement>(null)
  const [i, setI] = useState(0)
  const show = (n: number) => { setI((n + PHOTOS.length) % PHOTOS.length) }

  return (
    <section ref={ref} id="archive" data-section="H8" className="sec wrap" aria-label="From the archive">
      <div className="util">VII · From the archive</div>
      <h2>Told and retold since 1907.</h2>
      <p className="sub">Newspapers, films and a queue that never seems to end.</p>
      <p className="lede">Penang&apos;s papers, food writers and filmmakers keep coming back to Campbell Street. Here&apos;s some of what they found, and what the queue still says.</p>
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
              <button type="button" aria-label={`Open photo: ${p.alt}`} onClick={() => { setI(n); dlg.current?.showModal() }}>
                <Img id={p.id} alt={p.alt} />
              </button>
              <figcaption>Photo: {images[p.id].credit} · {images[p.id].license}</figcaption>
            </figure>
          ))}
        </div>
      </div>
      <dialog ref={dlg} className="lb" aria-label="Photo viewer" onClick={(e) => { if (e.target === dlg.current) dlg.current?.close() }}>
        <img src={images[PHOTOS[i].id].src} alt={PHOTOS[i].alt} />
        <div className="bar">
          <button type="button" className="btn ghost" style={{ color: 'var(--ivory)' }} onClick={() => show(i - 1)}>Previous</button>
          <button type="button" className="btn ghost" style={{ color: 'var(--ivory)' }} onClick={() => show(i + 1)}>Next</button>
          <button type="button" className="btn" onClick={() => dlg.current?.close()}>Close</button>
        </div>
      </dialog>
    </section>
  )
})
