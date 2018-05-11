import { Entity } from './Entity'

export class World {
  constructor (game) {
    this._game = game
  }

  createEntity (assemblage) {
    const entity = new Entity(this._game._onEntityChange)
    if (assemblage) {
      assemblage(entity)
    }
    return entity
  }

  removeEntity (entity) {
    this._game._removedEntities.push(entity)
  }

  emit (event) {
    this._game._events.emit(event)
  }
}
