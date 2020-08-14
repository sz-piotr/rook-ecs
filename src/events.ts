export class InitEvent {}

export class UpdateTick {
  constructor (
    readonly realTime: number,
    readonly time: number,
    readonly deltaTime: number
  ) {}
}

export class RenderTick {}
