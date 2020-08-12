import { expect } from 'chai'
import { component } from '../src/Component'
import { Entity } from '../src/Entity'
import { InitEvent } from '../src/events'
import { system } from '../src/System'
import { World } from '../src/World'

describe('World', () => {
  describe('create', () => {
    it('throws if called outside run', () => {
      const world = new World([])
      expect(() => world.create()).to.throw()
    })

    it('creates a new entity', () => {
      const world = new World([])
      let entity
      world.run(() => { entity = world.create() })
      expect(entity).to.be.instanceOf(Entity)
    })
  })

  describe('emit', () => {
    it('throws if called outside run', () => {
      const world = new World([])
      expect(() => world.emit(new InitEvent())).to.throw()
    })

    it('emits events that can be picked up by systems', () => {
      class MyEvent {}
      let calls = 0

      const mySystem = system(MyEvent, () => { calls += 1 })

      const world = new World([mySystem])
      world.run(() => {
        world.emit(new MyEvent())
        world.emit(new MyEvent())
        world.emit(new MyEvent())

        expect(calls).to.equal(0)
      })

      expect(calls).to.equal(3)
    })
  })

  describe('query', () => {
    it('throws if called outside run', () => {
      const world = new World([])
      expect(() => world.query()).to.throw()
    })

    it('can query entities', () => {
      const A = component<number>('A')
      const B = component<number>('B')

      const world = new World([])
      world.run(() => {
        world.create().add(A, 1).add(B, 2)
        world.create().add(A, 3).add(B, 4)
        world.create().add(A, 5)
        world.create().add(B, 6)
        world.create()

        const entities = world.query(A, B)
        expect(entities.length).to.equal(0)
      })
      world.run(() => {
        const entities = world.query(A, B)
        expect(entities.length).to.equal(2)
      })
    })
  })

  describe('queryOne', () => {
    it('throws if called outside run', () => {
      const world = new World([])
      expect(() => world.queryOne()).to.throw()
    })

    it('can query entities', () => {
      const A = component<number>('A')
      const B = component<number>('B')

      const world = new World([])
      world.run(() => {
        world.create().add(A, 1)
        world.create().add(A, 3)
        world.create()

        expect(world.queryOne(A)).to.equal(undefined)
        expect(world.queryOne(B)).to.equal(undefined)
      })
      world.run(() => {
        expect(world.queryOne(A)).to.be.instanceOf(Entity)
        expect(world.queryOne(B)).to.equal(undefined)
      })
    })
  })

  describe('remove', () => {
    it('throws if called outside run', () => {
      const world = new World([])
      let entity: Entity
      world.run(() => { entity = world.create() })
      expect(() => world.remove(entity)).to.throw()
    })

    it('can remove entities', () => {
      const world = new World([])
      let entity: Entity
      world.run(() => { entity = world.create() })
      world.run(() => { world.remove(entity) })
      world.run(() => {
        expect(world.query()).to.deep.equal([])
      })
    })

    it('can remove entities that are later modified', () => {
      const A = component<number>('A')
      const world = new World([])
      let entity: Entity
      world.run(() => { entity = world.create() })
      world.run(() => { world.remove(entity) })
      world.run(() => { entity.add(A, 42) })
      world.run(() => {
        expect(world.query()).to.deep.equal([])
      })
    })
  })
})
