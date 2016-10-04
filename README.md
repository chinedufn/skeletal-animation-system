skeletal-animation-system [![npm version](https://badge.fury.io/js/skeletal-animation-system.svg)](http://badge.fury.io/js/skeletal-animation-system) [![Build Status](https://travis-ci.org/chinedufn/skeletal-animation-system.svg?branch=master)](https://travis-ci.org/chinedufn/skeletal-animation-system)
===============

> Calculate an animated 3d model's interpolated joint matrices

## Background / Initial Motivation

At any given time your an animated 3d model's joint matrices will have different values, based on factors such as which animation
you are currently playing, which groups of bones you want to animate,
whether or not you want the animation to loop, the time elapsed since you started the animation
and whether you want the old animation to blend into the new animation.

skeletal-animation-system aims to provide a stateless API around these calculations, giving the user a flexible module for managing
skeletal animations across different 3d models and bone groups.

## Notes

This API is still experimental and will evolve as we use it and realize the kinks.

## To Install

```
$ npm install --save skeletal-animation-system
```

## Usage

```js
var animationSystem = require('skeletal-animation-system')
// Parsed using collada-dae-parser or some other parser
var parsedColladaModel = require('./parsed-collada-model.json')

// Animation names and the keyframes that they start and end on
// Zero indexed
//  ex: [2, 5] means start on the third keyframe and end at the sixth
var animationRanges = {
  'idle': [0, 5],
  'jump': [5, 8],
  'dance': [8, 14],
  'left-arm-punch': [14, 17],
  'right-arm-punch': [17, 20]
}

var upperBodyJointNames = [
'spine', 'chest_L', 'chest_R', 'bicep_L', 'bicep_R'
]
var lowerBodyJointNames = [
'hip', 'thigh_L', 'thigh_R', 'femur_L'
]
var fullBodyJoints = upperBodyJoints.concat(lowerBodyJoints)

var upperBodyOptions = {
  currentTime: 28.24,
  keyframes: keyframes,
  jointNames: upperBodyJointsNames,
  blendFunction: function (dt) {
    // Blend animations linearly over 2.5 seconds
    return 1 / 2.5 * dt
  },
  currentAnimation: {
    range: animationRanges['left-arm-punch'],
    startTime: 25
  },
  previousAnimation: {
    range: animationRanges['right-arm-punch'],
    startTime: 24.5
  }
}

var lowerBodyOptions = {
  currentTime: 28.24,
  keyframes: keyframes,
  jointNames: lowerBodyJointNames,
  currentAnimation: {
    range: animationRanges['jump']
    startTime: 24.3
  }
}

var interpolatedUpperBodyJoints = animationSystem
.interpolateJoints(upperBodyOptions)

var interpolatedLowerBodyJoints = animationSystem
.interpolateJoints(lowerBodyJoints)

var interpolatedJoints = Object.assign({}, interpolatedUpperBodyJoints, interpolatedLowerBodyJoints)
```

## Expected JSON model format

TODO: [Link to collada-dae-parser README]()

## TODO:

- [ ] expose bone groups names when exporting JSON from collada-dae-parser

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

The current number of seconds elapsed. If your application has a clock, this will
typically be your current clock time.

##### keyframes

Type: `Object`

Default: `{}`

TODO: Link to collada-dae-parser README on keyframes

##### jointNames

lorem ipsum

##### blendFunction

Type: `Function`

Default: `Blend over 2 seconds`

A function that accepts a time elapsed in seconds and returns a value between `0` and `1`.

This returned value represents the weighing of the new animation.

```
function myBlendFunction (dt) {
  // Blend the old animation into the new one linearly over 5 seconds
  return 1 / (5 * dt)
}
```

##### currentAnimation

Type: `Object`

###### currentAnimation.range

lorem ipsum

###### currentAnimation.startTime

lorem ipsum

##### previousAnimation

###### previousAnimation.range

lorem ipsum

###### previousAnimation.startTime

lorem ipsum

## See Also

- [collada-dae-parser](https://github.com/chinedufn/collada-dae-parser)

## References

- [Anatomy of a skeletal animation system part 1](http://blog.demofox.org/2012/09/21/anatomy-of-a-skeletal-animation-system-part-1/) [part 2](http://blog.demofox.org/2012/09/21/anatomy-of-a-skeletal-animation-system-part-2/) [part 3](http://blog.demofox.org/2012/09/21/anatomy-of-a-skeletal-animation-system-part-3/)

## License

MIT
