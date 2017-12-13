let index = 0

export function component () {
  let functionArguments = []
  let body = ''
  for (let i = 0; i < arguments.length; i++) {
    if (/^[_a-zA-Z]\w*$/.exec(arguments[i])) {
      let arg = arguments[i]
      functionArguments[i] = arg
      body += `this.${arg}=${arg};`
    } else {
      throw new Error('Invalid identifier: ' + arguments[i])
    }
  }
  /* eslint-disable no-new-func */
  return complexComponent(new Function(functionArguments, body))
}

export function complexComponent (objectConstructor, objectDestructor) {
  const id = index++
  objectConstructor.id = id
  objectConstructor.prototype._id = id

  objectConstructor.destroy = function (instance) {
    if (objectDestructor) {
      objectDestructor.apply(instance)
    }
  }

  return objectConstructor
}
