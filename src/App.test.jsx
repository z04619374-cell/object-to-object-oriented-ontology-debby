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

  it('uses the supplied campus artwork and changes the map after burning the building', async () => {
    const user = userEvent.setup()
    render(<App />)

    const map = screen.getByRole('img', { name: /illustrated rmit campus map/i })
    expect(map).toHaveAttribute('src', expect.stringMatching(/art\/intro\/campus-map-a\.jpg$/))

    await user.click(screen.getByRole('button', { name: /burn the teaching building/i }))

    expect(map).toHaveAttribute('src', expect.stringMatching(/art\/intro\/campus-map-b\.jpg$/))
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

  it('uses the supplied road artwork outside and from the driver view', async () => {
    const user = userEvent.setup()
    await enterHub(user)
    await user.click(screen.getByRole('button', { name: /look toward the road/i }))

    expect(screen.getByRole('img', { name: /road beside the ashtray/i })).toHaveAttribute(
      'src',
      expect.stringMatching(/art\/road\/road-exterior\.jpg$/),
    )

    await user.click(screen.getByRole('button', { name: /ignite the car/i }))

    expect(screen.getByRole('img', { name: /driver view into the underpass/i })).toHaveAttribute(
      'src',
      expect.stringMatching(/art\/road\/driver-view\.jpg$/),
    )
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
