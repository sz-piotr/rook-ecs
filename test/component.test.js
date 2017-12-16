import { createComponent } from '../src/component'

describe('component', () => {
  test('the result should be a constructor', () => {
    const TestComponent = createComponent(['a', 'b'], 0)
    expect(new TestComponent(1, 2)).toEqual({ a: 1, b: 2 })
  })

  test('the result have and id property', () => {
    const TestComponent = createComponent(['a', 'b'], 1234)
    const instance = new TestComponent(1, 2)

    expect(TestComponent.id).toEqual(1234)
    expect(TestComponent.id).toEqual(instance._id)
  })
})
