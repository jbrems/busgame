import { Kanvas } from './Kanvas.js'
import { Road } from './Road.js'
import { Bus } from './Bus.js'
import { Car } from './Car.js'
import { v } from './utils.js'
import { HaltePaal } from './HaltePaal.js'

export class BusGame {
  score = 0
  speed = 9
  running = false
  gameOver = false
  ready = false
  dustCatcher = false

  constructor() {
    this.kanvas = new Kanvas()
    this.kanvas.inferSize()
    this.kanvas.addDrawHandler(this.draw.bind(this))
    this.kanvas.addUpdateHandler(this.update.bind(this))
    
    this.road = new Road(this.speed)
    this.haltePaal = new HaltePaal(this.speed, this.onScore.bind(this))
    this.bus = new Bus()
    this.cars = new Array(5).fill(0).map((_, i) => new Car(this.speed - 8).setPos(v(1000 + i * 151, 220)))
    this.opposingCars = new Array(1).fill(0).map((_, i) => new Car(this.speed + 4, this.onScore.bind(this, 1, 10), this.onCrash.bind(this)))

    this.music = new Audio('assets/music.mp3')
    this.jumpSound = new Audio('assets/jump.wav')
    this.crashSound = new Audio('assets/crash.wav')
    this.dingSounds = new Array(10).fill(0).map(d => new Audio('assets/score.wav'))

    this.reset()

    setTimeout(() => { 
      this.ready = true
      this.music.play()
     }, 3000)
  }

  onScore(amount, value = 100) {
    for (let i = 0; i < amount; i++) {
      setTimeout(() => {
        this.score += value
        this.dingSounds[i].play()
      }, i * 150)
    }
  }

  onCrash() {
    this.score -= 1000
    this.crashSound.play()
    if (this.score <= 0) {
      this.gameOver = true
      this.ready = false
      setTimeout(() => { this.running = false }, 1000)
      setTimeout(() => { this.ready = true }, 2500)
    }
  }

  start() {
    if (!this.ready) return
    if (this.gameOver) this.reset()
    this.running = true

    if (navigator.platform.includes('Mac')) {
      this.dustCatcher = true 
      this.score -= 5000
      setTimeout(() => { this.dustCatcher = false }, 2000)
    }
  }

  reset() {
    this.score = 0
    this.gameOver = false
  }

  jump() {
    this.music.play()
    if (!this.running) {
      this.start()
      return
    }
    this.jumpSound.play()
    this.bus.jump()
  }

  draw(ctx) {
    ctx.clear()

    if (this.ready) {
      ctx.rect(10, 10, 70, 30, 5).stroke('grey')
      ctx.text(`space  to ${this.running ? 'jump' : 'start'}`, 22, 30).fill('16px monospace', '#bbbbbb')
    }
    
    ctx.rect(10, 45, 30, 30, 5).stroke('grey')
    ctx.text(`M  to mute`, 20, 65).fill('16px monospace', '#bbbbbb')
    
    if (this.dustCatcher) {
      ctx.text(`-5K dust catcher`, 402, 71).fill('24px monospace', 'goldenrod')
      ctx.text(`-5K dust catcher`, 400, 70).fill('24px monospace', 'gold')
    }

    this.haltePaal.draw(ctx)
    this.road.draw(ctx)
    this.opposingCars.forEach(c => c.draw(ctx))
    this.bus.draw(ctx)
    this.cars.forEach(c => c.draw(ctx))

    ctx.text(this.score.toString().padStart(6, ' '), ctx.width - 197, 52).fill('50px monospace', 'goldenrod')
    ctx.text(this.score.toString().padStart(6, ' '), ctx.width - 200, 50).fill('50px monospace', 'gold')

    if (this.gameOver) {
      ctx.text('Game over', 253, 185).fill('100px monospace', 'goldenrod')
      ctx.text('Game over', 250, 180).fill('100px monospace', 'gold')
    }
  }

  update() {
    this.road.update()
    this.bus.update()
    this.cars.forEach(c => c.update())

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

    if (!this.running) return
    
    this.speed += 0.001
    this.haltePaal.setSpeed(this.speed)
    this.road.setSpeed(this.speed)
    this.cars.forEach(c => c.increaseSpeed(0.001))
    this.opposingCars.forEach(c => c.increaseSpeed(0.001))

    this.haltePaal.update()
    this.opposingCars.forEach(c => c.update())

    this.opposingCars.forEach(c => {
      if (c.detectSimpleCollision(this.bus.boundingBox)) {
        c.destroy()
      }
    })
  }
}