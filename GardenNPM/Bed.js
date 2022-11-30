import p5 from '../p5'

export class Bed {
  constructor({ pos, size, col = p5.color(p5.random(255), p5.random(100, 200), p5.random(100)) }) {
    this.pos = pos
    this.size = size
    this.col = col
  }

  display() {
    push()
    ambientMaterial(this.col)

    // change pos ref from CENTER to CORNER:
    translate(p5.Vector.div(this.size, 2))

    // change to given position:
    translate(this.pos)

    box(this.size.x, this.size.y, this.size.z)
    pop()
  }

  intersects2d(other) {
    const rectOneLeft = this.x
    const rectOneRight = this.x + this.w
    const rectOneTop = this.y
    const rectOneBottom = this.y + this.h

    const rectTwoLeft = other.x
    const rectTwoRight = other.x + other.w
    const rectTwoTop = other.y
    const rectTwoBottom = other.y + other.h

    //evaluates to true if rectOne and rectTwo are colliding
    return rectOneRight > rectTwoLeft && rectOneLeft < rectTwoRight && rectOneBottom > rectTwoTop && rectOneTop < rectTwoBottom
  }

  intersects3d(other) {
    return (
      this.pos.x <= other.pos.x + other.size.x &&
      other.pos.x + other.size.x >= other.pos.x &&
      this.pos.y <= other.pos.y + other.size.y &&
      this.pos.y + this.size.y >= other.pos.y &&
      this.pos.z <= other.pos.z + other.size.z &&
      this.pos.z + this.size.z >= other.pos.z
    )
  }
}
