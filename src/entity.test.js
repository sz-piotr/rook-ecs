import { Entity } from './entity'
import { Key } from './key'
import { component } from './component'

const noop = () => {}
const ComponentA = component(function() {})
const ComponentB = component(function() {})
const idMap = {}
idMap[ComponentA.id] = 0
idMap[ComponentB.id] = 1
const count = 2

describe('Entity', () => {
  test('constructor() should construct an object', () => {
    expect(() => new Entity(count, idMap, noop)).not.toThrow()
  })

  test('add() should add the component', () => {
    const entity = new Entity(count, idMap, noop)
    const instance = new ComponentA()
    entity.add(instance)

    expect(entity.components).toEqual([instance, null])
    expect(entity.key.matches(new Key(1).set(0))).toBeTruthy()
  })

  test('add() should prevent adding another instance', () => {
    const entity = new Entity(count, idMap, noop)

    expect(() => entity.add(new ComponentA())).not.toThrow()
    expect(() => entity.add(new ComponentA())).toThrow()
  })


  test('has() should return correct information', () => {
    const entity = new Entity(count, idMap, noop)
    entity.add(new ComponentA())

    expect(entity.has(ComponentA)).toBe(true)
    expect(entity.has(ComponentB)).toBe(false)
  })

  test('get() should retrieve the correct instance', () => {
    const instance = new ComponentA()

    const entity = new Entity(count, idMap, noop)
    entity.add(instance)

    expect(entity.get(ComponentA)).toBe(instance)
  })

  test('get() should throw if component doesn\'t exist', () => {
    const entity = new Entity(count, idMap, noop)
    entity.add(new ComponentA())

    expect(() => entity.get(ComponentA)).not.toThrow()
    expect(() => entity.get(ComponentB)).toThrow()
  })

  test('remove() should remove the component', () => {
    const entity = new Entity(count, idMap, noop)
    entity.add(new ComponentA())

    expect(entity.has(ComponentA)).toBe(true)

    entity.remove(ComponentA)

    expect(entity.has(ComponentA)).toBe(false)
  })

  test('remove() should throw if component doesn\'t exist', () => {
    const entity = new Entity(count, idMap, noop)
    entity.add(new ComponentA())

    expect(() => entity.remove(ComponentA)).not.toThrow()
    expect(() => entity.remove(ComponentA)).toThrow()
    expect(() => entity.remove(ComponentB)).toThrow()
  })

  test('onKeyChanged correct call behaviour', () => {
    const onKeyChanged = jest.fn()

    const entity = new Entity(count, idMap, onKeyChanged)
    entity.add(new ComponentA())

    expect(onKeyChanged).toBeCalledWith(entity)
    onKeyChanged.mockClear()

    entity.add(new ComponentB())
    entity.remove(ComponentA)

    expect(onKeyChanged).not.toBeCalled()
    entity.resetOnKeyChanged()

    entity.remove(ComponentB)

    expect(onKeyChanged).toBeCalledWith(entity)
  })

  test('using unknown component results in exception', () => {
    const ComponentC = component(function() {})
    const entity = new Entity(count, idMap, noop)

    expect(() => entity.add(new ComponentC())).toThrow()
  })
})
