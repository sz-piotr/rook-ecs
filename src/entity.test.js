import { Entity } from './entity'
import { Key } from './key'
import { createComponent, __test__resetIndex } from './component'

__test__resetIndex()

const components = []
for(let i = 0; i < 1000; i++) {
  components.push(
    createComponent(function() {})
  )
}

describe('Entity', () => {
  test('#constructor() should construct an object', () => {
    expect(() => {
      new Entity(null, function() {})
    }).not.toThrow()
  })

  test('#constructor() should set the next property', () => {
    const entity = new Entity(1, function() {})
    expect(entity.next).toBe(1)
  })

  test('should allow component addition', () => {
    expect(() => {
      new Entity(null, function() {})
        .addComponent(new components[0])
        .addComponent(new components[1])
        .addComponent(new components[2])
        .addComponent(new components[30])
        .addComponent(new components[31])
        .addComponent(new components[61])
        .addComponent(new components[62])
        .addComponent(new components[123])
        .addComponent(new components[124])
    }).not.toThrow()
  })

  test('should allow component overwrite', () => {
    expect(() => {
      new Entity(null, function() {})
        .addComponent(new components[0])
        .addComponent(new components[0])
        .addComponent(new components[0])
        .addComponent(new components[2])
        .addComponent(new components[2])
        .addComponent(new components[2])
        .addComponent(new components[30])
        .addComponent(new components[30])
        .addComponent(new components[30])
        .addComponent(new components[124])
        .addComponent(new components[124])
        .addComponent(new components[124])
    }).not.toThrow()
  })

  test('should allow component removal', () => {
    expect(() => {
      new Entity(null, function() {})
        .addComponent(new components[0])
        .addComponent(new components[2])
        .addComponent(new components[30])
        .addComponent(new components[124])
        .removeComponent(components[0])
        .removeComponent(components[2])
        .removeComponent(components[30])
        .removeComponent(components[124])
        .removeComponent(components[500])
        .removeComponent(components[600])
    }).not.toThrow()
  })

  test('should match keys according to added components', () => {
    const entity = new Entity(null, function() {})
      .addComponent(new components[0])
      .addComponent(new components[31])
      .addComponent(new components[124])

    expect(entity.matches(new Key([0, 31, 124]))).toBeTruthy()
    expect(entity.matches(new Key([0, 124]))).toBeTruthy()
    expect(entity.matches(new Key([124]))).toBeTruthy()
    expect(entity.matches(new Key([500]))).toBeFalsy()

    entity.removeComponent(components[124])

    expect(entity.matches(new Key([124]))).toBeFalsy()
  })

  test('should inform about the change to dirty', () => {
    const mockCallback = jest.fn();

    const entity = new Entity(null, mockCallback)
      .addComponent(new components[0])
      .addComponent(new components[31])
      .addComponent(new components[124])
      .removeComponent(components[124])

    expect(mockCallback.mock.calls.length).toBe(1)
    expect(mockCallback).toBeCalledWith(entity)

    entity.setDirty(false)
    mockCallback.mockClear()

    entity.removeComponent(components[500])
    expect(mockCallback).not.toBeCalled()

    entity.removeComponent(components[31])
    expect(mockCallback).toBeCalledWith(entity)
  })
})
