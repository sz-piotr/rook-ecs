import { SingleQuery } from '../../src/core/Query'
import { Entity } from '../../src/core/Entity'
import { hasAll } from '../../src/core/selectors'

class ComponentA {
  static id = 'ComponentA'
}

class ComponentB {
  static id = 'ComponentB'
}

const selector = hasAll(ComponentA)

describe('Query', () => {
  it('can be constructed', () => {
    expect(() => new SingleQuery(selector)).not.toThrow()
  })

  test('onChange should correctly modify the entities list', () => {
    const query = new SingleQuery(selector)
    const entity = new Entity()
      .add(new ComponentA())

    query.onChange(entity)

    expect(query.entities).toEqual([entity])

    entity.add(new ComponentB())
    query.onChange(entity)

    expect(query.entities).toEqual([entity])

    entity.remove(ComponentA)

    query.onChange(entity)
    expect(query.entities).toEqual([])
  })

  test('onRemove should correctly modify the entities list', () => {
    const query = new SingleQuery(selector)
    const entity = new Entity()
      .add(new ComponentA())

    query.onChange(entity)
    expect(query.entities).toEqual([entity])

    query.onRemove(entity)
    expect(query.entities).toEqual([])
  })
})
