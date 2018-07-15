/**
 * Linearly interpolates between two numbers
 * @param from result at t = 0
 * @param to result at t = 1
 * @param t interpolation parameter
 */
export function lerp (from: number, to: number, t: number) {
  return from + (to - from) * t
}
