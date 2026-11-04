import { useReducer } from 'react'
import {
  experienceReducer,
  initialExperienceState,
  SCENES,
  TRANSITIONS,
} from './experience/experienceReducer'
import { CityScene } from './experience/scenes/CityScene'
import { IntroCampusMap } from './experience/scenes/IntroCampusMap'
import { RoadScene } from './experience/scenes/RoadScene'
import { StatueScene } from './experience/scenes/StatueScene'
import { TreeScene } from './experience/scenes/TreeScene'

export default function App() {
  const [state, dispatch] = useReducer(experienceReducer, initialExperienceState)
  const advance = () => dispatch({ type: 'ADVANCE', fromStep: state.step })
  const resetScene = (transition = TRANSITIONS.FADE) => dispatch({ type: 'RESET_SCENE', transition })
  const navigateBase = (direction) => dispatch({ type: 'NAVIGATE_BASE', direction })
  const setStep = (step) => dispatch({ type: 'SET_STEP', step })

  const sceneProps = {
    step: state.step,
    onAdvance: advance,
    onReturn: resetScene,
    onNavigateBase: navigateBase,
    onSetStep: setStep,
  }

  const scenes = {
    [SCENES.INTRO]: (
      <IntroCampusMap
        step={state.step}
        onAdvance={advance}
        onEnterBase={() => dispatch({ type: 'ENTER_BASE' })}
        onOpenPapers={() => dispatch({ type: 'OPEN_PAPERS' })}
        onClosePapers={() => dispatch({ type: 'CLOSE_PAPERS' })}
      />
    ),
    [SCENES.ROAD]: <RoadScene {...sceneProps} onReturn={() => resetScene(TRANSITIONS.BLACKOUT)} />,
    [SCENES.STATUE]: <StatueScene {...sceneProps} />,
    [SCENES.TREE]: <TreeScene {...sceneProps} />,
    [SCENES.CITY]: <CityScene {...sceneProps} />,
  }

  return (
    <main className="experience" id="main-content">
      <div className="experience__frame" key={`${state.scene}-${state.revision}`}>
        {scenes[state.scene]}
      </div>
    </main>
  )
}
