import { Events } from '../../src/core/Events'

describe('Events', () => {
  it('can be constructed', () => {
    expect(() => new Events()).not.toThrow()
  })

  it('can emit events', () => {
    let events = new Events()
    events.emit('T', 0)
    expect(events.get()).toEqual({ type: 'T', timeDelta: 0 })
  })

  it('can emit events of different types', () => {
    let events = new Events()
    events.emit('T', 0)
    events.emit('U', 0)

    expect(events.get()).toEqual({ type: 'T', timeDelta: 0 })
    expect(events.get()).toEqual({ type: 'U', timeDelta: 0 })
  })

  it('can calculate time between events', () => {
    let events = new Events()
    events.emit('T', 0)
    events.emit('T', 1)

    expect(events.get()).toEqual({ type: 'T', timeDelta: 0 })
    expect(events.get()).toEqual({ type: 'T', timeDelta: 1 })
  })

  it('handles empty event queue', () => {
    let events = new Events()
    events.emit('T', 0)
    events.get()
    expect(events.get()).toEqual(undefined)
  })

  it('handles emits between gets', () => {
    let events = new Events()

    events.emit('A', 0)
    events.emit('B', 0)
    events.emit('C', 0)

    expect(events.get()).toEqual({ type: 'A', timeDelta: 0 })

    events.emit('D', 0)
    events.emit('E', 0)
    events.emit('F', 0)

    expect(events.get()).toEqual({ type: 'D', timeDelta: 0 })
    expect(events.get()).toEqual({ type: 'E', timeDelta: 0 })
    expect(events.get()).toEqual({ type: 'F', timeDelta: 0 })
    expect(events.get()).toEqual({ type: 'B', timeDelta: 0 })
    expect(events.get()).toEqual({ type: 'C', timeDelta: 0 })
  })
})
