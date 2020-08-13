export class PriorityQueue<T> {
  private elements: { value: T, priority: number }[] = []

  enqueue (value: T, priority: number) {
    this.elements.push({ value, priority })
  }

  dequeue () {
    let index = -1
    let maxPriority = -Infinity
    for (let i = 0; i < this.elements.length; i++) {
      if (this.elements[i].priority > maxPriority) {
        index = i
        maxPriority = this.elements[i].priority
      }
    }
    if (index !== -1) {
      const value = this.elements[index].value
      this.elements.splice(index, 1)
      return value
    }
  }

  isEmpty () {
    return this.elements.length === 0
  }
}
