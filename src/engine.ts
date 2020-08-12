import { System, InitEvent } from './systems'
import { Entity } from './entity'
import { World } from './world'
import { EntityManager } from './entity-manager'

export function start (systems: System<any>[]) {
  const cleanups: (() => void)[] = []
  const events: any[] = []
  const entityManager = new EntityManager()
  let running = false

  function createWorld (event: any) {
    return {
      event,
      query: entityManager.query,
      queryOne: entityManager.queryOne,
      add,
      remove: entityManager.scheduleRemove,
      emit
    }
  }

  function add (components: any[] = []) {
    return components.reduce(
      (e: Entity, c) => e.add(c),
      new Entity(entityManager.scheduleUpdate),
    )
  }

  function emit (event: any) {
    if (running) {
      events.push(event)
    } else {
      setTimeout(() => runSystems(event))
    }
  }

  function runSystems (event: any) {
    running = true
    const world = createWorld(event)
    for (const system of systems) {
      runSystem(system, world)
      entityManager.processUpdates()
    }
    running = false
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

  setTimeout(() => runSystems(new InitEvent()))

  return () => {
    cleanups.forEach(cleanup => cleanup())
  }
}
