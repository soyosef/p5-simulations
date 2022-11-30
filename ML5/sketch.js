let classifier
let img

function preload() {
  classifier = ml5.imageClassifier('MobileNet')
  img = loadImage('images/cat.jpeg')
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight, WEBGL)
  background('#394034')
  classifier.classify(img, gotResults)
}

// function draw() {
//   background('#394034')
// }

function gotResults(err, data) {
  console.log(data)
}

// ml5
//   .imageClassifier("MobileNet")
//   .then(classifier => classifier.predict(img))
//   .then(results => {
//     console.log(results);
//   });
