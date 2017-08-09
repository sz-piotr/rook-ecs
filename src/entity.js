import { Key } from './key'

export class Entity {
  constructor(next, announceDirty) {
    this.prev = null
    this.next = next

    this.components = []
    this.key = new Key()

    this.dirty = true
    this.announceDirty = announceDirty

    this.announceDirty(this)
  }

  add(component) {
    const index = getComponentIndexFromInstance(component)
    if(!this.components[index]) {
      this.setDirty(true)
    }
    this.key.setBit(index, true)
    this.components[index] = component
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

function getComponentIndexFromInstance(component) {
  const componentClass = component ? component.__proto__.constructor : null
  if(!component || !isComponentClass(componentClass)) {
    throw new Error('Entity.add(): Argument is not a component instance')
  }
  return componentClass.index
}

function isComponentClass(value) {
  return value && value.index !== undefined
}
