import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { OneShotVideo } from './OneShotVideo'

describe('OneShotVideo', () => {
  it('renders required inline one-shot playback attributes', () => {
    render(<OneShotVideo src="/clip.mp4" label="Car departure" onEnded={() => {}} />)

    const video = screen.getByLabelText('Car departure')
    expect(video).toHaveAttribute('src', '/clip.mp4')
    expect(video).toHaveAttribute('playsinline')
    expect(video).toHaveAttribute('autoplay')
    expect(video).not.toHaveAttribute('loop')
    expect(video.muted).toBe(true)
  })

  it('reports completion once even if ended fires twice', () => {
    const onEnded = vi.fn()
    render(<OneShotVideo src="/clip.mp4" label="Car departure" onEnded={onEnded} />)

    const video = screen.getByLabelText('Car departure')
    fireEvent.ended(video)
    fireEvent.ended(video)

    expect(onEnded).toHaveBeenCalledTimes(1)
  })

  it('replaces a failed video with an invisible full-scene retry', async () => {
    const user = userEvent.setup()
    render(<OneShotVideo src="/clip.mp4" label="Car departure" onEnded={() => {}} />)

    const firstVideo = screen.getByLabelText('Car departure')
    fireEvent.error(firstVideo)

    expect(screen.queryByText(/error|retry/i)).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /retry car departure/i }))
    expect(screen.getByLabelText('Car departure')).not.toBe(firstVideo)
  })
})
