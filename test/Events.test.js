import { Events } from '../src/Events'

describe('Events', () => {
  it('can be constructed', () => {
    expect(() => new Events()).not.toThrow()
  })

  it('can emit events', () => {
    let events = new Events()
    events.emit('T', 0)
    expect(events.get('T')).toEqual([
      { type: 'T', timeDelta: 0 }
    ])
  })

  it('can emit events of different types', () => {
    let events = new Events()
    events.emit('T', 0)
    events.emit('U', 0)

    expect(events.get('T')).toEqual([
      { type: 'T', timeDelta: 0 }
    ])

    expect(events.get('U')).toEqual([
      { type: 'U', timeDelta: 0 }
    ])
  })

  it('can calculate time between events', () => {
    let events = new Events()
    events.emit('T', 0)
    events.emit('T', 1000)

    expect(events.get('T')).toEqual([
      { type: 'T', timeDelta: 0 },
      { type: 'T', timeDelta: 1 }
    ])
  })

  it('can clear events', () => {
    let events = new Events()
    events.emit('T', 0)
    events.clear()

    expect(events.get('T')).toEqual([])
  })
})
