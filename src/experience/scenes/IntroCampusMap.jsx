import { Hand } from '../components/Hand'
import { Hotspot } from '../components/Hotspot'
import { Scene } from '../components/Scene'
import { assetPath } from '../../utils/assetPath'

export function IntroCampusMap({ step, onAdvance, onEnterHub }) {
  const transformed = step > 0
  const base = import.meta.env.BASE_URL
  const mapSrc = assetPath(base, transformed ? 'art/intro/campus-map-b.jpg' : 'art/intro/campus-map-a.jpg')
  const cigaretteHand = assetPath(base, 'art/shared/cigarette-hand.png')

  return (
    <Scene id="intro" title="Campus fragment" subtitle="A location remembered incompletely">
      <img className={`scene-art${transformed ? ' scene-art--burned' : ''}`} src={mapSrc} alt="Illustrated RMIT campus map" />

      <Hotspot label="Burn the teaching building" x={52} y={38} width={14} height={31} onClick={onAdvance}>
        <span aria-hidden="true" />
      </Hotspot>

      <Hotspot label="Enter at the ashtray" x={52} y={78} width={10} height={15} variant="ember" onClick={onEnterHub}>
        <span className="red-dot" aria-hidden="true" />
      </Hotspot>

      {transformed ? (
        <div className="scene-message scene-message--paper">
          <p>The plan curls inward.</p>
          <span>Steak and influence papers will occupy this state in the artwork pass.</span>
        </div>
      ) : null}
      <Hand tool={transformed ? 'fork' : 'cigarette'} active={transformed} src={transformed ? undefined : cigaretteHand} />
    </Scene>
  )
}
