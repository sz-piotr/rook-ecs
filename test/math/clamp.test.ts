import { clamp } from '../../src/math/clamp'

describe('clamp', () => {
  it('clamps numbers', () => {
    expect(clamp(5, 0, 10)).toBe(5)
    expect(clamp(-5, 0, 10)).toBe(0)
    expect(clamp(15, 0, 10)).toBe(10)
  })
})
