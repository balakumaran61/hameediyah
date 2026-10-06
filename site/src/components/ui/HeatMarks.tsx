/** 1 to 5 chilli marks (MN-02). Editorial heat, never a claim about the recipe. */
export function HeatMarks({ level }: { level: 1 | 2 | 3 | 4 | 5 }) {
  return (
    <span className="heat" role="img" aria-label={`Heat ${level} of 5`}>
      {[1, 2, 3, 4, 5].map((n) => <i key={n} className={n > level ? 'off' : ''} />)}
    </span>
  )
}
