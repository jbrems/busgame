import { Particle } from "./Particle.js";
import { randomColor, randomNumber } from "./random.js";
import { v } from "./utils.js";

export class Car extends Particle {
  destroyed = false
  
  constructor(speed, onEndReached = () => {}, onCrash = () => {}) {
    super()
    this.speed = speed
    this.setPos(v(1200, 165)).setVel(v(-speed, 0))
    this.setWidth(100).setHeight(20)
    this.onEndReached = onEndReached
    this.onCrash = onCrash
  }

  get safeDistanceBoundingBox() {
    return { ...this.boundingBox, x: this.pos.x - this.width / 2, width: this.width * 2 }
  }

  increaseSpeed(speed) {
    this.speed += speed
    this.vel.x -= speed
  }

  draw(ctx) {
    const wheelOffset = this.width / 4.5

    ctx.save().translate(this.pos.x, this.pos.y)

    // Body
    ctx.beginPath()
    ctx.moveTo(6, 0) // body top left
    ctx.arcTo(0, 0, 0, 6, 6)
    ctx.lineTo(0, this.height) // bottom left
    ctx.lineTo(this.width, this.height) // bottom right
    ctx.lineTo(this.width, 6 ) // body top right
    ctx.arcTo(this.width, 0, this.width - 6, 0, 6)
    ctx.lineTo(this.width - wheelOffset + 10, 0)
    ctx.lineTo(this.width - wheelOffset, -16)
    ctx.lineTo(wheelOffset, -16)
    ctx.lineTo(wheelOffset - 10, 0)
    ctx.closePath().fill(this.color).stroke('white')


    // Left window
    ctx.beginPath()
    ctx.moveTo(wheelOffset, 0)
    ctx.lineTo(this.width / 2 - 5, 0)
    ctx.lineTo(this.width / 2 - 5, -10)
    ctx.lineTo(wheelOffset + 6, -10)
    ctx.closePath().fill('white')

    // Right window
    ctx.beginPath()
    ctx.moveTo(this.width - wheelOffset, 0)
    ctx.lineTo(this.width / 2 + 5, 0)
    ctx.lineTo(this.width / 2 + 5, -10)
    ctx.lineTo(this.width - wheelOffset - 6, -10)
    ctx.closePath().fill('white')

    // Wheels
    ctx.circle(wheelOffset, this.height, 8).fill('black')
    ctx.circle(this.width - wheelOffset, this.height, 8).fill('black')

    ctx.restore()

    // this.drawDebug(ctx)
  }

  update() {
    super.update()

    if (this.pos.x < -this.width) {
      this.onEndReached()
      this.reset()
    }
  }

  pause() {
    this.pos.sub(this.vel)
  }

  reset() {
    this.pos.x = randomNumber(1024, 2048)
    this.setVel(v(-this.speed - randomNumber(0, 5), 0))
    this.setColor(randomColor())
    this.destroyed = false
    return this
  }

  destroy() {
    if (this.destroyed) return
    this.destroyed = true
    const originalColor = this.color
    this.setVel(v(2, 0)).setAcc(v(-0.05, 0)).setColor('white').onCrash()
    setTimeout(() => { this.setColor(originalColor) }, 100)
    setTimeout(() => { this.setColor('white') }, 200)
    setTimeout(() => { this.setColor(originalColor) }, 300)
    setTimeout(() => { this.setColor('white') }, 400)
    setTimeout(() => { this.setColor(originalColor) }, 500)
    setTimeout(() => { this.setVel(-this.speed, 0).reset() }, 1000)
    return this
  }
}