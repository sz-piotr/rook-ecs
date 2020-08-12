import { system } from './system'
import { InitEvent, UpdateTick, RenderTick } from './events'

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
  return system(InitEvent, function (world) {
    let lastTime = Date.now()

    update()
    function update () {
      world.run(() => {
        const now = Date.now()
        while (lastTime < now) {
          world.emit(new UpdateTick(now, 1 / ticksPerSecond))
          lastTime += deltaMs
        }
        world.emit(new RenderTick())
      })

      schedule(update)
    }
  })
}
