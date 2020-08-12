import { expect } from 'chai'
import { Entity } from '../src/Entity'
import { EntityManager } from '../src/EntityManager'
import { component } from '../src'

const A = component<number>('A')
const B = component<number>('B')

describe('EntityManager', () => {
  it('query returns empty array if there are no entities', () => {
    const em = new EntityManager()
    const entities = em.query(A, B)
    expect(entities).to.deep.equal([])
  })

  it('query returns empty array when no updates have been processed', () => {
    const em = new EntityManager()

    new Entity(em.scheduleUpdate)
      .add(A, 1)
      .add(B, 2)

    const entities = em.query(A, B)
    expect(entities).to.deep.equal([])
  })

  it('query returns matched entities after updates are processed', () => {
    const em = new EntityManager()
    const entity1 = new Entity(em.scheduleUpdate).add(A, 1).add(B, 2)
    const entity2 = new Entity(em.scheduleUpdate).add(A, 3).add(B, 4)
    new Entity(em.scheduleUpdate).add(A, 4)

    em.processUpdates()
    const entities = em.query(A, B)

    expect(entities).to.deep.equal([entity1, entity2])
  })

  it('query returns entities that have been changed after processUpdates', () => {
    const em = new EntityManager()
    const entity = new Entity(em.scheduleUpdate).add(A, 1).add(B, 2)

    em.processUpdates()
    const before = em.query(A, B)

    expect(before).to.deep.equal([entity])

    entity.remove(A)
    const after = em.query(A, B)

    expect(after).to.deep.equal([entity])
  })

  it('queryOne returns a single entity', () => {
    const em = new EntityManager()
    const first = new Entity(em.scheduleUpdate).add(A, 1)
    const second = new Entity(em.scheduleUpdate).add(B, 2)

    em.processUpdates()
    const result = em.queryOne(A)

    expect(result === first || result === second).to.equal(true)
  })

  it('queryOne can return undefined', () => {
    const em = new EntityManager()
    const result = em.queryOne(A)
    expect(result).to.equal(undefined)
  })

  it('processUpdates updates the entity array', () => {
    const em = new EntityManager()
    const entity = new Entity(em.scheduleUpdate).add(A, 1).add(B, 2)

    em.processUpdates()
    const before = em.query(A, B)

    expect(before).to.deep.equal([entity])

    entity.remove(A)
    em.processUpdates()
    const after = em.query(A, B)

    expect(after).to.deep.equal([])
  })

  it('processUpdates removes removed entities', () => {
    const em = new EntityManager()
    const entity = new Entity(em.scheduleUpdate).add(A, 1).add(B, 2)

    em.processUpdates()
    const before = em.query(A, B)

    expect(before).to.deep.equal([entity])

    em.scheduleRemove(entity)
    em.processUpdates()
    const after = em.query(A, B)

    expect(after).to.deep.equal([])
  })
})
