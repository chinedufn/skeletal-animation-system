// TODO: Refactor this example out into modules that handle the boilerplate
//  i.e. you shouldn't need to convert to dual quats yourself
var mat3FromMat4 = require('gl-mat3/from-mat4')
var quatMultiply = require('gl-quat/multiply')
var quatFromMat3 = require('gl-quat/fromMat3')
var quatScale = require('gl-quat/scale')

var loadDae = require('load-collada-dae')
var loaded3dModel

var createCanvas = require('./create-canvas.js')

var modelJSON

var SS = require('solid-state')
var xhr = require('xhr')

var mainLoop = require('main-loop')

module.exports = createSkeletonCanvas

// Keep in mind that things were haphazardly thrown around
// and you'd want better organization in a real application
function createSkeletonCanvas () {
  var State = new SS({
    animationRanges: {
      'throw': [0, 5],
      'walk': [6, 17],
      'point': [18, 22]
    },
    camera: {
      xRadians: 0,
      yRadians: 0
    },
    upperBody: {
      currentAnimation: {
        name: 'walk',
        range: [6, 17],
        startTime: 0
      }
    },
    lowerBody: {
      currentAnimation: {
        name: 'walk',
        range: [6, 17],
        startTime: 0
      }
    }
  })

  var dualQuatKeyframes
  var imageLoaded

  // Download our model's texture image
  var image = new window.Image()
  image.crossOrigin = 'anonymous'
  image.onload = function () {
    imageLoaded = true
    loadModel()
  }
  image.src = 'cowboy-texture.png'

  // Download our model's JSON
  xhr.get('cowboy.json', function (err, resp) {
    if (err) { throw err }
    modelJSON = JSON.parse(resp.body)
    dualQuatKeyframes = convertKeyframesToDualQuats(modelJSON.keyframes)
    loadModel()

    // Convert joint names to their associated numeric joint index ... i.e... ['Torso', 'Chest'] -> [13, 2]
    //  ... because collada-dae-parser knows about numeric joint indices
    var upperBodyJointNums = ['Torso', 'Chest', 'Bone_002', 'Head', 'Upper_Arm_L', 'Lower_Arm_L', 'Hand_L', 'Upper_Arm_R', 'Lower_Arm_R', 'Hand_R']
    .reduce(function (jointNums, jointName) {
      return jointNums.concat([modelJSON.jointNamePositionIndex[jointName]])
    }, [])
    var lowerBodyJointNums = ['Upper_Leg_L', 'Lower_Leg_L', 'Foot_L', 'Toe_L', 'Upper_Leg_R', 'Lower_Leg_R', 'Foot_R', 'Toe_R']
    .reduce(function (jointNums, jointName) {
      return jointNums.concat([modelJSON.jointNamePositionIndex[jointName]])
    }, [])

    // Add the upper and lower body joint nums to our app state singleton so that our render function can use them
    State.set('upperBodyJointNums', upperBodyJointNums)
    State.set('lowerBodyJointNums', lowerBodyJointNums)
  })

  // TODO: Add per fragment lighting to the demo.. This will be a good test case for custom shaders in load-collada-dae
  //  so we'll also need to fix the dual quaternion normals in our default shader

  // Once our model and image have been downloaded we
  // prepare our data for the GPU so that we can later draw it
  function loadModel () {
    if (modelJSON && imageLoaded) {
      loaded3dModel = loadDae(gl, modelJSON, {texture: image})
    }
  }

  // Create our canvas and WebGL context
  var canvasData = createCanvas(State)
  var canvas = canvasData.canvas
  var gl = canvas.getContext('webgl')
  gl.clearColor(0.0, 0.0, 0.0, 1.0)
  gl.enable(gl.DEPTH_TEST)

  // Render our model every request animation frame
  var canvasLoop = require('raf-loop')

  var currentTime = 0
  canvasLoop(function (dt) {
    currentTime += dt / 1000
    State.set('currentTime', currentTime)
    var state = State.get()
    require('./render-canvas.js')(gl, state, canvasData.cameraControls, dt, {
      model: loaded3dModel,
      dualQuatKeyframes: dualQuatKeyframes
    })
  }).start()

  var controlLoop = mainLoop(State.get(), require('./render-controls').bind(null, State), require('virtual-dom'))
  State.addListener(controlLoop.update)

  return {
    control: controlLoop.target,
    canvas: canvas
  }
}

function convertKeyframesToDualQuats (keyframes) {
  return Object.keys(modelJSON.keyframes)
  .reduce(function (acc, time) {
    var keyframes = convertMatricesToDualQuats(modelJSON.keyframes[time])
    keyframes = keyframes.rotQuaternions.reduce(function (all, quat, index) {
      all[index] = keyframes.rotQuaternions[index].concat(keyframes.transQuaternions[index])
      return all
    }, {})
    acc[time] = keyframes
    return acc
  }, {})
}

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
