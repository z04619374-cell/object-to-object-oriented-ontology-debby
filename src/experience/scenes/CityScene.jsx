import { Hand } from '../components/Hand'
import { Hotspot } from '../components/Hotspot'
import { IllustrationLayer } from '../components/IllustrationLayer'
import { ReturnHotspot } from '../components/ReturnHotspot'
import { Scene } from '../components/Scene'

export function CityScene({ step, onAdvance, onReturn }) {
  const night = step >= 3
  return (
    <Scene id="city" title="Consumption" subtitle={night ? 'The city / one star' : 'The city / many products'} tone={night ? 'night' : 'day'}>
      <IllustrationLayer x={50} y={58} width={100} height={82} className={`skyline${night ? ' skyline--night' : ''}`}>
        <i /><i /><i /><i /><i />
      </IllustrationLayer>
      {!night ? (
        <Hotspot label={step === 0 ? 'Reveal the billboard' : step === 1 ? 'Burn the product icons' : 'Look above the city'} x={67} y={35} width={31} height={28} onClick={onAdvance}>
          <span className={`billboard billboard--${Math.min(step, 2)}`} aria-hidden="true">
            {step > 0 ? <><i /><i /><i /></> : <b>WANT</b>}
          </span>
        </Hotspot>
      ) : (
        <Hotspot label={step === 3 ? 'Ignite the brightest star' : 'Let the firework fade'} x={67} y={24} width={16} height={22} variant="ember" onClick={onAdvance}>
          <span className={`star${step > 3 ? ' star--burst' : ''}`} aria-hidden="true" />
        </Hotspot>
      )}
      <p className="scene-thought">{night ? 'A point of light refuses to become a product.' : 'The billboard asks before it speaks.'}</p>
      <ReturnHotspot onReturn={onReturn} />
      <Hand active={step === 2 || step === 3} />
    </Scene>
  )
}
