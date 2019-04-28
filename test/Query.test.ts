import { Query } from '../src/Query'
import { Entity, selectAll } from '../src'

class ComponentA {}
class ComponentB {}

const selector = selectAll(ComponentA)

describe('Query', () => {
  it('onChange should correctly modify the entities list', () => {
    const query = new Query(selector, [])
    const entity = new Entity(() => {})
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

  it('onRemove should correctly modify the entities list', () => {
    const query = new Query(selector, [])
    const entity = new Entity(() => {})
      .add(new ComponentA())

    query.onChange(entity)
    expect(query.entities).toEqual([entity])

    query.onRemove(entity)
    expect(query.entities).toEqual([])
  })

  it('handles multiple entities', () => {
    const query = new Query(selector, [])

    const entityA = new Entity(() => {}).add(new ComponentA())
    const entityB = new Entity(() => {}).add(new ComponentA())

    query.onChange(entityA)
    query.onChange(entityB)
    expect(query.entities).toEqual([entityA, entityB])

    query.onRemove(entityA)
    query.onRemove(entityB)
    expect(query.entities).toEqual([])
  })

  it('handles unknown entities', () => {
    const query = new Query(selector, [])
    const entity = new Entity(() => {})

    query.onRemove(entity)

    expect(query.entities).toEqual([])
  })

  it('filters its entities initially', () => {
    const entity1 = new Entity(() => {}).add(new ComponentA())
    const entity2 = new Entity(() => {}).add(new ComponentA())
    const query = new Query(selector, [
      entity1,
      entity2,
      new Entity(() => {}).add(new ComponentB()),
    ])

    expect(query.entities).toEqual([entity1, entity2])
  })

  it('handles multiple components', () => {
    const entity1 = new Entity(() => {})
      .add(new ComponentA())
      .add(new ComponentB())
    const entity2 = new Entity(() => {})
      .add(new ComponentA())
    const entity3 = new Entity(() => {})

    const query = new Query(
      selectAll(ComponentA, ComponentB),
      [entity1, entity2, entity3],
    )

    expect(query.entities).toEqual([entity1])
  })
})
