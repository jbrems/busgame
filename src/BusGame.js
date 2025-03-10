import { Kanvas } from './Kanvas.js'
import { Road } from './Road.js'
import { Bus } from './Bus.js'
import { Car } from './Car.js'
import { v } from './utils.js'
import { HaltePaal } from './HaltePaal.js'

export class BusGame {
  score = 0
  speed = 10

  constructor() {
    this.kanvas = new Kanvas()
    this.kanvas.inferSize()
    this.kanvas.addDrawHandler(this.draw.bind(this))
    this.kanvas.addUpdateHandler(this.update.bind(this))
    
    this.road = new Road(this.speed)
    this.haltePaal = new HaltePaal(this.speed, this.onScore.bind(this))
    this.bus = new Bus()
    this.cars = new Array(5).fill(0).map((_, i) => new Car(this.speed - 8).setPos(v(1000 + i * 151, 220)))
    this.opposingCars = new Array(1).fill(0).map((_, i) => new Car(this.speed + 4, this.onCrash.bind(this)))

    this.jumpSound = new Audio('/assets/jump.wav')
    this.crashSound = new Audio('/assets/crash.wav')
    this.dingSounds = new Array(10).fill(0).map(d => new Audio('/assets/score.wav'))
  }

  onScore(amount) {
    for (let i = 0; i < amount; i++) {
      setTimeout(() => {
        this.score += 100
        this.dingSounds[i].play()
      }, i * 150)
    }
  }

  onCrash() {
    this.score -= 1000
    this.crashSound.play()
  }

  jump() {
    this.jumpSound.play()
    this.bus.jump()
  }

  draw(ctx) {
    ctx.clear()

    this.haltePaal.draw(ctx)
    this.road.draw(ctx)
    this.opposingCars.forEach(c => c.draw(ctx))
    this.bus.draw(ctx)
    this.cars.forEach(c => c.draw(ctx))

    ctx.text(this.score.toString().padStart(6, ' '), ctx.width - 200, 50).fill('50px monospace', 'gold')
  }

  update() {
    this.speed += 0.001
    this.haltePaal.setSpeed(this.speed)
    this.road.setSpeed(this.speed)
    this.cars.forEach(c => c.increaseSpeed(0.001))
    this.opposingCars.forEach(c => c.increaseSpeed(0.001))

    this.haltePaal.update()
    this.road.update()
    this.bus.update()
    this.cars.forEach(c => c.update())
    this.opposingCars.forEach(c => c.update())

    this.opposingCars.forEach(c => {
      if (c.detectSimpleCollision(this.bus.boundingBox)) {
        c.destroy()
      }
    })

    this.cars.forEach((car1, index, others) => {
      const carsToCheck = others.slice(index + 1)
      if (!carsToCheck?.length) return
      carsToCheck.forEach((car2) => {
        if (car1.detectSimpleCollision(car2.safeDistanceBoundingBox)) {
          if (car1.pos.x > car2.pos.x) {
            car1.pause()
            car2.setVel(car1.vel)
          }
          else {
            car2.pause()
            car1.setVel(car2.vel)
          }
        }
      })
    })
  }
}