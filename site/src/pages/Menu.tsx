import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { HeatMarks } from '../components/ui/HeatMarks'
import { Img, imageOf, type AnyImageId } from '../components/ui/Img'
import { DISHES, TRAYS, type Dish, type TrayId } from '../data/menu'
import { scrollToTarget } from '../lib/motion'

const PHOTO: Record<string, { id: AnyImageId; alt?: string }> = {
  murtabak: { id: 'R-murtabak' },
  'kari-ketam': { id: 'IMG-17', alt: 'Crab curry in a white dish: crab pieces in a thick red-orange gravy, with a fork.' },
  'nasi-kandar': { id: 'IMG-15', alt: 'Nasi kandar on a banana leaf: rice, vegetables and fried meat in dark gravy, with a fork and spoon.' },
  'kuah-campur': { id: 'IMG-14', alt: 'Nasi kandar on a blue-rimmed plate: rice flooded with curry, topped with an egg and vegetables.' },
  'teh-tarik': { id: 'IMG-21', alt: 'A man pulls teh tarik, pouring a long stream of tea from a raised cup into another.' },
  'ayam-bawang': { id: 'R-ayam-bawang' },
  'mutton-kurma': { id: 'R-mutton-kurma' },
  'nasi-briyani': { id: 'R-nasi-briyani' },
  'rendang-daging': { id: 'R-rendang-daging' },
  'kari-kepala-ikan': { id: 'R-kari-kepala-ikan' },
  'mee-goreng': { id: 'IMG-27', alt: 'Mee goreng mamak: fried yellow noodles with a lime half.' },
  'kari-ayam': { id: 'R-kari-ayam' },
  'kari-kambing': { id: 'R-kari-kambing' },
  'kari-itik': { id: 'R-kari-itik' },
  'dalca': { id: 'IMG-31', alt: 'A ladle of dalca with lentils, tomato and vegetables.' },
  'sotong-goreng': { id: 'R-sotong-goreng' },
  'tandoori-ayam': { id: 'IMG-33', alt: 'Red tandoori chicken with cucumber, tomato and chilli.' },
  'roti-naan': { id: 'IMG-34', alt: 'Charred naan breads fresh from the tandoor in a steel bowl.' },
  'nasi-tomato': { id: 'IMG-35', alt: 'Close-up of orange-red tomato rice.' },
  'briyani-ayam-goreng': { id: 'IMG-36', alt: 'A fried chicken leg on a mound of biryani rice.' },
  'telur-rebus': { id: 'IMG-37', alt: 'A hard-boiled egg cut in half, showing the yolk.' },
  'bendi': { id: 'IMG-38', alt: 'Whole boiled okra pods in a bowl.' },
  'ayam-kapitan': { id: 'R-ayam-kapitan' },
  'kari-daging': { id: 'IMG-40', alt: 'Beef pieces in a thick brown curry on a glass plate.' },
  'daging-masak-hitam': { id: 'IMG-41', alt: 'Beef in a glossy, almost black soy gravy.' },
  'mutton-mysore': { id: 'R-mutton-mysore' },
  'lamb-shank': { id: 'R-lamb-shank' },
  'kari-ayam-belanda': { id: 'IMG-44', alt: 'A browned turkey drumstick on a paper plate.' },
  'ayam-masak-ros': { id: 'IMG-45', alt: 'Chicken in a thick red tomato gravy in a white dish.' },
  'kari-ikan': { id: 'IMG-46', alt: 'Fish curry with whole fish over a mound of rice.' },
  'kari-sotong': { id: 'R-kari-sotong' },
  'telur-ikan': { id: 'R-telur-ikan' },
  'ayam-goreng': { id: 'R-ayam-goreng' },
  'ayam-rempah': { id: 'IMG-50', alt: 'Chicken fried in spice paste, covered in crisp fried spices.' },
  'iced-lemon-tea': { id: 'IMG-51', alt: 'A glass of iced lemon tea with a lemon slice and a straw.' },
}
const TRAY_ICON: Record<string, string> = { nasi: 'tray-nasi', kuah: 'tray-kuah', roti: 'tray-roti', goreng: 'tray-goreng', laut: 'tray-laut', minum: 'tray-minum' }
const TRAY_COL: Record<string, [string, string]> = { nasi: ['var(--turmeric)', 'var(--ember)'], kuah: ['var(--saffron)', 'var(--ember)'], roti: ['var(--lime)', 'var(--ember)'], goreng: ['var(--chilli)', 'var(--ivory)'], laut: ['var(--leaf)', 'var(--ivory)'], minum: ['var(--cinnamon)', 'var(--ivory)'] }
const SPICES: Record<string, string[]> = {
  murtabak: ['cumin', 'fennel', 'cardamom'], 'ayam-bawang': ['fennel', 'cinnamon', 'clove'],
  'mutton-kurma': ['cardamom', 'cinnamon', 'star anise'], 'kari-ketam': ['dried chilli', 'coriander', 'fennel'],
}
const PROTEINS = ['chicken', 'mutton', 'beef', 'seafood', 'vegetarian', 'egg']
// How Hameediyah takes an order: one rice, any pieces (lauk), a kuah pour, and things on the side.
type Role = 'rice' | 'piece' | 'kuah' | 'side'
type Kuah = 'none' | 'campur' | 'banjir'
interface Order { rice: string | null; pieces: string[]; kuah: Kuah; sides: string[] }
const RICE = ['nasi-kandar', 'nasi-briyani', 'nasi-tomato', 'briyani-ayam-goreng']
const SIDE = ['murtabak', 'roti-naan', 'mee-goreng', 'tandoori-ayam', 'teh-tarik', 'iced-lemon-tea']
const role = (slug: string): Role => RICE.includes(slug) ? 'rice' : slug === 'kuah-campur' ? 'kuah' : SIDE.includes(slug) ? 'side' : 'piece'
const KUAH: { id: Kuah; en: string; ms: string }[] = [
  { id: 'none', en: 'No kuah', ms: 'Kering' },
  { id: 'campur', en: 'Kuah campur', ms: 'a ladle of mixed gravies' },
  { id: 'banjir', en: 'Banjir', ms: 'flood the rice' },
]
const EMPTY: Order = { rice: null, pieces: [], kuah: 'none', sides: [] }
const PIECE_HINT = 4

