import { Particle } from "./Particle.js";
import { randomColor, randomNumber } from "./random.js";
import { v } from "./utils.js";

export class Car extends Particle {
  destroyed = false
  
  constructor(speed) {
    super()
    this.speed = speed
    this.setPos(v(1000, 165)).setVel(v(-speed, 0))
    this.setWidth(randomNumber(80, 160)).setHeight(20)
  }

  draw(ctx) {
    const wheelOffset = this.width / 4.5

    ctx.beginPath()
    ctx.moveTo(this.pos.x, this.pos.y) // body top left
    ctx.lineTo(this.pos.x, this.pos.y + this.height) // bottom left
    ctx.lineTo(this.pos.x + this.width, this.pos.y + this.height) // bottom right
    ctx.lineTo(this.pos.x + this.width, this.pos.y ) // body top right
    ctx.lineTo(this.pos.x + this.width - wheelOffset + 10, this.pos.y)
    ctx.lineTo(this.pos.x + this.width - wheelOffset, this.pos.y - 16)
    ctx.lineTo(this.pos.x + wheelOffset, this.pos.y - 16)
    ctx.lineTo(this.pos.x + wheelOffset - 10, this.pos.y)
    ctx.closePath().fill(this.color)

    ctx.beginPath()
    ctx.moveTo(this.pos.x + wheelOffset, this.pos.y)
    ctx.lineTo(this.pos.x + this.width / 2 - 5, this.pos.y)
    ctx.lineTo(this.pos.x + this.width / 2 - 5, this.pos.y - 10)
    ctx.lineTo(this.pos.x + wheelOffset + 6, this.pos.y - 10)
    ctx.closePath().fill('white')

    ctx.beginPath()
    ctx.moveTo(this.pos.x + this.width - wheelOffset, this.pos.y)
    ctx.lineTo(this.pos.x + this.width / 2 + 5, this.pos.y)
    ctx.lineTo(this.pos.x + this.width / 2 + 5, this.pos.y - 10)
    ctx.lineTo(this.pos.x + this.width - wheelOffset - 6, this.pos.y - 10)
    ctx.closePath().fill('white')


    ctx.circle(this.pos.x + wheelOffset, this.pos.y + this.height, 8).fill('black')
    ctx.circle(this.pos.x + this.width - wheelOffset, this.pos.y + this.height, 8).fill('black')

    // this.drawDebug(ctx)
  }

  update() {
    this.pos.add(this.vel)
    if (this.pos.x < -this.width) {
      this.reset()
    }
  }

  reset() {
    this.pos.x = randomNumber(1024, 2048)
    this.setVel(v(-this.speed - randomNumber(0, 5), 0))
    this.setColor(randomColor()).setWidth(randomNumber(80, 160))
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