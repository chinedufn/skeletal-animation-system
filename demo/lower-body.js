var animationSystem = require('../')

module.exports = lowerBody

var jointNums = [5, 6, 7, 8, 9]

function lowerBody (state, dualQuatKeyframes) {
  var interpolatedQuats = animationSystem.interpolateJoints({
    blendFunction: function (dt) {
      // Blend linearly over 1 second
      return dt
    },
    currentTime: state.currentTime,
    keyframes: dualQuatKeyframes,
    jointNums: jointNums,
    currentAnimation: {
      range: state.lowerBody.currentAnimation.range,
      startTime: state.lowerBody.currentAnimation.startTime
    },
    previousAnimation: state.lowerBody.previousAnimation
  })

  var interpolatedRotQuats = []
  var interpolatedTransQuats = []
  jointNums.forEach(function (jointNum) {
    interpolatedRotQuats[jointNum] = interpolatedQuats[jointNum].slice(0, 4)
    interpolatedTransQuats[jointNum] = interpolatedQuats[jointNum].slice(4, 8)
  })

  return {
    length: jointNums.length,
    rot: interpolatedRotQuats,
    trans: interpolatedTransQuats
  }
}

