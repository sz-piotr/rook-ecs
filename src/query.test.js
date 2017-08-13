import { Query } from './query'
import { component } from './component'
import { Engine } from './engine'
import { Key } from './key'

const ComponentA = component(function() {})
const ComponentB = component(function() {})
const ComponentC = component(function() {})

describe('Query', () => {
  test('all should create an object with bake method', () => {
    expect(Query.all(ComponentA).bake).toBeInstanceOf(Function)
  })

  test('the bake method should return a working query', () => {
    const query = Query.all(ComponentA, ComponentB).bake(new Engine())
    expect(query.key).toBeInstanceOf(Key)
  })

  test('baked.onChange should correctly modify the entities list', () => {
    const engine = new Engine()
    engine.registerComponent(ComponentC)
    const query = Query.all(ComponentA, ComponentB).bake(engine)

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

  test('baked.onRemove should correctly modify the entities list', () => {
    const engine = new Engine()
    const query = Query.all(ComponentA, ComponentB).bake(engine)

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
