import { Entity } from './entity'

export class Engine {
  constructor() {
    this._entities = null
    this._components = null
    this._keyLength = 0
  }

  createEntity() {
    if(this._components === null) {
      throw new Error('Engine.defineComponents() must be called before creating any entities.')
    }

    const entity = new Entity(this._entities, this._keyLength)
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

  defineComponents(components) {
    if(this._components !== null) {
      throw new Error('Engine.defineComponents() can only be called once on every engine instance.')
    }

    if(!components.constructor === Array) {
      throw new Error('Engine.defineComponents() only accepts an Array as argument.')
    }

    this._components = components
    this._keyLength = Math.ceil(components.length / 2)
  }
}
