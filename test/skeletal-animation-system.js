var test = require('tape')
var animationSystem = require('../')

test('Animate without blending previous animation', function (t) {
  var options = {
    // Our application clock has been running for 1.5 seconds
    //  which is 3/4 of the curent animations duration
    currentTime: 1.5,
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

test('Chooses proper minimum and maximum keyframe', function (t) {
  var options = {
    currentTime: 1.5,
    keyframes: {
      '1.0': [
        [100, 100, 100, 100, 100, 100, 100, 100]
      ],
      // Correct lower
      '2.0': [
        [0, 0, 0, 0, 1, 1, 1, 1]
      ],
      // Correct upper
      '4.0': [
        [1, 1, 1, 1, 0, 0, 0, 0]
      ],
      '200': [
        [1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000]
      ]
    },
    jointNums: [0],
    currentAnimation: {
      range: [0, 3],
      startTime: 0
    }
  }

  var interpolatedJoints = animationSystem.interpolateJoints(options)

  t.deepEqual(
    interpolatedJoints[0],
    [0.25, 0.25, 0.25, 0.25, 0.75, 0.75, 0.75, 0.75],
    'Chooses correct maximum keyframe'
  )
  t.end()
})

// TODO: Test looping
test('Looping animation', function (t) {
  var options = {
    currentTime: 4.0,
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
    currentTime: 0.0,
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
