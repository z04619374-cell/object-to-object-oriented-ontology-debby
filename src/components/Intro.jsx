import { assetPath } from '../utils/assetPath'

export function Intro({ onBegin }) {
  return (
    <main className="intro-minimal" id="main-content">
      <p className="intro-greeting">Hi, I'm Debby</p>
      <button className="memory-entry memory-entry--solo" type="button" onClick={onBegin} aria-label="Enter memory with Debby">
        <img src={assetPath(import.meta.env.BASE_URL, 'images/debby-enter.png')} alt="" />
        <span>Enter memory</span>
      </button>
    </main>
  )
}
