import { Entity } from './Entity'
import { Component } from './Component'

export class Query {
  entities: Entity[] = []
  private indices = new Map<Entity, number>()

  constructor (
    private components: Component<any>[],
    entities: Entity[]
  ) {
    for (const entity of entities) {
      this.onChange(entity)
    }
  }

  onChange (entity: Entity) {
    if (this.components.every(component => entity.has(component))) {
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
