import { expect } from 'chai'
import { createSystem } from '../../src/systems/createSystem'

class EventA {}
class EventB {}

describe('createSystem', () => {
  it('calls the callback when the event matches', () => {
    let callValue = undefined
    const system = createSystem(EventA, world => { callValue = world })
    const world: any = { event: new EventA() }

    system(world)

    expect(callValue).to.equal(world)
  })

  it('does not call the callback when the event does not match', () => {
    let called = false
    const system = createSystem(EventA, () => { called = true })
    const world: any = { event: new EventB() }

    system(world)

    expect(called).to.equal(false)
  })

  it('returns what system returns', () => {
    const cleanup = () => {}
    const system = createSystem(EventA, () => cleanup)
    const world: any = { event: new EventA() }

    const result = system(world)

    expect(result).to.equal(cleanup)
  })
})
