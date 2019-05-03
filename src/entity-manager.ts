import { Entity, clearNotify } from './entity'
import { Query } from './query'
import { EntitySelector } from './selector'

export class EntityManager {
  private changed: Entity[] = []
  private removed: Entity[] = []
  private queryAll = new Query(() => true, [])
  private queries: Query[] = [this.queryAll]
  private queryMap = new Map<EntitySelector, Query>()

  query = (selector: EntitySelector): Entity[] => {
    if (!selector.cache) {
      return this.queryAll.entities.filter(selector)
    }
    const existingQuery = this.queryMap.get(selector)
    if (existingQuery) {
      return existingQuery.entities
    } else {
      const newQuery = new Query(selector, this.queryAll.entities)
      this.queryMap.set(selector, newQuery)
      this.queries.push(newQuery)
      return newQuery.entities
    }
  }

  scheduleUpdate = (entity: Entity) => this.changed.push(entity)
  scheduleRemove = (entity: Entity) => this.removed.push(entity)

  processUpdates () {
    for (const query of this.queries) {
      this.changed.forEach(entity => query.onChange(entity))
      this.removed.forEach(entity => query.onRemove(entity))
    }
    this.changed.forEach(clearNotify)
    this.changed.length = 0
    this.removed.forEach(clearNotify)
    this.removed.length = 0
  }
}
