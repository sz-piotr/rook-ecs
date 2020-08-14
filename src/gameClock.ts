import { system } from './System'
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

export function gameClock (
  ticksPerSecond = 60,
  maxDroppedTicks = ticksPerSecond,
  schedule = scheduleDefault
) {
  const deltaMs = 1000 / ticksPerSecond

  return system(InitEvent, function (world) {
    let lastTime = Date.now()
    let totalUpdates = 0

    update()
    function update () {
      world.run(() => {
        const now = Date.now()
        let droppedTicks = 0
        while (lastTime <= now) {
          droppedTicks++
          if (droppedTicks <= maxDroppedTicks) {
            totalUpdates++
            world.emit(new UpdateTick(
              now,
              totalUpdates / ticksPerSecond,
              1 / ticksPerSecond
            ))
          }
          lastTime += deltaMs
        }
        world.emit(new RenderTick())
      })

      schedule(update)
    }
  })
}
