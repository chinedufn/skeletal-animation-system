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

  var interpolatedJoints = animationSystem.interpolateJoints(options).joints

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

  var interpolatedJoints = animationSystem.interpolateJoints(options).joints

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

  var interpolatedJoints = animationSystem.interpolateJoints(options).joints

  t.deepEqual(
    interpolatedJoints[0],
    [0, 0, 0, 0, 1, 1, 1, 1],
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

  var interpolatedJoints = animationSystem.interpolateJoints(options).joints

  t.deepEqual(
    interpolatedJoints[0],
    [0, 0, 0, 0, 1, 1, 1, 1],
    'Current frame is an exact match of a passed in keyframe'
  )
  t.end()
})

// In this case we should start from the lowest frame as zero
// in the future we might add a flag to actually treat the lowest
// frame as the number specified. But since Blender defaults to frame
// `1` it's too easy to accidentally not start at zero
test('Looping when not using lowest keyframe range', function (t) {
  var options = {
    currentTime: 7.0,
    keyframes: {
      '1': [
        [0, 0, 0, 0, 1, 1, 1, 1]
      ],
      '3': [
        [1, 1, 1, 1, 0, 0, 0, 0]
      ],
      '5': [
        [3, 3, 3, 3, 1, 1, 1, 1]
      ],
      '7': [
        [1, 1, 1, 1, 0, 0, 0, 0]
      ]
    },
    jointNums: [0],
    currentAnimation: {
      range: [1, 2],
      startTime: 0.0
    }
  }

  var interpolatedJoints = animationSystem.interpolateJoints(options).joints

  t.deepEqual(
    interpolatedJoints[0],
    [2, 2, 2, 2, 0.5, 0.5, 0.5, 0.5],
    'Properly loops the specified upper and lower keyframes'
  )
  t.end()
})

// The noLoop flag is useful for animations that shouldn't repeat. For example,
// you'll likely want a walk animation to loop as your player walks,
// but it is unlikely that you will want a punch animation to loop
// (assuming your player only punched once)
test('Playing a non looping animation', function (t) {
  var options = {
    currentTime: 7.0,
    keyframes: {
      '1': [
        [0, 0, 0, 0, 1, 1, 1, 1]
      ],
      '3': [
        [1, 1, 1, 1, 0, 0, 0, 0]
      ],
      '5': [
        [3, 3, 3, 3, 1, 1, 1, 1]
      ],
      '7': [
        [1, 1, 1, 1, 0, 0, 0, 0]
      ]
    },
    jointNums: [0],
    currentAnimation: {
      // Lowest keyframe is '3' highest keyframe is '5'
      range: [1, 2],
      startTime: 0.0,
      // Notice that we are passing in `noLoop` in this test
      noLoop: true
    }
  }

  var interpolatedJoints = animationSystem.interpolateJoints(options).joints

  t.deepEqual(
    interpolatedJoints[0],
    // Our highest keyframe is '5'. Since we aren't looping that's where we
    // should end
    [3, 3, 3, 3, 1, 1, 1, 1],
    'Bound to highest keyframe when `noLoop` is true'
  )
  t.end()
})

// This is useful for knowing to play an animation on a certain keyframe
// for example, you might keep track of the previous lower keyframe, and whenever
// the new lower keyframe is different from the previous one and greater than a
// certain value you might play a sound.
// i.e. let's say keyframe #6 is when your ax hits a tree.
// you might then play a sound if your lower keyframe is keyframe 6 and your previous lower
// keyframe is not 6, because this means that you are crossing keyframe 6 for
// the first time
// All of this is handled outside of skeletal-animation-system, skeletal-animation-system
// only concerns itself with letting you know the current lower keyframe
test('Information about the frames that were sampled', function (t) {
  var options = {
    currentTime: 7.0,
    keyframes: {
      '0': [
        [0, 0, 0, 0, 1, 1, 1, 1]
      ],
      '2.222': [
        [1, 1, 1, 1, 0, 0, 0, 0]
      ],
      '5': [
        [3, 3, 3, 3, 1, 1, 1, 1]
      ],
      '7': [
        [1, 1, 1, 1, 0, 0, 0, 0]
      ]
    },
    jointNums: [0],
    currentAnimation: {
      // Lowest keyframe is '3' highest keyframe is '5'
      range: [0, 3],
      startTime: 0.0
    }
  }

  var currentAnimationInfoExact = animationSystem.interpolateJoints(options).currentAnimationInfo

  // We are 7 seconds into our animation which is exactly frame #3 so our lower and upper are exactly 3
  t.equal(currentAnimationInfoExact.lowerKeyframeNumber, 3, 'Returns correct lower keyframe (On an exact frame)')
  t.equal(currentAnimationInfoExact.upperKeyframeNumber, 3, 'Returns correct upper keyframe (On an exact frame)')

  options.currentTime = 6.9
  var currentAnimationInfoNonExact = animationSystem.interpolateJoints(options).currentAnimationInfo

  // We are 6.9 seconds into our animation so lower frame is 2 and upper frame is 3
  t.equal(currentAnimationInfoNonExact.lowerKeyframeNumber, 2, 'Returns correct lower keyframe (non exact frame time)')
  t.equal(currentAnimationInfoNonExact.upperKeyframeNumber, 3, 'Returns correct upper keyframe (non exact frame time)')

  t.end()
})
