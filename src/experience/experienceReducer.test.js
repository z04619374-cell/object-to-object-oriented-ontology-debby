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

  it('navigates down to the opposite base scene', () => {
    const next = experienceReducer(
      { ...initialExperienceState, scene: SCENES.ROAD, step: 0 },
      { type: 'NAVIGATE_BASE', direction: 'down' },
    )
    expect(next).toMatchObject({ scene: SCENES.TREE, step: 0 })
  })

  it('navigates up from a base scene to map1', () => {
    const next = experienceReducer(
      { ...initialExperienceState, scene: SCENES.CITY, step: 0 },
      { type: 'NAVIGATE_BASE', direction: 'up' },
    )
    expect(next).toMatchObject({ scene: SCENES.INTRO, step: 0 })
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

  it('ignores invalid base navigation', () => {
    const current = { ...initialExperienceState, scene: SCENES.ROAD }

    expect(experienceReducer(current, { type: 'NAVIGATE_BASE', direction: 'diagonal' })).toBe(current)
  })
})
