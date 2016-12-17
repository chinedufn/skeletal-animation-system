var test = require('tape')
var animationSystem = require('../')

test('Animate without blending previous animation', function (t) {
  var options = {
    // Our application clock has been running for 1.5 seconds
    //  which is 3/4 of the curent animations duration
    currentTime: 1.5,
    // TODO: Don't use same matrices in keyframes
    keyframes: {
      '0': [
        [0, 0, 0, 0, 1, 1, 1, 1]
      ],
      '2': [
        [1, 1, 1, 1, 0, 0, 0, 0]
      ]
    },
    jointNums: [0],
    currentAnimation: {
      range: [0, 1],
      startTime: 0
    }
  }

  var interpolatedJoints = animationSystem.interpolateJoints(options)

  t.deepEqual(
    interpolatedJoints[0],
    [0.75, 0.75, 0.75, 0.75, 0.25, 0.25, 0.25, 0.25],
    'Interpolated the passed in joint'
  )
  t.end()
})

// TODO: Test looping
test('Looping animation', function (t) {
  var options = {
    // Our application clock has been running for 1.5 seconds
    //  which is 3/4 of the curent animations duration
    currentTime: 4.0,
    // TODO: Don't use same matrices in keyframes
    keyframes: {
      '1': [
        [0, 0, 0, 0, 1, 1, 1, 1]
      ],
      '3': [
        [1, 1, 1, 1, 0, 0, 0, 0]
      ]
    },
    jointNums: [0],
    currentAnimation: {
      range: [0, 1],
      startTime: 0.0
    }
  }

  var interpolatedJoints = animationSystem.interpolateJoints(options)

  t.deepEqual(
    interpolatedJoints[0],
    [1, 1, 1, 1, 0, 0, 0, 0],
    'Loop is frame is outside of provided frame range'
  )
  t.end()
})

// In this case we should start from the lowest frame as zero
// in the future we might add a flag to actually treat the lowest
// frame as the number specified. But since Blender defaults to frame
// `1` it's too easy to accidentally not start at zero
test('Current time lower than first keyframe', function (t) {
  var options = {
    // Our application clock has been running for 1.5 seconds
    //  which is 3/4 of the curent animations duration
    currentTime: 0.0,
    // TODO: Don't use same matrices in keyframes
    keyframes: {
      '1': [
        [0, 0, 0, 0, 1, 1, 1, 1]
      ],
      '3': [
        [1, 1, 1, 1, 0, 0, 0, 0]
      ]
    },
    jointNums: [0],
    currentAnimation: {
      range: [0, 1],
      startTime: 0.0
    }
  }

  var interpolatedJoints = animationSystem.interpolateJoints(options)

  t.deepEqual(
    interpolatedJoints[0],
    [0, 0, 0, 0, 1, 1, 1, 1],
    'Current frame is an exact match of a passed in keyframe'
  )
  t.end()
})
