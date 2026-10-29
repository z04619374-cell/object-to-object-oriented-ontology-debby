const labels = {
  cigarette: 'cigarette',
  fork: 'fork',
  gun: 'hand gesture',
  torch: 'torch',
}

export function Hand({ tool = 'cigarette', active = false, src }) {
  if (src) {
    return (
      <img
        className={`hand-asset${active ? ' hand-asset--active' : ''}`}
        src={src}
        alt=""
        aria-hidden="true"
        draggable="false"
      />
    )
  }

  return (
    <div className={`hand hand--${tool}${active ? ' hand--active' : ''}`} aria-hidden="true">
      <span className="hand__wrist" />
      <span className="hand__finger" />
      <span className="hand__tool"><i /></span>
      <span className="sr-only">{labels[tool]}</span>
    </div>
  )
}
