import { Hand } from '../components/Hand'
import { Hotspot } from '../components/Hotspot'
import { IllustrationLayer } from '../components/IllustrationLayer'
import { ReturnHotspot } from '../components/ReturnHotspot'
import { Scene } from '../components/Scene'

export function RoadScene({ step, onAdvance, onReturn }) {
  const inside = step >= 1
  const moving = step >= 2
  const black = step >= 3

  return (
    <Scene id="road" title="A way out" subtitle="Road / escape" tone={black ? 'black' : 'day'}>
      {!inside ? (
        <>
          <IllustrationLayer x={50} y={73} width={100} height={46} className="road-plane" />
          <IllustrationLayer x={70} y={43} width={34} height={25} className="station"><span>FLINDERS</span></IllustrationLayer>
          <Hotspot label="Ignite the car" x={48} y={62} width={28} height={23} onClick={onAdvance}>
            <span className="car-shape" aria-hidden="true"><i /></span>
          </Hotspot>
        </>
      ) : (
        <>
          <IllustrationLayer x={50} y={61} width={100} height={68} className={`windshield${moving ? ' windshield--moving' : ''}`} />
          <IllustrationLayer x={50} y={84} width={66} height={28} className="dashboard"><span /></IllustrationLayer>
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
      <Hand active={!inside} />
    </Scene>
  )
}
