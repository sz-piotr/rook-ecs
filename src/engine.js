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
    const next = entity.detach()
    if(this._entities = entity) {
      this._entities = next
    }
  }
}
