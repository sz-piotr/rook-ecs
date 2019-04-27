import { System, InitEvent } from './systems'
import { Entity, clearNotify } from './Entity'
import { Query } from './Query'
import { World } from './World'
import { Selector } from './selectors'

export function startGame (systems: System<any>[]) {
  const cleanups: (() => void)[] = []
  const events: any[] = []

  const queries = [new Query((() => true) as any, [])]
  const queryMap = new Map<Function, Query>()
  const changed: Entity[] = []
  const removed: Entity[] = []

  let running = false

  function query (fn: Selector) {
    const query = queryMap.get(fn)
    if (query) {
      return query.entities
    } else {
      const query = new Query(fn, queries[0].entities)
      queryMap.set(fn, query)
      return query.entities
    }
  }

  function add (components: any[] = []) {
    return components.reduce((e: Entity, c) => e.add(c), new Entity(onChange))
  }

  function onChange (entity: Entity) {
    changed.push(entity)
  }

  function remove (entity: Entity) {
    removed.push(entity)
  }

  function emit (event: any) {
    if (running) {
      events.push(event)
    } else {
      setTimeout(() => runSystems(event))
    }
  }

  function applyUpdates () {
    for (const query of queries) {
      changed.forEach(entity => query.onChange(entity))
      removed.forEach(entity => query.onRemove(entity))
    }
    changed.forEach(clearNotify)
    removed.forEach(clearNotify)
    changed.length = 0
    removed.length = 0
  }

  function runSystem (system: System<any>, world: World<any>) {
    try {
      const result = system(world)
      if (typeof result === 'function') {
        cleanups.push(result)
      }
    } catch (e) {
      console.error(e)
    }
  }

  function runSystems (event: any) {
    running = true
    const world = { event, query, add, remove, emit }
    systems.forEach(system => runSystem(system, world))
    applyUpdates()
    running = false
  }

  setTimeout(() => runSystems(new InitEvent()))

  return () => {
    cleanups.forEach(cleanup => cleanup())
  }
}
