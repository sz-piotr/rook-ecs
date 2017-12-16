import { Entity } from '../src/Entity'
import { Key } from '../src/Key'
import { component } from '../src/component'

const ComponentA = component([], 0)
const ComponentB = component([], 1)
const COUNT = 2
const NOOP = () => {}

describe('Entity', () => {
  it('can be constructed', () => {
    expect(() => new Entity(COUNT, NOOP)).not.toThrow()
  })

  test('consequent objects should have consequent ids', () => {
    const entityA = new Entity(COUNT, NOOP)
    const entityB = new Entity(COUNT, NOOP)
    expect(entityB.id).toEqual(entityA.id + 1)
  })

  test('add() should add the component', () => {
    const entity = new Entity(COUNT, NOOP)
    const instance = new ComponentA()
    entity.add(instance)

    expect(entity.get(ComponentA)).toEqual(instance)
    expect(entity.key.matches(new Key(1).set(0))).toBeTruthy()
  })

  test('add() should prevent adding another instance', () => {
    const entity = new Entity(COUNT, NOOP)

    expect(() => entity.add(new ComponentA())).not.toThrow()
    expect(() => entity.add(new ComponentA())).toThrow()
  })

  test('has() should return correct information', () => {
    const entity = new Entity(COUNT, NOOP)
    entity.add(new ComponentA())

    expect(entity.has(ComponentA)).toBe(true)
    expect(entity.has(ComponentB)).toBe(false)
  })

  test('get() should retrieve the correct instance', () => {
    const instance = new ComponentA()

    const entity = new Entity(COUNT, NOOP)
    entity.add(instance)

    expect(entity.get(ComponentA)).toBe(instance)
  })

  test('get() should throw if component doesn\'t exist', () => {
    const entity = new Entity(COUNT, NOOP)
    entity.add(new ComponentA())

    expect(() => entity.get(ComponentA)).not.toThrow()
    expect(() => entity.get(ComponentB)).toThrow()
  })

  test('remove() should remove the component', () => {
    const entity = new Entity(COUNT, NOOP)
    entity.add(new ComponentA())

    expect(entity.has(ComponentA)).toBe(true)

    entity.remove(ComponentA)

    expect(entity.has(ComponentA)).toBe(false)
  })

  test('remove() should throw if component doesn\'t exist', () => {
    const entity = new Entity(COUNT, NOOP)
    entity.add(new ComponentA())

    expect(() => entity.remove(ComponentA)).not.toThrow()
    expect(() => entity.remove(ComponentA)).toThrow()
    expect(() => entity.remove(ComponentB)).toThrow()
  })

  test('onKeyChanged correct call behaviour', () => {
    const onKeyChanged = jest.fn()

    const entity = new Entity(COUNT, onKeyChanged)
    entity.add(new ComponentA())

    expect(onKeyChanged).toBeCalledWith(entity)
    onKeyChanged.mockClear()

    entity.add(new ComponentB())
    entity.remove(ComponentA)

    expect(onKeyChanged).not.toBeCalled()
    entity.onChangeRegistered()

    entity.remove(ComponentB)

    expect(onKeyChanged).toBeCalledWith(entity)
  })

  test('using unknown component results in exception', () => {
    const ComponentC = component([], 2)
    const entity = new Entity(COUNT, NOOP)

    expect(() => entity.add(new ComponentC())).toThrow()
  })
})
