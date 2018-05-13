import { Component, ComponentClass } from './Component'

type ComponentMap = {
  [key: string]: Component | undefined
}

let idSequence = 0

export class Entity {
  private _components: ComponentMap = Object.create(null)
  private _changeRegistered = false
  readonly id = idSequence++

  constructor (
    private _registerChange: (entity: Entity) => void
  ) {}

  add (instance: Component) {
    if (instance == null) {
      throw new Error('Entity.add :: Argument is not a component instance.')
    }

    const componentClass = instance.constructor

    if (!componentClass || !componentClass.id) {
      throw new Error('Entity.add :: Argument is not a component instance.')
    } else if (this._components[componentClass.id]) {
      throw new Error('Entity.add :: Component class already present.')
    }

    this._components[componentClass.id] = instance
    this._onChange()

    return this
  }

  has (componentClass: ComponentClass<any>) {
    if (!componentClass || !componentClass.id) {
      throw new Error('Entity.has :: Argument is not a component class.')
    }

    return !!this._components[componentClass.id]
  }

  get <T extends Component> (componentClass: ComponentClass<T>): T {
    if (!componentClass || !componentClass.id) {
      throw new Error('Entity.get :: Argument is not a component class.')
    }

    const component = this._components[componentClass.id]

    if (!component) {
      throw new Error('Entity.get :: Component class not present.')
    }

    return <T>component
  }

  remove (componentClass: ComponentClass<any>) {
    if (!componentClass || !componentClass.id) {
      throw new Error('Entity.remove :: Argument is not a component class.')
    }

    this._components[componentClass.id] = undefined
    this._onChange()

    return this
  }

  private _onChange () {
    if (!this._changeRegistered) {
      this._registerChange(this)
      this._changeRegistered = true
    }
  }

  private _onChangeRegistered () {
    this._changeRegistered = false
  }
}
