import { Hand } from '../components/Hand'
import { Hotspot } from '../components/Hotspot'
import { ReturnHotspot } from '../components/ReturnHotspot'
import { Scene } from '../components/Scene'
import { assetPath } from '../../utils/assetPath'

export function RoadScene({ step, onAdvance, onReturn }) {
  const inside = step >= 1
  const moving = step >= 2
  const black = step >= 3
  const base = import.meta.env.BASE_URL
  const roadExterior = assetPath(base, 'art/road/road-exterior.jpg')
  const driverView = assetPath(base, 'art/road/driver-view.jpg')
  const cigaretteHand = assetPath(base, 'art/shared/cigarette-hand.png')

  return (
    <Scene id="road" title="A way out" subtitle="Road / escape" tone={black ? 'black' : 'day'}>
      {!inside ? (
        <>
          <img className="scene-art" src={roadExterior} alt="Road beside the ashtray" />
          <Hotspot label="Ignite the car" x={46} y={63} width={43} height={33} onClick={onAdvance}>
            <span aria-hidden="true" />
          </Hotspot>
        </>
      ) : (
        <>
          {!black ? <img className={`scene-art${moving ? ' scene-art--moving' : ''}`} src={driverView} alt="Driver view into the underpass" /> : null}
          <p className="road-status">{moving ? 'The road is disappearing.' : 'Inside the car. No destination remains.'}</p>
          {step === 1 ? (
            <Hotspot label="Start the car" x={50} y={79} width={18} height={16} onClick={onAdvance}><span className="ignition" aria-hidden="true" /></Hotspot>
          ) : step === 2 ? (
            <Hotspot label="Continue into black" x={50} y={46} width={44} height={38} variant="void" onClick={onAdvance}><span aria-hidden="true" /></Hotspot>
          ) : (
            <Hotspot label="Return through the darkness" x={50} y={54} width={100} height={92} variant="void" onClick={onReturn}><span className="dark-return">touch the dark</span></Hotspot>
          )}
        </>
      )}
      {!black ? <ReturnHotspot onReturn={onReturn} /> : null}
      {!inside ? <Hand active src={cigaretteHand} /> : null}
    </Scene>
  )
}
