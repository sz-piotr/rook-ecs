import { Entity } from './Entity'
import { Component } from './Component'
import { EntityManager } from './EntityManager'
import { System } from './System'
import { PriorityQueue } from './PriorityQueue'

export class World {
  private entityManager = new EntityManager()
  constructor (
    private systems: System<any>[]
  ) {}

  private running = false
  private events = new PriorityQueue<any>()

  query (...components: Component<any>[]): readonly Entity[] {
    this.ensureRunning()
    return this.entityManager.query(...components)
  }

  queryOne (...components: Component<any>[]): Entity | undefined {
    this.ensureRunning()
    return this.query(...components)[0]
  }

  create (): Entity {
    this.ensureRunning()
    return this.entityManager.create()
  }

  remove (entity: Entity) {
    this.ensureRunning()
    return this.entityManager.scheduleRemove(entity)
  }

  emit (event: any, priority = 0) {
    this.ensureRunning()
    this.events.enqueue(event, priority)
  }

  run (callback: () => void) {
    if (this.running) {
      callback()
      return
    }
    this.running = true
    callback()
    this.entityManager.processUpdates()
    while (!this.events.isEmpty()) {
      const event = this.events.dequeue()
      for (const system of this.systems) {
        system(this, event)
        this.entityManager.processUpdates()
      }
    }
    this.running = false
  }

  private ensureRunning () {
    if (!this.running) {
      throw new Error('Outside synchronous systems you need to wrap calls to world in world.run()')
    }
  }
}
