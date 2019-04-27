type EventTimeMap = {
  [key: string]: number | undefined
}

export type Event = {
  type: string,
  timeDelta: number,
  payload: any
}

export type EventConstructor = {
  type: string,
  timeDelta?: number,
  payload?: any
}

export class Events {
  private _eventTimes: EventTimeMap = {}
  private _queue: Event[] = []
  private _newEvents: Event[] = []

  emit (event: string | EventConstructor, time: number) {
    if (typeof event === 'string') {
      event = <EventConstructor>{ type: event }
    }

    if (event.timeDelta === undefined) {
      let lastTime = this._eventTimes[event.type]
      if (lastTime == null) {
        lastTime = time
      }
      event.timeDelta = time - lastTime
    }
    this._eventTimes[event.type] = time
    this._newEvents.push(<Event>event)
  }

  get () {
    if (this._newEvents.length > 0) {
      this._queue = this._queue.concat(this._newEvents.reverse())
      this._newEvents.length = 0
    }
    return this._queue.pop()
  }
}
