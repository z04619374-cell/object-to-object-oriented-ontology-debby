export function PerspectiveStack({ sequence, visibleCount, onViewData, onNextJourney, isLast }) {
  const complete = visibleCount === sequence.length

  return (
    <section className="perspectives" aria-label="Perspectives on this image">
      <div className="perspectives__header">
        <p className="micro-label">MEMORY / RECORD</p>
        <p>{String(visibleCount).padStart(2, '0')} / {String(sequence.length).padStart(2, '0')}</p>
      </div>
      {!complete ? <p className="perspectives__instruction">Click the image to reveal the next sentence.</p> : null}
      <div className="perspectives__actions">
        {complete ? (
          <>
            <button className="text-button" type="button" onClick={onViewData}>View object data <span aria-hidden="true">＋</span></button>
            <button className="text-button text-button--primary" type="button" onClick={onNextJourney}>{isLast ? 'Finish journey' : 'Next journey'} <span aria-hidden="true">→</span></button>
          </>
        ) : null}
      </div>
    </section>
  )
}
