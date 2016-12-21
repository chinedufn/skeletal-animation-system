var animationSystem = require('../')

module.exports = upperBody

var jointNums = [0, 1, 2, 3, 4]

function upperBody (state, dualQuatKeyframes) {
  var interpolatedQuats = animationSystem.interpolateJoints({
    // TODO: Fix test case when current time is 0
    currentTime: state.currentTime,
    keyframes: dualQuatKeyframes,
    jointNums: jointNums,
    currentAnimation: {
      range: state.upperBody.currentAnimation.range,
      // TODO: Fix test case when current time is 0
      startTime: state.upperBody.currentAnimation.startTime
    },
    previousAnimation: state.upperBody.previousAnimation
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
