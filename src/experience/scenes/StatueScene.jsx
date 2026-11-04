import { useState } from 'react'
import { ASSETS } from '../assetManifest'
import { SCENES } from '../experienceReducer'
import { ArtworkLayer } from '../components/ArtworkLayer'
import { BaseSceneArrows } from '../components/BaseSceneArrows'
import { FullSceneAction } from '../components/FullSceneAction'
import { Hand } from '../components/Hand'
import { Hotspot } from '../components/Hotspot'
import { OneShotVideo } from '../components/OneShotVideo'
import { Scene } from '../components/Scene'

const PEDESTRIAN_HOTSPOTS = [
  [39.5, 83, 4.8, 25], [35.1, 83, 3.2, 19], [46.7, 96.2, 5.2, 7.5],
  [29.5, 98, 3.8, 4], [33.4, 65.5, 2.2, 13], [35.6, 60.1, 1.8, 9],
]

export function StatueScene({ step, onAdvance, onReturn, onNavigateBase }) {
  const [transformed, setTransformed] = useState(() => new Set())
  const transformPedestrian = (index) => setTransformed((current) => new Set(current).add(index))

  return (
    <Scene id="statue" label="Street and statue">
      {step === 0 ? (
        <>
          <ArtworkLayer src={ASSETS.statue.base} alt="Street with pedestrians and statue" />
          {ASSETS.statue.pedestrians.map((src, index) => transformed.has(index) ? (
            <ArtworkLayer className="pedestrian-layer" src={src} key={src} />
          ) : null)}
          {PEDESTRIAN_HOTSPOTS.map(([x, y, width, height], index) => (
            <Hotspot key={index} label={`Transform pedestrian ${index + 1}`} x={x} y={y} width={width} height={height} onClick={() => transformPedestrian(index)} />
          ))}
          <Hotspot label="Approach the statue" x={18} y={31} width={16} height={45} onClick={onAdvance} />
          <BaseSceneArrows scene={SCENES.STATUE} onNavigate={onNavigateBase} />
          <Hand src={ASSETS.hands.cigarette} />
        </>
      ) : null}
      {step === 1 ? (
        <>
          <ArtworkLayer src={ASSETS.statue.focus} alt="Close view of the statue" />
          <Hotspot label="Open the statue head" x={50} y={25} width={25} height={31} onClick={onAdvance} />
          <Hand src={ASSETS.hands.gun} />
        </>
      ) : null}
      {step === 2 ? <><OneShotVideo src={ASSETS.media.statueFirework} label="Statue firework" onEnded={onAdvance} /><Hand src={ASSETS.hands.gun} /></> : null}
      {step === 3 ? (
        <FullSceneAction label="Return to the street" onClick={onReturn}>
          <ArtworkLayer src={ASSETS.statue.focus} alt="Statue after the firework" />
          <Hand src={ASSETS.hands.gun} />
        </FullSceneAction>
      ) : null}
    </Scene>
  )
}
