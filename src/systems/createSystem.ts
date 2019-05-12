import { World } from '../world'

export interface EventConstructor<T> {
  new (...args: any[]): T
}

export type System<E> = (world: World<E>) => void | (() => void)

export function createSystem <T> (event: EventConstructor<T>, system: System<T>): System<any> {
  return function (world) {
    if (world.event instanceof event) {
      return system(world)
    }
  }
}
