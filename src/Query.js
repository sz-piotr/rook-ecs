import { Key } from './key'
import { IndexedArray } from './IndexedArray'
import { forEach } from './utils'

export class Query {
  constructor (...components) {
    this._entities = new IndexedArray()
    this._one = false

    this.key = new Key(maxId(components) + 1)
    forEach(components, ({ id }) => this.key.set(id))
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

function maxId (components) {
  let maxId = 0
  forEach(components, ({ id }) => id > maxId && (maxId = id))
  return maxId
}
