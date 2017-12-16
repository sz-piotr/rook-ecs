export class IndexedArray {
  constructor () {
    this._indices = {}
    this.elements = []
  }

  put (object) {
    this._indices[object.id] = this.elements.length
    this.elements.push(object)
  }

  has (object) {
    return this._indices[object.id] !== undefined
  }

  remove (object) {
    const index = this._indices[object.id]
    if (index !== undefined) {
      delete this._indices[object.id]
      const otherObject = this.elements.pop()
      if (otherObject.id !== object.id) {
        this.elements[index] = otherObject
        this._indices[otherObject.id] = index
      }
    }
  }
}
