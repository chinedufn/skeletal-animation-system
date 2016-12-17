module.exports = {
  interpolateJoints: interpolateJoints
}

// TODO: Add thorough comments
// TODO: Refactor duplicative code
// TODO: Rename animation time -> frame. We're dealing with frames not time
// TODO: Benchmark perf
// TODO: Document and accept a frame range AND a keyframe range
//        you can specify the first and last pre-specified keyframes to use or just the actual frame
function interpolateJoints (opts) {
  var currentAnimElapsedTime = opts.currentTime - opts.currentAnimation.startTime

  var keyframeTimes = Object.keys(opts.keyframes).sort(function (a, b) {
    if (Number(a) > Number(b)) { return 1 }
    if (Number(a) < Number(b)) { return -1 }
    return 0
  })

  var currentKeyframeTimes = keyframeTimes.slice(
    opts.currentAnimation.range[0],
    opts.currentAnimation.range[1] + 1
  )

  // Get the number of frames passed the first animation frame
  // TODO: This isn't actually the frame relative to the first..?
  // TODO: Yeah refactor everything once this works
  // Handle looping here
  var frameRelToFirst = Number(currentKeyframeTimes[0]) + Number(currentAnimElapsedTime)
  var range = currentKeyframeTimes[currentKeyframeTimes.length - 1] - currentKeyframeTimes[0]
  if (frameRelToFirst > range) {
    currentAnimElapsedTime = currentAnimElapsedTime % range
    frameRelToFirst = currentAnimElapsedTime + Number(currentKeyframeTimes[0])
  }

  var currentAnimLowerKeyframe
  var currentAnimUpperKeyframe
  // Get the surrounding keyframes for our current animation
  currentKeyframeTimes.forEach(function (keyframeTime) {
    if (currentAnimLowerKeyframe && currentAnimUpperKeyframe) { return }
    if (frameRelToFirst > keyframeTime) {
      currentAnimLowerKeyframe = keyframeTime
    } else if (frameRelToFirst < keyframeTime) {
      currentAnimUpperKeyframe = keyframeTime
    } else if (frameRelToFirst === Number(keyframeTime)) {
      // TODO: Perform fewer calculations in places that we already know
      // that the keyframe time doesn't need to be blended against an upper
      // and lower keyframe. For now we don't handle this special case
      currentAnimLowerKeyframe = currentAnimUpperKeyframe = keyframeTime
    }
  })
  // Set the elapsed time relative to our current lower bound keyframe instead of our lowest out of all keyframes
  currentAnimElapsedTime = frameRelToFirst - currentAnimLowerKeyframe

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
  var interpolatedJoints = opts.jointNums.reduce(function (acc, jointName) {
    // If there is a previous animation
    // TODO: don't blend if blend is > 1
    if (opts.previousAnimation) {
      var blend = defaultBlend(currentAnimElapsedTime)
      acc[jointName] = []

      var previousAnimJointMatrix = []
      var currentAnimJointMatrix = []
      // Blend the two dual quaternions based on where we are in the current keyframe
      previousAnimJointMatrix = opts.keyframes[previousAnimLowerKeyframe][jointName].reduce(function (dualQuat, value, index) {
        dualQuat[index] = opts.keyframes[previousAnimLowerKeyframe][jointName][index] + (opts.keyframes[previousAnimUpperKeyframe][jointName][index] - opts.keyframes[previousAnimLowerKeyframe][jointName][index]) * (prevAnimElapsedTime / (previousAnimUpperKeyframe - previousAnimLowerKeyframe))
        return dualQuat
      }, [])

      currentAnimJointMatrix = opts.keyframes[currentAnimLowerKeyframe][jointName].reduce(function (dualQuat, value, index) {
        dualQuat[index] = opts.keyframes[currentAnimLowerKeyframe][jointName][index] + (opts.keyframes[currentAnimUpperKeyframe][jointName][index] - opts.keyframes[currentAnimLowerKeyframe][jointName][index]) * (currentAnimElapsedTime / (currentAnimUpperKeyframe - currentAnimLowerKeyframe))
        return dualQuat
      }, [])

      acc[jointName] = previousAnimJointMatrix.reduce(function (dualQuat, value, index) {
        dualQuat[index] = (currentAnimJointMatrix[index] - previousAnimJointMatrix[index]) * blend + previousAnimJointMatrix[index]
        return dualQuat
      }, [])
    } else {
      // Blend the two dual quaternions based on where we are in the current keyframe
      acc[jointName] = opts.keyframes[currentAnimLowerKeyframe][jointName].reduce(function (dualQuat, value, index) {
        // If we have an exact keyframe we just return the value that we already have
        // TODO: We can accomplish this without loopign through each value since we
        // already know that we are at an exact keyframe
        if (currentAnimUpperKeyframe === currentAnimLowerKeyframe) {
          dualQuat[index] = opts.keyframes[currentAnimLowerKeyframe][jointName][index]
          return dualQuat
        }

        dualQuat[index] = opts.keyframes[currentAnimLowerKeyframe][jointName][index] +
        (opts.keyframes[currentAnimUpperKeyframe][jointName][index] - opts.keyframes[currentAnimLowerKeyframe][jointName][index]) *
        (currentAnimElapsedTime / (currentAnimUpperKeyframe - currentAnimLowerKeyframe))
        return dualQuat
      }, [])
    }
    return acc
  }, {})

  return interpolatedJoints
}

// TODO: Comment on what `dt` represents
function defaultBlend (dt) {
  // If zero time has elapsed we avoid dividing by 0
  console.log(dt, 'ok')
  if (!dt) { return 0 }
  return 1 / 2 * dt
}
