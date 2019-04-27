import { Entity, clearNotify } from '../src/Entity'

class ComponentA { }
class ComponentB { }

describe('Entity', () => {
  it('add() should add the component instance', () => {
    const instance = new ComponentA()

    const result = new Entity(() => { })
      .add(instance)
      .get(ComponentA)

    expect(result).toEqual(instance)
  })

  it('add() should check the argument for nullish values', () => {
    const entity = new Entity(() => { })
    expect(() => entity.add(null as any)).toThrow()
  })

  it('add() should check the argument for non-components', () => {
    const entity = new Entity(() => { })
    expect(() => entity.add({ hello: 'hello' })).toThrow()
  })

  it('add() should allow only one instance of the same component', () => {
    const entity = new Entity(() => { })

    expect(() => entity.add(new ComponentA())).not.toThrow()
    expect(() => entity.add(new ComponentA())).toThrow()
  })

  it('has() should return correct information', () => {
    const entity = new Entity(() => { })
    entity.add(new ComponentA())

    expect(entity.has(ComponentA)).toBe(true)
    expect(entity.has(ComponentB)).toBe(false)
  })

  it('has() should check the argument for non-components', () => {
    const entity = new Entity(() => { })
    expect(() => entity.has(<any>{ hello: 'hello' })).toThrow()
  })

  it('get() should throw if component doesn\'t exist', () => {
    const entity = new Entity<any>(() => { })
    entity.add(new ComponentA())

    expect(() => entity.get(ComponentA)).not.toThrow()
    expect(() => entity.get(ComponentB)).toThrow()
  })

  it('get() should check the argument for non-components', () => {
    const entity = new Entity(() => { })
    expect(() => entity.get(<any>{ hello: 'hello' })).toThrow()
  })

  it('remove() should remove the component', () => {
    const entity = new Entity(() => { })
      .add(new ComponentA())

    expect(entity.has(ComponentA)).toBe(true)

    entity.remove(ComponentA)

    expect(entity.has(ComponentA)).toBe(false)
  })

  it('remove() should check the argument for non-components', () => {
    const entity = new Entity(() => { })
    expect(() => entity.remove(<any>{ hello: 'hello' })).toThrow()
  })

  it('onChange correct call behaviour', () => {
    const onChange = jest.fn()

    const entity = new Entity(onChange)
      .add(new ComponentA())

    expect(onChange).toBeCalledWith(entity)
    onChange.mockClear()

    entity.add(new ComponentB())
    entity.remove(ComponentA)

    expect(onChange).not.toBeCalled()
    clearNotify(entity)

    entity.remove(ComponentB)

    expect(onChange).toBeCalledWith(entity)
  })
})
