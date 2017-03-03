var animationSystem = require('../../')

module.exports = lowerBody

function lowerBody (state, dualQuatKeyframes) {
  var interpolatedQuats = animationSystem.interpolateJoints({
    blendFunction: function (dt) {
      // Blend linearly over 1 second
      return dt
    },
    currentTime: state.currentTime,
    keyframes: dualQuatKeyframes,
    jointNums: state.lowerBodyJointNums,
    currentAnimation: {
      range: state.lowerBody.currentAnimation.range,
      startTime: state.lowerBody.currentAnimation.startTime
    },
    previousAnimation: state.lowerBody.previousAnimation
  })

  var interpolatedRotQuats = []
  var interpolatedTransQuats = []
  state.lowerBodyJointNums.forEach(function (jointNum) {
    interpolatedRotQuats[jointNum] = interpolatedQuats[jointNum].slice(0, 4)
    interpolatedTransQuats[jointNum] = interpolatedQuats[jointNum].slice(4, 8)
  })

  return {
    length: state.lowerBodyJointNums.length,
    rot: interpolatedRotQuats,
    trans: interpolatedTransQuats
  }
}

