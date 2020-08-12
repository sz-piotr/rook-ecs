import { createSystem } from './createSystem'
import { InitEvent } from './init-event'

export class UpdateTick {
  constructor (
    readonly timestamp: number,
    readonly deltaTime: number
  ) {}
}

export class RenderTick {}

function scheduleRaf (callback: () => void) {
  const id = requestAnimationFrame(callback)
  return () => cancelAnimationFrame(id)
}

function scheduleTimeout (callback: () => void) {
  const id = setTimeout(callback, 16)
  return () => clearTimeout(id)
}

const scheduleDefault = typeof requestAnimationFrame === 'function' ? scheduleRaf : scheduleTimeout

export function gameClock (ticksPerSecond = 60, schedule = scheduleDefault) {
  const deltaMs = 1000 / ticksPerSecond
  return createSystem(InitEvent, function (world) {
    let lastTime = Date.now()
    let stop = (): void => undefined

    update()
    function update () {
      const now = Date.now()

      while (lastTime < now) {
        world.emit(new UpdateTick(now, 1 / ticksPerSecond))
        lastTime += deltaMs
      }
      world.emit(new RenderTick())

      stop = schedule(update)
    }

    return () => stop()
  })
}
