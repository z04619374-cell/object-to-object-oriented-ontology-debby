import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { IntroCampusMap } from './IntroCampusMap'

describe('IntroCampusMap', () => {
  it('enters Road directly from the map red point', async () => {
    const user = userEvent.setup()
    const onEnterBase = vi.fn()
    render(<IntroCampusMap step={0} onAdvance={() => {}} onEnterBase={onEnterBase} />)

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

    rerender(<IntroCampusMap step={2} onAdvance={onAdvance} onEnterBase={() => {}} onOpenPapers={() => {}} />)
    expect(screen.getByRole('img', { name: /t-bone steak map/i })).toBeInTheDocument()
  })

  it('offers papers and a direct Road route from the steak', async () => {
    const user = userEvent.setup()
    const onEnterBase = vi.fn()
    const onOpenPapers = vi.fn()
    render(<IntroCampusMap step={2} onAdvance={() => {}} onEnterBase={onEnterBase} onOpenPapers={onOpenPapers} />)

    await user.click(screen.getByRole('button', { name: /open influence papers/i }))
    expect(onOpenPapers).toHaveBeenCalledOnce()
    await user.click(screen.getByRole('button', { name: /enter at the ashtray/i }))
    expect(onEnterBase).toHaveBeenCalledOnce()
  })
})
