import { Entity } from './Entity'
import { Selector } from './selectors'

export class Query {
  entities: Entity[]
  private indices = new WeakMap<Entity, number>()

  constructor (private selector: Selector, entities: Entity[]) {
    if (typeof selector !== 'function') {
      throw new TypeError('selector must be a function')
    }
    this.entities = entities.filter(selector)
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
