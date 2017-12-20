import { Game } from '../src/Game'
import { Query } from '../src/Query'

let tick = () => {}
const onTick = fn => (tick = fn)

describe('Game', () => {
  it('can be constructed', () => {
    expect(() => new Game()).not.toThrow()
  })

  it('can create components', () => {
    const game = new Game()
    const A = game.createComponent('a')
    expect(new A(1)).toEqual({ a: 1 })
  })

  it('can create entities', () => {
    const game = new Game(onTick)
    game.start((game) => {
      expect(game.createEntity()).toBeInstanceOf(Object)
    })
  })

  it('can register systems', () => {
    const game = new Game()

    const System = {
      process: () => {}
    }

    expect(() => game.registerSystems([System])).not.toThrow()
  })

  it('can run two systems', () => {
    const game = new Game(onTick)

    const System1 = {
      process: jest.fn()
    }

    const System2 = {
      process: jest.fn()
    }

    game.registerSystems([
      System1,
      System2
    ])

    game.start(game => {
      game.createEntity()
    })

    tick(0)

    expect(System1.process).toHaveBeenCalled()
    expect(System2.process).toHaveBeenCalled()
  })

  it('can run a system with query', () => {
    const game = new Game(onTick)
    const A = game.createComponent('a')

    const System = {
      query: new Query(A),
      process: jest.fn()
    }

    game.registerSystems([System])

    game.start(game => {
      game.createEntity().add(new A(1))
      game.createEntity()
    })

    tick(0)

    expect(System.process).toHaveBeenCalled()
  })

  it('can run a system with processEntity', () => {
    const game = new Game(onTick)
    const A = game.createComponent()

    const System = {
      query: new Query(A),
      processEntity: jest.fn()
    }

    game.registerSystems([System])

    game.start(game => {
      game.createEntity().add(new A())
      game.createEntity().add(new A())
    })

    tick(0)

    expect(System.processEntity.mock.calls.length).toBe(2)
  })

  it('can run a system with many queries', () => {
    const game = new Game(onTick)
    const A = game.createComponent()
    const B = game.createComponent()

    const System = {
      query: [new Query(A), new Query(B)],
      process: jest.fn()
    }

    game.registerSystems([System])

    game.start(game => {
      game.createEntity().add(new A())
      game.createEntity().add(new B())
    })

    tick(0)

    expect(System.process).toHaveBeenCalled()
  })

  // it('can run a system listening for events', () => {
  //   const game = new Game(onTick)

  //   const OnHelloSystem = {
  //     on: 'hello',
  //     process: jest.fn()
  //   }

  //   game.registerSystems([OnHelloSystem])
  //   game.start(game => game.emit('hello'))

  //   tick(0)
  //   expect(OnHelloSystem.process).toHaveBeenCalled()
  // })

  test('createEntity works with assemblages', () => {
    const assemblage = jest.fn()
    const game = new Game(onTick)
    game.start(game => game.createEntity(assemblage))
    expect(assemblage).toHaveBeenCalled()
  })
})
