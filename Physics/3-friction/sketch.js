let ball
let coefficentOfFriction = 0.01
// let mmf = 0.001
let frictionCircle = []
let frictionCircle2 = []

function setup() {
  createCanvas(window.innerWidth, window.innerHeight)
  background("black")
  angleMode(DEGREES)
  ellipseMode(CENTER)
  ////

  circle = new Circle({
    position: createVector(150, 150),
    // velocity: new Vector(0, 0),
    // acceleration: new Vector(0.0, 0.0),
    mass: 5,
  })

  for (let i = 0; i < 10; i++) {
    frictionCircle[i] = new Circle({
      position: createVector(random(0, width), random(0, height)),
      mass: random(1, 30),
    })
  }

  for (let i = 0; i < 10; i++) {
    frictionCircle2[i] = new Circle({
      position: createVector(random(0, width), random(0, height)),
      mass: random(1, 20),
    })
  }
}

function draw() {
  background("black")
  fill("orange")

  frictionCircle.map((fc) => {
    push()
    fill("coral")
    fc.draw()
    pop()
    if (dist(circle.position.x, circle.position.y, fc.position.x, fc.position.y) < circle.rad / 2 + fc.rad / 2) {
      fill("lightgreen")
      circle.applyFriction({ kmu: 0.005 })
    }
  })

  frictionCircle2.map((fc) => {
    push()
    fill("blue")
    fc.draw()
    pop()
    console.log(circle.rad)
    if (dist(circle.position.x, circle.position.y, fc.position.x, fc.position.y) < circle.rad / 2 + fc.rad / 2) {
      fill("green")
      circle.applyFriction({ kmu: 0.5 })
    }
  })

  if (keyIsDown(LEFT_ARROW)) {
    circle.applyForce(createVector(-1, 0))
  }

  if (keyIsDown(RIGHT_ARROW)) {
    circle.applyForce(createVector(1, 0))
  }

  if (keyIsDown(UP_ARROW)) {
    circle.applyForce(createVector(0, -1))
    // console.log(upDir)
  }

  if (keyIsDown(DOWN_ARROW)) {
    circle.applyForce(createVector(0, 1))
  }

  circle.updatePosition()
  // circle.bounce()
  push()
  // fill("orange")
  circle.draw()
  pop()
  strokeWeight(3)
  stroke("white")
}

class Motion {
  // static gravity = createVector(0, 0.1)
  constructor({ position, velocity = createVector(0, 0, 0), acceleration = createVector(0, 0, 0), mass = 0, smu = 0, kmu = 0 }) {
    this.position = position
    this.velocity = velocity
    this.acceleration = acceleration
    this.mass = mass
    this.smu = smu // μs (coefficient of static friction)
    this.kmu = kmu // μk (coefficient of kinetic friction)
  }

  applyGravity({ grav }) {
    // gravity can be modeled not affected by mass
    if (grav) {
      this.acceleration = this.acceleration.add(grav)
    } else {
      this.acceleration = this.acceleration.add(Motion.gravity)
    }
  }

  applyFriction({ smu, kmu }) {
    // let f = this.velocity.mult(-1)
    this.applyForce(this.velocity.mult(-1).mult(kmu))
  }

  applyForce(force) {
    // considering mass
    // console.log(`force, ${force}, this.mass ${this.mass}`)
    let f = force.div(force, this.mass)
    // console.log(typeof this.mass)
    // let f = createVector(force.x / this.mass, force.y / this.mass, force.z / this.mass)
    this.acceleration = this.acceleration.add(f)
    // this.acceleration = this.acceleration.add(force)
  }

  updatePosition() {
    this.velocity = this.velocity.add(this.acceleration)
    this.position = this.position.add(this.velocity)
    this.acceleration = createVector(0, 0, 0)
  }
}

class Circle extends Motion {
  constructor({ position, velocity, acceleration, mass }) {
    super({ position, velocity, acceleration, mass })
    this.rad = mass * 8
  }

  draw() {
    // fill("orange")
    stroke("black")

    ellipse(this.position.x, this.position.y, this.rad, this.rad)
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
}
