import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'

async function enterFirstMemory(user) {
  render(<App />)
  await user.click(screen.getByRole('button', { name: /enter memory with debby/i }))
}

describe('Object to Object-Oriented Ontology', () => {
  it('shows only the memory entry on the first screen, then enters the journey', async () => {
    const user = userEvent.setup()
    render(<App />)
    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
    expect(screen.getByText("Hi, I'm Debby")).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /enter memory with debby/i })).toHaveTextContent('Enter memory')
    await user.click(screen.getByRole('button', { name: /enter memory with debby/i }))
    expect(screen.getByRole('button', { name: /reveal next memory fragment/i })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /next image|open this memory/i })).not.toBeInTheDocument()
  })

  it('uses Debby as the entry control and opens directly into the image interaction', async () => {
    const user = userEvent.setup()
    render(<App />)
    const entry = screen.getByRole('button', { name: /enter memory with debby/i })
    expect(entry.querySelector('img')).toHaveAttribute('src', '/images/debby-enter.png')
    await user.click(entry)
    expect(screen.getByText('01 / 03')).toBeInTheDocument()
    expect(screen.getByRole('img')).toHaveAttribute('src', '/images/IMG_7109.JPG')
    const interactiveImage = screen.getByRole('button', { name: /reveal next memory fragment/i })
    await user.click(interactiveImage)
    expect(screen.getByText('02 / 03')).toBeInTheDocument()
    expect(screen.getByRole('img')).toHaveAttribute('src', '/images/IMG_7074.jpg')
    await user.click(interactiveImage)
    expect(screen.getByText('03 / 03')).toBeInTheDocument()
    expect(screen.getByRole('img')).toHaveAttribute('src', '/images/IMG_7076.jpg')
  })

  it('reveals natural sentences by clicking the image and finishes one perspective before the next', async () => {
    const user = userEvent.setup()
    await enterFirstMemory(user)
    const memoryImage = screen.getByRole('button', { name: /reveal next memory fragment/i })
    await user.click(memoryImage)
    expect(screen.getByText('DEBBY')).toBeInTheDocument()
    const debbySentence = screen.getByText(/my owner and i are sitting/i).textContent
    await user.click(memoryImage)
    expect(screen.getByText('PHOTOGRAPHER')).toBeInTheDocument()
    expect(screen.queryByText(debbySentence)).not.toBeInTheDocument()
    expect(screen.queryByLabelText(/previously revealed text/i)).not.toBeInTheDocument()

    while (screen.queryByRole('button', { name: /reveal next memory fragment/i })) {
      await user.click(screen.getByRole('button', { name: /reveal next memory fragment/i }))
    }
    expect(screen.getByRole('button', { name: /view object data/i })).toBeInTheDocument()
  })

  it('opens and closes object data with Escape', async () => {
    const user = userEvent.setup()
    await enterFirstMemory(user)
    while (screen.queryByRole('button', { name: /reveal next memory fragment/i })) {
      await user.click(screen.getByRole('button', { name: /reveal next memory fragment/i }))
    }
    await user.click(screen.getByRole('button', { name: /view object data/i }))
    expect(screen.getByRole('dialog', { name: /object data/i })).toBeInTheDocument()
    expect(screen.getByText('IMG_7109.JPG')).toBeInTheDocument()
    expect(screen.queryByText(/not provided/i)).not.toBeInTheDocument()
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('reaches the ending after the final journey and restarts', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: /enter memory with debby/i }))
    while (screen.queryByRole('button', { name: /reveal next memory fragment/i })) {
      await user.click(screen.getByRole('button', { name: /reveal next memory fragment/i }))
    }
    await user.click(screen.getByRole('button', { name: /finish journey/i }))

    const restart = screen.getByRole('button', { name: /restart/i })
    expect(screen.queryByText(/was any of it mine|you tell me/i)).not.toBeInTheDocument()
    await user.click(restart)
    expect(screen.getByRole('button', { name: /enter memory with debby/i })).toBeInTheDocument()
  })
})
