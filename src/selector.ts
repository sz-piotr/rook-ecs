import { Constructor, Entity } from './Entity'

export type EntitySelector = ((entity: Entity) => boolean) & { cache?: boolean }

export function selectAll (...components: Constructor<any>[]) {
  return (entity: Entity) => components.every(component => entity.has(component))
}

export function createCachedSelector (selector: EntitySelector): EntitySelector {
  const result = (entity: Entity) => selector(entity)
  result.cache = true
  return result
}
