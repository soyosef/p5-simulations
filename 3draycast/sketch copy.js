// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/145-2d-ray-casting.html
// https://youtu.be/TOEi6T2mtHo

// 2D Ray Casting

let walls = [];
let ray;
let particle;
let xoff = 0;
let yoff = 10000;

let p1;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  //create random walls:
  // for (let i = 0; i < 5; i++) {
  //   let x1 = random(width);
  //   let x2 = random(width);
  //   let y1 = random(height);
  //   let y2 = random(height);
  //   walls[i] = new Boundary(x1, y1, x2, y2);
  // }
  //point
  p1 = createVector(100, 100);

  // create box walls:
  //   walls.push(new Boundary(-1, -1, width, -1));
  //   walls.push(new Boundary(width, -1, width, height));
  //   walls.push(new Boundary(width, height, -1, height));
  //   walls.push(new Boundary(-1, height, -1, -1));
  //   particle = new Particle();
}

function draw() {
  background("#394034");

  //show all walls
  // for (let wall of walls) {
  //   wall.show();
  // }
  // particle.update(noise(xoff) * width, noise(yoff) * height)
  // particle.update(mouseX, mouseY);
  // particle.show();
  // particle.look(walls);

  // xoff += 0.01;
  // yoff += 0.01;
  strokeWeight(5);

  const mouse = createVector(mouseX, mouseY);
  const hit = collidePointPointVector(p1, mouse, 10);

  if (hit) {
    stroke("red");
  } else {
    stroke("white");
  }

  point(p1);
}
