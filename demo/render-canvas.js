var createCamera = require('create-orbit-camera')

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
  for (var i = 0; i < totalJoints; i++) {
    interpolatedQuats.rot[i] = upperBodyQuats.rot[i] || lowerBodyQuats.rot[i]
    interpolatedQuats.trans[i] = upperBodyQuats.trans[i] || lowerBodyQuats.trans[i]
  }

  // Once we've loaded our model we draw it every frame
  if (opts.model) {
    opts.model.draw({
      perspective: require('gl-mat4/perspective')([], Math.PI / 3, state.viewport.width / state.viewport.height, 0.1, 100),
      viewMatrix: cameraData.viewMatrix,
      position: [0, 0, 0],
      rotQuaternions: interpolatedQuats.rot,
      transQuaternions: interpolatedQuats.trans
      // TODO: Leave comment in tutorial about using a view matrix to create a camera
      //  If you're interested in that let me know on twitter
    })
  }
}
