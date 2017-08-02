import { Key } from './key'

export class Entity {
  constructor(next, announceDirty) {
    this.prev = null
    this.next = next

    this.components = []
    this.key = new Key()

    this.dirty = false
    this.announceDirty = announceDirty
  }

  addComponent(component) {
    const index = component.__proto__.constructor.index
    if(!this.components[index]) {
      this.setDirty(true)
    }
    this.key.setBit(index, true)
    this.components[index] = component
    return this
  }

  removeComponent(componentClass) {
    const index = componentClass.index
    if(this.components[index]) {
      this.setDirty(true)
    }
    this.key.setBit(index, false)
    this.components[index] = null
    return this
  }

  matches(key) {
    return this.key.matches(key)
  }

  setDirty(value) {
    if(!this.dirty && value) {
      this.announceDirty(this)
    }
    this.dirty = value
  }
}
