type EventTimeMap = {
  [key: string]: number | undefined
}

export type Event = {
  type: string,
  timeDelta: number
}

export class Events {
  private _events: Event[] = []
  private _eventTimes: EventTimeMap = {}

  emit (event: string | Event, time: number) {
    if (typeof event === 'string') {
      event = <Event>{ type: event }
    }

    let lastTime = this._eventTimes[event.type]
    if (lastTime == null) {
      lastTime = time
    }

    event.timeDelta = time - lastTime
    this._eventTimes[event.type] = time
    this._events.push(event)
  }

  get (eventType: string) {
    return this._events.filter(
      event => event.type === eventType
    )
  }

  clear () {
    this._events.length = 0
  }
}
