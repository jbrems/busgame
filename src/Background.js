import { Particle } from "./Particle.js";
import { v } from "./utils.js";

export class Background extends Particle {
  constructor() {
    super()
    this.image = new Image()
    this.image.src = '/assets/bg.png'
    this.setPos(v(0, 0)).setVel(v(0.1, 0))
  }

  draw(ctx) {
    ctx.rect(0, 0, ctx.width, ctx.height).fill('#34bf24')
    ctx.rect(0, 0, ctx.width, 100).fill('#72e8f3')
  }

}