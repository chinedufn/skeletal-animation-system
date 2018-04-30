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
// First we grab our math dependencies that we'll be making use of
var glMat4 = require('gl-mat4')
var glMat3 = require('gl-mat3')
var glVec3 = require('gl-vec3')
var expandVertexData = require('expand-vertex-data')
var animationSystem = require('../')
var mat4ToDualQuat = require('mat4-to-dual-quat')

// Our model data uses matrices for all of the bone data, but
// skelelal-animation-system expects dual quaternions. So here
// we convert all of the joint matrices into dual quaternions.
var model = require('./baseball-player.json')
var baseballPlayer = expandVertexData(model)
baseballPlayer.keyframes = Object.keys(model.keyframes)
.reduce(function (dualQuats, keyframe) {
  dualQuats[keyframe] = []
  for (var k = 0; k < model.keyframes[keyframe].length; k++) {
    dualQuats[keyframe][k] = mat4ToDualQuat(model.keyframes[keyframe][k])
  }
  return dualQuats
}, {})

// We create a canvas as well as controls to track finger and mouse drags over
// the canvas. We use this to know how much to move our camera
var canvas = document.createElement('canvas')
canvas.style.cursor = 'pointer'
canvas.width = 500
canvas.height = 500

var isDragging = false
var xCamRot = Math.PI / 20
var yCamRot = 0
var lastX
var lastY
canvas.onmousedown = function (e) {
  isDragging = true
  lastX = e.pageX
  lastY = e.pageY
}
canvas.onmouseup = function () {
  isDragging = false
}
canvas.onmousemove = function (e) {
  if (isDragging) {
    xCamRot += (e.pageY - lastY) / 60
    yCamRot -= (e.pageX - lastX) / 60

    xCamRot = Math.min(xCamRot, Math.PI / 2.5)
    xCamRot = Math.max(-0.5, xCamRot)

    lastX = e.pageX
    lastY = e.pageY
  }
}

// As you drag your finger we move the camera
canvas.addEventListener('touchstart', function (e) {
  lastX = e.touches[0].clientX
  lastY = e.touches[0].clientY
})
canvas.addEventListener('touchmove', function (e) {
  e.preventDefault()
  xCamRot += (e.touches[0].clientY - lastY) / 60
  yCamRot -= (e.touches[0].clientX - lastX) / 60

  xCamRot = Math.min(xCamRot, Math.PI / 2.5)
  xCamRot = Math.max(xCamRot, -0.5)

  lastX = e.touches[0].clientX
  lastY = e.touches[0].clientY
})

// We create a WebGL context so that we can push data to the GPU and render our tutorial
var gl = canvas.getContext('webgl')
gl.clearColor(0.0, 0.0, 0.0, 1.0)
gl.enable(gl.DEPTH_TEST)

