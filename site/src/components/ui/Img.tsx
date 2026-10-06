import { images, type ImageId } from '../../data/assets'

interface Props {
  id: ImageId
  /** Override the default alt (use the COPY.md alt-text register). Pass '' for decorative. */
  alt?: string
  eager?: boolean
  className?: string
  sizes?: string
  caption?: boolean
}

/** Image by asset ID, with width/height to avoid layout shift and lazy loading by default. */
export function Img({ id, alt, eager, className = '', caption }: Props) {
  const a = images[id]
  const img = (
    <img
      src={a.src}
      alt={alt ?? a.alt}
      width={a.width}
      height={a.height}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={className}
      style={{ maxWidth: '100%', height: 'auto' }}
    />
  )
  if (!caption) return img
  return (
    <figure style={{ margin: 0 }}>
      {img}
      <figcaption className="util" style={{ paddingTop: 'var(--space-8)', opacity: 0.8 }}>
        {a.credit} · {a.license}
      </figcaption>
    </figure>
  )
}
