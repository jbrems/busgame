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

  arcTo(x1, y1, x2, y2, r) {
    this.ctx.arcTo(x1, y1, x2, y2, r)
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

  rect(x, y, width, height, radius = 0) {
    this.beginPath()
      .moveTo(x + radius, y)
      .lineTo(x + width - radius, y)
      .arcTo(x + width, y, x + width, y + radius, radius)
      .lineTo(x + width, y + height - radius)
      .arcTo(x + width, y + height, x + width - radius, y + height, radius)
      .lineTo(x + radius, y + height)
      .arcTo(x, y + height, x, y + height - radius, radius)
      .lineTo(x, y + radius)
      .arcTo(x, y, x + radius, y, radius)
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

  font(font) {
    this.ctx.font = font
    return this
  }

  text(text, x, y) {
    const ctxHelper = this
    return {
      ...ctxHelper,
      fill: (font, fillStyle) => {
        if (font) this.font(font)
        if (fillStyle) this.fillStyle(fillStyle)
        this.ctx.fillText(text, x, y)
        return ctxHelper
      },
      stroke: (font, strokeStyle) => {
        if (font) this.font(font)
        if (strokeStyle) this.strokeStyle(strokeStyle)
        this.ctx.strokeText(text, x, y)
        return ctxHelper
      },
    }
  }
}