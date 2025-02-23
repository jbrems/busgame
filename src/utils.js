import { Vector } from './Vector.js'

export function v(x, y) {
  return new Vector(x, y)
}

export function deg(rad) {
  return rad * 180 / Math.PI
}

export function rad(deg) {
  return deg * Math.PI / 180
}