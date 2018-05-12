import { assert } from './assert'
import { Component, ComponentClass } from './Component'

type ComponentMap = {
  [key: string]: Component
}

export class Entity {
  private _components: ComponentMap = Object.create(null)
  private _changeRegistered = false

  constructor (private _registerChange) {
  }

  add (instance: Component) {
    assert(instance != null, 'Entity.add :: Argument is not a component instance.')

    const componentClass = instance.constructor

    assert(componentClass && componentClass.id != null, 'Entity.add :: Argument is not a component instance.')
    assert(!this._components[componentClass.id], 'Entity.add :: Component class already present.')

    this._components[componentClass.id] = instance
    this._onChange()

    return this
  }

  has (componentClass: ComponentClass<any>) {
    assert(componentClass && componentClass.id != null, 'Entity.has :: Argument is not a component class.')
    return !!this._components[componentClass.id]
  }

  get <T extends Component> (componentClass: ComponentClass<T>): T {
    assert(componentClass && componentClass.id != null, 'Entity.get :: Argument is not a component class.')
    const component = this._components[componentClass.id]
    assert(component != null, 'Entity.get :: Component class not present.')
    return <T>component
  }

  remove (componentClass: ComponentClass<any>) {
    assert(componentClass && componentClass.id != null, 'Entity.remove :: Argument is not a component class.')

    this._components[componentClass.id] = undefined
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
