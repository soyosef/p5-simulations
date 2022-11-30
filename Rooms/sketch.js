let beds = []
let world,
  room,
  back = true,
  cam
let ui = {
  mode: "select",
}
let designs
let designNumber = 0
let preferences
let itemInventory

// let inconsolata
// function preload() {
//   inconsolata = loadFont("assets/Inconsolata-VariableFont_wdth,wght.ttf")
// }

function setup() {
  createCanvas(window.innerWidth, window.innerHeight, WEBGL)
  background("#394034")
  scale(1, -1, 1)
  camera(1000, 1000, 1500, 500, -500, 0, 0, 0, -1)

  world = new World({
    boundary: createVector(1000, 1000, 1000),
    gridSize: 50,
  })

  kitchen = new Room({
    vertices: [
      { x: 0, y: 0, z: 0 },
      { x: 500, y: 0, z: 0 },
      { x: 500, y: 250, z: 0 },
      { x: 300, y: 250, z: 0 },
      { x: 300, y: 500, z: 0 },
      { x: 0, y: 500, z: 0 },
      { x: 0, y: 0, z: 0 },
    ],
    height: 500,
  })

  itemInventory = [
    new Item({
      id: "123",
      label: "fridge",
      boundary: createVector(50, 50, 50),
      // location: createVector(50, 50, 0),
    }),
    new Item({
      id: "124",
      label: "oven",
      boundary: createVector(50, 50, 50),
      // location: createVector(100, 100, 0),
    }),
  ]

  preferences = {
    items: ["fridge, oven"],
    constraints: ["countertop height at 140cm", "fridge back sticked to the wall", ""],
  }

  autoDesign({
    room: kitchen,
    options: 1,
    preferences,
  })

  // kitchen.addItem({
  //   designNumber: 0,
  //   item: new Item({
  //     id: "123",
  //     boundary: createVector(50, 50, 50),
  //     location: createVector(50, 50, 0),
  //   }),
  // })

  kitchen.addItem({
    designNumber: 0,
    item: itemInventory.find((item) => item.label === "oven"),
  })

  //
}

function draw() {
  orbitControl(3, 3, 0.2)
  scale(1, -1, 1) // invert y axis:

  world.draw({
    axis: true,
    boundaries: true,
    back: true,
    floor: true,
  })

  kitchen.draw({
    designNumber: designNumber,
    items: true,
    walls: true,
    floor: true,
  })

  // world.drawGrid()
}

function autoDesign({ room, options, preferences }) {
  let autoDesigns = [],
    currentAutoDesign,
    itm

  for (let i = 0; i < options; i++) {
    currentAutoDesign = new Design()

    itm = itemInventory.find((item) => item.label === "oven")
    currentAutoDesign.addItem(itm)

    // generate x random solutions
    //
    // gene expression
    // check constraints (preferences)
    // offspring

    autoDesigns.push(currentAutoDesign)
  }

  room.designs = autoDesigns

  console.log(itemInventory)

  // return autoDesigns
}

/// CLASSES:

class Item {
  constructor({ id, label, boundary, location = createVector(0, 0, 0) }) {
    this.id = id
    this.label = label
    this.boundary = boundary
    this.location = location
  }

  draw() {
    push()
    stroke("grey")
    fill("lightcoral")
    strokeWeight(1)
    // noFill()
    // fill("lightgrey")
    // strokeWeight(1)
    // noFill()
    translate(this.boundary.x / 2, this.boundary.y / 2, this.boundary.z / 2)
    box(this.boundary)
    pop()
  }
}

class Design {
  constructor() {
    this.items = []
  }
  addItem(item) {
    this.items.push(item)
  }
}

class Room {
  constructor({ vertices, height, gridSize }) {
    this.vertices = vertices
    this.height = height
    // this.walls = []
    this.designs = []
    // this.items = []

    // const walls = [
    //   { vertA: { x: 0, y: 0 }, vertB: { x: 0, y: 0 } },
    //   { vertA: { x: 0, y: 0 }, vertB: { x: 0, y: 0 } },
    // ]
  }

  addItem({ designNumber, item }) {
    this.designs[designNumber].addItem(item)
  }

  draw({ floor = true, wall = true, items = true, designNumber }) {
    wall && this.drawWalls()
    items && this.drawItems({ designNumber })
    floor && this.drawFloor()
  }

  drawGrid() {}

  drawFloor() {
    fill("lightblue")
    beginShape()
    for (const vert of this.vertices) {
      vertex(vert.x, vert.y, vert.z)
    }
    endShape()
  }

