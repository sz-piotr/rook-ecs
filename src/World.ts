import { Entity, notifyAfterChangeRegistered } from './Entity'
import { Events, Event } from './Events'
import { Query } from './Query'

export interface World {
  readonly time: number,
  createEntity (assemblage?: (entity: Entity) => void): Entity,
  removeEntity (entity: Entity): void,
  emit (event: Event | string): void
}

export class GameWorld implements World {
  private _queries: Query[]
  private _changedEntities: Entity[] = []
  private _removedEntities: Entity[] = []

  private _events = new Events()
  private _time?: number

  constructor (_queries: Query[]) {
    this._queries = _queries
  }

  get time () {
    return this._time || 0
  }

  createEntity (assemblage?: (entity: Entity) => void) {
    const entity = new Entity(this._onEntityChange)
    if (assemblage) {
      assemblage(entity)
    }
    return entity
  }

  private _onEntityChange = (entity: Entity) => this._changedEntities.push(entity)

  removeEntity (entity: Entity) {
    this._removedEntities.push(entity)
  }

  emit (event: Event | string) {
    this._events.emit(event, this.time)
  }

  _internal_nextEvent () {
    return this._events.get()
  }

  _internal_tick (time: number) {
    this._time = time
    this.emit('tick')
  }

  _internal_handleChanges () {
    for (const entity of this._changedEntities) {
      for (const query of this._queries) {
        query.onChange(entity)
      }
      notifyAfterChangeRegistered(entity)
    }
    this._changedEntities.length = 0

    for (const entity of this._removedEntities) {
      for (const query of this._queries) {
        query.onRemove(entity)
      }
    }
    this._removedEntities.length = 0
  }
}
