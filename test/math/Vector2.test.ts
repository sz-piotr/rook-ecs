import { Vector2 } from '../../src/math/Vector2'

describe('Vector2', () => {
  it('can be constructed', () => {
    const vector = new Vector2(1, 2)
    expect(vector).toEqual({ x: 1, y: 2 })
  })

  it('can be constructed from object', () => {
    const vector = Vector2.fromObject({ x: 1, y: 2 })
    expect(vector).toEqual({ x: 1, y: 2 })
  })

  it('can be constructed from array', () => {
    const vector = Vector2.fromArray([1, 2])
    expect(vector).toEqual({ x: 1, y: 2 })
  })

  test('the `length` property works correctly', () => {
    expect(new Vector2(3, 4).length).toEqual(5)
  })

  test('the `lengthSquared` property works correctly', () => {
    expect(new Vector2(3, 4).lengthSquared).toEqual(25)
  })

  it('can be cloned', () => {
    const vector = new Vector2(1, 2)
    const clone = vector.clone()

    expect(vector).not.toBe(clone)
    expect(vector).toEqual(clone)
    expect(vector).toEqual({ x: 1, y: 2 })
  })

  it('can be stringified', () => {
    expect(new Vector2(1, 2).toString()).toEqual('(1, 2)')
  })
})

describe('Vector2.zero', () => {
  it('should return (0, 0)', () => {
    expect(Vector2.zero()).toEqual({ x: 0, y: 0 })
  })

  it('should return a new vector each time', () => {
    expect(Vector2.zero()).not.toBe(Vector2.zero())
  })
})

describe('Vector2.set', () => {
  it('works with numbers', () => {
    const vector = Vector2.zero().set(1, 2)
    expect(vector).toEqual({ x: 1, y: 2 })
  })

  it('works with vectors', () => {
    const vector = Vector2.zero().set(new Vector2(1, 2))
    expect(vector).toEqual({ x: 1, y: 2 })
  })
})

describe('Vector2.equals', () => {
  it('identifies exactly equal vectors', () => {
    const a = new Vector2(1, 2)
    const b = new Vector2(1, 2)
    expect(a.equals(b)).toBe(true)
  })

  it('identifies not exactly equal vectors', () => {
    const a = new Vector2(1, 2)
    const b = new Vector2(1, 3)
    expect(a.equals(b)).toBe(false)
  })

  it('identifies approximately equal vectors', () => {
    const a = new Vector2(1, 2)
    const b = new Vector2(1, 2.005)
    expect(a.equals(b, 0.005)).toBe(true)
  })

  it('identifies not approximately equal vectors', () => {
    const a = new Vector2(1, 2)
    const b = new Vector2(1, 2.006)
    expect(a.equals(b, 0.005)).toBe(false)
  })
})

describe('Vector2.add', () => {
  it('adds a vector to a vector', () => {
    const a = new Vector2(1, 2)
    a.add(new Vector2(3, 4))
    expect(a).toEqual({ x: 4, y: 6 })
  })

  it('adds a scalar to a vector', () => {
    const a = new Vector2(1, 2)
    a.add(3)
    expect(a).toEqual({ x: 4, y: 5 })
  })
})

describe('Vector2.sub', () => {
  it('subtracts a vector from a vector', () => {
    const a = new Vector2(1, 2)
    a.sub(new Vector2(3, 4))
    expect(a).toEqual({ x: -2, y: -2 })
  })

  it('subtracts a scalar from a vector', () => {
    const a = new Vector2(1, 2)
    a.sub(3)
    expect(a).toEqual({ x: -2, y: -1 })
  })
})

describe('Vector2.mul', () => {
  it('multiplies a vector by a vector', () => {
    const a = new Vector2(1, 2)
    a.mul(new Vector2(3, 4))
    expect(a).toEqual({ x: 3, y: 8 })
  })

  it('multiplies a vector by a scalar', () => {
    const a = new Vector2(1, 2)
    a.mul(3)
    expect(a).toEqual({ x: 3, y: 6 })
  })
})

describe('Vector2.div', () => {
  it('divides a vector by a vector', () => {
    const a = new Vector2(1, 2)
    a.div(new Vector2(3, 4))
    expect(a).toEqual({ x: 1 / 3, y: 2 / 4 })
  })

  it('divides a vector by a scalar', () => {
    const a = new Vector2(1, 2)
    a.div(3)
    expect(a).toEqual({ x: 1 / 3, y: 2 / 3 })
  })
})

describe('Vector2.mulAdd', () => {
  it('adds a vector premultiplied by a scalar to a vector', () => {
    const a = new Vector2(1, 2)
    const b = new Vector2(3, 4)

    a.mulAdd(b, 10)

    expect(a).toEqual({ x: 31, y: 42 })
    expect(b).toEqual({ x: 3, y: 4 }) // not modified
  })

  it('adds a vector premultiplied by a vector to a vector', () => {
    const a = new Vector2(1, 2)
    const b = new Vector2(3, 4)
    const c = new Vector2(10, 20)

    a.mulAdd(b, c)

    expect(a).toEqual({ x: 31, y: 82 })
    expect(b).toEqual({ x: 3, y: 4 }) // not modified
    expect(c).toEqual({ x: 10, y: 20 }) // not modified
  })
})

describe('Vector2.setLength', () => {
  it('changes the length of the vector', () => {
    const vector = new Vector2(3, 4)
    vector.setLength(10)
    expect(vector).toEqual({ x: 6, y: 8 })
  })

  it('does not affect a vector of (0, 0)', () => {
    const vector = Vector2.zero()
    vector.setLength(1)
    expect(vector).toEqual(Vector2.zero())
  })
})

describe('Vector2.setLengthSquared', () => {
  it('changes the length of the vector', () => {
    const vector = new Vector2(3, 4)
    vector.setLengthSquared(100)
    expect(vector).toEqual({ x: 6, y: 8 })
  })

  it('does not affect a vector of (0, 0)', () => {
    const vector = Vector2.zero()
    vector.setLength(1)
    expect(vector).toEqual(Vector2.zero())
  })
})

describe('Vector2.normalize', () => {
  it('sets the length of the vector to 1', () => {
    const vector = new Vector2(3, 4)
    vector.normalize()
    expect(
      vector.equals(new Vector2(3 / 5, 4 / 5), 0.0000000001)
    ).toBe(true)
  })

  it('does not affect a vector of (0, 0)', () => {
    const vector = Vector2.zero()
    vector.normalize()
    expect(vector).toEqual(Vector2.zero())
  })
})

describe('Vector2.distanceTo', () => {
  it('calculates the distance between two vectors', () => {
    const a = new Vector2(1, 2)
    const b = new Vector2(4, 6)
    expect(a.distanceTo(b)).toBe(5)
  })
})

describe('Vector2.distanceSquaredTo', () => {
  it('calculates square of the distance between two vectors', () => {
    const a = new Vector2(1, 2)
    const b = new Vector2(4, 6)
    expect(a.distanceSquaredTo(b)).toBe(25)
  })
})

describe('Vector2.lerp', () => {
  it('linearly interpolates between two vectors', () => {
    const a = new Vector2(1, 2)
    const b = new Vector2(3, 6)
    expect(Vector2.lerp(a, b, 0.5)).toEqual({ x: 2, y: 4 })
  })
})
