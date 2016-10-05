var test = require('tape')
var animationSystem = require('../')

// TODO: Thoroughly comment tests. Hard to understand without more context
test('Blend out previous animation', function (t) {
  var options = {
    // Our application clock has been running for 100.5 seconds
    currentTime: 100.5,
    // TODO: Don't use same matrices in keyframes
    keyframes: {
      '0': {
        'hip': [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
      },
      '5.0': {
        'hip': [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1]
      },
      '8.0': {
        'hip': [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 2, 2, 2, 1]
      }
    },
    jointNames: ['hip'],
    currentAnimation: {
      range: [1, 2],
      // Our new animation has been playing for 1.5 seconds
      //  This means that it is halfway done
      startTime: 99.0
    },
    previousAnimation: {
      range: [0, 1],
      // Our previous animation started 2.5 seconds before our current time
      //  This means that it has (5.0 - 2.5) seconds remaining
      startTime: 98.0
    }
  }

  var interpolatedJoints = animationSystem.interpolateJoints(options)

  t.deepEqual(
    interpolatedJoints['hip'],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1.25, 1.25, 1.25, 1],
    'Uses default 2 second linear blend'
  )
  t.end()
})
