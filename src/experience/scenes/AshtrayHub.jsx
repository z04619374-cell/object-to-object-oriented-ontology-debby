import { Hand } from '../components/Hand'
import { Hotspot } from '../components/Hotspot'
import { IllustrationLayer } from '../components/IllustrationLayer'
import { Scene } from '../components/Scene'
import { SCENES, TRANSITIONS } from '../experienceReducer'

export function AshtrayHub({ onNavigate }) {
  return (
    <Scene id="hub" title="The ashtray" subtitle="Everything begins here">
      <IllustrationLayer x={50} y={67} width={100} height={48} className="hub-ground" />
      <IllustrationLayer x={50} y={72} width={22} height={18} className="ashtray">
        <span /><i />
      </IllustrationLayer>
      <IllustrationLayer x={50} y={50} width={1} height={78} className="hub-axis" />

      <Hotspot label="Look toward the road" x={18} y={55} width={22} height={37} variant="direction" onClick={() => onNavigate(SCENES.ROAD, TRANSITIONS.FADE)}>
        <span className="direction-card"><b>ROAD</b><i>←</i></span>
      </Hotspot>
      <Hotspot label="Look toward the statue" x={50} y={27} width={23} height={24} variant="direction" onClick={() => onNavigate(SCENES.STATUE, TRANSITIONS.FOCUS)}>
        <span className="direction-card"><b>STATUE</b><i>↑</i></span>
      </Hotspot>
      <Hotspot label="Look toward the tree" x={82} y={55} width={22} height={37} variant="direction" onClick={() => onNavigate(SCENES.TREE, TRANSITIONS.ZOOM)}>
        <span className="direction-card"><b>TREE</b><i>→</i></span>
      </Hotspot>
      <Hotspot label="Look toward the city" x={50} y={87} width={26} height={14} variant="direction" onClick={() => onNavigate(SCENES.CITY, TRANSITIONS.FADE)}>
        <span className="direction-card direction-card--city"><b>CITY</b><i>↓</i></span>
      </Hotspot>
      <p className="hub-prompt">Choose a direction by looking, not by leaving.</p>
      <Hand />
    </Scene>
  )
}
