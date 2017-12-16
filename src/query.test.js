import { Query } from './query'
import { component } from './component'
import { Engine } from './engine'
import { Key } from './key'

const ComponentA = component()
const ComponentB = component()
const ComponentC = component()

describe('Query', () => {
  test('baking should initialize the key', () => {
    const query = new Query(ComponentA, ComponentB).bake(new Engine())
    expect(query.key).toBeInstanceOf(Key)
  })

  test('onChange should correctly modify the entities list', () => {
    const engine = new Engine()
    engine.registerComponent(ComponentC)
    const query = new Query(ComponentA, ComponentB).bake(engine)

    engine.started = true

    const entity1 = engine.createEntity()
      .add(new ComponentA())
    query.onChange(entity1)

    expect(query.entities).toEqual([])

    entity1.add(new ComponentB())
    query.onChange(entity1)

    expect(query.entities).toEqual([entity1])

    entity1.add(new ComponentC())
    query.onChange(entity1)

    expect(query.entities).toEqual([entity1])

    entity1.remove(ComponentA)
    query.onChange(entity1)

    expect(query.entities).toEqual([])
  })

  test('onRemove should correctly modify the entities list', () => {
    const engine = new Engine()
    const query = new Query(ComponentA, ComponentB).bake(engine)

    engine.started = true

    const entity1 = engine.createEntity()
      .add(new ComponentA())
      .add(new ComponentB())
    query.onChange(entity1)

    const entity2 = engine.createEntity()
    query.onChange(entity2)

    expect(query.entities).toEqual([entity1])

    query.onRemove(entity1)
    query.onRemove(entity2)

    expect(query.entities).toEqual([])
  })
})
