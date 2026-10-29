import { Hand } from '../components/Hand'
import { Hotspot } from '../components/Hotspot'
import { IllustrationLayer } from '../components/IllustrationLayer'
import { ReturnHotspot } from '../components/ReturnHotspot'
import { Scene } from '../components/Scene'

export function StatueScene({ step, onAdvance, onReturn }) {
  return (
    <Scene id="statue" title="Authority" subtitle="A monument with nothing to say">
      <IllustrationLayer x={50} y={72} width={100} height={45} className="plaza" />
      <Hotspot label="Reduce the pedestrians to lines" x={24} y={60} width={28} height={37} onClick={onAdvance}>
        <span className={`pedestrians${step > 0 ? ' pedestrians--lines' : ''}`} aria-hidden="true"><i /><i /><i /></span>
      </Hotspot>
      <Hotspot label="Open the statue's head" x={64} y={48} width={24} height={58} onClick={onAdvance}>
        <span className={`statue-shape${step > 1 ? ' statue-shape--open' : ''}`} aria-hidden="true"><i /></span>
      </Hotspot>
      {step > 1 ? <div className="firework firework--statue" aria-hidden="true"><i /><i /><i /><i /></div> : null}
      <p className="scene-thought">{step > 1 ? 'The answer is only light and noise.' : 'Whose thought survives the bronze?'}</p>
      <ReturnHotspot onReturn={onReturn} />
      <Hand tool={step > 0 ? 'gun' : 'cigarette'} active={step > 1} />
    </Scene>
  )
}
