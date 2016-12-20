// TODO: Refactor this example out into modules that handle the boilerplate
//  i.e. you shouldn't need to convert to dual quats yourself
var mat3FromMat4 = require('gl-mat3/from-mat4')
var quatMultiply = require('gl-quat/multiply')
var quatFromMat3 = require('gl-quat/fromMat3')
var quatScale = require('gl-quat/scale')
var mat4Perspective = require('gl-mat4/perspective')

var loadDae = require('../../load-collada-dae')
var loaded3dModel

var createCanvas = require('./create-canvas.js')

var modelJSON = require('./asset/old-man.json')

var SS = require('solid-state')

var createControls = require('./create-controls.js')

module.exports = createSkeletonCanvas

function createSkeletonCanvas () {
  var State = new SS()

  var dualQuatKeyframes = Object.keys(modelJSON.keyframes)
  .reduce(function (acc, time) {
    var keyframes = convertMatricesToDualQuats(modelJSON.keyframes[time])
    keyframes = keyframes.rotQuaternions.reduce(function (all, quat, index) {
      all[index] = keyframes.rotQuaternions[index].concat(keyframes.transQuaternions[index])
      return all
    }, {})
    acc[time] = keyframes
    return acc
  }, {})

  // Download our model's texture image
  var image = new window.Image()
  image.crossOrigin = 'anonymous'
  image.onload = loadModel
  image.src = '/suite01d.png'

  // Once our model and image have been downloaded we
  // prepare our data for the GPU so that we can later draw it
  function loadModel () {
    loaded3dModel = loadDae(gl, modelJSON, {texture: image})
  }

  // Create our canvas and WebGL context
  var canvas = createCanvas(State)
  var gl = canvas.getContext('webgl')
  gl.clearColor(0.0, 0.0, 0.0, 1.0)
  gl.enable(gl.DEPTH_TEST)

  // Render our model every request animation frame
  var loop = require('raf-loop')

  var animationSystem = require('../')
  var animationRanges = {
    'dance': [0, 3],
    'bend': [3, 6]
  }
  var jointNums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

  var currentAnimationName = 'dance'
  var startTime = 0

  var currentTime = 0
  var previousAnim
  loop(function (dt) {
    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

    currentTime += dt / 1000

    var interpolatedQuats = animationSystem.interpolateJoints({
      // TODO: Fix test case when current time is 0
      currentTime: currentTime,
      keyframes: dualQuatKeyframes,
      jointNums: jointNums,
      currentAnimation: {
        range: animationRanges[currentAnimationName],
        // TODO: Fix test case when current time is 0
        startTime: startTime
      },
      previousAnimation: previousAnim
    })
    if (!interpolatedQuats) {
      return
    }
    var interpolatedRotQuats = []
    var interpolatedTransQuats = []
    Object.keys(interpolatedQuats).forEach(function (jointNum) {
      interpolatedRotQuats[jointNum] = interpolatedQuats[jointNum].slice(0, 4)
      interpolatedTransQuats[jointNum] = interpolatedQuats[jointNum].slice(4, 8)
    })

    // Once we've loaded our model we draw it every frame
    if (loaded3dModel) {
      loaded3dModel.draw({
        perspective: mat4Perspective([], Math.PI / 3, canvas.width / canvas.height, 0.1, 20),
        position: [0, 0, -3.1],
        rotQuaternions: interpolatedRotQuats,
        transQuaternions: interpolatedTransQuats
        // TODO: Leave comment in tutorial about using a view matrix to create a camera
        //  If you're interested in that let me know on twitter
      })
    }
  }).start()

  return {
    control: createControls(State),
    canvas: canvas
  }

  /*
  var button = document.createElement('button')
  button.innerHTML = 'Change Animation'
  button.onclick = function () {
    previousAnim = {
      range: animationRanges[currentAnimationName],
      startTime: startTime
    }
    currentAnimationName = currentAnimationName === 'dance' ? 'bend' : 'dance'
    startTime = currentTime
  }
  document.body.appendChild(button)
  */

  // TODO: Turn into module
  function convertMatricesToDualQuats (jointMatrices) {
    var rotQuaternions = []
    var transQuaternions = []

    jointMatrices.forEach(function (joint, index) {
      // Create our dual quaternion
      var rotationMatrix = mat3FromMat4([], joint)
      var rotationQuat = quatFromMat3([], rotationMatrix)
      var transVec = [joint[12], joint[13], joint[14], 0]
      var transQuat = quatScale([], quatMultiply([], transVec, rotationQuat), 0.5)

      rotQuaternions.push(rotationQuat)
      transQuaternions.push(transQuat)
    })

    return {
      rotQuaternions: rotQuaternions,
      transQuaternions: transQuaternions
    }
  }
}
