export function Hotspot({ label, x, y, width, height, variant = 'object', onClick, children, className = '' }) {
  return (
    <button
      type="button"
      className={`hotspot hotspot--${variant} ${className}`}
      aria-label={label}
      onClick={onClick}
      style={{ '--x': `${x}%`, '--y': `${y}%`, '--w': `${width}%`, '--h': `${height}%` }}
    >
      {children}
      <span className="hotspot__echo" aria-hidden="true" />
    </button>
  )
}
