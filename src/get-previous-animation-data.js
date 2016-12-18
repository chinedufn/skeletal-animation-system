module.exports = getPreviousAnimationData

function getPreviousAnimationData (opts, keyframeTimes) {
  var prevAnimElapsedTime = opts.currentTime - opts.previousAnimation.startTime
  var previousAnimLowerKeyframe
  var previousAnimUpperKeyframe

  var previousKeyframeTimes = keyframeTimes.slice(
    opts.previousAnimation.range[0],
    opts.previousAnimation.range[1] + 1
  )

  // The amount of time that the previous animation was running before the new animation began
  //  during this time it is okay to loop the animation
  // TODO: Better naming
  var leway = opts.currentAnimation.startTime - opts.previousAnimation.startTime
  var currentAnimTimeElapsed = opts.currentTime - opts.currentAnimation.startTime

  // TODO: My mind is jelly but the tests have passed... Refactor this!
  var prevAnimTimeRelToFirstFrame = Number(previousKeyframeTimes[0]) + Number(prevAnimElapsedTime)
  if (prevAnimTimeRelToFirstFrame - leway > previousKeyframeTimes[previousKeyframeTimes.length - 1]) {
    previousAnimLowerKeyframe = previousAnimUpperKeyframe = previousKeyframeTimes[previousKeyframeTimes.length - 1]
    prevAnimElapsedTime = 0
  } else {
    prevAnimTimeRelToFirstFrame = Number(previousKeyframeTimes[0]) + Number(prevAnimElapsedTime)
    var range = previousKeyframeTimes[previousKeyframeTimes.length - 1] - previousKeyframeTimes[0]
    if (prevAnimTimeRelToFirstFrame > range) {
      if (leway > range) {
        var lewayStart = leway % range
        if (lewayStart + currentAnimTimeElapsed > previousKeyframeTimes[previousKeyframeTimes.length - 1]) {
          previousAnimLowerKeyframe = previousAnimUpperKeyframe = previousKeyframeTimes[previousKeyframeTimes.length - 1]
          prevAnimElapsedTime = 0
        } else {
          prevAnimElapsedTime = prevAnimElapsedTime % range
          prevAnimTimeRelToFirstFrame = prevAnimElapsedTime + Number(previousKeyframeTimes[0])
        }
      } else {
        prevAnimElapsedTime = prevAnimElapsedTime % range
        prevAnimTimeRelToFirstFrame = prevAnimElapsedTime + Number(previousKeyframeTimes[0])
      }
    }

    // Get the surrounding keyframes for our previous animation
    previousKeyframeTimes.forEach(function (keyframeTime) {
      if (previousAnimLowerKeyframe && previousAnimUpperKeyframe) { return }
      if (prevAnimTimeRelToFirstFrame > keyframeTime) {
        previousAnimLowerKeyframe = keyframeTime
      }
      if (prevAnimTimeRelToFirstFrame < keyframeTime) {
        previousAnimUpperKeyframe = keyframeTime
      }
    })
  }
  prevAnimElapsedTime = prevAnimTimeRelToFirstFrame - previousAnimLowerKeyframe

  return {
    lower: previousAnimLowerKeyframe,
    upper: previousAnimUpperKeyframe,
    elapsedTime: prevAnimElapsedTime
  }
}
