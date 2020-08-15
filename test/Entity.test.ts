import { expect } from 'chai'
import { Entity } from '../src/Entity'
import { component } from '../src'

const A = component<number>('A')
const B = component<number>('B')

const createEntity = () => new Entity(() => {})

describe('Entity', () => {
  it('set() should add the component instance', () => {
    const result = createEntity()
      .set(A, 42)
      .get(A)

    expect(result).to.equal(42)
  })

  it('set() should override the component instance', () => {
    const entity = createEntity()
    entity.set(A, 1)
    entity.set(A, 2)
    expect(entity.get(A)).to.equal(2)
  })

  it('has() should return correct information', () => {
    const entity = createEntity().set(A, 1)

    expect(entity.has(A)).to.equal(true)
    expect(entity.has(B)).to.equal(false)
  })

  it('get() should throw if component doesn\'t exist', () => {
    const entity = createEntity().set(A, 1)

    expect(() => entity.get(A)).not.to.throw()
    expect(() => entity.get(B)).to.throw()
  })

  it('remove() should remove the component', () => {
    const entity = createEntity().set(A, 1)

    expect(entity.has(A)).to.equal(true)

    entity.remove(A)

    expect(entity.has(A)).to.equal(false)
  })

  it('onChange correct call behaviour', () => {
    let callValue = undefined
    const onChange = (x: any) => { callValue = x }

    const entity = new Entity(onChange).set(A, 1)

    expect(callValue).to.equal(entity)
    callValue = undefined

    entity.set(B, 2)
    entity.remove(A)

    expect(callValue).to.equal(undefined)
    entity['didNotify'] = false

    entity.remove(B)

    expect(callValue).to.equal(entity)
  })
})
