var mat4Perspective = require('gl-mat4/perspective')

module.exports = renderCanvas

function renderCanvas (gl, state, dt, opts) {
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

  // Once we've loaded our model we draw it every frame
  if (opts.model) {
    opts.model.draw({
      perspective: mat4Perspective([], Math.PI / 3, state.viewport.width / state.viewport.height, 0.1, 20),
      position: [0, 0, -3.1],
      rotQuaternions: interpolatedQuats.rot,
      transQuaternions: interpolatedQuats.trans
      // TODO: Leave comment in tutorial about using a view matrix to create a camera
      //  If you're interested in that let me know on twitter
    })
  }
}
