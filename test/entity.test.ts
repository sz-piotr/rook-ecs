import { expect } from 'chai'
import { Entity, clearNotify } from '../src/entity'

class A { static type = 'A' }
class B { static type = 'B' }

const createEntity = () => new Entity(() => {})

describe('Entity', () => {
  it('add() should add the component instance', () => {
    const instance = new A()

    const result = createEntity()
      .add(instance)
      .get(A)

    expect(result).to.equal(instance)
  })

  it('add() should check the argument for nullish values', () => {
    const entity = createEntity()
    expect(() => entity.add(null as any)).to.throw()
  })

  it('add() should check the argument for non-components', () => {
    const entity = createEntity()
    expect(() => entity.add({ hello: 'hello' })).to.throw()
  })

  it('add() should allow only one instance of the same component', () => {
    const entity = createEntity()

    expect(() => entity.add(new A())).not.to.throw()
    expect(() => entity.add(new A())).to.throw()
  })

  it('has() should return correct information', () => {
    const entity = createEntity().add(new A())

    expect(entity.has(A)).to.equal(true)
    expect(entity.has(B)).to.equal(false)
  })

  it('has() should check the argument for non-components', () => {
    const entity = createEntity()
    expect(() => entity.has(<any>{ hello: 'hello' })).to.throw()
  })

  it('get() should throw if component doesn\'t exist', () => {
    const entity = createEntity().add(new A())

    expect(() => entity.get(A)).not.to.throw()
    expect(() => entity.get(B)).to.throw()
  })

  it('get() should check the argument for non-components', () => {
    const entity = createEntity()
    expect(() => entity.get(<any>{ hello: 'hello' })).to.throw()
  })

  it('remove() should remove the component', () => {
    const entity = createEntity().add(new A())

    expect(entity.has(A)).to.equal(true)

    entity.remove(A)

    expect(entity.has(A)).to.equal(false)
  })

  it('remove() should check the argument for non-components', () => {
    const entity = createEntity()
    expect(() => entity.remove(<any>{ hello: 'hello' })).to.throw()
  })

  it('onChange correct call behaviour', () => {
    let callValue = undefined
    const onChange = (x: any) => { callValue = x }

    const entity = new Entity(onChange).add(new A())

    expect(callValue).to.equal(entity)
    callValue = undefined

    entity.add(new B())
    entity.remove(A)

    expect(callValue).to.equal(undefined)
    clearNotify(entity)

    entity.remove(B)

    expect(callValue).to.equal(entity)
  })
})
