import { Particle } from './Particle.js'
import { v } from "./utils.js";

export class Bus extends Particle {
  crouching = false

  constructor() {
    super()
    this.setPos(v(-150, 130)).setVel(v(2, 0)).setAcc(v(-0.01, 0.2))
    this.setWidth(180).setHeight(60)
  }

  draw(ctx) {
    ctx.save().translate(this.pos.x, this.pos.y)
    if (this.crouching) ctx.translate(0, 5)
    ctx.rect(0, 0, this.width, this.height, 5).fill('white').stroke('grey')

    // De Lijn stripe
    ctx.beginPath()
    ctx.moveTo(80, this.height - 1)
    ctx.lineTo(90, 30)
    ctx.lineTo(120, 30)
    ctx.lineTo(110, this.height - 1)
    ctx.closePath().fill('yellow')
    
    // Windows and doors
    ctx.rect(5, 5, 40, 30).fill('lightblue')
    ctx.rect(50, 5, 25, 50).fill('lightblue')
    ctx.rect(80, 5, 30, 30).fill('lightblue')
    ctx.rect(115, 5, 30, 30).fill('lightblue')
    ctx.rect(150, 5, 25, 50).fill('lightblue')
    
    // Wheels
    if (this.crouching) ctx.translate(0, -5)
    ctx.circle(35, 60, 10).fill('black').lineWidth(2).stroke('white')
    ctx.circle(135, 60, 10).fill('black').lineWidth(2).stroke('white')

    ctx.restore()

    // this.drawDebug(ctx)
  }

  update() {
    super.update()

    if (this.vel.x < 0) {
      this.vel.x = 0.01
      this.acc.x = 0
    }

    if (this.pos.y > 130) {
      this.pos.y = 130
      this.vel.y = 0
    }
  }

  crouch() {
    this.crouching = true
  }

  jump() {
    this.crouching = false
    if (this.vel.y !== 0) return
    this.applyForce(v(0, -6))
  }
}