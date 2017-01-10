var blendDualQuaternions = require('./blend-dual-quaternions.js')

module.exports = {
  interpolateJoints: interpolateJoints
}

// TODO: Add thorough comments
// TODO: Refactor now that tests are passing
// TODO: Benchmark perf
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
  // TODO: acc is a bad variable name. Renaame it
  var interpolatedJoints = opts.jointNums.reduce(function (acc, jointName) {
    // If there is a previous animation
    // TODO: don't blend if blend is > 1
    var blend = (opts.blendFunction || defaultBlend)(opts.currentTime - opts.currentAnimation.startTime)
    if (opts.previousAnimation && blend < 1) {
      var previousAnimJointDualQuat
      var currentAnimJointDualQuat

      if (previousAnimLowerKeyframe === previousAnimUpperKeyframe) {
        // If our current frame happens to be one of our defined keyframes we use the existing frame
        previousAnimJointDualQuat = opts.keyframes[previousAnimLowerKeyframe][jointName]
      } else {
        // Blend the dual quaternions for our previous animation that we are about to blend out
        previousAnimJointDualQuat = blendDualQuaternions(
          opts.keyframes[previousAnimLowerKeyframe][jointName],
          opts.keyframes[previousAnimUpperKeyframe][jointName],
          prevAnimElapsedTime / (previousAnimUpperKeyframe - previousAnimLowerKeyframe)
        )
      }

      if (currentAnimLowerKeyframe === currentAnimUpperKeyframe) {
        // If our current frame happens to be one of our defined keyframes we use the existing frame
        currentAnimJointDualQuat = opts.keyframes[currentAnimLowerKeyframe][jointName]
      } else {
        currentAnimJointDualQuat = blendDualQuaternions(
          opts.keyframes[currentAnimLowerKeyframe][jointName],
          opts.keyframes[currentAnimUpperKeyframe][jointName],
          currentAnimElapsedTime / (currentAnimUpperKeyframe - currentAnimLowerKeyframe)
        )
      }

      acc[jointName] = blendDualQuaternions(previousAnimJointDualQuat, currentAnimJointDualQuat, blend)
    } else {
      // If we are on an exact, pre-defined keyframe there is no need to blend
      if (currentAnimUpperKeyframe === currentAnimLowerKeyframe) {
        acc[jointName] = opts.keyframes[currentAnimLowerKeyframe][jointName]
      } else {
        // Blend the two dual quaternions based on where we are in the current keyframe
        acc[jointName] = blendDualQuaternions(
          // The defined keyframe right below our current frame
          opts.keyframes[currentAnimLowerKeyframe][jointName],
          // The defined keyframe right above our current frame
          opts.keyframes[currentAnimUpperKeyframe][jointName],
          currentAnimElapsedTime / (currentAnimUpperKeyframe - currentAnimLowerKeyframe)
        )
      }
    }
    return acc
  }, {})

  // Return the freshly interpolated dual quaternions for each of the joints that were passed in
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
