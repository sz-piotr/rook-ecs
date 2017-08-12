import { ObjectPool } from './objectpool'

let index = 0

export function component(objectConstructor, objectDestructor) {
  const pool = new ObjectPool(objectConstructor)

  const component = {
    id: index++,

    create() {
      if(pool.isEmpty()) {
        return new objectConstructor(...arguments)
      } else {
        const instance = pool.get()
        objectConstructor.apply(instance, arguments)
        return instance
      }
    },

    destroy(instance) {
      if(objectDestructor) {
        objectDestructor.apply(instance)
      }
      pool.put(instance)
    }
  }

  objectConstructor.prototype._componentId = component.id

  return component
}
