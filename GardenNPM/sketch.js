import p5 from 'p5'
import World from './World.js'
import Bed from './Bed.js'

// let beds = []
// function generateRandomBeds(n) {
//   let i = 0
//   while (i < n) {
//     let refVert = p.random([1, 2, 3, 4])

//     const pos = p.createVector(p.random(10, 1000), p.random(10, 1000), p.random(10, 1000))
//     const size = p.createVector(p.random(10, world.boundary.x - pos.x), 20, p.random(10, world.boundary.z - pos.z))

//     // TODO: alternate reference vertices...
//     if (refVert === 2) {
//     }

//     beds[i] = new Bed({ pos, size })

//     // repeat if bed intersect another bed
//     let intersect = false
//     for (j = 0; j < beds.length; j++) {
//       if (beds[i] != beds[j] && beds[i].intersects3d(beds[j])) {
//         console.log('intersects')
//         intersect = true
//       }
//     }

//     if (!intersect) {
//       i++
//     }
//   }
// }

let world
let bed

const sketch = (p) => {
  let back = true

  p.setup = () => {
    console.log(p)

    // frameRate(10)
    p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL)
    p.background('#394034')
    // camera(0, -2000, 0, 0, 0, 0, 0, -1, 0)
    p.camera(-500, -500, -p.height / 2.0 / p.tan((p.PI * 30.0) / 180.0), 0, 0, 0, 0, 1, 0)
    // frustum(5000, 5000, 5000, 5000, 0.1, 5000)
    world = new World({
      boundary: p.createVector(1000, 1000, 1000),
      // sunPosition: createVector(0, 0, 0),
      latitude: 19.4326,
      longitude: -99.1332,
    })
    // generateRandomBeds(100)

    ////
  }

  let frame = 0
  p.draw = () => {
    p.orbitControl(3, 3, 0.2)
    // invert y axis:
    // scale(-1, -1, -1)
    // scale(1, 1, -1)
    // scale(1, -1, -1)

    // console.log(`fps: ${round(frameRate())}`)

    if (back) {
      p.background(39, 40, 34)
    }

    // if (frame < 50) {
    //   background(39, 40, 34)
    //   frame++
    // }

    world.drawAxis()
    world.drawBoundaries({ wall: false })
    // drawGrid()

    // LIGHTS
    // ambientLight(255, 255, 255, 0);

    //  TIME
    // let date = new Date()
    // world.setTime(date)
    world.advanceTime(1)
    // console.log(world.dateTime)

    // SUN
    world.rotateSun()
    world.displaySun()

    //move your mouse to change light direction
    // let dirX = (mouseX / width - 0.5) * 2
    // let dirY = (mouseY / height - 0.5) * 2
    // directionalLight(250, 250, 250, -dirX, -dirY, -1);

    // World.displayAll(beds)
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
}

export const p = new p5(sketch)

console.log(p)

// // function mouseDragged() {
// //
// // }

//instance mode example:

// import p5 from 'p5'
// import { Test } from './Test'

// const s = (p) => {
//   let square
//   p.setup = function () {
//     p.createCanvas(700, 410)
//     square = new Test(100)
//   }

//   p.draw = function () {
//     p.background(0)

//     square.draw()
//   }
// }

// export const p = new p5(s)
