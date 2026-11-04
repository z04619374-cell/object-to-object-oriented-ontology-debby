import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { RoadScene } from './RoadScene'

describe('RoadScene', () => {
  it('shows base arrows, then locks navigation for the required car video', async () => {
    const user = userEvent.setup()
    const onAdvance = vi.fn()
    const onNavigateBase = vi.fn()
    const { rerender } = render(<RoadScene step={0} onAdvance={onAdvance} onNavigateBase={onNavigateBase} onReturn={() => {}} />)

    await user.click(screen.getByRole('button', { name: /look left/i }))
    expect(onNavigateBase).toHaveBeenCalledWith('left')
    await user.click(screen.getByRole('button', { name: /ignite the red car/i }))
    expect(onAdvance).toHaveBeenCalled()

    rerender(<RoadScene step={1} onAdvance={onAdvance} onNavigateBase={onNavigateBase} onReturn={() => {}} />)
    expect(screen.queryByRole('button', { name: /look left/i })).not.toBeInTheDocument()
    fireEvent.ended(screen.getByLabelText(/car departure/i))
    expect(onAdvance).toHaveBeenCalledTimes(2)
  })

  it('advances four static driver views and returns from the last one', async () => {
    const user = userEvent.setup()
    const onAdvance = vi.fn()
    const onReturn = vi.fn()
    const { rerender } = render(<RoadScene step={2} onAdvance={onAdvance} onNavigateBase={() => {}} onReturn={onReturn} />)

    expect(screen.getByRole('img', { name: /driver view 1/i })).toHaveAttribute('src', expect.stringMatching(/car-01\.png$/))
    await user.click(screen.getByRole('button', { name: /continue driving/i }))
    expect(onAdvance).toHaveBeenCalledOnce()

    rerender(<RoadScene step={5} onAdvance={onAdvance} onNavigateBase={() => {}} onReturn={onReturn} />)
    expect(screen.getByRole('img', { name: /driver view 4/i })).toHaveAttribute('src', expect.stringMatching(/car-04\.png$/))
    await user.click(screen.getByRole('button', { name: /return to the road/i }))
    expect(onReturn).toHaveBeenCalledOnce()
  })
})
