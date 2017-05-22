var dotProduct = require('gl-vec4/dot')
var lerp = require('gl-vec4/lerp')

// TODO: Pull this out into it's standalone own open source repo
module.exports = blendDualQuaternions

var lowerRotQuat
var lowerTransQuat
var upperRotQuat
var upperTransQuat

var lerpedRotQuat = []
var lerpedTransQuat = []

// Blend between two dual quaternions using the shortest path.
//
// startDualQuat -> your first dual quaternion that you are blending away from
// endDualQuat -> your second dual quaternion that you are blending towards
// blendValue -> Number between 0 and 1. This is the blend fraction
//  0 means startDualQuat, 0.5 means halfway between, 1 means endDualQuat
//  etc...
function blendDualQuaternions (startDualQuat, endDualQuat, blendValue) {
  // Get the components of our dual quaternions
  lowerRotQuat = startDualQuat.slice(0, 4)
  lowerTransQuat = startDualQuat.slice(4, 8)

  upperRotQuat = endDualQuat.slice(0, 4)
  upperTransQuat = endDualQuat.slice(4, 8)

  // Get the dot product between start and end rotation quaternions
  // If it's negative we need to negate one of the quaternions in order
  // to ensure the shortest path interpolation
  //  see this paper -> http://www.xbdev.net/misc_demos/demos/dual_quaternions_beyond/paper.pdf
  if (dotProduct(lowerRotQuat, upperRotQuat) < 0) {
    // TODO: This works, but we need to add a unit test that verifies it
    lowerRotQuat[0] = -lowerRotQuat[0]
    lowerRotQuat[1] = -lowerRotQuat[1]
    lowerRotQuat[2] = -lowerRotQuat[2]
    lowerRotQuat[3] = -lowerRotQuat[3]
    lowerTransQuat[0] = -lowerTransQuat[0]
    lowerTransQuat[1] = -lowerTransQuat[1]
    lowerTransQuat[2] = -lowerTransQuat[2]
    lowerTransQuat[3] = -lowerTransQuat[3]
  }

  // Blend our rotation and translation quaternions then combine them
  // back into a final blended dual quaternion
  lerp(lerpedRotQuat, lowerRotQuat, upperRotQuat, blendValue)
  lerp(lerpedTransQuat, lowerTransQuat, upperTransQuat, blendValue)
  return [
    lerpedRotQuat[0],
    lerpedRotQuat[1],
    lerpedRotQuat[2],
    lerpedRotQuat[3],
    lerpedTransQuat[0],
    lerpedTransQuat[1],
    lerpedTransQuat[2],
    lerpedTransQuat[3]
  ]
}
