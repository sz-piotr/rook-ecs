import { assert } from './utils'

export class Query {
  constructor (selector) {
    assert(typeof selector === 'function', 'new Query :: selector must be a function')
    this._selector = selector
    this._entities = new Set()
  }

  get entities () {
    return this._entities
  }

  onChange (entity) {
    if (this._selector(entity)) {
      this._entities.add(entity)
    } else {
      this._entities.delete(entity)
    }
  }

  onRemove (entity) {
    this._entities.delete(entity)
  }
}
