// TODO: Pull this out into it's standalone own open source repo
module.exports = blendDualQuaternions

// Blend between two dual quaternions using the shortest path.
//
// startDualQuat -> your first dual quaternion that you are blending away from
// endDualQuat -> your second dual quaternion that you are blending towards
// blendValue -> Number between 0 and 1. This is the blend fraction
//  0 means startDualQuat, 0.5 means halfway between, 1 means endDualQuat
//  etc...
//
// NOTE: We sacrifice some readability for performance, but try to make up for this
//  with commenting
function blendDualQuaternions (outputArray, startDualQuat, endDualQuat, blendValue) {
  // Get the dot product between start and end rotation quaternions
  // If it's negative we need to negate one of the quaternions in order
  // to ensure the shortest path interpolation
  //  see this paper -> http://www.xbdev.net/misc_demos/demos/dual_quaternions_beyond/paper.pdf
  //
  // NOTE: We pass in the entire dual quaternion, but we're only using the first four elements
  //  for our dot product. This is a perf optimization to avoid needing to create a new array
  if (dotProduct(startDualQuat, endDualQuat) < 0) {
    lerpNegatedDualQuaternions(outputArray, startDualQuat, endDualQuat, blendValue)
  } else {
    lerpDualQuaternions(outputArray, startDualQuat, endDualQuat, blendValue)
  }

  return outputArray
}

/**
 * These functions are taken and repurposed from stackgl/gl-vec4
 * see: https://github.com/stackgl/gl-vec4/blob/23449f51b38fd8cb543ccf585a8bca0009a8420b/lerp.js
 *
 * TODO: See if in-lining these functions measurably increases performance
 */

/**
 * Interpolate between to dual quaternions
 */
function lerpDualQuaternions (out, a, b, t) {
  out[0] = a[0] + t * (b[0] - a[0])
  out[1] = a[1] + t * (b[1] - a[1])
  out[2] = a[2] + t * (b[2] - a[2])
  out[3] = a[3] + t * (b[3] - a[3])

  out[4] = a[4] + t * (b[4] - a[4])
  out[5] = a[5] + t * (b[5] - a[5])
  out[6] = a[6] + t * (b[6] - a[6])
  out[7] = a[7] + t * (b[7] - a[7])
  return out
}

/**
 * Negate our first dual quaternion before interpolating
 * We do this when the dot product is < 0 to ensure
 * shortest path rotation
 */
function lerpNegatedDualQuaternions (out, a, b, t) {
  out[0] = -a[0] + t * (b[0] + a[0])
  out[1] = -a[1] + t * (b[1] + a[1])
  out[2] = -a[2] + t * (b[2] + a[2])
  out[3] = -a[3] + t * (b[3] + a[3])

  out[4] = -a[4] + t * (b[4] + a[4])
  out[5] = -a[5] + t * (b[5] + a[5])
  out[6] = -a[6] + t * (b[6] + a[6])
  out[7] = -a[7] + t * (b[7] + a[7])
}

function dotProduct (a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3]
}
