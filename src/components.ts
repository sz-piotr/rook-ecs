export interface ComponentClass<T> {
  new (...args: any[]): T,
  id: string
}
