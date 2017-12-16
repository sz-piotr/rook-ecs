import { Query } from '../src/Query'
import { createComponent } from '../src/component'
import { Entity } from '../src/Entity'

const ComponentA = createComponent([], 0)
const ComponentB = createComponent([], 1)
const ComponentC = createComponent([], 2)

const COUNT = 3
const NOOP = () => {}

describe('Query', () => {
  it('can be constructed', () => {
    expect(() => new Query(ComponentA, ComponentB)).not.toThrow()
  })

  test('onChange should correctly modify the entities list', () => {
    const query = new Query(ComponentA, ComponentB)

    const entity = new Entity(COUNT, NOOP)
      .add(new ComponentA())
    query.onChange(entity)

    const entities = query.entities
    expect(entities).toEqual([])

    entity.add(new ComponentB())
    query.onChange(entity)

    expect(query.entities).toEqual([entity])

    entity.add(new ComponentC())
    query.onChange(entity)

    expect(query.entities).toEqual([entity])

    entity.remove(ComponentA)
    query.onChange(entity)

    expect(query.entities).toEqual([])
  })

  test('onRemove should correctly modify the entities list', () => {
    const query = new Query(ComponentA, ComponentB)

    const entity1 = new Entity(COUNT, NOOP)
      .add(new ComponentA())
      .add(new ComponentB())
    query.onChange(entity1)

    const entity2 = new Entity(COUNT, NOOP)
    query.onChange(entity2)

    expect(query.entities).toEqual([entity1])

    query.onRemove(entity1)
    query.onRemove(entity2)

    expect(query.entities).toEqual([])
  })

  it('should work in one mode', () => {
    const query = new Query(ComponentA).one()

    const entity = new Entity(COUNT, NOOP).add(new ComponentA())
    query.onChange(entity)

    expect(query.entities).toBe(entity)

    query.onRemove(entity)
    expect(query.entities).toBe(undefined)
  })
})
