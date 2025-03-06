import { Kanvas } from './Kanvas.js'
import { Road } from './Road.js'
import { Bus } from './Bus.js'
import { Car } from './Car.js'
import { v } from './utils.js'

export class BusGame {
  score = 0
  speed = 10

  constructor() {
    this.kanvas = new Kanvas()
    this.kanvas.inferSize()
    this.kanvas.addDrawHandler(this.draw.bind(this))
    this.kanvas.addUpdateHandler(this.update.bind(this))
    
    this.road = new Road(this.speed)
    this.bus = new Bus()
    this.cars = new Array(1).fill(0).map((_, i) => new Car(this.speed - 8).setPos(v(1000, 220)))
    this.opposingCars = new Array(1).fill(0).map((_, i) => new Car(this.speed + 4, this.onScore.bind(this), this.onCrash.bind(this)))

    this.scoreSound = new Audio('/assets/score.wav')
    this.crashSound = new Audio('/assets/crash.wav')
  }

  onScore() {
    this.score += 100
    this.scoreSound.play()
  }

  onCrash() {
    this.score -= 1000
    this.crashSound.play()
  }

  draw(ctx) {
    ctx.clear()
    
    ctx.rect(0, 0, ctx.width, ctx.height).fill('green')
    ctx.rect(0, 0, ctx.width, 100).fill('lightblue')

    this.road.draw(ctx)
    this.opposingCars.forEach(c => c.draw(ctx))
    this.bus.draw(ctx)
    this.cars.forEach(c => c.draw(ctx))

    ctx.text(this.score.toString().padStart(6, ' '), ctx.width - 200, 50).fill('50px monospace', 'gold')
  }

  update() {
    this.speed += 0.001
    this.road.setSpeed(this.speed)
    this.cars.forEach(c => c.increaseSpeed(0.001))
    this.opposingCars.forEach(c => c.increaseSpeed(0.001))

    this.road.update()
    this.bus.update()
    this.cars.forEach(c => c.update())
    this.opposingCars.forEach(c => c.update())

    this.opposingCars.forEach(c => {
      if (c.detectSimpleCollision(this.bus.boundingBox)) {
        c.destroy()
      }
    })
  }
}