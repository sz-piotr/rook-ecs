let index = 0

export function component(objectConstructor, objectDestructor) {
  const id = index++
  objectConstructor.id = id
  objectConstructor.prototype._id = id

  objectConstructor.destroy = function(instance) {
    if(objectDestructor) {
      objectDestructor.apply(instance)
    }
  }

  return objectConstructor
}
