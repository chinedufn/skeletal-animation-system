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

  var previousAnimLowerKeyframe
  var previousAnimUpperKeyframe
  var prevAnimElapsedTime
  if (opts.previousAnimation) {
    var previousKeyframeData = require('./get-previous-animation-data.js')(opts, keyframeTimes)
    previousAnimLowerKeyframe = previousKeyframeData.lower
    previousAnimUpperKeyframe = previousKeyframeData.upper
    prevAnimElapsedTime = previousKeyframeData.elapsedTime
  }

  // Calculate the interpolated joint matrices for our consumer's animation
  var interpolatedJoints = opts.jointNums.reduce(function (acc, jointName) {
    // If there is a previous animation
    // TODO: don't blend if blend is > 1
    var blend = (opts.blendFunction || defaultBlend)(opts.currentTime - opts.currentAnimation.startTime)
    if (opts.previousAnimation && blend < 1) {
      acc[jointName] = []

      var previousAnimJointMatrix = []
      var currentAnimJointMatrix = []
      // Blend the two dual quaternions based on where we are in the current keyframe
      // TODO: Rename to previousAnimDualQuat
      previousAnimJointMatrix = opts.keyframes[previousAnimLowerKeyframe][jointName].reduce(function (dualQuat, value, index) {
        // If we are using an exact frame that we already have we do not need to blend
        // TODO: No need to loop in this case
        if (previousAnimUpperKeyframe === previousAnimLowerKeyframe) {
          dualQuat[index] = opts.keyframes[previousAnimLowerKeyframe][jointName][index]
        } else {
          dualQuat[index] = opts.keyframes[previousAnimLowerKeyframe][jointName][index] + (opts.keyframes[previousAnimUpperKeyframe][jointName][index] - opts.keyframes[previousAnimLowerKeyframe][jointName][index]) * (prevAnimElapsedTime / (previousAnimUpperKeyframe - previousAnimLowerKeyframe))
        }
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

// Give then number of seconds elapsed between the previous animation
// and the current animation we return a blend factor between
// zero and one
function defaultBlend (dt) {
  // If zero time has elapsed we avoid dividing by 0
  if (!dt) { return 0 }
  // Blender linearly over 0.5s
  return 2 * dt
}

// TODO: Event emitter for when animation ends ?
