import { assert } from './assert'

export class Query {
  constructor (selector) {
    assert(typeof selector === 'function', 'new Query :: selector must be a function')
    this._selector = selector
    this.entities = new Set()
  }

  onChange (entity) {
    if (this._selector(entity)) {
      this.entities.add(entity)
    } else {
      this.entities.delete(entity)
    }
  }

  onRemove (entity) {
    this.entities.delete(entity)
  }
}
