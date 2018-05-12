import { Events } from './Events'
import { Query } from './Query'
import { assert } from './assert'
import { World } from './World'

export class Game {
  private _systems = []
  private _queries = []
  private _events = new Events()

  private _changedEntities = []
  private _removedEntities = []
  private _onEntityChange = entity => this._changedEntities.push(entity)

  private _time = null
  private _world = new World(this)

  registerSystems (systems) {
    this._systems = systems.map(system => ({
      query: system.query && new Query(system.query),
      on: system.on || 'tick',
      process: system.process || createProcess(system.processEntity)
    }))
    this._queries = this._systems
      .map(system => system.query)
      .filter(query => !!query)
  }

  init (time, callback) {
    assert(this._time === null, 'Game.init :: Game can only be initialized once.')
    this._time = time
    callback(this._world)
  }

  update (time) {
    const timeDelta = time - this._time
    this._time = time

    this._events.clear()
    this._events.emit('tick', this._time)

    this._runSystems(timeDelta)
  }

  _runSystems (timeDelta) {
    for (const system of this._systems) {
      for (const event of this._events.get(system.on)) {
        this._handleChanges()
        system.process(
          system.query && system.query.entities,
          event,
          this._world
        )
      }
    }
  }

  _handleChanges () {
    for (const entity of this._changedEntities) {
      for (const query of this._queries) {
        query.onChange(entity)
      }
      entity._onChangeRegistered()
    }
    this._changedEntities.length = 0

    for (const entity of this._removedEntities) {
      for (const query of this._queries) {
        query.onRemove(entity)
      }
    }
    this._removedEntities.length = 0
  }
}

function createProcess (processEntity) {
  return function (entities, event, game) {
    for (const entity of entities) {
      processEntity(entity, event, game)
    }
  }
}
