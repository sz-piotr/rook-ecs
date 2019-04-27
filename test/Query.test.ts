import { createQuery } from '../src/Query'
import { Entity } from '../src/Entity'
import { hasAll } from '../src/selectors'

class ComponentA {
  static id = 'ComponentA'
}

class ComponentB {
  static id = 'ComponentB'
}

const selector = hasAll(ComponentA)

describe('createQuery', () => {
  it('can create SingleQuery', () => {
    expect(() => createQuery(selector)).not.toThrow()
  })

  it('can create MultiQuery', () => {
    expect(() => createQuery([selector, selector])).not.toThrow()
  })

  it('validates its arguments', () => {
    expect(() => createQuery([null as any])).toThrow()
  })
})

describe('SingleQuery', () => {
  test('onChange should correctly modify the entities list', () => {
    const query = createQuery(selector)
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
    const query = createQuery(selector)
    const entity = new Entity()
      .add(new ComponentA())

    query.onChange(entity)
    expect(query.entities).toEqual([entity])

    query.onRemove(entity)
    expect(query.entities).toEqual([])
  })

  test('handles multiple entities', () => {
    const query = createQuery(selector)

    const entityA = new Entity().add(new ComponentA())
    const entityB = new Entity().add(new ComponentA())

    query.onChange(entityA)
    query.onChange(entityB)
    expect(query.entities).toEqual([entityA, entityB])

    query.onRemove(entityA)
    query.onRemove(entityB)
    expect(query.entities).toEqual([])
  })

  test('handles unknown entities', () => {
    const query = createQuery(selector)
    const entity = new Entity()

    query.onRemove(entity)

    expect(query.entities).toEqual([])
  })
})

describe('MultiQuery', () => {
  test('onChange should correctly modify the entities list', () => {
    const query = createQuery([selector, selector])
    const entity = new Entity()
      .add(new ComponentA())

    query.onChange(entity)

    expect(query.entities).toEqual([ [entity], [entity] ])

    entity.add(new ComponentB())
    query.onChange(entity)

    expect(query.entities).toEqual([ [entity], [entity] ])

    entity.remove(ComponentA)

    query.onChange(entity)
    expect(query.entities).toEqual([ [], [] ])
  })

  test('onRemove should correctly modify the entities list', () => {
    const query = createQuery([selector, selector])
    const entity = new Entity()
      .add(new ComponentA())

    query.onChange(entity)
    expect(query.entities).toEqual([ [entity], [entity] ])

    query.onRemove(entity)
    expect(query.entities).toEqual([ [], [] ])
  })
})
