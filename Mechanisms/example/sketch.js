let rect1, rect2, hinge
function setup() {
  // frameRate(10)
  createCanvas(window.innerWidth, window.innerHeight)
  background("black")
  // rect1 = {
  //   pos: {
  //     x: 50,
  //     y: 60,
  //   },
  //   orientation: 25,
  //   h: 20,
  //   w: 100,
  // }

  // rect2 = {
  //   pos: {
  //     x: 120,
  //     y: 50,
  //   },
  //   orientation: 0,
  //   h: 50,
  //   w: 100,
  // }

  // hinge = {
  //   pos: {
  //     x: 135,
  //     y: 70,
  //   },
  // }
  rect3 = new Rectangle({
    pos: new Vector(50, 50),
    orientation: 0,
    size: new Vector(100, 50),
    color: color("green"),
    mass: 50,
  })
  rect3.addHinge({ pos: new Vector(80, 25) })

  rect4 = new Rectangle({
    pos: new Vector(100, 50),
    orientation: 0,
    size: new Vector(100, 50),
    color: color("coral"),
  })
}

let acceleration
let mappedMouseX
let constrainedMouseX

function draw() {
  background("black")
  angleMode(DEGREES)

  mappedMouseX = map(mouseX, 0, width, 0, 360, false)
  constrainedMouseX = constrain(mappedMouseX, 90, 260)

  // console.log(constrainedMouseX)

  // fill("coral")
  // push()
  // translate(hinge.pos.x, hinge.pos.y)
  // rotate(constrainedMouseX)
  // translate(-hinge.pos.x, -hinge.pos.y)
  // rect(rect2.pos.x, rect2.pos.y, rect2.w, rect2.h)
  // pop()

  rect3.applyGravity(new Vector(0, 0.01))
  rect3.updatePosition()

  rect3.draw()
  // rect4.draw()
  // rect3.addHinge({ pos: createVector(10, 50) })
  rect3.drawHinges()

  // checkHinge(hinge, rect1, rect2)
}

class Motion {
  static gravity = new Vector(0, 0.1)
  constructor({ position, velocity = new Vector(0, 0, 0), acceleration = new Vector(0, 0, 0), mass = 0 }) {
    this.position = position
    this.velocity = velocity
    this.acceleration = acceleration
    this.mass = mass
  }

  applyGravity(grav) {
    // gravity can be modeled not affected by mass
    if (grav) {
      this.acceleration = this.acceleration.add(grav)
    } else {
      this.acceleration = this.acceleration.add(Motion.gravity)
    }
  }

  applyForce(force) {
    // considering mass
    let f = force.divide(force, this.mass)
    this.acceleration = this.acceleration.add(f)
    // this.acceleration = this.acceleration.add(force)
  }

  updatePosition() {
    this.velocity = this.velocity.add(this.acceleration)
    this.position = this.position.add(this.velocity)
    this.acceleration = new Vector(0, 0, 0)
  }
}

class Rectangle extends Motion {
  constructor({ pos, orientation, size, color, velocity, acceleration, mass }) {
    super({
      position: pos,
      velocity,
      acceleration,
      mass,
    })
    // this.pos = pos
    this.orientation = orientation
    this.size = size
    this.color = color
    this.hinges = []
  }

  addHinge({ pos }) {
    if (pos.x <= this.size.x && pos.y <= this.size.y && pos.x >= 0 && pos.y >= 0) {
      this.hinges.push(new Hinge({ pos }))
    } else {
      throw new Error("Hinge needs to be inside of rectangle")
    }
  }

  drawHinges() {
    push()
    translate(this.position.x, this.position.y) // translate to the position of rect
    rotate(this.orientation) // rotate to orientation of rect
    fill("red")
    this.hinges.map((hinge) => {
      ellipse(hinge.position.x, hinge.position.y, 5)
    })
    pop()
  }

  draw() {
    push()
    fill(this.color)
    translate(this.position.x, this.position.y)
    rotate(this.orientation)
    rect(0, 0, this.size.x, this.size.y)
    pop()
  }
}

class Hinge {
  constructor({ pos }) {
    this.position = pos
  }
}

// class Ball extends Motion {
//   constructor({ position, velocity, acceleration, mass }) {
//     super({ position, velocity, acceleration, mass })
//     this.rad = mass * 8
//   }

//   draw() {
//     fill("orange")
//     stroke("black")
//     ellipse(this.position.x, this.position.y, this.rad, this.rad)
//     // ellipse(this.motion.position.x, this.motion.position.y, this.rad, this.rad)
//   }

//   bounce() {
//     if (this.position.x > width - this.rad) {
//       this.position.x = width - this.rad
//       this.velocity.x *= -1
//     } else if (this.position.x < this.rad) {
//       this.position.x = this.rad
//       this.velocity.x *= -1
//     }
//     if (this.position.y > height - this.rad) {
//       this.position.y = height - this.rad
//       this.velocity.y *= -1
//     }
//   }
// }

// function moveWithMouse(){
//   if(dist(rect1.pos.x - rect1.width/2, rect1.pos.y, mouseX, mouseY) < ){

//   }
// }

// body: a physical body affected by forces and contact with other bodies
//  static or movable

// constraint: physical connection that removes degrees of freedom from bodies.
//  contact constraint: special constraint designed to prevent penetration of rigid bodies and to simulate friction and restitution.

// joint: constraint between bodies
//  joint limit: restricts the range of motion of a joint
//  joint motor:  drives the motion of the joint
//  brakable joint?

// fixed joint (dependent upon another object)
// hinge joint
// spring joint
// slider joint?
