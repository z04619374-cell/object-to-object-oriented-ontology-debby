export const initialNarrativeState = Object.freeze({
  phase: 'intro',
  journeyIndex: 0,
  imageIndex: 0,
  memoryStatus: 'closed',
  visiblePerspectives: 0,
  metadataOpen: false,
})

const resetJourneyLayers = (journeyIndex) => ({
  phase: 'journey',
  journeyIndex,
  imageIndex: 0,
  memoryStatus: 'closed',
  visiblePerspectives: 0,
  metadataOpen: false,
})

export function narrativeReducer(state, action) {
  switch (action.type) {
    case 'BEGIN':
      return { ...resetJourneyLayers(0), memoryStatus: 'open' }
    case 'REQUEST_OPEN':
      return state.phase === 'journey' && state.memoryStatus === 'closed'
        ? { ...state, memoryStatus: 'prompted' }
        : state
    case 'OPEN_MEMORY':
      return state.phase === 'journey'
        ? { ...state, memoryStatus: 'open', visiblePerspectives: 0 }
        : state
    case 'CONTINUE':
      return state.memoryStatus === 'open'
        ? { ...state, visiblePerspectives: Math.min(state.visiblePerspectives + 1, action.totalSteps ?? 4) }
        : state
    case 'CYCLE_IMAGE':
      return { ...state, imageIndex: (state.imageIndex + 1) % action.totalImages }
    case 'NEXT_IMAGE':
      return { ...state, imageIndex: Math.min(state.imageIndex + 1, action.totalImages - 1) }
    case 'PREVIOUS_IMAGE':
      return { ...state, imageIndex: Math.max(state.imageIndex - 1, 0) }
    case 'TOGGLE_METADATA':
      return { ...state, metadataOpen: !state.metadataOpen }
    case 'NEXT': {
      const lastIndex = Math.max(0, action.totalJourneys - 1)
      return state.journeyIndex < lastIndex ? resetJourneyLayers(state.journeyIndex + 1) : state
    }
    case 'PREVIOUS':
      return state.journeyIndex > 0 ? resetJourneyLayers(state.journeyIndex - 1) : state
    case 'FINISH':
      return { ...state, phase: 'ending', metadataOpen: false }
    case 'RESTART':
      return initialNarrativeState
    default:
      return state
  }
}
