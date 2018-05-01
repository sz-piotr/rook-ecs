import { Entity } from '../src/Entity'

class ComponentA {}
ComponentA.id = 'ComponentA'

class ComponentB {}
ComponentB.id = 'ComponentB'

const NOOP = () => {}

describe('Entity', () => {
  it('can be constructed', () => {
    expect(() => new Entity(NOOP)).not.toThrow()
  })

  test('add() should add the component instance', () => {
    const entity = new Entity(NOOP)
    const instance = new ComponentA()
    entity.add(instance)

    expect(entity.get(ComponentA)).toEqual(instance)
  })

  test('add() should allow only one instance of the same component', () => {
    const entity = new Entity(NOOP)

    expect(() => entity.add(new ComponentA())).not.toThrow()
    expect(() => entity.add(new ComponentA())).toThrow()
  })

  test('has() should return correct information', () => {
    const entity = new Entity(NOOP)
    entity.add(new ComponentA())

    expect(entity.has(ComponentA)).toBe(true)
    expect(entity.has(ComponentB)).toBe(false)
  })

  test('get() should throw if component doesn\'t exist', () => {
    const entity = new Entity(NOOP)
    entity.add(new ComponentA())

    expect(() => entity.get(ComponentA)).not.toThrow()
    expect(() => entity.get(ComponentB)).toThrow()
  })

  test('remove() should remove the component', () => {
    const entity = new Entity(NOOP)
    entity.add(new ComponentA())

    expect(entity.has(ComponentA)).toBe(true)

    entity.remove(ComponentA)

    expect(entity.has(ComponentA)).toBe(false)
  })

  test('onChange correct call behaviour', () => {
    const onChange = jest.fn()

    const entity = new Entity(onChange)
    entity.add(new ComponentA())

    expect(onChange).toBeCalledWith(entity)
    onChange.mockClear()

    entity.add(new ComponentB())
    entity.remove(ComponentA)

    expect(onChange).not.toBeCalled()
    entity._onChangeRegistered()

    entity.remove(ComponentB)

    expect(onChange).toBeCalledWith(entity)
  })
})
