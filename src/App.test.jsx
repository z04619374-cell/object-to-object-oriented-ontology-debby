import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('Ashtray interactive narrative', () => {
  it('enters the road base directly from the campus map', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /enter at the ashtray/i }))

    expect(screen.getByRole('heading', { name: /road and car/i })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: /the ashtray/i })).not.toBeInTheDocument()
  })

  it('starts the required car video after direct entry', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /enter at the ashtray/i }))
    await user.click(screen.getByRole('button', { name: /ignite the red car/i }))

    expect(screen.getByLabelText(/car departure/i)).toBeInTheDocument()
  })

  it('keeps every intro hotspot keyboard-accessible', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.tab()
    expect(screen.getByRole('button', { name: /burn the teaching building/i })).toHaveFocus()
    await user.tab()
    expect(screen.getByRole('button', { name: /enter at the ashtray/i })).toHaveFocus()
  })

  it('moves through the four base scenes in the approved rightward loop', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: /enter at the ashtray/i }))

    expect(screen.getByRole('heading', { name: /road and car/i })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /look right/i }))
    expect(screen.getByRole('heading', { name: /city street/i })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /look right/i }))
    expect(screen.getByRole('heading', { name: /campus trees/i })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /look right/i }))
    expect(screen.getByRole('heading', { name: /street and statue/i })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /look right/i }))
    expect(screen.getByRole('heading', { name: /road and car/i })).toBeInTheDocument()
  })

  it('moves down to the opposite scene and up to map1 without a blackout overlay', async () => {
    const user = userEvent.setup()
    const { container } = render(<App />)
    await user.click(screen.getByRole('button', { name: /enter at the ashtray/i }))
    await user.click(screen.getByRole('button', { name: /look down/i }))
    expect(screen.getByRole('heading', { name: /campus trees/i })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /look up/i }))
    expect(screen.getByRole('img', { name: /illustrated rmit campus map/i })).toBeInTheDocument()
    expect(container.querySelector('.transition-overlay')).not.toBeInTheDocument()
  })

  it('opens papers optionally after the map burn and can return to the steak', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /burn the teaching building/i }))
    fireEvent.ended(screen.getByLabelText(/map burning/i))
    await user.click(screen.getByRole('button', { name: /open influence papers/i }))
    await user.click(screen.getByRole('button', { name: /open disco elysium paper/i }))
    expect(screen.getByText('Disco Elysium')).toBeInTheDocument()
    await user.keyboard('{Escape}')
    await user.click(screen.getByRole('button', { name: /return to steak/i }))
    expect(screen.getByRole('img', { name: /t-bone steak map/i })).toBeInTheDocument()
  })

  it('allows the statue and sky branches without prerequisite interactions', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: /enter at the ashtray/i }))

    await user.click(screen.getByRole('button', { name: /look left/i }))
    await user.click(screen.getByRole('button', { name: /approach the statue/i }))
    expect(screen.getByRole('button', { name: /open the statue head/i })).toBeInTheDocument()
  })

  it('does not render visible captions, prompts, or scene indices', () => {
    const { container } = render(<App />)

    expect(container.querySelector('.scene__caption')).not.toBeInTheDocument()
    expect(container.querySelector('.scene__index')).not.toBeInTheDocument()
    expect(container.querySelector('.scene-thought')).not.toBeInTheDocument()
  })
})
