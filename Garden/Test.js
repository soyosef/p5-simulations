import { p } from './sketch'

export class Test {
  constructor(size) {
    this.size = size
  }

  draw() {
    p.fill(255).rect(100, 100, this.size, this.size)
  }
}

// export class Test {
//   constructor(sketch, size) {
//     this.sketch = sketch
//     this.size = size
//   }

//   draw() {
//     this.sketch.fill(255).rect(100, 100, this.size, this.size)
//   }
// }
