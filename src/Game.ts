import { Events, Event } from './Events'
import { Query } from './Query'
import { World, GameWorld } from './World'
import { Entity, notifyAfterChangeRegistered } from './Entity'
import { System, InternalSystem, toInternalSystem } from './System'

export class Game {
  private _systems: InternalSystem[] = []
  private _world?: GameWorld
  private _initialized = false

  registerSystems (systems: System[]) {
    this._systems = systems.map(toInternalSystem)
    const queries = <Query[]> this._systems
      .map(system => system.query)
      .filter(query => !!query)
    this._world = new GameWorld(queries)
  }

  init (callback: (world: World) => void) {
    if (this._world == null) {
      throw new Error('Game.init :: Call game.registerSystems first.')
    }

    if (this._initialized) {
      throw new Error('Game.init :: Already initialized.')
    }

    this._initialized = true
    callback(this._world)
  }

  update (time: number) {
    if (this._world == null || !this._initialized) {
      throw new Error('Game.update :: Game has not been initialized.')
    }

    this._world._internal_tick(time)

    for (const system of this._systems) {
      const events = this._world._internal_getEvents(system.on)
      for (const event of events) {
        this._world._internal_handleChanges()
        const entities = system.query ? system.query.entities : []
        system.process(entities, this._world, event)
      }
    }
  }
}
