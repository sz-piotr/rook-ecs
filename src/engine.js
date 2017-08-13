import { Entity } from './entity'

export class Engine {
  constructor() {
    this.entities = null
    this.dirtyEntites = []
    this.systems = []
    this.componentIdMap = []
    this.componentsCount = 0

    this.configurable = true
    this.running = false

    this.onEntityKeyChange = this.onEntityKeyChange.bind(this)
  }

  createEntity() {
    this.configurable = false
    const entity = new Entity(
      this.componentsCount,
      this.componentIdMap,
      this.onEntityKeyChange
    )
    entity.next = this.entities
    if(this.entities !== null) {
      this.entities.prev = entity
    }
    this.entities = entity

    return entity
  }

  removeEntity(entity) {
    const next = entity.next
    const prev = entity.prev

    if(next !== null) {
      next.prev = entity.prev
    }
    if(prev !== null) {
      prev.next = entity.next
    }

    entity.next = null
    entity.prev = null

    if(this.entities = entity) {
      this.entities = next
    }
  }

  onEntityKeyChange(entity) {
    this.dirtyEntites.push(entity)
  }

  registerSystem({ query, sort, update, processEntity }) {
    if(!this.configurable) {
      throw new Error('Cannot register system after entities have been added or the engine was started.')
    }

    if(bothOrNone(update, processEntity)) {
      throw new Error('Exactly one of "update" and "processEntity" must be defined on a system.')
    }

    if(!query && processEntity) {
      throw new Error('"processEntity" can only be used with a query.')
    }

    this.systems.push({
      query: query ? query.bake(this) : false,
      sort,
      update: update || function(entities, timeDelta, engine) {
        for(let i = 0; i < entities.length; ++i) {
          processEntity(entities[i], timeDelta, engine)
        }
      }
    })
  }

  registerComponent(component) {
    if(!this.configurable) {
      throw new Error('Cannot register component after entities have been added or the engine was started.')
    }

    while(component.id >= this.componentIdMap.length) {
      this.componentIdMap.push(null)
    }
    const index = this.componentIdMap[component.id]
    if(index === null) {
      this.componentIdMap[component.id] = this.componentsCount++
    }
  }
}

function bothOrNone(a, b) {
  return (a && b) || (!a && !b)
}
