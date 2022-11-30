let back = true
let circlePopulation

function setup() {
  createCanvas(window.innerWidth, window.innerHeight)
  background('#394034')

  // create poopulation
  // let population = new Population({ size: 5 })
  circlePopulation = new Population({ size: 50 })
  console.log(circlePopulation)
  // noLoop()
}

function draw() {
  // express population
  // circlePopulation.expression()
  circlePopulation.move()
  circlePopulation.draw()
}

class Organism {
  constructor() {
    this.genome = this.generateGenome()
    this.pos = createVector(0, 0)
  }

  generateGenome() {
    return {
      rad: random(0, 100),
      color: color(random(255), random(255), random(255)),
    }
  }

  expression() {
    // noStroke()
    // fill(this.genome.color)
    // ellipse(this.posx, this.posy, this.genome.rad)
  }

  move() {
    const speed = createVector(100 - this.genome.rad, 100 - this.genome.rad)
    // const direction =
    this.pos = p5.Vector.add(this.pos, speed)
  }

  draw() {
    noStroke()
    fill(this.genome.color)
    ellipse(this.pos.x, this.pos.y, this.genome.rad)
  }
}

class Population {
  constructor({ size }) {
    this.population = []
    this.generatePopulation(size)
  }

  privategeneratePopulation(size) {
    for (let i = 0; i < size; i++) {
      this.population[i] = new Organism()
    }
  }

  expression() {
    this.population.map((organism) => {
      organism.expression()
    })
  }

  draw() {
    this.population.map((organism) => {
      organism.draw()
    })
  }

  move() {
    this.population.map((organism) => {
      organism.move()
    })
  }
}
