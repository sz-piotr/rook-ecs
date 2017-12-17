export const defaultTicker = function (update) {
  window.requestAnimationFrame(onAnimationFrame)
  let lastTime = Date.now()
  function onAnimationFrame () {
    window.requestAnimationFrame(onAnimationFrame)
    let now = Date.now()
    update(Math.min(now - lastTime, 100))
    lastTime = now
  }
}
