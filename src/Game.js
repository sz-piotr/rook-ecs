import { Entity } from './Entity'
import { Events } from './Events'
import { QueryArray } from './Query'
import { assert, forEach, forEach2 } from './utils'
import { createComponent } from './component'
import { defaultTicker } from './ticker'

export class Game {
  constructor (onTick = defaultTicker) {
    this._changed = []
    this._removed = []

    this._systems = []
    this._queries = []

    this._events = new Events()

    this._componentCount = 0

    this._started = false
    this._time = 0
    this._onTick = onTick
    this._onEntityChange = entity => this._changed.push(entity)

    this._proxy = {
      createEntity: assemblage => this._createEntity(assemblage),
      removeEntity: entity => this._removeEntity(entity),
      emit: event => this._emit(event)
    }
  }

  createComponent (...fields) {
    assert(!this._started, 'Cannot create component after the game was started.')
    return createComponent(fields, this._componentCount++)
  }

  registerSystems (systems) {
    forEach(systems, system => this.registerSystem(system))
  }

  registerSystem (system) {
    assert(!this._started, 'Cannot register systems after the game was started.')

    this._systems.push({
      query: unifyQuery(system.query),
      on: system.on || 'tick',
      process: system.process || createProcess(system.processEntity)
    })

    this._registerQuery(system.query)
  }

  _registerQuery (query) {
    if (Array.isArray(query)) {
      forEach(query, subQuery => this._queries.push(subQuery))
    } else if (query) {
      this._queries.push(query)
    }
  }

  start (init) {
    assert(!this._started, 'A game can only be started once!')
    this._started = true

    init(this._proxy)

    this._onTick(timeDelta => this._update(timeDelta))
  }

  _update (timeDelta) {
    this._time += timeDelta
    this._events.length = 0
    this._emit('tick')
    forEach(this._systems, system => this._runSystem(system))
  }

  _runSystem (system, timeDelta) {
    forEach(
      this._events.get(system.on),
      event => {
        this._handleChanges()
        system.process(system.query.entities, event, this._proxy)
      }
    )
  }

  _handleChanges () {
    forEach2(this._changed, this._queries, handleEntityChange)
    this._changed.length = 0

    forEach2(this._removed, this._queries, handleEntityRemove)
    this._removed.length = 0
  }

  _createEntity (assemblage) {
    assert(this._started, 'Entities cannot be created before the game is started.')
    const entity = new Entity(this._componentCount, this._onEntityChange)
    if (assemblage) {
      assemblage(entity)
    }
    return entity
  }

  _removeEntity (entity) {
    assert(this._started, 'Entities cannot be removed before the game is started.')
    this._removed.push(entity)
  }

  _emit (event) {
    this._events.emit(event, this._time)
  }
}

function unifyQuery (query) {
  return Array.isArray(query)
    ? new QueryArray(query)
    : query || { entities: [] }
}

function createProcess (processEntity) {
  return function (entities, event, game) {
    for (let i = 0; i < entities.length; ++i) {
      processEntity(entities[i], event, game)
    }
  }
}

function handleEntityChange (entity, query) {
  query.onChange(entity)
}

function handleEntityRemove (entity, query) {
  query.onRemove(entity)
}
