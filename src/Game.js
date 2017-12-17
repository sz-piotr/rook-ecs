import { Entity } from './Entity'
import { assert, map, forEach, forEach2 } from './utils'
import { createComponent } from './component'

export class Game {
  constructor (registerUpdate = onAnimationFrame) {
    this.changed = []
    this.removed = []

    this.systems = []
    this.queries = []

    this.events = []
    this.eventTimes = {}

    this.componentCount = 0

    this.started = false
    this.registerUpdate = registerUpdate
    this.onEntityChange = entity => this.changed.push(entity)
  }

  createComponent (...fields) {
    assert(!this.started, 'Cannot create component after the game was started.')
    return createComponent(fields, this.componentCount++)
  }

  registerSystems (systems) {
    forEach(systems, system => this._registerSystem(system))
  }

  _registerSystem (system) {
    assert(!this.started, 'Cannot register systems after the game was started.')

    const unifiedSystem = {
      query: system.query || [],
      on: system.on,
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

    this.registerUpdate(() => this._update())
  }

  _update (timeDelta) {
    this.events.length = 0
    this.emit('tick')
    forEach(this.systems, system => this._runSystem(system))
  }

  _runSystem (system, timeDelta) {
    const events = this._getEventsFor(system)
    forEach(events, event => {
      this._handleChanges()
      const entities = getEntities(system.query)
      system.process(entities, event, this)
    })
  }

  _getEventsFor (system) {
    if (!system.on) {
      return [this.events[0]]
    } else {
      return this.events.filter(event => event.type === system.on)
    }
  }

  _handleChanges () {
    forEach2(this.changed, this.queries, handleEntityChange)
    this.changed.length = 0

    forEach2(this.removed, this.queries, handleEntityRemove)
    this.removed.length = 0
  }

  createEntity () {
    assert(this.started, 'Entities cannot be created before the game is started.')
    return new Entity(this.componentCount, this.onEntityChange)
  }

  removeEntity (entity) {
    assert(this.started, 'Entities cannot be removed before the game is started.')
    this.removed.push(entity)
  }

  emit (event) {
    if (typeof event === 'string') {
      event = { type: event }
    }
    const now = Date.now()
    const lastTime = this.eventTimes[event] || now
    event.timeDelta = (now - lastTime) / 1000
    this.eventTimes[event] = now
    this.events.push(event)
  }
}

function createProcess (processEntity) {
  return function (entities, event, game) {
    for (let i = 0; i < entities.length; ++i) {
      processEntity(entities[i], event, game)
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
