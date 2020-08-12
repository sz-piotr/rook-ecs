import { expect } from 'chai'
import { Entity, component } from '../src'
import { hasAll } from '../src/query'

const A = component<number>('A')
const B = component<number>('B')
const C = component<number>('C')

const createEntity = () => new Entity(() => {})

describe('hasAll', () => {
  it('matches entites with all components', () => {
    const selector = hasAll([A, B])
    const entity = createEntity().add(A, 1).add(B, 2)
    expect(selector(entity)).to.equal(true)
  })

  it('matches entites with more components', () => {
    const selector = hasAll([A, B])
    const entity = createEntity().add(A, 1).add(B, 2).add(C, 3)
    expect(selector(entity)).to.equal(true)
  })

  it('does not match entities with some components', () => {
    const selector = hasAll([A, B])
    const entity = createEntity().add(A, 1)
    expect(selector(entity)).to.equal(false)
  })

  it('does not match entities with different components', () => {
    const selector = hasAll([A, B])
    const entity = createEntity().add(C, 3)
    expect(selector(entity)).to.equal(false)
  })

  it('does not match entities with no components', () => {
    const selector = hasAll([A, B])
    const entity = createEntity()
    expect(selector(entity)).to.equal(false)
  })

  it('works for a single argument', () => {
    const selector = hasAll([A])
    const targetComponent = createEntity().add(A, 1)
    const otherComponent = createEntity().add(B, 2)
    const noComponents = createEntity()
    expect(selector(targetComponent)).to.equal(true)
    expect(selector(otherComponent)).to.equal(false)
    expect(selector(noComponents)).to.equal(false)
  })
})