// Here we create a dual quaternion linear blending vertex shader. You can check out
// http://chinedufn.com/dual-quaternion-shader-explained/ for an explanation of how
// it works.
var vertexGLSL = `
attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aVertexUV;
attribute vec4 aJointIndex;
attribute vec4 aJointWeight;
varying vec3 vNormal;
uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat3 uNMatrix;
// TODO: Variable
uniform vec4 boneRotQuaternions[20];
uniform vec4 boneTransQuaternions[20];
varying vec3 vLightWeighting;
varying vec2 vUV;
void main (void) {
  // Blend our dual quaternion
  vec4 weightedRotQuats = boneRotQuaternions[int(aJointIndex.x)] * aJointWeight.x +
    boneRotQuaternions[int(aJointIndex.y)] * aJointWeight.y +
    boneRotQuaternions[int(aJointIndex.z)] * aJointWeight.z +
    boneRotQuaternions[int(aJointIndex.w)] * aJointWeight.w;
  vec4 weightedTransQuats = boneTransQuaternions[int(aJointIndex.x)] * aJointWeight.x +
    boneTransQuaternions[int(aJointIndex.y)] * aJointWeight.y +
    boneTransQuaternions[int(aJointIndex.z)] * aJointWeight.z +
    boneTransQuaternions[int(aJointIndex.w)] * aJointWeight.w;
  // Normalize our dual quaternion (necessary for nlerp)
  float xRot = weightedRotQuats[0];
  float yRot = weightedRotQuats[1];
  float zRot = weightedRotQuats[2];
  float wRot = weightedRotQuats[3];
  float magnitude = sqrt(xRot * xRot + yRot * yRot + zRot * zRot + wRot * wRot);
  weightedRotQuats = weightedRotQuats / magnitude;
  weightedTransQuats = weightedTransQuats / magnitude;
  // Convert out dual quaternion in a 4x4 matrix
  //  equation: https://www.cs.utah.edu/~ladislav/kavan07skinning/kavan07skinning.pdf
  float xR = weightedRotQuats[0];
  float yR = weightedRotQuats[1];
  float zR = weightedRotQuats[2];
  float wR = weightedRotQuats[3];
  float xT = weightedTransQuats[0];
  float yT = weightedTransQuats[1];
  float zT = weightedTransQuats[2];
  float wT = weightedTransQuats[3];
  float t0 = 2.0 * (-wT * xR + xT * wR - yT * zR + zT * yR);
  float t1 = 2.0 * (-wT * yR + xT * zR + yT * wR - zT * xR);
  float t2 = 2.0 * (-wT * zR - xT * yR + yT * xR + zT * wR);
  mat4 convertedMatrix = mat4(
      1.0 - (2.0 * yR * yR) - (2.0 * zR * zR),
      (2.0 * xR * yR) + (2.0 * wR * zR),
      (2.0 * xR * zR) - (2.0 * wR * yR),
      0,
      (2.0 * xR * yR) - (2.0 * wR * zR),
      1.0 - (2.0 * xR * xR) - (2.0 * zR * zR),
      (2.0 * yR * zR) + (2.0 * wR * xR),
      0,
      (2.0 * xR * zR) + (2.0 * wR * yR),
      (2.0 * yR * zR) - (2.0 * wR * xR),
      1.0 - (2.0 * xR * xR) - (2.0 * yR * yR),
      0,
      t0,
      t1,
      t2,
      1
      );
  // Transform our normal using our blended transformation matrix.
  // We do not need to take the inverse transpose here since dual quaternions
  // guarantee that we have a rigid transformation matrix.
  // In other words, we know for a fact that there is no scale or shear,
  // so we do not need to create an inverse transpose matrix to account for scale and shear
  vec3 transformedNormal = (convertedMatrix * vec4(aVertexNormal, 0.0)).xyz;
  // Swap our normal's y and z axis since Blender uses a right handed coordinate system
  float y;
  float z;
  y = transformedNormal.z;
  z = -transformedNormal.y;
  transformedNormal.y = y;
  transformedNormal.z = z;
  // We convert our normal into column major before multiplying it with our normal matrix
  transformedNormal = uNMatrix * transformedNormal;
  // Blender uses a right handed coordinate system. We convert to left handed here
  vec4 leftWorldSpace = convertedMatrix * vec4(aVertexPosition, 1.0);
  y = leftWorldSpace.z;
  z = -leftWorldSpace.y;
  leftWorldSpace.y = y;
  leftWorldSpace.z = z;
  vec4 leftHandedPosition = uPMatrix * uMVMatrix * leftWorldSpace;
  // We only have one index right now... so the weight is always 1.
  gl_Position = leftHandedPosition;
  vNormal = transformedNormal;
  vUV = aVertexUV;
}
`

// We create a fragment shader with some per fragment lighting for our model
var fragmentGLSL = `
precision mediump float;
varying vec3 vLightWeighting;
varying vec3 vNormal;
varying vec2 vUV;
uniform vec3 uAmbientColor;
uniform vec3 uDirectionalColor;
uniform vec3 uLightingDirection;
uniform sampler2D uSampler;
void main(void) {
  float directionalLightWeighting = max(dot(vNormal, uLightingDirection), 0.0);
  vec3 lightWeighting = uAmbientColor + uDirectionalColor * directionalLightWeighting;
  vec4 baseColor = texture2D(uSampler, vec2(vUV.s, vUV.t));
  gl_FragColor = baseColor * vec4(lightWeighting, 1.0);
}
`

// Iniitalize our shader program
var vertexShader = gl.createShader(gl.VERTEX_SHADER, vertexGLSL)
gl.shaderSource(vertexShader, vertexGLSL)
gl.compileShader(vertexShader)

