import { Entity, Constructor } from './Entity'

export type Selector<T = any> = (entity: Entity<any>) => entity is Entity<T>

type Item<T extends any[]> = T extends (infer R)[] ? R : never
type Constructed<T extends Constructor<any>[]> = InstanceType<Item<T>>

export function hasAll <T extends Constructor<any>[]> (...components: T): Selector<Constructed<T>> {
  if (components.some(component => typeof component !== 'function')) {
    throw new TypeError('All arguments must be components.')
  }

  return (entity): entity is Entity<Constructed<T>> =>
    components.every(component => entity.has(component))
}

