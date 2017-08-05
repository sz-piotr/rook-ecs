import { component, __test__resetIndex } from './component'

beforeEach(() => {
  __test__resetIndex()
});

describe('component', () => {
  test('should not modify the argument', () => {
    function Undecorated(a, b) {
      this.a = a
      this.b = b
    }
    const Decorated = component(Undecorated)

    expect(Decorated).not.toBe(Undecorated)
  })

  test('the result should be a correct constructor', () => {
    function Undecorated(a, b) {
      this.a = a
      this.b = b
    }
    const Decorated = component(Undecorated)

    expect(new Decorated(1, 2)).toEqual({ a: 1, b: 2 })
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

  test('consecutive calls increment the index', () => {
    function Undecorated(a, b) {
      this.a = a
      this.b = b
    }
    const DecoratedA = component(Undecorated)
    const DecoratedB = component(Undecorated)
    const DecoratedC = component(Undecorated)

    expect(DecoratedA.index).toBe(0)
    expect(DecoratedB.index).toBe(1)
    expect(DecoratedC.index).toBe(2)
  })
})
