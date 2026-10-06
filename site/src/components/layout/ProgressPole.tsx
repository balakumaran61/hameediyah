/** MO-01: the brass pole across the top. Fill width follows --pole-p (0..1), set by MotionRoot. */
export function ProgressPole() {
  return (
    <div className="pole" role="progressbar" aria-label="Scroll progress" aria-valuemin={0} aria-valuemax={100} data-pole>
      <span className="pp-pot l" aria-hidden="true" />
      <span className="rail"><i className="fill" /><i className="knob" /></span>
      <span className="pp-pot r" aria-hidden="true" />
      <style>{`
        .pole{position:absolute;left:0;right:0;bottom:-7px;height:14px;display:flex;align-items:center;gap:6px;padding:0 var(--space-8);pointer-events:none}
        .pole .rail{position:relative;flex:1;height:4px;border-radius:2px;background:color-mix(in srgb,var(--roast-ink) 18%,transparent)}
        .pole .fill{position:absolute;inset:0 auto 0 0;width:calc(var(--pole-p,0) * 100%);border-radius:2px;background:var(--brass-foil)}
        .pole .knob{position:absolute;top:-4px;left:calc(var(--pole-p,0) * 100%);width:12px;height:12px;margin-left:-6px;border-radius:50%;background:var(--brass);box-shadow:var(--shadow-lift)}
        .pole .pp-pot{width:12px;height:10px;border-radius:0 0 12px 12px;background:var(--cinnamon);border:1px solid var(--brass);overflow:hidden;position:relative}
        .pole .pp-pot::after{content:"";position:absolute;inset:auto 0 0 0;height:calc(var(--pole-p,0) * 100%);background:var(--turmeric)}
        .pole .pp-pot.l::after{height:calc((1 - var(--pole-p,0)) * 100%)}
      `}</style>
    </div>
  )
}
