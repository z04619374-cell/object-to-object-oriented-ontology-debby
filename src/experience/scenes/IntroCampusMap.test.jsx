import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { IntroCampusMap } from './IntroCampusMap'

describe('IntroCampusMap', () => {
  it('enters Road directly from the map red point', async () => {
    const user = userEvent.setup()
    const onEnterBase = vi.fn()
    const { container } = render(<IntroCampusMap step={0} onAdvance={() => {}} onEnterBase={onEnterBase} />)

    const redPoint = screen.getByRole('button', { name: /enter at the ashtray/i })
    expect(redPoint.style.getPropertyValue('--x')).toBe('45%')
    expect(redPoint.style.getPropertyValue('--y')).toBe('84%')
    expect(container.querySelector('.red-point-asset')).toBeInTheDocument()
    expect(container.querySelector('.hand-asset')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /enter at the ashtray/i }))
    expect(onEnterBase).toHaveBeenCalledOnce()
  })

  it('plays the burn video before revealing the steak', async () => {
    const user = userEvent.setup()
    const onAdvance = vi.fn()
    const { rerender } = render(<IntroCampusMap step={0} onAdvance={onAdvance} onEnterBase={() => {}} />)

    await user.click(screen.getByRole('button', { name: /burn the teaching building/i }))
    expect(onAdvance).toHaveBeenCalledOnce()

    rerender(<IntroCampusMap step={1} onAdvance={onAdvance} onEnterBase={() => {}} />)
    fireEvent.ended(screen.getByLabelText(/map burning/i))
    expect(onAdvance).toHaveBeenCalledTimes(2)

    rerender(<IntroCampusMap step={2} onAdvance={onAdvance} onEnterBase={() => {}} />)
    expect(screen.getByRole('img', { name: /t-bone steak map/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /enter at the ashtray/i }).style.getPropertyValue('--x')).toBe('45%')
  })

  it('shows paper objects around the steak while keeping the direct Road route', async () => {
    const user = userEvent.setup()
    const onEnterBase = vi.fn()
    render(<IntroCampusMap step={2} onAdvance={() => {}} onEnterBase={onEnterBase} />)

    expect(screen.getByRole('img', { name: /t-bone steak map/i })).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: /open .* paper/i })).toHaveLength(3)
    await user.click(screen.getByRole('button', { name: /open disco elysium paper/i }))
    expect(screen.getByText('Disco Elysium')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /close paper/i }))
    await user.click(screen.getByRole('button', { name: /enter at the ashtray/i }))
    expect(onEnterBase).toHaveBeenCalledOnce()
  })
})
