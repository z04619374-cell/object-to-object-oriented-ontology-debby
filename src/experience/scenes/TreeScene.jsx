import { ASSETS } from '../assetManifest'
import { SCENES } from '../experienceReducer'
import { ArtworkLayer } from '../components/ArtworkLayer'
import { BaseSceneArrows } from '../components/BaseSceneArrows'
import { FullSceneAction } from '../components/FullSceneAction'
import { Hand } from '../components/Hand'
import { Hotspot } from '../components/Hotspot'
import { Scene } from '../components/Scene'

export function TreeScene({ step, onAdvance, onReturn, onNavigateBase }) {
  return (
    <Scene id="tree" label="Campus trees" tone="forest">
      {step <= 1 ? (
        <>
          <ArtworkLayer src={ASSETS.tree.base} alt="Dense campus trees" />
          <Hotspot label={step === 0 ? 'Light the trees' : 'Focus on the branch'} x={58} y={43} width={72} height={72} onClick={onAdvance} />
          <BaseSceneArrows scene={SCENES.TREE} onNavigate={onNavigateBase} />
          <Hand active={step === 1} src={step === 1 ? ASSETS.hands.torch : ASSETS.hands.cigarette} />
        </>
      ) : null}
      {step === 2 ? (
        <>
          <ArtworkLayer src={ASSETS.tree.branch} alt="Tree branch with one apple" />
          <Hotspot label="Approach the apple" x={61} y={42} width={32} height={42} onClick={onAdvance} />
          <Hand active src={ASSETS.hands.torch} />
        </>
      ) : null}
      {step === 3 ? (
        <FullSceneAction label="Return to campus" onClick={onReturn}>
          <ArtworkLayer src={ASSETS.tree.apple} alt="One apple on a branch" />
        </FullSceneAction>
      ) : null}
    </Scene>
  )
}
