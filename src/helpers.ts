export function lerp(min: number, max: number, t: number): number {
  return min * (1 - t) + max * t;
}
