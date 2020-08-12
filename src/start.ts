import { System } from './system'
import { InitEvent } from './events'
import { World } from './world'
import { EntityManager } from './EntityManager'

export function start (systems: System<any>[]) {
  const world = new World(new EntityManager(), systems)
  world.run(() => world.emit(new InitEvent()))
  return world
}
