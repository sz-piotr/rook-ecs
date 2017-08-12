import { component } from './component'

describe('component', () => {
  test('should modify the prototype of the argument', () => {
    function Undecorated(a, b) {
      this.a = a
      this.b = b
    }
    const Decorated = component(Undecorated)

    expect(new Undecorated(1, 2)._componentId).toBe(Decorated.id)
  })

  test('the result should allow for object creation', () => {
    function Undecorated(a, b) {
      this.a = a
      this.b = b
    }
    const Decorated = component(Undecorated)

    expect(Decorated.create(1, 2)).toEqual({ a: 1, b: 2 })
  })

  test('consecutive calls return different objects', () => {
    function Undecorated(a, b) {
      this.a = a
      this.b = b
    }
    const DecoratedA = component(Undecorated)
    const DecoratedB = component(Undecorated)

    expect(DecoratedA).not.toBe(DecoratedB)
  })

  test('consecutive calls increment the id', () => {
    function Undecorated(a, b) {
      this.a = a
      this.b = b
    }
    const DecoratedA = component(Undecorated)
    const DecoratedB = component(Undecorated)
    const DecoratedC = component(Undecorated)

    expect(DecoratedB.id).toEqual(DecoratedA.id + 1)
    expect(DecoratedC.id).toBe(DecoratedB.id + 1)
  })

  test('should allow object destruction', () => {
    const Component = component(function (a, b) {
      this.a = a
      this.b = b
    })
    const instance = Component.create(1, 2)
    expect(() => Component.destroy(instance)).not.toThrow()
  })

  test('upon destruction calls the second parameter', () => {
    let innerInstance
    const Component = component(function (a, b) {
      this.a = a
      this.b = b
    }, function() {
      innerInstance = this
    })

    const instance = Component.create(1, 2)
    expect(innerInstance).toBe(undefined)

    Component.destroy(instance)
    expect(innerInstance).toBe(instance)
  })
})
