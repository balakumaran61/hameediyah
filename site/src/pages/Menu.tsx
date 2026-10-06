import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { HeatMarks } from '../components/ui/HeatMarks'
import { Img } from '../components/ui/Img'
import { DISHES, TRAYS, type Dish, type TrayId } from '../data/menu'
import type { ImageId } from '../data/assets'

const PHOTO: Record<string, { id: ImageId; alt: string }> = {
  murtabak: { id: 'IMG-16', alt: 'Golden squares of murtabak with a lemon wedge on a white plate.' },
  'kari-ketam': { id: 'IMG-17', alt: 'Crab curry in a white dish: crab pieces in a thick red-orange gravy, with a fork.' },
  'nasi-kandar': { id: 'IMG-15', alt: 'Nasi kandar on a banana leaf: rice, vegetables and fried meat in dark gravy, with a fork and spoon.' },
  'kuah-campur': { id: 'IMG-14', alt: 'Nasi kandar on a blue-rimmed plate: rice flooded with curry, topped with an egg and vegetables.' },
  'teh-tarik': { id: 'IMG-21', alt: 'A man pulls teh tarik, pouring a long stream of tea from a raised cup into another.' },
  'ayam-bawang': { id: 'IMG-22', alt: 'Chicken pieces in a dark, glossy onion gravy on a steel platter.' },
  'mutton-kurma': { id: 'IMG-23', alt: 'Pale, creamy kurma over white rice in a green bowl.' },
  'nasi-briyani': { id: 'IMG-24', alt: 'Nasi biryani with meat, onion and pickles on a patterned plate.' },
  'rendang-daging': { id: 'IMG-25', alt: 'Dark beef rendang heaped in the middle of a plate.' },
  'kari-kepala-ikan': { id: 'IMG-26', alt: 'A fish head in red curry beside rice and vegetables on a banana leaf.' },
  'mee-goreng': { id: 'IMG-27', alt: 'Mee goreng mamak: fried yellow noodles with a lime half.' },
  'kari-ayam': { id: 'IMG-28', alt: 'Chicken curry with potato in a steel serving tray.' },
  'kari-kambing': { id: 'IMG-29', alt: 'Chunks of mutton curry in a white bowl.' },
  'kari-itik': { id: 'IMG-30', alt: 'Dark duck curry in a steel pot.' },
  'dalca': { id: 'IMG-31', alt: 'A ladle of dalca with lentils, tomato and vegetables.' },
  'sotong-goreng': { id: 'IMG-32', alt: 'Spiced fried squid with curry leaves and coriander.' },
  'tandoori-ayam': { id: 'IMG-33', alt: 'Red tandoori chicken with cucumber, tomato and chilli.' },
  'roti-naan': { id: 'IMG-34', alt: 'Charred naan breads fresh from the tandoor in a steel bowl.' },
  'nasi-tomato': { id: 'IMG-35', alt: 'Close-up of orange-red tomato rice.' },
  'briyani-ayam-goreng': { id: 'IMG-36', alt: 'A fried chicken leg on a mound of biryani rice.' },
  'telur-rebus': { id: 'IMG-37', alt: 'A hard-boiled egg cut in half, showing the yolk.' },
  'bendi': { id: 'IMG-38', alt: 'Whole boiled okra pods in a bowl.' },
  'ayam-kapitan': { id: 'IMG-39', alt: 'Thick, dark chicken curry beside a mound of white rice.' },
  'kari-daging': { id: 'IMG-40', alt: 'Beef pieces in a thick brown curry on a glass plate.' },
  'daging-masak-hitam': { id: 'IMG-41', alt: 'Beef in a glossy, almost black soy gravy.' },
  'mutton-mysore': { id: 'IMG-42', alt: 'Dark, dry-fried mutton pieces with bay leaves.' },
  'lamb-shank': { id: 'IMG-43', alt: 'A whole lamb shank standing in orange curry in a white bowl.' },
  'kari-ayam-belanda': { id: 'IMG-44', alt: 'A browned turkey drumstick on a paper plate.' },
  'ayam-masak-ros': { id: 'IMG-45', alt: 'Chicken in a thick red tomato gravy in a white dish.' },
  'kari-ikan': { id: 'IMG-46', alt: 'Fish curry with whole fish over a mound of rice.' },
  'kari-sotong': { id: 'IMG-47', alt: 'Rings of squid in red masala with tomato and peppers.' },
  'telur-ikan': { id: 'IMG-48', alt: 'Crumbly fried fish roe with onion and a curry leaf.' },
  'ayam-goreng': { id: 'IMG-49', alt: 'Dark fried chicken pieces scattered with crisp crumbs.' },
  'ayam-rempah': { id: 'IMG-50', alt: 'Chicken fried in spice paste, covered in crisp fried spices.' },
  'iced-lemon-tea': { id: 'IMG-51', alt: 'A glass of iced lemon tea with a lemon slice and a straw.' },
}
const ART: Record<string, string> = { 'ayam-bawang': `${import.meta.env.BASE_URL}art/ayam-bawang.svg`, 'mutton-kurma': `${import.meta.env.BASE_URL}art/mutton-kurma.svg` }
const TRAY_ICON: Record<string, string> = { nasi: 'tray-nasi', kuah: 'tray-kuah', roti: 'tray-roti', goreng: 'tray-goreng', laut: 'tray-laut', minum: 'tray-minum' }
const TRAY_COL: Record<string, [string, string]> = { nasi: ['var(--turmeric)', 'var(--ember)'], kuah: ['var(--saffron)', 'var(--ember)'], roti: ['var(--lime)', 'var(--ember)'], goreng: ['var(--chilli)', 'var(--ivory)'], laut: ['var(--leaf)', 'var(--ivory)'], minum: ['var(--cinnamon)', 'var(--ivory)'] }
const SPICES: Record<string, string[]> = {
  murtabak: ['cumin', 'fennel', 'cardamom'], 'ayam-bawang': ['fennel', 'cinnamon', 'clove'],
  'mutton-kurma': ['cardamom', 'cinnamon', 'star anise'], 'kari-ketam': ['dried chilli', 'coriander', 'fennel'],
}
const PROTEINS = ['chicken', 'mutton', 'beef', 'seafood', 'vegetarian', 'egg']
const MAX = 6

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
  const [plate, setPlate] = useState<string[]>([])
  const [counter, setCounter] = useState(false)
  const [copied, setCopied] = useState(false)
  const [note, setNote] = useState('')

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
  const add = (d: Dish) => {
    if (plate.includes(d.slug)) { setNote(`${d.en} is already on your plate.`); return }
    if (plate.length >= MAX) { setNote(`That's a full plate: ${MAX} items. Remove one to add another.`); return }
    setPlate([...plate, d.slug]); setNote('')
  }
  const remove = (s: string) => { setPlate(plate.filter((x) => x !== s)); setNote('') }
  const tilt = Math.min(plate.length, MAX) * 2.2 // the pole leans as the plate gets heavy
  const heavy = plate.length >= 4

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
      <div className="util" style={{ marginTop: 'var(--space-24)' }}>The Kandar Counter</div>
      <h1>Walk the counter. Point. Pick. Pour.</h1>
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
                <span><b>{d.en}</b><small>{d.ms} · Heat {d.heat} · Ask at counter</small></span>
                {d.signature && <span className="sig">SIGNATURE</span>}
              </Link>
            </li>
          ))}
        </ul>

        <aside className="plate" id="builder" aria-label="Your plate" style={{ ['--tilt' as string]: `${tilt}deg` }}>
          <h2>Your plate</h2>
          <div className="util">{plate.length} on your plate</div>
          <svg className="plate-art" viewBox="0 0 200 120" role="img" aria-label={`Plate with ${plate.length} items`}>
            <ellipse cx="100" cy="70" rx="90" ry="38" fill="var(--ivory)" stroke="var(--brass)" strokeWidth="3" />
            {plate.map((s, i) => { const a = (i / MAX) * Math.PI * 2; return <circle key={s} cx={100 + Math.cos(a) * 46} cy={70 + Math.sin(a) * 16} r="11" fill={['var(--saffron)', 'var(--turmeric)', 'var(--chilli)', 'var(--leaf)', 'var(--cinnamon)', 'var(--brass)'][i % 6]} /> })}
          </svg>
          {plate.length === 0 ? <p>Your plate is empty. Start with rice.</p> : (
            <ul className="plist">{plate.map((s) => (
              <li key={s}>{byName(s)!.en}<button type="button" className="rm" onClick={() => remove(s)} aria-label={`Remove ${byName(s)!.en}`}>✕</button></li>
            ))}</ul>
          )}
          <div className="balance" aria-hidden="true">
            <svg viewBox="0 0 300 70" preserveAspectRatio="none" style={{ transform: `rotate(${tilt}deg)` }}>
              <rect x="0" y="14" width="300" height="7" rx="3.5" fill="var(--brass)" /><circle cx="150" cy="18" r="7" fill="var(--turmeric)" />
              <path d="M20 22v26M280 22v26" stroke="var(--brass)" strokeWidth="2" /><path d="M0 48h40a20 20 0 0 1-40 0zM260 48h40a20 20 0 0 1-40 0z" fill="var(--cinnamon)" />
            </svg>
          </div>
          <p className="cue" aria-live="polite">{note || (heavy ? 'Heavy plate! The pole is tipping.' : plate.length ? 'The pole is balanced.' : '')}</p>
          <Button className="wide" disabled={plate.length === 0} onClick={() => setCounter(true)}>Show at counter</Button>
        </aside>
      </div>

      {dish && (
        <>
          <div className="scrim" onClick={() => nav('/menu')} />
          <aside className="drawer" role="dialog" aria-modal="true" aria-label={`${dish.en} details`}>
            {photo ? (
              <figure className="photo"><Img id={photo.id} alt={photo.alt} /><figcaption>Representative photo, not Hameediyah&apos;s own dish.</figcaption></figure>
            ) : ART[dish.slug] ? (
              <figure className="photo"><img src={ART[dish.slug]} alt={`Illustration of ${dish.en}, drawn for this site`} width={400} height={300} style={{ maxHeight: 240, width: '100%', objectFit: 'contain', background: 'var(--ivory)' }} /><figcaption>Illustration, not a photograph.</figcaption></figure>
            ) : <div className="nophoto">Photo to come</div>}
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
                <Button onClick={() => add(dish)}>{plate.includes(dish.slug) ? 'On your plate' : 'Add to plate'}</Button>
                <Button variant="ghost" onClick={async () => { try { await navigator.clipboard.writeText(`${location.origin}/menu/${dish.slug}`); setCopied(true); setTimeout(() => setCopied(false), 1800) } catch { setCopied(false) } }}>{copied ? 'Link copied' : 'Copy link to this dish'}</Button>
              </div>
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
          <ol>{plate.map((s) => <li key={s}>{byName(s)!.en}<small>{byName(s)!.ms}</small></li>)}</ol>
          <p className="gloss" style={{ color: 'inherit' }}>Prices: ask at the counter.</p>
          <Button onClick={() => setCounter(false)}>Back to the menu</Button>
        </div>
      )}

      <style>{`
        .menu-page h1{font-size:var(--step-2xl);margin:var(--space-8) 0 var(--space-12)}
        .menu-page .lede{max-width:60ch}
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
        .d small{font:var(--step-xs) var(--font-utility)}
        .d:hover,.d.sel{background:color-mix(in srgb,var(--turmeric) 60%,var(--ivory));color:var(--ember)}
        .sig{background:var(--turmeric);color:var(--ember);font:700 .6rem var(--font-utility);padding:2px 8px;border-radius:var(--radius-pill);letter-spacing:.1em}
        .empty{padding:var(--space-24) 0}
        .plate{background:var(--heat-5);color:var(--heat-5-ink);border-radius:var(--radius-lg);padding:var(--space-24);box-shadow:var(--shadow-lift)}
        .plate h2{color:var(--turmeric);font-size:var(--step-xl);margin-bottom:var(--space-8)}
        .plate-art{width:100%;max-width:240px;display:block;margin:var(--space-8) auto}
        .plist{list-style:none;margin:0;padding:0}.plist li{display:flex;justify-content:space-between;align-items:center;min-height:44px;border-bottom:1px solid color-mix(in srgb,var(--ivory) 25%,transparent)}
        .rm{min-width:44px;min-height:44px;background:none;border:0;color:var(--turmeric);font-size:1.1rem;cursor:pointer}
        .balance{height:60px;margin-top:var(--space-8)}.balance svg{width:100%;height:100%;transform-origin:center;transition:transform var(--dur-slow) var(--ease-spring)}
        .cue{font:600 var(--step-xs) var(--font-utility);color:var(--turmeric);min-height:1.4em;margin:var(--space-8) 0}
        .wide{width:100%}.btn:disabled{opacity:.5;cursor:not-allowed}
        .scrim{position:fixed;inset:0;z-index:70;background:color-mix(in srgb,var(--ember) 55%,transparent)}
        .drawer{position:fixed;z-index:71;background:var(--ivory);color:var(--ember);box-shadow:var(--shadow-lift);overflow:auto;left:0;right:0;bottom:0;max-height:82vh;border-radius:var(--radius-lg) var(--radius-lg) 0 0}
        @media(min-width:1000px){.drawer{left:auto;top:0;bottom:0;width:min(440px,100%);max-height:none;border-radius:0}}
        .drawer h2{color:var(--cinnamon);font-size:var(--step-xl)}.drawer .photo img{border-radius:0;box-shadow:none;max-height:240px;object-fit:cover;width:100%}
        .drawer .photo figcaption{padding:var(--space-4) var(--space-16)}
        .drawer .in{padding:var(--space-24)}.drawer .chip{color:var(--ember)}
        .nophoto{display:grid;place-items:center;height:110px;border-bottom:2px dashed var(--brass);font:600 var(--step-sm) var(--font-utility)}
        .x{position:absolute;right:var(--space-12);top:var(--space-12);width:44px;height:44px;border-radius:50%;border:0;background:var(--ivory);color:var(--ember);font-size:1.2rem;cursor:pointer;box-shadow:var(--shadow-lift)}
        .counter-view{position:fixed;inset:0;z-index:80;background:var(--ember);color:var(--ivory);display:grid;align-content:center;justify-items:center;gap:var(--space-12);text-align:center;padding:var(--space-24);overflow:auto}
        .counter-view h2{font-size:var(--step-4xl);color:var(--turmeric)}.counter-view .mal{font:italic var(--step-xl) var(--font-body);margin:0}
        .counter-view ol{list-style:none;padding:0;margin:var(--space-16) 0;font:700 var(--step-2xl) var(--font-display)}.counter-view li{margin:var(--space-8) 0}.counter-view li small{display:block;font:var(--step-base) var(--font-body);font-style:italic}
      `}</style>
    </main>
  )
}