var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER, fragmentGLSL)
gl.shaderSource(fragmentShader, fragmentGLSL)
gl.compileShader(fragmentShader)

var shaderProgram = gl.createProgram()
gl.attachShader(shaderProgram, vertexShader)
gl.attachShader(shaderProgram, fragmentShader)
gl.linkProgram(shaderProgram)

gl.useProgram(shaderProgram)

// Enable all of our attributes
var vertexPosAttrib = gl.getAttribLocation(shaderProgram, 'aVertexPosition')
var vertexNormalAttrib = gl.getAttribLocation(shaderProgram, 'aVertexNormal')
var vertexUVAttrib = gl.getAttribLocation(shaderProgram, 'aVertexUV')
var jointIndexAttrib = gl.getAttribLocation(shaderProgram, 'aJointIndex')
var jointWeightAttrib = gl.getAttribLocation(shaderProgram, 'aJointWeight')

gl.enableVertexAttribArray(vertexPosAttrib)
gl.enableVertexAttribArray(vertexNormalAttrib)
gl.enableVertexAttribArray(vertexUVAttrib)
gl.enableVertexAttribArray(jointIndexAttrib)
gl.enableVertexAttribArray(jointWeightAttrib)

// Get all of our uniform locations
var ambientColorUni = gl.getUniformLocation(shaderProgram, 'uAmbientColor')
var lightingDirectionUni = gl.getUniformLocation(shaderProgram, 'uLightingDirection')
var directionalColorUni = gl.getUniformLocation(shaderProgram, 'uDirectionalColor')
var mVMatrixUni = gl.getUniformLocation(shaderProgram, 'uMVMatrix')
var pMatrixUni = gl.getUniformLocation(shaderProgram, 'uPMatrix')
var nMatrixUni = gl.getUniformLocation(shaderProgram, 'uNMatrix')
var uSampler = gl.getUniformLocation(shaderProgram, 'uSampler')

var boneRotQuaternions = {}
var boneTransQuaternions = {}
for (var i = 0; i < 20; i++) {
  boneRotQuaternions[i] = gl.getUniformLocation(shaderProgram, `boneRotQuaternions[${i}]`)
  boneTransQuaternions[i] = gl.getUniformLocation(shaderProgram, `boneTransQuaternions[${i}]`)
}

// Push our attribute data to the GPU
var vertexPosBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBuffer)
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(baseballPlayer.positions), gl.STATIC_DRAW)
gl.vertexAttribPointer(vertexPosAttrib, 3, gl.FLOAT, false, 0, 0)

var vertexNormalBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, vertexNormalBuffer)
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(baseballPlayer.normals), gl.STATIC_DRAW)
gl.vertexAttribPointer(vertexNormalAttrib, 3, gl.FLOAT, false, 0, 0)

var jointIndexBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, jointIndexBuffer)
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(baseballPlayer.jointInfluences), gl.STATIC_DRAW)
gl.vertexAttribPointer(jointIndexAttrib, 4, gl.FLOAT, false, 0, 0)

var jointWeightBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, jointWeightBuffer)
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(baseballPlayer.jointWeights), gl.STATIC_DRAW)
gl.vertexAttribPointer(jointWeightAttrib, 4, gl.FLOAT, false, 0, 0)

var vertexUVBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, vertexUVBuffer)
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(baseballPlayer.uvs), gl.STATIC_DRAW)
gl.vertexAttribPointer(vertexUVAttrib, 2, gl.FLOAT, false, 0, 0)

var vertexIndexBuffer = gl.createBuffer()
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertexIndexBuffer)
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(baseballPlayer.positionIndices), gl.STATIC_DRAW)

// Set our lighting uniforms
gl.uniform3fv(ambientColorUni, [0.3, 0.3, 0.3])
var lightingDirection = [1, -1, -1]
glVec3.scale(lightingDirection, lightingDirection, -1)
glVec3.normalize(lightingDirection, lightingDirection)
gl.uniform3fv(lightingDirectionUni, lightingDirection)
gl.uniform3fv(directionalColorUni, [1, 1, 1])

gl.uniformMatrix4fv(pMatrixUni, false, glMat4.perspective([], Math.PI / 3, 1, 0.1, 100))

