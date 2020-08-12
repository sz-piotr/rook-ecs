import { expect } from 'chai'
import { Entity, clearNotify } from '../src/Entity'
import { component } from '../src'

const A = component<number>('A')
const B = component<number>('B')

const createEntity = () => new Entity(() => {})

describe('Entity', () => {
  it('add() should add the component instance', () => {
    const result = createEntity()
      .add(A, 42)
      .get(A)

    expect(result).to.equal(42)
  })

  it('add() should allow only one instance of the same component', () => {
    const entity = createEntity()

    expect(() => entity.add(A, 1)).not.to.throw()
    expect(() => entity.add(A, 2)).to.throw()
  })

  it('has() should return correct information', () => {
    const entity = createEntity().add(A, 1)

    expect(entity.has(A)).to.equal(true)
    expect(entity.has(B)).to.equal(false)
  })

  it('get() should throw if component doesn\'t exist', () => {
    const entity = createEntity().add(A, 1)

    expect(() => entity.get(A)).not.to.throw()
    expect(() => entity.get(B)).to.throw()
  })

  it('remove() should remove the component', () => {
    const entity = createEntity().add(A, 1)

    expect(entity.has(A)).to.equal(true)

    entity.remove(A)

    expect(entity.has(A)).to.equal(false)
  })

  it('onChange correct call behaviour', () => {
    let callValue = undefined
    const onChange = (x: any) => { callValue = x }

    const entity = new Entity(onChange).add(A, 1)

    expect(callValue).to.equal(entity)
    callValue = undefined

    entity.add(B, 2)
    entity.remove(A)

    expect(callValue).to.equal(undefined)
    clearNotify(entity)

    entity.remove(B)

    expect(callValue).to.equal(entity)
  })
})
