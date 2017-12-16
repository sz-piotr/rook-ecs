import { Entity } from './entity'
import { assert, map, forEach, forEach2 } from './utils'
import { createComponent } from './component'

export class Game {
  constructor (registerUpdate = onAnimationFrame) {
    this.entities = null
    this.changed = []
    this.removed = []

    this.systems = []
    this.queries = []
    this.componentCount = 0

    this.started = false
    this.registerUpdate = registerUpdate
    this.onEntityChange = entity => this.changed.push(entity)
  }

  createComponent (...fields) {
    assert(!this.started, 'Cannot create component after the game was started.')
    return createComponent(fields, this.componentCount++)
  }

  createEntity () {
    assert(this.started, 'Entities cannot be created before the game is started.')
    const entity = new Entity(this.componentCount, this.onEntityChange)

    entity.next = this.entities
    if (this.entities !== null) {
      this.entities.prev = entity
    }
    this.entities = entity

    return entity
  }

  removeEntity (entity) {
    assert(this.started, 'Entities cannot be removed before the game is started.')

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

  registerSystems (systems) {
    forEach(systems, system => this._registerSystem(system))
  }

  _registerSystem (system) {
    assert(!this.started, 'Cannot register systems after the game was started.')

    const unifiedSystem = {
      query: system.query || [],
      process: system.process || createProcess(system.processEntity)
    }

    this.systems.push(unifiedSystem)
    this._registerQuery(system.query)
  }

  _registerQuery (query) {
    if (Array.isArray(query)) {
      forEach(query, subQuery => this.queries.push(subQuery))
    } else if (query) {
      this.queries.push(query)
    }
  }

  start (init) {
    assert(!this.started, 'A game can only be started once!')
    this.started = true

    init(this)

    let lastTime = Date.now()
    this.registerUpdate(() => {
      const now = Date.now()
      this._update((now - lastTime) / 1000)
      lastTime = now
    })
  }

  _update (timeDelta) {
    forEach(this.systems, system => this._runSystem(system, timeDelta))
  }

  _runSystem (system, timeDelta) {
    this._handleChanges()
    const entities = getEntities(system.query)
    system.process(entities, timeDelta, this)
  }

  _handleChanges () {
    forEach2(this.changed, this.queries, handleEntityChange)
    this.changed.length = 0

    forEach2(this.removed, this.queries, handleEntityRemove)
    this.removed.length = 0
  }
}

function createProcess (processEntity) {
  return function (entities, timeDelta, game) {
    for (let i = 0; i < entities.length; ++i) {
      processEntity(entities[i], timeDelta, game)
    }
  }
}

function getEntities (query) {
  if (Array.isArray(query)) {
    return map(query, subQuery => subQuery.entities)
  } else {
    return query.entities
  }
}

function handleEntityChange (entity, query) {
  query.onChange(entity)
}

function handleEntityRemove (entity, query) {
  query.onRemove(entity)
}

function onAnimationFrame (callback) {
  window.requestAnimationFrame(update)
  function update () {
    window.requestAnimationFrame(update)
    callback()
  }
}
