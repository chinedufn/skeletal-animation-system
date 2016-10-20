var test = require('tape')
var animationSystem = require('../')

// TODO: Thoroughly comment tests. Hard to understand without more context
test('Blend out previous animation', function (t) {
  var options = {
    // Our application clock has been running for 100.5 seconds
    currentTime: 100.5,
    keyframes: {
      '0': [
        [0, 0, 0, 0, 0, 0, 0, 0]
      ],
      '5.0': [
        [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5]
      ],
      '8.0': [
        [1, 1, 1, 1, 1, 1, 1, 1]
      ]
    },
    jointNums: [0],
    currentAnimation: {
      range: [1, 2],
      // Our new animation has been playing for 1.5 seconds
      //  This means that it is halfway done
      //  Making it's dual quaternion:
      //  [0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75]
      startTime: 99.0
    },
    previousAnimation: {
      range: [0, 1],
      // Our previous animation started 2.5 seconds before our current time
      //  This means that it has (5.0 - 2.5) seconds remaining
      //  Making it's dual quaternion:
      //  [0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25]
      startTime: 98.0
    }
  }

  var interpolatedJoints = animationSystem.interpolateJoints(options)

  t.deepEqual(
    interpolatedJoints[0],
    // Our new animation has been playing for 1.5 seconds
    //  This means that it should have 3/4th of the dual quaternion weight
    //  3/4th of the way between 0.25 and 0.75 = 0.625
    [0.625, 0.625, 0.625, 0.625, 0.625, 0.625, 0.625, 0.625],
    'Uses default 2 second linear blend'
  )
  t.end()
})
