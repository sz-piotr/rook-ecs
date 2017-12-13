import { Key } from './key'

const KEY_TEST_SIZE = 40

describe('Key', () => {
  test('#constructor() should construct an object', () => {
    expect(() => new Key(0)).not.toThrow()
  })

  test('should match correctly', () => {
    let errors = 0

    for (let a = 0; a < KEY_TEST_SIZE; a++) {
      for (let b = a + 1; b < KEY_TEST_SIZE; b++) {
        for (let c = b + 1; c < KEY_TEST_SIZE; c++) {
          const keyNone = new Key(KEY_TEST_SIZE)
          const keyA = new Key(KEY_TEST_SIZE).set(a)
          const keyB = new Key(KEY_TEST_SIZE).set(b)
          const keyC = new Key(KEY_TEST_SIZE).set(c)
          const keyAB = new Key(KEY_TEST_SIZE).set(a).set(b)
          const keyBC = new Key(KEY_TEST_SIZE).set(b).set(c)
          const keyAC = new Key(KEY_TEST_SIZE).set(a).set(c)
          const keyABC = new Key(KEY_TEST_SIZE).set(a).set(b).set(c)

          errors += !keyNone.matches(keyNone)
          errors += keyNone.matches(keyA)
          errors += keyNone.matches(keyB)
          errors += keyNone.matches(keyC)
          errors += keyNone.matches(keyAB)
          errors += keyNone.matches(keyBC)
          errors += keyNone.matches(keyAC)
          errors += keyNone.matches(keyABC)

          errors += !keyA.matches(keyNone)
          errors += !keyA.matches(keyA)
          errors += keyA.matches(keyB)
          errors += keyA.matches(keyC)
          errors += keyA.matches(keyAB)
          errors += keyA.matches(keyBC)
          errors += keyA.matches(keyAC)
          errors += keyA.matches(keyABC)

          errors += !keyB.matches(keyNone)
          errors += keyB.matches(keyA)
          errors += !keyB.matches(keyB)
          errors += keyB.matches(keyC)
          errors += keyB.matches(keyAB)
          errors += keyB.matches(keyBC)
          errors += keyB.matches(keyAC)
          errors += keyB.matches(keyABC)

          errors += !keyC.matches(keyNone)
          errors += keyC.matches(keyA)
          errors += keyC.matches(keyB)
          errors += !keyC.matches(keyC)
          errors += keyC.matches(keyAB)
          errors += keyC.matches(keyBC)
          errors += keyC.matches(keyAC)
          errors += keyC.matches(keyABC)

          errors += !keyAB.matches(keyNone)
          errors += !keyAB.matches(keyA)
          errors += !keyAB.matches(keyB)
          errors += keyAB.matches(keyC)
          errors += !keyAB.matches(keyAB)
          errors += keyAB.matches(keyBC)
          errors += keyAB.matches(keyAC)
          errors += keyAB.matches(keyABC)

          errors += !keyBC.matches(keyNone)
          errors += keyBC.matches(keyA)
          errors += !keyBC.matches(keyB)
          errors += !keyBC.matches(keyC)
          errors += keyBC.matches(keyAB)
          errors += !keyBC.matches(keyBC)
          errors += keyBC.matches(keyAC)
          errors += keyBC.matches(keyABC)

          errors += !keyAC.matches(keyNone)
          errors += !keyAC.matches(keyA)
          errors += keyAC.matches(keyB)
          errors += !keyAC.matches(keyC)
          errors += keyAC.matches(keyAB)
          errors += keyAC.matches(keyBC)
          errors += !keyAC.matches(keyAC)
          errors += keyAC.matches(keyABC)

          errors += !keyABC.matches(keyNone)
          errors += !keyABC.matches(keyA)
          errors += !keyABC.matches(keyB)
          errors += !keyABC.matches(keyC)
          errors += !keyABC.matches(keyAB)
          errors += !keyABC.matches(keyBC)
          errors += !keyABC.matches(keyAC)
          errors += !keyABC.matches(keyABC)
        }
      }
    }

    expect(errors).toBe(0)
  })
})
