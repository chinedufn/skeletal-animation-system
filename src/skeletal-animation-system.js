var mat4Interpolate = require('mat4-interpolate')

module.exports = {
  interpolateJoints: interpolateJoints
}

// TODO: Add thorough comments
// TODO: Refactor duplicative code
function interpolateJoints (opts) {
  var currentAnimElapsedTime = opts.currentTime - opts.currentAnimation.startTime

  var keyframeTimes = Object.keys(opts.keyframes).sort()

  var currentKeyframeTimes = keyframeTimes.slice(
    opts.currentAnimation.range[0],
    opts.currentAnimation.range[1] + 1
  )

  var curAnimTimeRelToFirstFrame = Number(currentKeyframeTimes[0]) + Number(currentAnimElapsedTime)
  if (curAnimTimeRelToFirstFrame > currentKeyframeTimes[currentKeyframeTimes.length - 1]) {
    // Handle looping here
  }

  var currentAnimLowerKeyframe
  var currentAnimUpperKeyframe
  // Get the surrounding keyframes for our current animation
  currentKeyframeTimes.forEach(function (keyframeTime) {
    if (curAnimTimeRelToFirstFrame > keyframeTime) {
      currentAnimLowerKeyframe = keyframeTime
    }
    if (curAnimTimeRelToFirstFrame < keyframeTime) {
      currentAnimUpperKeyframe = keyframeTime
    }
  })

  if (opts.previousAnimation) {
    var prevAnimElapsedTime = opts.currentTime - opts.previousAnimation.startTime

    var previousKeyframeTimes = keyframeTimes.slice(
      opts.previousAnimation.range[0],
      opts.previousAnimation.range[1] + 1
    )

    var prevAnimTimeRelToFirstFrame = Number(previousKeyframeTimes[0]) + Number(prevAnimElapsedTime)

    var previousAnimLowerKeyframe
    var previousAnimUpperKeyframe
    // Get the surrounding keyframes for our previous animation
    previousKeyframeTimes.forEach(function (keyframeTime) {
      if (prevAnimTimeRelToFirstFrame > keyframeTime) {
        previousAnimLowerKeyframe = keyframeTime
      }
      if (prevAnimTimeRelToFirstFrame < keyframeTime) {
        previousAnimUpperKeyframe = keyframeTime
      }
    })
  }

  // Calculate the interpolated joint matrices for our consumer's animation
  var interpolatedJoints = opts.jointNames.reduce(function (acc, jointName) {
    // If there is a previous animation
    // TODO: don't blend if blend is > 1
    if (opts.previousAnimation) {
      acc[jointName] = []

      var previousAnimJointMatrix = []
      var currentAnimJointMatrix = []
      mat4Interpolate(
        previousAnimJointMatrix,
        opts.keyframes[previousAnimLowerKeyframe][jointName],
        opts.keyframes[previousAnimUpperKeyframe][jointName],
        prevAnimElapsedTime / (previousAnimUpperKeyframe - previousAnimLowerKeyframe)
      )

      mat4Interpolate(
        currentAnimJointMatrix,
        opts.keyframes[currentAnimLowerKeyframe][jointName],
        opts.keyframes[currentAnimUpperKeyframe][jointName],
        currentAnimElapsedTime / (currentAnimUpperKeyframe - currentAnimLowerKeyframe)
      )

      var blend = defaultBlend(currentAnimElapsedTime)
      console.log(currentAnimElapsedTime, blend)

      mat4Interpolate(
        acc[jointName],
        previousAnimJointMatrix,
        currentAnimJointMatrix,
        blend
      )
    } else {
      acc[jointName] = []
      mat4Interpolate(
        acc[jointName],
        opts.keyframes[currentAnimLowerKeyframe][jointName],
        opts.keyframes[currentAnimUpperKeyframe][jointName],
        currentAnimElapsedTime / (currentAnimUpperKeyframe - currentAnimLowerKeyframe)
      )
    }
    return acc
  }, {})

  return interpolatedJoints
}

// TODO: Comment on what `dt` represents
function defaultBlend (dt) {
  // If zero time has elapsed we avoid dividing by 0
  if (!dt) { return 0 }
  return 1 / 2 * dt
}
