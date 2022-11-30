// // point-point
// let p1;

// function setup() {
//   createCanvas(window.innerWidth, window.innerHeight);

//   //point2point
//   p1 = createVector(100, 100);
// }

// function draw() {
//   background("#394034");

//   strokeWeight(5);
//   stroke("white");
//   const mouse = createVector(mouseX, mouseY);
//   if (collidePointPointVector(p1, mouse, 10)) {
//     stroke("red");
//   }

//   point(p1);
// }

// // rectangle - rectangle
// let hit;

// function setup() {
//   createCanvas(window.innerWidth, window.innerHeight);
// }

// function draw() {
//   background("#394034");

//   rect(200, 200, 100, 150);
//   rect(mouseX, mouseY, 50, 75);

//   // hit = collideRectRect(200, 200, 100, 150, mouseX, mouseY, 50, 75);

//   // Use vectors as input:
//   const rect_start = createVector(200, 200);
//   const rect_size = createVector(100, 150);
//   const mouse = createVector(mouseX, mouseY);
//   const rect2_size = createVector(50, 75);
//   hit = collideRectRectVector(rect_start, rect_size, mouse, rect2_size);

//   stroke(hit ? color("red") : 0);
//   print("colliding?", hit);
// }

// line - line
let hit;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  collideDebug(true);
}

function draw() {
  background("#394034");

  line(200, 300, 100, 150);
  line(mouseX, mouseY, 350, 50);

  // hit = collideLineLine(200, 300, 100, 150, mouseX, mouseY, 350, 50);

  // Use vectors as input:
  const p1 = createVector(200, 300);
  const p2 = createVector(100, 150);
  const mouse = createVector(mouseX, mouseY);
  const p4 = createVector(350, 50);
  hit = collideLineLineVector(p1, p2, mouse, p4, true);

  stroke(hit ? color("red") : 0);
  print("colliding?", hit);
}
