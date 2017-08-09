import { Entity } from './entity'

export class Engine {
  constructor() {
    this.entities = null
    this.dirtyEntites = []
    this.queries = []

    this.addToDirty = this.addToDirty.bind(this)
  }

  createEntity() {
    const entity = new Entity(this.entities, this.addToDirty)
    this.entities = entity

    return entity
  }

  addToDirty(entity) {
    this.dirtyEntites.push(entity)
  }

  removeEntity(entity) {
    const next = entity.next

    if(entity.next !== null) {
      entity.next.prev = entity.prev
      entity.next = null
    }

    if(entity.prev !== null) {
      entity.prev.next = entity.next
      entity.prev = null
    }

    if(this.entities = entity) {
      this.entities = next
    }
  }
}
