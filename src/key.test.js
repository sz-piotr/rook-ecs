import { Key } from './key'

describe('Key', () => {
  test('#constructor() should construct an object', () => {
    expect(() => {
      new Key()
      new Key([1, 2, 3])
    }).not.toThrow()
  })

  test('should match itself', () => {
    const keyA = new Key([])
    const keyB = new Key([1])
    const keyC = new Key([30])
    const keyD = new Key([31])
    const keyE = new Key([1, 30])
    const keyF = new Key([1, 31])
    const keyG = new Key([1, 30, 61])
    const keyH = new Key([1, 30, 62])
    const keyI = new Key([1, 31, 61])
    const keyJ = new Key([1, 31, 62])

    expect(keyA.matches(keyA)).toBeTruthy()
    expect(keyB.matches(keyB)).toBeTruthy()
    expect(keyC.matches(keyC)).toBeTruthy()
    expect(keyD.matches(keyD)).toBeTruthy()
    expect(keyE.matches(keyE)).toBeTruthy()
    expect(keyF.matches(keyF)).toBeTruthy()
    expect(keyG.matches(keyG)).toBeTruthy()
    expect(keyH.matches(keyH)).toBeTruthy()
    expect(keyI.matches(keyI)).toBeTruthy()
    expect(keyJ.matches(keyJ)).toBeTruthy()
  })

  test('should match a subset of itself', () => {
    const keyA = new Key([1, 31, 62])
    const keyB = new Key([1, 31])
    const keyC = new Key([31])
    const keyD = new Key([1])
    const keyE = new Key([])

    expect(keyA.matches(keyA)).toBeTruthy()
    expect(keyA.matches(keyB)).toBeTruthy()
    expect(keyA.matches(keyC)).toBeTruthy()
    expect(keyA.matches(keyD)).toBeTruthy()
    expect(keyA.matches(keyE)).toBeTruthy()

    expect(keyB.matches(keyB)).toBeTruthy()
    expect(keyB.matches(keyC)).toBeTruthy()
    expect(keyB.matches(keyD)).toBeTruthy()
    expect(keyB.matches(keyE)).toBeTruthy()

    expect(keyC.matches(keyC)).toBeTruthy()
    expect(keyC.matches(keyE)).toBeTruthy()

    expect(keyD.matches(keyD)).toBeTruthy()
    expect(keyD.matches(keyE)).toBeTruthy()

    expect(keyE.matches(keyE)).toBeTruthy()
  })

  test('should not match a key containing a foreign index', () => {
    const keyA = new Key([1, 31, 62])

    const keyB = new Key([1, 31, 61])
    const keyC = new Key([2, 31])
    const keyD = new Key([1, 30])
    const keyE = new Key([2])

    expect(keyA.matches(keyB)).toBeFalsy()
    expect(keyA.matches(keyC)).toBeFalsy()
    expect(keyA.matches(keyD)).toBeFalsy()
    expect(keyA.matches(keyE)).toBeFalsy()
  })

  test('should be modifieable in runtime', () => {
    const keyA = new Key([1, 31, 62])
    const keyB = new Key([2, 31])

    expect(keyA.matches(keyA)).toBeTruthy()
    expect(keyA.matches(keyB)).toBeFalsy()

    keyA.setBit(1, false)

    expect(keyA.matches(new Key([31, 62]))).toBeTruthy()
    expect(keyA.matches(keyB)).toBeFalsy()

    keyA.setBit(2, true)

    expect(keyA.matches(new Key([2, 31, 62]))).toBeTruthy()
    expect(keyA.matches(keyB)).toBeTruthy()

    keyA.setBit(31, false)

    expect(keyA.matches(new Key([2, 62]))).toBeTruthy()
    expect(keyA.matches(keyB)).toBeFalsy()
  })
})
