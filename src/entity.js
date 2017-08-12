import { Key } from './key'

export class Entity {
  constructor({ componentIdMap, onKeyChanged }) {
    this.components = []
    this.componentIdMap = componentIdMap
    this.key = new Key()

    this.prev = null
    this.next = null

    this.keyChangeAnnounced = false
    this.onKeyChanged = onKeyChanged
  }

  add(componentInstance) {
    const id = this.componentIdMap[componentInstance._componentId]
    if(this.components[index]) {
      throw 'Entity.add(): Component already present'
    }
    this.key.setBit(index, true)
    this.components[index] = componentInstance
    return this
  }

  get(componentClass) {
    if(!isComponentClass(componentClass)) {
      throw new Error('Entity.get(): Argument is not a component class')
    }

    const component = this.components[componentClass.index]
    if(!component) {
      throw new Error('Entity.get(): Requested component is not present')
    }

    return component
  }

  remove(componentClass) {
    const index = componentClass.index
    if(this.components[index]) {
      this.setDirty(true)
    }
    this.key.setBit(index, false)
    this.components[index] = null
    return this
  }

  setDirty(value) {
    if(!this.dirty && value) {
      this.announceDirty(this)
    }
    this.dirty = value
  }
}

function isComponentClass(value) {
  return value && value.index !== undefined
}
