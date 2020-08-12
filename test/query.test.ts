import { expect } from 'chai'
import { Query, hasAll } from '../src/query'
import { Entity, component } from '../src'

const A = component<number>('A')
const B = component<number>('B')

const selector = hasAll([A])
const createEntity = () => new Entity(() => {})

describe('Query', () => {
  it('onChange should correctly modify the entities list', () => {
    const query = new Query(selector, [])
    const entity = createEntity().add(A, 1)

    query.onChange(entity)

    expect(query.entities).to.deep.equal([entity])

    entity.add(B, 2)
    query.onChange(entity)

    expect(query.entities).to.deep.equal([entity])

    entity.remove(A)

    query.onChange(entity)
    expect(query.entities).to.deep.equal([])
  })

  it('onRemove should correctly modify the entities list', () => {
    const query = new Query(selector, [])
    const entity = createEntity().add(A, 1)

    query.onChange(entity)
    expect(query.entities).to.deep.equal([entity])

    query.onRemove(entity)
    expect(query.entities).to.deep.equal([])
  })

  it('handles multiple entities', () => {
    const query = new Query(selector, [])

    const entityA = createEntity().add(A, 1)
    const entityB = createEntity().add(A, 1)

    query.onChange(entityA)
    query.onChange(entityB)
    expect(query.entities).to.deep.equal([entityA, entityB])

    query.onRemove(entityA)
    query.onRemove(entityB)
    expect(query.entities).to.deep.equal([])
  })

  it('handles unknown entities', () => {
    const query = new Query(selector, [])
    const entity = createEntity()

    query.onRemove(entity)

    expect(query.entities).to.deep.equal([])
  })

  it('filters its entities initially', () => {
    const entity1 = createEntity().add(A, 1)
    const entity2 = createEntity().add(A, 1)
    const query = new Query(selector, [
      entity1,
      entity2,
      createEntity().add(B, 2),
    ])

    expect(query.entities).to.deep.equal([entity1, entity2])
  })

  it('handles multiple components', () => {
    const entity1 = createEntity().add(A, 1).add(B, 2)
    const entity2 = createEntity().add(A, 1)
    const entity3 = createEntity()

    const query = new Query(
      hasAll([A, B]),
      [entity1, entity2, entity3],
    )

    expect(query.entities).to.deep.equal([entity1])
  })
})
