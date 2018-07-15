import * as math from '../../src/math'
import { lerp } from '../../src/math/lerp'
import { clamp } from '../../src/math/clamp'
import { Vector2 } from '../../src/math/Vector2'

describe('math package', () => {
  it('has the `lerp` function', () => {
    expect(math.lerp).toBe(lerp)
  })

  it('has the `clamp` function', () => {
    expect(math.clamp).toBe(clamp)
  })

  it('has the `Vector2` class', () => {
    expect(math.Vector2).toBe(Vector2)
  })
})