  drawWalls() {
    let prevVert = false
    fill("lightgreen")
    for (const vert of this.vertices) {
      beginShape()
      if (!prevVert) {
        vertex(vert.x, vert.y, vert.z)
      } else {
        vertex(vert.x, vert.y, vert.z)
        vertex(vert.x, vert.y, vert.z + 100)
        vertex(prevVert.x, prevVert.y, prevVert.z + 100)
        vertex(prevVert.x, prevVert.y, prevVert.z)
      }
      prevVert = vert
      endShape(CLOSE)
    }
  }

  drawItems({ designNumber }) {
    let currentDesign = this.designs[designNumber]
    let currentDesignItems = currentDesign.items
    for (const item of currentDesignItems) {
      push()
      translate(item.location)
      item.draw()
      pop()
    }
  }

  // drawWall(vertA, vertB, height) {
  //   fill(color(0, 204, 0))
  //   beginShape()
  //   vertex(vertA.x, vertA.y, vertA.z)
  //   vertex(vertA.x, vertA.y, vertA.z + height)
  //   vertex(vertB.x, vertB.y, vertB.z + height)
  //   vertex(vertB.x, vertB.y, vertB.z)
  //   endShape(CLOSE)
  // }
}

class Voxel {
  constructor({ cords }) {
    this.cords = cords
  }
}

class World {
  constructor({ boundary = createVector(1000, 1000, 1000), gridSize = 10 }) {
    this.boundary = boundary
    this.gridSize = gridSize
    this.grid = []

    for (let i = 0; i < boundary.x; i += this.gridSize) {
      for (let j = 0; j < boundary.y; j += this.gridSize) {
        for (let k = 0; k < boundary.z; k += this.gridSize) {
          this.grid.push(
            new Voxel({
              cords: {
                x: i,
                y: j,
                z: k,
              },
            })
          )
        }
      }
    }
  }

  // static displayAll(items) {
  //   items.map((item) => {
  //     item.display()
  //   })
  // }

  draw({ axis = true, boundaries = true, back = true, floor = true }) {
    back && background(39, 40, 34)
    boundaries && this.drawBoundaries()
    axis && this.drawAxis()
    floor && this.drawFloor()
  }

  drawBoundaries() {
    push()
    stroke("grey")
    fill("lightgrey")
    strokeWeight(1)
    // wall || noFill()
    noFill()
    translate(this.boundary.x / 2, this.boundary.y / 2, this.boundary.z / 2)
    box(this.boundary)
    pop()
  }

  drawAxis() {
    push()
    strokeWeight(3)
    stroke("red") //x
    line(0, 0, 0, 500, 0, 0)
    stroke("green") //y
    line(0, 0, 0, 0, 500, 0)
    stroke("blue") //z
    line(0, 0, 0, 0, 0, 500)
    point(0, 0, 0)
    pop()
  }

  drawFloor() {
    push()
    fill(color(30, 30, 30))
    beginShape()
    vertex(0, 0, -0.1)
    vertex(this.boundary.x, 0, -0.1)
    vertex(this.boundary.x, this.boundary.y, -0.1)
    vertex(0, this.boundary.y, -0.1)
    vertex(0, 0, -0.1)
    endShape(CLOSE)
    pop()
  }

  drawGrid() {
    for (const voxel of this.grid) {
      push()
      noFill()
      stroke("grey")
      translate(voxel.cords.x + this.gridSize / 2, voxel.cords.y + this.gridSize / 2, voxel.cords.z + this.gridSize / 2)
      box(this.gridSize)
      pop()
    }
  }

  // drawTestCube() {
  //   let boxRad = 50
  //   push()
  //   translate(50 - boxRad / 2, 50 - boxRad / 2, 50 - boxRad / 2)
  //   box(50, 50, 50)
  //   pop()
  // }
}

// EVENT FUNCTIONS:

// runs when a key is pressed
function keyPressed() {
  // console.log(`key: ${key}, keycode: ${keyCode}`)
  if (key == "m") {
    ui.mode = "move"
  }
  if (keyCode == 32) {
    ui.mode = "select"
  }

  if (key == "[") {
    designNumber > 0 && designNumber--
    console.log(`option ${designNumber} selected`)
  }
  if (key == "]") {
    designNumber++
    console.log(`option ${designNumber} selected`)
  }

  // console.log(ui)

  return false
}

////// P5 SETTINGS:

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight, WEBGL)
}
