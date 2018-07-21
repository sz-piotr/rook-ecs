import { Query } from './Query'
import { Event } from './Events'
import { World, GameWorld } from './World'
import { System, InternalSystem, toInternalSystem } from './systems'

export class Game {
  private _systems: { [key: string]: InternalSystem[] } = {}
  private _world: GameWorld
  private _subscriptions: ((event: Event) => void)[] = []

  constructor (systems: System[], init?: (world: World) => void) {
    const queries: Query[] = []
    systems
      .map(toInternalSystem)
      .forEach(system => {
        this._systems[system.on] = this._systems[system.on] || []
        this._systems[system.on].push(system)
        if (system.query) {
          queries.push(system.query)
        }
      })
    this._world = new GameWorld(queries)
    if (init) {
      init(this._world)
    }
  }

  update (time: number) {
    this._world._internal_tick(time)

    while (true) {
      const event = this._world._internal_nextEvent()
      if (!event) {
        break
      }

      for (const listener of this._subscriptions) {
        listener(event)
      }

      if(this._systems[event.type]) {
        for (const system of this._systems[event.type]) {
          this._world._internal_handleChanges()
          system.process(
            system.query ? system.query.entities : [],
            this._world,
            event
          )
        }
      }
    }
  }

  start () {
    const update = () => {
      requestAnimationFrame(update)
      this.update(Date.now() / 1000)
    }
    update()
  }

  subscribe (listener: (event: Event) => void): () => void {
    this._subscriptions.push(listener)
    return () => {
      this._subscriptions.splice(
        this._subscriptions.indexOf(listener),
        1
      )
    }
  }
}
