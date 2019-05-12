import { Query, hasAll } from '../src/query'
import { Entity } from '../src'

class A { static type = 'A' }
class B { static type = 'B' }

const selector = hasAll([A])
const createEntity = () => new Entity(() => {})

describe('Query', () => {
  it('onChange should correctly modify the entities list', () => {
    const query = new Query(selector, [])
    const entity = createEntity().add(new A())

    query.onChange(entity)

    expect(query.entities).toEqual([entity])

    entity.add(new B())
    query.onChange(entity)

    expect(query.entities).toEqual([entity])

    entity.remove(A)

    query.onChange(entity)
    expect(query.entities).toEqual([])
  })

  it('onRemove should correctly modify the entities list', () => {
    const query = new Query(selector, [])
    const entity = createEntity().add(new A())

    query.onChange(entity)
    expect(query.entities).toEqual([entity])

    query.onRemove(entity)
    expect(query.entities).toEqual([])
  })

  it('handles multiple entities', () => {
    const query = new Query(selector, [])

    const entityA = createEntity().add(new A())
    const entityB = createEntity().add(new A())

    query.onChange(entityA)
    query.onChange(entityB)
    expect(query.entities).toEqual([entityA, entityB])

    query.onRemove(entityA)
    query.onRemove(entityB)
    expect(query.entities).toEqual([])
  })

  it('handles unknown entities', () => {
    const query = new Query(selector, [])
    const entity = createEntity()

    query.onRemove(entity)

    expect(query.entities).toEqual([])
  })

  it('filters its entities initially', () => {
    const entity1 = createEntity().add(new A())
    const entity2 = createEntity().add(new A())
    const query = new Query(selector, [
      entity1,
      entity2,
      createEntity().add(new B()),
    ])

    expect(query.entities).toEqual([entity1, entity2])
  })

  it('handles multiple components', () => {
    const entity1 = createEntity().add(new A()).add(new B())
    const entity2 = createEntity().add(new A())
    const entity3 = createEntity()

    const query = new Query(
      hasAll([A, B]),
      [entity1, entity2, entity3],
    )

    expect(query.entities).toEqual([entity1])
  })
})
