import { Entity } from './entity'
import { Component } from './component'

export function hasAll (components: Component<any>[]) {
  return (entity: Entity) => components.every(component => entity.has(component))
}

export class Query {
  entities: Entity[] = []
  private indices = new Map<Entity, number>()

  constructor (
    private selector: (entity: Entity) => boolean,
    entities: Entity[]
  ) {
    entities
      .filter(this.selector)
      .forEach(entity => this.onChange(entity))
  }

  onChange (entity: Entity) {
    if (this.selector(entity)) {
      if (this.indices.get(entity) == null) {
        this.indices.set(entity, this.entities.length)
        this.entities.push(entity)
      }
    } else {
      this.onRemove(entity)
    }
  }

  onRemove (entity: Entity) {
    const index = this.indices.get(entity)
    if (index != null) {
      const last = <Entity> this.entities.pop()
      if (last !== entity) {
        this.entities[index] = last
        this.indices.set(last, index)
      }
      this.indices.delete(entity)
    }
  }
}
