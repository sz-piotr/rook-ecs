const KEY_BITS = 31

const POWERS = []
for(let i = 0; i < KEY_BITS; i++) {
  POWERS[i] = 2 ** i
}

export class Key {
  constructor(indices = []) {
    this.values = []
    for(let i = 0; i < indices.length; i++) {
      this.setBit(indices[i], true)
    }
  }

  setBit(index, value) {
    while(this.values.length * KEY_BITS <= index) {
      this.values.push(0)
    }

    let valueIndex = 0
    while(index >= KEY_BITS) {
      valueIndex++
      index -= KEY_BITS
    }

    const previousValue = (this.values[valueIndex] & POWERS[index]) !== 0
    if(value && !previousValue) {
      this.values[valueIndex] += POWERS[index]
    } else if(!value && previousValue) {
      this.values[valueIndex] -= POWERS[index]
    }
  }

  matches(other) {
    for(let i = 0; i < other.values.length; i++) {
      const currentValue = this.values[i] || 0
      const otherValue = other.values[i]
      if((currentValue & otherValue) !== otherValue) {
        return false
      }
    }
    return true
  }
}
