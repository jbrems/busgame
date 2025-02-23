import { Particle } from "./Particle.js";
import { randomColor } from "./random.js";
import { v } from "./utils.js";

export class Car extends Particle {
  destroyed = false
  
  constructor(speed) {
    super()
    this.speed = speed
    this.setPos(v(1000, 165)).setVel(v(-speed, 0))
    this.setWidth(80).setHeight(20)
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.moveTo(this.pos.x, this.pos.y)
    ctx.lineTo(this.pos.x, this.pos.y + this.height)
    ctx.lineTo(this.pos.x + this.width, this.pos.y + this.height)
    ctx.lineTo(this.pos.x + this.width, this.pos.y )
    ctx.lineTo(this.pos.x + this.width - 16, this.pos.y)
    ctx.lineTo(this.pos.x + this.width - 26, this.pos.y - 16)
    ctx.lineTo(this.pos.x + 26, this.pos.y - 16)
    ctx.lineTo(this.pos.x + 16, this.pos.y)
    ctx.closePath().fill(this.color)

    ctx.beginPath()
    ctx.moveTo(this.pos.x + 22, this.pos.y)
    ctx.lineTo(this.pos.x + 38, this.pos.y)
    ctx.lineTo(this.pos.x + 38, this.pos.y - 13)
    ctx.lineTo(this.pos.x + 28, this.pos.y - 13)
    ctx.closePath().fill('lightblue')

    ctx.beginPath()
    ctx.moveTo(this.pos.x + this.width - 22, this.pos.y)
    ctx.lineTo(this.pos.x + this.width - 38, this.pos.y)
    ctx.lineTo(this.pos.x + this.width - 38, this.pos.y - 13)
    ctx.lineTo(this.pos.x + this.width - 28, this.pos.y - 13)
    ctx.closePath().fill('lightblue')


    ctx.circle(this.pos.x + 16, this.pos.y + this.height, 8).fill('black')
    ctx.circle(this.pos.x + 64, this.pos.y + this.height, 8).fill('black')

    // this.drawDebug(ctx)
  }

  update() {
    this.pos.add(this.vel)
    if (this.pos.x < -this.width) {
      this.reset()
    }
  }

  reset() {
    this.pos.x = 1024 + Math.random() * 100
    this.setVel(v(-this.speed - Math.random() * 3, 0))
    this.setColor(randomColor())
    this.destroyed = false
    return this
  }

  destroy() {
    if (this.destroyed) return
    this.destroyed = true
    const originalVel = this.vel.copy()
    const originalColor = this.color
    this.vel = v(0, 0)
    this.setColor('white')
    setTimeout(() => { this.setColor(originalColor) }, 100)
    setTimeout(() => { this.setColor('white') }, 200)
    setTimeout(() => { this.setColor(originalColor) }, 300)
    setTimeout(() => { this.setColor('white') }, 400)
    setTimeout(() => { this.setColor(originalColor) }, 500)
    setTimeout(() => { this.setVel(originalVel).reset() }, 1000)
    return this
  }
}