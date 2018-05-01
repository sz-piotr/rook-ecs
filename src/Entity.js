import { assert } from './utils'

export class Entity {
  constructor (registerChange) {
    this._components = Object.create(null)
    this._changeRegistered = false
    this._registerChange = registerChange
  }

  add (instance) {
    assert(instance != null, `Entity.add :: Argument is ${instance}.`)

    const Component = instance.constructor

    assert(Component && Component.id, 'Entity.add :: Argument is not a component instance.')
    assert(!this._components[Component.id], `Entity.add :: Component "${Component.id}" is already present.`)

    this._components[Component.id] = instance
    this._onChange()

    return this
  }

  has (Component) {
    assert(Component && Component.id, 'Entity.has :: Argument is not a component.')
    return !!this._components[Component.id]
  }

  get (Component) {
    assert(Component && Component.id, 'Entity.get :: Argument is not a component.')
    const component = this._components[Component.id]
    assert(component, `Entity.get :: Component "${Component.id}" is not present.`)
    return component
  }

  remove (Component) {
    assert(Component && Component.id, 'Entity.remove :: Argument is not a component.')

    this._components[Component.id] = undefined
    this._onChange()

    return this
  }

  _onChange () {
    if (!this._changeRegistered) {
      this._registerChange(this)
    }
    this._changeRegistered = true
  }

  _onChangeRegistered () {
    this._changeRegistered = false
  }
}
