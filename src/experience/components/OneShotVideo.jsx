import { useRef, useState } from 'react'

export function OneShotVideo({ src, label, onEnded, className = '' }) {
  const [failed, setFailed] = useState(false)
  const [attempt, setAttempt] = useState(0)
  const currentAttempt = useRef(0)
  const completedAttempt = useRef(null)

  const finish = () => {
    if (attempt !== currentAttempt.current || completedAttempt.current === attempt) return
    completedAttempt.current = attempt
    onEnded()
  }

  const retry = () => {
    currentAttempt.current += 1
    setFailed(false)
    setAttempt(currentAttempt.current)
  }

  if (failed) {
    return <button type="button" className="video-retry" aria-label={`Retry ${label}`} onClick={retry} />
  }

  return (
    <video
      key={attempt}
      className={`one-shot-video ${className}`}
      src={src}
      aria-label={label}
      autoPlay
      muted
      playsInline
      onEnded={finish}
      onError={() => setFailed(true)}
    />
  )
}
