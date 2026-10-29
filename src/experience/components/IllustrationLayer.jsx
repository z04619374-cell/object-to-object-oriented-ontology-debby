export function IllustrationLayer({ x, y, width, height, className = '', children }) {
  return (
    <div
      className={`illustration ${className}`}
      aria-hidden="true"
      style={{ '--x': `${x}%`, '--y': `${y}%`, '--w': `${width}%`, '--h': `${height}%` }}
    >
      {children}
    </div>
  )
}
