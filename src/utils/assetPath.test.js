import { describe, expect, it } from 'vitest'
import { assetPath } from './assetPath'

describe('assetPath', () => {
  it('places public assets below the configured GitHub Pages base path', () => {
    expect(assetPath('/object-to-object-oriented-ontology-debby/', 'images/IMG_7109.JPG'))
      .toBe('/object-to-object-oriented-ontology-debby/images/IMG_7109.JPG')
  })
})
