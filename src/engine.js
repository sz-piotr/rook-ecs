import { Entity } from './entity'

export class Engine {
  constructor () {
    this.entities = null
    this.changed = []
    this.removed = []

    this.systems = []
    this.queries = []
    this.componentIdMap = []
    this.componentsCount = 0

    this.started = false
    this.running = false

    this.onEntityKeyChange = this.onEntityKeyChange.bind(this)
  }

  createEntity () {
    if (!this.started) {
      throw new Error('Entities cannot be added before the engine is started.')
    }

    const entity = new Entity(
      this.componentsCount,
      this.componentIdMap,
      this.onEntityKeyChange
    )
    entity.next = this.entities
    if (this.entities !== null) {
      this.entities.prev = entity
    }
    this.entities = entity

    return entity
  }

  removeEntity (entity) {
    if (!this.started) {
      throw new Error('Entities cannot be removed before the engine is started.')
    }

    const next = entity.next
    const prev = entity.prev

    if (next !== null) {
      next.prev = entity.prev
    }
    if (prev !== null) {
      prev.next = entity.next
    }

    entity.next = null
    entity.prev = null

    if (this.entities === entity) {
      this.entities = next
    }

    this.removed.push(entity)
  }

  onEntityKeyChange (entity) {
    this.changed.push(entity)
  }

  registerSystem ({ query, sort, update, processEntity }) {
    if (this.started) {
      throw new Error('Cannot register system after entities have been added or the engine was started.')
    }

    if (bothOrNone(update, processEntity)) {
      throw new Error('Exactly one of "update" and "processEntity" must be defined on a system.')
    }

    if (!query && processEntity) {
      throw new Error('"processEntity" can only be used with a query.')
    }

    if (!query && sort) {
      throw new Error('"sort" can only be used with a query.')
    }

    const system = {
      query: query ? query.bake(this) : false,
      sort,
      sorted: [],
      update: update || function (entities, timeDelta, engine) {
        for (let i = 0; i < entities.length; ++i) {
          processEntity(entities[i], timeDelta, engine)
        }
      }
    }

    this.systems.push(system)

    if (system.query) {
      this.queries.push(system.query)
    }
  }

  registerComponent (component) {
    if (this.started) {
      throw new Error('Cannot register component after entities have been added or the engine was started.')
    }

    while (component.id >= this.componentIdMap.length) {
      this.componentIdMap.push(null)
    }
    const index = this.componentIdMap[component.id]
    if (index === null) {
      this.componentIdMap[component.id] = this.componentsCount++
    }
  }

  start (init) {
    // TODO: add pause
    this.started = true
    this.running = true
    if (init) {
      init(this)
    }

    let now
    let lastTime = Date.now()
    const tick = () => {
      if (this.running) {
        now = Date.now()
        this.update((now - lastTime) / 1000)
        lastTime = now
      }
      window.requestAnimationFrame(tick)
    }
    window.requestAnimationFrame(tick)
  }

  update (timeDelta) {
    for (let i = 0; i < this.systems.length; ++i) {
      this.runSystem(this.systems[i], timeDelta)
      this.handleChanges()
    }
  }

  runSystem (system, timeDelta) {
    if (system.query) {
      let entities = system.query.entities
      if (system.sort) {
        copyArray(entities, system.sorted)
        entities = system.sorted
        entities.sort(system.sort)
      }
      system.update(entities, timeDelta, this)
    } else {
      system.update(timeDelta, this)
    }
  }

  handleChanges () {
    for (let i = 0; i < this.changed.length; i++) {
      let changed = this.changed[i]
      for (let j = 0; j < this.queries.length; j++) {
        this.queries[j].onChange(changed)
      }
    }
    this.changed.length = 0

    for (let i = 0; i < this.removed.length; i++) {
      let removed = this.removed[i]
      for (let j = 0; j < this.queries.length; j++) {
        this.queries[j].onRemove(removed)
      }
    }
    this.changed.length = 0
  }
}

function bothOrNone (a, b) {
  return (a && b) || (!a && !b)
}

function copyArray (from, to) {
  for (let i = 0; i < from.length; ++i) {
    to[i] = from[i]
  }
  to.length = from.length
}
