import { Entity, Instance, Constructor } from './Entity'

export interface World<E> {
  event: E
  query <T extends Constructor<any>[]> (...components: T): Entity[]
  add <T extends Instance> (components?: T[]): Entity
  remove (entity: Entity): void
  emit (event: Instance): void
}
