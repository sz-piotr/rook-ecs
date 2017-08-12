export class ObjectPool {
  constructor() {
    this.objects = []
  }

  put(object) {
    this.objects.push(object)
  }

  get() {
    return this.objects.pop(object)
  }

  isEmpty() {
    return this.objects.length === 0
  }
}
