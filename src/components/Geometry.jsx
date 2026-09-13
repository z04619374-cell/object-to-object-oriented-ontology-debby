export function Geometry({ dense = false }) {
  return (
    <div className={`geometry${dense ? ' geometry--dense' : ''}`} aria-hidden="true">
      <span className="geometry__line geometry__line--vertical" />
      <span className="geometry__line geometry__line--horizontal" />
      <span className="geometry__circle" />
      <span className="geometry__index">O / OOO</span>
    </div>
  )
}
