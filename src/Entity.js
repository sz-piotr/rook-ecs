import { Key } from './key'
import { assert } from './utils'

let index = 0

export class Entity {
  constructor (componentCount, onKeyChanged) {
    this.id = index++
    this.prev = null
    this.next = null

    this.key = new Key(componentCount)
    this._components = makeNullArray(componentCount)

    this._changeAnnounced = false
    this._onKeyChanged = onKeyChanged
  }

  add (componentInstance) {
    const index = componentInstance._id

    assert(this._components[index], 'Cannot add another instance of the same component.')
    assert(index < this._components.length, 'Unknown component passed as argument.')

    this.key.setBit(index, true)
    this._components[index] = componentInstance

    this._onChange()
    return this
  }

  has (Component) {
    return !!this._components[Component.id]
  }

  get (Component) {
    const component = this._components[Component.id]
    assert(component, 'Requested component is not present.')
    return component
  }

  remove (Component) {
    const index = Component.id
    const component = this._components[index]

    assert(component, 'Cannot remove component instance, because it doesn\'t  exist on target entity.')

    this.key.unset(index)
    this._components[index] = null
    this._onChange()
    return this
  }

  _onChange () {
    if (!this._changeAnnounced) {
      this._onKeyChanged(this)
    }
    this._changeAnnounced = true
  }

  onChangeRegistered () {
    this._changeAnnounced = false
  }
}

function makeNullArray (size) {
  const array = []
  for (let i = 0; i < size; i++) {
    array[i] = null
  }
  return array
}
