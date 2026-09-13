import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react'
import { Ending } from './components/Ending'
import { Geometry } from './components/Geometry'
import { Intro } from './components/Intro'
import { JourneyFrame } from './components/JourneyFrame'
import { MetadataPanel } from './components/MetadataPanel'
import { PerspectiveStack } from './components/PerspectiveStack'
import { journeys } from './data/journeys'
import { initialNarrativeState, narrativeReducer } from './narrativeReducer'
import { buildPerspectiveSequence } from './utils/perspectiveSequence'

export default function App() {
  const [state, dispatch] = useReducer(narrativeReducer, initialNarrativeState)
  const dataTriggerRef = useRef(null)
  const journey = journeys[state.journeyIndex]
  const sequence = useMemo(() => buildPerspectiveSequence(journey.perspectives), [journey])
  const closeMetadata = useCallback(() => dispatch({ type: 'TOGGLE_METADATA' }), [])

  useEffect(() => {
    if (!state.metadataOpen && dataTriggerRef.current) dataTriggerRef.current.focus()
  }, [state.metadataOpen])

  if (state.phase === 'intro') {
    return <Intro onBegin={() => dispatch({ type: 'BEGIN' })} />
  }

  if (state.phase === 'ending') {
    return <Ending onRestart={() => dispatch({ type: 'RESTART' })} />
  }

  const allPerspectivesVisible = state.visiblePerspectives === sequence.length
  const revealNext = () => {
    dispatch({ type: 'CYCLE_IMAGE', totalImages: journey.images.length })
    dispatch({ type: 'CONTINUE', totalSteps: sequence.length })
  }
  const moveForward = () => {
    if (state.journeyIndex === journeys.length - 1) dispatch({ type: 'FINISH' })
    else dispatch({ type: 'NEXT', totalJourneys: journeys.length })
  }

  return (
    <main className={`experience${state.memoryStatus === 'open' ? ' experience--open' : ''}`} id="main-content">
      <Geometry dense={state.visiblePerspectives > 1} />
      <JourneyFrame
        journey={journey}
        imageIndex={state.imageIndex}
        memoryOpen={state.memoryStatus === 'open'}
        currentFragment={sequence[state.visiblePerspectives - 1]}
        sequenceComplete={allPerspectivesVisible}
        onAdvance={revealNext}
        onOpen={() => dispatch({ type: 'OPEN_MEMORY' })}
        onPreviousImage={() => dispatch({ type: 'PREVIOUS_IMAGE' })}
        onNextImage={() => dispatch({ type: 'NEXT_IMAGE', totalImages: journey.images.length })}
      />
      {state.memoryStatus === 'open' ? (
        <PerspectiveStack
          sequence={sequence}
          visibleCount={state.visiblePerspectives}
          onViewData={() => {
            dataTriggerRef.current = document.activeElement
            dispatch({ type: 'TOGGLE_METADATA' })
          }}
          onNextJourney={moveForward}
          isLast={state.journeyIndex === journeys.length - 1}
        />
      ) : null}
      {state.metadataOpen && allPerspectivesVisible ? (
        <MetadataPanel entries={journey.images.filter((image) => Object.keys(image.metadata).length > 0)} onClose={closeMetadata} />
      ) : null}
    </main>
  )
}
