import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { CityScene } from './CityScene'

describe('CityScene', () => {
  it('offers billboard and sky as independent base interactions', async () => {
    const user = userEvent.setup()
    const onAdvance = vi.fn()
    const onSetStep = vi.fn()
    render(<CityScene step={0} onAdvance={onAdvance} onSetStep={onSetStep} onReturn={() => {}} onNavigateBase={() => {}} />)

    expect(screen.getByRole('button', { name: /burn the billboard/i })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /enter the night sky/i }))
    expect(onSetStep).toHaveBeenCalledWith(10)
  })

  it('adds three billboard holes before returning to the city', async () => {
    const user = userEvent.setup()
    const onAdvance = vi.fn()
    const onReturn = vi.fn()
    const { container, rerender } = render(<CityScene step={2} onAdvance={onAdvance} onSetStep={() => {}} onReturn={onReturn} onNavigateBase={() => {}} />)

    expect(container.querySelectorAll('.burn-hole-layer')).toHaveLength(1)
    rerender(<CityScene step={4} onAdvance={onAdvance} onSetStep={() => {}} onReturn={onReturn} onNavigateBase={() => {}} />)
    expect(container.querySelectorAll('.burn-hole-layer')).toHaveLength(3)
    await user.click(screen.getByRole('button', { name: /return to the city/i }))
    expect(onReturn).toHaveBeenCalledOnce()
  })

  it('plays the star firework and returns from the final sky', async () => {
    const user = userEvent.setup()
    const onAdvance = vi.fn()
    const onReturn = vi.fn()
    const { rerender } = render(<CityScene step={10} onAdvance={onAdvance} onSetStep={() => {}} onReturn={onReturn} onNavigateBase={() => {}} />)

    await user.click(screen.getByRole('button', { name: /ignite the brightest star/i }))
    rerender(<CityScene step={11} onAdvance={onAdvance} onSetStep={() => {}} onReturn={onReturn} onNavigateBase={() => {}} />)
    fireEvent.ended(screen.getByLabelText(/sky firework/i))
    expect(onAdvance).toHaveBeenCalledTimes(2)
    rerender(<CityScene step={12} onAdvance={onAdvance} onSetStep={() => {}} onReturn={onReturn} onNavigateBase={() => {}} />)
    await user.click(screen.getByRole('button', { name: /return to the city/i }))
    expect(onReturn).toHaveBeenCalledOnce()
  })
})
