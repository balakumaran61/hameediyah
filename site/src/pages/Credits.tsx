import { images, videos, type ImageAsset } from '../data/assets'

const PLACE = ['IMG-01', 'IMG-02', 'IMG-03', 'IMG-04', 'IMG-05']
const GROUPS = [
  { title: 'Hameediyah and Lebuh Campbell', test: (i: ImageAsset) => PLACE.includes(i.id) },
  { title: 'Archival (public domain)', test: (i: ImageAsset) => !PLACE.includes(i.id) && i.license === 'Public domain' },
  { title: 'Food and ingredients', test: (i: ImageAsset) => !PLACE.includes(i.id) && i.license !== 'Public domain' },
]
const DEED: Record<string, string> = {
  CC0: 'https://creativecommons.org/publicdomain/zero/1.0/', 'CC BY 4.0': 'https://creativecommons.org/licenses/by/4.0/',
  'CC BY-SA 4.0': 'https://creativecommons.org/licenses/by-sa/4.0/', 'CC BY-SA 2.0': 'https://creativecommons.org/licenses/by-sa/2.0/',
  'CC BY-SA 3.0': 'https://creativecommons.org/licenses/by-sa/3.0/', 'CC BY 3.0': 'https://creativecommons.org/licenses/by/3.0/', 'CC BY 2.0': 'https://creativecommons.org/licenses/by/2.0/',
  'Public domain': 'https://creativecommons.org/publicdomain/mark/1.0/',
}

export function Credits() {
  return (
    <main id="main" className="wrap" style={{ padding: 'var(--space-64) var(--space-16) var(--space-128)' }}>
      <h1 style={{ fontSize: 'var(--step-3xl)' }}>Credits</h1>
      <p><em>Food photography is representative and not of Hameediyah&apos;s own dishes.</em></p>
      <p className="gloss">All images are freely licensed from Wikimedia Commons. Licences link to their deeds. A concept site made for a design challenge; not affiliated with Hameediyah Restaurant.</p>
      {GROUPS.map((g) => (
        <section key={g.title} aria-label={g.title}>
          <h2 style={{ fontSize: 'var(--step-xl)', margin: 'var(--space-32) 0 var(--space-12)' }}>{g.title}</h2>
          <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 'var(--space-12)' }}>
            {Object.values(images).filter(g.test).map((i) => (
              <li key={i.id} style={{ display: 'flex', gap: 'var(--space-16)', alignItems: 'center' }}>
                <img src={i.src} alt="" width={96} height={72} loading="lazy" style={{ objectFit: 'cover', width: 96, height: 72, borderRadius: 4, flex: 'none' }} />
                <div><b>{i.id}</b> {i.alt}<br /><span className="gloss">{i.credit} · <a href={DEED[i.license]}>{i.license}</a> · <a href={i.sourcePage}>Commons source</a> · used in {i.usedIn}</span></div>
              </li>
            ))}
          </ul>
        </section>
      ))}
      <h2 style={{ fontSize: 'var(--step-xl)', margin: 'var(--space-32) 0 var(--space-12)' }}>Videos (YouTube embeds)</h2>
      <ul>{Object.values(videos).map((v) => <li key={v.id}><a href={`https://www.youtube.com/watch?v=${v.youtubeId}`}>{v.title}</a> · {v.channel}</li>)}</ul>
    </main>
  )
}
