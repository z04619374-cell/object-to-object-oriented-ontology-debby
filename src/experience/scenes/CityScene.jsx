import { ASSETS } from '../assetManifest'
import { SCENES } from '../experienceReducer'
import { ArtworkLayer } from '../components/ArtworkLayer'
import { BaseSceneArrows } from '../components/BaseSceneArrows'
import { FullSceneAction } from '../components/FullSceneAction'
import { Hand } from '../components/Hand'
import { Hotspot } from '../components/Hotspot'
import { OneShotVideo } from '../components/OneShotVideo'
import { Scene } from '../components/Scene'

export function CityScene({ step, onAdvance, onSetStep, onReturn, onNavigateBase }) {
  const billboardStep = step >= 1 && step <= 4
  const holeCount = billboardStep ? Math.max(0, step - 1) : 0

  return (
    <Scene id="city" label="City street" tone={step >= 10 ? 'night' : 'day'}>
      {step === 0 ? (
        <>
          <ArtworkLayer src={ASSETS.city.base} alt="City street with shops and billboard" />
          <Hotspot label="Burn the billboard" x={28} y={32} width={7} height={46} onClick={onAdvance} />
          <Hotspot label="Enter the night sky" x={35} y={11} width={8} height={20} onClick={() => onSetStep(10)} />
          <BaseSceneArrows scene={SCENES.CITY} onNavigate={onNavigateBase} />
          <Hand src={ASSETS.hands.cigarette} />
        </>
      ) : null}
      {billboardStep ? (
        <>
          <ArtworkLayer className="billboard-focus-art" src={ASSETS.city.base} alt="Focused billboard" />
          {ASSETS.city.burnHoles.slice(0, holeCount).map((src) => <ArtworkLayer className="burn-hole-layer" src={src} key={src} />)}
          <Hotspot label={step === 4 ? 'Return to the city' : 'Burn another hole'} x={20} y={31} width={35} height={55} onClick={step === 4 ? onReturn : onAdvance} />
          <Hand active src={ASSETS.hands.cigarette} />
        </>
      ) : null}
      {step === 10 ? (
        <>
          <ArtworkLayer src={ASSETS.city.sky} alt="Night sky above the city" />
          <Hotspot label="Ignite the brightest star" x={67} y={25} width={18} height={24} onClick={onAdvance} />
          <Hand active src={ASSETS.hands.cigarette} />
        </>
      ) : null}
      {step === 11 ? <OneShotVideo src={ASSETS.media.skyFirework} label="Sky firework" onEnded={onAdvance} /> : null}
      {step === 12 ? (
        <FullSceneAction label="Return to the city" onClick={onReturn}>
          <ArtworkLayer src={ASSETS.city.sky} alt="Night sky after the firework" />
        </FullSceneAction>
      ) : null}
    </Scene>
  )
}
