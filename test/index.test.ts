import * as Rook from '../src'
import { expect } from 'chai'

describe('index', () => {
  it('exports everything that is required', () => {
    const A = Rook.component<number>('A')
    const B = Rook.component<string>('B')

    const init = Rook.system(Rook.InitEvent, (world, event) => {
      world.create()
        .set(A, 42)
        .set(B, 'foo')
    })

    const world = Rook.start([init])

    world.run(() => {
      const entities = world.query(A, B)
      expect(entities.length).to.equal(1)

      const entity = entities[0]
      expect(entity.get(A)).to.equal(42)
      expect(entity.get(B)).to.equal('foo')
    })
  })
})
