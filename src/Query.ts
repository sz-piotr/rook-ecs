import { Entity, Constructor } from './Entity'

export class Query {
  entities: Entity[]
  private indices = new WeakMap<Entity, number>()
  private selector: (entity: Entity) => boolean

  constructor (
    readonly components: Constructor<any>[],
    entities: Entity[],
  ) {
    this.selector = entity => components.every(c => entity.has(c))
    this.entities = entities.filter(this.selector)
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
      const last = <Entity>this.entities.pop()
      if (last !== entity) {
        this.entities[index] = last
        this.indices.set(last, index)
      }
    }
  }
}
