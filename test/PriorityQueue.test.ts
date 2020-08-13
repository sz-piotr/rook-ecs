import { expect } from 'chai'
import { PriorityQueue } from '../src/PriorityQueue'

describe('PriorityQueue', () => {
  it('is a FIFO for elements with the same priority', () => {
    const queue = new PriorityQueue<string>()
    queue.enqueue('foo', 1)
    queue.enqueue('bar', 1)
    queue.enqueue('baz', 1)
    expect(queue.dequeue()).to.equal('foo')
    expect(queue.dequeue()).to.equal('bar')
    expect(queue.dequeue()).to.equal('baz')
    expect(queue.dequeue()).to.equal(undefined)
  })

  it('returns isEmpty when there are no elements', () => {
    const queue = new PriorityQueue<string>()
    expect(queue.isEmpty()).to.equal(true)
    queue.enqueue('foo', 1)
    expect(queue.isEmpty()).to.equal(false)
    queue.enqueue('bar', 2)
    expect(queue.isEmpty()).to.equal(false)
    queue.dequeue()
    expect(queue.isEmpty()).to.equal(false)
    queue.dequeue()
    expect(queue.isEmpty()).to.equal(true)
  })

  it('dequeue maintains priorities', () => {
    const queue = new PriorityQueue<string>()
    queue.enqueue('foo', 0)
    queue.enqueue('bar', 1)
    expect(queue.dequeue()).to.equal('bar')
    expect(queue.dequeue()).to.equal('foo')
  })

  it('supports many different priorities', () => {
    const queue = new PriorityQueue<string>()
    queue.enqueue('F', 2)
    queue.enqueue('A', 0)
    queue.enqueue('C', 1)
    queue.enqueue('B', 0)
    queue.enqueue('D', 1)
    queue.enqueue('G', 2)
    queue.enqueue('E', 1)
    expect(queue.dequeue()).to.equal('F')
    expect(queue.dequeue()).to.equal('G')
    expect(queue.dequeue()).to.equal('C')
    expect(queue.dequeue()).to.equal('D')
    expect(queue.dequeue()).to.equal('E')
    expect(queue.dequeue()).to.equal('A')
    expect(queue.dequeue()).to.equal('B')
    expect(queue.dequeue()).to.equal(undefined)
  })
})
