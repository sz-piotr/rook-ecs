import { System } from './System'
import { InitEvent } from './events'
import { World } from './World'

export function start (systems: System<any>[]) {
  const world = new World(systems)
  world.run(() => world.emit(new InitEvent()))
  return world
}
