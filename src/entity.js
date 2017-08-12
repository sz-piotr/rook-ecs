import { Key } from './key'

export class Entity {
  constructor(componentCount, componentIdMap, onKeyChanged) {
    this.components = []
    this.componentIdMap = componentIdMap
    this.key = new Key()

    this.prev = null
    this.next = null

    this.keyChangeAnnounced = false
    this.onKeyChanged = onKeyChanged
  }

  add(component) {
    const index = this.getIndexById(component._componentId)
    if(this.components[index]) {
      throw new Error('Cannot add another instance of the same component.')
    }
    this.key.setBit(index, true)
    this.components[index] = component
    this.onChange()
    return this
  }

  has(Component) {
    const index = this.getIndexById(Component.id)
    return this.components[index] && true
  }

  get(Component) {
    const index = this.getIndexById(Component.id)
    const component = this.components[index]
    if(!component) {
      throw new Error('Requested component is not present.')
    }
    return component
  }

  remove(Component) {
    const index = this.getIndexById(Component.id)
    const component = this.components[index]
    if(!component) {
      throw new Error('Cannot remove component instance, because it doesn\'t  exist on target entity.')
    }
    Component.destroy(component)
    this.key.setBit(index, false)
    this.components[index] = null
    this.onChange()
    return this
  }

  onChange() {
    if(!this.keyChangeAnnounced) {
      this.onKeyChanged(this)
    }
    this.keyChangeAnnounced = true
  }

  getIndexById(componentId) {
    const index = this.componentIdMap[componentId]
    if(index === undefined) {
      throw new Error('Unknown component passed as argument. Components not included in queries should be manually' +
        ' registered using Engine.registerComponent().')
    }
    return index
  }
}
