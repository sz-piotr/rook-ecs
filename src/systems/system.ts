import { World } from '../World'
import { Constructor } from '../Entity'

export type System<E> = (world: World<E>) => void | (() => void)

export function system <T> (event: Constructor<T>, system: System<T>): System<any> {
  return function (world) {
    if (world.event instanceof event) {
      return system(world)
    }
  }
}
