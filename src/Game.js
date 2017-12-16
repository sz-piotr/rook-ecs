import { Entity } from './entity'
import { assert, map, forEach, forEach2 } from './utils'
import { component } from './component'

export class Game {
  constructor () {
    this.entities = null
    this.changed = []
    this.removed = []

    this.systems = []
    this.queries = []
    this.componentCount = 0

    this.started = false
    this.onEntityChange = entity => this.onEntityChange(entity)
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
      update: system.update || createUpdate(system.processEntity)
    }

    this.systems.push(unifiedSystem)
    this._registerQuery(system.query)
  }

  _registerQuery (query) {
    if (Array.isArray(query)) {
      forEach(query, subQuery => this.queries.push(subQuery))
    } else {
      this.queries.push(query)
    }
  }

  createComponent (...fields) {
    assert(!this.started, 'Cannot register component after the game was started.')
    return component(fields, this.componentCount++)
  }

  start (init) {
    this.started = true
    init(this)

    let now
    let lastTime = Date.now()

    const tick = () => {
      window.requestAnimationFrame(tick)
      now = Date.now()
      this._update((now - lastTime) / 1000)
      lastTime = now
    }
    window.requestAnimationFrame(tick)
  }

  _update (timeDelta) {
    forEach(this.systems, system => this._runSystem(system, timeDelta))
  }

  _runSystem (system, timeDelta) {
    const entities = getEntities(system.query)
    system.update(entities, timeDelta, this)
    this._handleChanges()
  }

  _handleChanges () {
    forEach2(this.changed, this.queries, handleEntityChange)
    this.changed.length = 0

    forEach2(this.removed, this.queries, handleEntityRemove)
    this.removed.length = 0
  }
}

function createUpdate (processEntity) {
  return function (entities, timeDelta, game) {
    for (let i = 0; i < entities.length; ++i) {
      processEntity(entities[i], timeDelta, game)
    }
  }
}

function getEntities (query) {
  if (Array.isArray(query)) {
    return map(query, subQuery => subQuery.entities)
  }
}

function handleEntityChange (entity, query) {
  query.onChange(entity)
}

function handleEntityRemove (entity, query) {
  query.onRemove(entity)
}
