let back

let ball
let ball2
let mousePos

// let position = new Vector(50, 50, 50)

function setup() {
  // frameRate(10)
  createCanvas(window.innerWidth, window.innerHeight)
  background("black")
  // background("#394034")
  ////

  Motion.gravity = new Vector(0, 0.2)

  ball = new Ball({
    position: new Vector(50, 50),
    velocity: new Vector(0, 0),
    acceleration: new Vector(0.0, 0.0),
    mass: 10,
    momentum: new Vector(0, 0, 0),
  })
  ball2 = new Ball({
    position: new Vector(200, 50),
    velocity: new Vector(0, 0),
    acceleration: new Vector(0.0, 0.0),
    mass: 2,
    momentum: new Vector(0, 0, 0),
  })
}

let acceleration

function draw() {
  background("black")
  // mousePos = new Vector(mouseX, mouseY)

  // ball.move()
  // acceleration = mousePos.subtract(this.position)
  // this.acceleration = this.acceleration.multiply(0.001)

  // gravity setted by Motion.gravity:
  ball.applyGravity()
  ball2.applyGravity()

  //gravity by passing a specific value:
  // let gravity = new Vector(0, 0.5)
  // ball.applyGravity(gravity)
  // ball2.applyGravity(gravity)

  // ball.applyForce(new Vector(0, 0.1))
  // ball2.applyForce(new Vector(0, 0.1))

  if (mouseIsPressed) {
    let wind = new Vector(0.1, 0)

    ball.applyForce(wind)
    ball2.applyForce(wind)
  }

  ball.updatePosition(mousePos)
  ball2.updatePosition(mousePos)
  // ball.bounce()
  // ball2.bounce()
  ball.draw()
  ball2.draw()
  console.log(ball.velocity)
}

class Motion {
  static gravity = new Vector(0, 9.8, 0)
  constructor({ position, velocity = 0, fnet = new Vector(), mass = 0, momentum = new Vector() }) {
    this.position = position
    this.velocity = velocity
    // this.acceleration = acceleration
    this.mass = mass
    this.momentum = momentum
    this.fnet = fnet
  }

  applyGravity(grav) {
    // Fg is approx mg near the earth
    if (grav) {
      this.applyForce(grav.multiply(this.mass))
    } else {
      this.applyForce(Motion.gravity.multiply(this.mass))
    }
  }

  applyForce(force) {
    this.fnet = this.fnet.add(force)

    // this.momentum = this.momentum.add(this.fnet)
    // // considering mass
    // let f = force.divide(force, this.mass)
    // this.acceleration = this.acceleration.add(f)
    // // this.acceleration = this.acceleration.add(force)
  }

  updatePosition() {
    // update momentum:
    this.momentum = this.momentum.add(this.fnet)
    // get velocity:
    this.velocity = this.momentum.divide(this.mass)
    // update position:
    this.position = this.position.add(this.velocity)
    //reset fnet:
    this.fnet = new Vector(0, 0, 0)
  }
}

class Ball extends Motion {
  constructor({ position, velocity, acceleration, mass }) {
    super({ position, velocity, acceleration, mass })
    this.rad = mass * 8
  }

  draw() {
    fill("orange")
    stroke("black")
    ellipse(this.position.x, this.position.y, this.rad, this.rad)
    // ellipse(this.motion.position.x, this.motion.position.y, this.rad, this.rad)
  }

  bounce() {
    if (this.position.x > width - this.rad) {
      this.position.x = width - this.rad
      this.velocity.x *= -1
    } else if (this.position.x < this.rad) {
      this.position.x = this.rad
      this.velocity.x *= -1
    }
    if (this.position.y > height - this.rad) {
      this.position.y = height - this.rad
      this.velocity.y *= -1
    }
  }

  // move() {
  //   this.velocity = this.velocity.add(this.acceleration)
  //   this.position = this.position.add(this.velocity)
  // }

  // updatePosition(mousePos) {
  //   // const mousePos = new Vector(mx, my)
  //   this.acceleration = mousePos.subtract(this.position)
  //   this.acceleration = this.acceleration.multiply(0.001)
  //   // this.acceleration.multiply2(0.001)
  //   // this.acceleration = this.position.subtract(mousePos)
  //   this.velocity = this.velocity.add(this.acceleration)
  //   this.position = this.position.add(this.velocity)
  // }
}
