import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'

async function enterHub(user) {
  render(<App />)
  await user.click(screen.getByRole('button', { name: /enter at the ashtray/i }))
}

describe('Ashtray interactive narrative', () => {
  it('enters the ashtray hub from the campus map', async () => {
    const user = userEvent.setup()
    render(<App />)

    expect(screen.getByRole('heading', { name: /campus fragment/i })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /enter at the ashtray/i }))

    expect(screen.getByRole('heading', { name: /the ashtray/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /look toward the road/i })).toBeInTheDocument()
  })

  it.each([
    [/look toward the road/i, /a way out/i],
    [/look toward the statue/i, /authority/i],
    [/look toward the tree/i, /knowledge/i],
    [/look toward the city/i, /consumption/i],
  ])('navigates through environmental directions', async (direction, heading) => {
    const user = userEvent.setup()
    await enterHub(user)

    await user.click(screen.getByRole('button', { name: direction }))

    expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /return to the ashtray/i })).toBeInTheDocument()
  })

  it('advances the road interaction and returns after blackout', async () => {
    const user = userEvent.setup()
    await enterHub(user)
    await user.click(screen.getByRole('button', { name: /look toward the road/i }))

    await user.click(screen.getByRole('button', { name: /ignite the car/i }))
    expect(screen.getByText(/inside the car/i)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /start the car/i }))
    expect(screen.getByText(/the road is disappearing/i)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /continue into black/i }))
    await user.click(screen.getByRole('button', { name: /return through the darkness/i }))

    expect(screen.getByRole('heading', { name: /the ashtray/i })).toBeInTheDocument()
  })

  it('keeps every hotspot keyboard-accessible', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.tab()
    expect(screen.getByRole('button', { name: /burn the teaching building/i })).toHaveFocus()
    await user.tab()
    expect(screen.getByRole('button', { name: /enter at the ashtray/i })).toHaveFocus()
  })
})
