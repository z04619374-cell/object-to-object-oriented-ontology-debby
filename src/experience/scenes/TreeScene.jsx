import { Hand } from '../components/Hand'
import { Hotspot } from '../components/Hotspot'
import { IllustrationLayer } from '../components/IllustrationLayer'
import { ReturnHotspot } from '../components/ReturnHotspot'
import { Scene } from '../components/Scene'

export function TreeScene({ step, onAdvance, onReturn }) {
  return (
    <Scene id="tree" title="Knowledge" subtitle="A branch remembers the question" tone="forest">
      <IllustrationLayer x={50} y={52} width={100} height={100} className={`forest${step > 0 ? ' forest--lit' : ''}`}>
        {Array.from({ length: 9 }, (_, index) => <i key={index} style={{ '--i': index }} />)}
      </IllustrationLayer>
      <IllustrationLayer x={57} y={48} width={48} height={10} className={`branch${step > 1 ? ' branch--focus' : ''}`} />
      <Hotspot label={step === 0 ? 'Light the torch' : 'Approach the apple'} x={68} y={43} width={18} height={27} onClick={onAdvance}>
        <span className={`apple${step > 1 ? ' apple--revealed' : ''}`} aria-hidden="true" />
      </Hotspot>
      <p className="scene-thought">{step > 1 ? 'One answer. Still out of reach.' : 'The leaves withhold their names.'}</p>
      <ReturnHotspot onReturn={onReturn} />
      <Hand tool={step > 0 ? 'torch' : 'cigarette'} active={step > 0} />
    </Scene>
  )
}
