import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { StatueScene } from './StatueScene'
import { ASSETS } from '../assetManifest'

describe('StatueScene', () => {
  it('keeps pedestrians independent while the statue is immediately active', async () => {
    const user = userEvent.setup()
    const onAdvance = vi.fn()
    const { container } = render(<StatueScene step={0} onAdvance={onAdvance} onReturn={() => {}} onNavigateBase={() => {}} />)

    await user.click(screen.getByRole('button', { name: /transform pedestrian 1/i }))
    expect(container.querySelectorAll('.pedestrian-layer')).toHaveLength(1)
    expect(screen.getByRole('button', { name: /approach the statue/i })).toBeEnabled()
    await user.click(screen.getByRole('button', { name: /approach the statue/i }))
    expect(onAdvance).toHaveBeenCalledOnce()
  })

  it('places each black-line layer over the pedestrian that was clicked', async () => {
    const user = userEvent.setup()
    const { container } = render(<StatueScene step={0} onAdvance={() => {}} onReturn={() => {}} onNavigateBase={() => {}} />)
    const expectedCenters = [[39.5, 83], [35.1, 83], [46.7, 96.2], [29.5, 98], [33.4, 65.5], [35.6, 60.1]]

    for (let index = 0; index < 6; index += 1) {
      const target = screen.getByRole('button', { name: `Transform pedestrian ${index + 1}` })
      expect(target.style.getPropertyValue('--x')).toBe(`${expectedCenters[index][0]}%`)
      expect(target.style.getPropertyValue('--y')).toBe(`${expectedCenters[index][1]}%`)
      await user.click(target)
      const layers = container.querySelectorAll('.pedestrian-layer')
      expect(layers).toHaveLength(index + 1)
      expect(layers[index]).toHaveAttribute('src', ASSETS.statue.pedestrians[index])
    }
  })

  it('plays the statue firework and returns from its final static image', async () => {
    const user = userEvent.setup()
    const onAdvance = vi.fn()
    const onReturn = vi.fn()
    const { rerender } = render(<StatueScene step={1} onAdvance={onAdvance} onReturn={onReturn} onNavigateBase={() => {}} />)

    expect(screen.getByRole('button', { name: /open the statue head/i })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /open the statue head/i }))
    rerender(<StatueScene step={2} onAdvance={onAdvance} onReturn={onReturn} onNavigateBase={() => {}} />)
    fireEvent.ended(screen.getByLabelText(/statue firework/i))
    expect(onAdvance).toHaveBeenCalledTimes(2)

    rerender(<StatueScene step={3} onAdvance={onAdvance} onReturn={onReturn} onNavigateBase={() => {}} />)
    await user.click(screen.getByRole('button', { name: /return to the street/i }))
    expect(onReturn).toHaveBeenCalledOnce()
  })
})
