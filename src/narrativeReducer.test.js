import { describe, expect, it } from 'vitest'
import { initialNarrativeState, narrativeReducer } from './narrativeReducer'

describe('narrativeReducer', () => {
  it('moves from the intro directly into an open memory', () => {
    expect(narrativeReducer(initialNarrativeState, { type: 'BEGIN' })).toMatchObject({
      phase: 'journey',
      journeyIndex: 0,
      memoryStatus: 'open',
    })
  })

  it('opens a memory and reveals exactly four perspectives in order', () => {
    let state = { ...initialNarrativeState, phase: 'journey' }
    state = narrativeReducer(state, { type: 'REQUEST_OPEN' })
    expect(state.memoryStatus).toBe('prompted')
    state = narrativeReducer(state, { type: 'OPEN_MEMORY' })
    expect(state).toMatchObject({ memoryStatus: 'open', visiblePerspectives: 0 })

    for (let count = 1; count <= 5; count += 1) {
      state = narrativeReducer(state, { type: 'CONTINUE' })
      expect(state.visiblePerspectives).toBe(Math.min(count, 4))
    }
  })

  it('navigates journeys, resets layers, and cannot move outside the collection', () => {
    const base = { ...initialNarrativeState, phase: 'journey', memoryStatus: 'open', visiblePerspectives: 4 }
    const next = narrativeReducer(base, { type: 'NEXT', totalJourneys: 3 })
    expect(next).toMatchObject({ journeyIndex: 1, memoryStatus: 'closed', visiblePerspectives: 0 })
    expect(narrativeReducer(next, { type: 'PREVIOUS' }).journeyIndex).toBe(0)
    expect(narrativeReducer({ ...next, journeyIndex: 2 }, { type: 'NEXT', totalJourneys: 3 }).journeyIndex).toBe(2)
  })

  it('toggles metadata, finishes, and restarts from a clean intro', () => {
    let state = { ...initialNarrativeState, phase: 'journey', memoryStatus: 'open', visiblePerspectives: 4 }
    state = narrativeReducer(state, { type: 'TOGGLE_METADATA' })
    expect(state.metadataOpen).toBe(true)
    state = narrativeReducer(state, { type: 'FINISH' })
    expect(state.phase).toBe('ending')
    expect(narrativeReducer(state, { type: 'RESTART' })).toEqual(initialNarrativeState)
  })

  it('moves between images inside one journey and clamps both ends', () => {
    let state = { ...initialNarrativeState, phase: 'journey' }
    state = narrativeReducer(state, { type: 'NEXT_IMAGE', totalImages: 3 })
    expect(state.imageIndex).toBe(1)
    state = narrativeReducer(state, { type: 'NEXT_IMAGE', totalImages: 3 })
    state = narrativeReducer(state, { type: 'NEXT_IMAGE', totalImages: 3 })
    expect(state.imageIndex).toBe(2)
    state = narrativeReducer(state, { type: 'PREVIOUS_IMAGE' })
    expect(state.imageIndex).toBe(1)
  })
})
