export function FullSceneAction({ label, onClick, children, className = '' }) {
  return (
    <button type="button" className={`full-scene-action ${className}`} aria-label={label} onClick={onClick}>
      {children}
    </button>
  )
}
