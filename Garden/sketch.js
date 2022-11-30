let beds = []
let world
let bed
let back = true

function setup() {
  // frameRate(10)
  createCanvas(window.innerWidth, window.innerHeight, WEBGL)
  background('#394034')
  // camera(0, -2000, 0, 0, 0, 0, 0, -1, 0)
  camera(-500, -500, -height / 2.0 / tan((PI * 30.0) / 180.0), 0, 0, 0, 0, 1, 0)
  // frustum(5000, 5000, 5000, 5000, 0.1, 5000)
  world = new World({
    boundary: createVector(1000, 1000, 1000),
    // sunPosition: createVector(0, 0, 0),
    latitude: 19.4326,
    longitude: -99.1332,
  })
  generateRandomBeds(100)
  ////
}

function draw() {
  orbitControl(3, 3, 0.2)
  // invert y axis:
  // scale(-1, -1, -1)
  // scale(1, 1, -1)
  // scale(1, -1, -1)

  if (back) {
    background(39, 40, 34)
  }

  world.drawAxis()
  world.drawBoundaries({ wall: false })
  // drawGrid()

  // LIGHTS
  // ambientLight(255, 255, 255, 0)

  //  TIME
  // let date = new Date()
  // world.setTime(date)
  // world.advanceTime(1)
  // console.log(world.dateTime)

  // SUN
  // world.rotateSun()
  // world.displaySun()
  world.displaySunLight()

  World.displayAll(beds)
}

// function mousePressed() {
//   back = !back
// }

function keyPressed() {
  // console.log(key, ' ', keyCode)

  if (keyCode === 66) {
    back = !back
  }

  return false // prevent default
}

// // function mouseDragged() {
// //
// // }

function generateRandomBeds(n) {
  let i = 0
  while (i < n) {
    let refVert = random([1, 2, 3, 4])

    const pos = createVector(random(10, 1000), random(10, 1000), random(10, 1000))
    const size = createVector(random(10, world.boundary.x - pos.x), 20, random(10, world.boundary.z - pos.z))

    // TODO: alternate reference vertices...
    if (refVert === 2) {
    }

    beds[i] = new Bed({ pos, size })

    // repeat if bed intersect another bed
    let intersect = false
    for (j = 0; j < beds.length; j++) {
      if (beds[i] != beds[j] && beds[i].intersects3d(beds[j])) {
        console.log('intersects')
        intersect = true
      }
    }

    if (!intersect) {
      i++
    }
  }
}
