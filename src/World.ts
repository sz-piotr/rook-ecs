import { Entity } from './Entity'
import { Component } from './Component'
import { EntityManager } from './EntityManager'
import { System } from './System'

export class World {
  private entityManager = new EntityManager()
  constructor (
    private systems: System<any>[]
  ) {}

  private running = false
  private events: any[] = []

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

  emit (event: any) {
    this.ensureRunning()
    this.events.push(event)
  }

  run (callback: () => void) {
    if (this.running) {
      callback()
      return
    }
    this.running = true
    callback()
    this.entityManager.processUpdates()
    while (this.events.length > 0) {
      const event = this.events.pop()
      for (const system of this.systems) {
        system(this, event)
        this.entityManager.processUpdates()
      }
    }
    this.running = false
  }

  private ensureRunning () {
    if (!this.running) {
      throw new Error('In an asynchronous context you need to wrap calls to world in world.run()')
    }
  }
}
