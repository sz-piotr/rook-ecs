import { Entity, ComponentClass } from './entity'

export interface World<E> {
  event: E
  query (...components: ComponentClass<any>[]): Entity[]
  add (components?: any[]): Entity
  remove (entity: Entity): void
  emit (event: any): void
}
