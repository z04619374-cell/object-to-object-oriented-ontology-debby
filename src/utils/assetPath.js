export function assetPath(base, path) {
  return `${base.replace(/\/?$/, '/')}${path.replace(/^\//, '')}`
}
