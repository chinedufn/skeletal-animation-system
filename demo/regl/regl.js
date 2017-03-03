'use strict'
const regl = require('regl')()
const cowboy = require('../webgl/asset/cowboy.json')
const expandVertices = require('expand-vertex-data')

const mat3FromMat4 = require('gl-mat3/from-mat4')
const quatMultiply = require('gl-quat/multiply')
const quatFromMat3 = require('gl-quat/fromMat3')
const quatScale = require('gl-quat/scale')

const createCamera = require('create-orbit-camera')

const mat4Create = require('gl-mat4/create')
const mat4Perspective = require('gl-mat4/perspective')
const mat4Translate = require('gl-mat4/translate')
const mat4Multiply = require('gl-mat4/multiply')
const mat4RotateX = require('gl-mat4/rotateX')
const mat4RotateY = require('gl-mat4/rotateY')
const mat4RotateZ = require('gl-mat4/rotateZ')

const getUpperBodyQuats = require('../webgl/upper-body.js')
const getLowerBodyQuats = require('../webgl/lower-body.js')

const state = {
  animationRanges: {
    'throw': [0, 5],
    'walk': [6, 17],
    'point': [18, 22]
  },
  camera: {
    xRadians: 0,
    yRadians: 0
  },
  upperBody: {
    currentAnimation: {
      name: 'walk',
      range: [6, 17],
      startTime: 0
    }
  },
  lowerBody: {
    currentAnimation: {
      name: 'walk',
      range: [6, 17],
      startTime: 0
    }
  }
}

state.upperBodyJointNums = ['Torso', 'Chest', 'Bone_002', 'Head', 'Upper_Arm_L', 'Lower_Arm_L', 'Hand_L', 'Upper_Arm_R', 'Lower_Arm_R', 'Hand_R']
  .reduce(function (jointNums, jointName) {
    return jointNums.concat([cowboy.jointNamePositionIndex[jointName]])
  }, [])
state.lowerBodyJointNums = ['Upper_Leg_L', 'Lower_Leg_L', 'Foot_L', 'Toe_L', 'Upper_Leg_R', 'Lower_Leg_R', 'Foot_R', 'Toe_R']
  .reduce(function (jointNums, jointName) {
    return jointNums.concat([cowboy.jointNamePositionIndex[jointName]])
  }, [])

var cameraData = createCamera({
  position: [15, 23, 25],
  target: [0, 3.4, 0],
  xRadians: state.camera.xRadians,
  yRadians: state.camera.yRadians
})

const drawOpts = {
  perspective: mat4Perspective([], Math.PI / 3, window.innerWidth / window.innerHeight, 0.1, 100),
  position: [0.0, 0.0, -5.0],
  viewMatrix: cameraData.viewMatrix,
  lighting: {
    useLighting: false
  },
  xRotation: 0.0,
  yRotation: 0.0,
  zRotation: 0.0
}

var modelMatrix = mat4Create()

mat4Translate(modelMatrix, modelMatrix, drawOpts.position)
mat4RotateX(modelMatrix, modelMatrix, drawOpts.xRotation)
mat4RotateY(modelMatrix, modelMatrix, drawOpts.yRotation)
mat4RotateZ(modelMatrix, modelMatrix, drawOpts.zRotation)
mat4Multiply(modelMatrix, drawOpts.viewMatrix, modelMatrix)

var vertexData = expandVertices(cowboy)

function convertKeyframesToDualQuats (keyframes) {
  return Object.keys(cowboy.keyframes)
               .reduce(function (acc, time) {
                 var keyframes = convertMatricesToDualQuats(cowboy.keyframes[time])
                 keyframes = keyframes.rotQuaternions.reduce(function (all, quat, index) {
                   all[index] = keyframes.rotQuaternions[index].concat(keyframes.transQuaternions[index])
                   return all
                 }, {})
                 acc[time] = keyframes
                 return acc
               }, {})
}

