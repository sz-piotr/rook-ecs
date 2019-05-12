export interface ComponentClass<T> {
  new (...args: any[]): T
  type: string
}

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

  add (component: any): this {
    if (component == null) {
      throw new TypeError('Argument is not a component instance.')
    }

    const componentClass = component.constructor

    if (!isComponentClass(componentClass)) {
      throw new TypeError('Argument is not a component instance.')
    } else if (this.has(componentClass)) {
      throw new Error('Component type already present.')
    }

    this.components[componentClass.type] = component
    this.notify()

    return this
  }

  has <U> (componentClass: ComponentClass<U>): boolean {
    if (!isComponentClass(componentClass)) {
      throw new TypeError('Argument is not a component class.')
    }

    return this.components.hasOwnProperty(componentClass.type)
  }

  get <U> (componentClass: ComponentClass<U>): U {
    if (typeof componentClass !== 'function') {
      throw new TypeError('Argument is not a component class.')
    }

    const component = this.components[componentClass.type] as U

    if (!component) {
      throw new TypeError('Component type not present.')
    }

    return component
  }

  remove (componentClass: ComponentClass<any>): this {
    if (typeof componentClass !== 'function') {
      throw new TypeError('Argument is not a component class.')
    }

    delete this.components[componentClass.type]
    this.notify()

    return this as any
  }
}

function isComponentClass (value: unknown): value is ComponentClass<any> {
  return typeof value === 'function' && typeof (value as any).type === 'string'
}

export function clearNotify (entity: Entity) {
  (<any>entity).didNotify = false
}
