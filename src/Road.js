import { Vector } from './Vector.js'

export class Road {
  constructor(speed) {
    this.stripes = new Stripes(new Vector(-speed, 0))
  }

  setSpeed(speed) {
    this.stripes.setVel(new Vector(-speed, 0))
  }

  draw(ctx) {
    ctx.rect(0, 156, ctx.width, ctx.height - 156).fill('#bbbbbb')
    
    this.stripes.draw(ctx)
  }

  update() {
    this.stripes.update()
  }
}

class Stripes {
  constructor(vel) {
    this.spacing = 128
    this.pos = new Vector(this.spacing, 201)
    this.vel = vel
  }

  setVel(vel) {
    this.vel = vel
  }

  draw(ctx) {
    for (let i = 0; i < Math.ceil(ctx.width / this.spacing); i++) {
      ctx.rect(i * this.spacing + this.pos.x, this.pos.y, 30, 10).fill('white')
    }
  }

  update() {
    this.pos.add(this.vel)
    if (this.pos.x < 0) this.pos.x = 128 - this.pos.x
  }
}