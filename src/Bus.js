import { Particle } from './Particle.js'
import { v } from "./utils.js";

export class Bus extends Particle {
  constructor() {
    super()
    this.setPos(v(-150, 130)).setVel(v(2, 0)).setAcc(v(-0.01, 0.2))
    this.setWidth(180).setHeight(60)
  }

  draw(ctx) {
    ctx.rect(this.pos.x, this.pos.y, this.width, this.height).fill('white')

    ctx.beginPath()
    ctx.moveTo(this.pos.x + 80, this.pos.y + this.height)
    ctx.lineTo(this.pos.x + 90, this.pos.y + 30)
    ctx.lineTo(this.pos.x + 120, this.pos.y + 30)
    ctx.lineTo(this.pos.x + 110, this.pos.y + this.height)
    ctx.closePath().fill('yellow')
    
    ctx.rect(this.pos.x + 5, this.pos.y + 5, 40, 30).fill('lightblue')
    ctx.rect(this.pos.x + 50, this.pos.y + 5, 25, 50).fill('lightblue')
    ctx.rect(this.pos.x + 80, this.pos.y + 5, 30, 30).fill('lightblue')
    ctx.rect(this.pos.x + 115, this.pos.y + 5, 30, 30).fill('lightblue')
    ctx.rect(this.pos.x + 150, this.pos.y + 5, 25, 50).fill('lightblue')
    
    ctx.circle(this.pos.x + 35, this.pos.y + 60, 10).fill('black')
    ctx.circle(this.pos.x + 135, this.pos.y + 60, 10).fill('black')

    // this.drawDebug(ctx)
  }

  update() {
    this.vel.add(this.acc)
    this.pos.add(this.vel)

    if (this.vel.x < 0) {
      this.vel.x = 0
      this.acc.x = 0
    }

    if (this.pos.y > 130) {
      this.pos.y = 130
      this.vel.y = 0
    }
  }

  jump() {
    if (this.vel.y !== 0) return
    this.applyForce(v(0, -6))
  }
}