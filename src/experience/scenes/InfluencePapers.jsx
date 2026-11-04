import { useEffect, useState } from 'react'
import { INFLUENCES } from '../influences'

export function InfluencePapers() {
  const [focusedId, setFocusedId] = useState(null)
  const focused = INFLUENCES.find(({ id }) => id === focusedId)

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setFocusedId(null)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  return (
    <>
      <div className={`paper-scatter${focused ? ' paper-scatter--dimmed' : ''}`}>
        {INFLUENCES.map((influence, index) => (
          <button
            type="button"
            className={`paper-object paper-object--${index + 1}`}
            aria-label={`Open ${influence.work} paper`}
            onClick={() => setFocusedId(influence.id)}
            key={influence.id}
          >
            <img src={influence.paperSrc} alt="" aria-hidden="true" draggable="false" />
          </button>
        ))}
      </div>
      {focused ? (
        <>
        <button type="button" className="papers-backdrop" aria-label="Close paper" onClick={() => setFocusedId(null)} />
        <article className="paper-detail paper-detail--readable">
          <img className="paper-detail__texture" src={focused.paperSrc} alt="" aria-hidden="true" />
          <div className="paper-detail__content">
            <p className="paper-detail__creator">{focused.creator}</p>
            <h2>{focused.work}</h2>
            <img className="paper-detail__work" src={focused.imageSrc} alt={focused.imageAlt} />
            <p>{focused.description}</p>
          </div>
        </article>
        </>
      ) : null}
    </>
  )
}
