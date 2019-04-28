import { Entity, Instance } from './Entity'
import { EntitySelector } from './selector'

export interface World<E> {
  event: E
  query (selector: EntitySelector): Entity[]
  add <T extends Instance> (components?: T[]): Entity
  remove (entity: Entity): void
  emit (event: Instance): void
}
