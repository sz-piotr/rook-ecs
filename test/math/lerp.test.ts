import { lerp } from '../../src/math/lerp'

describe('lerp', () => {
  it('linearly interpolates numbers', () => {
    expect(lerp(1, 2, 0)).toBe(1)
    expect(lerp(1, 2, 1)).toBe(2)
    expect(lerp(1, 2, 0.5)).toBe(1.5)
    expect(lerp(1, 2, 2)).toBe(3)
    expect(lerp(1, 2, -1)).toBe(0)
  })
})
