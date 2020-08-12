import { expect } from 'chai'
import { Entity } from '../src'
import { hasAll } from '../src/query'

class A { static type = 'A' }
class B { static type = 'B' }
class C { static type = 'C' }

const createEntity = () => new Entity(() => {})

describe('hasAll', () => {
  it('matches entites with all components', () => {
    const selector = hasAll([A, B])
    const entity = createEntity().add(new A()).add(new B())
    expect(selector(entity)).to.equal(true)
  })

  it('matches entites with more components', () => {
    const selector = hasAll([A, B])
    const entity = createEntity().add(new A()).add(new B()).add(new C())
    expect(selector(entity)).to.equal(true)
  })

  it('does not match entities with some components', () => {
    const selector = hasAll([A, B])
    const entity = createEntity().add(new A())
    expect(selector(entity)).to.equal(false)
  })

  it('does not match entities with different components', () => {
    const selector = hasAll([A, B])
    const entity = createEntity().add(new C())
    expect(selector(entity)).to.equal(false)
  })

  it('does not match entities with no components', () => {
    const selector = hasAll([A, B])
    const entity = createEntity()
    expect(selector(entity)).to.equal(false)
  })

  it('works for a single argument', () => {
    const selector = hasAll([A])
    const targetComponent = createEntity().add(new A())
    const otherComponent = createEntity().add(new B())
    const noComponents = createEntity()
    expect(selector(targetComponent)).to.equal(true)
    expect(selector(otherComponent)).to.equal(false)
    expect(selector(noComponents)).to.equal(false)
  })
})
