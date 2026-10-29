export function TransitionOverlay({ type, revision }) {
  return <div key={revision} className={`transition-overlay transition-overlay--${type}`} aria-hidden="true" />
}