// Load up our texture data
var texture = gl.createTexture()
var textureImage = new window.Image()
var imageHasLoaded
textureImage.onload = function () {
  gl.bindTexture(gl.TEXTURE_2D, texture)
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureImage)
  imageHasLoaded = true
}
textureImage.src = 'baseball-player-uvs.png'

// Whenever we hit keyframe #7 or #9 we will play a sound effect
var keyframesToPlaySoundOn = {
  7: true,
  9: true
}

// We maintain a clock for our application. The clock is used to know how
// far into the animation we are so that we interpolate the correct keyframes
var clockTime = 0
var lastStartTime = new Date().getTime()

// By tracking the keyframe from the last time we rendered we can check whether
// or not the new keyframe is different from the previous one. If it's different
// and it's one of the keyframes that needs a sound effect, we'll play a soung
var previousLowerKeyframe

function draw () {
  var currentTime = new Date().getTime()

  // Move the click forwards in seconds - based on the playback speed
  var timeElapsed = (currentTime - lastStartTime) / 1000 * playbackSpeed
  clockTime += timeElapsed
  lastStartTime = currentTime

  gl.clear(gl.COLOR_BUFFER_BIT, gl.DEPTH_BUFFER_BIT)

  // Calculate all of our joint dual quaternions for our model, based
  // on the current time
  var animationData = animationSystem.interpolateJoints({
    currentTime: clockTime,
    jointNums: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 13, 14, 15, 16, 17, 18, 19, 20],
    currentAnimation: {
      keyframes: baseballPlayer.keyframes,
      startTime: 0
    }
  })

  // Loop through our joint dual quaternions for this frame and send them to the GPU
  // We'll use them for vertex skinning
  for (var j = 0; j < 20; j++) {
    var rotQuat = animationData.joints[j].slice(0, 4)
    var transQuat = animationData.joints[j].slice(4, 8)

    gl.uniform4fv(boneRotQuaternions[j], rotQuat)
    gl.uniform4fv(boneTransQuaternions[j], transQuat)
  }

  // Calculate our normal matrix to appropriately transform our normals
  var modelMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
  var nMatrix = glMat3.fromMat4([], modelMatrix)

  // We create a camera and use it as our view matrix
  var camera = glMat4.create()
  glMat4.translate(camera, camera, [0, 0, 2.5])
  var yAxisCameraRot = glMat4.create()
  var xAxisCameraRot = glMat4.create()
  glMat4.rotateX(xAxisCameraRot, xAxisCameraRot, -xCamRot)
  glMat4.rotateY(yAxisCameraRot, yAxisCameraRot, yCamRot)
  glMat4.multiply(camera, xAxisCameraRot, camera)
  glMat4.multiply(camera, yAxisCameraRot, camera)
  glMat4.lookAt(camera, [camera[12], camera[13], camera[14]], [0, 0, 0], [0, 1, 0])
  var mVMatrix = glMat4.multiply([], camera, modelMatrix)

  gl.uniformMatrix3fv(nMatrixUni, false, nMatrix)
  gl.uniformMatrix4fv(mVMatrixUni, false, mVMatrix)

  // Once our texture has loaded we begin drawing our model
  if (imageHasLoaded) {
    gl.drawElements(gl.TRIANGLES, baseballPlayer.positionIndices.length, gl.UNSIGNED_SHORT, 0)
  }

  window.requestAnimationFrame(draw)
}

// Create the slider that allows us to play our animation in slow motion
var playbackSlider = document.createElement('input')
playbackSlider.type = 'range'
playbackSlider.max = 100
playbackSlider.min = 0
playbackSlider.value = 85

var playbackSpeed = 0.85

var playbackDisplay = document.createElement('div')
playbackDisplay.innerHTML = 'Playback: 85%'

playbackSlider.oninput = function (e) {
  playbackSpeed = e.target.value / 100
  playbackDisplay.innerHTML = 'Playback: ' + e.target.value + '%'
}

// Add the controls into the page
var controls = document.createElement('span')
controls.style.display = 'flex'
controls.style.marginBottom = '5px'
controls.style.alignItems = 'center'

var mountLocation = document.getElementById('webgl-skeletal-sound-tutorial') || document.body
controls.appendChild(playbackSlider)
mountLocation.appendChild(controls)
mountLocation.appendChild(playbackDisplay)
mountLocation.appendChild(canvas)

// Start drawing every request animation frame
draw()
