import { Hotspot } from './Hotspot'

export function ReturnHotspot({ onReturn, label = 'Return to the ashtray' }) {
  return (
    <Hotspot label={label} x={7} y={88} width={15} height={10} variant="return" onClick={onReturn}>
      <span aria-hidden="true">←</span>
    </Hotspot>
  )
}
