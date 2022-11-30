// var SunCalc = require('suncalc')
import SunCalc from 'suncalc'
import { p } from './sketch'

let save

export default class World {
  constructor({ boundary = createVector(1000, 1000, 1000), latitude, longitude }) {
    this.boundary = boundary
    this.dateTime = new Date()
    this.latitude = latitude
    this.longitude = longitude
    this.sunPosition = this.calculateSunPosition()
    this.specificSunPos = {
      az: 0,
      alt: 0,
    }
    this.sunLightDirection = {
      x: 0,
      y: 1,
      z: 0.5,
    }
  }

  static displayAll(items) {
    items.map((item) => {
      item.display()
    })
  }

  drawBoundaries({ wall }) {
    push()
    stroke('grey')
    fill('lightgrey')
    strokeWeight(1)
    wall || noFill()
    translate(this.boundary.x / 2, this.boundary.y / 2, this.boundary.z / 2)
    box(this.boundary)
    pop()
  }

  drawAxis() {
    push()
    strokeWeight(3)
    stroke('red')
    line(0, 0, 0, 500, 0, 0)
    stroke('green')
    line(0, 0, 0, 0, 500, 0)
    stroke('blue')
    line(0, 0, 0, 0, 0, 500)
    point(0, 0, 0)
    p5.pop()
  }

  displayFloor() {
    let planeSide = 500
    push()
    // ambientMaterial(70, 130, 230);
    angleMode(DEGREES)
    rotate(90, createVector(1, 0, 0))
    translate(planeSide / 2, planeSide / 2, 1)
    plane(planeSide)
    pop()
  }

  setTime(dateTime) {
    this.dateTime = dateTime
  }

  advanceTime(t) {
    // this.dateTime.setDate(this.dateTime.getDate() + t)
    // this.dateTime.setSeconds(this.dateTime.getSeconds() + 120)
    this.dateTime.setHours(this.dateTime.getHours() + t)
  }

  displaySun() {
    if (degrees(this.specificSunPos.alt) > 0) {
      p.push()
      emissiveMaterial('#f9d71c')
      // sun:
      // push()
      // fill('#f9d71c')
      // noStroke()
      strokeWeight(0.2)
      // emissiveMaterial('#f9d71c')
      translate(this.sunPosition)
      // translate(this.sunPosition.x, this.sunPosition.z, this.sunPosition.y)
      sphere(20)
      pop()
    } else {
      // push()
      // emissiveMaterial('#000')
      return
    }

    // if (this.specificSunPos.alt > 0) {
    //   push()
    //   stroke('white')
    // } else {
    //   push()
    //   noStroke()
    //   // stroke('red')
    // }

    // // push()
    // // stroke('white')
    // strokeWeight(3)
    // line(0, 0, 0, this.sunPosition.x, this.sunPosition.y, this.sunPosition.z)
    // pop()
    //lights:
    directionalLight(250, 250, 255, this.sunLightDirection.x, this.sunLightDirection.y, this.sunLightDirection.z)
  }

  calculateSunPosition() {
    const sunDistance = 500
    const sunPos = SunCalc.getPosition(this.dateTime, this.latitude, this.longitude)

    const theta = sunPos.altitude
    const phi = sunPos.azimuth

    // sunPosVect = p5.Vector.fromAngles(sunPos.altitude, sunPos.azimuth)
    // const sunPosVect = p5.Vector.fromAngles(theta, phi)
    // sunPosVect = p5.Vector.fromAngles(phi, theta)
    // console.log('sunCalc', sunPos)

    // gets sun position and times for zurich
    var jdo = new A.JulianDay(this.dateTime) // now
    // var coord = A.EclCoord.fromWgs84(47.3957, 8.4867, 440) // zurich
    // var coord = A.EclCoord.fromWgs84(23.6345, 102.5528, 2250) // mexico
    var coord = A.EclCoord.fromWgs84(this.latitude, this.longitude, 0) // mexico

    // gets the position of the sun
    var tp = A.Solar.topocentricPosition(jdo, coord, false)
    // console.log('Meusjs', tp.hz)
    // console.log('azimuth: ', degrees(tp.hz.az), 'altitude', degrees(tp.hz.alt))

    // let alt = 0,
    //   az = 0
    // if (tp.hz.alt > 0) {
    //   alt = tp.hz.alt
    // }

    const sunPosVect = p5.Vector.fromAngles(tp.hz.alt, tp.hz.az)
    // const sunPosVect = p5.Vector.fromAngles(tp.hz.az, tp.hz.alt)

    this.specificSunPos = {
      az: tp.hz.az,
      alt: tp.hz.alt,
    }

    sunPosVect.normalize()

    // return p5.Vector.mult(sunPosVect, sunDistance)
    // if (tp.hz.alt > 0) {
    return p5.Vector.mult(sunPosVect, sunDistance)
    // } else {
    //   return createVector(0, 0, 0)
    // }
  }

  // calculateSunPosition() {
  //   const sunDistance = 500
  //   const sunPos = SunCalc.getPosition(this.dateTime, this.latitude, this.longitude)

  //   const theta = sunPos.altitude
  //   const phi = sunPos.azimuth

  //   // sunPosVect = p5.Vector.fromAngles(sunPos.altitude, sunPos.azimuth)
  //   const sunPosVect = p5.Vector.fromAngles(theta, phi)
  //   // sunPosVect = p5.Vector.fromAngles(phi, theta)
  //   console.log(sunPos)

  // sunPosVect.normalize()

  //   return p5.Vector.mult(sunPosVect, sunDistance)
  // }

  rotateSun() {
    this.sunPosition = this.calculateSunPosition()
  }

  drawTestCube() {
    let boxRad = 50
    push()
    translate(50 - boxRad / 2, 50 - boxRad / 2, 50 - boxRad / 2)
    box(50, 50, 50)
    pop()
  }
}
