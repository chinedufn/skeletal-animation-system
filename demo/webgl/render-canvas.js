var createCamera = require('create-orbit-camera')
var vec3Normalize = require('gl-vec3/normalize')
var vec3Scale = require('gl-vec3/scale')

module.exports = renderCanvas

function renderCanvas (gl, state, cameraControls, dt, opts) {
  gl.viewport(0, 0, state.viewport.width, state.viewport.height)
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

  var upperBodyQuats = require('./upper-body.js')(state, opts.dualQuatKeyframes)
  var lowerBodyQuats = require('./lower-body.js')(state, opts.dualQuatKeyframes)

  if (!upperBodyQuats || !lowerBodyQuats) {
    return
  }

  var cameraData = createCamera({
    position: [15, 23, 25],
    target: [0, 3.4, 0],
    xRadians: state.camera.xRadians,
    yRadians: state.camera.yRadians
  })

  var interpolatedQuats = {rot: [], trans: []}
  var totalJoints = upperBodyQuats.length + lowerBodyQuats.length

  var lightingDirection = [1, -3, -1]
  var normalizedLD = []
  vec3Normalize(normalizedLD, lightingDirection)
  vec3Scale(normalizedLD, normalizedLD, -1)

  var uniforms = {
    uUseLighting: true,
    uAmbientColor: [0.3, 0.3, 0.3],
    uLightingDirection: normalizedLD,
    uDirectionalColor: [0.0, 0.4, 0.7],
    uMVMatrix: cameraData.viewMatrix,
    uPMatrix: require('gl-mat4/perspective')([], Math.PI / 3, state.viewport.width / state.viewport.height, 0.1, 100)
  }

  for (var i = 0; i < totalJoints; i++) {
    uniforms['boneRotQuaternions' + i] = upperBodyQuats.rot[i] || lowerBodyQuats.rot[i]
    uniforms['boneTransQuaternions' + i] = upperBodyQuats.trans[i] || lowerBodyQuats.trans[i]
  }

  // Once we've loaded our model we draw it every frame
  if (opts.model) {
    gl.useProgram(opts.model.shaderProgram)
    opts.model.draw({
      attributes: opts.model.attributes,
      uniforms: uniforms,
      rotQuaternions: interpolatedQuats.rot,
      transQuaternions: interpolatedQuats.trans
    })
  }
}
