import { Entity } from './entity'
import { Key } from './key'
import { component } from './component'

const noop = () => {}

describe('Entity', () => {
  test('constructor() should construct an object', () => {
    expect(() => new Entity(0, [], noop)).not.toThrow()
  })
})
