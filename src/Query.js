import { Key } from './key'
import { IndexedArray } from './IndexedArray'

export class Query {
  constructor (...args) {
    this._components = args
    this._entities = new IndexedArray()
    this.key = null
    this._one = false
  }

  one () {
    this._one = true
    return this
  }

  get entities () {
    return this._one
      ? this._entities.elements[0]
      : this._entities.elements
  }

  bake (engine) {
    this.key = new Key(engine.componentsCount + this._components.length)
    this._components.forEach(component => {
      engine.registerComponent(component)
      this.key.set(engine.componentIdMap[component.id])
    })
    return this
  }

  onChange (entity) {
    const isInQuery = this._entities.has(entity)
    const matched = this.key.matches(entity.key)

    if (isInQuery && matched) {
      this._entities.put(entity)
    } else if (isInQuery && !matched) {
      this._entities.remove(entity)
    }
  }

  onRemove (entity) {
    this._entities.remove(entity)
  }
}
