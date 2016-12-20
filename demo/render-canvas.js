var mat4Perspective = require('gl-mat4/perspective')

module.exports = renderCanvas

function renderCanvas (gl, state, dt, opts) {
  gl.viewport(0, 0, state.viewport.width, state.viewport.height)
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

  var interpolatedQuats = require('./upper-body.js')(state, opts.dualQuatKeyframes)

  if (!interpolatedQuats) {
    return
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
