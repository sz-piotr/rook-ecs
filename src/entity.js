export class Entity {
  constructor(next, keyLength) {
    this._prev = null
    this._next = next

    this._components = []
    this._key = []
    for(let i = 0; i < keyLength; i++) {
      this._key.push(0)
    }
  }
}
