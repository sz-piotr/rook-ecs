export class Entity {
  constructor(engine, next) {
    this._engine = engine
    this._prev = null
    this._next = next
  }
}
