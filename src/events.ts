export class InitEvent {}

export class UpdateTick {
  constructor (
    readonly timestamp: number,
    readonly deltaTime: number
  ) {}
}

export class RenderTick {}
