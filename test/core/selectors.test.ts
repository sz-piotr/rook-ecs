import { hasAll, hasAny } from '../../src/core/selectors'
import { Entity } from '../../src/core/Entity'

class ComponentA {
  static id = 'ComponentA'
}

class ComponentB {
  static id = 'ComponentB'
}

describe('hasAll', () => {
  it('checks if entity has all of the specified components', () => {
    const selector = hasAll(ComponentA, ComponentB)

    const entity1 = new Entity()
      .add(new ComponentA())
      .add(new ComponentB())
    const entity2 = new Entity()
      .add(new ComponentA())
    const entity3 = new Entity()
      .add(new ComponentB())
    const entity4 = new Entity()

    expect(selector(entity1)).toBe(true)
    expect(selector(entity2)).toBe(false)
    expect(selector(entity3)).toBe(false)
    expect(selector(entity4)).toBe(false)
  })
})

describe('hasAny', () => {
  it('checks if entity has any of the specified components', () => {
    const selector = hasAny(ComponentA, ComponentB)

    const entity1 = new Entity()
      .add(new ComponentA())
      .add(new ComponentB())
    const entity2 = new Entity()
      .add(new ComponentA())
    const entity3 = new Entity()
      .add(new ComponentB())
    const entity4 = new Entity()

    expect(selector(entity1)).toBe(true)
    expect(selector(entity2)).toBe(true)
    expect(selector(entity3)).toBe(true)
    expect(selector(entity4)).toBe(false)
  })
})
