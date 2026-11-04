export function Scene({ id, label, title, tone = 'day', children }) {
  const accessibleLabel = label ?? title ?? id
  return (
    <section className={`scene scene--${tone}`} data-scene={id} aria-labelledby={`${id}-title`}>
      <div className="scene__stage">
        <div className="scene__grain" aria-hidden="true" />
        <h1 className="sr-only" id={`${id}-title`}>{accessibleLabel}</h1>
        {children}
      </div>
    </section>
  )
}
