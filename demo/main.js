// DEMO SITE BACKGROUND EFFECT
var mask
if (navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i)) {
  mask = document.getElementById('mask')
  mask.parentNode.removeChild(mask)
  document.getElementById('lines-dots').style.fill = '#fafafa'
} else {
  mask = document.getElementById('mask')
  mask.setAttribute('width', window.innerWidth * 2)
  mask.setAttribute('height', window.innerHeight * 2)
  mask.setAttribute('x', -window.innerWidth)
  mask.setAttribute('y', -window.innerHeight)
  document.onmousemove = function (evt) {
    mask.setAttribute('x', evt.clientX - mask.getAttribute('width') / 2)
    mask.setAttribute('y', evt.clientY - mask.getAttribute('height') / 2)
  }
}

// var mount = document.getElementById('demo')
// mount.style.overflow = 'hidden'

// var demo = require('./demo.js')()

// mount.appendChild(demo.control)
// mount.appendChild(demo.canvas)
// document.body.appendChild(mount)

// SKELETAL ANIMATION DEMO
var canvas = document.getElementById('canvas')
canvas.width = 400
canvas.height = 400

var gl = canvas.getContext('webgl')
gl.enable(gl.DEPTH_TEST)

var cowboyJSON = require('./asset/cowboy.json')
var keyframesToDualQuats = require('keyframes-to-dual-quats')
cowboyJSON.keyframes = keyframesToDualQuats(cowboyJSON.keyframes)

var cowboyModel
var texture = new window.Image()

texture.onload = function () {
  var loadCollada = require('load-collada-dae')
  cowboyModel = loadCollada(gl, cowboyJSON, {texture: texture})
  gl.useProgram(cowboyModel.shaderProgram)
}
texture.src = './asset/cowboy-texture.png'

var secondsElapsed = 0

var renderLoop = require('raf-loop')
var animationSystem = require('../')

renderLoop(function (millisecondsSinceLastRender) {
  if (cowboyModel) {
    var uniforms = {
      uUseLighting: true,
      uAmbientColor: [1, 0.9, 0.9],
      uLightingDirection: [1, 0, 0],
      uDirectionalColor: [1, 0, 0],
      uMVMatrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.0, 0.0, -27.0, 1],
      uPMatrix: require('gl-mat4/perspective')([], Math.PI / 4, 400 / 400, 0.1, 100)
    }
    secondsElapsed += millisecondsSinceLastRender / 1000
    var interpolatedJoints = animationSystem.interpolateJoints({
      currentTime: secondsElapsed,
      jointNums: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
      currentAnimation: { keyframes: cowboyJSON.keyframes, startTime: 0 }
    }).joints

    for (var i = 0; i < 18; i++) {
      uniforms['boneRotQuaternions' + i] = interpolatedJoints[i].slice(0, 4)
      uniforms['boneTransQuaternions' + i] = interpolatedJoints[i].slice(4, 8)
    }

    cowboyModel.draw({
      attributes: cowboyModel.attributes,
      uniforms: uniforms
    })
  }
}).start()
