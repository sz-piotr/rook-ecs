export type Instance = { constructor: Function }
export interface Constructor<T> {
  new (...args: any[]): T
}

export class Entity<T = never> {
  private components = new Map<Constructor<any>, any>()
  private didNotify = false
  private notify: () => void

  constructor (onChange: (entity: Entity<T>) => void) {
    this.notify = () => {
      if (!this.didNotify) {
        this.didNotify = true
        onChange(this)
      }
    }
  }

  add <U extends Instance> (component: U): Entity<T | U> {
    if (component == null) {
      throw new TypeError('Argument is not a component instance.')
    }

    const componentType = component.constructor as Constructor<U>

    if ((componentType as any) === Object || typeof componentType !== 'function') {
      throw new TypeError('Argument is not a component instance.')
    } else if (this.components.has(componentType)) {
      throw new Error('Component type already present.')
    }

    this.components.set(componentType, component)
    this.notify()

    return this
  }

  has <U> (componentType: Constructor<U>): this is Entity<T | U> {
    if (typeof componentType !== 'function') {
      throw new TypeError('Argument is not a component type.')
    }

    return this.components.has(componentType)
  }

  get <U extends T> (componentType: Constructor<U>): U {
    if (typeof componentType !== 'function') {
      throw new TypeError('Argument is not a component type.')
    }

    const component = this.components.get(componentType) as U

    if (!component) {
      throw new TypeError('Component type not present.')
    }

    return component
  }

  remove <U extends T> (componentType: Constructor<U>): Entity<Exclude<T, U>> {
    if (typeof componentType !== 'function') {
      throw new TypeError('Argument is not a component type.')
    }

    this.components.delete(componentType)
    this.notify()

    return this as any
  }
}

export function clearNotify (entity: Entity<any>) {
  (<any>entity).didNotify = false
}
