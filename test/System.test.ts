import { expect } from 'chai'
import { system } from '../src/System'

class EventA {}
class EventB {}

describe('createSystem', () => {
  it('calls the callback when the event matches', () => {
    let callValues = undefined
    const mySystem = system(EventA, (...args) => { callValues = args })

    mySystem(null as any, new EventA())

    expect(callValues).to.deep.equal([null, new EventA()])
  })

  it('does not call the callback when the event does not match', () => {
    let called = false
    const mySystem = system(EventA, () => { called = true })

    mySystem(null as any, new EventB())

    expect(called).to.equal(false)
  })
})
