function applyOptions(instance, { query, mappers = {} }) {
  for(let key in mappers) {
    instance[key] = instance.engine.getMapper(mappers[key])
  }
  if(query !== undefined) {
    instance.query = query
  }
}

export function system(options) {
  return function(update) {

    return class System {
      constructor(engine) {
        this.engine = engine
        applyOptions(this, options)
      }

      update(entities, timeDelta) {
        update.call(this, entities, timeDelta)
      }
    }

  }
}

export function iteratingSystem(options) {
  return function(update) {

    return class System {
      constructor(engine) {
        this.engine = engine
        applyOptions(this, options)
      }

      update(entities, timeDelta) {
        for(let i = entities.length - 1; i >= 0; i--) {
          update.call(this, entities[i], timeDelta)
        }
      }
    }

  }
}
