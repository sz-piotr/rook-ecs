import { createSystem } from '../../src/systems/createSystem'

class EventA {}
class EventB {}

describe('createSystem', () => {
  it('calls the callback when the event matches', () => {
    const fn = jest.fn()
    const system = createSystem(EventA, fn)
    const world: any = { event: new EventA() }

    system(world)

    expect(fn).toHaveBeenCalledWith(world)
  })

  it('does not call the callback when the event does not match', () => {
    const fn = jest.fn()
    const system = createSystem(EventA, fn)
    const world: any = { event: new EventB() }

    system(world)

    expect(fn).not.toHaveBeenCalled()
  })

  it('returns what system returns', () => {
    const fn = jest.fn().mockReturnValue(42)
    const system = createSystem(EventA, fn)
    const world: any = { event: new EventA() }

    const result = system(world)

    expect(result).toEqual(42)
  })
})
