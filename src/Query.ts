import { assert } from './assert'

export class Query {
  private entities = new Set()

  constructor (private _selector) {
    assert(typeof _selector === 'function', 'new Query :: selector must be a function')
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
