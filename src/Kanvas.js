import { ContextHelper } from './ContextHelper.js'
import { Vector } from './Vector.js'

export class Kanvas {
  updateHandlers = []
  drawHandlers = []

  constructor(canvasElement) {
    this.canvasElement = canvasElement || document.getElementById('kanvas') || document.getElementsByTagName('canvas')[0]
    this.width = this.canvasElement.width
    this.height = this.canvasElement.height
    this.updateCount = 0
    this.drawCount = 0

    this.mouse = this.center.copy()
    this.canvasElement.addEventListener('mousemove', (event) => { this.mouse = new Vector(event.offsetX, event.offsetY) })

    setInterval(this.update.bind(this), 1000/60)
    requestAnimationFrame(this.draw.bind(this))
  }

  inferSize() {
    this.width = this.canvasElement.getBoundingClientRect().width
    this.height = this.canvasElement.getBoundingClientRect().height
    this.canvasElement.width = this.width
    this.canvasElement.height = this.height
    return this
  }

  get ctx() {
    if (!this.context) this.context = new ContextHelper(this.canvasElement.getContext('2d'), this.width, this.height)
    return this.context
  }

  get center() {
    return new Vector(this.width / 2, this.height / 2)
  }

  get edges() {
    return [
      { x: -100, y: -100, width: this.width + 200, height: 100 }, // top
      { x: this.width, y: -100, width: 100, height: this.height + 200 }, // right
      { x: -100, y: this.height, width: this.width + 200, height: 100 }, // bottom
      { x: -100, y: -100, width: 100, height: this.height + 200 }, // left
    ]
  }

  addUpdateHandler(updateHandler) {
    this.updateHandlers.push(updateHandler)
  }

  addDrawHandler(drawHandler) {
    this.drawHandlers.push(drawHandler)
  }

  update() {
    this.updateHandlers.forEach(updateHandler => updateHandler(this.updateCount))
    this.updateCount++
  }

  draw() {
    this.drawHandlers.forEach(drawHandler => drawHandler(this.ctx, this.drawCount))
    this.drawCount++

    requestAnimationFrame(this.draw.bind(this))
  }
}