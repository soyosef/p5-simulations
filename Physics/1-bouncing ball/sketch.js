let back

let ball

// let position = new Vector(50, 50, 50)

function setup() {
  // frameRate(10)
  createCanvas(window.innerWidth, window.innerHeight)
  background("black")
  // background("#394034")
  ////

  ball = new Ball({
    position: new Vector(50, 50, 50),
    velocity: new Vector(2, 2, 2),
    rad: 20,
  })
}

function draw() {
  // background("#394034")
  ball.bounce()
  ball.move()
  ball.draw()
}

// class Physics {
//   constructor({position, velocity, }){
//     this.position
//   }
// }

class Ball {
  constructor({ position, velocity, rad }) {
    this.position = position
    this.velocity = velocity
    this.rad = rad
  }

  move() {
    this.position = this.position.add(this.velocity)
  }

  draw() {
    fill("orange")
    stroke("black")
    ellipse(this.position.x, this.position.y, this.rad, this.rad)
  }

  bounce() {
    if (this.position.x > width || this.position.x < 0) {
      this.velocity.x = this.velocity.x * -1
    }
    if (this.position.y > height || this.position.y < 0) {
      this.velocity.y = this.velocity.y * -1
    }
  }
}
