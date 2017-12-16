import { IndexedArray } from '../src/IndexedArray'

const objectA = { id: 1 }
const objectB = { id: 2 }

describe('IndexedArray', () => {
  it('should start with 0 elements', () => {
    expect(new IndexedArray().elements).toEqual([])
  })

  test('put should add elements', () => {
    const array = new IndexedArray()
    array.put(objectA)

    expect(array.elements).toEqual([objectA])
  })

  test('has should return if an element is in the array', () => {
    const array = new IndexedArray()
    array.put(objectA)

    expect(array.has(objectA)).toBe(true)
    expect(array.has(objectB)).toBe(false)
  })

  test('remove should remove an element if it is in the array', () => {
    const array = new IndexedArray()
    array.put(objectA)

    expect(array.has(objectA)).toBe(true)

    array.remove(objectA)
    array.remove(objectB)

    expect(array.has(objectA)).toBe(false)
    expect(array.has(objectB)).toBe(false)
  })
})
