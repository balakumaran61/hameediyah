import { useState } from 'react'
import { videos, type VideoId } from '../../data/assets'

/** Click-to-load YouTube (privacy-enhanced). Nothing from YouTube loads until the poster is activated. */
export function VideoEmbed({ id }: { id: VideoId }) {
  const v = videos[id]
  const [on, setOn] = useState(false)
  return (
    <div style={{ position: 'relative', aspectRatio: '16 / 9', background: 'var(--ember)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
      {on ? (
        <iframe
          src={`${v.embed}?autoplay=1&rel=0`}
          title={v.title}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
        />
      ) : (
        <button
          type="button"
          onClick={() => setOn(true)}
          aria-label={`Play video: ${v.title} (${v.channel})`}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0, padding: 0, cursor: 'pointer', background: 'none' }}
        >
          <img src={v.poster} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <span className="btn" style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }}>▶ Play</span>
        </button>
      )}
    </div>
  )
}
