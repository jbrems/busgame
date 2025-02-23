export class Vector {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  get mag() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  get angle() {
    if (this.mag === 0) return 0
    if (this.y >= 0) return Math.acos(this.x / this.mag)
    return Math.PI * 2 - Math.acos(this.x / this.mag)
  }

  normalize() {
    this.div(this.mag)
    return this
  }

  add(other) {
    this.x += other.x
    this.y += other.y
    return this
  }

  sub(other) {
    this.x -= other.x
    this.y -= other.y
    return this
  }

  mult(value) {
    this.x *= value
    this.y *= value
    return this
  }

  div(value) {
    if (value === 0) return this
    this.x /= value
    this.y /= value
    return this
  }

  set mag(value) {
    this.setMag(value)
  }

  setMag(value) {
    return this.normalize().mult(value)
  }

  clamp(min, max) {
    this.x = Math.min(Math.max(this.x, min), max)
    this.y = Math.min(Math.max(this.y, min), max)
    return this
  }

  copy() {
    return new Vector(this.x, this.y)
  }

  angleBetween(other) {
    return Vector.angleBetween(this, other)
  }

  distanceBetween(other) {
    return Vector.distanceBetween(this, other)
  }

  static fromAngle(angle) {
    return new Vector(Math.cos(angle), Math.sin(angle))
  }

  static angleBetween(v1, v2) {
    return v2.copy().sub(v1).angle
  }

  static distanceBetween(v1, v2) {
    return v2.copy().sub(v1).mag
  }
}
