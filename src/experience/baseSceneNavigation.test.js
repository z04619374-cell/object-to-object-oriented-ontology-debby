import { describe, expect, it } from 'vitest'
import { BASE_SCENES, getAdjacentBaseScene, getOppositeBaseScene } from './baseSceneNavigation'

describe('base scene navigation', () => {
  it('uses the approved street, road, city, campus loop', () => {
    expect(BASE_SCENES).toEqual(['statue', 'road', 'city', 'tree'])
  })

  it.each([
    ['road', 'left', 'statue'],
    ['road', 'right', 'city'],
    ['city', 'left', 'road'],
    ['city', 'right', 'tree'],
    ['tree', 'left', 'city'],
    ['tree', 'right', 'statue'],
    ['statue', 'left', 'tree'],
    ['statue', 'right', 'road'],
  ])('maps %s %s to %s', (scene, direction, destination) => {
    expect(getAdjacentBaseScene(scene, direction)).toBe(destination)
  })

  it('rejects unknown scenes and directions', () => {
    expect(getAdjacentBaseScene('intro', 'left')).toBeNull()
    expect(getAdjacentBaseScene('road', 'up')).toBeNull()
  })

  it.each([
    ['road', 'tree'],
    ['tree', 'road'],
    ['statue', 'city'],
    ['city', 'statue'],
  ])('maps %s down to the opposite %s', (scene, opposite) => {
    expect(getOppositeBaseScene(scene)).toBe(opposite)
  })
})
