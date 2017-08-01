export class Entity {
  constructor(engine, next) {
    this._engine = engine
    this._prev = null
    this._next = next
  }

  detach() {
    const next = this._next

    if(this._next !== null) {
      this._next._prev = this._prev
      this._next = null
    }

    if(this._prev !== null) {
      this._prev._next = this._next
      this._prev = null
    }

    return next
  }
}
