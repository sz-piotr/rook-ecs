import { system } from './system'
import { InitEvent } from './init-event'

export class PhisicsTick {
  constructor(
    readonly time: number,
    readonly timeDelta: number,
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
  const timeDelta = 1000 / ticksPerSecond
  return system(InitEvent, function (world) {
    let lastTime = Date.now()
    let stop = () => {}

    update()
    function update () {
      const now = Date.now()

      while (lastTime < now) {
        world.emit(new PhisicsTick(now, timeDelta))
        lastTime += timeDelta
      }
      world.emit(new RenderTick())

      stop = schedule(update)
    }

    return () => stop()
  })
}
