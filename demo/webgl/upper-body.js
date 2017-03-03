var animationSystem = require('../../')

module.exports = upperBody

function upperBody (state, dualQuatKeyframes) {
  var interpolatedQuats = animationSystem.interpolateJoints({
    blendFunction: function (dt) {
      // Blend linearly over 1 second
      return dt
    },
    currentTime: state.currentTime,
    keyframes: dualQuatKeyframes,
    jointNums: state.upperBodyJointNums,
    currentAnimation: {
      range: state.upperBody.currentAnimation.range,
      startTime: state.upperBody.currentAnimation.startTime
    },
    previousAnimation: state.upperBody.previousAnimation
  })

  var interpolatedRotQuats = []
  var interpolatedTransQuats = []
  state.upperBodyJointNums.forEach(function (jointNum) {
    interpolatedRotQuats[jointNum] = interpolatedQuats[jointNum].slice(0, 4)
    interpolatedTransQuats[jointNum] = interpolatedQuats[jointNum].slice(4, 8)
  })

  return {
    length: state.upperBodyJointNums.length,
    rot: interpolatedRotQuats,
    trans: interpolatedTransQuats
  }
}
