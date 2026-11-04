export const BASE_SCENES = Object.freeze(['statue', 'road', 'city', 'tree'])

export function getAdjacentBaseScene(scene, direction) {
  const index = BASE_SCENES.indexOf(scene)
  if (index < 0 || !['left', 'right'].includes(direction)) return null

  const delta = direction === 'left' ? -1 : 1
  return BASE_SCENES[(index + delta + BASE_SCENES.length) % BASE_SCENES.length]
}

export function getOppositeBaseScene(scene) {
  const index = BASE_SCENES.indexOf(scene)
  if (index < 0) return null
  return BASE_SCENES[(index + 2) % BASE_SCENES.length]
}
