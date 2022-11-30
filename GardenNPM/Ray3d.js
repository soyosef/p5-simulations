// class Ray3d {
//   constructor(origin, dir) {
//     this.origin = origin
//     this.dir = dir
//     this.dir.normalize()
//     this.intersection = createVector()
//   }

//   position(pos) {
//     this.pos = pos
//     this.dir.normalize()
//   }

//   direction(dir) {
//     this.dir = p5.Vector.sub(dir, this.origin)
//     this.dir.normalize()
//   }

//   boxIntersection({ pos, size }) {
//     // returns null or the intersection point
//     let inter = []
//     intersection(
//       inter,
//       [this.origin.x, this.origin.y, this.origin.z],
//       [this.dir.x, this.dir.y, this.dir.z],
//       [
//         [pos.x, pos.y, pos.z],
//         [size.x, size.y, size.z],
//       ]
//     )

//     if (inter == null) {
//       this.intersection = null
//     } else {
//       this.intersection = createVector(inter[0], inter[1], inter[2])
//     }

//     return this.intersection
//   }

//   drawIntersection() {
//     push()
//     translate(this.intersection)
//     noStroke()
//     fill('red')
//     sphere(5)
//     pop()
//   }

//   drawRay() {
//     push()
//     stroke(255)
//     line(this.origin.x, this.origin.y, this.origin.z, this.dir.x * 100, this.dir.y * 100, this.dir.z * 100)
//     pop()
//   }
// }
