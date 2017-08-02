import { Engine } from './engine'

describe('Engine', () => {
  test('should be a constructor', () => {
    expect(() => new Engine()).not.toThrow()
  })
})
