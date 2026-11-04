import { ASSETS } from '../assetManifest'
import { ArtworkLayer } from '../components/ArtworkLayer'
import { Hand } from '../components/Hand'
import { Hotspot } from '../components/Hotspot'
import { OneShotVideo } from '../components/OneShotVideo'
import { Scene } from '../components/Scene'
import { InfluencePapers } from './InfluencePapers'

export function IntroCampusMap({ step, onAdvance, onEnterBase }) {
  return (
    <Scene id="intro" label="Campus map">
      {step === 0 ? (
        <>
          <ArtworkLayer src={ASSETS.intro.map} alt="Illustrated RMIT campus map" />
          <Hotspot label="Burn the teaching building" x={51} y={43} width={18} height={48} onClick={onAdvance} />
        </>
      ) : null}

      {step === 1 ? (
        <>
          <OneShotVideo src={ASSETS.media.mapBurn} label="Map burning" onEnded={onAdvance} />
          <Hand active src={ASSETS.hands.cigarette} />
        </>
      ) : null}

      {step === 2 ? (
        <>
          <ArtworkLayer src={ASSETS.intro.steakMap} alt="T-bone steak map" />
          <Hand src={ASSETS.hands.cigarette} />
          <InfluencePapers />
        </>
      ) : null}

      {step !== 1 ? (
        <Hotspot label="Enter at the ashtray" x={45} y={84} width={11} height={18} variant="ember" onClick={onEnterBase}>
          <img className="red-point-asset" src={ASSETS.intro.redPoint} alt="" aria-hidden="true" />
        </Hotspot>
      ) : null}
      {step === 0 ? <Hand active src={ASSETS.hands.cigarette} /> : null}
    </Scene>
  )
}
