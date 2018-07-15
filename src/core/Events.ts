type EventTimeMap = {
  [key: string]: number | undefined
}

export type Event = {
  type: string,
  timeDelta: number
}

export class Events {
  private _eventTimes: EventTimeMap = {}
  private _queue: Event[] = []
  private _newEvents: Event[] = []

  emit (event: string | Event, time: number) {
    if (typeof event === 'string') {
      event = <Event>{ type: event }
    }

    if (event.timeDelta == null) {
      let lastTime = this._eventTimes[event.type]
      if (lastTime == null) {
        lastTime = time
      }
      event.timeDelta = time - lastTime
    }
    this._eventTimes[event.type] = time
    this._newEvents.push(event)
  }

  get () {
    if (this._newEvents.length > 0) {
      this._queue = this._queue.concat(this._newEvents.reverse())
      this._newEvents.length = 0
    }
    return this._queue.pop()
  }
}