function convertMatricesToDualQuats (jointMatrices) {
  var rotQuaternions = []
  var transQuaternions = []

  jointMatrices.forEach(function (joint, index) {
    // Create our dual quaternion
    var rotationMatrix = mat3FromMat4([], joint)
    var rotationQuat = quatFromMat3([], rotationMatrix)
    var transVec = [joint[12], joint[13], joint[14], 0]
    var transQuat = quatScale([], quatMultiply([], transVec, rotationQuat), 0.5)

    rotQuaternions.push(rotationQuat)
    transQuaternions.push(transQuat)
  })

  return {
    rotQuaternions: rotQuaternions,
    transQuaternions: transQuaternions
  }
}

const dualQuatKeyframes = convertKeyframesToDualQuats(cowboy.keyframes)

require('resl')({
  manifest: {
    'texture': {
      type: 'image',
      src: 'cowboy-texture.png'
    }
  },

  onDone: (assets) => {
    const drawCharacter = regl({
      vert: `
        attribute vec3 aVertexPosition;
        attribute vec2 aTextureCoord;
        varying vec2 vTextureCoord;

        uniform mat3 uNMatrix;

        attribute vec4 aJointIndex;
        attribute vec4 aJointWeight;

        uniform vec4 boneRotQuaternions[18];
        uniform vec4 boneTransQuaternions[18];

        uniform mat4 uMVMatrix;
        uniform mat4 uPMatrix;

        void main (void) {
          vec4 rotQuaternion[4];
          vec4 transQuaternion[4];

          for (int i = 0; i < 18; i++) {
            if (aJointIndex.x == float(i)) {
              rotQuaternion[0] = boneRotQuaternions[i];
              transQuaternion[0] = boneTransQuaternions[i];
            }
            if (aJointIndex.y == float(i)) {
              rotQuaternion[1] = boneRotQuaternions[i];
              transQuaternion[1] = boneTransQuaternions[i];
            }
            if (aJointIndex.z == float(i)) {
              rotQuaternion[2] = boneRotQuaternions[i];
              transQuaternion[2] = boneTransQuaternions[i];
            }
            if (aJointIndex.w == float(i)) {
              rotQuaternion[3] = boneRotQuaternions[i];
              transQuaternion[3] = boneTransQuaternions[i];
            }
          }

          vec4 weightedRotQuat = rotQuaternion[0] * aJointWeight.x +
            rotQuaternion[1] * aJointWeight.y +
            rotQuaternion[2] * aJointWeight.z +
            rotQuaternion[3] * aJointWeight.w;

          vec4 weightedTransQuat = transQuaternion[0] * aJointWeight.x +
            transQuaternion[1] * aJointWeight.y +
            transQuaternion[2] * aJointWeight.z +
            transQuaternion[3] * aJointWeight.w;

          float xRot = weightedRotQuat[0];
          float yRot = weightedRotQuat[1];
          float zRot = weightedRotQuat[2];
          float wRot = weightedRotQuat[3];
          float rotQuatMagnitude = sqrt(xRot * xRot + yRot * yRot + zRot * zRot + wRot * wRot);
          weightedRotQuat = weightedRotQuat / rotQuatMagnitude;
          weightedTransQuat = weightedTransQuat / rotQuatMagnitude;

          float xR = weightedRotQuat[0];
          float yR = weightedRotQuat[1];
          float zR = weightedRotQuat[2];
          float wR = weightedRotQuat[3];

          float xT = weightedTransQuat[0];
          float yT = weightedTransQuat[1];
          float zT = weightedTransQuat[2];
          float wT = weightedTransQuat[3];

          float t0 = 2.0 * (-wT * xR + xT * wR - yT * zR + zT * yR);
          float t1 = 2.0 * (-wT * yR + xT * zR + yT * wR - zT * xR);
          float t2 = 2.0 * (-wT * zR - xT * yR + yT * xR + zT * wR);

          mat4 weightedMatrix = mat4(
                1.0 - (2.0 * yR * yR) - (2.0 * zR * zR),
                (2.0 * xR * yR) + (2.0 * wR * zR),
                (2.0 * xR * zR) - (2.0 * wR * yR),
                0,
                (2.0 * xR * yR) - (2.0 * wR * zR),
                1.0 - (2.0 * xR * xR) - (2.0 * zR * zR),
                (2.0 * yR * zR) + (2.0 * wR * xR),
                0,
                (2.0 * xR * zR) + (2.0 * wR * yR),
                (2.0 * yR * zR) - (2.0 * wR * xR),
                1.0 - (2.0 * xR * xR) - (2.0 * yR * yR),
                0,
                t0,
                t1,
                t2,
                1
                );

          vec4 leftWorldSpace = weightedMatrix * vec4(aVertexPosition, 1.0);
          float y = leftWorldSpace.z;
          float z = -leftWorldSpace.y;
          leftWorldSpace.y = y;
          leftWorldSpace.z = z;

          vTextureCoord = aTextureCoord;

          gl_Position = uPMatrix * uMVMatrix * leftWorldSpace;
         }
      `,

      frag: `
        precision mediump float;
        varying vec2 vTextureCoord;

        uniform sampler2D uSampler;

        void main (void) {
          vec4 textureColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
          gl_FragColor = vec4(textureColor.rgb, textureColor.a);
        }
      `,

      attributes: {
        aVertexPosition: vertexData.positions,
        aVertexNormal: vertexData.normals,
        aJointIndex: vertexData.jointInfluences,
        aJointWeight: vertexData.jointWeights,
        aTextureCoord: vertexData.uvs
      },

      elements: vertexData.positionIndices,

      uniforms: Object.assign({
        boneRotQuaternions: regl.prop('boneRotQuaternions'),
        boneTransQuaternions: regl.prop('boneTransQuaternions'),
        uMVMatrix: modelMatrix,
        uPMatrix: drawOpts.perspective,
        uSampler: regl.texture({
          data: assets.texture,
          width: 256,
          height: 256,
          flipY: true
        })
      }, new Uint32Array(18).reduce((accum, value, index) => {
        accum['boneRotQuaternions[' + index + ']'] = regl.prop('boneRotQuaternions[' + index + ']')
        return accum
      }, {}), new Uint32Array(18).reduce((accum, value, index) => {
        accum['boneTransQuaternions[' + index + ']'] = regl.prop('boneTransQuaternions[' + index + ']')
        return accum
      }, {}))
    })

    regl.frame(({time}) => {
      state.currentTime = time

      regl.clear({
        color: [0.4, 0.4, 0.4, 1],
        depth: 1
      })

      var upperBodyQuats = getUpperBodyQuats(state, dualQuatKeyframes)
      var lowerBodyQuats = getLowerBodyQuats(state, dualQuatKeyframes)

      if (!upperBodyQuats || !lowerBodyQuats) {
        return
      }

      var interpolatedQuats = {rot: [], trans: []}
      var totalJoints = upperBodyQuats.length + lowerBodyQuats.length
      for (var i = 0; i < totalJoints; i++) {
        interpolatedQuats.rot[i] = upperBodyQuats.rot[i] || lowerBodyQuats.rot[i]
        interpolatedQuats.trans[i] = upperBodyQuats.trans[i] || lowerBodyQuats.trans[i]
      }

      var drawProps = {
        boneRotQuaternions: interpolatedQuats.rot,
        boneTransQuaternions: interpolatedQuats.trans
      }

      var boneRotQuaternionProps = interpolatedQuats.rot.reduce(function (accum, val, index) {
        accum['boneRotQuaternions[' + index + ']'] = val
        return accum
      }, {})

      var boneTransQuaternionProps = interpolatedQuats.trans.reduce((accum, val, index) => {
        accum['boneTransQuaternions[' + index + ']'] = val
        return accum
      }, {})

      var mergedProps = Object.assign({},
                                      drawProps,
                                      boneRotQuaternionProps,
                                      boneTransQuaternionProps
      )

      drawCharacter(mergedProps)
    })
  }
})
