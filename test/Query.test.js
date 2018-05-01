import { Query } from '../src/Query'

const hasX = value => value && value.x

describe('Query', () => {
  it('can be constructed', () => {
    expect(() => new Query(hasX)).not.toThrow()
  })

  test('onChange should correctly modify the entities list', () => {
    const query = new Query(hasX)
    const entity = { x: 1 }

    query.onChange(entity)

    expect(query.entities).toEqual(new Set([entity]))

    entity.y = 1
    query.onChange(entity)

    expect(query.entities).toEqual(new Set([entity]))

    delete entity.x

    query.onChange(entity)
    expect(query.entities).toEqual(new Set())
  })

  test('onRemove should correctly modify the entities list', () => {
    const query = new Query(hasX)
    const entity = { x: 1 }

    query.onChange(entity)
    expect(query.entities).toEqual(new Set([entity]))

    query.onRemove(entity)
    expect(query.entities).toEqual(new Set())
  })
})
