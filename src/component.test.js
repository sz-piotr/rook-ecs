import { component, complexComponent } from './component'

describe('component', () => {
  test('the result should be a constructor', () => {
    const TestComponent = component('a', 'b')
    expect(new TestComponent(1, 2)).toEqual({ a: 1, b: 2 })
  })

  test('the result have and id property', () => {
    const TestComponent = component('a', 'b')
    const instance = new TestComponent(1, 2)

    expect(TestComponent.id).not.toBe(undefined)
    expect(TestComponent.id).toEqual(instance._id)
  })

  test('must work along complexComponent', () => {
    const SimpleComponent = component('a', 'b')
    const ComplexComponent = complexComponent(
      function(a, b) {
        this.a = a
        this.b = b
      }
    )
    expect(ComplexComponent.id).toEqual(SimpleComponent.id + 1)
    expect(SimpleComponent.destroy).toBeInstanceOf(Function)
  })
})

describe('complexComponent', () => {
  test('should modify the prototype of the argument', () => {
    function Undecorated(a, b) {
      this.a = a
      this.b = b
    }
    const Decorated = complexComponent(Undecorated)

    expect(new Decorated(1, 2)._id).toBe(Decorated.id)
  })

  test('the result should allow for object creation', () => {
    function Undecorated(a, b) {
      this.a = a
      this.b = b
    }
    const Decorated = complexComponent(Undecorated)

    expect(new Decorated(1, 2)).toEqual({ a: 1, b: 2 })
  })

  test('consecutive calls return same object', () => {
    function Undecorated(a, b) {
      this.a = a
      this.b = b
    }
    const DecoratedA = complexComponent(Undecorated)
    const DecoratedB = complexComponent(Undecorated)

    expect(DecoratedA).toBe(DecoratedB)
  })

  test('consecutive calls increment the id', () => {
    const DecoratedA = complexComponent(function() {})
    const DecoratedB = complexComponent(function() {})
    const DecoratedC = complexComponent(function() {})

    expect(DecoratedB.id).toEqual(DecoratedA.id + 1)
    expect(DecoratedC.id).toBe(DecoratedB.id + 1)
  })

  test('should allow object destruction', () => {
    const Component = complexComponent(function (a, b) {
      this.a = a
      this.b = b
    })
    const instance = new Component(1, 2)
    expect(() => Component.destroy(instance)).not.toThrow()
  })

  test('upon destruction calls the second parameter', () => {
    let innerInstance
    const Component = complexComponent(function (a, b) {
      this.a = a
      this.b = b
    }, function() {
      innerInstance = this
    })

    const instance = new Component(1, 2)
    expect(innerInstance).toBe(undefined)

    Component.destroy(instance)
    expect(innerInstance).toBe(instance)
  })
})
