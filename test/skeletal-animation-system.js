var test = require('tape')
var animationSystem = require('../')

test('Animate without blending previous animation', function (t) {
  var options = {
    // Our application clock has been running for 1.5 seconds
    //  which is 3/4 of the curent animations duration
    currentTime: 1.5,
    // TODO: Don't use same matrices in keyframes
    keyframes: {
      '0': {
        'hip': [0, 0, 0, 0, 1, 1, 1, 1]
      },
      '2': {
        'hip': [1, 1, 1, 1, 0, 0, 0, 0]
      }
    },
    jointNames: ['hip'],
    currentAnimation: {
      range: [0, 1],
      startTime: 0
    }
  }

  var interpolatedJoints = animationSystem.interpolateJoints(options)

  t.deepEqual(
    interpolatedJoints['hip'],
    [0.75, 0.75, 0.75, 0.75, 0.25, 0.25, 0.25, 0.25],
    'Interpolated the passed in joint'
  )
  t.end()
})

// TODO: Test looping
