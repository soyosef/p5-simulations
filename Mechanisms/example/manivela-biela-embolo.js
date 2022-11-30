let back

// let ball
// let ball2
// let mousePos

// let position = new Vector(50, 50, 50)

let mecanismo

function setup() {
  // frameRate(10)
  createCanvas(window.innerWidth, window.innerHeight)
  background("black")
  // background("#394034")

  let manivela = {
    inicio: createVector(0, 0),
    fin: createVector(50, 0),
    color: color("orange"),
  }

  let biela = {
    inicio: createVector(50, 0),
    fin: createVector(100, 0),
    color: color("magenta"),
  }

  let embolo = {
    inicio: createVector(100, 0),
    fin: createVector(150, 0),
    color: color("white"),
  }

  let p1 = {
    inicio: createVector(0, 0),
    fin: createVector(50, 0),
    color: color("orange"),
  }

  let p2 = {
    inicio: createVector(50, 0),
    fin: createVector(100, 0),
    color: color("magenta"),
  }

  let p3 = {
    inicio: createVector(100, 0),
    fin: createVector(150, 0),
    color: color("white"),
  }

  mecanismo = new Mechanism([manivela, biela, embolo])
  // mecanismo = new Mechanism([manivela, biela, embolo])
}

let acceleration

function draw() {
  background("black")
  translate(100, 100)

  // mecanismo.drawBoundingBox()
  Mechanism.drawEslabones()
}

class Mechanism {
  constructor(eslabones) {
    this.eslabones = eslabones
  }

  static drawEslabones() {
    this.eslabones.map((eslabon) => {
      console.log(eslabon)
      push()
      noFill()
      stroke(eslabon.color)
      // line(eslabon.inicio.x, eslabon.fin.x, eslabon.inicio.y, eslabon.fin.y)
      // line(0, 0, 0, 50)
      line(eslabon.inicio.x, eslabon.inicio.y, eslabon.fin.x, eslabon.fin.y)
      pop()
    })
  }

  drawBoundingBox() {
    push()
    noFill()
    stroke(255, 204, 0)
    rect(50, 50, 50, 50)
    pop()
  }
}

// class Eslabon {
//   constructor({ pos, width, height }) {
//     this.polos = []
//   }

//   draw() {}
// }

class Polo {
  constructor() {
    this.pos = createVector()
  }
}

class Motion {
  static gravity = new Vector(0, 0.1)
  constructor({ position, velocity = 0, acceleration = 0, mass = 0 }) {
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
