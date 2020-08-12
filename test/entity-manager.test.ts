import { Entity } from '../src/entity'
import { EntityManager } from '../src/entity-manager'

class A { static type = 'A' }
class B { static type = 'B' }

describe('EntityManager', () => {
  it('query returns empty array if there are no entities', () => {
    const em = new EntityManager()

    const entites = em.query(A, B)

    expect(entites).toEqual([])
  })

  it('query returns empty array when no updates have been processed', () => {
    const em = new EntityManager()

    new Entity(em.scheduleUpdate)
      .add(new A())
      .add(new B())

    const entites = em.query(A, B)

    expect(entites).toEqual([])
  })

  it('query returns matched entites after updates are processed', () => {
    const em = new EntityManager()
    const entity1 = new Entity(em.scheduleUpdate).add(new A()).add(new B())
    const entity2 = new Entity(em.scheduleUpdate).add(new A()).add(new B())
    new Entity(em.scheduleUpdate).add(new A())

    em.processUpdates()
    const entites = em.query(A, B)

    expect(entites).toEqual([entity1, entity2])
  })

  it('query returns entities that have been changed after processUpdates', () => {
    const em = new EntityManager()
    const entity = new Entity(em.scheduleUpdate).add(new A()).add(new B())

    em.processUpdates()
    const before = em.query(A, B)

    expect(before).toEqual([entity])

    entity.remove(A)
    const after = em.query(A, B)

    expect(after).toEqual([entity])
  })

  it('queryOne returns a single entity', () => {
    const em = new EntityManager()
    const first = new Entity(em.scheduleUpdate).add(new A())
    const second = new Entity(em.scheduleUpdate).add(new A())

    em.processUpdates()
    const result = em.queryOne(A)

    expect(result === first || result === second).toEqual(true)
  })

  it('queryOne can return undefined', () => {
    const em = new EntityManager()
    const result = em.queryOne(A)
    expect(result).toEqual(undefined)
  })

  it('processUpdates updates the entity array', () => {
    const em = new EntityManager()
    const entity = new Entity(em.scheduleUpdate).add(new A()).add(new B())

    em.processUpdates()
    const before = em.query(A, B)

    expect(before).toEqual([entity])

    entity.remove(A)
    em.processUpdates()
    const after = em.query(A, B)

    expect(after).toEqual([])
  })

  it('processUpdates removes removed entites', () => {
    const em = new EntityManager()
    const entity = new Entity(em.scheduleUpdate).add(new A()).add(new B())

    em.processUpdates()
    const before = em.query(A, B)

    expect(before).toEqual([entity])

    em.scheduleRemove(entity)
    em.processUpdates()
    const after = em.query(A, B)

    expect(after).toEqual([])
  })
})
