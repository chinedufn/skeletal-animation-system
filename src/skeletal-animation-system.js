var mat4Interpolate = require('mat4-interpolate')

module.exports = {
  interpolateJoints: interpolateJoints
}

// TODO: Add comments
function interpolateJoints (opts) {
  var elapsedTime = opts.currentTime - opts.currentAnimation.startTime

  var keyframeTimes = Object.keys(opts.keyframes).map(Number).sort()
  keyframeTimes = keyframeTimes.slice(
    opts.currentAnimation.range[0],
    opts.currentAnimation.range[1] - opts.currentAnimation.range[0] + 1
  )

  var timeRelativeToFirstFrame = keyframeTimes[0] + elapsedTime
  if (timeRelativeToFirstFrame > keyframeTimes[keyframeTimes.length - 1]) {
    // Handle looping here
  }

  var lowerKeyframe
  var upperKeyframe
  // Get the surrounding keyframes for our current time
  keyframeTimes.forEach(function (keyframeTime) {
    if (timeRelativeToFirstFrame > keyframeTime) {
      lowerKeyframe = keyframeTime
    }
    if (timeRelativeToFirstFrame < keyframeTime) {
      upperKeyframe = keyframeTime
    }
  })

  // Calculate the interpolated joint matrices for our consumer's animation
  var interpolatedJoints = opts.jointNames.reduce(function (acc, jointName) {
    acc[jointName] = []
    mat4Interpolate(
      acc[jointName],
      opts.keyframes[lowerKeyframe][jointName],
      opts.keyframes[upperKeyframe][jointName],
      elapsedTime / (upperKeyframe - lowerKeyframe)
    )
    return acc
  }, {})

  return interpolatedJoints
}
