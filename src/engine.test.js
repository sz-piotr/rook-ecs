import { Engine } from './engine'

describe('Engine.constructor()', () => {
  test('should be a constructor', () => {
    expect(() => {
      new Engine()
    }).not.toThrow()
  })
})
