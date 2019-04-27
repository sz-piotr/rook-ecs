import { Entity, Instance } from './Entity'

export interface World<E> {
  event: E
  query <T> (fn: (entity: Entity<never>) => entity is Entity<T>): Entity<T>[]
  add <T extends Instance> (components?: T[]): Entity<T>
  remove (entity: Entity): void
  emit (event: Instance): void
}
