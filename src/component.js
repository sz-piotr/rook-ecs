import { forEach, assert } from './utils'

export function createComponent (fields, id) {
  let body = ''
  forEach(fields, field => {
    assert(isValid(field), 'Invalid identifier: ' + field)
    body += `this.${field}=${field};`
  })
  /* eslint-disable no-new-func */
  return decorate(new Function(fields, body), id)
}

function isValid (field) {
  return /^[a-zA-Z]\w*$/.exec(field)
}

function decorate (constructor, id) {
  constructor.id = id
  constructor.prototype._id = id
  return constructor
}