/** Renders "[VERIFY: note]" in menu text as a visible marker. */
function Rich({ text }: { text: string }) {
  return <>{text.split(/(\[VERIFY:?[^\]]*\])/g).map((p, i) => {
    const m = p.match(/^\[VERIFY:?\s*([^\]]*)\]$/)
    return m ? <mark key={i} className="verify" title={m[1] || 'To be verified'}>VERIFY{m[1] ? `: ${m[1]}` : ''}</mark> : <span key={i}>{p}</span>
  })}</>
}
const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')

export function Menu() {
  const params = useParams()
  const slug = params['*']?.replace(/\/$/, '') || ''
  const nav = useNavigate()
  const [tray, setTray] = useState<TrayId>('nasi')
  const [q, setQ] = useState('')
  const [heat, setHeat] = useState(0)
  const [prot, setProt] = useState<string[]>([])
  const [sig, setSig] = useState(false)
  const [order, setOrder] = useState<Order>(EMPTY)
  const { rice, pieces, kuah, sides } = order
  const [counter, setCounter] = useState(false)
  const [copied, setCopied] = useState(false)
  const [note, setNote] = useState('')
  const [toast, setToast] = useState<{ text: string; prev: Order } | null>(null)
  const [bump, setBump] = useState(0) // restarts the pole's settle animation on every change
  const toastTimer = useRef<number>(0)

  useEffect(() => {
    const prev = document.title
    document.title = 'Menu · Hameediyah, the oldest nasi kandar in Malaysia'
    return () => { document.title = prev }
  }, [])
  useEffect(() => () => window.clearTimeout(toastTimer.current), [])

  const dish = DISHES.find((d) => d.slug === slug)
  // a deep link opens its tray behind the drawer
  useEffect(() => { if (dish) setTray(dish.tray) }, [dish])

  const list = useMemo(() => {
    const nq = norm(q.trim())
    return DISHES.filter((d) => {
      if (nq) { if (!norm(`${d.en} ${d.ms}`).includes(nq)) return false }
      else if (sig) { if (!d.signature) return false }
      else if (d.tray !== tray) return false
      if (heat && d.heat > heat) return false
      if (prot.length && !d.protein.some((p) => prot.includes(p))) return false
      return true
    })
  }, [q, tray, heat, prot, sig])

  const filtering = q || heat || prot.length || sig
  const byName = (s: string) => DISHES.find((d) => d.slug === s)
  const name = (s: string) => (s === 'nasi-kandar' ? 'White rice' : byName(s)!.en.replace(/ \(.*\)$/, ''))
  const commit = (next: Order, text: string) => {
    const prev = order
    setOrder(next); setNote(''); setBump((b) => b + 1)
    setToast({ text, prev })
    window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(null), 4000)
  }
  const toggle = (list: string[], s: string) => (list.includes(s) ? list.filter((x) => x !== s) : [...list, s])
  const inOrder = (s: string) => {
    if (s === 'briyani-ayam-goreng') return rice === 'nasi-briyani' && pieces.includes('ayam-goreng')
    return rice === s || pieces.includes(s) || sides.includes(s) || (s === 'kuah-campur' && kuah !== 'none')
  }
  /** One tap from the drawer, following the counter's rules. */
  const act = (d: Dish) => {
    const s = d.slug
    switch (role(s)) {
      case 'rice': {
        if (s === 'briyani-ayam-goreng') {
          if (inOrder(s)) { commit({ ...order, rice: null, pieces: pieces.filter((x) => x !== 'ayam-goreng') }, 'Biryani with fried chicken removed'); return }
          commit({ ...order, rice: 'nasi-briyani', pieces: pieces.includes('ayam-goreng') ? pieces : [...pieces, 'ayam-goreng'] },
            rice && rice !== 'nasi-briyani' ? `Swapped ${name(rice)} for biryani, plus fried chicken` : 'Biryani with fried chicken on your plate')
          return
        }
        if (rice === s) { commit({ ...order, rice: null }, `${name(s)} removed`); return }
        commit({ ...order, rice: s }, rice ? `Swapped ${name(rice)} for ${name(s)}` : `${name(s)} chosen as your rice`)
        return
      }
      case 'kuah': commit({ ...order, kuah: kuah === 'campur' ? 'none' : 'campur' }, kuah === 'campur' ? 'No kuah: a dry plate' : 'Kuah campur poured over your rice'); return
      case 'side': commit({ ...order, sides: toggle(sides, s) }, sides.includes(s) ? `${name(s)} removed` : `${name(s)} added on the side`); return
      default: commit({ ...order, pieces: toggle(pieces, s) }, pieces.includes(s) ? `${name(s)} removed` : rice ? `${name(s)} added to your plate` : `${name(s)} added. Now choose your rice`)
    }
  }
  const actLabel = (d: Dish) => {
    const s = d.slug, on = inOrder(s)
    switch (role(s)) {
      case 'rice': return on ? 'Your rice · Remove' : rice ? 'Swap your rice' : 'Choose as your rice'
      case 'kuah': return kuah === 'campur' ? 'Kuah campur poured · Remove' : 'Pour kuah campur'
      case 'side': return on ? 'Remove from the side' : 'Add on the side'
      default: return on ? 'Remove from plate' : 'Add to plate'
    }
  }
  const undo = () => { if (toast) { setOrder(toast.prev); setBump((b) => b + 1) } setToast(null) }
  // Two baskets on one pole: pieces alternate left and right, so the pole rocks and then settles
  const left = pieces.filter((_, i) => i % 2 === 0)
  const right = pieces.filter((_, i) => i % 2 === 1)
  const lean = (right.length - left.length) * 5
  const count = (rice ? 1 : 0) + pieces.length + sides.length
  const status = count === 0 ? ''
    : !rice && pieces.length ? 'Choose your rice: white rice or biryani.'
    : pieces.length > PIECE_HINT ? `Most plates have 2–${PIECE_HINT} pieces; each is priced separately.`
    : rice && pieces.length === 0 ? 'Now point at your pieces.'
    : pieces.length && lean === 0 ? `Balanced plate · ${pieces.length} pieces`
    : pieces.length ? `${pieces.length} piece${pieces.length === 1 ? '' : 's'} on your plate`
    : `${sides.length} on the side`
  const thumb = (s: string, cls = 'pt') => { const ph = PHOTO[s]; return ph ? <span key={s} className={cls}><Img id={ph.id} alt="" eager /></span> : null }

  // drawer: Esc closes, focus moves in and back
  const closeBtn = useRef<HTMLButtonElement>(null)
  const opener = useRef<HTMLElement | null>(null)
  useEffect(() => {
    if (!dish) return
    opener.current = document.activeElement as HTMLElement
    closeBtn.current?.focus()
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') nav('/menu') }
    window.addEventListener('keydown', key)
    return () => { window.removeEventListener('keydown', key); opener.current?.focus?.() }
  }, [dish, nav])

  useEffect(() => {
    if (!counter) return
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') setCounter(false) }
    window.addEventListener('keydown', key)
    return () => window.removeEventListener('keydown', key)
  }, [counter])

  const photo = dish && PHOTO[dish.slug]

  return (
    <main id="main" className="wrap menu-page">
      <div className="util" style={{ marginTop: 'var(--space-24)' }}>Menu · The Kandar Counter</div>
      <h1>Our menu</h1>
      <p className="sub menu-sub">Walk the counter. Point. Pick. Pour.</p>
      <p className="lede">Nasi kandar is ordered at the counter: rice first, then your pieces, then the kuah. Slide along the steel trays, open a dish to read its story, and build a plate. When you&apos;re ready, show it to the staff. There&apos;s no ordering online.</p>

      <div className="trays" role="tablist" aria-label="Trays">
        {TRAYS.map((t) => (
          <button key={t.id} type="button" role="tab" className="tray" style={{ ['--tc' as string]: TRAY_COL[t.id][0], ['--tk' as string]: TRAY_COL[t.id][1] }} aria-selected={tray === t.id && !q && !sig}
            onClick={() => { setTray(t.id); setSig(false); setQ('') }}><img src={`${import.meta.env.BASE_URL}art/${TRAY_ICON[t.id]}.svg`} alt="" width={24} height={24} />{t.label}</button>
        ))}
      </div>

      <div className="filters" role="group" aria-label="Filters">
        <label className="search"><span className="sr-only">Search dishes</span>
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search dishes in English or Malay (kurma, ketam…)" />
        </label>
        <label className="sel"><span className="util">Heat up to</span>
          <select value={heat} onChange={(e) => setHeat(Number(e.target.value))}>
            <option value={0}>Any</option>{[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n} of 5</option>)}
          </select></label>
        {PROTEINS.map((p) => (
          <button key={p} type="button" className="chip" aria-pressed={prot.includes(p)} onClick={() => setProt(prot.includes(p) ? prot.filter((x) => x !== p) : [...prot, p])}>{p[0].toUpperCase() + p.slice(1)}</button>
        ))}
        <button type="button" className="chip" aria-pressed={sig} onClick={() => setSig(!sig)}>Signature</button>
        {filtering ? <button type="button" className="chip" onClick={() => { setQ(''); setHeat(0); setProt([]); setSig(false) }}>Clear filters</button> : null}
      </div>
      {(q || sig) && <p className="gloss">{q ? 'Searching every tray.' : 'Showing the four signatures from every tray.'}</p>}

      <div className="layout">
        <ul className="dishlist" aria-label="Dishes" aria-live="polite">
          {list.length === 0 && <li className="empty">{q ? 'Nothing on the counter by that name. Try the Malay, or clear a filter.' : 'No dishes match. Loosen a filter.'}</li>}
          {list.map((d) => (
            <li key={d.slug}>
              <Link to={`/menu/${d.slug}`} className={`d${dish?.slug === d.slug ? ' sel' : ''}`}>
                {PHOTO[d.slug] && <span className={`th${imageOf(PHOTO[d.slug].id).credit === 'Hameediyah Restaurant' ? ' own' : ''}`}><Img id={PHOTO[d.slug].id} alt="" eager /></span>}
                <span className="nm"><b>{d.en}</b><small>{d.ms} · Heat {d.heat}{role(d.slug) === 'rice' ? ' · Pick one rice' : role(d.slug) === 'side' ? ' · On the side' : ''} · Ask at counter</small></span>
                {inOrder(d.slug) && <span className="onp" aria-label="On your order">✓</span>}
                {d.signature && <span className="sig">SIGNATURE</span>}
              </Link>
            </li>
          ))}
        </ul>

        <aside className="plate" id="builder" aria-label="Your plate">
          <h2>Your plate</h2>
          <div className="util">Rice · pieces · kuah · on the side</div>
          <div className="pviz" data-kuah={rice ? kuah : 'none'} role="img" aria-label={count ? `A plate with ${[rice, ...pieces].filter(Boolean).map((x) => name(x!)).join(', ')}` : 'An empty plate'}>
            {rice && <span className="pi pi-rice" style={{ left: '50%', top: '50%' }}>{thumb(rice, 'pi-in')}</span>}
            {pieces.map((x, i) => {
              const n = pieces.length, a = ((-90 + (i * 360) / n) * Math.PI) / 180, r = rice || n > 1 ? 34 : 0
              return <span key={x} className="pi" style={{ left: `${50 + Math.cos(a) * r}%`, top: `${50 + Math.sin(a) * r * 0.9}%` }}>{thumb(x, 'pi-in')}</span>
            })}
          </div>

          <div className="slot">
            <div className="slot-h">Rice <small>pick one</small></div>
            {rice
              ? <div className="srow"><span>{name(rice)}</span><button type="button" className="rm" onClick={() => commit({ ...order, rice: null }, `${name(rice)} removed`)} aria-label={`Remove ${name(rice)}`}>✕</button></div>
              : <div className="row">{['nasi-kandar', 'nasi-briyani', 'nasi-tomato'].map((x) => <button key={x} type="button" className="chip" onClick={() => act(byName(x)!)}>{name(x)}</button>)}</div>}
          </div>
          <div className="slot">
            <div className="slot-h">Pieces <small>{pieces.length ? `${pieces.length} chosen` : 'point at what you want'}</small></div>
            {pieces.length === 0 ? <p className="gloss">Open any curry, seafood or fried dish and tap Add to plate.</p> : (
              <ul className="plist">{pieces.map((x) => (
                <li key={x}>{name(x)}<button type="button" className="rm" onClick={() => commit({ ...order, pieces: pieces.filter((y) => y !== x) }, `${name(x)} removed`)} aria-label={`Remove ${name(x)}`}>✕</button></li>
              ))}</ul>
            )}
          </div>
          {rice && (
            <div className="slot" role="radiogroup" aria-label="Kuah">
              <div className="slot-h">Kuah <small>poured over the rice</small></div>
              <div className="row">{KUAH.map((k) => (
                <button key={k.id} type="button" role="radio" aria-checked={kuah === k.id} className="chip" onClick={() => commit({ ...order, kuah: k.id }, k.id === 'none' ? 'No kuah: a dry plate' : `${k.en}: ${k.ms}`)}>{k.en}</button>
              ))}</div>
            </div>
          )}
          {sides.length > 0 && (
            <div className="slot">
              <div className="slot-h">On the side</div>
              <ul className="plist">{sides.map((x) => (
                <li key={x}>{name(x)}<button type="button" className="rm" onClick={() => commit({ ...order, sides: sides.filter((y) => y !== x) }, `${name(x)} removed`)} aria-label={`Remove ${name(x)}`}>✕</button></li>
              ))}</ul>
            </div>
          )}

          <div className="bal" aria-hidden="true">
            <div className="beam" key={bump} style={{ rotate: `${lean}deg` }}>
              <i className="rod" /><i className="pivot" />
              <div className="pot l"><i className="str" />{left.map((x) => thumb(x))}</div>
              <div className="pot r"><i className="str" />{right.map((x) => thumb(x))}</div>
            </div>
          </div>
          <p className="cue" aria-live="polite">{note || status}</p>
          <Button className="wide" disabled={count === 0} onClick={() => setCounter(true)}>Show at counter</Button>
        </aside>
      </div>

      {dish && (
        <>
          <div className="scrim" onClick={() => nav('/menu')} />
          <aside className="drawer" role="dialog" aria-modal="true" aria-label={`${dish.en} details`}>
            {photo ? (
              <figure className={`photo${imageOf(photo.id).credit === 'Hameediyah Restaurant' ? ' own' : ''}`}>
                <Img id={photo.id} alt={photo.alt} />
                {imageOf(photo.id).credit === 'Hameediyah Restaurant' && <figcaption>From Hameediyah&apos;s kitchen</figcaption>}
              </figure>
            ) : null}
            <button ref={closeBtn} type="button" className="x" onClick={() => nav('/menu')} aria-label="Close">✕</button>
            <div className="in">
              <h2>{dish.en}</h2>
              <i className="gloss">{dish.ms}</i>
              <p><Rich text={dish.story} /></p>
              {SPICES[dish.slug] && <><div className="util">Key spices</div><div className="row">{SPICES[dish.slug].map((s) => <span key={s} className="chip">{s}</span>)}</div></>}
              <div className="util" style={{ margin: 'var(--space-8) 0' }}><HeatMarks level={dish.heat} /> Heat {dish.heat} of 5 · Ask at counter</div>
              <div className="util">Best with…</div>
              <div className="row">{dish.pairs.map((p) => { const d = byName(p); return d ? <Link key={p} to={`/menu/${p}`} className="chip">{d.en}</Link> : null })}</div>
              <div className="row" style={{ marginTop: 'var(--space-16)' }}>
                <Button variant={inOrder(dish.slug) ? 'ghost' : 'solid'} onClick={() => act(dish)}>{actLabel(dish)}</Button>
                <Button variant="ghost" onClick={async () => { try { await navigator.clipboard.writeText(`${location.origin}/menu/${dish.slug}`); setCopied(true); setTimeout(() => setCopied(false), 1800) } catch { setCopied(false) } }}>{copied ? 'Link copied' : 'Copy link to this dish'}</Button>
              </div>
              {role(dish.slug) === 'rice' && <p className="gloss">One rice per plate. Choosing another swaps it.</p>}
              {role(dish.slug) === 'side' && <p className="gloss">{dish.slug === 'murtabak' ? 'Made at the griddle by the front door and ordered on its own, not on the rice plate.' : 'Ordered on its own, beside your plate.'}</p>}
              {role(dish.slug) === 'kuah' && <p className="gloss">Kuah isn&apos;t a dish: it&apos;s the gravy poured over your rice. Pick how much under Your plate.</p>}
              {note && <p className="cue" role="status">{note}</p>}
            </div>
          </aside>
        </>
      )}

      {counter && (
        <div className="counter-view" role="dialog" aria-modal="true" aria-label="Show at counter">
          <div className="util">Show this to the staff</div>
          <h2>I&apos;d like:</h2>
          <p className="mal">Saya nak:</p>
          <ol>
            {rice && <li>{name(rice)}<small>{rice === 'nasi-kandar' ? 'Nasi putih' : byName(rice)!.ms}</small></li>}
            {pieces.map((x) => <li key={x}>{name(x)}<small>{byName(x)!.ms}</small></li>)}
            {rice && kuah !== 'none' && <li>{KUAH.find((k) => k.id === kuah)!.en}<small>{KUAH.find((k) => k.id === kuah)!.ms}</small></li>}
          </ol>
          {sides.length > 0 && <><div className="util">On the side</div><ol className="sides">{sides.map((x) => <li key={x}>{name(x)}<small>{byName(x)!.ms}</small></li>)}</ol></>}
          <p className="gloss" style={{ color: 'inherit' }}>Prices: ask at the counter.</p>
          <Button onClick={() => setCounter(false)}>Back to the menu</Button>
        </div>
      )}

      {count > 0 && !counter && (
        <button type="button" className="platebar" onClick={() => { if (dish) nav('/menu'); window.setTimeout(() => scrollToTarget('#builder'), 60) }}>
          <span className="pb-thumbs" aria-hidden="true">{[rice, ...pieces, ...sides].filter(Boolean).slice(-3).map((x) => thumb(x!))}</span>
          <span className="pb-text"><b>Your plate ({count})</b><small>{status}</small></span>
          <span className="pb-go" aria-hidden="true">View ›</span>
        </button>
      )}
      {toast && (
        <div className="toast" role="status">
          <span>{toast.text}</span>
          <button type="button" onClick={undo}>Undo</button>
        </div>
      )}

      <style>{`
        .menu-page h1{font-size:var(--step-2xl);margin:var(--space-8) 0 var(--space-12)}
        .menu-page .lede{max-width:60ch}
        .menu-sub{font:600 var(--step-lg) var(--font-body);margin:0 0 var(--space-12)}
        @media(max-width:699px){
          .menu-page .trays{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));overflow:visible}
          .menu-page .tray{flex-direction:column;justify-content:center;gap:2px;padding:var(--space-8) var(--space-4);min-height:64px;text-align:center;font-size:var(--step-xs);line-height:1.2}
        }
        .slot{border-top:1px solid color-mix(in srgb,var(--ivory) 20%,transparent);padding:var(--space-8) 0}
        .slot-h{font:700 var(--step-sm) var(--font-utility);color:var(--sign-yellow);margin-bottom:var(--space-4)}
        .slot-h small{font-weight:400;color:var(--ivory);opacity:.7;margin-left:6px}
        .slot .row{display:flex;flex-wrap:wrap;gap:var(--space-8)}
        .slot .chip{color:var(--ivory);min-height:40px}
        .slot .chip[aria-checked="true"]{background:var(--sign-yellow);color:var(--sign-black);border-color:var(--sign-yellow)}
        .srow{display:flex;justify-content:space-between;align-items:center;min-height:44px}
        .onp{flex:none;width:28px;height:28px;border-radius:50%;display:grid;place-items:center;background:var(--sign-green-deep);color:#fff;font:700 .85rem var(--font-utility)}
        .counter-view .sides{font-size:var(--step-xl)}
        .pviz{position:relative;width:min(100%,260px);aspect-ratio:2/1.15;margin:var(--space-12) auto;border-radius:50%;background:radial-gradient(circle at 50% 45%,var(--ivory) 0 58%,color-mix(in srgb,var(--ivory) 75%,var(--brass)) 60% 66%,var(--ivory) 68%);box-shadow:0 0 0 3px var(--brass),var(--shadow-lift)}
        .pi-rice{width:40%!important;z-index:0}
        .pviz[data-kuah="campur"]::before,.pviz[data-kuah="banjir"]::before{content:"";position:absolute;inset:22% 24%;border-radius:50%;background:radial-gradient(circle,color-mix(in srgb,var(--saffron) 70%,var(--cinnamon)) 0 45%,transparent 70%);opacity:.55}
        .pviz[data-kuah="banjir"]::before{inset:10% 8%;opacity:.75}
        .pi{position:absolute;z-index:1;width:30%;aspect-ratio:1;transform:translate(-50%,-50%);transition:left var(--dur-slow) var(--ease-spring),top var(--dur-slow) var(--ease-spring);animation:pop var(--dur-slow) var(--ease-spring)}
        .pi-in,.pt{display:block;width:100%;height:100%;border-radius:50%;overflow:hidden;background:var(--sign-yellow);box-shadow:0 0 0 2px var(--ivory),0 2px 6px rgba(0,0,0,.35)}
        .pi-in img,.pt img{width:100%;height:100%!important;object-fit:cover;display:block}
        @keyframes pop{from{transform:translate(-50%,-50%) scale(.3);opacity:0}}
        .bal{height:96px;margin-top:var(--space-12);display:grid;place-items:start center}
        .beam{position:relative;width:92%;height:90px;transform-origin:50% 8px;transition:rotate var(--dur-slow) var(--ease-spring);animation:wob 1.1s var(--ease-out)}
        @keyframes wob{0%{transform:rotate(-6deg)}35%{transform:rotate(4deg)}65%{transform:rotate(-2deg)}100%{transform:rotate(0)}}
        .rod{position:absolute;left:0;right:0;top:4px;height:7px;border-radius:4px;background:var(--brass-foil)}
        .pivot{position:absolute;left:50%;top:0;width:14px;height:14px;margin-left:-7px;border-radius:50%;background:var(--sign-yellow);box-shadow:0 0 0 2px var(--sign-green)}
        .pot{position:absolute;top:30px;width:38%;min-height:44px;padding:6px;display:flex;flex-wrap:wrap;gap:4px;justify-content:center;align-content:center;border-radius:4px 4px 22px 22px;background:color-mix(in srgb,var(--cinnamon) 85%,black);box-shadow:inset 0 3px 0 var(--brass)}
        .pot.l{left:0}.pot.r{right:0}
        .pot .str{position:absolute;top:-22px;left:50%;width:2px;height:22px;background:var(--brass)}
        .pot .pt{width:28px;height:28px}
        @media(prefers-reduced-motion:reduce){.beam,.pi{animation:none;transition:none}}
        .platebar{position:fixed;left:var(--space-12);right:var(--space-12);bottom:calc(76px + env(safe-area-inset-bottom));z-index:45;display:flex;align-items:center;gap:var(--space-12);padding:var(--space-8) var(--space-12);border:0;border-radius:var(--radius-pill);background:var(--sign-black);color:var(--ivory);box-shadow:var(--shadow-lift);cursor:pointer;text-align:left}
        @media(min-width:1000px){.platebar{display:none}}
        .pb-thumbs{display:flex}.pb-thumbs .pt{width:34px;height:34px;margin-left:-10px}.pb-thumbs .pt:first-child{margin-left:0}
        .pb-text{flex:1;display:grid;line-height:1.2}.pb-text b{font:700 var(--step-sm) var(--font-utility)}.pb-text small{font:var(--step-xs) var(--font-utility);opacity:.8}
        .pb-go{font:700 var(--step-sm) var(--font-utility);color:var(--sign-yellow)}
        .toast{position:fixed;left:50%;transform:translateX(-50%);bottom:calc(140px + env(safe-area-inset-bottom));z-index:75;display:flex;align-items:center;gap:var(--space-12);padding:var(--space-8) var(--space-8) var(--space-8) var(--space-16);border-radius:var(--radius-pill);background:var(--sign-green-deep);color:#fff;font:600 var(--step-sm) var(--font-utility);box-shadow:var(--shadow-lift);max-width:calc(100% - var(--space-32));animation:pop2 var(--dur-base) var(--ease-out)}
        @media(min-width:1000px){.toast{bottom:var(--space-24)}}
        @media(max-width:999px){.toast{top:calc(var(--space-12) + 72px);bottom:auto;left:var(--space-12);right:var(--space-12);transform:none;max-width:none;justify-content:space-between;animation-name:pop3}}
        @keyframes pop3{from{opacity:0;transform:translateY(-8px)}}
        .toast button{min-height:40px;padding:0 var(--space-16);border:0;border-radius:var(--radius-pill);background:var(--sign-yellow);color:var(--sign-black);font:700 var(--step-sm) var(--font-utility);cursor:pointer}
        @keyframes pop2{from{opacity:0;transform:translate(-50%,8px)}}
        .trays{display:flex;gap:var(--space-8);overflow-x:auto;padding:var(--space-16) 0;scrollbar-width:none}
        .tray{flex:none;display:inline-flex;align-items:center;gap:var(--space-8);min-height:56px;padding:0 var(--space-24);border-radius:var(--radius-md) var(--radius-md) var(--radius-sm) var(--radius-sm);border:0;font:600 var(--step-sm) var(--font-utility);color:var(--ember);cursor:pointer;background:linear-gradient(180deg,color-mix(in srgb,var(--tc) 35%,var(--ivory)),color-mix(in srgb,var(--tc) 70%,var(--ivory)));border-bottom:5px solid var(--tc);box-shadow:var(--shadow-lift)}
        .tray[aria-selected="true"]{background:var(--tc);color:var(--tk)}
        .filters{display:flex;flex-wrap:wrap;gap:var(--space-8);align-items:center;margin-bottom:var(--space-16)}
        .filters input,.filters select{min-height:44px;border:1.5px solid currentColor;border-radius:var(--radius-pill);background:color-mix(in srgb,var(--ivory) 90%,transparent);color:var(--ember);padding:0 var(--space-16);font:var(--step-sm) var(--font-utility)}
        .filters input{width:min(100%,360px)}.search{display:contents}.sel{display:flex;gap:var(--space-8);align-items:center}
        .layout{display:grid;gap:var(--space-24);padding-bottom:var(--space-128)}
        @media(min-width:1000px){.layout{grid-template-columns:1.4fr 1fr;align-items:start}.plate{position:sticky;top:96px}}
        .dishlist{list-style:none;margin:0;padding:0;border-top:1.5px solid var(--roast-head)}
        .d{display:flex;justify-content:space-between;align-items:center;gap:var(--space-12);padding:var(--space-12);border-bottom:1.5px solid color-mix(in srgb,var(--roast-head) 35%,transparent);min-height:64px;text-decoration:none}
        .d b{font:600 var(--step-lg) var(--font-display);font-variation-settings:var(--roast-end);display:block}
        .d .nm{flex:1;min-width:0}
        .th{flex:none;width:64px;height:48px;border-radius:var(--radius-sm);overflow:hidden;background:var(--ivory)}
        .th.own{background:var(--sign-yellow)}
        .th img{width:100%;height:100%!important;object-fit:cover;display:block}
        .drawer .photo.own img{object-fit:contain;background:var(--sign-yellow)}
        .d small{font:var(--step-xs) var(--font-utility)}
        .d:hover,.d.sel{background:color-mix(in srgb,var(--turmeric) 60%,var(--ivory));color:var(--ember)}
        .sig{background:var(--turmeric);color:var(--ember);font:700 .6rem var(--font-utility);padding:2px 8px;border-radius:var(--radius-pill);letter-spacing:.1em}
        .empty{padding:var(--space-24) 0}
        .plate{background:var(--heat-5);color:var(--heat-5-ink);border-radius:var(--radius-lg);padding:var(--space-24);box-shadow:var(--shadow-lift)}
        .plate h2{color:var(--turmeric);font-size:var(--step-xl);margin-bottom:var(--space-8)}
        .plist{list-style:none;margin:0;padding:0}.plist li{display:flex;justify-content:space-between;align-items:center;min-height:44px;border-bottom:1px solid color-mix(in srgb,var(--ivory) 25%,transparent)}
        .rm{min-width:44px;min-height:44px;background:none;border:0;color:var(--turmeric);font-size:1.1rem;cursor:pointer}
        .cue{font:600 var(--step-xs) var(--font-utility);color:var(--turmeric);min-height:1.4em;margin:var(--space-8) 0}
        .wide{width:100%}.btn:disabled{opacity:.5;cursor:not-allowed}
        .scrim{position:fixed;inset:0;z-index:70;background:color-mix(in srgb,var(--ember) 55%,transparent)}
        .drawer{position:fixed;z-index:71;background:var(--ivory);color:var(--ember);box-shadow:var(--shadow-lift);overflow:auto;left:0;right:0;bottom:0;max-height:82vh;border-radius:var(--radius-lg) var(--radius-lg) 0 0}
        @media(min-width:1000px){.drawer{left:auto;top:0;bottom:0;width:min(440px,100%);max-height:none;border-radius:0}}
        .drawer h2{color:var(--cinnamon);font-size:var(--step-xl)}.drawer .photo img{border-radius:0;box-shadow:none;max-height:240px;object-fit:cover;width:100%}
        .drawer .photo figcaption{padding:var(--space-4) var(--space-16)}
        .drawer .in{padding:var(--space-24)}.drawer .chip{color:var(--ember)}
                .x{position:absolute;right:var(--space-12);top:var(--space-12);width:44px;height:44px;border-radius:50%;border:0;background:var(--ivory);color:var(--ember);font-size:1.2rem;cursor:pointer;box-shadow:var(--shadow-lift)}
        .counter-view{position:fixed;inset:0;z-index:80;background:var(--ember);color:var(--ivory);display:grid;align-content:center;justify-items:center;gap:var(--space-12);text-align:center;padding:var(--space-24);overflow:auto}
        .counter-view h2{font-size:var(--step-4xl);color:var(--turmeric)}.counter-view .mal{font:italic var(--step-xl) var(--font-body);margin:0}
        .counter-view ol{list-style:none;padding:0;margin:var(--space-16) 0;font:700 var(--step-2xl) var(--font-display)}.counter-view li{margin:var(--space-8) 0}.counter-view li small{display:block;font:var(--step-base) var(--font-body);font-style:italic}
      `}</style>
    </main>
  )
}
