import { hasAll, hasAny } from '../src/selectors'
import { Entity } from '../src/Entity'

class ComponentA {}
ComponentA.id = 'ComponentA'

class ComponentB {}
ComponentB.id = 'ComponentB'

const NOOP = () => {}

describe('hasAll', () => {
  it('checks if entity has all of the specified components', () => {
    const selector = hasAll(ComponentA, ComponentB)

    const entity1 = new Entity(NOOP)
      .add(new ComponentA())
      .add(new ComponentB())
    const entity2 = new Entity(NOOP)
      .add(new ComponentA())
    const entity3 = new Entity(NOOP)
      .add(new ComponentB())
    const entity4 = new Entity(NOOP)

    expect(selector(entity1)).toBe(true)
    expect(selector(entity2)).toBe(false)
    expect(selector(entity3)).toBe(false)
    expect(selector(entity4)).toBe(false)
  })
})

describe('hasAny', () => {
  it('checks if entity has any of the specified components', () => {
    const selector = hasAny(ComponentA, ComponentB)

    const entity1 = new Entity(NOOP)
      .add(new ComponentA())
      .add(new ComponentB())
    const entity2 = new Entity(NOOP)
      .add(new ComponentA())
    const entity3 = new Entity(NOOP)
      .add(new ComponentB())
    const entity4 = new Entity(NOOP)

    expect(selector(entity1)).toBe(true)
    expect(selector(entity2)).toBe(true)
    expect(selector(entity3)).toBe(true)
    expect(selector(entity4)).toBe(false)
  })
})
