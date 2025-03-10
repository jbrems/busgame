import { v } from "./utils.js"
import { Particle } from "./Particle.js"
import { randomColor, randomNumber } from "./random.js"

export class HaltePaal extends Particle {
  constructor(speed, onScore = () => {}) {
    super()
    this.setPos(v(1000, 56)).setVel(v(-speed, 0))
    this.setWidth(35).setHeight(100)
    this.waiting = 3
    this.colors = new Array(this.waiting).fill(0).map(() => randomColor())
    this.score = onScore
  }

  setSpeed(speed) {
    this.setVel(v(-speed, 0))
  }

  reset() {
    this.pos.x = 5000
    this.waiting = Math.floor(randomNumber(0, 10))
    this.colors = new Array(this.waiting).fill(0).map(() => randomColor())
  }

  draw(ctx) {
    ctx.rect(this.pos.x, this.pos.y + 3, 35, 35, 5).fill('white').stroke('grey')
    ctx.circle(this.pos.x + 5, this.pos.y + 5, 5).fill('gold').stroke('grey')
    ctx.rect(this.pos.x, this.pos.y + 5, 10, this.height).fill('gold').stroke('grey')

    for (let i = 0; i < this.waiting; i++) {
      ctx.circle(this.pos.x + 30 + i * 30, this.pos.y + 65, 8).fill('pink').stroke('grey')
      ctx.rect(this.pos.x + 20 + i * 30, this.pos.y + 75, 20, 20, 5).fill(this.colors[i]).stroke('grey')
    }
  }

  update() {
    super.update()

    if (this.pos.x < 100) {
      this.score(this.waiting)
      this.waiting = 0
    }
    if (this.pos.x < -500) this.reset()
  }
}