import { Engine } from './engine'
import { Entity } from './entity'

describe('Engine', () => {
  test('constructor() should be a constructor', () => {
    expect(() => new Engine()).not.toThrow()
  })

  test('createEntity() should create an entity', () => {
    const engine = new Engine()
    engine.started = true
    expect(engine.createEntity()).toBeInstanceOf(Entity)
  })

  test('createEntity() should form a linked list', () => {
    const engine = new Engine()
    engine.started = true
    const e1 = engine.createEntity()
    const e2 = engine.createEntity()
    const e3 = engine.createEntity()

    expect(e1.next).toBe(null)
    expect(e2.next).toBe(e1)
    expect(e3.next).toBe(e2)

    expect(e1.prev).toBe(e2)
    expect(e2.prev).toBe(e3)
    expect(e3.prev).toBe(null)
  })

  test('removeEntity() should remove the entity', () => {
    const engine = new Engine()
    engine.started = true
    const e1 = engine.createEntity()
    const e2 = engine.createEntity()
    const e3 = engine.createEntity()

    engine.removeEntity(e2)

    expect(e1.next).toBe(null)
    expect(e3.next).toBe(e1)

    expect(e1.prev).toBe(e3)
    expect(e3.prev).toBe(null)

    engine.removeEntity(e1)

    expect(e1.next).toBe(null)
    expect(e1.prev).toBe(null)
  })

  // TODO: Test registerSystem
  // TODO: Test registerComponent
  // TODO: Test update
  // TODO: Test runSystem
  // TODO: Test handleChanges
})
