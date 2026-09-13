export function Ending({ onRestart }) {
  return (
    <main className="restart-screen" id="main-content">
      <button className="text-button text-button--primary" type="button" onClick={onRestart}>Restart <span aria-hidden="true">↺</span></button>
    </main>
  )
}
