export type Component<T> = string & { __type__: T }
export function component <T> (name: string): Component<T> {
  return name as Component<T>
}
