module.exports = getPreviousAnimationData

function getPreviousAnimationData (opts, keyframeTimes) {
  var prevAnimElapsedTime = opts.currentTime - opts.previousAnimation.startTime
  var previousAnimLowerKeyframe
  var previousAnimUpperKeyframe

  var previousKeyframeTimes = keyframeTimes.slice(
    opts.previousAnimation.range[0],
    opts.previousAnimation.range[1] + 1
  )

  var prevAnimTimeRelToFirstFrame = Number(previousKeyframeTimes[0]) + Number(prevAnimElapsedTime)
  if (prevAnimTimeRelToFirstFrame > previousKeyframeTimes[previousKeyframeTimes.length - 1]) {
    previousAnimLowerKeyframe = previousAnimUpperKeyframe = previousKeyframeTimes[previousKeyframeTimes.length - 1]
    prevAnimElapsedTime = 0
  } else {
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

  return {
    lower: previousAnimLowerKeyframe,
    upper: previousAnimUpperKeyframe,
    elapsedTime: prevAnimElapsedTime
  }
}
