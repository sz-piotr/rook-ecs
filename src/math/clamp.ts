/**
 * Clamps value between min and max
 * @param value the value to be clamped
 * @param min the lower limit
 * @param max the upper limit
 */
export function clamp (value: number, min: number, max: number) {
  return Math.max(min, Math.min(value, max))
}
