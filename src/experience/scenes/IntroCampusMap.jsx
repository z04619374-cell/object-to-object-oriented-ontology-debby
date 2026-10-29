import { Hand } from '../components/Hand'
import { Hotspot } from '../components/Hotspot'
import { IllustrationLayer } from '../components/IllustrationLayer'
import { Scene } from '../components/Scene'

export function IntroCampusMap({ step, onAdvance, onEnterHub }) {
  const transformed = step > 0

  return (
    <Scene id="intro" title="Campus fragment" subtitle="A location remembered incompletely">
      <IllustrationLayer x={50} y={54} width={76} height={68} className={transformed ? 'map map--burned' : 'map'}>
        <span className="map__street map__street--a" />
        <span className="map__street map__street--b" />
        <span className="map__street map__street--c" />
        <span className="map__block map__block--a" />
        <span className="map__block map__block--b" />
        <span className="map__block map__block--c" />
        <span className="map__label">SWANSTON ST</span>
      </IllustrationLayer>

      <Hotspot label="Burn the teaching building" x={59} y={41} width={17} height={22} onClick={onAdvance}>
        <span className="placeholder-building" aria-hidden="true" />
      </Hotspot>

      <Hotspot label="Enter at the ashtray" x={43} y={63} width={9} height={14} variant="ember" onClick={onEnterHub}>
        <span className="red-dot" aria-hidden="true" />
      </Hotspot>

      {transformed ? (
        <div className="scene-message scene-message--paper">
          <p>The plan curls inward.</p>
          <span>Steak and influence papers will occupy this state in the artwork pass.</span>
        </div>
      ) : null}
      <Hand tool={transformed ? 'fork' : 'cigarette'} active={transformed} />
    </Scene>
  )
}
