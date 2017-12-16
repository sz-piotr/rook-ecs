import { Key } from './key'

export class Query {
  constructor (...args) {
    this.components = args
    this.key = null
    this.idMap = {}
    this.entities = []
  }

  bake (engine) {
    this.key = new Key(engine.componentsCount + this.components.length)
    this.components.forEach(component => {
      engine.registerComponent(component)
      this.key.set(engine.componentIdMap[component.id])
    })
    return this
  }

  onChange (entity) {
    const index = this.idMap[entity.id]
    const matched = entity.key.matches(this.key)
    if (index === undefined && matched) {
      this.idMap[entity.id] = this.entities.length
      this.entities.push(entity)
    } else if (index !== undefined && !matched) {
      this.remove(entity, index)
    }
  }

  onRemove (entity) {
    const index = this.idMap[entity.id]
    if (index !== undefined) {
      this.remove(entity, index)
    }
  }

  remove (entity, index) {
    delete this.idMap[entity.id]
    const otherEntity = this.entities.pop()
    if (otherEntity !== entity) {
      this.entities[index] = otherEntity
      this.idMap[otherEntity.id] = index
    }
  }
}
