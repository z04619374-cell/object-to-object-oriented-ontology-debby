export function Scene({ id, title, subtitle, tone = 'day', children }) {
  return (
    <section className={`scene scene--${tone}`} data-scene={id} aria-labelledby={`${id}-title`}>
      <div className="scene__stage">
        <div className="scene__grain" aria-hidden="true" />
        <header className="scene__caption">
          <p>{subtitle}</p>
          <h1 id={`${id}-title`}>{title}</h1>
        </header>
        {children}
        <span className="scene__index" aria-hidden="true">RMIT / {id.toUpperCase()}</span>
      </div>
    </section>
  )
}
