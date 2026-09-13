import { useEffect, useRef } from 'react'

const labels = {
  file: 'FILE', date: 'DATE', time: 'TIME', camera: 'CAMERA', location: 'LOCATION',
  object: 'OBJECT', owner: 'OWNER', position: 'POSITION', photo: 'PHOTO', lens: 'LENS',
  dimensions: 'IMAGE', profile: 'PROFILE', exposure: 'EXPOSURE',
}

export function MetadataPanel({ entries, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    closeRef.current?.focus()
    const handleKey = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <div className="data-overlay" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="data-panel" role="dialog" aria-modal="true" aria-labelledby="object-data-title">
        <header className="data-panel__header">
          <div><p className="micro-label">ARCHIVE ENTRY</p><h2 id="object-data-title">Object Data</h2></div>
          <button ref={closeRef} className="icon-button" type="button" onClick={onClose} aria-label="Close object data">×</button>
        </header>
        {entries.map((entry, index) => (
          <div className="data-panel__entry" key={entry.src}>
            <p className="data-panel__entry-index">IMAGE {String(index + 1).padStart(2, '0')} / {entry.subject}</p>
            <dl>
              {Object.entries(entry.metadata).filter(([, value]) => value).map(([key, value]) => (
                <div key={key}><dt>{labels[key] ?? key.toUpperCase()}</dt><dd>{value}</dd></div>
              ))}
            </dl>
          </div>
        ))}
        <p className="data-panel__note">A record is not the thing it records.</p>
      </section>
    </div>
  )
}
