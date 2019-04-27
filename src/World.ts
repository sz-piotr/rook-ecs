import { Entity, Instance, Constructor } from './Entity'

type Item<T extends any[]> = T extends (infer R)[] ? R : never
type Constructed<T extends Constructor<any>[]> = InstanceType<Item<T>>

export interface World<E> {
  event: E
  query <T extends Constructor<any>[]> (...components: T): Entity<Constructed<T>>[]
  add <T extends Instance> (components?: T[]): Entity<T>
  remove (entity: Entity): void
  emit (event: Instance): void
}
