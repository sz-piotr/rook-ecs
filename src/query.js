import { Key } from './key'

export const Query = {
  all (...args) {
    return new UnbakedQuery().all(...args)
  }
}

class UnbakedQuery {
  constructor () {
    this.components = []
  }

  all (...args) {
    if (args.length === 0) {
      throw new Error('The all() method must take at least one argument.')
    }
    this.components.push(...args)

    return this
  }

  bake (engine) {
    return new BakedQuery(this, engine)
  }
}

class BakedQuery {
  constructor ({ components }, engine) {
    this.key = new Key(engine.componentsCount + components.length)
    components.forEach(component => {
      engine.registerComponent(component)
      this.key.set(engine.componentIdMap[component.id])
    })
    this.idMap = {}
    this.entities = []
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
