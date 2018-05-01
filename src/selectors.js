import { assert } from './utils'

export function hasAll (...components) {
  assert(components.every(isComponent), 'hasAll :: All arguments must be components.')
  return entity => components.every(
    component => entity.has(component)
  )
}

export function hasAny (...components) {
  assert(components.every(isComponent), 'hasAny :: All arguments must be components.')
  return entity => components.some(
    component => entity.has(component)
  )
}

function isComponent (Component) {
  return Component && Component.id
}
