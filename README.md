skeletal-animation-system [![npm version](https://badge.fury.io/js/skeletal-animation-system.svg)](http://badge.fury.io/js/skeletal-animation-system) [![Build Status](https://travis-ci.org/chinedufn/skeletal-animation-system.svg?branch=master)](https://travis-ci.org/chinedufn/skeletal-animation-system)
===============

> A standalone, stateless, dual quaternion based skeletal animation system built with interactive applications in mind

[View live demo](http://chinedufn.github.io/skeletal-animation-system/)

TODO: Create a demo site instead of just a demo. Embed a demo inside of the demo site

## Tutorials

[WebGL Skeletal Animation Sound Effects Tutorial](http://chinedufn.com/webgl-skeletal-animation-sound-effect-tutorial/)

[Attaching objects to bones](http://chinedufn.com/attaching-objects-to-bones/)

[WebGL Skeletal Animation Tutorial](http://chinedufn.com/webgl-skeletal-animation-tutorial)

## Background / Initial Motivation

skeletal-animation-system aims to give the user a flexible module for managing skeletal animations across different 3d models and bone groups.

`skeletal-animation-system` aims to provide a sane API for starting, stopping and interpolating skeletal animations.

It supports blending between
your previous and current animation when you switch animations. It also supports splitting your model into different bone groups such as the upper
and lower body, allowing you to, for example, play a walking animation for your legs while playing a punch animation for your upper body.

`skeletal-animation-system` does not maintain an internal state, but instead lets the modules consumer track things such as the current animation and the current clock time.

## I use matrices and not dual quaternions

The first versions of `skeletal-animation-system` uses matrices instead of dual quaternions.

The issue there was that [blending matrices can lead to unexpected artifacts](http://chinedufn.com/dual-quaternion-shader-explained/).

So we switched to dual quaternions and completely dropped support for matrices.

However, if you use matrices you can still make use of `skeletal-animation-system`.

1. [Convert your matrices into dual quaternions](https://github.com/chinedufn/mat4-to-dual-quat) once when you first load your model.
2. Use `skeletal-animation-system` to determine your pose dual quaternions
3. [Convert your pose dual quaternions back into matrices before each render](https://github.com/chinedufn/dual-quat-to-mat4)
4. Use your newly created matrices for skinning

The 3rd step here means that you're doing some extra work on the CPU, but this hopefully bridges the gap for you until you can move to dual quaternion
based skinning.

TODO: Example code demonstrating how to incorporate `skeletal-animation-system` into matrix based skinning application

This API is still experimental and will evolve as we use it and realize the kinks.

## To Install

```sh
$ npm install --save skeletal-animation-system
```

## Demo

To run the demo locally:

```sh
$ git clone https://github.com/chinedufn/skeletal-animation-system
$ cd skeletal-animation-system
$ npm install
$ npm run demo
```

Changes to the `demo` and `src` files will now live reload in your browser.

---

[View live demo](http://chinedufn.github.io/skeletal-animation-system/)

## Usage

```js
var animationSystem = require('skeletal-animation-system')
// Parsed using collada-dae-parser or some other parser
var parsedColladaModel = require('./parsed-collada-model.json')

// Keyframe data for all joints.
// @see `github.com/chinedufn/blender-actions-to-json` for an example format
var lowerBodyKeyframes = {...}
var upperBodyKey = {...}

// Convert our joint names into their associated joint index number
// This number comes from collada-dae-parser
// (or your parser of choice)
var upperBodyJointNums = [0, 1, 5, 6, 8]
var lowerBodyJointNums = [2, 3, 4, 7, 9]

// Our options for animating our model's upper body
var upperBodyOptions = {
  currentTime: 28.24,
  jointNums: upperBodyJointsNums,
  blendFunction: function (dt) {
    // Blend animations linearly over 2.5 seconds
    return 1 / 2.5 * dt
  },
  currentAnimation: {
    keyframes: currentAnimKeyframes,
    startTime: 25
  },
  previousAnimation: {
    keyframes: previousAnimKeyframes,
    startTime: 24.5
  }
}

// Our options for animating our model's lower body
var lowerBodyOptions = {
  currentTime: 28.24,
  jointNums: lowerBodyJointNums,
  currentAnimation: {
    keyframes: currentAnimKeyframes,
    startTime: 24.3,
    noLoop: true
  }
}

var interpolatedUpperBodyJoints = animationSystem
.interpolateJoints(upperBodyOptions).joints

var lowerBodyData = animationSystem
.interpolateJoints(lowerBodyOptions)
var interpolatedLowerBodyJoints = lowerBodyData.joints

console.log(lowerBodyData.currentAnimationInfo)
// => {lowerKeyframeNumber: 5, upperKeyframeNumber: 6}

// You now have your interpolated upper and lower body dual quaternions (joints).
// You can pass these into any vertex shader that
// works with dual quaternions

// If you're just getting started and you still need matrices you
// can convert these into matrices using dual-quat-to-mat4
//  @see https://github.com/chinedufn/dual-quat-to-mat4
```

## Expected JSON model format

TODO: [Link to collada-dae-parser README]()

## Benchmark

```sh
npm run bench
```

## TODO:

- [x] Handle rotation quaternion lerp when dot product is < 0
- [ ] Implement more from the papers linked in `References` section below (whenever we need them)
- [x] Add documentation about how to approach playing a sound effect on a keyframe in your game / simulation / program
- [x] Benchmark
- [ ] Allow consumer to provide the sampling function between keyframes. Currently we sample linearly between all keyframes. Could make use of [chromakode/fcurve](https://github.com/chromakode/fcurve) here
- [ ] Create a new demo site and demo(s)

## API

### `animationSystem.interpolateJoints(options)` -> `Object`

#### options

*Optional*

Type: `object`

```js
// Example overrides
var myOptions = {
  // TODO:
}
interpolatedJoints = animationSystem.interpolateJoints(myOptions)
```

##### currentTime

Type: `Number`

Default: `0`

The current number of seconds elapsed. If you have an animation an loop,
this will typically be the sum of all of your loops time deltas

```js
// Example of tracking current time
var currentTime = 0
function animationLoop (dt) {
 currentTime += dt
}
```

##### keyframes

Type: `Object`

Default: `{}`

TODO: Link to collada-dae-parser README on keyframes for more info, but also put an example here

##### jointNums

Type: `Array`

An array of joint indices that you would like to interpolate.

Say your model has 4 joints. To interpolate the entire model you would pass in [0, 1, 2, 3].
To only interpolate two of the joints you might pass in [0, 2], or any desired combination.

These joint indices are based on the order of the joints in your `keyframes`

##### blendFunction

Type: `Function`

Default: `Blend linearly over 0.2 seconds`

A function that accepts a time elapsed in seconds
and returns a value between `0` and `1`.

This returned value represents the weight of the new animation.

```js
function myBlendFunction (dt) {
  // Blend the old animation into the new one linearly over 5 seconds
  return 0.2 * dt)
}
```

##### currentAnimation

Type: `Object`

An object containing parameters for the current animation

If you supply a previous animation your current animation will be
blended in using your `blendFunction`

```js
var currentAnimation = {
  keyframes: {0: [..], 1.66666: [...]}
  startTime: 10
}
```

###### currentAnimation.keyframes

Type: `Array`

```js
{
  "0": [
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
  ],
  "1.33333": [
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 2, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 2, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 5, 1]
  ]
}
```

Pose matrices for each joint in the model, organized by the animation time (`0` and `1.33333` are seconds)

###### currentAnimation.startTime

Type: `Number`

The time in seconds that your current animation was initiated. This gets compared with
the `currentTime` in order to interpolate your joint data appropriately.

###### currentAnimation.noLoop

Type: `Boolean`

Whether or not your animation should loop. For example, let's say you are 13 seconds into a 4 second animation.

If `noLoop === true` then you will be playing the frame at the 4th second.

If `noLoop === false` then you will be playing the frame at the 1st second.

##### previousAnimation

An object containing parameters for the previous animations.
Your previous animation gets blended out using your `blendFunction`
while your current animation gets blended in.

Type: `Object`

###### previousAnimation.keyframes

Type: `Array`

```js
{
  "0": [
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
  ],
  "1.33333": [
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 2, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 2, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 5, 1]
  ]
}
```

Pose matrices for each joint in the model, organized by the animation time (`0` and `1.33333` are seconds)

###### previousAnimation.startTime

Type: `Number`

The time in seconds that your previous animation was initiated.
This is used in order to blend in the current animation.

## Returned data

```js
// Example
{
  joints: [...],
  currentAnimationInfo: {
    lowerKeyframeNumber: 0,
    upperKeyframeNumber:: 1
  }
}
```

`currentAnimationInfo` is the lower and upper keyframe time bounds of the current animation.
If you have three keyframes at 1 8 and 19 seconds and you are currently 12 seconds into your animation then your lower keyframe is 1 (8) and your upper keyframe is 2 (19).

## See Also

- [collada-dae-parser](https://github.com/chinedufn/collada-dae-parser)
- [blender-iks-to-fks](https://github.com/chinedufn/blender-iks-to-fks)
- [blender-actions-to-json](https://github.com/chinedufn/blender-actions-to-json)

## References

- [Anatomy of a skeletal animation system part 1](http://blog.demofox.org/2012/09/21/anatomy-of-a-skeletal-animation-system-part-1/), [part 2](http://blog.demofox.org/2012/09/21/anatomy-of-a-skeletal-animation-system-part-2/) and [part 3](http://blog.demofox.org/2012/09/21/anatomy-of-a-skeletal-animation-system-part-3/)
- [Dual-Quaternions - From Classical Mechanics to Computer Graphics and Beyond](http://www.xbdev.net/misc_demos/demos/dual_quaternions_beyond/paper.pdf)
  - This taught us to negate one of the dual quaternions if the dot product of the rotation quaternions was less than 0

## License

MIT
