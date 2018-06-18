import { Entity } from './Entity'
import { Event } from './Events'
import { World } from './World'
import { createQuery, Query } from './Query'
import { Selector } from './selectors'

export type System =
  StandardSystem |
  MultiQuerySystem |
  IterativeSystem

export interface StandardSystem {
  query?: Selector,
  on?: string,
  process (entites: Entity[], world: World, event: Event): void
}

export interface MultiQuerySystem {
  query: Selector[],
  on?: string,
  process (entites: Entity[][], world: World, event: Event): void
}

export interface IterativeSystem {
  query: Selector,
  on?: string,
  processEntity (entity: Entity, world: World, event: Event): void
}

export interface InternalSystem {
  query?: Query,
  on: string,
  process (entites: Entity[] | Entity[][], world: World, event: Event): void
}

export function toInternalSystem (system: System): InternalSystem {
  const process = isIterativeSystem(system)
    ? createProcess(system.processEntity)
    : system.process

  return {
    query: system.query && createQuery(system.query),
    on: system.on || 'tick',
    process
  }
}

function isIterativeSystem (system: System): system is IterativeSystem {
  return !(<any>system).process
}

function createProcess (processEntity: IterativeSystem['processEntity']) {
  return function (entities: Entity[], world: World, event: Event) {
    for (const entity of entities) {
      processEntity(entity, world, event)
    }
  }
}
