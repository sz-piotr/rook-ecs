import { system, iteratingSystem } from './system'

const mockEngine = {
  getMapper: component => ({ component })
}

describe('system', () => {
  test('should create a class from a function', () => {
    const System = system({})(function update() {})
    const instance = new System(mockEngine)
    expect(instance).toEqual({ engine: mockEngine })
  })

  test('when update is called this refers to the instance', () => {
    let innerThis
    const update = function() {
      innerThis = this
    }

    const System = system({})(update)
    const instance = new System(mockEngine)
    instance.update()
    expect(innerThis).toBe(instance)
  })

  test('mappers option results in appropriate bindings', () => {
    const ComponentA = function(a) { this.a = a }
    const ComponentB = function(b) { this.b = b }
    const System = system({
      mappers: {
        aMapper: ComponentA,
        bMapper: ComponentB
      }
    })(function update() {})
    const instance = new System(mockEngine)

    expect(instance).toEqual({
      engine: mockEngine,
      aMapper: { component: ComponentA },
      bMapper: { component: ComponentB }
    })
  })

  test('query option results in appropriate bindings', () => {
    const exampleQuery = 'exampleQuery'
    const System = system({
      query: exampleQuery
    })(function update() {})
    const instance = new System(mockEngine)

    expect(instance).toEqual({
      engine: mockEngine,
      query: exampleQuery
    })
  })
})

describe('iteratingSystem', () => {
  test('should create a class from a function', () => {
    const System = iteratingSystem({})(function update() {})
    const instance = new System(mockEngine)
    expect(instance).toEqual({ engine: mockEngine })
  })

  test('when update is called this refers to the instance', () => {
    let innerThis
    const update = function() {
      innerThis = this
    }

    const System = iteratingSystem({})(update)
    const instance = new System(mockEngine)
    instance.update([1])
    expect(innerThis).toBe(instance)
  })

  test('mappers option results in appropriate bindings', () => {
    const ComponentA = function(a) { this.a = a }
    const ComponentB = function(b) { this.b = b }
    const System = iteratingSystem({
      mappers: {
        aMapper: ComponentA,
        bMapper: ComponentB
      }
    })(function update() {})
    const instance = new System(mockEngine)

    expect(instance).toEqual({
      engine: mockEngine,
      aMapper: { component: ComponentA },
      bMapper: { component: ComponentB }
    })
  })

  test('query option results in appropriate bindings', () => {
    const exampleQuery = 'exampleQuery'
    const System = iteratingSystem({
      query: exampleQuery
    })(function update() {})
    const instance = new System(mockEngine)

    expect(instance).toEqual({
      engine: mockEngine,
      query: exampleQuery
    })
  })

  test('update called with every value of passed array', () => {
    const update = jest.fn()
    const System = iteratingSystem({})(update)
    new System(mockEngine).update([1, 2, 3, 4], 5)

    update.mock.calls.sort((a, b) => a[0] - b[0]) // call order doesn't matter
    expect(update.mock.calls).toEqual([
      [1, 5],
      [2, 5],
      [3, 5],
      [4, 5]
    ])
  })
})
