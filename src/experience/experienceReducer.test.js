import { describe, expect, it } from 'vitest'
import {
  initialExperienceState,
  experienceReducer,
  SCENES,
  TRANSITIONS,
} from './experienceReducer'

describe('experienceReducer', () => {
  it('enters the ashtray hub from the campus map', () => {
    const next = experienceReducer(initialExperienceState, { type: 'ENTER_HUB' })

    expect(next).toMatchObject({ scene: SCENES.HUB, step: 0, transition: TRANSITIONS.ZOOM })
  })

  it.each([
    [SCENES.ROAD, TRANSITIONS.FADE],
    [SCENES.STATUE, TRANSITIONS.FOCUS],
    [SCENES.TREE, TRANSITIONS.ZOOM],
    [SCENES.CITY, TRANSITIONS.FADE],
  ])('navigates from the hub to %s', (scene, transition) => {
    const next = experienceReducer(
      { ...initialExperienceState, scene: SCENES.HUB },
      { type: 'NAVIGATE', scene, transition },
    )

    expect(next).toMatchObject({ scene, step: 0, transition })
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

  it('returns every branch to the ashtray hub with its requested transition', () => {
    const next = experienceReducer(
      { ...initialExperienceState, scene: SCENES.ROAD, step: 3 },
      { type: 'RETURN_HUB', transition: TRANSITIONS.BLACKOUT },
    )

    expect(next).toMatchObject({ scene: SCENES.HUB, step: 0, transition: TRANSITIONS.BLACKOUT })
  })

  it('ignores navigation to an unknown scene', () => {
    const current = { ...initialExperienceState, scene: SCENES.HUB }

    expect(experienceReducer(current, { type: 'NAVIGATE', scene: 'unknown' })).toBe(current)
  })
})
