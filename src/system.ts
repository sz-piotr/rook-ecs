import { World } from './world'

export type System<E> = (world: World, event: E) => void

export function system<T> (
  event: { new(...args: any[]): T },
  system: System<T>
): System<any> {
  return function (world, e) {
    if (e instanceof event) {
      return system(world, e)
    }
  }
}
