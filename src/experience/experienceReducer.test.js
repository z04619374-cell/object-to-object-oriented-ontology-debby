import { describe, expect, it } from 'vitest'
import {
  initialExperienceState,
  experienceReducer,
  SCENES,
  TRANSITIONS,
} from './experienceReducer'

describe('experienceReducer', () => {
  it('enters the road base directly from the campus map', () => {
    const next = experienceReducer(initialExperienceState, { type: 'ENTER_BASE' })

    expect(next).toMatchObject({ scene: SCENES.ROAD, step: 0, transition: TRANSITIONS.ZOOM })
  })

  it('navigates between adjacent base scenes and resets branch progress', () => {
    const next = experienceReducer(
      { ...initialExperienceState, scene: SCENES.ROAD, step: 4 },
      { type: 'NAVIGATE_BASE', direction: 'right' },
    )

    expect(next).toMatchObject({ scene: SCENES.CITY, step: 0, transition: TRANSITIONS.FADE })
  })

  it('advances only the local scene step', () => {
    const next = experienceReducer(
      { ...initialExperienceState, scene: SCENES.CITY, step: 1 },
      { type: 'ADVANCE' },
    )

    expect(next).toMatchObject({ scene: SCENES.CITY, step: 2 })
  })

  it('ignores a repeated advance event from a stale scene step', () => {
    const current = { ...initialExperienceState, scene: SCENES.ROAD, step: 2 }

    expect(experienceReducer(current, { type: 'ADVANCE', fromStep: 1 })).toBe(current)
  })

  it('resets a branch to its own base scene', () => {
    const next = experienceReducer(
      { ...initialExperienceState, scene: SCENES.ROAD, step: 3 },
      { type: 'RESET_SCENE', transition: TRANSITIONS.BLACKOUT },
    )

    expect(next).toMatchObject({ scene: SCENES.ROAD, step: 0, transition: TRANSITIONS.BLACKOUT })
  })

  it('opens and closes optional papers without a visited gate', () => {
    const opened = experienceReducer(
      { ...initialExperienceState, step: 2 },
      { type: 'OPEN_PAPERS' },
    )
    const closed = experienceReducer(opened, { type: 'CLOSE_PAPERS' })

    expect(opened).toMatchObject({ scene: SCENES.INTRO, step: 3 })
    expect(closed).toMatchObject({ scene: SCENES.INTRO, step: 2 })
  })

  it('ignores invalid base navigation', () => {
    const current = { ...initialExperienceState, scene: SCENES.ROAD }

    expect(experienceReducer(current, { type: 'NAVIGATE_BASE', direction: 'up' })).toBe(current)
  })
})
