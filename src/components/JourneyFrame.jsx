export function JourneyFrame({ journey, imageIndex, memoryOpen, currentFragment, sequenceComplete, onAdvance, onOpen, onPreviousImage, onNextImage }) {
  const image = journey.images[imageIndex]
  const mediaContent = (
    <>
      <img src={image.src} alt={image.alt} />
      <span className="journey-frame__corner journey-frame__corner--a" aria-hidden="true" />
      <span className="journey-frame__corner journey-frame__corner--b" aria-hidden="true" />
      <span className="journey-frame__image-label">IMAGE {String(imageIndex + 1).padStart(2, '0')}</span>
    </>
  )

  return (
    <section
      className={`journey-frame${memoryOpen ? ' journey-frame--open' : ''}`}
      aria-label={memoryOpen ? 'Debby memory' : undefined}
      aria-labelledby={memoryOpen ? undefined : 'journey-heading'}
    >
      <div className="journey-frame__meta">
        <p className="micro-label">DEBBY’S JOURNEY</p>
        <p className="journey-frame__count">{String(imageIndex + 1).padStart(2, '0')} / {String(journey.images.length).padStart(2, '0')}</p>
      </div>
      <div className="journey-frame__media-wrap">
        {memoryOpen && !sequenceComplete ? (
          <button className="journey-frame__media journey-frame__media--interactive" type="button" onClick={onAdvance} aria-label="Reveal next memory fragment">
            {mediaContent}
          </button>
        ) : <div className="journey-frame__media">{mediaContent}</div>}
      </div>
      {!memoryOpen ? (
        <div className="image-nav" aria-label="Journey photographs">
          {imageIndex > 0 ? <button className="quiet-button" type="button" onClick={onPreviousImage}>← Previous image</button> : <span />}
          <p>{image.subject}</p>
          {imageIndex < journey.images.length - 1 ? (
            <button className="quiet-button" type="button" onClick={onNextImage}>Next image →</button>
          ) : (
            <button className="text-button image-nav__open" type="button" onClick={onOpen}>Open this memory <span aria-hidden="true">→</span></button>
          )}
        </div>
      ) : null}
      <div className="journey-frame__caption">
        {memoryOpen ? (
          <div className={`current-fragment current-fragment--${currentFragment?.perspectiveId ?? 'waiting'}`} aria-live="polite">
            <p className="current-fragment__label">{currentFragment?.label ?? 'CLICK THE IMAGE'}</p>
            <p className="current-fragment__text">{currentFragment?.text ?? 'Begin the account.'}</p>
          </div>
        ) : (
          <>
            <div>
              <p className="journey-frame__date">{journey.date}</p>
              <h2 id="journey-heading">{journey.location}</h2>
            </div>
            <p className="journey-frame__story">“{journey.caption}”</p>
          </>
        )}
      </div>
    </section>
  )
}
