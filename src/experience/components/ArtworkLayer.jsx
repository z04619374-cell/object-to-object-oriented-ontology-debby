export function ArtworkLayer({ src, alt = '', className = '', fit = 'contain' }) {
  return (
    <img
      className={`artwork-layer artwork-layer--${fit} ${className}`}
      src={src}
      alt={alt}
      aria-hidden={alt ? undefined : 'true'}
      draggable="false"
    />
  )
}
