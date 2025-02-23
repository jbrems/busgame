import { Vector } from './Vector.js'

export class Road {
  constructor(speed) {
    this.speed = speed
    this.stripes = new Array(11).fill(0).map((_, i) => new Stripe(new Vector(i * 100, 201), new Vector(-this.speed, 0)))
  }

  draw(ctx) {
    ctx.rect(0, 156, ctx.width, ctx.height - 156).fill('#bbbbbb')
    
    this.stripes.forEach(s => s.draw(ctx))
  }

  update() {
    this.stripes.forEach(s => s.update())
  }
}

class Stripe {
  constructor(pos, vel) {
    this.pos = pos
    this.vel = vel
  }

  draw(ctx) {
    ctx.rect(this.pos.x, this.pos.y, 30, 10).fill('white')
  }

  update() {
    this.pos.add(this.vel)
    if (this.pos.x < -30) this.pos.x = 1070
  }
}