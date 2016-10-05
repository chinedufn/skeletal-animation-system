var test = require('tape')
var animationSystem = require('../')

test('Animate without blending previous animation', function (t) {
  var options = {
    currentTime: 1.5,
    // TODO: Don't use same matrices in keyframes
    keyframes: {
      '0': {
        'hip': [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
      },
      '2': {
        'hip': [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1]
      }
    },
    jointNames: ['hip'],
    currentAnimation: {
      range: [0, 1],
      startTime: 0
    }
  }

  var interpolatedJoints = animationSystem.interpolateJoints(options)

  t.deepEqual(interpolatedJoints['hip'], [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.75, 0.75, 0.75, 1], 'Interpolated the passed in joint')
  t.end()
})

// TODO: Test looping

// TODO: Test blending
