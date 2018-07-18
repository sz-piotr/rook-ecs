import { Entity, notifyAfterChangeRegistered } from '../../src/core/Entity'

class ComponentA {
  static id = 'ComponentA'
}

class ComponentB {
  static id = 'ComponentB'
}

describe('Entity', () => {
  it('can be constructed', () => {
    expect(() => new Entity()).not.toThrow()
  })

  test('add() should add the component instance', () => {
    const entity = new Entity()
    const instance = new ComponentA()
    entity.add(instance)

    expect(entity.get(ComponentA)).toEqual(instance)
  })

  test('add() should check the argument for nullish values', () => {
    const entity = new Entity()
    expect(() => entity.add(null)).toThrow()
  })

  test('add() should check the argument for non-components', () => {
    const entity = new Entity()
    expect(() => entity.add({ hello: 'hello' })).toThrow()
  })

  test('add() should allow only one instance of the same component', () => {
    const entity = new Entity()

    expect(() => entity.add(new ComponentA())).not.toThrow()
    expect(() => entity.add(new ComponentA())).toThrow()
  })

  test('has() should return correct information', () => {
    const entity = new Entity()
    entity.add(new ComponentA())

    expect(entity.has(ComponentA)).toBe(true)
    expect(entity.has(ComponentB)).toBe(false)
  })

  test('has() should check the argument for non-components', () => {
    const entity = new Entity()
    expect(() => entity.has(<any>{ hello: 'hello' })).toThrow()
  })

  test('get() should throw if component doesn\'t exist', () => {
    const entity = new Entity()
    entity.add(new ComponentA())

    expect(() => entity.get(ComponentA)).not.toThrow()
    expect(() => entity.get(ComponentB)).toThrow()
  })

  test('get() should check the argument for non-components', () => {
    const entity = new Entity()
    expect(() => entity.get(<any>{ hello: 'hello' })).toThrow()
  })

  test('remove() should remove the component', () => {
    const entity = new Entity()
    entity.add(new ComponentA())

    expect(entity.has(ComponentA)).toBe(true)

    entity.remove(ComponentA)

    expect(entity.has(ComponentA)).toBe(false)
  })

  test('remove() should check the argument for non-components', () => {
    const entity = new Entity()
    expect(() => entity.remove(<any>{ hello: 'hello' })).toThrow()
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
    notifyAfterChangeRegistered(entity)

    entity.remove(ComponentB)

    expect(onChange).toBeCalledWith(entity)
  })
})
