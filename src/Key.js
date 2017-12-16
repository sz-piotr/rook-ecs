const KEY_BITS = 31

const POWERS = []
for (let i = 0; i < KEY_BITS; i++) {
  POWERS[i] = 2 ** i
}

export class Key {
  constructor (length) {
    this.values = []
    for (let i = 0; i < length / KEY_BITS; i++) {
      this.values.push(0)
    }
  }

  set (index) {
    this.setBit(index, true)
    return this
  }

  unset (index) {
    this.setBit(index, false)
    return this
  }

  setBit (index, value) {
    let valueIndex = 0
    while (index >= KEY_BITS) {
      valueIndex++
      index -= KEY_BITS
    }

    const previousValue = (this.values[valueIndex] & POWERS[index]) !== 0
    if (value && !previousValue) {
      this.values[valueIndex] += POWERS[index]
    } else if (!value && previousValue) {
      this.values[valueIndex] -= POWERS[index]
    }
  }

  matches (other) {
    for (let i = 0; i < other.values.length; i++) {
      const currentValue = this.values[i] || 0
      const otherValue = other.values[i]
      if ((currentValue & otherValue) !== otherValue) {
        return false
      }
    }
    return true
  }
}
