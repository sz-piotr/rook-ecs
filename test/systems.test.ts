import { System, toInternalSystem } from '../src/systems'
import { SingleQuery, MultiQuery } from '../src/Query'

describe('toInternalSystem', () => {
  it('unifies a standard system without a query', () => {
    const system: System = {
      on: 'x',
      process: () => {}
    }
    const internal = toInternalSystem(system)
    expect(internal).toEqual({
      query: undefined,
      on: 'x',
      process: system.process
    })
  })

  it('unifies a standard system with a query', () => {
    const system: System = {
      query: () => true,
      on: 'x',
      process: () => {}
    }
    const internal = toInternalSystem(system)
    expect(internal).toEqual({
      query: expect.any(SingleQuery),
      on: 'x',
      process: system.process
    })
  })

  it('unifies a multi-query system', () => {
    const system: System = {
      query: [() => true, () => true],
      on: 'x',
      process: () => {}
    }
    const internal = toInternalSystem(system)
    expect(internal).toEqual({
      query: expect.any(MultiQuery),
      on: 'x',
      process: system.process
    })
  })

  it('unifies an iterative system', () => {
    const system: System = {
      query: () => true,
      on: 'x',
      processEntity: jest.fn()
    }
    const internal = toInternalSystem(system)
    expect(internal).toEqual({
      query: expect.any(SingleQuery),
      on: 'x',
      process: expect.any(Function)
    })
  })

  it('handles processEntity', () => {
    const processEntity = jest.fn()
    const system: System = {
      query: () => true,
      on: 'x',
      processEntity
    }

    const internal = toInternalSystem(system)
    internal.process(<any>[1, 2, 3], <any>null, <any>null)

    expect(processEntity.mock.calls.length).toEqual(3)
  })
})
