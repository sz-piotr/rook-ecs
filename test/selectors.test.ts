import { hasAll } from '../src/selectors'
import { Entity } from '../src/Entity'

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

  it('checks its arguments', () => {
    expect(() => hasAll(<any>null)).toThrow()
  })
})
