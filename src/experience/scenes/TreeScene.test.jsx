import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { TreeScene } from './TreeScene'

describe('TreeScene', () => {
  it('changes to the torch before focusing on the branch', async () => {
    const user = userEvent.setup()
    const onAdvance = vi.fn()
    const { rerender } = render(<TreeScene step={0} onAdvance={onAdvance} onReturn={() => {}} onNavigateBase={() => {}} />)

    expect(screen.getByRole('button', { name: /look left/i })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /light the trees/i }))
    rerender(<TreeScene step={1} onAdvance={onAdvance} onReturn={() => {}} onNavigateBase={() => {}} />)
    expect(document.querySelector('img[src$="hand-torch.png"]')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /focus on the branch/i }))
    expect(onAdvance).toHaveBeenCalledTimes(2)
  })

  it('returns to campus from the final apple image', async () => {
    const user = userEvent.setup()
    const onReturn = vi.fn()
    render(<TreeScene step={3} onAdvance={() => {}} onReturn={onReturn} onNavigateBase={() => {}} />)

    await user.click(screen.getByRole('button', { name: /return to campus/i }))
    expect(onReturn).toHaveBeenCalledOnce()
  })
})
