import { describe, expect, it } from 'vitest'
import { buildPerspectiveSequence, splitSentences } from './perspectiveSequence'

describe('perspective sequence', () => {
  it('splits prose at natural sentence endings without changing its words', () => {
    expect(splitSentences('First memory. Second question? Final thought!')).toEqual([
      'First memory.',
      'Second question?',
      'Final thought!',
    ])
  })

  it('finishes every sentence from one perspective before moving to the next', () => {
    const sequence = buildPerspectiveSequence([
      { id: 'debby', label: 'DEBBY', text: 'One. Two.' },
      { id: 'photographer', label: 'PHOTOGRAPHER', text: 'Three. Four.' },
    ])
    expect(sequence.map(({ label, text }) => `${label}:${text}`)).toEqual([
      'DEBBY:One.', 'DEBBY:Two.', 'PHOTOGRAPHER:Three.', 'PHOTOGRAPHER:Four.',
    ])
  })
})
