/////
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

/////
//move your mouse to change light direction
// let dirX = (mouseX / width - 0.5) * 2
// let dirY = (mouseY / height - 0.5) * 2
// directionalLight(250, 250, 250, -dirX, -dirY, -1);

/////
// calculateSunPosition() {
//   const sunDistance = 500
//   const sunPos = SunCalc.getPosition(this.dateTime, this.latitude, this.longitude)

//   const theta = sunPos.altitude
//   const phi = sunPos.azimuth

//   // sunPosVect = p5.Vector.fromAngles(sunPos.altitude, sunPos.azimuth)
//   // const sunPosVect = p5.Vector.fromAngles(theta, phi)
//   // sunPosVect = p5.Vector.fromAngles(phi, theta)
//   console.log('sunCalc', sunPos)

//   // gets sun position and times for zurich
//   var jdo = new A.JulianDay(this.dateTime) // now
//   // var coord = A.EclCoord.fromWgs84(47.3957, 8.4867, 440) // zurich
//   // var coord = A.EclCoord.fromWgs84(23.6345, 102.5528, 2250) // mexico
//   var coord = A.EclCoord.fromWgs84(this.latitude, this.longitude, 0) // mexico

//   // gets the position of the sun
//   var tp = A.Solar.topocentricPosition(jdo, coord, false)
//   console.log('Meusjs', tp.hz)
//   // console.log('azimuth: ', degrees(tp.hz.az), 'altitude', degrees(tp.hz.alt))

//   // let alt = 0,
//   //   az = 0
//   // if (tp.hz.alt > 0) {
//   //   alt = tp.hz.alt
//   // }

//   const sunPosVect = p5.Vector.fromAngles(tp.hz.alt, tp.hz.az)
//   // const sunPosVect = p5.Vector.fromAngles(tp.hz.az, tp.hz.alt)

//   this.specificSunPos = {
//     az: tp.hz.az,
//     alt: tp.hz.alt,
//   }

//   sunPosVect.normalize()

//   // return p5.Vector.mult(sunPosVect, sunDistance)
//   // if (tp.hz.alt > 0) {
//   return p5.Vector.mult(sunPosVect, sunDistance)
//   // } else {
//   //   return createVector(0, 0, 0)
//   // }
// }
