import { ASSETS } from '../assetManifest'
import { SCENES } from '../experienceReducer'
import { ArtworkLayer } from '../components/ArtworkLayer'
import { BaseSceneArrows } from '../components/BaseSceneArrows'
import { FullSceneAction } from '../components/FullSceneAction'
import { Hand } from '../components/Hand'
import { Hotspot } from '../components/Hotspot'
import { OneShotVideo } from '../components/OneShotVideo'
import { Scene } from '../components/Scene'

export function RoadScene({ step, onAdvance, onReturn, onNavigateBase }) {
  const frameIndex = step - 2

  return (
    <Scene id="road" label="Road and car" tone={step === 1 ? 'black' : 'day'}>
      {step === 0 ? (
        <>
          <ArtworkLayer src={ASSETS.road.base} alt="Road beside the ashtray" />
          <Hotspot label="Ignite the red car" x={45} y={65} width={45} height={31} onClick={onAdvance} />
          <BaseSceneArrows scene={SCENES.ROAD} onNavigate={onNavigateBase} />
          <Hand active src={ASSETS.hands.cigarette} />
        </>
      ) : null}

      {step === 1 ? (
        <OneShotVideo src={ASSETS.media.carGo} label="Car departure" onEnded={onAdvance} />
      ) : null}

      {frameIndex >= 0 && frameIndex < ASSETS.road.frames.length ? (
        <FullSceneAction
          label={frameIndex === ASSETS.road.frames.length - 1 ? 'Return to the road' : 'Continue driving'}
          onClick={frameIndex === ASSETS.road.frames.length - 1 ? onReturn : onAdvance}
        >
          <ArtworkLayer src={ASSETS.road.frames[frameIndex]} alt={`Driver view ${frameIndex + 1}`} />
        </FullSceneAction>
      ) : null}
    </Scene>
  )
}
