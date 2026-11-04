import { describe, expect, it } from 'vitest'
import { ASSETS } from './assetManifest'

const flatten = (value) => Object.values(value).flatMap((entry) =>
  typeof entry === 'string' ? [entry] : flatten(entry),
)

describe('ASSETS', () => {
  it('exposes every approved narrative asset under semantic keys', () => {
    expect(ASSETS).toMatchObject({
      intro: {
        map: expect.any(String),
        steakMap: expect.any(String),
        redPoint: expect.any(String),
      },
      hands: {
        cigarette: expect.any(String),
        torch: expect.any(String),
        gun: expect.any(String),
      },
      navigation: { arrow: expect.any(String) },
      road: {
        base: expect.any(String),
        frames: expect.arrayContaining([expect.any(String), expect.any(String), expect.any(String), expect.any(String)]),
      },
      statue: {
        base: expect.any(String),
        focus: expect.any(String),
        pedestrians: expect.arrayContaining([
          expect.any(String), expect.any(String), expect.any(String),
          expect.any(String), expect.any(String), expect.any(String),
        ]),
      },
      tree: {
        base: expect.any(String),
        branch: expect.any(String),
        apple: expect.any(String),
      },
      city: {
        base: expect.any(String),
        burnHoles: expect.arrayContaining([expect.any(String), expect.any(String), expect.any(String)]),
        sky: expect.any(String),
      },
      papers: {
        teamlab: expect.any(String),
        discoElysium: expect.any(String),
        edithFinch: expect.any(String),
      },
      media: {
        mapBurn: expect.any(String),
        carGo: expect.any(String),
        statueFirework: expect.any(String),
        skyFirework: expect.any(String),
      },
    })

    expect(ASSETS.road.frames).toHaveLength(4)
    expect(ASSETS.statue.pedestrians).toHaveLength(6)
    expect(ASSETS.city.burnHoles).toHaveLength(3)
  })

  it('uses base-aware local URLs and four distinct MP4 files', () => {
    const allPaths = flatten(ASSETS)
    const videos = Object.values(ASSETS.media)

    expect(allPaths.every((path) => path.startsWith('/'))).toBe(true)
    expect(videos).toHaveLength(4)
    expect(new Set(videos).size).toBe(4)
    expect(videos.every((path) => path.endsWith('.mp4'))).toBe(true)
  })
})
