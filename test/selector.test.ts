import { selectAll, Entity } from '../src'
import { createCachedSelector } from '../src/selector'

class A {}
class B {}
class C {}

const createEntity = () => new Entity(() => {})

describe('selectAll', () => {
  it('matches entites with all components', () => {
    const selector = selectAll(A, B)
    const entity = createEntity().add(new A()).add(new B())
    expect(selector(entity)).toEqual(true)
  })

  it('matches entites with more components', () => {
    const selector = selectAll(A, B)
    const entity = createEntity().add(new A()).add(new B()).add(new C())
    expect(selector(entity)).toEqual(true)
  })

  it('does not match entities with some components', () => {
    const selector = selectAll(A, B)
    const entity = createEntity().add(new A())
    expect(selector(entity)).toEqual(false)
  })

  it('does not match entities with different components', () => {
    const selector = selectAll(A, B)
    const entity = createEntity().add(new C())
    expect(selector(entity)).toEqual(false)
  })

  it('does not match entities with no components', () => {
    const selector = selectAll(A, B)
    const entity = createEntity()
    expect(selector(entity)).toEqual(false)
  })

  it('works for a single argument', () => {
    const selector = selectAll(A)
    const targetComponent = createEntity().add(new A())
    const otherComponent = createEntity().add(new B())
    const noComponents = createEntity()
    expect(selector(targetComponent)).toEqual(true)
    expect(selector(otherComponent)).toEqual(false)
    expect(selector(noComponents)).toEqual(false)
  })
})

describe('createCachedSelector', () => {
  it('adds cached property', () => {
    const cached = createCachedSelector(selectAll(A))
    expect(cached.cache).toEqual(true)
  })

  it('preserves functionality', () => {
    const cached = createCachedSelector(selectAll(A))
    const targetComponent = createEntity().add(new A())
    const otherComponent = createEntity().add(new B())
    expect(cached(targetComponent)).toEqual(true)
    expect(cached(otherComponent)).toEqual(false)
  })

  it('does not modify the argument', () => {
    const original = selectAll(A)
    createCachedSelector(original)
    expect((original as any).cache).toEqual(undefined)
  })
})
