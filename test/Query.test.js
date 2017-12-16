import { Query } from '../src/Query'
import { component } from '../src/component'

const ComponentA = component([], 0)
const ComponentB = component([], 1)

describe('Query', () => {
  it('can be constructed', () => {
    expect(() => new Query(ComponentA, ComponentB)).not.toThrow()
  })
})
