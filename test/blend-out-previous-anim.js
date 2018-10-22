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

test.only('single frame animations', function (t) {
  var options = {
    currentTime: 0.016666666666666666,
    jointNums: [
      0,
      3,
      8,
      5,
      10,
      2,
      7,
      23,
      25,
      22,
      24,
      11
    ],
    currentAnimation: {
      keyframes: {
        '0.0': [
          [-7.278466024329688e-14, 2.0600566680306368e-10, -5.126635227448162e-12, 1, 5.187854313327257e-18, -8.827153992227743e-19, 2.7275390652703847e-16, 1.580531756253426e-27],
          [-2.638234361324749e-14, -1.9854463795120477e-13, -2.1968254906162832e-11, 1, -4.5048562835195434e-07, -1.857223468447898e-07, -3.034722995927766e-12, -4.8825710322101963e-20],
          [-2.6979145097915913e-16, 4.297245713269681e-15, -9.233395882433746e-17, 1, 2.63843515924125e-08, -2.7750980713392437e-07, -5.026025462484536e-08, 1.1950053733147823e-21],
          [1.336916834578989e-16, 2.0439501910776285e-15, 4.346651223051322e-15, 1, -2.4589281322206994e-07, 1.18713693098017e-07, -5.0062948453444794e-08, 7.83512458335559e-24],
          [6.309570921292362e-12, -2.8919142234173304e-13, 2.6934460148613386e-12, 1, -5.8802839486796815e-08, -8.665459305658863e-08, -1.0831289087289932e-08, 3.7513441352480876e-19],
          [2.2135147742519128e-09, 1.0640563723098712e-10, 1.0714871481395938e-11, 1, -1.893376557811186e-07, 8.806961048758808e-09, 4.898491586168799e-08, 4.176397210132825e-16],
          [-1.7564237492064438e-14, -9.641521491423786e-15, -2.2861900733802103e-12, 1, -3.477250478665568e-07, -7.643267796532798e-08, 1.110249794026799e-13, -6.844198805711653e-21],
          [-2.6979145097915913e-16, 4.297245713269681e-15, -9.233395882433746e-17, 1, -2.1108862657825776e-07, -4.2864789939755966e-08, -4.428160931269085e-07, 8.636366505954165e-23],
          [1.164984836248225e-15, -1.1290180636849088e-14, 6.374562645663669e-18, 1, 2.3878794408460545e-07, -6.958887244223889e-07, -7.95658490204706e-08, -8.134386538323685e-21],
          [1.3804235532433042e-12, -6.399531952809307e-14, 2.5292718325287383e-12, 1, 2.688165809948702e-07, -4.3465648636550925e-08, 1.1965405000189997e-08, -4.0412609981242625e-19],
          [1.468792795722429e-10, 5.1597095194512443e-11, 3.874773765732975e-13, 1, -3.7488197479487276e-07, 1.1751553951821056e-07, -2.4487732545008167e-08, 4.9008422345499805e-17],
          [-9.372229806136314e-16, 8.887443171182299e-15, 3.665454244390872e-17, 1, 8.568768282868062e-15, -4.6566341893594654e-08, -3.4918727909172714e-09, 4.139837182994379e-22],
          [2.1683422071760994e-10, -1.6242240842220812e-12, 2.6426648033501393e-11, 1, 9.35293593280529e-11, -2.4052579483567623e-07, 5.189158044345511e-09, -5.480802078210113e-19],
          [-1.5289496491793786e-10, -3.721566349361438e-12, -5.2591386171511494e-11, 1, -9.366234881041007e-09, 5.190031195947218e-07, -1.9071331046054193e-08, -5.035333443003764e-19],
          [0.02201697887264772, -0.05958454916671287, 0.0019345566501361331, 0.9979785526962436, 0.021306996939074972, -0.025141848652287326, -1.0167879568417408, -1.4781372258089107e-07],
          [0.02201714522292771, -0.05958455653126655, 0.001933670096478435, 0.997978550324816, 0.02127958468507502, -0.02512856416689115, -1.0167933474462274, 3.535464848350607e-07],
          [0.02201674413340719, -0.05958468759240383, 0.0019330692828658106, 0.9979785524695964, 0.021266870674705528, -0.02512205298239059, -1.016789679018675, 4.0879320118217266e-07],
          [0.022016746664961506, -0.05958468914747156, 0.0019330696047947912, 0.9979785522172074, 0.021267531779434946, -0.025120968728307602, -1.0167898703902813, 4.595497340789678e-07],
          [0.029717182200723127, 0.08042351374818237, -0.0026090012163619792, 0.9963142781278806, -0.028697934873249148, -0.03392198462947967, -1.3723977417118, 3.609093804971507e-07],
          [0.02971715068298895, 0.08042352786254535, -0.002609225678170218, 0.9963142774705802, -0.028701755132092818, -0.033920872017110935, -1.3723954077784979, 8.153987140786106e-08],
          [0.029717182611439602, 0.08042352882678015, -0.002609309251838454, 0.9963142761393641, -0.028702338665533123, -0.033923207063212196, -1.372396914491221, 1.693185289609704e-07],
          [0.029717181859888787, 0.08042352798737053, -0.002609308564041277, 0.9963142760730823, -0.02870204801768879, -0.033920519952130496, -1.3723972012363463, -5.611085214301745e-08],
          [-1.9711837954722828e-06, -3.189094854450778e-07, -8.682449417259785e-08, 0.9999999999980026, -2.6637971413096116e-06, -6.016452474043942e-06, 2.298668809996214e-05, -5.173729955104862e-12],
          [1.3569072055698953e-06, -3.1070069086836924e-07, 1.283463409337682e-08, 0.999999999999031, -1.5781452935540596e-06, 5.394906139818963e-06, -1.1230015308757945e-05, 3.961730922426248e-12],
          [-8.678879410837294e-07, 1.667222227081475e-07, 4.0975515282914374e-08, 0.9999999999996086, 1.3227815586853774e-06, -2.6023759065235345e-06, 9.93670221028485e-06, 1.1747385656498766e-12],
          [1.0161697158733558e-06, 1.6442014968290737e-07, -3.21235352606673e-08, 0.9999999999994696, 7.48762917487542e-07, 3.269295837403037e-06, -8.674296855304534e-06, -1.5770573929570408e-12]
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
