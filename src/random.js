import { Vector } from './Vector.js'
import { v } from './utils.js'

export function randomNumber(min, max) {
  return Math.random() * (max - min) + min
}

export function randomColor(saturation = 75, lightness = 50) {
  return `hsl(${randomNumber(0, 360)}, ${saturation}%, ${lightness}%)`
}

export function randomV() {
  const angle = Math.random() * Math.PI * 2
  const mag = Math.random()
  return Vector.fromAngle(angle).setMag(mag)
}

export function randomPos(width, height) {
  return v(randomNumber(0, width), randomNumber(0, height))
}