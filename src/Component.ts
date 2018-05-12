export interface ComponentClass<T extends Component> {
  new (...args: any[]): T,
  id: string
}

export interface Component {
  constructor: ComponentClass<this>
}
