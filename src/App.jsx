import { useReducer } from 'react'
import { TransitionOverlay } from './experience/components/TransitionOverlay'
import {
  experienceReducer,
  initialExperienceState,
  SCENES,
  TRANSITIONS,
} from './experience/experienceReducer'
import { AshtrayHub } from './experience/scenes/AshtrayHub'
import { CityScene } from './experience/scenes/CityScene'
import { IntroCampusMap } from './experience/scenes/IntroCampusMap'
import { RoadScene } from './experience/scenes/RoadScene'
import { StatueScene } from './experience/scenes/StatueScene'
import { TreeScene } from './experience/scenes/TreeScene'

export default function App() {
  const [state, dispatch] = useReducer(experienceReducer, initialExperienceState)
  const advance = () => dispatch({ type: 'ADVANCE', fromStep: state.step })
  const returnHub = (transition = TRANSITIONS.FADE) => dispatch({ type: 'RETURN_HUB', transition })

  const sceneProps = { step: state.step, onAdvance: advance, onReturn: returnHub }

  const scenes = {
    [SCENES.INTRO]: (
      <IntroCampusMap
        step={state.step}
        onAdvance={advance}
        onEnterHub={() => dispatch({ type: 'ENTER_HUB' })}
      />
    ),
    [SCENES.HUB]: (
      <AshtrayHub
        onNavigate={(scene, transition) => dispatch({ type: 'NAVIGATE', scene, transition })}
      />
    ),
    [SCENES.ROAD]: <RoadScene {...sceneProps} onReturn={() => returnHub(TRANSITIONS.BLACKOUT)} />,
    [SCENES.STATUE]: <StatueScene {...sceneProps} />,
    [SCENES.TREE]: <TreeScene {...sceneProps} />,
    [SCENES.CITY]: <CityScene {...sceneProps} />,
  }

  return (
    <main className="experience" id="main-content">
      <div className="experience__frame" key={`${state.scene}-${state.revision}`}>
        {scenes[state.scene]}
      </div>
      <TransitionOverlay type={state.transition} revision={state.revision} />
    </main>
  )
}
