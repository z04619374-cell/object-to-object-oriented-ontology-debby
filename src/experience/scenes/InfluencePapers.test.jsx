import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { InfluencePapers } from './InfluencePapers'

describe('InfluencePapers', () => {
  it('opens any paper independently and shows only its approved text', async () => {
    const user = userEvent.setup()
    const { container } = render(<InfluencePapers onClose={() => {}} />)

    await user.click(screen.getByRole('button', { name: /open disco elysium paper/i }))

    expect(screen.getByText('ZA/UM')).toBeInTheDocument()
    expect(screen.getByText('Disco Elysium')).toBeInTheDocument()
    expect(screen.getByText(/inner thought into an explorable environment/i)).toBeInTheDocument()
    expect(screen.queryByText('teamLab Borderless')).not.toBeInTheDocument()
    expect(container.querySelector('.paper-detail--readable')).toBeInTheDocument()
  })

  it('closes a focused paper with Escape without leaving the papers', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<InfluencePapers onClose={onClose} />)

    await user.click(screen.getByRole('button', { name: /open teamlab.*paper/i }))
    await user.keyboard('{Escape}')

    expect(screen.queryByText('teamLab Borderless')).not.toBeInTheDocument()
    expect(onClose).not.toHaveBeenCalled()
  })

  it('returns to the steak from the empty background with no completion gate', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<InfluencePapers onClose={onClose} />)

    await user.click(screen.getByRole('button', { name: /return to steak/i }))
    expect(onClose).toHaveBeenCalledOnce()
  })
})
