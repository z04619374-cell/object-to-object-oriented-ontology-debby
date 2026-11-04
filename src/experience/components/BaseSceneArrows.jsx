import { ASSETS } from '../assetManifest'
import { getAdjacentBaseScene } from '../baseSceneNavigation'

export function BaseSceneArrows({ scene, onNavigate }) {
  const left = getAdjacentBaseScene(scene, 'left')
  const right = getAdjacentBaseScene(scene, 'right')
  if (!left || !right) return null

  return (
    <div className="base-arrows">
      <button className="base-arrow base-arrow--left" type="button" aria-label="Look left" onClick={() => onNavigate('left')}>
        <img src={ASSETS.navigation.arrow} alt="" aria-hidden="true" draggable="false" style={{ transform: 'rotate(-90deg)' }} />
      </button>
      <button className="base-arrow base-arrow--right" type="button" aria-label="Look right" onClick={() => onNavigate('right')}>
        <img src={ASSETS.navigation.arrow} alt="" aria-hidden="true" draggable="false" style={{ transform: 'rotate(90deg)' }} />
      </button>
    </div>
  )
}
