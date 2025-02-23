import { v } from './utils.js'
import { randomNumber, randomColor } from './random.js'

export class Particle {
  constructor() {
    this.pos = v(0, 0)
    this.vel = v(0, 0)
    this.acc = v(0, 0)
    this.width = randomNumber(1, 10)
    this.height = this.width
    this.mass = this.size
    this.color = randomColor(50, 50)
    this.hist = []
  }

  setPos(pos) {
    this.pos = pos
    return this
  }

  setVel(vel) {
    this.vel = vel
    return this
  }

  setAcc(acc) {
    this.acc = acc
    return this
  }

  setWidth(width) {
    this.width = width
    return this
  }

  setHeight(height) {
    this.height = height
    return this
  }

  setSize(size) {
    this.width = size
    this.height = size
    return this
  }

  setMass(mass) {
    this.mass = mass
    return this
  }

  setColor(color) {
    this.color = color
    return this
  }

  copy() {
    const c = new Particle()
    c.setPos(this.pos.copy()).setVel(this.vel.copy()).setAcc(this.acc.copy())
    c.setWidth(this.width).setHeight(this.height).setMass(this.mass)
    c.setColor(this.color)
    c.onDraw(this.drawFn)
    return c
  }

  get boundingBox() {
    return {
      x: this.pos.x,
      y: this.pos.y,
      width: this.width,
      height: this.height,
    }
  }

  onDraw(drawFn) {
    this.drawFn = drawFn
    return this
  }

  draw(ctx) {
    if (!this.drawFn) {
      ctx.circle(this.pos, this.width).fill(this.color)
      return this
    }

    this.drawFn(ctx, this)
    return this
  }

  drawTrail(ctx) {
    this.hist.forEach((hist, i) => {
      ctx.circle(hist, this.size * (100 - i) / 100).stroke(this.color)
    })
  }

  drawDebug(ctx) {
    ctx.rect(this.boundingBox.x, this.boundingBox.y, this.boundingBox.width, this.boundingBox.height).lineWidth(1).stroke('red')
  }

  update(updateCount) {
    if (updateCount % 10 === 0) this.hist.unshift(this.pos.copy())
    this.hist.splice(100, 1)

    this.vel.add(this.acc)
    this.pos.add(this.vel)
    return this
  }

  applyForce(force) {
    this.vel.add(force)
    return this
  }

  chase(target, speed) {
    const direction = target.copy().sub(this.pos)
    direction.setMag(Math.min(speed, direction.mag * speed / 100 + 0.1))
    this.setVel(direction)
    return this
  }

  detectSimpleCollision(otherBox) {
    const aabbResult = aabb(this.boundingBox, otherBox)
    return aabbResult.collides
  }

  predictUntil(predicate, edges) {
    let count = 0
    const c = this.copy()
    do {
      edges.forEach(e => c.detectSimpleCollision(e))
      c.update()
      count++
    } while(count < 1000 && !predicate(c))
    return c
  }
}

function aabb(a, b) {
  const verticalEdges = [
    { p: 'A', val: a.x },
    { p: 'A', val: a.x + a.width },
    { p: 'B', val: b.x },
    { p: 'B', val: b.x + b.width },
  ]
  const orderedVerticalEdges = verticalEdges.toSorted((el1, el2) => el1.val - el2.val)

  const horizontalEdges = [
    { p: 'A', val: a.y },
    { p: 'A', val: a.y + a.height },
    { p: 'B', val: b.y },
    { p: 'B', val: b.y + b.height },
  ]
  const orderedHorizontalEdges = horizontalEdges.toSorted((el1, el2) => el1.val - el2.val)

  const vertical = orderedVerticalEdges.map(el => el.p).join('')
  const horizontal = orderedHorizontalEdges.map(el => el.p).join('')

  return {
    vertical,
    horizontal,
    collides: vertical[0] !== vertical[1] && horizontal[0] !== horizontal[1],
  }
}