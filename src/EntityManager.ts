import { Entity, Constructor, clearNotify } from './Entity'
import { Query } from './Query'

export class EntityManager {
  private changed: Entity[] = []
  private removed: Entity[] = []
  private queryAll = new Query([], [])
  private queries: Query[] = [this.queryAll]
  private queryMap: Record<string, Query[] | undefined> = { '': [this.queryAll] }

  query = (...components: Constructor<any>[]): Entity[] => {
    const id = getQueryId(components)
    const queries = this.queryMap[id]
    if (queries) {
      const query = queries.find(hasComponents(components))
      if (query) {
        return query.entities
      }
    }
    const query = new Query(components, this.queryAll.entities)
    this.queryMap[id] = (this.queryMap[id] || []).concat([query])
    this.queries.push(query)
    return query.entities
  }

  scheduleUpdate = (entity: Entity) => {
    this.changed.push(entity)
  }

  scheduleRemove = (entity: Entity) => {
    this.removed.push(entity)
  }

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

function getQueryId (components: Constructor<any>[]) {
  return components
    .map(component => component.name)
    .join('&')
}

function hasComponents (components: Constructor<any>[]) {
  return (query: Query) => query.components.length === components.length &&
    query.components.every((component, index) => component === components[index])
}
