export class ContextHelper {
  constructor(context, width, height) {
    this.ctx = context
    this.width = width
    this.height = height
  }

  save() {
    this.ctx.save()
    return this
  }

  restore() {
    this.ctx.restore()
    return this
  }

  translate(x, y) {
    this.ctx.translate(x, y)
    return this
  }

  beginPath() {
    this.ctx.beginPath()
    return this
  }

  closePath() {
    this.ctx.closePath()
    return this
  }

  moveTo(x, y) {
    this.ctx.moveTo(x, y)
    return this
  }

  lineTo(x, y) {
    this.ctx.lineTo(x, y)
    return this
  }

  arc(x, y, radius, startAngle, endAngle, counterClockwise = false) {
    this.ctx.beginPath()
    this.ctx.arc(x, y, radius, startAngle, endAngle, counterClockwise)
    return this
  }

  fillStyle(fillStyle) {
    this.ctx.fillStyle = fillStyle
    return this
  }

  fill(fillStyle) {
    if (fillStyle) this.fillStyle(fillStyle)
    this.ctx.fill()
    return this
  }

  strokeStyle(strokeStyle) {
    this.ctx.strokeStyle = strokeStyle
    return this
  }


  stroke(strokeStyle) {
    if (strokeStyle) this.strokeStyle(strokeStyle)
    this.ctx.stroke()
    return this
  }

  rect(x, y, width, height) {
    this.beginPath()
      .moveTo(x, y)
      .lineTo(x + width, y)
      .lineTo(x + width, y + height)
      .lineTo(x, y + height)
      .lineTo(x, y)
    return this
  }

  circle(x, y, radius) {
    this.arc(x, y, radius, 0, Math.PI * 2)
    return this
  }

  lineWidth(lineWidth) {
    this.ctx.lineWidth = lineWidth
    return this
  }

  line(x1, y1, x2, y2) {
    this.beginPath()
      .moveTo(x1, y1)
      .lineTo(x2, y2)
    return this
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    return this
  }

  reset() {
    this.ctx.reset()
    return this
  }
}