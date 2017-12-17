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

    expect(System1.process).toHaveBeenCalledWith([], expect.anything(), game)
    expect(System2.process).toHaveBeenCalledWith([], expect.anything(), game)
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

    expect(System.process).toHaveBeenCalledWith(
      [expect.anything()], expect.anything(), game
    )
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

    expect(System.processEntity.mock.calls).toEqual([
      [expect.anything(), expect.anything(), game],
      [expect.anything(), expect.anything(), game]
    ])
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

    expect(System.process).toHaveBeenCalledWith(
      [[expect.anything()], [expect.anything()]],
      expect.anything(),
      game
    )
  })

  it('can run a system listening for events', () => {
    const game = new Game(onTick)

    let i = 0
    const EmitterSystem = {
      process (entities, timeDelta, game) {
        if (i++ === 1) {
          game.emit('hello')
        }
      }
    }

    const OnHelloSystem = {
      on: 'hello',
      process: jest.fn()
    }

    game.registerSystems([EmitterSystem, OnHelloSystem])
    game.start(() => {})

    tick(0)
    expect(OnHelloSystem.process).not.toHaveBeenCalled()

    game.emit('hello')

    tick(1000)
    expect(OnHelloSystem.process).toHaveBeenCalledWith(
      [],
      { type: 'hello', timeDelta: 1 },
      game
    )
  })

  test('emit works with simple events', () => {
    const game = new Game(onTick)
    expect(game.events).toEqual([])
    game.start(() => {})

    tick(0)

    game.emit('customevent')
    expect(game.events).toEqual([
      expect.anything(),
      { type: 'customevent', timeDelta: 0 }
    ])

    tick(1000)

    game.emit('customevent')
    expect(game.events).toEqual([
      expect.anything(),
      { type: 'customevent', timeDelta: 1 }
    ])
  })

  test('emit works with complex events', () => {
    const game = new Game()
    expect(game.events).toEqual([])

    game.emit({ type: 'customevent', x: 1 })
    expect(game.events).toEqual([
      { type: 'customevent', x: 1, timeDelta: 0 }
    ])
  })

  test('createEntity works with assemblages', () => {
    const assemblage = jest.fn()
    const game = new Game(onTick)
    game.start(game => game.createEntity(assemblage))
    expect(assemblage).toHaveBeenCalled()
  })
})
