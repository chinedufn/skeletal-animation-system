var animationSystem = require('../')

module.exports = upperBody

var jointNums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

function upperBody (state, dualQuatKeyframes) {
  var interpolatedQuats = animationSystem.interpolateJoints({
    // TODO: Fix test case when current time is 0
    currentTime: state.currentTime,
    keyframes: dualQuatKeyframes,
    jointNums: jointNums,
    currentAnimation: {
      range: state.currentAnimation.range,
      // TODO: Fix test case when current time is 0
      startTime: state.currentAnimation.startTime
    },
    previousAnimation: state.previousAnimation
  })

  var interpolatedRotQuats = []
  var interpolatedTransQuats = []
  Object.keys(interpolatedQuats).forEach(function (jointNum) {
    interpolatedRotQuats[jointNum] = interpolatedQuats[jointNum].slice(0, 4)
    interpolatedTransQuats[jointNum] = interpolatedQuats[jointNum].slice(4, 8)
  })

  return {
    rot: interpolatedRotQuats,
    trans: interpolatedTransQuats
  }
}
