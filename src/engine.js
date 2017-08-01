import { Entity } from './entity'

export class Engine {
  constructor() {
    this._entities = null
  }

  createEntity() {
    const entity = new Entity(this, this._entities)
    this._entities = entity

    return entity
  }

  removeEntity(entity) {
    const next = entity._next

    if(entity._next !== null) {
      entity._next._prev = entity._prev
      entity._next = null
    }

    if(entity._prev !== null) {
      entity._prev._next = entity._next
      entity._prev = null
    }

    if(this._entities = entity) {
      this._entities = next
    }
  }
}
