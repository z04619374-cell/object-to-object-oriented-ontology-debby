import { useEffect, useState } from 'react'
import { INFLUENCES } from '../influences'
import { Scene } from '../components/Scene'
import { Hand } from '../components/Hand'
import { ASSETS } from '../assetManifest'

export function InfluencePapers({ onClose }) {
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
    <Scene id="papers" label="Influence papers" tone="black">
      <button
        type="button"
        className="papers-backdrop"
        aria-label={focused ? 'Close paper' : 'Return to steak'}
        onClick={() => focused ? setFocusedId(null) : onClose()}
      />
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
        <article className="paper-detail paper-detail--readable">
          <img className="paper-detail__texture" src={focused.paperSrc} alt="" aria-hidden="true" />
          <div className="paper-detail__content">
            <p className="paper-detail__creator">{focused.creator}</p>
            <h2>{focused.work}</h2>
            <img className="paper-detail__work" src={focused.imageSrc} alt={focused.imageAlt} />
            <p>{focused.description}</p>
          </div>
        </article>
      ) : null}
      <Hand src={ASSETS.hands.cigarette} />
    </Scene>
  )
}
