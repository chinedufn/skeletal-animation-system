var camera = require('perspective-camera')({
  fov: 50 * Math.PI / 180,
  position: [0, 0, 1],
  near: 0.00001,
  far: 100
})

module.exports = renderCanvas

function renderCanvas (gl, state, cameraControls, dt, opts) {
  gl.viewport(0, 0, state.viewport.width, state.viewport.height)
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

  var upperBodyQuats = require('./upper-body.js')(state, opts.dualQuatKeyframes)
  var lowerBodyQuats = require('./lower-body.js')(state, opts.dualQuatKeyframes)

  if (!upperBodyQuats || !lowerBodyQuats) {
    return
  }

  var interpolatedQuats = {rot: [], trans: []}
  var totalJoints = upperBodyQuats.length + lowerBodyQuats.length
  for (var i = 0; i < totalJoints; i++) {
    interpolatedQuats.rot[i] = upperBodyQuats.rot[i] || lowerBodyQuats.rot[i]
    interpolatedQuats.trans[i] = upperBodyQuats.trans[i] || lowerBodyQuats.trans[i]
  }

  cameraControls.update()
  cameraControls.copyInto(camera.position, camera.direction, camera.up)
  camera.viewport = [0, 0, state.viewport.width, state.viewport.height]
  camera.lookAt([0, 0, 0])

  // Gets around an issue in our `orbit-controls` dependency
  // when you try to view the model from the top or bottom
  if (camera.up[0] + camera.up[1] + camera.up[2] === 0) {
    camera.up = [0, -1, 0]
  }

  camera.update()

  // Once we've loaded our model we draw it every frame
  if (opts.model) {
    opts.model.draw({
      perspective: require('gl-mat4/perspective')([], Math.PI / 3, state.viewport.width / state.viewport.height, 0.1, 100),
      viewMatrix: require('gl-mat4/create')(),
      position: [0, -10, -30],
      rotQuaternions: interpolatedQuats.rot,
      transQuaternions: interpolatedQuats.trans
      // TODO: Leave comment in tutorial about using a view matrix to create a camera
      //  If you're interested in that let me know on twitter
    })
  }
}
