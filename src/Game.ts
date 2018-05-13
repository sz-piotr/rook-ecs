import { Query } from './Query'
import { World, GameWorld } from './World'
import { System, InternalSystem, toInternalSystem } from './systems'

export class Game {
  private _systems: InternalSystem[] = []
  private _world: GameWorld

  constructor (systems: System[], init?: (world: World) => void) {
    this._systems = systems.map(toInternalSystem)
    this._world = new GameWorld(
      <Query[]>this._systems
        .map(system => system.query)
        .filter(query => !!query)
    )
    if (init) {
      init(this._world)
    }
  }

  update (time: number) {
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

  start () {
    const update = () => {
      requestAnimationFrame(update)
      this.update(Date.now() / 1000)
    }
    update()
  }
}
