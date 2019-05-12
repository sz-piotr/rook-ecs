import { Entity, clearNotify } from '../src/entity'

class A { static type = 'A' }
class B { static type = 'B' }

describe('Entity', () => {
  it('add() should add the component instance', () => {
    const instance = new A()

    const result = new Entity(() => { })
      .add(instance)
      .get(A)

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

    expect(() => entity.add(new A())).not.toThrow()
    expect(() => entity.add(new A())).toThrow()
  })

  it('has() should return correct information', () => {
    const entity = new Entity(() => { })
    entity.add(new A())

    expect(entity.has(A)).toBe(true)
    expect(entity.has(B)).toBe(false)
  })

  it('has() should check the argument for non-components', () => {
    const entity = new Entity(() => { })
    expect(() => entity.has(<any>{ hello: 'hello' })).toThrow()
  })

  it('get() should throw if component doesn\'t exist', () => {
    const entity = new Entity(() => { })
    entity.add(new A())

    expect(() => entity.get(A)).not.toThrow()
    expect(() => entity.get(B)).toThrow()
  })

  it('get() should check the argument for non-components', () => {
    const entity = new Entity(() => { })
    expect(() => entity.get(<any>{ hello: 'hello' })).toThrow()
  })

  it('remove() should remove the component', () => {
    const entity = new Entity(() => { })
      .add(new A())

    expect(entity.has(A)).toBe(true)

    entity.remove(A)

    expect(entity.has(A)).toBe(false)
  })

  it('remove() should check the argument for non-components', () => {
    const entity = new Entity(() => { })
    expect(() => entity.remove(<any>{ hello: 'hello' })).toThrow()
  })

  it('onChange correct call behaviour', () => {
    const onChange = jest.fn()

    const entity = new Entity(onChange)
      .add(new A())

    expect(onChange).toBeCalledWith(entity)
    onChange.mockClear()

    entity.add(new B())
    entity.remove(A)

    expect(onChange).not.toBeCalled()
    clearNotify(entity)

    entity.remove(B)

    expect(onChange).toBeCalledWith(entity)
  })
})
