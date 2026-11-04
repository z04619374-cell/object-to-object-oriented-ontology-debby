import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { BaseSceneArrows } from './BaseSceneArrows'
import { Scene } from './Scene'

describe('shared scene components', () => {
  it('renders only screen-reader scene naming, without captions or indices', () => {
    const { container } = render(<Scene id="road" label="Road scene"><div /></Scene>)

    expect(screen.getByRole('heading', { name: 'Road scene' })).toHaveClass('sr-only')
    expect(container.querySelector('.scene__caption')).not.toBeInTheDocument()
    expect(container.querySelector('.scene__index')).not.toBeInTheDocument()
  })

  it('renders four directional image arrows for a base scene', async () => {
    const user = userEvent.setup()
    const onNavigate = vi.fn()
    const { container } = render(<BaseSceneArrows scene="road" onNavigate={onNavigate} />)

    await user.click(screen.getByRole('button', { name: /look left/i }))
    await user.click(screen.getByRole('button', { name: /look right/i }))
    await user.click(screen.getByRole('button', { name: /look up/i }))
    await user.click(screen.getByRole('button', { name: /look down/i }))

    expect(onNavigate).toHaveBeenNthCalledWith(1, 'left')
    expect(onNavigate).toHaveBeenNthCalledWith(2, 'right')
    expect(onNavigate).toHaveBeenNthCalledWith(3, 'up')
    expect(onNavigate).toHaveBeenNthCalledWith(4, 'down')
    expect(container.querySelectorAll('.base-arrow img')).toHaveLength(4)
    expect(container.querySelector('.base-arrow--left img')).toHaveStyle({ transform: 'rotate(-90deg)' })
    expect(container.querySelector('.base-arrow--right img')).toHaveStyle({ transform: 'rotate(90deg)' })
    expect(container.querySelector('.base-arrow--up img')).toHaveStyle({ transform: 'rotate(0deg)' })
    expect(container.querySelector('.base-arrow--down img')).toHaveStyle({ transform: 'rotate(180deg)' })
  })
})
