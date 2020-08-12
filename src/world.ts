import { Entity } from './entity'
import { Component } from './component'

export interface World<E> {
  event: E,
  query (...components: Component<any>[]): readonly Entity[],
  queryOne (...components: Component<any>[]): Entity | undefined,
  create (): Entity,
  remove (entity: Entity): void,
  emit (event: any): void
}
