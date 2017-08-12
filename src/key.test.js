import { Key } from './key'

const KEY_TEST_SIZE = 40

describe('Key', () => {
  test('#constructor() should construct an object', () => {
    expect(() => {
      new Key(0)
    }).not.toThrow()
  })

  test('should match correctly', () => {
    let errors = 0

    for(let a = 0; a < KEY_TEST_SIZE; a++) {
      for(let b = a + 1; b < KEY_TEST_SIZE; b++) {
        for(let c = b + 1; c < KEY_TEST_SIZE; c++) {

          const key_none = new Key(KEY_TEST_SIZE)
          const key_a = new Key(KEY_TEST_SIZE).set(a)
          const key_b = new Key(KEY_TEST_SIZE).set(b)
          const key_c = new Key(KEY_TEST_SIZE).set(c)
          const key_ab = new Key(KEY_TEST_SIZE).set(a).set(b)
          const key_bc = new Key(KEY_TEST_SIZE).set(b).set(c)
          const key_ac = new Key(KEY_TEST_SIZE).set(a).set(c)
          const key_abc = new Key(KEY_TEST_SIZE).set(a).set(b).set(c)

          errors += !key_none.matches(key_none)
          errors += key_none.matches(key_a)
          errors += key_none.matches(key_b)
          errors += key_none.matches(key_c)
          errors += key_none.matches(key_ab)
          errors += key_none.matches(key_bc)
          errors += key_none.matches(key_ac)
          errors += key_none.matches(key_abc)

          errors += !key_a.matches(key_none)
          errors += !key_a.matches(key_a)
          errors += key_a.matches(key_b)
          errors += key_a.matches(key_c)
          errors += key_a.matches(key_ab)
          errors += key_a.matches(key_bc)
          errors += key_a.matches(key_ac)
          errors += key_a.matches(key_abc)

          errors += !key_b.matches(key_none)
          errors += key_b.matches(key_a)
          errors += !key_b.matches(key_b)
          errors += key_b.matches(key_c)
          errors += key_b.matches(key_ab)
          errors += key_b.matches(key_bc)
          errors += key_b.matches(key_ac)
          errors += key_b.matches(key_abc)

          errors += !key_c.matches(key_none)
          errors += key_c.matches(key_a)
          errors += key_c.matches(key_b)
          errors += !key_c.matches(key_c)
          errors += key_c.matches(key_ab)
          errors += key_c.matches(key_bc)
          errors += key_c.matches(key_ac)
          errors += key_c.matches(key_abc)

          errors += !key_ab.matches(key_none)
          errors += !key_ab.matches(key_a)
          errors += !key_ab.matches(key_b)
          errors += key_ab.matches(key_c)
          errors += !key_ab.matches(key_ab)
          errors += key_ab.matches(key_bc)
          errors += key_ab.matches(key_ac)
          errors += key_ab.matches(key_abc)

          errors += !key_bc.matches(key_none)
          errors += key_bc.matches(key_a)
          errors += !key_bc.matches(key_b)
          errors += !key_bc.matches(key_c)
          errors += key_bc.matches(key_ab)
          errors += !key_bc.matches(key_bc)
          errors += key_bc.matches(key_ac)
          errors += key_bc.matches(key_abc)

          errors += !key_ac.matches(key_none)
          errors += !key_ac.matches(key_a)
          errors += key_ac.matches(key_b)
          errors += !key_ac.matches(key_c)
          errors += key_ac.matches(key_ab)
          errors += key_ac.matches(key_bc)
          errors += !key_ac.matches(key_ac)
          errors += key_ac.matches(key_abc)

          errors += !key_abc.matches(key_none)
          errors += !key_abc.matches(key_a)
          errors += !key_abc.matches(key_b)
          errors += !key_abc.matches(key_c)
          errors += !key_abc.matches(key_ab)
          errors += !key_abc.matches(key_bc)
          errors += !key_abc.matches(key_ac)
          errors += !key_abc.matches(key_abc)
        }
      }
    }

    expect(errors).toBe(0)
  })
})
