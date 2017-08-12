import { Entity } from './entity'
import { Key } from './key'
import { component, __test__resetIndex } from './component'

describe('Entity', () => {
  test('#constructor() should construct an object', () => {
    expect(() => {
      new Entity(null, function() {})
    }).not.toThrow()
  })

  test('#constructor() should set the next property', () => {
    const next = { a: 1, b: 2 }
    const entity = new Entity(next, function() {})

    expect(entity.next).toBe(next)
  })

  test('should allow component addition', () => {
    const TestComponent = component(function() { this.a = 1 })
    const entity = new Entity(null, function() {})

    expect(() => {
      entity.get(TestComponent)
    }).toThrow()

    entity.add(new TestComponent())
    const componentInstance = entity.get(TestComponent)

    expect(componentInstance).toEqual({ a: 1 })
  })

  test('should allow component overwrite', () => {
    const TestComponent = component(function(a) { this.a = a })
    const entity = new Entity(null, function() {})

    entity.add(new TestComponent(1))
    const firstInstance = entity.get(TestComponent)

    entity.add(new TestComponent(2))
    const secondInstance = entity.get(TestComponent)

    expect(firstInstance).not.toBe(secondInstance)
  })

  test('should allow component removal', () => {
    const TestComponent = component(function() { this.a = 1 })
    const entity = new Entity(null, function() {})
    entity.add(new TestComponent())
    entity.remove(TestComponent)

    expect(() => entity.get(TestComponent)).toThrow()
  })

  test('should inform about the change to dirty', () => {
    const TestComponent = component(function(a) { this.a = a })
    const mockCallback = jest.fn();

    const entity = new Entity(null, mockCallback)
      .add(new TestComponent())

    expect(mockCallback).toBeCalledWith(entity)

    entity.setDirty(false)
    mockCallback.mockClear()
    entity.remove(TestComponent)
    expect(mockCallback).toBeCalledWith(entity)

    mockCallback.mockClear()
    entity.remove(TestComponent)
    expect(mockCallback).not.toBeCalled()
  })
})
