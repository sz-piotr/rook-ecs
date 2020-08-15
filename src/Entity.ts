import { Component } from './Component'

export class Entity {
  private components: Record<string, any> = {}
  private didNotify = false
  private notify: () => void

  constructor (onChange: (entity: Entity) => void) {
    this.notify = () => {
      if (!this.didNotify) {
        this.didNotify = true
        onChange(this)
      }
    }
  }

  set <T> (component: Component<T>, value: T): this {
    const shouldNotify = !this.has(component)
    this.components[component] = value
    if (shouldNotify) {
      this.notify()
    }
    return this
  }

  has (component: Component<any>): boolean {
    return Object.prototype.hasOwnProperty.call(this.components, component)
  }

  get <T> (component: Component<T>): T {
    const value = this.components[component]
    if (!value) {
      throw new TypeError('Component type not present.')
    }
    return value
  }

  remove (component: Component<any>): this {
    delete this.components[component]
    this.notify()
    return this
  }
}
