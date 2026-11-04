import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { InfluencePapers } from './InfluencePapers'

describe('InfluencePapers', () => {
  it('opens any paper independently and shows only its approved text', async () => {
    const user = userEvent.setup()
    const { container } = render(<InfluencePapers />)

    await user.click(screen.getByRole('button', { name: /open disco elysium paper/i }))

    expect(screen.getByText('ZA/UM')).toBeInTheDocument()
    expect(screen.getByText('Disco Elysium')).toBeInTheDocument()
    expect(screen.getByText(/inner thought into an explorable environment/i)).toBeInTheDocument()
    expect(screen.queryByText('teamLab Borderless')).not.toBeInTheDocument()
    expect(container.querySelector('.paper-detail--readable')).toBeInTheDocument()
  })

  it('closes a focused paper with Escape while leaving the paper objects in place', async () => {
    const user = userEvent.setup()
    render(<InfluencePapers />)

    await user.click(screen.getByRole('button', { name: /open teamlab.*paper/i }))
    await user.keyboard('{Escape}')

    expect(screen.queryByText('teamLab Borderless')).not.toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: /open .* paper/i })).toHaveLength(3)
  })

  it('closes a focused paper by clicking outside it', async () => {
    const user = userEvent.setup()
    render(<InfluencePapers />)

    await user.click(screen.getByRole('button', { name: /open what remains of edith finch paper/i }))
    await user.click(screen.getByRole('button', { name: /close paper/i }))
    expect(screen.queryByText('What Remains of Edith Finch')).not.toBeInTheDocument()
  })
})
