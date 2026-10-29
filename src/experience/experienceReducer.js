export const SCENES = Object.freeze({
  INTRO: 'intro',
  HUB: 'hub',
  ROAD: 'road',
  STATUE: 'statue',
  TREE: 'tree',
  CITY: 'city',
})

export const TRANSITIONS = Object.freeze({
  FADE: 'fade',
  ZOOM: 'zoom',
  BURN: 'burn',
  BLACKOUT: 'blackout',
  FOCUS: 'focus',
})

const sceneValues = new Set(Object.values(SCENES))
const transitionValues = new Set(Object.values(TRANSITIONS))

export const initialExperienceState = Object.freeze({
  scene: SCENES.INTRO,
  step: 0,
  transition: TRANSITIONS.FADE,
  revision: 0,
})

function nextScene(state, scene, transition) {
  if (!sceneValues.has(scene)) return state

  return {
    ...state,
    scene,
    step: 0,
    transition: transitionValues.has(transition) ? transition : TRANSITIONS.FADE,
    revision: state.revision + 1,
  }
}

export function experienceReducer(state, action) {
  switch (action.type) {
    case 'ENTER_HUB':
      return nextScene(state, SCENES.HUB, TRANSITIONS.ZOOM)
    case 'NAVIGATE':
      return nextScene(state, action.scene, action.transition)
    case 'ADVANCE':
      if (action.fromStep !== undefined && action.fromStep !== state.step) return state
      return { ...state, step: state.step + 1 }
    case 'SET_STEP':
      return { ...state, step: Math.max(0, action.step ?? 0) }
    case 'RETURN_HUB':
      return nextScene(state, SCENES.HUB, action.transition)
    case 'RESET':
      return initialExperienceState
    default:
      return state
  }
}
