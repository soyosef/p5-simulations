let p1
// let pln;

// import { intersection } from "../libs/ray-aabb-intersection/index.js"

const boxPosX = 200
const boxPosY = 200
const boxPosZ = 200

const boxSizeX = 100
const boxSizeY = 100
const boxSizeZ = 100
let intersectionPoint
let aabb = []
let ray

function setup() {
  createCanvas(window.innerWidth, window.innerHeight, WEBGL)
  camera(-500, -500, -height / 2.0 / tan((PI * 30.0) / 180.0), 0, 0, 0, 0, 1, 0)
  world = new World({ boundary: createVector(1000, 1000, 1000) })
  // pln = { x: 50, y: 50, z: 50 };
  ray = new Ray3d(createVector(0, 0, 0), createVector(1, 0.7, 1))
  //
}

function draw() {
  background("#394034")
  world.drawAxis()
  // world.drawBoundaries({ wall: false })
  orbitControl(3, 3, 0.2)
  directionalLight(color(255), createVector(0.2, 0.3, 0.4))
  const mouse = createVector(mouseX, mouseY)

  // ray.direction(createVector(mouse.x, mouse.y, 500))
  ray.drawRay()
  ray.drawIntersection()

  intersectionPoint = ray.boxIntersection({ pos: createVector(boxPosX, boxPosY, boxPosZ), size: createVector(boxSizeX, boxSizeY, boxSizeZ) })

  // console.log(intersectionPoint)

  // draw box:
  push()
  translate(boxPosX, boxPosY, boxPosZ)
  translate(-boxSizeX / 2, -boxSizeY / 2, -boxSizeZ / 2)
  box(boxSizeX, boxSizeY, boxSizeZ)
  pop()
}

class Ray3d {
  constructor(origin, dir) {
    this.origin = origin
    this.dir = dir
    this.dir.normalize()
    this.intersection = createVector()
  }

  position(pos) {
    this.pos = pos
    this.dir.normalize()
  }

  direction(dir) {
    this.dir = p5.Vector.sub(dir, this.origin)
    this.dir.normalize()
  }

  boxIntersection({ pos, size }) {
    // returns null or the intersection point
    let inter = []
    intersection(
      inter,
      [this.origin.x, this.origin.y, this.origin.z],
      [this.dir.x, this.dir.y, this.dir.z],
      [
        [pos.x, pos.y, pos.z],
        [size.x, size.y, size.z],
      ]
    )

    if (inter == null) {
      this.intersection = null
    } else {
      this.intersection = createVector(inter[0], inter[1], inter[2])
    }

    return this.intersection
  }

  drawIntersection() {
    push()
    translate(this.intersection)
    noStroke()
    fill("red")
    sphere(5)
    pop()
  }

  drawRay() {
    push()
    stroke(255)
    line(this.origin.x, this.origin.y, this.origin.z, this.dir.x * 100, this.dir.y * 100, this.dir.z * 100)
    pop()
  }
}
