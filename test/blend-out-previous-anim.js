var test = require('tape')
var animationSystem = require('../')

// Blend linearly over 2 seconds
function blendFunction (dt) {
  return 0.5 * dt
}

// TODO: Thoroughly comment tests. Hard to understand without more context
test('Blend out previous animation', function (t) {
  var currentKeyframes = {
    '5.0': [
      [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5]
    ],
    '8.0': [
      [1, 1, 1, 1, 1, 1, 1, 1]
    ]
  }

  var previousKeyframes = {
    '0': [
      [0, 0, 0, 0, 0, 0, 0, 0]
    ],
    '5.0': [
      [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5]
    ]
  }

  var options = {
    // Our application clock has been running for 100.5 seconds
    blendFunction: blendFunction,
    currentTime: 100.5,
    jointNums: [0],
    currentAnimation: {
      keyframes: currentKeyframes,
      // Our new animation has been playing for 1.5 seconds
      //  This means that it is halfway done
      //  Making it's dual quaternion:
      //  [0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75]
      startTime: 99.0
    },
    previousAnimation: {
      keyframes: previousKeyframes,
      // Our previous animation started 2.5 seconds before our current time
      //  This means that it has (5.0 - 2.5) seconds remaining
      //  Making it's dual quaternion:
      //  [0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25]
      startTime: 98.0
    }
  }

  var interpolatedJoints = animationSystem.interpolateJoints(options).joints

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

test('Blending while passed previous animations upper keyframe', function (t) {
  var currentKeyframes = {
    '1.0': [
      [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5]
    ],
    '4.0': [
      [1, 1, 1, 1, 1, 1, 1, 1]
    ]
  }

  var previousKeyframes = {
    '0': [
      [0, 0, 0, 0, 0, 0, 0, 0]
    ],
    '1.0': [
      [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5]
    ]
  }

  var options = {
    blendFunction: blendFunction,
    // Our application clock has been running for 100.5 seconds
    currentTime: 100.5,
    jointNums: [0],
    currentAnimation: {
      keyframes: currentKeyframes,
      // Our new animation has been playing for 1.5 seconds
      //  This means that it is halfway done
      //  Making it's dual quaternion:
      //  [0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75]
      startTime: 99.0
    },
    previousAnimation: {
      keyframes: previousKeyframes,
      // Our previous animation started 1.5 seconds before our current time
      //   Meaning that it has passed it's final frame of 1.0. It should not loop
      //   if it's being blended. We will use it's final frame
      //   Making it's dual quaternion:
      //   [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5]
      startTime: 99.0
    }
  }

  var interpolatedJoints = animationSystem.interpolateJoints(options).joints

  t.deepEqual(
    interpolatedJoints[0],
    // Our new animation has been playing for 1.5 seconds
    //  This means that it should have 3/4th of the dual quaternion weight
    //  3/4th of the way between 0.25 and 0.75 = 0.625
    [0.6875, 0.6875, 0.6875, 0.6875, 0.6875, 0.6875, 0.6875, 0.6875],
    `Uses the previous animations final keyframe when blending if
    the previous animation has elapsed but there is still blend time remaining`
  )
  t.end()
})

test('Blend is above 100% complete', function (t) {
  var currentKeyframes = {
    '5.0': [
      [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5]
    ],
    '10.0': [
      [1, 1, 1, 1, 1, 1, 1, 1]
    ]
  }

  var previousKeyframes = {
    '0': [
      [0, 0, 0, 0, 0, 0, 0, 0]
    ],
    '5.0': [
      [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5]
    ]
  }

  var options = {
    blendFunction: blendFunction,
    // Our application clock has been running for 100.5 seconds
    currentTime: 101.5,
    jointNums: [0],
    currentAnimation: {
      keyframes: currentKeyframes,
      // Our new animation has been playing for 2.5 seconds
      //  This means that it is halfway done
      //  Making it's dual quaternion:
      //  [0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75]
      startTime: 99.0
    },
    previousAnimation: {
      keyframes: previousKeyframes,
      // Our previous animation started 2.5 seconds before our current time
      //  This means that it has (5.0 - 2.5) seconds remaining
      //  Making it's dual quaternion:
      //  [0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25]
      startTime: 99.0
    }
  }

  var interpolatedJoints = animationSystem.interpolateJoints(options).joints

  t.deepEqual(
    interpolatedJoints[0],
    // Our new animation has been playing for 1.5 seconds
    //  This means that it should have 3/4th of the dual quaternion weight
    //  3/4th of the way between 0.25 and 0.75 = 0.625
    [0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75],
    'Ignores previous animation if blend above 100%'
  )
  t.end()
})

test('Blends using time since current animation frame set began', function (t) {
  var currentKeyframes = {
    '5.0': [
      [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5]
    ],
    '6.0': [
      [1, 1, 1, 1, 1, 1, 1, 1]
    ],
    '7.0': [
      [3, 3, 3, 3, 3, 3, 3, 3]
    ]
  }

  var previousKeyframes = {
    '1': [
      [-0.5, -0.5, -0.5, -0.5, -0.5, -0.5, -0.5, -0.5]
    ],
    '5.0': [
      [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5]
    ]
  }

  var options = {
    blendFunction: blendFunction,
    // Our application clock has been running for 100.5 seconds
    currentTime: 100.5,
    jointNums: [0],
    currentAnimation: {
      keyframes: currentKeyframes,
      // Our new animation has been playing for 1.5 seconds
      //  Making it's dual quaternion:
      //  [2, 2, 2, 2, 2, 2, 2, 2]
      startTime: 99.0
    },
    previousAnimation: {
      keyframes: previousKeyframes,
      // Our previous animation started 2 seconds before our current time
      //  Making it's dual quaternion:
      //  [0, 0, 0, 0, 0, 0, 0, 0]
      startTime: 98.5
    }
  }

  var interpolatedJoints = animationSystem.interpolateJoints(options).joints

  t.deepEqual(
    interpolatedJoints[0],
    // This is 1.625 because we negate one of the dual quats to ensure shortest path interpolation
    [1.625, 1.625, 1.625, 1.625, 1.625, 1.625, 1.625, 1.625],
    'Blends using time since current animation frame set first started'
  )
  t.end()
})

test('Previous animation in middle of loop', function (t) {
  var currentKeyframes = {
    '2.0': [
      [2, 2, 2, 2, 2, 2, 2, 2]
    ],
    '3.0': [
      [4, 4, 4, 4, 4, 4, 4, 4]
    ]
  }

  var previousKeyframes = {
    '0': [
      [0, 0, 0, 0, 0, 0, 0, 0]
    ],
    '2.0': [
      [2, 2, 2, 2, 2, 2, 2, 2]
    ]
  }

  var options = {
    blendFunction: blendFunction,
    // Our application clock has been running for 100.5 seconds
    currentTime: 101,
    jointNums: [0],
    currentAnimation: {
      keyframes: currentKeyframes,
      // TODO: Change all "frames" to "seconds". We're dealing with seconds
      // as our keyframe key
      // Our new animation has been playing for 0.5 seconds
      //  Making it's dual quaternion:
      //  [3, 3, 3, 3, 3, 3, 3, 3]
      startTime: 100.5
    },
    previousAnimation: {
      keyframes: previousKeyframes,
      // Our previous animation has been playing for 3 seconds
      //  Making it's dual quaternion:
      //  [1, 1, 1, 1, 1, 1, 1, 1]
      startTime: 98.0
    }
  }

  var interpolatedJoints = animationSystem.interpolateJoints(options).joints

  t.deepEqual(
    interpolatedJoints[0],
    [1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5],
    'Supports looping when previous animation started before current'
  )
  t.end()
})

test('Previous animation started in middle of loop but now passed final frame', function (t) {
  var currentKeyframes = {
    '1.0': [
      [2, 2, 2, 2, 2, 2, 2, 2]
    ],
    '3.0': [
      [4, 4, 4, 4, 4, 4, 4, 4]
    ]
  }

  var previousKeyframes = {
    '0': [
      [0, 0, 0, 0, 0, 0, 0, 0]
    ],
    '1.0': [
      [2, 2, 2, 2, 2, 2, 2, 2]
    ]
  }

  var options = {
    blendFunction: blendFunction,
    // Our application clock has been running for 100.5 seconds
    currentTime: 102.5,
    jointNums: [0],
    currentAnimation: {
      keyframes: currentKeyframes,
      // TODO: Change all of the "seconds" to frames
      // Our new animation has been playing for 1.0 seconds
      //  Making it's dual quaternion:
      //  [3, 3, 3, 3, 3, 3, 3, 3]
      startTime: 101.5
    },
    previousAnimation: {
      keyframes: previousKeyframes,
      // Our previous animation has been playing for 2.5 frames,
      //  but only 1 frame since the new animation started
      //  This means that it has hit it's final frame and should
      //  no longer loop.
      startTime: 100
    }
  }

  var interpolatedJoints = animationSystem.interpolateJoints(options).joints

  t.deepEqual(
    interpolatedJoints[0],
    [2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5],
    'Supports looping when previous animation started before current'
  )
  t.end()
})

// Test that previous animation elapsed time is properly calculated against
// the lowest keyframe
test('Previous animation elapsed time when previous animation starts from non first keyframe in set', function (t) {
  var currentKeyframes = {
    '6.0': [
      [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5]
    ],
    '9.0': [
      [1, 1, 1, 1, 1, 1, 1, 1]
    ]
  }

  var previousKeyframes = {
    '0': [
      [100, 100, 100, 100, 100, 100, 100, 100]
    ],
    '1': [
      [0, 0, 0, 0, 0, 0, 0, 0]
    ],
    '6.0': [
      [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5]
    ]
  }

  var options = {
    blendFunction: blendFunction,
    // Our application clock has been running for 100.5 seconds
    currentTime: 100.5,
    jointNums: [0],
    currentAnimation: {
      keyframes: currentKeyframes,
      // Our new animation has been playing for 1.5 seconds
      //  This means that it is halfway done
      //  Making it's dual quaternion:
      //  [0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75]
      startTime: 99.0
    },
    previousAnimation: {
      keyframes: previousKeyframes,
      // Our previous animation started 3.5 seconds before our current time
      //  Making it's dual quaternion:
      //  [0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25]
      startTime: 97.0
    }
  }

  var interpolatedJoints = animationSystem.interpolateJoints(options).joints

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

// If there are multiple keyframes above our previous animation's
// current keyframe it should be sure to chose the correct one
test('Multiple keyframes larger than the current one', function (t) {
  var currentKeyframes = {
    '10.0': [
      [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5]
    ],
    '13.0': [
      [1, 1, 1, 1, 1, 1, 1, 1]
    ]
  }

  var previousKeyframes = {
    '0': [
      [0, 0, 0, 0, 0, 0, 0, 0]
    ],
    '5.0': [
      [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5]
    ],
    '8.0': [
      [100, 100, 100, 100, 100, 100, 100, 100]
    ]
  }

  var options = {
    blendFunction: blendFunction,
    // Our application clock has been running for 100.5 seconds
    currentTime: 100.5,
    jointNums: [0],
    currentAnimation: {
      keyframes: currentKeyframes,
      // Our new animation has been playing for 1.5 seconds
      //  This means that it is halfway done
      //  Making it's dual quaternion:
      //  [0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75]
      startTime: 99.0
    },
    previousAnimation: {
      keyframes: previousKeyframes,
      // Our previous animation started 2.5 seconds before our current time
      //  This means that it has (5.0 - 2.5) seconds remaining
      //  Making it's dual quaternion:
      //  [0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25]
      startTime: 98.0
    }
  }

  var interpolatedJoints = animationSystem.interpolateJoints(options).joints

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

test('single frame animations', function (t) {
  var options = {
    currentTime: 0.016666666666666666,
    jointNums: [
      0
    ],
    currentAnimation: {
      keyframes: {
        '0.0': [
          [-7.278466024329688e-14, 2.0600566680306368e-10, -5.126635227448162e-12, 1, 5.187854313327257e-18, -8.827153992227743e-19, 2.7275390652703847e-16, 1.580531756253426e-27]
        ]
      },
      startTime: 0,
      noLoop: false
    }
  }

  t.doesNotThrow(function () {
    animationSystem.interpolateJoints(options)
  }, 'interpolateJoints should not throw')
  t.end()
})
