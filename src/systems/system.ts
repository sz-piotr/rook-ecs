import { World } from '../world'
import { Constructor } from '../entity'

export type System<E> = (world: World<E>) => void | (() => void)

export function system <T> (event: Constructor<T>, system: System<T>): System<any> {
  return function (world) {
    if (world.event instanceof event) {
      return system(world)
    }
  }
}
