import { Entity } from './Entity'
import { ComponentClass } from './components'

export type Selector = (entity: Entity) => boolean

export function hasAll (...components: ComponentClass<any>[]): Selector {
  if (!components.every(isComponent)) {
    throw new Error('hasAll :: All arguments must be components.')
  }

  return entity => components.every(
    component => entity.has(component)
  )
}

function isComponent (componentClass: any): componentClass is ComponentClass<any> {
  return componentClass && componentClass.id
}
