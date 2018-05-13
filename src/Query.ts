import { Entity } from './Entity'
import { Selector } from './selectors'

export function createQuery (selectors: Selector | Selector[]): Query {
  if (Array.isArray(selectors)) {
    return new MultiQuery(selectors)
  } else {
    return new SingleQuery(selectors)
  }
}

export type Query = SingleQuery | MultiQuery

export class SingleQuery {
  private _entities: Entity[] = []
  private _indexMap: { [key: number]: number } = {}
  private _selector: Selector

  constructor (_selector: Selector) {
    if (typeof _selector !== 'function') {
      throw new Error('new Query :: selector must be a function')
    }
    this._selector = _selector
  }

  get entities () {
    return this._entities
  }

  onChange (entity: Entity) {
    if (this._selector(entity)) {
      if (this._indexMap[entity.id] == null) {
        this._indexMap[entity.id] = this.entities.length
        this._entities.push(entity)
      }
    } else {
      this.onRemove(entity)
    }
  }

  onRemove (entity: Entity) {
    const index = this._indexMap[entity.id]
    if (index != null) {
      const last = <Entity>this._entities.pop()
      if (last !== entity) {
        this._entities[index] = last
        this._indexMap[last.id] = index
      }
    }
  }
}

export class MultiQuery {
  private _queries: SingleQuery[]

  constructor (_selectors: Selector[]) {
    this._queries = _selectors.map(selector => new SingleQuery(selector))
  }

  get entities () {
    return this._queries.map(query => query.entities)
  }

  onChange (entity: Entity) {
    for (const query of this._queries) {
      query.onChange(entity)
    }
  }

  onRemove (entity: Entity) {
    for (const query of this._queries) {
      query.onRemove(entity)
    }
  }
}
