export function component (fields, id) {
  let body = ''
  for (let i = 0; i < fields.length; i++) {
    let field = fields[i]
    if (/^[a-zA-Z]\w*$/.exec(field)) {
      body += `this.${field}=${field};`
    } else {
      throw new Error('Invalid identifier: ' + field)
    }
  }
  /* eslint-disable no-new-func */
  return decorate(new Function(fields, body), id)
}

export function decorate (constructor, id) {
  constructor.id = id
  constructor.prototype._id = id
  return constructor
}
