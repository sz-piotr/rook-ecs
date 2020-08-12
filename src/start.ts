import { System } from './System'
import { InitEvent } from './events'
import { World } from './World'
import { EntityManager } from './EntityManager'

export function start (systems: System<any>[]) {
  const world = new World(new EntityManager(), systems)
  world.run(() => world.emit(new InitEvent()))
  return world
}
