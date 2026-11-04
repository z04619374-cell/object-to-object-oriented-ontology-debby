import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { StatueScene } from './StatueScene'

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
