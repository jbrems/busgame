import { Kanvas } from './Kanvas.js'
import { Road } from './Road.js'
import { Bus } from './Bus.js'
import { Car } from './Car.js'
import { v } from './utils.js'

export class BusGame {

  constructor() {
    this.kanvas = new Kanvas()
    this.kanvas.inferSize()
    this.kanvas.addDrawHandler(this.draw.bind(this))
    this.kanvas.addUpdateHandler(this.update.bind(this))
    
    this.busSpeed = 7

    this.road = new Road(this.busSpeed)
    this.bus = new Bus()
    this.cars = new Array(1).fill(0).map((_, i) => new Car(2).setPos(v(1000, 220)))
    this.opposingCars = new Array(1).fill(0).map((_, i) => new Car(this.busSpeed + 4, true))

  }

  draw(ctx) {
    ctx.clear()

    this.road.draw(ctx)
    this.bus.draw(ctx)
    this.opposingCars.forEach(c => c.draw(ctx))
    this.cars.forEach(c => c.draw(ctx))
  }

  update() {
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