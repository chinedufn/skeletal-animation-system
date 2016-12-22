(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = create;

/**
 * Creates a new identity mat4
 *
 * @returns {mat4} a new 4x4 matrix
 */
function create() {
    var out = new Float32Array(16);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};
},{}],2:[function(require,module,exports){
module.exports = multiply;

/**
 * Multiplies two mat4's
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
function multiply(out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    // Cache only the current line of the second matrix
    var b0  = b[0], b1 = b[1], b2 = b[2], b3 = b[3];  
    out[0] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[1] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[2] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[3] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7];
    out[4] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[5] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[6] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[7] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11];
    out[8] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[9] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[10] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[11] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15];
    out[12] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[13] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[14] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[15] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
    return out;
};
},{}],3:[function(require,module,exports){
module.exports = perspective;

/**
 * Generates a perspective projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
function perspective(out, fovy, aspect, near, far) {
    var f = 1.0 / Math.tan(fovy / 2),
        nf = 1 / (near - far);
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = (2 * far * near) * nf;
    out[15] = 0;
    return out;
};
},{}],4:[function(require,module,exports){
module.exports = translate;

/**
 * Translate a mat4 by the given vector
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */
function translate(out, a, v) {
    var x = v[0], y = v[1], z = v[2],
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23;

    if (a === out) {
        out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
        out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
        out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
        out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {
        a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
        a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
        a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

        out[0] = a00; out[1] = a01; out[2] = a02; out[3] = a03;
        out[4] = a10; out[5] = a11; out[6] = a12; out[7] = a13;
        out[8] = a20; out[9] = a21; out[10] = a22; out[11] = a23;

        out[12] = a00 * x + a10 * y + a20 * z + a[12];
        out[13] = a01 * x + a11 * y + a21 * z + a[13];
        out[14] = a02 * x + a12 * y + a22 * z + a[14];
        out[15] = a03 * x + a13 * y + a23 * z + a[15];
    }

    return out;
};
},{}],5:[function(require,module,exports){
var mat4Create = require('gl-mat4/create')
var mat4Multiply = require('gl-mat4/multiply')
var mat4Perspective = require('gl-mat4/perspective')
var mat4Translate = require('gl-mat4/translate')

module.exports = drawModel

var defaultDrawOpts = {
  perspective: mat4Perspective([], Math.PI / 4, 256 / 256, 0.1, 100),
  position: [0.0, 0.0, -5.0],
  viewMatrix: mat4Create()
}

/*
 * Draw a collada model onto a canvas
 */
// TODO: Test and optimize for multiple calls in a row for the same model
//  certain things don't need to happen the second time you draw the same model
function drawModel (gl, bufferData, drawOpts) {
  drawOpts = Object.assign({}, defaultDrawOpts, drawOpts)

  // Move our model to the specified position
  var modelMatrix = mat4Create()
  mat4Translate(modelMatrix, modelMatrix, drawOpts.position)
  mat4Multiply(modelMatrix, drawOpts.viewMatrix, modelMatrix)

  // TODO: Should we just let the consumer handle this?
  gl.useProgram(bufferData.shader.program)

  // TODO: Don't need to enable vertex attribs if we are re-drawing the same model
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferData.vertexPositionBuffer)
  // TODO: See if we can move all of these enable calls to the top, or if order matters
  //  easier to refactor the enabling process later if they're all together
  gl.enableVertexAttribArray(bufferData.shader.vertexPositionAttribute)
  gl.vertexAttribPointer(bufferData.shader.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0)

  // TODO: Instead of having if statements we should generate our JavaScript
  //  Haven't done this before.. maybe we can use eval?
  if (bufferData.modelTexture) {
    // Texture
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferData.vertexTextureBuffer)
    gl.enableVertexAttribArray(bufferData.shader.textureCoordAttribute)
    gl.vertexAttribPointer(bufferData.shader.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0)

    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, bufferData.modelTexture)
    gl.uniform1i(bufferData.shader.samplerUniform, 0)
  }

  /*
  // Vertex normals
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferData.shader.vertexNormalBuffer)
  gl.enableVertexAttribArray(bufferData.shader.vertexNormalAttribute)
  gl.vertexAttribPointer(bufferData.shader.vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0)
  */

  // Vertex joints
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferData.vertexJointIndexBuffer)
  gl.enableVertexAttribArray(bufferData.shader.vertexJointIndexAttribute)
  gl.vertexAttribPointer(bufferData.shader.vertexJointIndexAttribute, 4, gl.FLOAT, false, 0, 0)

  // Vertex joint weights
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferData.weightBuffer)
  gl.enableVertexAttribArray(bufferData.shader.vertexJointWeightAttribute)
  gl.vertexAttribPointer(bufferData.shader.vertexJointWeightAttribute, 4, gl.FLOAT, false, 0, 0)

  // Joint uniforms
  // TODO: Don't hard code number of joints
  for (var jointNum = 0; jointNum < bufferData.numJoints; jointNum++) {
    gl.uniform4fv(bufferData.shader['boneRotQuaternion' + jointNum], drawOpts.rotQuaternions[jointNum])
    gl.uniform4fv(bufferData.shader['boneTransQuaternion' + jointNum], drawOpts.transQuaternions[jointNum])
  }

  // TODO: Just pre-multiply these?
  gl.uniformMatrix4fv(bufferData.shader.pMatrixUniform, false, drawOpts.perspective)
  gl.uniformMatrix4fv(bufferData.shader.mvMatrixUniform, false, modelMatrix)

  // Draw our model
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bufferData.vertexPositionIndexBuffer)
  gl.drawElements(gl.TRIANGLES, bufferData.numIndices, gl.UNSIGNED_SHORT, 0)

  // Clean up
  // TODO: Only disable when we're done re-drawing a model multiple times
  gl.disableVertexAttribArray(bufferData.shader.vertexPositionAttribute)
  // gl.disableVertexAttribArray(bufferData.shader.vertexNormalAttribute)
  gl.disableVertexAttribArray(bufferData.shader.vertexJointIndexAttribute)
  gl.disableVertexAttribArray(bufferData.shader.vertexJointWeightAttribute)
  gl.disableVertexAttribArray(bufferData.shader.textureCoordAttribute)
}

},{"gl-mat4/create":1,"gl-mat4/multiply":2,"gl-mat4/perspective":3,"gl-mat4/translate":4}],6:[function(require,module,exports){
// TODO: This should be it's own, tested module. This is like the third time that
// I've copied and pasted this into a repo
module.exports = expandVertices

// Takes our parsed data and expands the vertex data using our uv/vertex/normal index data
function expandVertices (parsedDae, opts) {
  // Vertex normals
  // TODO: Comment this
  var vertexNormals = []

  var vertexUVs = []

  // TODO: naming
  var vertexJointAffectors = []
  var vertexJointWeights = []
  /*
     parsedDae.vertexJointWeights.forEach(function (jointsAndWeights) {
     for (var i = 0; i < 4; i++) {
     var jointIndex = Object.keys(jointsAndWeights)[i]
     vertexJointAffectors.push(Number(jointIndex) || 0)
     vertexJointWeights.push(jointsAndWeights[jointIndex] || 0)
     }
     })
     */

  // TODO: Can probably make this more efficient by indexing duplicate index -> normal -> new tail end index
  // TODO: generally inefficient. Running calculations more than necessary. Still figuring out how to do this...
  //  Throwing things in for now then optimize later
  var encounteredIndices = {}
  var vertexPositionIndices = []
  var largestPositionIndex = 0
  parsedDae.vertexPositionIndices.forEach(function (vertexPositionIndex, counter) {
    largestPositionIndex = Math.max(largestPositionIndex, vertexPositionIndex)
    if (!encounteredIndices[vertexPositionIndex]) {
      var jointsAndWeights = parsedDae.vertexJointWeights[vertexPositionIndex]
      // First time seeing the vertex position index
      vertexPositionIndices[counter] = vertexPositionIndex
      for (var i = 0; i < 4; i++) {
        if (i < 3) {
          vertexNormals[vertexPositionIndex * 3 + i] = parsedDae.vertexNormals[parsedDae.vertexNormalIndices[counter] * 3 + i]
          if (i < 2 && opts.hasTexture) {
            vertexUVs[vertexPositionIndex * 2 + i] = parsedDae.vertexUVs[parsedDae.vertexUVIndices[counter] * 2 + i]
          }
        }
        var jointIndex = Object.keys(jointsAndWeights)[i]
        // TODO: Should zero be -1? It will have a zero weight regardless, but that lets us distinguish between empty bone slots and zero index bone slots
        vertexJointAffectors[vertexPositionIndex * 4 + i] = Number(jointIndex) || 0
        vertexJointWeights[vertexPositionIndex * 4 + i] = jointsAndWeights[jointIndex] || 0
      }
      encounteredIndices[vertexPositionIndex] = true
    }
  })
  parsedDae.vertexPositionIndices.forEach(function (vertexPositionIndex, counter) {
    if (encounteredIndices[vertexPositionIndex]) {
      vertexPositionIndices[counter] = ++largestPositionIndex
      var jointsAndWeights = parsedDae.vertexJointWeights[vertexPositionIndex]
      for (var i = 0; i < 4; i++) {
        if (i < 3) {
          parsedDae.vertexPositions[largestPositionIndex * 3 + i] = parsedDae.vertexPositions[vertexPositionIndex * 3 + i]
          vertexNormals[largestPositionIndex * 3 + i] = parsedDae.vertexNormals[parsedDae.vertexNormalIndices[counter] * 3 + i]
          if (i < 2 && opts.hasTexture) {
            vertexUVs[largestPositionIndex * 2 + i] = parsedDae.vertexUVs[parsedDae.vertexUVIndices[counter] * 2 + i]
          }
        }
        var jointIndex = Object.keys(jointsAndWeights)[i]
        // TODO: Should zero be -1? It will have a zero weight regardless, but that lets us distinguish between empty bone slots and zero index bone slots
        vertexJointAffectors[largestPositionIndex * 4 + i] = Number(jointIndex) || 0
        vertexJointWeights[largestPositionIndex * 4 + i] = jointsAndWeights[jointIndex] || 0
      }
    }
  })

  // We count the number of matrices in one of the keyframes
  // There *should* be one matrix per joint
  // All keyframes *should* have the same number of joints
  var firstKeyframeTime = Object.keys(parsedDae.keyframes).slice(0, 1)
  var numJoints = parsedDae.keyframes[firstKeyframeTime].length

  return {
    // TODO: This has nothing to do with expanding joints. Calculate elsewhere
    numJoints: numJoints,
    vertexNormals: vertexNormals,
    vertexPositionIndices: vertexPositionIndices,
    vertexJointAffectors: vertexJointAffectors,
    vertexJointWeights: vertexJointWeights,
    vertexUVs: vertexUVs
  }
}


},{}],7:[function(require,module,exports){
module.exports = initTexture

function initTexture (gl, opts) {
  var modelTexture = gl.createTexture()
  handleLoadedTexture(gl, modelTexture, opts.texture)

  return modelTexture

  function handleLoadedTexture (gl, modelTexture, textureImage) {
    gl.bindTexture(gl.TEXTURE_2D, modelTexture)
    // If we're passing in a Uint8Array of image data
    if (textureImage.length) {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 256, 256, 0, gl.RGBA, gl.UNSIGNED_BYTE, textureImage)
    } else {
      // If we're passing in an HTML image element
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureImage)
    }

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
    gl.bindTexture(gl.TEXTURE_2D, null)
  }
}


},{}],8:[function(require,module,exports){
var generateShader = require('./shader/generate-shader.js')
var drawModel = require('./draw-model.js')
var expandVertices = require('./expand-vertices.js')
var initTexture = require('./init-texture.js')

module.exports = loadColladaDae

function loadColladaDae (gl, modelJSON, loadOpts) {
  var expandOpts = {}
  expandOpts.hasTexture = !!loadOpts.texture

  var vertexData = expandVertices(modelJSON, expandOpts)

  var vertexPositionBuffer = createBuffer(gl, 'ARRAY_BUFFER', Float32Array, modelJSON.vertexPositions)
  var vertexPositionIndexBuffer = createBuffer(gl, 'ELEMENT_ARRAY_BUFFER', Uint16Array, vertexData.vertexPositionIndices)
  // var vertexNormalBuffer = createBuffer(gl, 'ARRAY_BUFFER', Float32Array, modelJSON.vertexNormals)
  var vertexJointIndexBuffer = createBuffer(gl, 'ARRAY_BUFFER', Float32Array, vertexData.vertexJointAffectors)
  var weightBuffer = createBuffer(gl, 'ARRAY_BUFFER', Float32Array, vertexData.vertexJointWeights)
  // If the user's model has a texture we create our texture buffer
  var modelTexture
  var vertexTextureBuffer
  if (loadOpts.texture) {
    vertexTextureBuffer = createBuffer(gl, 'ARRAY_BUFFER', Float32Array, vertexData.vertexUVs)
    modelTexture = initTexture(gl, loadOpts)
  }

  var shader = generateShader(gl, {numJoints: vertexData.numJoints, texture: !!loadOpts.texture})

  return {
    draw: drawModel.bind(null, gl, {
      // vertexNormalBuffer: vertexNormalBuffer,
      vertexPositionBuffer: vertexPositionBuffer,
      vertexPositionIndexBuffer: vertexPositionIndexBuffer,
      vertexJointIndexBuffer: vertexJointIndexBuffer,
      vertexTextureBuffer: vertexTextureBuffer,
      weightBuffer: weightBuffer,
      shader: shader,
      // The texture for our model
      modelTexture: modelTexture,
      // Useful for knowing how many triangles to draw
      numIndices: modelJSON.vertexPositionIndices.length,
      numJoints: vertexData.numJoints
    }),
    // Useful for letting our consumer call gl.useProgram()
    //  If they're drawing this model many times, they'll want to call `useProgram` themselves, only once, right before drawing
    shaderProgram: shader.program
  }
}

/*
 * Used to create a new WebGL buffer for pushing data to the GPU
 */
function createBuffer (gl, bufferType, DataType, data) {
  var buffer = gl.createBuffer()
  gl.bindBuffer(gl[bufferType], buffer)
  gl.bufferData(gl[bufferType], new DataType(data), gl.STATIC_DRAW)
  return buffer
}

},{"./draw-model.js":5,"./expand-vertices.js":6,"./init-texture.js":7,"./shader/generate-shader.js":10}],9:[function(require,module,exports){
module.exports = generateFragmentShader

// TODO: Support lighting
function generateFragmentShader (opts) {
  var textureVars = ''
  var assignFragColor = ''

  // If there is a texture we use our texture color
  if (opts.texture) {
    textureVars = `
      varying vec2 vTextureCoord;
      varying vec3 vLightWeighting;

      uniform sampler2D uSampler;
    `

    // TODO: Lighting
    assignFragColor = `
      vec4 textureColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
      gl_FragColor = vec4(textureColor.rgb, textureColor.a);

    `
  } else {
    // If there is no texture for now we just make the model white
    // later we'll introduce normals and lighting
    assignFragColor = `
      gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    `
  }

  var precision = 'precision mediump float;'

  var fragmentShader = `
    ${precision}

    ${textureVars}

    void main (void) {
      ${assignFragColor}
    }
  `

  return fragmentShader
}

},{}],10:[function(require,module,exports){
var generateFragmentShader = require('./generate-fragment-shader.js')
var generateVertexShader = require('./generate-vertex-shader.js')

module.exports = generateShader

/*
 * Generate a shader that's optimized for drawing the particular model
 */
// TODO: Pull out into separate, tested shader generation repository
function generateShader (gl, opts) {
  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
  gl.shaderSource(fragmentShader, generateFragmentShader(opts))
  gl.compileShader(fragmentShader)

  var vertexShader = gl.createShader(gl.VERTEX_SHADER)
  gl.shaderSource(vertexShader, generateVertexShader(opts))
  gl.compileShader(vertexShader)

  var shaderProgram = gl.createProgram()
  gl.attachShader(shaderProgram, fragmentShader)
  gl.attachShader(shaderProgram, vertexShader)
  gl.linkProgram(shaderProgram)

  // Return our shader object data
  var shaderObj = {
    mvMatrixUniform: gl.getUniformLocation(shaderProgram, 'uMVMatrix'),
    nMatrixUniform: gl.getUniformLocation(shaderProgram, 'uNMatrix'),
    pMatrixUniform: gl.getUniformLocation(shaderProgram, 'uPMatrix'),
    program: shaderProgram,
    vertexPositionAttribute: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
    vertexJointIndexAttribute: gl.getAttribLocation(shaderProgram, 'aJointIndex'),
    vertexJointWeightAttribute: gl.getAttribLocation(shaderProgram, 'aJointWeight')
  }

  if (opts.texture) {
    shaderObj.samplerUniform = gl.getUniformLocation(shaderProgram, 'uSampler')
    shaderObj.textureCoordAttribute = gl.getAttribLocation(shaderProgram, 'aTextureCoord')
  }

  // TODO: Don't hard code # of joints
  for (var jointNum = 0; jointNum < opts.numJoints; jointNum++) {
    // Split our dual quaternion into two vec4's since we can't use mat2x4 in WebGL
    shaderObj['boneRotQuaternion' + jointNum] = gl.getUniformLocation(shaderProgram, 'boneRotQuaternions[' + jointNum + ']')
    shaderObj['boneTransQuaternion' + jointNum] = gl.getUniformLocation(shaderProgram, 'boneTransQuaternions[' + jointNum + ']')
  }

  return shaderObj
}

},{"./generate-fragment-shader.js":9,"./generate-vertex-shader.js":11}],11:[function(require,module,exports){
module.exports = generateVertexShader

// TODO: Add comments
// TODO: Add documentation
//   - dual quaternion linear blending
//   - conditional texturing
function generateVertexShader (opts) {
  var textureVars = ''
  var varyingStatement = ''

  if (opts.texture) {
    textureVars = `
      attribute vec2 aTextureCoord;
      varying vec2 vTextureCoord;
    `

    varyingStatement = `
      vTextureCoord = aTextureCoord;
    `
  }

  // TODO: Optimize code after tests pass and benchmarks are in place
  var vertexShader = `
    attribute vec3 aVertexPosition;

    ${textureVars}

    uniform mat3 uNMatrix;

    attribute vec4 aJointIndex;
    attribute vec4 aJointWeight;
    uniform vec4 boneRotQuaternions[${opts.numJoints}];
    uniform vec4 boneTransQuaternions[${opts.numJoints}];

    uniform mat4 uMVMatrix;
    uniform mat4 uPMatrix;

    void main (void) {
      vec4 rotQuaternion[4];
      vec4 transQuaternion[4];

      for (int i = 0; i < ${opts.numJoints}; i++) {
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

      ${varyingStatement}

      gl_Position = uPMatrix * uMVMatrix * leftWorldSpace;
    }
  `

  return vertexShader
}

},{}],12:[function(require,module,exports){
module.exports={"vertexJointWeights":[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"1":0.1117618,"5":0.8882382},{"1":0.08644777,"3":0.02438318,"5":0.889169},{"1":0.1021785,"3":0.01719003,"5":0.8806314},{"1":0.1084154,"5":0.8915846},{"1":0.1012744,"5":0.8987255},{"2":1},{"2":1},{"2":1},{"2":1},{"2":1},{"2":1},{"0":0.06640297,"1":0.3828617,"3":0.1514074,"5":0.3993279},{"0":0.03164958,"1":0.4397955,"3":0.09434932,"5":0.4342056},{"1":0.3370013,"5":0.6629987},{"0":0.0180251,"1":0.4507879,"3":0.06883466,"5":0.4623522},{"0":0.05914139,"1":0.3878427,"3":0.1169937,"5":0.4360221},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"2":1},{"2":1},{"2":1},{"2":1},{"2":1},{"2":1},{"2":1},{"2":1},{"2":1},{"2":1},{"2":1},{"2":1},{"2":1},{"2":1},{"2":1},{"2":1},{"2":1},{"2":1},{"2":1},{"2":1},{"2":1},{"2":1},{"2":1},{"2":1},{"2":1},{"2":1},{"2":1},{"2":1},{"2":1},{"2":1},{"2":1},{"2":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{},{},{"2":1},{"2":1},{"2":1},{"2":1},{"2":1},{"2":1},{"1":0.03462445,"5":0.9653755},{"1":0.03215795,"5":0.967842},{"1":0.02872848,"5":0.9712715},{"1":0.02464824,"5":0.9753518},{"1":0.03417515,"5":0.9658248},{"5":1},{"3":0.1117618,"5":0.8882383},{"0":0.1195064,"1":0.2690849,"3":0.2690849,"5":0.3423238},{"0":0.004205167,"1":0.073673,"3":0.073673,"5":0.8484488},{"5":1},{"1":0.02438312,"3":0.08644765,"5":0.8891692},{"1":0.01718997,"3":0.1021784,"5":0.8806316},{"3":0.1084156,"5":0.8915844},{"3":0.1012745,"5":0.8987255},{"4":1},{"4":1},{"4":1},{"4":1},{"4":1},{"4":1},{"0":0.06640291,"1":0.1514074,"3":0.3828618,"5":0.3993279},{"0":0.03164952,"1":0.09434926,"3":0.4397955,"5":0.4342056},{"3":0.3370012,"5":0.6629987},{"0":0.01802515,"1":0.06883466,"3":0.450788,"5":0.4623522},{"0":0.05914139,"1":0.1169937,"3":0.3878427,"5":0.4360222},{"0":0.1265534,"1":0.2465362,"3":0.2465363,"5":0.3803741},{"1":0.05982464,"3":0.0598247,"5":0.8803507},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"4":1},{"4":1},{"4":1},{"4":1},{"4":1},{"4":1},{"4":1},{"4":1},{"4":1},{"4":1},{"4":1},{"4":1},{"4":1},{"4":1},{"4":1},{"4":1},{"4":1},{"4":1},{"4":1},{"4":1},{"4":1},{"4":1},{"4":1},{"4":1},{"4":1},{"4":1},{"4":1},{"4":1},{"4":1},{"4":1},{"4":1},{"4":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{"5":1},{},{},{},{},{"4":1},{"4":1},{"4":1},{"4":1},{"4":1},{"4":1},{"5":1},{"5":1},{"3":0.03462469,"5":0.9653753},{"1":0.008442282,"3":0.008442342,"5":0.9831153},{"3":0.03215801,"5":0.9678419},{"1":0.01290887,"3":0.01290887,"5":0.9741822},{"3":0.02872854,"5":0.9712715},{"3":0.0246483,"5":0.9753518},{"3":0.03417515,"5":0.9658249},{},{},{},{},{},{},{},{},{},{"0":0.2213108,"1":0.004284322,"6":0.6783779,"7":0.09602695},{"0":0.07799792,"1":0.7589927,"3":0.1630094},{"0":0.3323723,"6":0.6050653,"7":0.0625624},{"0":0.05414879,"1":0.9158098,"2":0.007538318,"3":0.02250301},{"0":0.2190607,"6":0.6792532,"7":0.1012778,"8":0.00040838},{"0":0.08182358,"1":0.8800085,"3":0.03816789},{"1":0.4454037,"2":0.5545963},{"0":0.3922672,"1":0.5487192,"2":0.05385631,"6":0.005157291},{"0":0.6695438,"1":0.1225346,"6":0.2079217},{"0":0.2191066,"1":0.7726538,"2":0.008239567},{"0":0.706354,"1":0.09858691,"6":0.195059},{"0":0.1512305,"1":0.8101892,"2":0.03858029},{"0":0.7666493,"1":0.08531618,"6":0.1480345},{"0":0.1162452,"1":0.5774971,"3":0.3062577},{"0":0.3315815,"6":0.5467584,"7":0.01278424,"8":0.1088758},{"0":0.3112947,"6":0.432253,"7":0.06802135,"8":0.188431},{"0":0.1395151,"1":0.6018918,"3":0.258593},{"6":1},{"0":0.7621238,"1":0.1746041,"3":0.06327199},{"0":0.8302938,"1":0.05865061,"6":0.09787911,"8":0.0131765},{"0":0.7278416,"1":0.2183842,"3":0.05079782,"6":0.002976298},{"0":0.7787086,"1":0.05687117,"6":0.1418493,"8":0.02257072},{"7":1},{"7":1},{"7":1},{"7":1},{"7":1},{"7":1},{"6":0.1322053,"7":0.8677947},{"6":0.3143441,"7":0.6856559},{"6":0.3342559,"7":0.6657441},{"6":0.09109795,"7":0.9089021},{"6":0.07624524,"7":0.9237548},{"6":0.0468961,"7":0.9531038},{"0":0.01116132,"1":0.9593678,"3":0.02947092},{"0":0.09631252,"1":0.7192354,"3":0.184452},{"0":0.09289598,"1":0.6965093,"3":0.2105947},{"0":0.599237,"1":0.382261,"6":0.01850187},{"0":0.6757863,"1":0.3184477,"6":0.005766034},{"0":0.274548,"1":0.6569545,"2":0.06849735},{"1":0.4054953,"2":0.5945047},{"1":0.3850849,"2":0.6149151},{"1":0.391454,"2":0.6085459},{"1":0.4049929,"2":0.5950071},{"1":0.3967169,"2":0.6032831},{"1":0.3832297,"2":0.6167703},{"0":0.1710388,"1":0.6352477,"3":0.1937136},{"0":0.1053277,"1":0.797028,"3":0.0976442},{"0":0.04806888,"1":0.8643184,"3":0.08761268},{"0":0.09621852,"1":0.806905,"3":0.09687644},{"0":0.2124674,"1":0.5698645,"3":0.217668},{"7":1},{"7":1},{"7":1},{"7":1},{"7":1},{"7":1},{"7":1},{"7":1},{"7":1},{"7":1},{"7":1},{"7":1},{"7":1},{"7":1},{"1":0.6040678,"2":0.3959321},{"1":0.1688626,"2":0.8311374},{"1":0.6736882,"2":0.3263118},{"1":0.2259001,"2":0.7740999},{"1":0.8417566,"2":0.1582434},{"1":0.1385274,"2":0.8614725},{"0":0.006605207,"6":0.6704458,"7":0.3229491},{"0":0.1300156,"6":0.7136957,"7":0.1562888},{"0":0.2617606,"1":0.005303502,"6":0.6483128,"7":0.08140867,"8":0.003214299},{"0":0.1759783,"6":0.7255925,"7":0.09842932},{"0":0.007232785,"6":0.6098098,"7":0.3829573},{"0":0.1615651,"6":0.6973693,"7":0.1375237,"8":0.003541767},{"6":0.1070768,"7":0.8929232},{"6":1},{"0":0.2873719,"1":0.02704691,"6":0.6164536,"7":0.06912755},{"0":0.1276543,"6":0.7567887,"7":0.07208502,"8":0.04347193},{"6":0.1654026,"7":0.8345974},{"0":0.1981521,"6":0.5803259,"7":0.1073651,"8":0.1141569},{"0":0.5601893,"1":0.01396304,"6":0.3975045,"7":0.02834314},{"0":0.6531277,"6":0.2747717,"8":0.07210052},{"0":0.3259328,"6":0.5017606,"7":0.05389326,"8":0.1184133},{"0":0.2476063,"1":0.6800665,"2":0.07232719},{"1":1},{"0":0.09322613,"1":0.8301536,"2":0.07662028},{"0":0.1797332,"1":0.8012376,"2":0.01902914},{"0":0.05343282,"1":0.9465672},{"0":0.01424401,"1":0.9223438,"2":0.06341218},{"7":1},{"7":1},{"1":0.5032523,"2":0.4967477},{"1":0.730323,"2":0.2696769},{"1":0.8229352,"2":0.1770647},{"1":0.4096124,"2":0.5903876},{"1":0.4647484,"2":0.5352517},{"1":0.5231075,"2":0.4768926},{"1":0.3066072,"2":0.6933928},{"1":0.2934044,"2":0.7065957},{"1":0.3585786,"2":0.6414214},{"0":0.1004887,"1":0.7015569,"3":0.1979544},{"0":0.08684229,"1":0.729828,"3":0.1833297},{"0":0.1338265,"1":0.6078882,"3":0.2582852},{"0":0.1092424,"1":0.591433,"3":0.2993246},{"0":0.09439128,"1":0.683997,"3":0.2216116},{"6":0.8465465,"8":0.1534534},{"0":0.2343882,"3":0.004723966,"8":0.6700752,"9":0.09081256},{"0":0.07891088,"1":0.1664604,"3":0.7546286},{"0":0.3284507,"8":0.6260824,"9":0.04546684},{"0":0.0535221,"1":0.02288734,"3":0.8932034,"4":0.03038704},{"0":0.2751911,"8":0.6260741,"9":0.09873467},{"0":0.08281898,"1":0.0391457,"3":0.8780352},{"0":0.2334923,"1":0.3843095,"3":0.382198},{"0":0.4271857,"6":0.2470986,"7":0.01660406,"8":0.2886754,"9":0.02043616},{"0":0.1670918,"1":0.4186298,"3":0.4142783},{"3":0.4037138,"4":0.5962862},{"0":0.3935915,"3":0.5459502,"4":0.05692249,"8":0.003535747},{"0":0.675489,"3":0.1217411,"8":0.2027699},{"0":0.21888,"3":0.7622942,"4":0.01882588},{"0":0.7237164,"3":0.09792172,"8":0.1783617},{"0":0.1506307,"3":0.8016271,"4":0.04774212},{"0":0.7656924,"3":0.08459377,"8":0.1497138},{"0":0.7831579,"1":0.1088062,"3":0.1080359},{"0":0.8439375,"1":0.0160827,"3":0.0155999,"6":0.06155377,"8":0.06282597},{"0":0.774918,"1":0.1128686,"3":0.1122134},{"0":0.832537,"1":0.008938014,"3":0.008690595,"6":0.07790464,"8":0.07192957},{"0":0.1167212,"1":0.3103773,"3":0.5729016},{"0":0.325379,"6":0.1078932,"8":0.5667278},{"0":0.4100058,"6":0.1148651,"8":0.4016353,"9":0.07349377},{"0":0.1401403,"1":0.2623282,"3":0.5975315},{"6":0.147547,"8":0.8524531},{"0":0.7626414,"1":0.06378829,"3":0.1735703},{"0":0.8299831,"3":0.05824762,"6":0.01175278,"8":0.1000164},{"0":0.7316107,"1":0.05141603,"3":0.2169731},{"0":0.8134921,"3":0.05691659,"6":0.01481407,"8":0.1147773},{"9":1},{"9":1},{"9":1},{"9":1},{"9":1},{"9":1},{"8":0.1603692,"9":0.8396308},{"8":0.2617661,"9":0.7382339},{"8":0.3166495,"9":0.6833505},{"8":0.1201747,"9":0.8798254},{"8":0.1228536,"9":0.8771464},{"8":0.09292262,"9":0.9070774},{"0":0.01123034,"1":0.030142,"3":0.924044,"4":0.0345835},{"0":0.09708768,"1":0.1877349,"3":0.7151774},{"0":0.09369671,"1":0.214317,"3":0.6919863},{"0":0.6066106,"3":0.3818547,"8":0.01153469},{"0":0.6766771,"3":0.3168746,"8":0.006448328},{"0":0.2751009,"3":0.6529086,"4":0.07199037},{"3":0.2183414,"4":0.7816587},{"3":0.2194466,"4":0.7805534},{"3":0.2124866,"4":0.7875133},{"3":0.2269082,"4":0.7730917},{"3":0.227621,"4":0.7723791},{"3":0.2130337,"4":0.7869663},{"0":0.1716395,"1":0.1952415,"3":0.633119},{"0":0.1061015,"1":0.09877532,"3":0.7951232},{"0":0.04893392,"1":0.08986121,"3":0.8612048},{"0":0.0966888,"1":0.09818559,"3":0.8051255},{"0":0.2129816,"1":0.2200348,"3":0.5669836},{"0":0.2494574,"1":0.3767848,"3":0.3737578},{"0":0.1265367,"1":0.4390007,"3":0.4344625},{"9":1},{"9":1},{"9":1},{"9":1},{"9":1},{"9":1},{"9":1},{"9":1},{"9":1},{"9":1},{"9":1},{"9":1},{"9":1},{"9":1},{"3":0.5704828,"4":0.4295172},{"3":0.1485283,"4":0.8514716},{"3":0.5701085,"4":0.4298915},{"3":0.08525991,"4":0.9147401},{"3":0.117807,"4":0.8821931},{"3":0.09473919,"4":0.9052608},{"8":0.7872393,"9":0.2127608},{"0":0.1420333,"8":0.7097105,"9":0.1482561},{"0":0.3162385,"3":0.00629127,"8":0.5976874,"9":0.07978278},{"0":0.1676911,"8":0.7571711,"9":0.07513773},{"8":0.714129,"9":0.285871},{"0":0.205591,"8":0.6606079,"9":0.1338011},{"8":0.05389857,"9":0.9461014},{"8":1},{"0":0.3002343,"3":0.02725613,"8":0.6072508,"9":0.06525868},{"0":0.1126326,"6":0.03164076,"8":0.819395,"9":0.03633165},{"8":0.1168295,"9":0.8831705},{"0":0.2676394,"6":0.07481342,"8":0.5474813,"9":0.1100659},{"0":0.5635073,"3":0.01340466,"8":0.4103197,"9":0.01276838},{"0":0.6728033,"6":0.1620736,"8":0.1651231},{"0":0.5445252,"6":0.2183086,"7":0.004740595,"8":0.2247861,"9":0.007639467},{"0":0.6480156,"6":0.07050013,"8":0.2814843},{"0":0.5239201,"6":0.08189928,"8":0.3378331,"9":0.05634748},{"0":0.2481275,"3":0.6759511,"4":0.07592141},{"3":0.9242183,"4":0.07578164},{"0":0.09333759,"3":0.8233928,"4":0.08326965},{"0":0.1794764,"3":0.7901977,"4":0.03032588},{"0":0.05322092,"3":0.9238507,"4":0.02292829},{"0":0.01431125,"3":0.9020218,"4":0.08366686},{"9":1},{"9":1},{"3":0.3936612,"4":0.6063388},{"3":0.7032915,"4":0.2967085},{"3":0.7226139,"4":0.2773861},{"3":0.2874422,"4":0.7125579},{"3":0.2830181,"4":0.7169819},{"3":0.1935155,"4":0.8064844},{"3":0.2058646,"4":0.7941355},{"3":0.1632471,"4":0.8367529},{"3":0.1599746,"4":0.8400254},{"0":0.1012873,"1":0.2014623,"3":0.6972505},{"0":0.1198177,"1":0.4424818,"3":0.4377005},{"0":0.08771759,"1":0.186924,"3":0.7253584},{"0":0.1640705,"1":0.4201674,"3":0.4157621},{"0":0.1344687,"1":0.2621104,"3":0.6034208},{"0":0.1097673,"1":0.3036616,"3":0.5865711},{"0":0.09517008,"1":0.2255073,"3":0.6793225},{"0":0.4581592,"6":0.2699225,"8":0.2719182},{"7":1},{"7":1},{"7":1},{"7":1},{"7":1},{"7":1},{"7":1},{"7":1},{"9":1},{"9":1},{"9":1},{"9":1},{"9":1},{"9":1},{"9":1},{"9":1},{"0":0.1516197,"6":0.644753,"8":0.2036272},{"0":0.06838029,"6":0.8409362,"7":0.01745873,"8":0.07322472},{"6":0.5595188,"7":0.4404813},{"0":0.2215688,"6":0.4055854,"8":0.3728458},{"0":0.1433436,"6":0.2192026,"8":0.6374536},{"0":0.05214607,"6":0.06543993,"8":0.8824139},{"8":0.6795266,"9":0.3204734},{"7":1},{"7":1},{"7":1},{"7":1},{"7":1},{"7":1},{"9":1},{"9":1},{"9":1},{"9":1},{"9":1},{"9":1},{"8":0.1052346,"9":0.8947655},{"8":0.2562466,"9":0.7437534},{"9":1},{"6":0.2545523,"7":0.7454477},{"7":1},{"6":0.1207419,"7":0.8792582}],"keyframes":{"5":[[1,0,0,0,0,1,0,0,0,0,1,0,0.031924,0.02476,-0.603667,1],[1,0,0,0,0,1,0,0,0,0,1,0,0.031924,0.02476,-0.603667,1],[1,0,0,0,0,1,0,0,0,0,1,0,0.031924,0.02476,-0.603667,1],[1,0,0,0,0,1,0,0,0,0,1,0,0.031924,0.02476,-0.603667,1],[1,0,0,0,0,1,0,0,0,0,1,0,0.031924,0.02476,-0.603667,1],[1,0,0,0,0,1,0,0,0,0,1,0,0.031924,0.02476,-0.603667,1],[1,0,0,0,0,1,0,0,0,0,1,0,0.087596,0.039835,-0.521234,1],[1,0,0,0,0,1,0,0,0,0,1,0,0.087596,0.039835,-0.521234,1],[1,0,0,0,0,1,0,0,0,0,1,0,0,0,-0.488602,1],[1,0,0,0,0,1,0,0,0,0,1,0,0,0,-0.488602,1]],"0.04166662":[[1,0,0,0,0,1,0,0,0,0,1,0,0,0,-0.488602,1],[0.904368,0,-0.426754,0,0,1,0,0,0.426754,0,0.904368,0,-0.34546,0,-0.411187,1],[0.174924,0,-0.984582,0,0,1,0,0,0.984582,0,0.174924,0,-0.619726,0,0.314886,1],[0.944562,0,0.328333,0,0,1,0,0,-0.328333,0,0.944562,0,0.265787,0,-0.443725,1],[0.368271,0,0.929718,0,0,1,0,0,-0.929718,0,0.368271,0,0.613165,0,0.168305,1],[1,0,0,0,0,1,0,0,0,0,1,0,0,0,-0.488602,1],[1,0,0,0,0,1,0,0,0,0,1,0,0,0,-0.488602,1],[1,0,0,0,0,1,0,0,0,0,1,0,0,0,-0.488602,1],[1,0,0,0,0,1,0,0,0,0,1,0,0,0,-0.488602,1],[1,0,0,0,0,1,0,0,0,0,1,0,0,0,-0.488602,1]],"0.8333333":[[1,0,0,0,0,1,0,0,0,0,1,0,0,0,-0.488602,1],[0.904368,0,-0.426754,0,0,1,0,0,0.426754,0,0.904368,0,-0.34546,0,-0.411187,1],[0.174924,0,-0.984582,0,0,1,0,0,0.984582,0,0.174924,0,-0.619726,0,0.314886,1],[0.995276,0,-0.097087,0,0,1,0,0,0.097087,0,0.995276,0,-0.078592,0,-0.484778,1],[0.723547,0,0.690275,0,0,1,0,0,-0.690275,0,0.723547,0,0.49303,0,-0.074291,1],[1,0,0,0,0,0.758188,-0.652036,0,0,0.652036,0.758188,0,0,-0.527827,-0.292854,1],[1,0,0,0,0,1,0,0,0,0,1,0,0,0,-0.488602,1],[0.840149,0,0.542356,0,0,1,0,0,-0.542356,0,0.840149,0,0.18483,0,-0.487023,1],[1,0,0,0,0,1,0,0,0,0,1,0,0,0,-0.488602,1],[1,0,0,0,0,1,0,0,0,0,1,0,0,0,-0.488602,1]],"1.75":[[1,0,0,0,0,1,0,0,0,0,1,0,0,0,-0.488602,1],[0.904368,0,-0.426754,0,0,1,0,0,0.426754,0,0.904368,0,-0.34546,0,-0.411187,1],[0.84527,0.226158,-0.484119,0,-0.269274,0.962849,-0.020352,0,0.461531,0.147564,0.874765,0,-0.359247,-0.174423,-0.373281,1],[0.907506,-0.102351,-0.407378,0,0.088679,0.994683,-0.052358,0,0.410571,0.01139,0.911758,0,-0.332359,-0.00922,-0.41717,1],[0.773203,-0.355471,-0.525164,0,0.189599,0.919829,-0.343462,0,0.605152,0.165996,0.778612,0,-0.522371,-0.195623,-0.337888,1],[0.913483,-0.406876,0,0,0.308488,0.692592,-0.652036,0,0.265298,0.595624,0.758188,0,-0.21476,-0.482161,-0.292854,1],[1,0,0,0,0,1,0,0,0,0,1,0,0,0,-0.488602,1],[1,0,0,0,0,1,0,0,0,0,1,0,0,0,-0.488602,1],[1,0,0,0,0,1,0,0,0,0,1,0,0,0,-0.488602,1],[0.705724,-0.232845,-0.669132,0,0.170379,0.972512,-0.158718,0,0.687695,-0.001995,0.725997,0,-0.231292,-0.020497,-0.467675,1]],"2.541667":[[1,0,0,0,0,1,0,0,0,0,1,0,0,0,-0.488602,1],[0.904368,0,-0.426754,0,0,1,0,0,0.426754,0,0.904368,0,-0.34546,0,-0.411187,1],[0.174924,0,-0.984582,0,0,1,0,0,0.984582,0,0.174924,0,-0.619726,0,0.314886,1],[0.944562,0,0.328333,0,0,1,0,0,-0.328333,0,0.944562,0,0.265787,0,-0.443725,1],[0.368271,0,0.929718,0,0,1,0,0,-0.929718,0,0.368271,0,0.613165,0,0.168305,1],[1,0,0,0,0,1,0,0,0,0,1,0,0,0,-0.488602,1],[1,0,0,0,0,1,0,0,0,0,1,0,0,0,-0.488602,1],[1,0,0,0,0,1,0,0,0,0,1,0,0,0,-0.488602,1],[1,0,0,0,0,1,0,0,0,0,1,0,0,0,-0.488602,1],[1,0,0,0,0,1,0,0,0,0,1,0,0,0,-0.488602,1]],"3.333333":[[1,0,0,0,0,0.764502,0.644621,0,0,-0.644621,0.764502,0,0,0,-0.488602,1],[0.904368,0.275095,-0.326254,0,0,0.764502,0.644621,0,0.426754,-0.582975,0.691391,0,-0.34546,-0.049903,-0.429418,1],[0.662237,0.634683,-0.398271,0,-0.462876,0.764502,0.448646,0,0.589227,-0.11276,0.800061,0,-0.41813,-0.517946,-0.499883,1],[0.944562,-0.21165,0.251011,0,0,0.764502,0.644621,0,-0.328333,-0.608885,0.72212,0,0.265787,-0.028929,-0.454293,1],[0.750934,-0.599316,0.27734,0,0.434167,0.764502,0.476483,0,-0.497591,-0.237396,0.834294,0,0.35595,-0.423456,-0.538729,1],[1,0,0,0,0,0.764502,0.644621,0,0,-0.644621,0.764502,0,0,0,-0.488602,1],[1,0,0,0,0,1,0,0,0,0,1,0,0,0,-0.488602,1],[1,0,0,0,0,1,0,0,0,0,1,0,0,0,-0.488602,1],[1,0,0,0,0,1,0,0,0,0,1,0,0,0,-0.488602,1],[1,0,0,0,0,1,0,0,0,0,1,0,0,0,-0.488602,1]],"4.166666":[[1,0,0,0,0,0.764502,0.644621,0,0,-0.644621,0.764502,0,0,0,-0.488602,1],[0.904368,0.275095,-0.326254,0,0,0.764502,0.644621,0,0.426754,-0.582975,0.691391,0,-0.34546,-0.049903,-0.429418,1],[0.662237,0.634683,-0.398271,0,-0.462876,0.764502,0.448646,0,0.589227,-0.11276,0.800061,0,-0.41813,-0.517946,-0.499883,1],[0.944562,-0.21165,0.251011,0,0,0.764502,0.644621,0,-0.328333,-0.608885,0.72212,0,0.265787,-0.028929,-0.454293,1],[0.750934,-0.599316,0.27734,0,0.434167,0.764502,0.476483,0,-0.497591,-0.237396,0.834294,0,0.35595,-0.423456,-0.538729,1],[1,0,0,0,0,0.764502,0.644621,0,0,-0.644621,0.764502,0,0,0,-0.488602,1],[1,0,0,0,0,1,0,0,0,0,1,0,0.087596,0.039835,-0.521234,1],[0.545323,-0.259402,0.797078,0,-0.123033,0.915842,0.382226,0,-0.829148,-0.306504,0.467514,0,0.390235,0.160282,-0.429112,1],[1,0,0,0,0,1,0,0,0,0,1,0,0,0,-0.488602,1],[0.803427,0.434424,-0.407163,0,-0.273799,0.876818,0.395253,0,0.528715,-0.206076,0.823403,0,-0.188633,0.096963,-0.456572,1]]},"vertexNormalIndices":[1139,1140,1141,1142,1143,1144,1145,1146,1147,1148,1149,1150,1151,1152,1153,1154,1155,1156,1157,1158,1159,1160,1161,1162,1163,1164,1165,1166,1167,1168,1169,1170,1171,1172,1173,1174,1175,1176,1177,1178,1179,1180,1181,1182,1183,1184,1185,1186,1187,1188,1189,1190,1191,1192,1193,1194,1195,1196,1197,1198,1199,1200,1201,1202,1203,1204,1205,1206,1207,1208,1209,1210,1211,1212,1213,1214,1215,1216,1217,1218,1219,1220,1221,1222,1223,1224,1225,1226,1227,1228,1229,1230,1231,1232,1233,1234,1235,1236,1237,1238,1239,1240,1241,1242,1243,1244,1245,1246,1247,1248,1249,1250,1251,1252,1253,1254,1255,1256,1257,1258,1259,1260,1261,1262,1263,1264,1265,1266,1267,1268,1269,1270,1271,1272,1273,1274,1275,1276,1277,1278,1279,1280,1281,1282,1283,1284,1285,1286,1287,1288,1289,1290,1291,1292,1293,1294,1295,1296,1297,1298,1299,1300,1301,1302,1303,1304,1305,1306,1307,1308,1309,1310,1311,1312,1313,1314,1315,1316,1317,1318,1319,1320,1321,1322,1322,1322,1323,1324,1325,1326,1327,1328,1329,1330,1331,1332,1333,1334,1335,1336,1337,1338,1338,1338,1339,1340,1341,1342,1343,1344,1345,1345,1345,1346,1346,1346,1347,1348,1349,1350,1351,1352,1353,1354,1355,1356,1356,1356,1357,1358,1359,1360,1361,1362,1363,1364,1365,1366,1367,1368,1369,1370,1371,1372,1373,1374,1375,1376,1377,1378,1379,1380,1381,1382,1383,1384,1385,1386,1387,1388,1389,1390,1391,1392,1393,1393,1393,1394,1394,1394,1395,1396,1397,1398,1399,1400,1401,1402,1403,1404,1405,1406,1407,1407,1407,1408,1409,1410,1411,1412,1413,1414,1415,1416,1417,1417,1417,1418,1418,1418,1419,1419,1419,1420,1421,1422,1423,1424,1425,1426,1427,1428,1429,1430,1431,1432,1433,1434,1435,1436,1437,1438,1439,1440,1441,1442,1443,1444,1445,1446,1447,1448,1449,1450,1451,1452,1453,1454,1455,1456,1457,1458,1459,1460,1461,1462,1463,1464,1465,1466,1467,1468,1469,1470,1471,1472,1473,1474,1475,1476,1477,1478,1479,1480,1481,1482,1483,1484,1485,1486,1487,1488,1489,1490,1491,1492,1493,1494,1495,1496,1497,1498,1499,1500,1501,1502,1503,1504,1505,1506,1507,1508,1509,1510,1511,1512,1513,1514,1515,1516,1517,1518,1519,1520,1521,1522,1523,1524,1525,1526,1527,1528,1529,1530,1531,1532,1533,1534,1535,1536,1537,1538,1539,1540,1541,1542,1543,1544,1545,1546,1547,1548,1549,1550,1551,1552,1553,1554,1555,1556,1557,1558,1559,1560,1561,1562,1563,1564,1565,1566,1567,1568,1569,1570,1571,1572,1573,1574,1575,1576,1577,1578,1579,1580,1581,1582,1583,1584,1585,1586,1587,1588,1589,1590,1591,1592,1593,1594,1595,1596,1597,1598,1599,1600,1601,1602,1603,1604,1605,1606,1607,1608,1609,1610,1611,1612,1613,1614,1615,1616,1617,1618,1619,1620,1621,1622,1623,1624,1625,1626,1627,1628,1629,1630,1631,1632,1633,1634,1635,1636,1637,1638,1639,1640,1641,1642,1643,1644,1645,1645,1645,1646,1647,1648,1649,1650,1651,1652,1653,1654,1655,1656,1657,1658,1659,1660,1661,1662,1663,1664,1665,1666,1667,1668,1669,1670,1670,1670,1671,1672,1673,1674,1675,1676,1677,1678,1679,1680,1681,1682,1683,1683,1683,1684,1685,1686,1687,1688,1689,1690,1691,1692,1693,1694,1695,1696,1697,1698,1699,1700,1701,1702,1703,1704,1705,1706,1707,1708,1709,1710,1711,1712,1713,1714,1715,1716,1717,1718,1719,1720,1720,1720,1721,1722,1723,1724,1725,1726,1727,1728,1729,1730,1731,1732,1733,1733,1733,1734,1735,1736,1737,1738,1739,1740,1741,1742,1743,1743,1743,1744,1744,1744,1745,1745,1745,1746,1747,1748,1749,1750,1751,1752,1753,1754,1755,1756,1757,1758,1759,1760,1761,1762,1763,1764,1765,1766,1767,1768,1769,1770,1771,1772,1773,1774,1775,1776,1777,1778,1779,1780,1781,1782,1783,1784,1785,1786,1787,1788,1789,1790,1791,1792,1793,1794,1795,1796,1797,1798,1799,1800,1801,1802,1803,1804,1805,1806,1807,1808,1809,1810,1811,1812,1813,1814,1815,1816,1817,1818,1819,1820,1821,1822,1823,1824,1825,1826,1827,1828,1829,1830,1831,1832,1833,1834,1835,1836,1837,1838,1839,1840,1841,1842,1843,1844,1845,1846,1847,1848,1849,1850,1851,1852,1853,1854,1855,1856,1857,1858,1859,1860,1861,1862,1863,1864,1865,1866,1867,1868,1869,1870,1871,1872,1873,1874,1875,1876,1877,1878,1879,1880,1881,1882,1883,1884,1885,1886,1887,1888,1889,1890,1891,1892,1893,1893,1893,1894,1894,1894,1895,1896,1897,1898,1898,1898,1899,1900,1901,1902,1903,1904,1905,1906,1907,1908,1909,1910,2278,1139,1141,2279,1142,1144,2280,1145,1147,2281,1148,1150,2282,1151,1153,2283,1154,1156,2284,1157,1159,2285,1160,1162,2286,1163,1165,2287,1166,1168,2288,1169,1171,2289,1172,1174,2290,1175,1177,2291,1178,1180,2292,1181,1183,2293,1184,1186,2294,1187,1189,2295,1190,1192,2296,1193,1195,2297,1196,1198,2298,1199,1201,2299,1202,1204,2300,1205,1207,2301,1208,1210,2302,1211,1213,2303,1214,1216,2304,1217,1219,2305,1220,1222,2306,1223,1225,2307,1226,1228,2308,1229,1231,2309,1232,1234,2310,1235,1237,2311,1238,1240,2312,1241,1243,2313,1244,1246,2314,1247,1249,2315,1250,1252,2316,1253,1255,2317,1256,1258,2318,1259,1261,2319,1262,1264,2320,1265,1267,2321,1268,1270,2322,1271,1273,2323,1274,1276,2324,1277,1279,2325,1280,1282,2326,1283,1285,2327,1286,1288,2328,1289,1291,2329,1292,1294,2330,1295,1297,2331,1298,1300,2332,1301,1303,2333,1304,1306,2334,1307,1309,2335,1310,1312,2336,1313,1315,2337,1316,1318,2338,1319,1321,2339,1323,1325,2340,1326,1328,2341,1329,1331,2342,1332,1334,2343,1335,1337,2344,1339,1341,2345,1342,1344,2346,1347,1349,2347,1350,1352,2348,1353,1355,2349,1357,1359,2350,1360,1362,2351,1363,1365,2352,1366,1368,2353,1369,1371,2354,1372,1374,2355,1375,1377,2356,1378,1380,2357,1381,1383,2358,1384,1386,2359,1387,1389,2360,1390,1392,2361,1395,1397,2362,1398,1400,2363,1401,1403,2364,1404,1406,2365,1408,1410,2366,1411,1413,2367,1414,1416,2368,1420,1422,2369,1423,1425,2370,1426,1428,2371,1429,1431,2372,1432,1434,2373,1435,1437,2374,1438,1440,2375,1441,1443,2376,1444,1446,2377,1447,1449,2378,1450,1452,2379,1453,1455,2380,1456,1458,2381,1459,1461,2382,1462,1464,2383,1465,1467,2384,1468,1470,2385,1471,1473,2386,1474,1476,2387,1477,1479,2388,1480,1482,2389,1483,1485,2390,1486,1488,2391,1489,1491,2392,1492,1494,2393,1495,1497,2394,1498,1500,2395,1501,1503,2396,1504,1506,2397,1507,1509,2398,1510,1512,2399,1513,1515,2400,1516,1518,2401,1519,1521,2402,1522,1524,2403,1525,1527,2404,1528,1530,2405,1531,1533,2406,1534,1536,2407,1537,1539,2408,1540,1542,2409,1543,1545,2410,1546,1548,2411,1549,1551,2412,1552,1554,2413,1555,1557,2414,1558,1560,2415,1561,1563,2416,1564,1566,2417,1567,1569,2418,1570,1572,2419,1573,1575,2420,1576,1578,2421,1579,1581,2422,1582,1584,2423,1585,1587,2424,1588,1590,2425,1591,1593,2426,1594,1596,2427,1597,1599,2428,1600,1602,2429,1603,1605,2430,1606,1608,2431,1609,1611,2432,1612,1614,2433,1615,1617,2434,1618,1620,2435,1621,1623,2436,1624,1626,2437,1627,1629,2438,1630,1632,2439,1633,1635,2440,1636,1638,2441,1639,1641,2442,1642,1644,2443,1646,1648,2444,1649,1651,2445,1652,1654,2446,1655,1657,2447,1658,1660,2448,1661,1663,2449,1664,1666,2450,1667,1669,2451,1671,1673,2452,1674,1676,2453,1677,1679,2454,1680,1682,2455,1684,1686,2456,1687,1689,2457,1690,1692,2458,1693,1695,2459,1696,1698,2460,1699,1701,2461,1702,1704,2462,1705,1707,2463,1708,1710,2464,1711,1713,2465,1714,1716,2466,1717,1719,2467,1721,1723,2468,1724,1726,2469,1727,1729,2470,1730,1732,2471,1734,1736,2472,1737,1739,2473,1740,1742,2474,1746,1748,2475,1749,1751,2476,1752,1754,2477,1755,1757,2478,1758,1760,2479,1761,1763,2480,1764,1766,2481,1767,1769,2482,1770,1772,2483,1773,1775,2484,1776,1778,2485,1779,1781,2486,1782,1784,2487,1785,1787,2488,1788,1790,2489,1791,1793,2490,1794,1796,2491,1797,1799,2492,1800,1802,2493,1803,1805,2494,1806,1808,2495,1809,1811,2496,1812,1814,2497,1815,1817,2498,1818,1820,2499,1821,1823,2500,1824,1826,2501,1827,1829,2502,1830,1832,2503,1833,1835,2504,1836,1838,2505,1839,1841,2506,1842,1844,2507,1845,1847,2508,1848,1850,2509,1851,1853,2510,1854,1856,2511,1857,1859,2512,1860,1862,2513,1863,1865,2514,1866,1868,2515,1869,1871,2516,1872,1874,2517,1875,1877,2518,1878,1880,2519,1881,1883,2520,1884,1886,2521,1887,1889,2522,1890,1892,2523,1895,1897,2524,1899,1901,2525,1902,1904,2526,1905,1907,2527,1908,1910],"vertexNormals":[0.1666487,-0.92032,0.3538916,0.1666487,-0.9203194,0.3538935,0.1666507,-0.9203189,0.3538938,0.1519417,0.3557317,0.9221544,0.1520408,0.3547595,0.9225125,0.1496898,0.3773146,0.9139074,0.1666528,-0.9203183,0.3538944,0.1666441,-0.9203214,0.3538903,0.1666492,-0.9203216,0.3538874,0.1666507,-0.9203234,0.3538818,0.1666542,-0.920323,0.3538815,0.1666482,-0.920321,0.3538894,0.9027591,-0.001950562,-0.4301421,0.9027588,-0.001952528,-0.4301428,0.9027608,-0.001940071,-0.4301387,0.9810653,0.1906874,0.03390097,0.9810645,0.1906915,0.03390073,0.9810665,0.1906812,0.03390121,-0.009570538,-0.3604387,-0.9327338,-0.009572148,-0.3604382,-0.9327341,-0.009572148,-0.3604382,-0.932734,0.1666464,-0.9203187,0.3538963,0.1666474,-0.9203198,0.3538929,0.1682018,-0.9216209,0.3497471,0.1753332,-0.9273827,0.330484,0.1730616,-0.9255863,0.3366599,0.1666537,-0.9203185,0.3538935,0.507951,-0.2275126,-0.8307971,0.507962,-0.2275158,-0.8307896,0.5079412,-0.2275096,-0.8308038,-0.8533155,-0.3144692,-0.4158867,-0.8533276,-0.3144198,-0.4158996,-0.8533259,-0.3144261,-0.4158979,0.1666425,-0.920322,0.3538896,0.1666521,-0.9203212,0.353887,0.1666267,-0.9203217,0.353898,0.166634,-0.9203209,0.3538963,0.1666454,-0.9203157,0.3539046,0.1666467,-0.9203161,0.3539029,-0.9860165,-0.1555494,0.05979937,-0.9860196,-0.1555305,0.05979865,-0.9860185,-0.1555365,0.05979889,-0.1496057,-0.3558564,-0.9224882,-0.1472578,-0.3780769,-0.9139874,-0.147366,-0.3770752,-0.9143838,0.8154993,0.33041,0.4751739,0.8154964,0.3304136,0.4751765,0.8155219,0.3303824,0.4751544,-0.9165607,-0.0122621,0.3997078,-0.9165437,-0.01226323,0.3997466,-0.9165461,-0.01226305,0.3997411,0.01156485,0.3607075,0.9326073,0.01156508,0.3607072,0.9326075,0.01154035,0.3607427,0.9325941,0.986013,0.1555693,-0.05980503,0.9860132,0.1555684,-0.05980569,0.9860128,0.1555712,-0.0598036,-0.5093156,-0.3876612,-0.7683206,-0.5093256,-0.3876683,-0.7683104,-0.5093048,-0.3876535,-0.7683315,0.9647342,-0.2456843,0.09448385,0.9647341,-0.2456843,0.09448385,0.9647311,-0.2456942,0.09448975,-0.1666463,0.9203181,-0.3538981,-0.1666443,0.9203171,-0.3539015,-0.1666508,0.9203205,-0.3538897,-0.1666522,0.9203211,-0.3538872,-0.1666553,0.9203232,-0.3538802,-0.1666482,0.9203211,-0.3538891,-0.1666479,0.9203214,-0.3538887,-0.1666642,0.9203196,-0.3538855,-0.1666558,0.9203202,-0.3538881,-0.168626,0.9199382,-0.3539479,-0.1686261,0.9199314,-0.3539655,-0.1686249,0.9200016,-0.3537833,0.1748504,0.9189974,-0.3533712,0.1748737,0.918994,-0.3533686,0.1748268,0.9190009,-0.3533739,-0.9636285,0.2494357,-0.09592813,-0.9636318,0.2494274,-0.09591591,-0.9636317,0.2494276,-0.09591609,-0.5927149,0.3933314,0.7028368,-0.568564,0.3930251,0.72268,-0.5687661,0.3930291,0.7225188,0.5290324,-0.3834049,-0.7570505,0.5291135,-0.3834092,-0.7569917,0.5091937,-0.3822706,-0.7710974,-0.1663309,-0.9203729,0.3539035,-0.166329,-0.9203724,0.3539059,-0.166334,-0.9203702,0.3539092,-0.1497246,0.3772919,0.9139111,-0.1520668,0.3546999,0.9225312,-0.1519681,0.3556737,0.9221724,-0.1663281,-0.920376,0.3538969,-0.1663276,-0.9203764,0.3538962,-0.1663258,-0.9203723,0.3539077,-0.1663379,-0.9203692,0.35391,-0.1663164,-0.9203743,0.3539069,-0.1663252,-0.9203723,0.353908,-0.9027998,-0.002206623,-0.4300556,-0.9028003,-0.002206623,-0.4300545,-0.9027968,-0.002206683,-0.4300618,-0.9811225,0.1903766,0.03399211,-0.9811226,0.1903762,0.03399235,-0.9811224,0.1903773,0.03399175,0.009596526,-0.3603883,-0.9327531,0.009607493,-0.3603827,-0.9327551,0.009607374,-0.3603827,-0.9327551,-0.1663323,-0.9203735,0.3539016,-0.1663318,-0.9203721,0.3539053,-0.1678834,-0.9216729,0.3497632,-0.1663321,-0.9203721,0.353905,-0.1727436,-0.9256398,0.3366762,-0.5079575,-0.2276669,-0.8307509,-0.507915,-0.2276695,-0.8307761,-0.5079373,-0.2276681,-0.8307629,0.853375,-0.3141708,-0.4159904,0.85337,-0.3141888,-0.4159868,0.8533707,-0.3141866,-0.4159873,-0.166337,-0.9203714,0.3539049,-0.166343,-0.9203694,0.3539071,-0.1663305,-0.9203707,0.3539097,-0.166341,-0.920368,0.3539116,-0.1663241,-0.9203724,0.3539083,-0.166323,-0.9203727,0.3539081,0.9860672,-0.155261,0.05971103,0.9860673,-0.155261,0.05971115,0.9860672,-0.155261,0.05971074,0.149621,-0.3558022,-0.9225066,0.1497175,-0.3548598,-0.9228538,0.1473906,-0.3770866,-0.914375,-0.8155701,0.3301311,0.4752463,-0.8155689,0.3301335,0.4752467,-0.8155796,0.3301125,0.4752427,0.9165931,-0.01198059,0.3996418,0.9165928,-0.01198232,0.3996426,0.9165954,-0.0119701,0.3996368,-0.01157808,0.3606988,0.9326106,-0.01160681,0.3606867,0.9326149,-0.01160657,0.3606867,0.9326148,-0.9860685,0.1552541,-0.05970823,-0.9860708,0.1552408,-0.0597046,-0.9860702,0.1552447,-0.05970567,0.5093713,-0.3875117,-0.7683591,0.5093736,-0.3875228,-0.768352,0.5093689,-0.3874999,-0.7683667,-0.9646482,-0.2459867,0.09457612,-0.9646435,-0.2460045,0.09457707,-0.9646436,-0.2460043,0.09457701,0.166332,0.9203705,-0.3539094,0.1663369,0.9203708,-0.3539065,0.1663358,0.920371,-0.3539065,0.1663268,0.9203706,-0.3539118,0.1663298,0.9203705,-0.3539105,0.1663355,0.9203711,-0.3539062,0.1663406,0.9203708,-0.3539046,0.1663441,0.9203703,-0.3539042,0.166348,0.9203698,-0.3539037,0.1683033,0.9200534,-0.353802,0.1683105,0.9199886,-0.3539667,0.1683098,0.9199949,-0.3539509,-0.1751293,0.9189484,-0.3533607,-0.1751607,0.9189445,-0.3533552,-0.1751453,0.9189463,-0.3533579,0.9635424,0.249732,-0.09602159,0.9635424,0.249732,-0.09602165,0.9635424,0.2497342,-0.09601581,0.5686656,0.3932253,0.722491,0.5684629,0.3932214,0.7226527,0.5926948,0.3935024,0.702758,-0.5289885,-0.3835715,-0.7569967,-0.5090239,-0.3824034,-0.7711437,-0.5091803,-0.3824133,-0.7710354,0.7016558,0.6178855,-0.3548192,0.6358836,0.6438492,-0.4255706,0.6979008,0.6196207,-0.3591721,0.3179005,0.8158303,-0.4830737,0.3092666,0.824886,-0.473199,0.3204512,0.8130987,-0.4859852,0.9094833,0.2278085,-0.3477695,0.5940026,0.6702941,-0.4448223,0.9079529,-0.4112507,-0.08058935,0.7554551,0.6521779,-0.06286191,0.7583851,0.6491201,-0.05911982,0.7544751,0.6531905,-0.06410628,0.9457668,0.2960046,-0.1338155,0.9152806,0.4005283,-0.04287731,0.9409472,0.3184424,-0.1149482,0.3189541,0.9464156,-0.05065429,0.3090996,0.9492387,-0.05833792,0.3239512,0.9449186,-0.04673916,0.8198459,-0.5132014,-0.2539238,0.8889293,-0.4304318,-0.1566312,0.848096,-0.4830775,-0.2176447,0.2332674,0.6182759,-0.7505474,0.2486214,0.5624923,-0.7885367,0.206403,0.7012804,-0.6823515,0.55768,0.5640648,-0.6089532,0.5533422,0.5644086,-0.612581,0.556468,0.5641628,-0.6099703,-0.7006899,0.6177504,-0.3569568,-0.7381371,0.5984945,-0.3113807,-0.6944141,0.620626,-0.3641601,-0.3110899,0.8227678,-0.475685,-0.3094817,0.8244382,-0.4738383,-0.3107541,0.8231174,-0.4752994,-0.9095417,0.2275171,-0.3478074,-0.8018042,-0.5970101,0.02624726,-0.9078179,-0.4115409,-0.08062762,-0.7557113,0.6518867,-0.06280386,-0.7513703,0.6563379,-0.06828725,-0.7547197,0.6529123,-0.06406271,-0.9410371,0.3181569,-0.1150019,-0.9154049,0.400236,-0.04295378,-0.9458502,0.2957132,-0.1338706,-0.3190397,0.9463763,-0.05084794,-0.3335908,0.9418943,-0.03939956,-0.3240941,0.9448624,-0.04688364,-0.8479323,-0.4833492,-0.2176798,-0.8887844,-0.4307173,-0.1566686,-0.8196713,-0.5134634,-0.2539573,-0.1923128,0.6795436,-0.7079805,-0.2318673,0.5645323,-0.7921748,-0.216199,0.6133834,-0.7596175,-0.5587992,0.5644471,-0.6075715,-0.5614393,0.5643769,-0.6051981,-0.5572037,0.5644859,-0.608999,-0.6770952,-0.7008405,0.224421,-0.7312564,-0.5748426,0.3671786,-0.6971204,-0.6639421,0.2705624,-0.3616182,-0.8269146,0.4306329,-0.3267027,-0.8597317,0.3925899,-0.3570597,-0.8314506,0.425674,-0.9245049,0.3542013,0.1408268,-0.9572836,-0.06944912,0.2806866,-0.9664332,0.1303679,0.2213848,-0.7512633,-0.6599174,0.01060807,-0.769174,-0.638956,-0.01032233,-0.758629,-0.6515194,0.002128839,-0.9826075,0.05822467,-0.1763308,-0.9773523,0.1982002,-0.0741567,-0.9674295,-0.04683649,-0.2487702,-0.3431313,-0.9391883,-0.01365309,-0.3188331,-0.9478105,0.000879786,-0.3298867,-0.9440033,-0.005710601,-0.9726092,0.003449559,-0.2324213,-0.921486,-0.1648167,-0.3517086,-0.9786204,0.1834059,-0.09308272,-0.3066267,-0.7369739,0.6023701,-0.3314079,-0.6670324,0.6672607,-0.3203133,-0.7002844,0.6379665,-0.4738258,-0.7087268,0.5226811,-0.4285711,-0.7037275,0.5666519,-0.5150878,-0.7108468,0.4789379,0.6965937,-0.6608392,0.2793722,0.7280889,-0.5705713,0.3799145,0.675011,-0.7026075,0.2251732,0.3519924,-0.8367696,0.4194258,0.3270318,-0.8597636,0.392246,0.354888,-0.8339579,0.4225744,0.9243862,0.354496,0.1408652,0.8935064,0.4360443,0.1072928,0.9663823,0.1306766,0.2214249,0.7514486,-0.6597054,0.01067328,0.7386803,-0.6735927,0.02498739,0.7587952,-0.6513257,0.002212584,0.9674507,-0.04643797,-0.2487626,0.9772837,0.1985253,-0.07419174,0.9825835,0.05859303,-0.1763421,0.3435224,-0.939045,-0.01367175,0.3540441,-0.9350146,-0.0200141,0.3303627,-0.9438364,-0.005784213,0.9785653,0.1837204,-0.09304153,0.9215535,-0.1645215,-0.35167,0.9726178,0.003761649,-0.2323804,0.3092343,-0.6986768,0.6451549,0.3205359,-0.669839,0.6697555,0.2974769,-0.7263581,0.6196058,0.472642,-0.7041162,0.5299341,0.5487904,-0.7089695,0.4429349,0.5171519,-0.7080596,0.4808384,-0.02909666,0.07433682,-0.9968087,-0.004932343,0.09430313,-0.9955313,-0.05684053,0.05129319,-0.9970648,0.6225026,-0.7630169,-0.1740564,0.5500469,-0.8311036,-0.08194667,0.6831395,-0.6815322,-0.2623631,0.144976,-0.9260856,-0.3483496,0.2631108,-0.8872563,-0.3788785,-0.03391551,-0.955583,-0.2927646,-0.05368387,-0.5109732,0.8579187,-0.04593479,-0.5057727,0.861443,-0.05132794,-0.5093972,0.8589995,-0.06946426,0.00934261,0.9975408,-0.07247745,-0.001248538,0.9973694,-0.07087683,0.004381179,0.9974755,-0.09718668,-0.01443707,0.9951615,-0.08616387,-0.06224977,0.9943344,-0.09215897,-0.03637582,0.9950797,-0.07037901,-0.1176933,0.990553,-0.02248841,-0.06013101,0.9979372,-0.0578528,-0.1026555,0.9930333,0.1123185,-0.9692089,-0.2191317,-0.2529528,-0.9035627,-0.3458169,-0.1151174,-0.9460654,-0.302834,0.6967428,-0.6089811,-0.3790666,0.6967471,-0.6089961,-0.3790347,0.6967424,-0.6089798,-0.3790695,0.2259716,0.9657317,-0.1276679,0.3225378,0.9406504,-0.1055755,0.0792737,0.984283,-0.1578062,0.1197081,0.3346288,-0.9347158,0.07773065,0.4284662,-0.9002081,0.1910593,0.1574813,-0.9688633,-0.3459783,-0.4482477,-0.8242409,-0.3447921,-0.4586331,-0.8190081,-0.346453,-0.4439535,-0.8263629,-0.2511736,-0.6164441,-0.746263,-0.1802814,-0.5649253,-0.8052069,-0.2105742,-0.5875316,-0.7813227,0.02952414,0.07426279,-0.9968016,0.07352471,0.03768098,-0.9965814,0.05775958,0.05082523,-0.9970359,-0.6231038,-0.7624749,-0.1742805,-0.7277286,-0.5965185,-0.3384922,-0.6841675,-0.6800652,-0.2634888,-0.1446655,-0.9261318,-0.348356,0.14459,-0.9566009,-0.252999,0.03423386,-0.9555719,-0.2927635,0.05381155,-0.5109556,0.8579212,0.0676366,-0.5201092,0.8514176,0.05145502,-0.5093804,0.8590018,0.06941992,0.009364724,0.9975436,0.06727677,0.01687264,0.9975917,0.07083332,0.004404783,0.9974784,0.09714967,-0.01440507,0.9951655,0.1055965,0.02302128,0.9941426,0.09212899,-0.03634577,0.9950835,0.07037705,-0.117671,0.9905558,0.09798902,-0.1507526,0.9837031,0.05784642,-0.1026375,0.9930354,-0.1119984,-0.969245,-0.2191359,-0.2661615,-0.9516529,-0.1533459,0.1154338,-0.9460285,-0.3028289,-0.6972783,-0.6090606,-0.3779528,-0.6977536,-0.6109338,-0.3740319,-0.6973174,-0.6092135,-0.3776338,-0.2262764,0.9656591,-0.1276774,0.007387399,0.9847481,-0.1738291,-0.07958263,0.9842575,-0.1578098,-0.1197773,0.3345921,-0.9347201,-0.2328616,0.04113024,-0.9716397,-0.1910697,0.1574209,-0.9688711,0.3482131,-0.4509231,-0.821837,0.3499405,-0.4346997,-0.8298059,0.3487314,-0.4461831,-0.8242009,0.2519774,-0.6193624,-0.7435709,0.2986003,-0.6505337,-0.6983149,0.2115556,-0.5905115,-0.7788071,0.9506996,0.3096387,0.01715517,0.9767357,0.1753413,0.1234624,0.9554162,0.2937157,0.03018236,0.6890155,0.7142382,0.1229695,0.762754,0.6466593,0.006166398,0.6929154,0.7113892,0.1174463,0.1970174,0.974669,-0.1058518,0.2128873,0.9755805,-0.05405455,0.2085279,0.9756144,-0.06850421,0.9836262,-0.07597082,-0.1634256,0.9803863,-0.0126785,-0.1966779,0.9836405,-0.07732099,-0.1627049,0.4423836,-0.8266271,-0.3478283,0.4036602,-0.8584049,-0.3165431,0.4470189,-0.8225381,-0.3515756,0.01018315,-0.248822,0.9684958,-0.1777514,-0.3520147,0.9189615,-0.08024185,-0.3000245,0.9505507,-0.2718262,0.959513,-0.07379359,-0.2850325,0.9544302,-0.08842808,-0.2727508,0.9591715,-0.07481509,0.5891761,0.4724095,0.6555157,0.6498742,0.3629271,0.667793,0.4757181,0.6283307,0.6155428,0.456461,-0.4489927,0.7681465,0.4746372,-0.4816859,0.7366806,0.4538053,-0.4442875,0.7724438,0.6072186,0.2284821,0.7609741,0.4439172,-0.04362058,0.8950055,0.5988114,0.2116472,0.7724186,0.1647548,-0.6904067,0.7044108,0.09890288,-0.7351338,0.6706687,0.1340422,-0.7120146,0.6892517,0.3566585,0.7524743,0.5536941,0.4495092,0.6826794,0.5760993,0.1928734,0.8443571,0.499861,0.3742176,-0.563839,0.7362383,0.3286283,-0.6183872,0.7138633,0.3460308,-0.5982252,0.722765,0.07827621,0.1724098,-0.9819102,0.1384437,0.1938998,-0.9712035,0.1302323,0.1910027,-0.9729119,0.1762976,0.4107292,-0.8945505,0.1751031,0.4111652,-0.8945849,0.1778028,0.4101788,-0.8945052,0.2455926,0.2902336,-0.9249047,0.2857521,0.2434329,-0.9268691,0.1880871,0.3535889,-0.9162958,0.147264,0.4299555,-0.8907591,0.1033732,0.4627416,-0.8804455,0.1105523,0.4574933,-0.882314,0.7657216,0.6046745,0.2191786,0.7541087,0.6128465,0.2360914,0.7657238,0.6046729,0.2191753,0.6394613,-0.6980817,-0.3221356,0.6751579,-0.6485466,-0.3514957,0.6304877,-0.7094557,-0.3148935,0.7021518,0.6678543,-0.2468875,0.7322254,0.5938064,-0.3335266,0.6807634,0.7057313,-0.1962258,-0.3970319,-0.7823678,-0.4798607,-0.471187,-0.7099473,-0.5234097,-0.4490814,-0.7331101,-0.5107597,0.3529432,0.8580849,-0.37299,0.3231248,0.8838058,-0.3383457,0.3589456,0.8525117,-0.3799765,0.2716333,-0.9605295,-0.059987,0.1792837,-0.9837974,0.000119596,0.3765763,-0.9171893,-0.1302086,0.003505647,0.1343162,-0.9909324,0.01504099,0.1432733,-0.9895689,-0.01749867,0.1179338,-0.9928674,0.1492499,0.2012611,-0.9681004,0.1757639,0.2276146,-0.9577571,0.1708289,0.2227155,-0.9597996,0.1089819,-0.8914646,0.4397886,0.1678684,-0.9157466,0.3650047,0.1565486,-0.9117189,0.3798177,0.9532661,-0.2913399,-0.08003008,0.9505352,-0.3034871,-0.06617158,0.9528559,-0.2932696,-0.07783806,0.2581347,-0.9655219,0.03367644,0.2294401,-0.9732781,0.009326815,0.2491342,-0.9681197,0.02600926,0.748631,0.6586626,0.07559913,0.7604982,0.6430617,0.09007811,0.7414303,0.6676721,0.06704658,0.9518591,0.2913135,0.09539836,0.9594126,0.2700653,0.08119153,0.9550986,0.2824572,0.08946835,0.5912702,-0.8056995,0.03532975,0.5720256,-0.8188369,0.04788392,0.6166945,-0.7869905,0.01827323,0.3054558,0.9460819,0.1078233,0.3068538,0.9455317,0.1086767,0.303867,0.9467034,0.1068538,0.9628231,-0.2578687,0.08047014,0.9692646,-0.2199747,0.1101699,0.9651706,-0.2455937,0.09016394,0.6340811,-0.1939023,0.7485607,0.6190296,-0.1680508,0.7671775,0.6357101,-0.1967688,0.746428,0.09600013,-0.7307476,0.6758639,0.1399615,-0.745352,0.6518139,0.0915935,-0.729179,0.6781656,0.5234392,0.5544296,0.647008,0.5294,0.5228291,0.6681208,0.5219922,0.5614222,0.6421287,0.3848699,-0.6200177,0.6837056,0.4298374,-0.6039601,0.6711722,0.3529965,-0.6303092,0.6914506,0.6847391,0.1177053,0.7192204,0.7460909,0.05295068,0.6637353,0.6866094,0.1158608,0.7177353,0.1981841,0.7206677,0.6643502,0.243749,0.7300578,0.6384372,0.2133907,0.7240155,0.6559467,0.2442422,-0.1866954,0.9515727,0.2787553,-0.2460314,0.9283125,0.2555028,-0.2059212,0.9446242,0.07449984,-0.5148211,0.8540545,0.1136264,-0.4844433,0.8674122,0.05569446,-0.528888,0.8468623,0.2685859,-0.01979672,0.9630523,0.2754074,-0.007082641,0.9613015,0.2647076,-0.02697652,0.9639514,0.2203269,0.302331,0.92739,0.168931,0.3486875,0.9218891,0.2040175,0.317304,0.9261183,0.3360047,0.934937,-0.1139907,0.3039101,0.9384983,-0.1638899,0.3212965,0.9369962,-0.1371381,0.02619087,0.03958171,-0.9988731,0.1150095,-0.03432989,-0.9927711,0.0460996,0.02308589,-0.9986701,0.1055336,-0.1785264,-0.9782592,0.213997,-0.269566,-0.9389033,0.1395074,-0.2072511,-0.9682896,-0.8101091,-0.5785598,-0.0948255,-0.8236489,-0.5547592,-0.1176645,-0.8021538,-0.5914461,-0.08210343,0.01302832,0.3437021,0.9389885,0.06440258,0.3808928,0.9223735,0.03322029,0.358491,0.932942,0.10875,0.1988377,-0.97398,0.05004936,0.1583847,-0.9861083,0.1560416,0.2309511,-0.9603711,0.938592,0.2556261,-0.2317335,0.9383552,0.2559363,-0.2323495,0.9384776,0.2557759,-0.2320312,0.9769706,-0.07054191,-0.2013764,0.9771324,-0.07009774,-0.2007451,0.9768732,-0.07080847,-0.2017553,0.17469,-0.2501354,0.9523213,0.1602049,-0.2657274,0.9506437,0.1754713,-0.2492887,0.9523996,0.02807217,-0.07343351,-0.996905,-0.04129159,-0.1502332,-0.987788,0.02918046,-0.07219719,-0.9969635,0.2787434,-0.9570736,0.07945048,0.2850974,-0.9540532,0.09220683,0.2686483,-0.9614059,0.05938905,0.19534,0.3132848,0.929352,0.1933268,0.3151957,0.9291268,0.195425,0.3132039,0.9293612,-0.2529549,0.3118513,-0.9158398,-0.2915408,0.2691532,-0.917911,-0.2474344,0.317802,-0.9153023,-0.296226,0.3937401,0.8701834,-0.257307,0.4351736,0.8627961,-0.2930226,0.3972394,0.8696774,-0.6451916,-0.7632739,-0.03377574,-0.594783,-0.7938134,-0.1268604,-0.6321202,-0.7725906,-0.05939698,-0.3412146,-0.2872644,-0.895015,-0.2078484,-0.4405056,-0.8733578,-0.3257018,-0.3066104,-0.894376,-0.4620226,0.8853042,-0.05264705,-0.4647679,0.8836308,-0.05645954,-0.4627718,0.8848503,-0.05368608,-0.2796865,-0.347131,0.8951401,-0.2897436,-0.3362758,0.8960844,-0.2756122,-0.3514882,0.8947033,0.6305889,-0.7465498,-0.2121816,0.6575669,-0.7121801,-0.2457752,0.6251607,-0.7529234,-0.2056226,0.1997147,-0.3332699,0.9214364,0.157027,-0.3351185,0.9289985,0.2382763,-0.3310397,0.9130373,0.8907965,0.4526443,0.03993678,0.8799864,0.4693972,0.07273519,0.8922938,0.4500929,0.03504842,-0.02307999,0.006220459,-0.9997144,0.06908357,0.002928853,-0.9976066,0.01357406,0.004916906,-0.9998959,0.1720514,0.3171254,0.9326466,0.1773674,0.3125013,0.9332116,0.1702468,0.3186898,0.9324446,0.2626716,-0.9618407,0.07659161,0.2567424,-0.9640447,0.0685659,0.2659795,-0.9605627,0.08108186,0.2866661,-0.06081336,-0.9560985,0.3418155,-0.004172921,-0.9397579,0.2749689,-0.07253634,-0.958713,0.1926513,-0.2299709,0.9539386,0.2475841,-0.1852141,0.9509983,0.2111267,-0.2151346,0.9534898,0.2490155,0.0550878,-0.9669317,0.1338849,0.1571555,-0.9784564,0.2194891,0.08189928,-0.9721714,0.2629739,0.9605705,-0.09027332,0.262192,0.9609004,-0.08902764,0.2636024,0.9603035,-0.09127533,-0.001427114,-0.1135066,-0.9935362,-0.03828024,-0.06674849,-0.9970353,0.01955461,-0.1399444,-0.9899663,0.9996675,-0.01480388,-0.02111083,0.9998008,0.01990854,-0.001415967,0.9999228,0.01039785,-0.006814062,-0.04102367,-0.3062553,0.9510651,-0.190387,-0.2124192,0.9584524,-0.05636,-0.2970959,0.9531829,-0.7889856,-0.6052827,-0.1055216,-0.7742407,-0.627299,-0.08394861,-0.7890943,-0.6051124,-0.1056854,0.1063711,-0.4988105,-0.8601589,0.1267378,-0.4467086,-0.8856574,0.1201781,-0.463809,-0.8777463,0.1298183,-0.9853075,0.1109798,0.1445957,-0.9879755,0.05474078,0.1409422,-0.9876218,0.06883752,0.9119763,-0.2911845,-0.2889825,0.9109755,-0.2921085,-0.2911978,0.9131146,-0.290124,-0.2864437,0.8130118,-0.5120882,-0.2770877,0.7766387,-0.5718207,-0.2642981,0.9377534,-0.1306539,-0.3217892,-0.1122553,0.1317744,-0.9849032,-0.1351912,0.1400548,-0.9808711,-0.1115717,0.1315267,-0.985014,0.3419954,0.751095,-0.5647084,0.3493275,0.731656,-0.585363,0.33161,0.7763646,-0.5359971,-0.04297882,-0.5405358,-0.8402226,-0.06621974,-0.4941268,-0.8668643,-0.06379872,-0.4990611,-0.8642151,0.5351732,0.70777,-0.4611414,0.5365316,0.6678438,-0.5158669,0.5253123,0.7768192,-0.3472737,0.3960893,0.6674656,-0.6305577,0.3792495,0.6653314,-0.6430428,0.3889926,0.6665995,-0.6358693,0.6051431,-0.5806024,-0.5447042,0.6186003,-0.5779249,-0.5322937,0.60554,-0.5805269,-0.5443437,0.2705458,0.7011621,-0.6596792,0.2762905,0.6869323,-0.6721515,0.2662747,0.711402,-0.6503884,0.7248062,0.3844489,-0.5717124,0.5132399,0.4913552,-0.7036724,0.6343529,0.4371019,-0.6376037,0.4250123,-0.7922335,-0.4378708,0.4937459,-0.6610568,-0.5649946,0.437884,-0.7719967,-0.4607371,0.8083209,-0.2017235,-0.5531048,0.7826716,-0.2123243,-0.5851013,0.8247414,-0.1943971,-0.5310475,0.9399327,0.3300364,0.08719283,0.9497072,0.3079027,0.05702948,0.9349156,0.3401475,0.1011564,0.8948452,0.441426,-0.06629604,0.8881324,0.4579485,-0.03878253,0.8942753,0.4429461,-0.06380039,0.81124,0.5051212,-0.2945204,0.8114079,0.5038672,-0.2962012,0.8111662,0.5056636,-0.2937921,0.9930953,0.02799081,-0.1139226,0.995056,0.002538204,-0.09928321,0.9866218,0.0786429,-0.1428031,0.9773439,0.03343313,-0.2090008,0.9855134,0.1110495,-0.1281849,0.9755318,0.02407622,-0.2185364,0.4145522,0.2677476,-0.8697459,0.3519646,0.2730324,-0.8953068,0.3933616,0.2696936,-0.878938,0.8692017,0.4937528,0.02639293,0.8652865,0.5007001,0.0240612,0.8839939,0.4661464,0.03553026,0.4734314,0.6247564,-0.6209205,0.3949178,0.6814832,-0.6161336,0.6114611,0.4994907,-0.6136973,0.007722735,0.9997952,0.01870507,-0.0691834,0.9946622,0.07655614,-0.02247846,0.9988877,0.0414505,0.3357943,-0.9378424,0.08771401,0.4643746,-0.8589384,0.2158271,0.2915393,-0.9554677,0.04567688,-0.05143737,0.9787346,-0.1985772,0.003190457,0.9833424,-0.1817349,-0.07924062,0.975144,-0.2069178,-0.01810008,0.3499217,0.9366042,-0.1157442,0.4061487,0.9064473,-0.04602372,0.366473,0.9292897,0.5523048,-0.8273161,-0.1025062,0.5588796,-0.8172095,-0.1407921,0.5558094,-0.8222664,-0.122287,0.3216761,-0.9222653,-0.2143625,0.2567803,-0.9541459,-0.1538489,0.291544,-0.9382658,-0.1861702,0.6829204,-0.7090366,-0.1757468,0.8204909,-0.5680795,-0.06387823,0.7849803,-0.6119381,-0.09663301,0.7360219,-0.6337454,-0.2379885,0.7063342,-0.684765,-0.1794131,0.7568134,-0.5880339,-0.2853938,0.423838,-0.9057301,0.003790915,0.3949428,-0.9181128,0.03300315,0.4311461,-0.9022745,-0.003726005,0.6358293,-0.7678269,-0.07850497,0.6419864,-0.7660484,-0.03198993,0.6097947,-0.7632986,-0.2133677,0.6315513,-0.7722838,-0.06870859,0.6438626,-0.76023,-0.08655232,0.6300965,-0.7736527,-0.06663382,0.2812054,-0.9590225,-0.03463178,0.2758851,-0.9604346,-0.03811752,0.27853,-0.9597381,-0.03638577,0.3410478,-0.8765767,-0.3395581,0.329144,-0.8874924,-0.3225236,0.3356575,-0.8816007,-0.3318345,0.6207202,-0.7342461,-0.274935,0.6192969,-0.7344912,-0.2774783,0.621599,-0.7340911,-0.2733588,0.5910062,-0.441036,-0.6754251,0.6045604,-0.4657464,-0.6462098,0.4612481,-0.2371653,-0.854987,0.7892496,-0.609555,-0.07434946,0.818122,-0.5714828,-0.06390434,0.8161302,-0.57424,-0.06465339,-0.4561899,-0.8887746,0.04439055,-0.4776036,-0.877132,0.05034232,-0.319268,-0.9476351,0.007463991,0.6671991,-0.6291973,0.3986932,0.6730179,-0.5853573,0.4521104,0.6185696,-0.7629623,0.1877772,0.1623592,-0.4226573,0.8916279,0.1456858,-0.3766996,0.9148077,0.1506836,-0.3904677,0.9082013,0.171182,0.4780576,0.8614858,0.1745716,0.4845635,0.8571599,0.1602673,0.4570363,0.87489,0.1514697,0.3397218,-0.9282489,0.1677575,0.3753668,-0.9115685,0.1625044,0.3638723,-0.9171637,0.3758196,-0.8967443,-0.2336865,0.3764362,-0.8986593,-0.2251832,0.3663607,-0.8689355,-0.3327625,0.4934842,-0.868052,0.0543977,0.4977188,-0.8645486,0.06951093,0.4474195,-0.8899516,-0.08832877,0.4584782,-0.8723958,-0.1694804,0.4933203,-0.8697352,0.0140022,0.4931676,-0.8698542,-0.01180362,0.4931889,-0.8698648,-0.0100091,0.692905,-0.7122868,0.1119384,0.6571191,-0.7537658,0.005647718,0.7034816,-0.6946474,0.1502624,0.6864473,0.4301875,0.5862839,0.6882697,0.3995377,0.60552,0.6872891,0.4179201,0.5941182,0.3417003,-0.9124264,0.2252088,0.3385363,-0.9151434,0.2188741,0.3433336,-0.9109966,0.2284891,0.9350087,-0.2259842,0.2732943,0.9032537,-0.1622734,0.3972406,0.9417482,-0.247707,0.22749,0.4899476,0.5759464,0.6543984,0.4460253,0.6672911,0.5964764,0.4755472,0.6083546,0.6354209,0.8801621,0.115007,0.4605302,0.8781363,0.1088261,0.4658688,0.8792901,0.1123239,0.4628525,-0.9506995,0.3096389,0.01715552,-0.907621,0.4137136,-0.07116997,-0.9554162,0.2937161,0.03018248,-0.6929165,0.7113881,0.1174468,-0.7627559,0.6466573,0.006166815,-0.6890164,0.7142373,0.1229701,-0.2085269,0.9756146,-0.06850373,-0.2128863,0.9755808,-0.05405372,-0.1970167,0.9746692,-0.1058521,-0.9836264,-0.07597064,-0.1634253,-0.9822717,-0.1319966,-0.1331143,-0.9836406,-0.07732069,-0.1627046,-0.4423844,-0.8266267,-0.3478279,-0.480148,-0.7913867,-0.3783714,-0.4470198,-0.8225376,-0.3515752,-0.01018476,-0.2488231,0.9684954,-0.1147366,-0.1860833,0.9758118,0.08023995,-0.3000253,0.9505507,0.2727522,0.9591709,-0.07481545,0.2850347,0.9544295,-0.08842855,0.2718275,0.9595125,-0.07379394,-0.5891773,0.4724084,0.6555154,-0.4034519,0.7057029,0.5824174,-0.475718,0.6283308,0.6155428,-0.453807,-0.4442877,0.7724427,-0.4746386,-0.4816856,0.7366799,-0.4564627,-0.4489928,0.7681453,-0.6072174,0.2284829,0.7609748,-0.6607027,0.3508628,0.6636017,-0.5988101,0.2116479,0.7724193,-0.1340423,-0.712015,0.6892512,-0.0989021,-0.735134,0.6706687,-0.1647556,-0.6904073,0.70441,-0.3566586,0.7524747,0.5536935,-0.1178271,0.8748368,0.4698696,-0.1928737,0.8443571,0.4998607,-0.3460308,-0.5982255,0.7227648,-0.3286269,-0.6183884,0.7138628,-0.3742197,-0.563838,0.7362381,-0.1302328,0.1910024,-0.9729119,-0.1384449,0.1938995,-0.9712034,-0.07827198,0.1724093,-0.9819107,-0.1763011,0.4107285,-0.8945502,-0.1781526,0.4100503,-0.8944946,-0.1778022,0.4101788,-0.8945054,-0.2455928,0.2902338,-0.9249047,-0.174677,0.367777,-0.9133609,-0.1880878,0.3535879,-0.9162962,-0.1105518,0.4574933,-0.8823141,-0.1033726,0.4627415,-0.8804456,-0.1472638,0.4299553,-0.8907592,-0.7657236,0.6046731,0.2191753,-0.7541091,0.6128461,0.2360916,-0.7657215,0.6046747,0.2191786,-0.6394581,-0.6980841,-0.3221365,-0.5917296,-0.7543956,-0.2841541,-0.6304847,-0.7094581,-0.3148943,-0.6783007,0.7076887,-0.1976991,-0.7290903,0.5904137,-0.3461778,-0.7007782,0.6661385,-0.2552832,0.3970336,-0.7823668,-0.4798608,0.3763523,-0.8000602,-0.4671857,0.4490789,-0.7331108,-0.510761,-0.3516349,0.8592817,-0.3714673,-0.3231248,0.8838058,-0.3383457,-0.3475207,0.8630029,-0.3666817,-0.3765766,-0.917189,-0.1302092,-0.1792835,-0.9837975,0.000119185,-0.2716333,-0.9605295,-0.05998748,-0.003505289,0.1343161,-0.9909324,0.02113223,0.1150912,-0.9931302,0.01749974,0.1179338,-0.9928672,-0.1708292,0.222716,-0.9597995,-0.1757636,0.2276149,-0.9577571,-0.149253,0.201262,-0.9680998,-0.1089801,-0.8914616,0.4397949,-0.08663576,-0.8801446,0.466733,-0.1565498,-0.9117162,0.3798232,-0.9532659,-0.2913405,-0.08003062,-0.9549359,-0.2830123,-0.08945077,-0.9528557,-0.29327,-0.07783859,-0.2491344,-0.9681196,0.0260092,-0.22944,-0.9732781,0.009326756,-0.258135,-0.9655218,0.03367644,-0.748631,0.6586627,0.07559901,-0.7269054,0.6848946,0.05027955,-0.7414304,0.667672,0.06704646,-0.9550986,0.2824574,0.08946824,-0.9594128,0.2700651,0.08119124,-0.9518589,0.2913139,0.09539836,-0.5912697,-0.8056998,0.03532987,-0.639566,-0.7687324,0.002431988,-0.6166942,-0.7869908,0.01827329,-0.3054563,0.9460818,0.1078231,-0.3024166,0.9472671,0.1059683,-0.3038673,0.9467032,0.1068534,-0.9651705,-0.2455939,0.090164,-0.9692645,-0.219975,0.1101699,-0.9628231,-0.2578687,0.08047014,-0.6357095,-0.1967692,0.7464284,-0.6190295,-0.1680506,0.7671775,-0.6340805,-0.1939026,0.7485612,-0.09600037,-0.7307475,0.675864,-0.03064727,-0.7055567,0.7079905,-0.09159386,-0.7291789,0.6781657,-0.5234415,0.5544285,0.6470071,-0.512061,0.6041927,0.6105284,-0.5219946,0.5614209,0.6421279,-0.3848709,-0.6200171,0.6837055,-0.2919156,-0.6476466,0.7038034,-0.352998,-0.6303084,0.6914505,-0.6866091,0.1158612,0.7177354,-0.7460904,0.05295091,0.6637359,-0.6847389,0.1177057,0.7192205,-0.213389,0.7240158,0.6559469,-0.2437471,0.7300583,0.6384375,-0.1981824,0.720668,0.6643503,-0.2555038,-0.2059211,0.9446239,-0.2787561,-0.2460314,0.9283124,-0.2442432,-0.1866953,0.9515724,-0.07449907,-0.5148211,0.8540546,-0.01115262,-0.5608396,0.8278494,-0.05569398,-0.5288879,0.8468623,-0.2685853,-0.01979672,0.9630525,-0.2580915,-0.03914529,0.9653271,-0.2647073,-0.02697646,0.9639515,-0.2040162,0.317303,0.9261189,-0.168932,0.3486859,0.9218894,-0.2203244,0.3023304,0.9273907,-0.3212943,0.9369971,-0.1371369,-0.3039051,0.9385,-0.1638891,-0.336005,0.934937,-0.1139894,-0.02618908,0.03957802,-0.9988733,0.04521322,0.09840172,-0.9941192,-0.04609835,0.02308231,-0.9986702,-0.1055262,-0.1785277,-0.9782598,-0.04260122,-0.1248403,-0.9912618,-0.1394988,-0.2072522,-0.9682906,0.8101091,-0.5785599,-0.09482389,0.7794389,-0.6246309,-0.04807627,0.8021523,-0.5914484,-0.0821017,-0.01302582,0.3437005,0.938989,0.01628726,0.3218379,0.9466547,-0.03321838,0.3584893,0.9329426,-0.1560337,0.2309521,-0.9603722,-0.0500437,0.1583861,-0.9861083,-0.108743,0.1988388,-0.9739806,-0.9385929,0.2556241,-0.2317321,-0.9387752,0.2553833,-0.2312588,-0.9384782,0.2557753,-0.2320293,-0.9768733,-0.07081043,-0.2017539,-0.9771324,-0.07009786,-0.2007455,-0.9769706,-0.07054316,-0.2013757,-0.1746838,-0.2501347,0.9523226,-0.1914685,-0.2318091,0.9537318,-0.1754649,-0.2492879,0.9524011,-0.02918183,-0.07219624,-0.9969635,0.04128408,-0.1502329,-0.9877884,-0.02807372,-0.07343244,-0.996905,-0.2787417,-0.957074,0.07945191,-0.2611765,-0.9642556,0.04470002,-0.268647,-0.9614062,0.05938959,-0.1954261,0.313204,0.9293611,-0.1933252,0.3151969,0.9291267,-0.1953409,0.3132849,0.9293516,0.2474274,0.3178017,-0.9153042,0.2915288,0.2691542,-0.9179146,0.2529472,0.3118513,-0.915842,0.2962217,0.3937385,0.8701856,0.3218042,0.3651934,0.8735422,0.2930186,0.3972377,0.8696795,0.6321212,-0.7725898,-0.05939614,0.5947853,-0.7938119,-0.1268591,0.6451923,-0.7632734,-0.03377491,0.341208,-0.287265,-0.8950173,0.4236342,-0.1764345,-0.8884847,0.3256958,-0.3066107,-0.8943781,0.4627715,0.8848505,-0.05368703,0.4647675,0.8836308,-0.05646049,0.4620224,0.8853043,-0.052648,0.2756066,-0.3514872,0.8947054,0.2897377,-0.3362764,0.8960862,0.2796808,-0.3471304,0.8951419,-0.6251646,-0.7529198,-0.2056239,-0.6575713,-0.7121745,-0.2457792,-0.6305927,-0.7465462,-0.2121831,-0.1997207,-0.3332718,0.9214345,-0.2941712,-0.3268346,0.8981328,-0.238284,-0.3310416,0.9130347,-0.8907944,0.4526484,0.03993707,-0.9055578,0.4240089,-0.01347565,-0.8922916,0.4500971,0.03504854,-0.01358407,0.004918873,-0.9998956,-0.06909483,0.00293076,-0.9976058,0.02307063,0.006222546,-0.9997146,-0.170246,0.3186888,0.9324451,-0.1773658,0.3124996,0.9332124,-0.1720504,0.3171243,0.9326472,-0.2626715,-0.9618406,0.07659298,-0.2743671,-0.9571649,0.0925095,-0.2659798,-0.9605625,0.08108353,-0.2749739,-0.07253712,-0.9587115,-0.3418235,-0.004172623,-0.939755,-0.2866718,-0.06081378,-0.9560968,-0.1926499,-0.2299727,0.9539386,-0.1462263,-0.2663135,0.9527303,-0.211126,-0.2151362,0.9534895,-0.2490176,0.05508655,-0.9669311,-0.3419933,-0.03247916,-0.939141,-0.2194901,0.08189868,-0.9721711,-0.2629736,0.9605707,-0.09027218,-0.2645364,0.9599033,-0.0927692,-0.2636006,0.9603041,-0.09127372,-0.01956003,-0.1399376,-0.9899671,0.03826737,-0.06674766,-0.9970359,0.001419007,-0.1135019,-0.9935368,-0.9996674,-0.01481312,-0.02111035,-0.998833,-0.03544878,-0.03280431,-0.9999228,0.0103988,-0.006813406,0.04102247,-0.3062482,0.9510675,-0.20405,-0.4380123,0.875505,0.05635929,-0.2970889,0.9531851,0.7889866,-0.6052815,-0.1055203,0.8035727,-0.5812382,-0.1281916,0.7890952,-0.6051114,-0.1056839,-0.1201775,-0.4638095,-0.8777462,-0.1267365,-0.4467092,-0.8856573,-0.1063715,-0.4988107,-0.8601588,-0.1409417,-0.9876219,0.06883752,-0.144595,-0.9879755,0.05474066,-0.1298183,-0.9853074,0.1109802,-0.9131152,-0.2901235,-0.2864423,-0.9109756,-0.2921088,-0.2911972,-0.9119767,-0.2911844,-0.2889816,-0.9377527,-0.1306575,-0.3217895,-0.7766414,-0.5718169,-0.2642986,-0.8130137,-0.5120849,-0.2770881,0.1122503,0.1317733,-0.9849039,0.09145766,0.1242175,-0.9880312,0.1115668,0.1315256,-0.9850147,-0.3231371,0.767763,-0.5532832,-0.3376616,0.734988,-0.5880284,-0.3311625,0.7501163,-0.5724134,0.04296946,-0.5405394,-0.8402207,0.0397517,-0.5467925,-0.836324,0.06380635,-0.4990642,-0.8642128,-0.5252707,0.7768425,-0.3472843,-0.5363798,0.667665,-0.516256,-0.5352436,0.7049252,-0.4653974,-0.3960971,0.667458,-0.6305608,-0.4027292,0.6682309,-0.6255211,-0.3889824,0.6665808,-0.6358953,-0.6055404,-0.5805263,-0.5443438,-0.6186022,-0.5779237,-0.5322929,-0.6051436,-0.5806019,-0.5447044,-0.2660326,0.7112262,-0.6506797,-0.2760036,0.6869916,-0.6722089,-0.2702707,0.701116,-0.6598411,-0.7248063,0.3844494,-0.5717119,-0.8126655,0.3187336,-0.487836,-0.6343534,0.4371021,-0.637603,-0.4250124,-0.7922334,-0.4378709,-0.3713388,-0.8617197,-0.3457555,-0.4378842,-0.7719965,-0.4607375,-0.8247414,-0.194397,-0.5310477,-0.782671,-0.2123243,-0.5851023,-0.8083205,-0.2017234,-0.5531054,-0.9349156,0.3401476,0.1011565,-0.949707,0.3079029,0.05702984,-0.9399327,0.3300365,0.08719307,-0.8948453,0.4414258,-0.06629621,-0.8988413,0.4299783,-0.08487051,-0.8942756,0.4429457,-0.06380069,-0.8112401,0.5051211,-0.2945202,-0.8110262,0.506682,-0.2924206,-0.8111665,0.5056632,-0.2937919,-0.9866219,0.07864153,-0.1428035,-0.995056,0.002537608,-0.09928351,-0.9930953,0.02798998,-0.113923,-0.977344,0.03343307,-0.2090002,-0.9576981,-0.04206836,-0.2846838,-0.975532,0.0240761,-0.2185357,-0.4145437,0.2677491,-0.8697495,-0.4211972,0.2671036,-0.866746,-0.3933653,0.2696946,-0.8789361,-0.8692041,0.4937486,0.02639335,-0.8866749,0.4608908,0.0372473,-0.8839945,0.4661454,0.0355305,-0.4734277,0.6247571,-0.6209227,-0.6878526,0.4112396,-0.5981143,-0.6114623,0.4994871,-0.6136991,-0.007722735,0.9997952,0.01870453,-0.04530119,0.9989269,-0.009646058,0.02247798,0.9988877,0.04144972,-0.3357939,-0.9378426,0.08771497,-0.1781749,-0.9822852,-0.05804854,-0.2915388,-0.9554678,0.04567784,0.07924139,0.9751442,-0.2069174,-0.0031901,0.9833425,-0.1817346,0.05143803,0.9787347,-0.1985769,0.04602485,0.3664752,0.9292888,0.1157523,0.406152,0.9064447,0.01809859,0.3499234,0.9366035,-0.5523043,-0.8273165,-0.1025062,-0.5499731,-0.8303174,-0.09001439,-0.5558093,-0.8222664,-0.122287,-0.3216753,-0.9222654,-0.2143635,-0.3427898,-0.9097445,-0.2342228,-0.2915434,-0.9382659,-0.186171,-0.6829221,-0.7090348,-0.1757472,-0.6445093,-0.7375996,-0.2013823,-0.7849811,-0.6119369,-0.09663331,-0.7568135,-0.5880337,-0.2853939,-0.7063356,-0.6847637,-0.1794128,-0.7360226,-0.6337447,-0.2379884,-0.4311463,-0.9022745,-0.003725767,-0.3949431,-0.9181126,0.03300362,-0.4238381,-0.90573,0.003791213,-0.609793,-0.7633002,-0.2133669,-0.6419861,-0.7660487,-0.03198862,-0.6358286,-0.7678276,-0.0785039,-0.6315508,-0.7722842,-0.06870853,-0.6189728,-0.7837555,-0.05099147,-0.630096,-0.773653,-0.0666337,-0.278531,-0.9597377,-0.03638601,-0.2758866,-0.9604342,-0.03811717,-0.281206,-0.9590224,-0.03463244,-0.3410477,-0.8765763,-0.3395592,-0.3511593,-0.8667778,-0.3540954,-0.3356577,-0.8816004,-0.3318355,-0.6215991,-0.7340908,-0.2733595,-0.6192972,-0.7344909,-0.2774781,-0.6207204,-0.7342457,-0.2749354,-0.4612425,-0.2371674,-0.8549895,-0.6045559,-0.465748,-0.6462128,-0.5910015,-0.4410377,-0.675428,-0.7892515,-0.6095526,-0.07434922,-0.7850539,-0.6147722,-0.0757991,-0.8161286,-0.5742421,-0.06465369,0.319272,-0.9476338,0.007463932,0.4776042,-0.8771317,0.05034196,0.4561911,-0.888774,0.04439026,-0.6185689,-0.7629622,0.1877797,-0.6730225,-0.5853528,0.4521093,-0.6672027,-0.6291933,0.3986934,-0.1506838,-0.3904666,0.9082016,-0.1456861,-0.3766977,0.9148085,-0.1623593,-0.4226582,0.8916276,-0.1711817,0.4780582,0.8614855,-0.1540208,0.444961,0.882206,-0.1602652,0.4570353,0.8748909,-0.1625035,0.363872,-0.917164,-0.1677556,0.3753661,-0.9115692,-0.151471,0.3397227,-0.9282484,-0.3663541,-0.8689407,-0.3327564,-0.3764762,-0.8986365,-0.2252074,-0.3758558,-0.8967235,-0.2337082,-0.4474174,-0.8899525,-0.08832997,-0.4977197,-0.8645481,0.06951183,-0.4934849,-0.8680516,0.05439835,-0.4584782,-0.8723959,-0.1694792,-0.4931895,-0.8698644,-0.01000928,-0.4931681,-0.8698539,-0.0118038,-0.4933222,-0.8697341,0.01400226,-0.7034829,-0.6946458,0.1502633,-0.657121,-0.753764,0.005648136,-0.6929065,-0.7122853,0.1119392,-0.6864482,0.430187,0.5862833,-0.6844452,0.4532782,0.5710288,-0.687289,0.4179196,0.5941188,-0.3433319,-0.9109971,0.2284899,-0.3385337,-0.9151439,0.218876,-0.3416983,-0.9124269,0.22521,-0.9417475,-0.2477088,0.2274907,-0.9032531,-0.1622745,0.3972417,-0.9350081,-0.2259857,0.2732956,-0.4899457,0.5759462,0.6544,-0.5140057,0.5148816,0.6860724,-0.4755455,0.6083546,0.6354222,-0.880162,0.1150078,0.4605305,-0.8814126,0.1189153,0.4571336,-0.8792896,0.1123254,0.4628531,-0.3602244,-0.8714809,-0.3328055,-0.3570496,-0.9092602,-0.2139197,-0.3574677,-0.9069919,-0.2226716,0.3574788,-0.9069832,-0.222689,0.3570613,-0.909251,-0.2139393,0.3602294,-0.8714824,-0.332796,0.3797963,-0.8616411,-0.3366443,0.380157,-0.8615478,-0.3364762,0.3796189,-0.8605983,-0.3394999,0.3804962,-0.8614779,-0.3362717,0.3798558,-0.8605558,-0.3393424,-0.379619,-0.8605978,-0.339501,-0.3801595,-0.8615479,-0.3364732,-0.3798021,-0.8616393,-0.3366425,-0.3798558,-0.860556,-0.339342,-0.3804949,-0.8614801,-0.3362677,0.1371323,-0.8616465,0.4886308,0.181894,-0.8440898,0.5044076,0.1688449,-0.8494507,0.499925,0.3059269,0.9098972,-0.2801715,0.3594201,0.9321079,0.04463452,0.3545346,0.9350419,0.001420199,0.926154,-0.3758217,0.0315774,0.9305033,-0.366158,-0.009603261,0.9298896,-0.3678289,-0.002681076,0.1888498,-0.9786335,0.08131599,0.1995661,-0.9769321,0.07600742,0.1760888,-0.9804685,0.08760422,-0.9981852,0.03727573,-0.04729676,-0.9981762,0.03732687,-0.04744648,-0.9982177,0.03708982,-0.04675298,0.03284865,-0.5796383,0.8142116,0.03152441,-0.5804618,0.8136771,0.03237074,-0.5799357,0.8140189,0.9673641,0.2528856,0.01598823,0.9676046,0.2487176,0.04336869,0.9676143,0.2491655,0.04048633,0.1978317,0.9746927,-0.1040998,0.2136226,0.9749656,-0.06170552,0.2083438,0.9750967,-0.07602322,0.9387105,0.2135711,0.2705735,0.9338724,0.2241916,0.2786048,0.9371683,0.2170065,0.2731738,0.919066,-0.2862167,0.2709203,0.9207926,-0.283288,0.2681216,0.9188646,-0.2865559,0.2712444,0.480576,0.8478108,0.2241957,0.4453403,0.8646762,0.2323942,0.4568175,0.8593707,0.2297824,0.4369511,0.8860531,0.1548674,0.4088175,0.8967801,0.1692746,0.4220358,0.8918861,0.162558,0.2475643,0.9583158,0.1426278,0.2502851,0.9573529,0.1443365,0.2452015,0.9591426,0.1411442,0.2048115,0.96154,0.1830116,0.2494993,0.9544143,0.1638395,0.2323212,0.9574381,0.1712869,0.276525,-0.9309155,-0.2386004,0.2393296,-0.9231559,-0.3008398,0.3467471,-0.9315088,-0.1098079,-0.7303299,0.2061746,-0.6512375,-0.2796261,0.1075192,-0.9540697,-0.3047168,0.1133545,-0.9456735,0.4753709,-0.8687315,0.1390263,0.5142391,-0.8493194,0.1192253,0.4359135,-0.8859621,0.1582742,0.07333683,0.9624872,-0.2612283,0.1815595,0.9752944,-0.1258454,0.1524237,0.9747213,-0.1633571,0.4453761,-0.7601859,0.4730302,0.449174,-0.7568312,0.474815,0.4481226,-0.7577633,0.4743217,-0.001794695,0.01005536,-0.9999479,-0.002526104,0.007167696,-0.9999711,-0.002176761,0.008546948,-0.9999611,-0.00075803,0.005272388,-0.9999859,-0.000911855,0.005547165,-0.9999842,-0.000434479,0.004694461,-0.999989,0.7269889,-0.4407159,0.5265518,0.7638564,-0.3712593,0.5279108,0.7427197,-0.4124372,0.5275064,-0.7337618,0.6771003,-0.05593723,-0.7351584,0.6750848,-0.0616669,-0.7346842,0.6757767,-0.05970877,0.7467546,0.6645446,-0.02716875,0.7348464,0.6757642,-0.05782502,0.7395251,0.6715515,-0.04605889,-0.1958678,0.9797998,-0.04035377,-0.1650338,0.985479,0.03993874,-0.1745332,0.9845283,0.01557141,0.3837423,-0.9092201,-0.1614329,0.3872784,-0.9070109,-0.1653689,0.3835102,-0.9093639,-0.1611748,0.2811229,0.9527273,-0.1152414,0.2775742,0.9555901,-0.09899628,0.2999126,0.9310818,-0.2077001,0.1716574,-0.9709426,-0.1667459,0.1685318,-0.9710576,-0.1692458,0.1708105,-0.9709753,-0.1674238,-0.01156973,-0.9809253,-0.1940411,-0.009254574,-0.9817802,-0.1897948,-0.01648509,-0.9790311,-0.2030428,0.9584234,0.2576688,-0.1226028,0.958668,0.2586724,-0.1185087,0.9571416,0.2531905,-0.1406224,0.2267236,0.9739368,-0.006595671,0.2474413,0.9688761,0.007219254,0.2145435,0.9766043,-0.01467049,0.2466262,-0.4940168,0.8337403,0.3064326,-0.465824,0.8301247,0.2817329,-0.4777927,0.8320701,0.4974724,0.4103754,0.7642731,0.5276789,0.3904901,0.754369,0.4070222,0.4641624,0.7866933,0.8195132,0.4659575,0.3335894,0.8416996,0.3854328,0.3781313,0.6658565,0.7336397,0.1356753,0.6389744,-0.6478428,0.4147425,0.279937,-0.9557347,0.09059035,0.4818407,-0.8349817,0.2657725,0.9683657,0.2103722,0.1342069,0.9666996,0.1926822,0.1684208,0.9672817,0.1974034,0.1593679,0.9483879,-0.2958983,0.1140374,0.9488905,-0.2924814,0.1185818,0.93966,-0.3372008,0.05774837,0.2436315,0.5137109,0.8226451,0.2549529,0.4970664,0.8294119,0.2486902,0.5063223,0.8257064,0.5840876,0.4782477,0.6558359,0.6454979,0.3686625,0.668895,0.4738541,0.6289783,0.6163187,0.4577419,-0.448563,0.7676351,0.4794178,-0.4805802,0.7343034,0.4490872,-0.4359373,0.7799227,0.6088676,0.2405264,0.755928,0.4258403,-0.03402125,0.9041586,0.5879785,0.2038466,0.7827695,0.1640411,-0.6934413,0.7015909,0.100561,-0.7381961,0.6670488,0.1373213,-0.7129936,0.6875922,0.3517681,0.7559292,0.5521144,0.4446359,0.6857144,0.5762767,0.198932,0.8431246,0.499567,0.3727494,-0.5663502,0.7350548,0.3278626,-0.6209722,0.711969,0.3462779,-0.5992434,0.7218027,0.9691184,0.2457776,0.02007567,0.9694942,0.2441401,0.02183449,0.9691398,0.2456846,0.02017551,0.2194304,0.9423737,-0.2525515,0.2794293,0.9343238,-0.2212656,0.1459496,0.946257,-0.2886111,0.9086942,0.3558133,-0.2183386,0.8319669,0.5470699,-0.09244275,0.8785454,0.4502383,-0.1595107,0.03358745,-0.9027677,-0.4288153,0.03226399,-0.8999527,-0.4347922,0.04437261,-0.9242858,-0.3791133,-0.9634084,0.236019,-0.1270406,-0.9361191,0.2190369,-0.2751435,-0.9402105,0.2211706,-0.2590134,-0.9641976,0.2634474,-0.03030574,-0.9716188,0.2315612,-0.04833585,-0.9580097,0.2862152,-0.01727616,0.7705303,-0.4545278,-0.4468643,0.7497472,-0.4082594,-0.5207719,0.7543251,-0.4176483,-0.5065211,-0.8391808,-0.4735025,-0.2675276,-0.8398911,-0.4786644,-0.2558581,-0.8344088,-0.449802,-0.3184968,0.04336982,-0.7784843,-0.626164,0.0440272,-0.7795861,-0.6247456,0.04134243,-0.7750699,-0.6305216,-0.0000978182,-0.000907002,-0.9999997,0.0000328236,-0.000814628,-0.9999998,-0.000152489,-0.000945658,-0.9999997,0.01981139,-0.004099309,-0.9997953,0.01991969,-0.004051506,-0.9997934,0.01948088,-0.004245162,-0.9998012,-0.7920353,-0.3671667,0.4877181,-0.7973109,-0.3557966,0.4875494,-0.787578,-0.376527,0.4877997,-0.01606065,-0.004431247,-0.9998613,-0.01981246,-0.000357764,-0.9998037,-0.0180934,-0.002224266,-0.9998339,0.9665892,-0.01744425,-0.2557367,0.9684541,-0.01665163,-0.248635,0.958773,-0.02054107,-0.2834302,0.1062409,-0.4975127,-0.8609263,0.1264858,-0.4526627,-0.8826653,0.1189297,-0.469651,-0.8748049,0.130172,-0.9855138,0.1087108,0.1454661,-0.9874596,0.06134617,0.140866,-0.9871283,0.07572644,0.1670228,0.9766122,-0.1353965,0.1516765,0.9794101,-0.1332298,0.1532279,0.9791386,-0.1334501,0.9086653,-0.3707332,-0.1920532,0.1626616,0.9778304,-0.1318672,0.1655147,0.9774246,-0.1313245,0.1424649,0.9804581,-0.1356685,0.06274342,-0.9892034,-0.1324383,-0.0156883,-0.9826331,-0.184895,0.04074144,-0.9882508,-0.1473115,0.1518879,-0.9759703,-0.1562433,0.2391904,-0.9210662,-0.3072866,0.209481,-0.9438477,-0.2554786,-0.9660022,-0.2578487,0.01880544,-0.942928,-0.3278442,0.0583533,-0.9520504,-0.3027502,0.04407244,0.9313595,-0.3447635,-0.1170793,0.9309141,-0.3464292,-0.1156973,0.9315391,-0.344087,-0.1176401,-0.8250431,-0.4782015,-0.3010438,-0.9579303,-0.2253237,-0.1777607,-0.9583612,-0.2274368,-0.1726742,-0.956851,-0.2205323,-0.1892138,-0.06183445,-0.9451013,-0.3208742,-0.07758831,-0.9307774,-0.3572584,-0.03027492,-0.9685298,-0.2470496,0.899562,-0.3672932,-0.2363978,-0.8545611,-0.4913628,-0.1681905,0.1389707,0.3311566,-0.9332858,0.1379811,0.3328765,-0.9328208,0.1402204,0.3289815,-0.933868,0.1709403,0.9758186,-0.1362253,0.1717019,0.9754872,-0.137634,0.169998,0.976225,-0.1344828,0.009008169,0.9944503,-0.1048215,0.02999025,0.9951021,-0.09419429,-0.01843124,0.9927678,-0.118628,0.1170161,0.3274481,-0.9375954,0.9321173,-0.3547631,-0.07280462,0.9347259,-0.3507063,-0.05738145,0.9241667,-0.3649095,-0.1129475,0.9406009,-0.3393184,-0.01153552,0.9507473,-0.3042847,-0.05908036,0.9440565,-0.3287529,-0.0260539,0.391251,0.9200786,0.01945066,0.4184293,0.9071417,0.0448457,0.3867944,0.9220384,0.01533704,0.37133,0.9206534,-0.1204637,0.2637426,0.9570389,-0.1204844,0.269459,0.9554404,-0.1205219,-0.495818,-0.3454569,0.7967585,-0.2529532,0.2541953,-0.9334878,-0.2595824,0.2525564,-0.9321117,0.2718616,-0.4770344,0.8357808,0.2780898,-0.4781381,0.8330968,0.2533062,-0.4736269,0.8435127,-0.3316432,0.5656073,0.7550506,-0.2958169,0.568199,0.7678818,-0.04331266,-0.5537449,-0.8315591,0.1888269,-0.9801064,0.06112295,0.1941675,-0.9791244,0.06012004,0.1717716,-0.9830358,0.06430613,0.2738524,0.5129473,0.8135662,0.2628329,0.5175277,0.8142998,0.3049618,0.4995269,0.8108461,0.1621143,-0.4217123,0.8921198,0.1458985,-0.3834465,0.9119663,0.1515331,-0.3967523,0.9053317,0.7636168,0.6374855,-0.1024782,0.7901154,0.6070907,-0.08460837,0.7246427,0.6773604,-0.1267907,0.8348093,-0.4762793,-0.2761368,0.8523458,-0.4198523,-0.3118185,0.8241645,-0.5046103,-0.2571408,0.7585093,-0.5546457,-0.3420994,-0.8647417,-0.4880198,-0.1185687,-0.006086707,-0.9572641,-0.2891516,0.04880553,-0.9650102,-0.2576305,0.0139786,-0.9605476,-0.2777642,-0.8584869,0.5125586,-0.01684969,-0.7233237,0.6795527,-0.1225198,-0.7936651,0.6040194,-0.07250106,-0.6965216,-0.1698989,-0.6971313,-0.7638731,-0.1964981,-0.6147249,-0.3201639,-0.035582,-0.9466938,-0.1340868,-0.9383609,-0.3185901,-0.06999182,-0.9219868,-0.3808434,-0.1219295,-0.9358318,-0.3306843,-0.9030795,-0.427782,-0.03808027,0.1707871,0.4776318,0.8618002,0.1751466,0.484889,0.8568585,0.1605629,0.4605398,0.8729965,0.0821768,-0.5570511,-0.8264025,0.1053605,-0.5252572,-0.8443958,0.09246575,-0.5430956,-0.8345642,0.1519861,0.3411988,-0.9276226,0.1668297,0.3695204,-0.914124,0.1613029,0.3589826,-0.9193002,0.135544,0.3264383,-0.9354496,0.1079733,0.5084757,0.8542801,0.2299523,0.4971724,0.8366252,0.1284439,-0.9889885,0.0735132,0.1035403,-0.985629,0.1334728,0.1139186,-0.9875277,0.1086817,0.2201771,-0.4769037,0.8509318,0.2047047,-0.4467797,0.8709098,0.2115781,-0.4601712,0.8622512,0.01296186,0.35154,-0.9360831,0.01788228,0.3549242,-0.9347242,0.01220768,0.3510201,-0.9362884,0.02781111,0.5132567,0.8577845,0.03906154,0.5192658,0.8537198,0.03111654,0.5150314,0.8566064,0.01597791,-0.445694,0.8950428,0.006006896,-0.4369708,0.8994557,0.01674664,-0.4463631,0.8946953,-0.02314591,-0.991512,0.1279385,-0.01618105,-0.9925931,0.1204043,-0.0226829,-0.9915872,0.127438,-0.02493107,-0.5187199,-0.8545807,-0.0124017,-0.52802,-0.8491415,-0.02259171,-0.5204675,-0.8535826,0.03137105,0.9917437,-0.1243402,0.03994238,0.992438,-0.116067,0.03099411,0.9917098,-0.1247035,0.6731908,-0.7352844,0.07855647,0.66949,-0.7426463,-0.01610827,0.6547265,-0.6859359,0.3175298,0.6848425,0.4318962,0.5869042,0.6853927,0.4061273,0.6043986,0.6851989,0.4191448,0.5956679,0.1840795,-0.8676155,0.4619072,0.1987125,-0.8975126,0.3936808,-0.0902301,-0.02964097,0.9954798,0.9309884,-0.2191677,0.291935,0.8953405,-0.1747033,0.4096879,0.9490167,-0.2547125,0.185712,0.5012795,0.5726014,0.648727,0.4475574,0.6992808,0.5574036,0.4782437,0.632893,0.6088757,0.8758767,0.1156225,0.4684779,0.8785426,0.1223608,0.4617259,0.8773881,0.1194176,0.4646821,-0.1688451,-0.8494507,0.499925,-0.1818943,-0.8440898,0.5044076,-0.1371324,-0.8616466,0.4886308,-0.3059222,0.909892,-0.2801931,-0.3012785,0.9050084,-0.3003186,-0.3545334,0.9350423,0.001417577,-0.9261536,-0.3758224,0.03157746,-0.924842,-0.3780712,0.04158878,-0.9298896,-0.3678291,-0.00268042,-0.1888499,-0.9786335,0.08131599,-0.1664659,-0.9817157,0.0923224,-0.1760888,-0.9804685,0.08760422,0.9981852,0.03727573,-0.04729676,0.9982262,0.03704106,-0.04661035,0.9982178,0.03708982,-0.04675298,-0.03237074,-0.5799357,0.8140189,-0.03152441,-0.5804618,0.8136771,-0.03284865,-0.5796383,0.8142116,-0.967364,0.2528857,0.01598823,-0.9672636,0.2534961,0.01186722,-0.9676142,0.2491657,0.04048633,-0.2083441,0.9750965,-0.0760231,-0.213623,0.9749655,-0.06170541,-0.1978318,0.9746927,-0.1040998,-0.9371683,0.2170065,0.2731738,-0.9338723,0.2241916,0.2786048,-0.9387105,0.2135711,0.2705735,-0.919066,-0.2862168,0.2709203,-0.9172172,-0.289314,0.27388,-0.9188646,-0.2865559,0.2712444,-0.4568173,0.8593707,0.2297824,-0.4453402,0.8646763,0.2323942,-0.4805759,0.8478108,0.2241957,-0.4220358,0.8918861,0.162558,-0.4088175,0.8967801,0.1692746,-0.436951,0.8860531,0.1548674,-0.2475643,0.9583158,0.1426278,-0.2426948,0.9600101,0.1395702,-0.2452015,0.9591427,0.1411442,-0.2323213,0.9574381,0.1712868,-0.2494995,0.9544143,0.1638395,-0.2048116,0.96154,0.1830115,-0.346747,-0.9315088,-0.1098079,-0.2393295,-0.9231556,-0.300841,-0.2765249,-0.9309155,-0.2386013,0.7309958,0.2063164,-0.6504451,0.7908152,0.2178587,-0.5719693,0.304699,0.1133544,-0.9456794,-0.4753708,-0.8687314,0.1390262,-0.4033662,-0.8984299,0.1735499,-0.4359135,-0.8859621,0.1582742,-0.07334864,0.9624832,-0.2612398,-0.001524925,0.9384729,-0.3453497,-0.1524248,0.9747171,-0.1633812,-0.4481229,-0.7577632,0.4743216,-0.4491744,-0.7568311,0.4748149,-0.4453762,-0.760186,0.4730302,0.002176761,0.008546948,-0.9999611,0.002526104,0.007167696,-0.9999711,0.001794636,0.01005536,-0.9999479,0.000758034,0.005272388,-0.9999859,0.000170144,0.004222273,-0.9999911,0.000434481,0.004694461,-0.999989,-0.7427198,-0.4124373,0.5275064,-0.7638565,-0.3712595,0.5279108,-0.7269889,-0.4407159,0.5265517,0.7337618,0.6771003,-0.05593717,0.7332701,0.677794,-0.05394679,0.7346842,0.6757767,-0.05970871,-0.7467547,0.6645445,-0.02716875,-0.7514207,0.6596649,-0.01446789,-0.7395251,0.6715514,-0.04605889,0.1958678,0.9797997,-0.04035371,0.2053222,0.9764868,-0.06569975,0.1745332,0.9845283,0.01557147,-0.3837423,-0.9092202,-0.1614329,-0.3800724,-0.9114735,-0.157357,-0.3835102,-0.9093639,-0.1611748,-0.2999075,0.9310895,-0.2076724,-0.2775749,0.9555898,-0.09899699,-0.2811228,0.9527278,-0.1152383,-0.1708105,-0.9709754,-0.1674237,-0.1685318,-0.9710577,-0.1692458,-0.1716574,-0.9709426,-0.1667459,0.01648157,-0.9790297,-0.2030504,0.009259939,-0.9817755,-0.1898186,0.01157224,-0.9809215,-0.1940596,-0.9571416,0.2531904,-0.1406224,-0.9586681,0.2586721,-0.1185085,-0.9584235,0.2576686,-0.1226027,-0.2267237,0.9739368,-0.006595671,-0.1893693,0.9814086,-0.03125107,-0.2145435,0.9766043,-0.01467049,-0.2466281,-0.4940166,0.8337399,-0.2300246,-0.5013757,0.834093,-0.2817341,-0.4777925,0.8320699,-0.4070222,0.4641624,0.7866933,-0.5276789,0.3904901,0.754369,-0.4974724,0.4103754,0.7642731,-0.6658565,0.7336398,0.1356754,-0.8416996,0.385433,0.3781313,-0.819513,0.4659576,0.3335894,-0.6389747,-0.6478427,0.4147424,-0.6938959,-0.5437583,0.4720546,-0.481841,-0.8349816,0.2657725,-0.9683658,0.210372,0.1342068,-0.9684244,0.2115155,0.1319676,-0.9672821,0.197402,0.1593673,-0.93966,-0.3372006,0.05774831,-0.9488905,-0.2924811,0.1185816,-0.9483882,-0.295898,0.1140373,-0.2486901,0.5063223,0.8257064,-0.2549528,0.4970664,0.8294119,-0.2436314,0.5137109,0.8226451,-0.5840876,0.4782477,0.6558359,-0.4008535,0.7070707,0.5825527,-0.4738541,0.6289783,0.6163187,-0.4490872,-0.4359373,0.7799227,-0.4794178,-0.4805802,0.7343034,-0.4577419,-0.448563,0.7676351,-0.6088669,0.2405266,0.7559286,-0.6633766,0.3492158,0.6618005,-0.5879778,0.2038467,0.7827699,-0.1373208,-0.7129936,0.6875923,-0.1005602,-0.7381961,0.6670489,-0.1640408,-0.6934413,0.7015909,-0.351769,0.755929,0.5521141,-0.1216846,0.8754611,0.4677189,-0.1989325,0.8431244,0.4995668,-0.3462779,-0.5992434,0.7218027,-0.3278626,-0.6209722,0.711969,-0.3727494,-0.5663502,0.7350548,-0.9691184,0.2457776,0.02007567,-0.9687957,0.2471634,0.01858586,-0.9691398,0.2456846,0.02017551,-0.2194315,0.9423734,-0.2525514,-0.06223613,0.9430398,-0.3268069,-0.1459504,0.946257,-0.288611,-0.8785453,0.4502384,-0.1595107,-0.8319669,0.54707,-0.09244275,-0.9086942,0.3558133,-0.2183386,-0.04437446,-0.9242849,-0.3791152,-0.03226345,-0.8999468,-0.4348045,-0.03358709,-0.9027622,-0.4288266,0.9633602,0.2360912,-0.1272722,0.9652134,0.2378269,-0.1086355,0.9401729,0.2212549,-0.2590777,0.9641835,0.2634951,-0.03034204,0.9451597,0.3265522,0.006073892,0.9579991,0.2862476,-0.01732116,-0.7705303,-0.4545277,-0.4468643,-0.7743495,-0.464424,-0.4297595,-0.7543251,-0.4176483,-0.5065212,0.8344088,-0.449802,-0.3184968,0.8398911,-0.4786645,-0.255858,0.8391809,-0.4735026,-0.2675275,-0.04134243,-0.7750699,-0.6305216,-0.0440272,-0.779586,-0.6247458,-0.04336982,-0.7784841,-0.6261641,0.0000978175,-0.000907002,-0.9999997,0.000297687,-0.001048326,-0.9999994,0.000152488,-0.000945658,-0.9999997,-0.01981139,-0.004099309,-0.9997953,-0.01938503,-0.004287481,-0.9998029,-0.01948088,-0.004245162,-0.9998012,0.7920347,-0.367168,0.4877181,0.7820352,-0.387872,0.4878283,0.7875776,-0.3765277,0.4877997,0.0180934,-0.002224266,-0.9998339,0.01981246,-0.000357764,-0.9998037,0.01606065,-0.004431247,-0.9998613,-0.9665892,-0.01744431,-0.2557367,-0.9515514,-0.02314132,-0.3066175,-0.958773,-0.02054113,-0.2834302,-0.1189298,-0.469651,-0.8748049,-0.126486,-0.4526627,-0.8826652,-0.1062409,-0.4975127,-0.8609263,-0.1408662,-0.9871283,0.07572644,-0.1454663,-0.9874595,0.06134623,-0.130172,-0.9855138,0.1087108,-0.1670227,0.9766122,-0.1353964,-0.1690653,0.9762209,-0.1356828,-0.1532272,0.9791387,-0.1334499,-0.9086654,-0.3707332,-0.1920528,-0.1424648,0.9804581,-0.1356685,-0.1655144,0.9774247,-0.1313243,-0.1626613,0.9778305,-0.1318669,-0.0407449,-0.9882509,-0.1473096,0.01568108,-0.9826341,-0.1848905,-0.06274628,-0.9892035,-0.1324369,-0.1518884,-0.9759704,-0.1562426,-0.1053739,-0.9914364,-0.07713836,-0.2094808,-0.9438483,-0.2554763,0.9520164,-0.3028731,0.04396224,0.9429132,-0.3279126,0.05820542,0.9659512,-0.2580442,0.01874792,-0.9313595,-0.3447635,-0.1170793,-0.9319275,-0.3426124,-0.1188614,-0.9315391,-0.344087,-0.1176401,0.7967467,-0.5827571,-0.1599653,0.8219431,-0.48244,-0.3027559,0.8098633,-0.5446262,-0.2179538,0.9566994,-0.2209739,-0.1894648,0.9581438,-0.2275531,-0.173724,0.9577302,-0.2255399,-0.1785631,0.03027671,-0.9685305,-0.2470465,0.07758712,-0.9307771,-0.3572593,0.06183475,-0.945101,-0.3208749,-0.8995622,-0.367293,-0.2363978,0.8532575,-0.4942215,-0.1664232,0.8541597,-0.4919822,-0.1684181,0.8535766,-0.4934327,-0.1671266,-0.1389712,0.3311566,-0.9332858,-0.1414071,0.3269125,-0.9344155,-0.1402206,0.3289816,-0.9338679,-0.1709405,0.9758186,-0.1362254,-0.1689441,0.9766742,-0.1325349,-0.1699981,0.9762249,-0.1344829,-0.009008169,0.9944503,-0.1048215,0.04428482,0.990321,-0.1315416,0.01843124,0.9927678,-0.1186279,-0.1170161,0.3274481,-0.9375954,-0.9241668,-0.3649092,-0.1129475,-0.9347259,-0.3507062,-0.0573821,-0.9321173,-0.354763,-0.0728051,-0.9406009,-0.3393184,-0.01153552,-0.9311734,-0.3638615,0.02282601,-0.9440565,-0.3287529,-0.02605396,-0.3912508,0.9200785,0.01945072,-0.360943,0.9325513,-0.00825721,-0.3867943,0.9220386,0.01533704,-0.37133,0.9206534,-0.1204636,-0.3901656,0.9128526,-0.1202952,-0.269459,0.9554404,-0.1205219,0.4958178,-0.345457,0.7967585,0.4647502,-0.3457543,0.8151449,0.2595743,0.2525571,-0.9321138,-0.2533065,-0.473627,0.8435126,-0.2780913,-0.4781379,0.8330963,-0.2718628,-0.4770343,0.8357805,0.0433129,-0.5537449,-0.8315593,0.2958425,0.5681961,0.767874,0.3316711,0.5656034,0.7550411,-0.1717716,-0.9830358,0.06430613,-0.1941677,-0.9791244,0.06012004,-0.188827,-0.9801064,0.06112295,-0.3049615,0.499527,0.8108462,-0.262831,0.5175279,0.8143002,-0.2738509,0.5129475,0.8135666,-0.1515331,-0.3967523,0.9053317,-0.1458985,-0.3834465,0.9119663,-0.1621143,-0.4217123,0.8921198,-0.7636169,0.6374855,-0.1024782,-0.6860569,0.7121389,-0.1489437,-0.7246426,0.6773605,-0.1267907,-0.8348093,-0.4762794,-0.2761368,-0.8004209,-0.5579162,-0.2192168,-0.8241645,-0.5046103,-0.2571408,-0.7585093,-0.5546457,-0.3420994,0.8873475,-0.4517442,-0.09242242,0.8950449,-0.4350926,-0.09792357,0.8769988,-0.4728574,-0.08531755,-0.01397997,-0.9605475,-0.2777642,-0.04880684,-0.9650101,-0.2576308,0.006085932,-0.957264,-0.2891519,0.7936637,0.6040211,-0.0725007,0.7233213,0.6795551,-0.1225201,0.8584865,0.5125594,-0.01684856,0.3202303,-0.03562241,-0.9466698,0.7656417,-0.1972327,-0.6122843,0.6980067,-0.1704908,-0.6954995,0.9030804,-0.4277839,-0.03803813,-0.1707864,0.4776319,0.8618003,-0.1532642,0.44828,0.8806561,-0.1605618,0.4605398,0.8729965,-0.09246593,-0.5430956,-0.8345642,-0.1053608,-0.5252572,-0.8443958,-0.08217686,-0.5570511,-0.8264025,-0.1613029,0.3589826,-0.9193002,-0.1668297,0.3695204,-0.914124,-0.1519861,0.3411988,-0.9276226,-0.135544,0.3264383,-0.9354496,-0.1079733,0.5084757,0.8542801,-0.2299523,0.4971724,0.8366252,-0.1139186,-0.9875277,0.1086817,-0.1035403,-0.985629,0.1334729,-0.1284439,-0.9889885,0.0735132,-0.2115777,-0.4601712,0.8622514,-0.204704,-0.4467799,0.8709099,-0.2201769,-0.4769037,0.8509319,-0.01220685,0.35102,-0.9362884,-0.01788055,0.354924,-0.9347242,-0.01296091,0.3515399,-0.9360833,-0.02781051,0.5132564,0.8577847,-0.01953572,0.5087794,0.8606753,-0.03111571,0.5150313,0.8566066,-0.0167464,-0.446363,0.8946953,-0.006006419,-0.4369707,0.8994557,-0.01597768,-0.445694,0.8950428,0.02268278,-0.9915872,0.1274379,0.01618093,-0.9925931,0.1204042,0.02314585,-0.991512,0.1279385,0.02493155,-0.5187199,-0.8545807,0.03521609,-0.5109761,-0.8588733,0.02259224,-0.5204675,-0.8535826,-0.03099405,0.9917098,-0.1247035,-0.03994232,0.992438,-0.1160669,-0.03137099,0.9917437,-0.1243402,-0.6547265,-0.6859359,0.3175298,-0.66949,-0.7426463,-0.01610827,-0.6731908,-0.7352844,0.07855653,-0.6848413,0.4318968,0.586905,-0.6841166,0.4486163,0.5750896,-0.6851984,0.4191451,0.5956682,0.09022963,-0.02964091,0.9954798,-0.198715,-0.897512,0.3936808,-0.184082,-0.8676149,0.4619073,-0.9490168,-0.2547123,0.1857116,-0.8953411,-0.1747028,0.4096869,-0.9309889,-0.2191673,0.2919344,-0.5012795,0.5726013,0.648727,-0.5225579,0.5050597,0.686912,-0.4782437,0.632893,0.6088757,-0.8758765,0.1156226,0.4684783,-0.8744587,0.1121197,0.4719654,-0.8773877,0.1194178,0.4646829,0.9769951,-0.05549496,-0.2059151,0.9496037,-0.02266842,-0.3126323,0.9550635,-0.02818381,-0.2950581,0.03822398,-0.7468009,-0.6639483,0.03911918,-0.748162,-0.662362,0.03616052,-0.7436503,-0.6675903,-0.8465749,-0.4500563,-0.2841839,-0.8479267,-0.4557262,-0.2708024,-0.8382482,-0.4233285,-0.3437048,0.782223,-0.4226515,-0.457704,0.7604684,-0.3811082,-0.5257799,0.7645919,-0.38846,-0.514294,-0.1016545,0.9946826,-0.01652836,-0.04444068,0.9982882,0.03802311,-0.1047591,0.9943064,-0.01950293,0.7109782,0.7018733,-0.04340589,0.6929097,0.7185265,-0.05996614,0.7160623,0.6969667,-0.03863322,-0.7295421,0.6787831,-0.08379626,-0.7342705,0.6743308,-0.07826143,-0.7303271,0.6780508,-0.0828821,-0.9956772,0.02779084,-0.0886265,-0.9990075,0.0357365,-0.02658855,-0.9978982,0.03193974,-0.05638247,-0.9550636,-0.02818369,-0.2950581,-0.9496038,-0.0226683,-0.3126323,-0.9769951,-0.05549496,-0.2059151,-0.03616052,-0.7436503,-0.6675903,-0.03911918,-0.7481621,-0.6623619,-0.03822398,-0.746801,-0.6639482,0.8382482,-0.4233285,-0.3437048,0.8479267,-0.4557262,-0.2708024,0.8465749,-0.4500563,-0.2841839,-0.7822228,-0.4226515,-0.4577043,-0.7866091,-0.4321047,-0.4410574,-0.7645918,-0.3884599,-0.514294,0.1016545,0.9946826,-0.0165283,0.1644505,0.983376,-0.07699233,0.1047591,0.9943064,-0.01950287,-0.7109782,0.7018732,-0.04340589,-0.7364076,0.6762716,-0.01899087,-0.7160623,0.6969667,-0.03863322,0.7303261,0.6780518,-0.08288341,0.7342706,0.6743308,-0.07826149,0.7295409,0.6787843,-0.08379781,0.9978982,0.03193956,-0.05638396,0.9990075,0.0357365,-0.02658855,0.9956769,0.02779042,-0.0886296,0.1219295,-0.9358319,-0.330684,0.06999224,-0.9219866,-0.3808436,0.1340867,-0.938361,-0.3185897,0.09390848,-0.1379657,-0.985975,0.05013507,-0.1515113,-0.9871833,0.1821779,-0.10957,-0.9771416,0.8434424,-0.4348909,-0.3153967,0.831796,-0.514105,-0.209312,0.8403522,-0.4692381,-0.2713373,0.8005332,-0.5986846,-0.02689576,0.7867568,-0.6169957,-0.01816827,0.8222556,-0.5676187,-0.04129058,-0.09391611,-0.1379743,-0.9859731,-0.2607949,-0.08303081,-0.9618171,-0.1822029,-0.1095729,-0.9771366,-0.8403585,-0.4692215,-0.2713466,-0.8318068,-0.5140789,-0.2093331,-0.8434467,-0.4348806,-0.3153991,-0.8222672,-0.5676018,-0.04129064,-0.7867545,-0.616999,-0.01815742,-0.8005369,-0.59868,-0.02688932,-0.9262334,0.3735621,-0.05042946,-0.9401429,0.3289823,-0.08889442,-0.9190935,0.3926073,-0.03356856,-0.06962883,-0.958438,-0.2766739,-0.04002314,-0.9664916,-0.2535588,-0.06394118,-0.9600974,-0.2722586,-0.8502089,-0.5136315,-0.115445,-0.8478223,-0.5170246,-0.1178264,-0.8604521,-0.498603,-0.1049638,0.8856939,-0.3857055,-0.2584137,0.8524384,-0.4199516,-0.3114312,0.8821724,-0.3896622,-0.2644529,0.8140717,0.5677391,-0.1223102,0.8309122,0.5464532,-0.1047571,0.8049836,0.5785674,-0.1313823,0.05773305,0.9922788,-0.1097711,0.07411175,0.9923447,-0.09879022,0.04828512,0.9920657,-0.1160791,0.9262331,0.3735632,-0.05042815,0.8949466,0.4459171,0.01511508,0.9190933,0.392608,-0.03356754,0.06394064,-0.9600973,-0.272259,0.04002255,-0.9664916,-0.2535591,0.06962859,-0.9584379,-0.2766744,0.8520042,-0.5136808,-0.1010988,0.8655968,-0.4946423,-0.07791954,0.8592072,-0.5038228,-0.08902585,-0.8821724,-0.3896622,-0.2644531,-0.8524383,-0.4199517,-0.3114314,-0.8856939,-0.3857055,-0.2584139,-0.8140715,0.5677391,-0.1223102,-0.7832058,0.6028668,-0.1521195,-0.8049835,0.5785674,-0.1313823,-0.05773371,0.9922787,-0.1097716,-0.02905124,0.991237,-0.1288622,-0.04828548,0.9920656,-0.1160796,0.8647136,-0.4880688,-0.1185718,0.8251386,-0.4781436,-0.3008736,0.8501825,-0.5136483,-0.115564,0.8647403,-0.4919722,-0.1009344,0.860571,-0.4983448,-0.105214,0.8545777,-0.4913411,-0.1681695,-0.8519537,-0.5137783,-0.1010288,-0.8459658,-0.5216262,-0.1106713,-0.8593292,-0.5036639,-0.08874696,-0.8095771,-0.5456216,-0.2165231,-0.8219256,-0.4824957,-0.302715,-0.7967284,-0.5827966,-0.1599127,-0.8535459,-0.4934943,-0.1671016,-0.8541678,-0.4919677,-0.1684196,-0.8532421,-0.4942355,-0.1664606,-0.8769936,-0.4728901,-0.08518934,-0.8950963,-0.4350536,-0.09762811,-0.8874471,-0.4515835,-0.09225046,0.1666515,-0.920322,0.3538852,0.1495791,0.3783508,0.913497,0.9027611,-0.001938164,-0.4301381,0.9810673,0.1906771,0.03390139,-0.009570538,-0.3604387,-0.9327338,0.1666507,-0.9203207,0.3538889,0.5079304,-0.2275064,-0.8308115,-0.8533141,-0.3144755,-0.4158851,0.1666529,-0.9203217,0.3538855,-0.9860155,-0.1555554,0.05979967,-0.1497026,-0.3549168,-0.9228344,0.8155248,0.3303788,0.4751518,-0.916563,-0.01226192,0.3997022,0.01154011,0.360743,0.932594,0.9860126,0.1555721,-0.059803,-0.5092948,-0.3876463,-0.7683418,0.9647311,-0.2456944,0.09448987,-0.1666647,0.9203216,-0.3538802,-0.1686248,0.9200087,-0.3537649,0.1748042,0.9190042,-0.3533765,-0.9636284,0.2494357,-0.09592819,-0.5928186,0.3933319,0.7027491,0.5090369,-0.3822607,-0.7712057,-0.1496142,0.3783299,0.9134999,-0.9027962,-0.002206683,-0.430063,-0.9811223,0.1903777,0.03399151,0.009596407,-0.3603883,-0.9327531,-0.1663302,-0.9203734,0.3539026,-0.1750155,-0.9274369,0.3305005,-0.5079798,-0.2276655,-0.8307377,0.8533756,-0.3141685,-0.4159908,-0.1663312,-0.9203745,0.3538994,-0.1663485,-0.9203667,0.3539116,0.9860673,-0.155261,0.05971062,0.1472828,-0.3780913,-0.9139775,-0.8155809,0.3301101,0.4752423,0.9165958,-0.01196837,0.3996359,-0.01157778,0.3606989,0.9326105,-0.9860678,0.1552581,-0.05970931,0.5093666,-0.3874889,-0.7683738,-0.9646481,-0.2459865,0.09457606,0.1663303,0.9203706,-0.3539097,0.1683025,0.9200599,-0.3537854,-0.1751134,0.9189503,-0.3533635,0.9635424,0.2497342,-0.09601581,0.5927989,0.3935028,0.70267,-0.5290695,-0.3835758,-0.756938,0.7383438,0.5990065,-0.3099026,0.3288109,0.8039622,-0.4955081,0.801994,-0.5967536,0.02628105,0.7511623,0.6565761,-0.06828606,0.9566679,0.203797,-0.2079744,0.3332902,0.9420012,-0.0393877,0.7063637,-0.6031822,-0.3704342,0.1831172,0.7614313,-0.6218444,0.5601009,0.5638644,-0.6069135,-0.6345518,0.6438077,-0.4276163,-0.3123919,0.8214081,-0.4771792,-0.5941988,0.6701037,-0.444847,-0.7586765,0.6487889,-0.05901753,-0.9567207,0.2035076,-0.2080149,-0.3090353,0.9492401,-0.05865621,-0.7061576,-0.6034066,-0.3704618,-0.1719334,0.7292461,-0.6622983,-0.5534401,0.5645672,-0.6123464,-0.6091346,-0.7874398,0.0943067,-0.3892247,-0.7977109,0.46061,-0.8936498,0.4357597,0.1072557,-0.7384656,-0.6738296,0.02494853,-0.9141491,-0.2039753,-0.3503221,-0.3537405,-0.9351287,-0.02005183,-0.8907142,0.4366631,0.1263076,-0.291603,-0.7726702,0.5638692,-0.5470302,-0.7106813,0.4423689,0.6111826,-0.7858442,0.09436452,0.3789306,-0.8093818,0.448679,0.9572942,-0.06914281,0.2807264,0.7693108,-0.6387931,-0.01020878,0.914258,-0.2035427,-0.3502898,0.3193897,-0.9476231,0.000754905,0.8905683,0.4369499,0.1263453,0.2839484,-0.755626,0.5902565,0.4236447,-0.6966319,0.5789899,-0.07233989,0.03836375,-0.9966419,0.7267166,-0.5986011,-0.3369862,-0.1442725,-0.9566474,-0.2530047,-0.06750559,-0.5201317,0.8514141,-0.06732231,0.01685273,0.997589,-0.1056456,0.02298587,0.9941383,-0.09798127,-0.150784,0.9836991,0.2664733,-0.9515674,-0.153335,0.696738,-0.6089643,-0.3791025,-0.007695615,0.9847459,-0.173829,0.2328891,0.04120457,-0.97163,-0.3475712,-0.4334942,-0.8314308,-0.2975106,-0.647378,-0.7017045,0.004939556,0.09456169,-0.9955068,-0.5503142,-0.8309611,-0.0815975,-0.2628119,-0.8873402,-0.3788897,0.04606062,-0.5057578,0.861445,0.07243484,-0.001223266,0.9973725,0.08614224,-0.06222212,0.994338,0.02246969,-0.06012481,0.997938,0.2532573,-0.9034817,-0.3458058,-0.6968461,-0.6073915,-0.3814201,-0.3228356,0.9405468,-0.1055889,-0.07783174,0.4284434,-0.9002103,0.3469233,-0.462297,-0.8160428,0.1815214,-0.5680443,-0.8027302,0.9076213,0.4137132,-0.07117062,0.6028721,0.7632405,0.2323988,0.1941183,0.9742044,-0.1150827,0.9822717,-0.1319966,-0.1331145,0.4801463,-0.7913876,-0.3783718,0.1147361,-0.1860814,0.9758122,-0.2607216,0.9634493,-0.06156015,0.4034529,0.7057023,0.5824175,0.418529,-0.3832568,0.8233758,0.6607035,0.3508626,0.6636011,0.2019613,-0.6624312,0.7213853,0.1178266,0.8748368,0.4698696,0.3923418,-0.5405257,0.7442445,0.05158388,0.1626831,-0.9853291,0.1781541,0.4100501,-0.8944944,0.1746763,0.3677783,-0.9133605,0.1631395,0.4176796,-0.8938285,0.7782632,0.5951884,0.2001426,0.591732,-0.7543936,-0.2841539,0.6287813,0.7721053,-0.09212863,-0.3763491,-0.8000616,-0.4671862,0.3865756,0.8250179,-0.412195,0.4706972,-0.8604264,-0.1952197,-0.02113103,0.1150912,-0.9931302,0.1281563,0.180239,-0.9752385,0.08663904,-0.8801478,0.4667266,0.9549363,-0.2830113,-0.08945024,0.2752814,-0.9601466,0.04835933,0.7269052,0.6848947,0.05027967,0.9473147,0.3031702,0.1033569,0.6395664,-0.7687321,0.002431988,0.3024163,0.9472672,0.1059688,0.9569041,-0.2842692,0.05937665,0.6487013,-0.2201671,0.7285006,0.03064566,-0.7055566,0.7079908,0.5120581,0.6041945,0.6105288,0.2919132,-0.6476475,0.7038035,0.6302048,0.1685868,0.7579053,0.1688262,0.7136107,0.6798953,0.2241116,-0.1526299,0.9625374,0.01115262,-0.5608397,0.8278494,0.2580915,-0.03914535,0.9653272,0.2611398,0.2637519,0.9285694,0.350874,0.9320797,-0.0900824,-0.04520899,0.09840577,-0.994119,0.04260641,-0.124838,-0.9912619,-0.7794451,-0.6246231,-0.04807871,-0.01628428,0.3218393,0.9466543,0.2211071,0.2744127,-0.9358469,0.938774,0.2553873,-0.2312592,0.9767623,-0.07111066,-0.2021848,0.1914783,-0.2318122,0.9537292,0.08954417,-0.00442332,-0.9959731,0.2611775,-0.9642553,0.04469996,0.1974423,0.3112852,0.9295796,-0.1939212,0.3735353,-0.9071196,-0.3218107,0.3651952,0.873539,-0.6797066,-0.7323608,0.04057782,-0.4236435,-0.176434,-0.8884804,-0.4594852,0.8868253,-0.04913622,-0.2603229,-0.367635,0.8927915,0.5972048,-0.7832624,-0.172762,0.2941615,-0.3268327,0.8981367,0.9055604,0.4240033,-0.01347637,-0.05695265,0.007418692,-0.9983494,0.1657018,0.3226181,0.9319123,0.274366,-0.9571655,0.09250724,0.224784,-0.1217541,-0.966772,0.1462295,-0.2663114,0.9527305,0.3419874,-0.03247517,-0.9391433,0.2645404,0.959902,-0.09277158,0.03493779,-0.1592434,-0.986621,0.9988335,-0.0354312,-0.0328046,0.2040461,-0.4380217,0.8755012,-0.8035714,-0.5812396,-0.1281936,0.1021324,-0.5092924,-0.8545117,0.1273307,-0.9845441,0.1202493,0.913892,-0.2893939,-0.2846977,0.943181,-0.07404536,-0.3239244,-0.09145748,0.1242179,-0.9880311,0.3216867,0.7983425,-0.5090845,-0.03976362,-0.5467888,-0.8363258,0.516009,0.8085974,-0.2826744,0.4027272,0.6682308,-0.6255226,0.590782,-0.5832014,-0.5575419,0.2598117,0.726373,-0.6363021,0.8126653,0.3187331,-0.4878363,0.3713386,-0.8617196,-0.3457558,0.8461702,-0.1840956,-0.5001048,0.880051,0.4216259,0.2184996,0.8988414,0.4299781,-0.08487081,0.8110255,0.5066832,-0.2924209,0.9819483,0.1047008,-0.1575286,0.9576977,-0.04206752,-0.2846848,0.4212094,0.267102,-0.8667405,0.8866748,0.4608911,0.03724706,0.6878495,0.4112461,-0.5981135,0.04530173,0.9989269,-0.00964576,0.1781758,-0.9822849,-0.05804926,-0.1623218,0.9593424,-0.2308982,0.03100538,0.3199052,0.9469421,0.5499739,-0.8303169,-0.09001451,0.3427907,-0.9097444,-0.2342215,0.6445071,-0.7376015,-0.2013819,0.7826374,-0.5087673,-0.3586568,0.4630094,-0.8855745,-0.03714966,0.5894384,-0.754082,-0.2896943,0.6189729,-0.7837554,-0.05099135,0.2837232,-0.958339,-0.03297883,0.3511598,-0.866778,-0.3540942,0.6226657,-0.7338993,-0.2714393,0.439737,-0.206888,-0.873973,0.7850515,-0.6147753,-0.0757994,-0.3087083,-0.9511452,0.004690706,0.6079147,-0.7786571,0.1553476,0.1657077,-0.4318954,0.8865706,0.154024,0.444963,0.8822044,0.1481589,0.3324744,-0.931402,0.3659656,-0.8678134,-0.3361088,0.436262,-0.8919803,-0.1185185,0.4933187,-0.8697063,0.01573437,0.7233419,-0.6472149,0.2406022,0.6844423,0.4532788,0.5710316,0.3463061,-0.9083459,0.2344778,0.9477674,-0.2998928,0.108634,0.5140078,0.514882,0.6860703,0.8814123,0.1189153,0.4571341,-0.9767357,0.1753415,0.1234623,-0.6028721,0.7632403,0.2323996,-0.1941174,0.9742045,-0.1150833,-0.9803863,-0.01267814,-0.1966775,-0.4036604,-0.8584049,-0.3165427,0.1777484,-0.3520147,0.918962,0.2607222,0.9634492,-0.06156039,-0.6498761,0.3629251,0.6677923,-0.4185314,-0.3832577,0.8233742,-0.4439154,-0.04361873,0.8950065,-0.2019631,-0.662432,0.7213839,-0.449509,0.6826801,0.5760986,-0.3923453,-0.5405237,0.7442442,-0.05157721,0.1626824,-0.9853296,-0.1751099,0.411164,-0.8945841,-0.2857519,0.243434,-0.9268687,-0.1631395,0.4176793,-0.8938286,-0.7782626,0.5951895,0.2001424,-0.6751541,-0.6485496,-0.3514974,-0.6287802,0.7721061,-0.09212845,0.4711827,-0.7099487,-0.5234116,-0.3755602,0.8363517,-0.3993375,-0.4706977,-0.8604259,-0.1952205,-0.01504099,0.1432731,-0.989569,-0.1281621,0.1802403,-0.9752374,-0.1678704,-0.9157441,0.36501,-0.9505351,-0.3034869,-0.06617206,-0.2752819,-0.9601465,0.04835927,-0.7604981,0.6430619,0.09007793,-0.9473146,0.3031709,0.103357,-0.5720252,-0.8188372,0.0478841,-0.3068544,0.9455315,0.1086766,-0.9569041,-0.284269,0.05937677,-0.6487001,-0.2201679,0.7285014,-0.1399608,-0.7453517,0.6518142,-0.5294019,0.5228285,0.6681197,-0.4298378,-0.6039597,0.6711723,-0.6302049,0.1685875,0.7579051,-0.1688247,0.713611,0.6798954,-0.2241128,-0.1526299,0.9625371,-0.1136251,-0.4844432,0.8674123,-0.2754064,-0.0070827,0.9613018,-0.2611347,0.2637522,0.9285708,-0.3508768,0.9320788,-0.09008067,-0.1150107,-0.03433322,-0.9927707,-0.213986,-0.2695661,-0.9389058,0.8236515,-0.5547555,-0.1176632,-0.0644012,0.3808912,0.9223744,-0.2210978,0.2744134,-0.9358488,-0.9383556,0.2559369,-0.232347,-0.9767625,-0.07111346,-0.2021827,-0.1602017,-0.2657285,0.9506438,-0.0895403,-0.00442177,-0.9959735,-0.2850953,-0.9540536,0.09220862,-0.1974458,0.3112841,0.9295791,0.1939204,0.3735339,-0.9071204,0.2573061,0.4351721,0.8627972,0.679706,-0.7323615,0.04057776,0.2078463,-0.4405063,-0.873358,0.4594851,0.8868253,-0.04913717,0.2603178,-0.3676324,0.892794,-0.5972079,-0.7832601,-0.172761,-0.1570314,-0.3351202,0.9289972,-0.8799848,0.4694001,0.07273459,0.05694413,0.007420837,-0.9983498,-0.1657016,0.3226175,0.9319125,-0.2567417,-0.9640448,0.06856679,-0.2247867,-0.1217555,-0.9667712,-0.2475849,-0.1852153,0.9509979,-0.1338824,0.1571571,-0.9784566,-0.2621935,0.9609001,-0.0890271,-0.03494125,-0.1592351,-0.9866222,-0.9998007,0.01991337,-0.001415133,0.1903879,-0.2124136,0.9584534,0.7742413,-0.6272985,-0.08394759,-0.1021333,-0.5092925,-0.8545116,-0.1273308,-0.984544,0.1202499,-0.9138928,-0.289393,-0.2846961,-0.9431804,-0.07404989,-0.323925,0.1351806,0.140053,-0.9808728,-0.3153772,0.7838268,-0.5349324,0.0662294,-0.4941298,-0.8668619,-0.5160092,0.8085972,-0.2826752,-0.3792209,0.6652975,-0.6430947,-0.5907807,-0.5832015,-0.557543,-0.2596026,0.7260543,-0.6367509,-0.5132409,0.4913554,-0.7036716,-0.4937459,-0.661056,-0.5649957,-0.8461704,-0.1840955,-0.5001047,-0.880051,0.4216259,0.2184992,-0.8881329,0.4579474,-0.03878349,-0.8114075,0.5038679,-0.2962011,-0.9819485,0.1046991,-0.157529,-0.9855133,0.1110504,-0.1281844,-0.3519928,0.2730329,-0.8952956,-0.8652893,0.5006951,0.02406167,-0.3949118,0.681485,-0.6161354,0.06918227,0.9946624,0.07655513,-0.4643747,-0.8589379,0.2158283,0.1623228,0.9593424,-0.2308976,-0.03101181,0.3199058,0.9469417,-0.5588799,-0.8172093,-0.1407921,-0.25678,-0.954146,-0.1538494,-0.8204914,-0.5680788,-0.06387853,-0.7826367,-0.508768,-0.3586571,-0.4630095,-0.8855745,-0.03714966,-0.5894358,-0.7540841,-0.2896942,-0.6438617,-0.7602308,-0.08655202,-0.2837235,-0.9583389,-0.03298002,-0.3291443,-0.887492,-0.3225245,-0.6226657,-0.7338988,-0.2714405,-0.4397312,-0.20689,-0.8739754,-0.8181203,-0.5714854,-0.06390464,0.3087126,-0.9511439,0.004690706,-0.6079134,-0.7786574,0.1553507,-0.1657076,-0.4318968,0.8865699,-0.174572,0.4845646,0.8571592,-0.1481608,0.3324756,-0.9314014,-0.3659576,-0.8678197,-0.3361014,-0.4362593,-0.8919815,-0.1185202,-0.4933208,-0.8697052,0.01573443,-0.7233429,-0.6472133,0.2406035,-0.688268,0.3995372,0.6055222,-0.3463049,-0.9083463,0.2344779,-0.9477666,-0.2998949,0.1086348,-0.4460239,0.6672913,0.5964772,-0.8781355,0.1088284,0.4658699,-0.3602325,-0.8702465,-0.3360114,0.3602374,-0.8702484,-0.3360013,0.379399,-0.8606352,-0.3396523,-0.3793987,-0.8606343,-0.3396551,0.119585,-0.8678941,0.4821406,0.3012836,0.9050142,-0.3002957,0.9248424,-0.3780703,0.04158884,0.1664659,-0.9817157,0.0923224,-0.9982262,0.03704106,-0.04661029,0.03367143,-0.5791258,0.8145425,0.9672637,0.2534961,0.01186722,0.1939926,0.9743316,-0.1142139,0.942182,0.2056552,0.2645732,0.9172172,-0.2893139,0.27388,0.4948737,0.8404677,0.2207133,0.4534524,0.8792051,0.1462169,0.2426948,0.9600101,0.1395702,0.1767851,0.9647988,0.1947059,0.3933667,-0.9192726,-0.01416063,-0.7903788,0.2177664,-0.5726076,0.4033662,-0.8984299,0.1735499,0.001502335,0.9384728,-0.3453499,0.443874,-0.7615036,0.4723222,-0.001633703,0.01069092,-0.9999416,-0.000170144,0.004222273,-0.9999911,0.704392,-0.4784015,0.5243701,-0.7332701,0.677794,-0.05394679,0.7514205,0.659665,-0.01446789,-0.2053221,0.9764868,-0.06569969,0.3800723,-0.9114735,-0.157357,0.3022976,0.9273896,-0.2203742,0.1738847,-0.9708511,-0.1649616,-0.01921594,-0.9779325,-0.2080357,0.9566586,0.2517308,-0.1464102,0.1893693,0.9814086,-0.03125107,0.2300224,-0.501376,0.8340935,0.3621836,0.4879451,0.7941868,0.4768089,0.8782119,-0.0373795,0.6938956,-0.5437584,0.4720547,0.9684244,0.2115156,0.1319676,0.9247841,-0.3804699,-0.004153966,0.2379717,0.5218858,0.8191488,0.4008535,0.7070707,0.5825527,0.405089,-0.3729308,0.8347608,0.6633771,0.3492155,0.6618002,0.2022752,-0.6636061,0.7202165,0.1216841,0.8754611,0.467719,0.3915578,-0.5417113,0.7437953,0.9687957,0.2471635,0.01858586,0.06223499,0.9430397,-0.3268073,0.9247635,0.2723402,-0.2657883,0.04570519,-0.9267662,-0.3728479,-0.9652583,0.2377542,-0.108395,-0.9451609,0.3265477,0.006135106,0.7743494,-0.4644241,-0.4297595,-0.8330429,-0.4445447,-0.3292716,0.04074466,-0.7740586,-0.6318016,-0.000297689,-0.001048326,-0.9999994,0.01938503,-0.004287481,-0.9998029,-0.7820352,-0.387872,0.4878283,-0.01418113,-0.006471633,-0.9998785,0.9515514,-0.02314132,-0.3066175,0.1010288,-0.5087201,-0.8549838,0.1267759,-0.9847604,0.1190584,0.1690653,0.9762209,-0.1356828,0.1398267,0.9807696,-0.1361598,0.1087008,-0.9889333,-0.1009709,0.1053731,-0.9914366,-0.07713818,-0.9732428,-0.2297573,0.003177523,0.9319275,-0.3426123,-0.1188614,-0.9563621,-0.2185445,-0.1939328,-0.009404301,-0.9802463,-0.197557,0.1414071,0.3269125,-0.9344155,0.1689441,0.9766742,-0.1325349,-0.04428482,0.990321,-0.1315417,0.920871,-0.3684355,-0.1274836,0.9311733,-0.3638615,0.02282595,0.360943,0.9325513,-0.00825721,0.3901656,0.9128526,-0.1202952,-0.4647501,-0.3457542,0.815145,0.2467155,-0.4723742,0.8461644,-0.03984534,-0.5542306,-0.831409,0.1682718,-0.9835982,0.06495565,0.3124228,0.496199,0.8100486,0.1661545,-0.4312332,0.8868093,0.6860569,0.7121388,-0.1489437,0.8004209,-0.5579162,-0.2192168,-0.03472512,-0.9516756,-0.3051356,-0.8949343,0.4456945,0.02119302,-0.2684588,-0.01834183,-0.9631165,-0.1719523,-0.944463,-0.2800398,0.1532655,0.4482799,0.880656,0.07242125,-0.5700573,-0.8184069,0.1482383,0.3340384,-0.9308297,0.1356618,-0.9891812,0.05582714,0.2250745,-0.4864228,0.8442361,0.007380425,0.3476856,-0.9375822,0.01953572,0.5087797,0.8606752,0.02681303,-0.4550779,0.8900479,-0.02968001,-0.9904015,0.1349968,-0.03521609,-0.5109761,-0.8588733,0.0224815,0.9908748,-0.1328974,0.629077,-0.6431481,0.4366037,0.6841183,0.4486153,0.5750883,-0.1309531,0.1289096,0.9829718,0.9547934,-0.2886197,0.07119178,0.5225579,0.5050598,0.686912,0.8744586,0.1121195,0.4719654,-0.119585,-0.8678941,0.4821406,-0.3594191,0.9321083,0.04463481,-0.9305032,-0.366158,-0.009602487,-0.1995663,-0.9769321,0.07600748,0.9981762,0.03732693,-0.04744648,-0.03367143,-0.5791258,0.8145425,-0.9676047,0.2487177,0.04336875,-0.1939926,0.9743316,-0.1142139,-0.942182,0.2056552,0.2645732,-0.9207926,-0.283288,0.2681216,-0.4948737,0.8404677,0.2207133,-0.4534524,0.8792051,0.1462169,-0.2502852,0.9573529,0.1443365,-0.1767851,0.9647988,0.1947059,-0.3933665,-0.9192727,-0.01416015,0.2796195,0.1075213,-0.9540714,-0.514239,-0.8493195,0.1192253,-0.1815564,0.9752911,-0.1258748,-0.443874,-0.7615036,0.4723222,0.001633703,0.01069092,-0.9999416,0.00091186,0.005547165,-0.9999842,-0.704392,-0.4784015,0.5243701,0.7351584,0.6750848,-0.06166684,-0.7348464,0.6757641,-0.05782502,0.1650338,0.985479,0.03993886,-0.3872782,-0.9070109,-0.1653687,-0.302292,0.9273987,-0.2203435,-0.1738847,-0.9708511,-0.1649616,0.01920914,-0.9779322,-0.2080373,-0.9566586,0.2517308,-0.1464102,-0.2474414,0.968876,0.007219254,-0.3064334,-0.4658238,0.8301246,-0.3621836,0.4879451,0.7941868,-0.4768089,0.8782119,-0.0373795,-0.2799375,-0.9557346,0.09059035,-0.9667001,0.1926804,0.16842,-0.9247841,-0.3804699,-0.004153966,-0.2379717,0.5218858,0.8191488,-0.6454979,0.3686625,0.668895,-0.405089,-0.3729308,0.8347608,-0.4258394,-0.03402125,0.904159,-0.2022752,-0.6636061,0.7202165,-0.444637,0.685714,0.5762763,-0.3915578,-0.5417113,0.7437953,-0.9694942,0.2441401,0.02183449,-0.2794301,0.9343235,-0.2212657,-0.9247635,0.2723402,-0.2657883,-0.04570722,-0.9267657,-0.3728489,0.9360924,0.2191265,-0.2751628,0.9716008,0.2316318,-0.04835933,-0.7497472,-0.4082594,-0.520772,0.8330429,-0.4445447,-0.3292716,-0.04074466,-0.7740586,-0.6318016,-0.0000328236,-0.000814628,-0.9999998,-0.01991963,-0.004051506,-0.9997935,0.7973099,-0.3557985,0.4875494,0.01418113,-0.006471633,-0.9998785,-0.9684541,-0.01665163,-0.248635,-0.1010288,-0.5087201,-0.8549838,-0.1267759,-0.9847604,0.1190584,-0.1516758,0.9794102,-0.1332296,-0.1398267,0.9807696,-0.1361598,-0.1087016,-0.9889333,-0.1009709,-0.2391899,-0.9210674,-0.3072836,0.9731848,-0.2300031,0.003155112,-0.9309142,-0.3464291,-0.1156972,0.7729905,-0.6292037,-0.081169,0.9562349,-0.2190811,-0.1939547,0.00940895,-0.9802464,-0.197556,0.8529109,-0.4950752,-0.1656612,-0.1379817,0.3328765,-0.9328206,-0.171702,0.9754872,-0.137634,-0.02999025,0.9951021,-0.09419423,-0.9208711,-0.3684352,-0.1274834,-0.9507473,-0.3042847,-0.05908042,-0.4184291,0.9071416,0.04484575,-0.2637425,0.9570389,-0.1204844,0.2529452,0.254196,-0.9334899,-0.2467155,-0.4723742,0.8461644,0.03984534,-0.5542306,-0.831409,-0.1682718,-0.9835982,0.06495565,-0.3124228,0.496199,0.8100486,-0.1661545,-0.4312332,0.8868093,-0.7901154,0.6070907,-0.08460837,-0.8523458,-0.4198523,-0.3118185,0.8655927,-0.4946648,-0.07782089,0.03472435,-0.9516757,-0.3051357,0.8949344,0.4456942,0.02119481,0.26841,-0.0183435,-0.9631302,-0.1751462,0.484889,0.8568585,-0.07242125,-0.5700573,-0.8184069,-0.1482383,0.3340384,-0.9308297,-0.1356618,-0.9891812,0.05582714,-0.2250745,-0.4864228,0.8442361,-0.007380425,0.3476856,-0.9375822,-0.03906011,0.5192657,0.8537199,-0.02681303,-0.4550779,0.8900479,0.02968001,-0.9904015,0.1349968,0.01240271,-0.5280199,-0.8491414,-0.0224815,0.9908748,-0.1328974,-0.629077,-0.6431481,0.4366037,-0.6853927,0.4061273,0.6043984,0.1309531,0.1289096,0.9829718,-0.9547934,-0.2886197,0.07119178,-0.4475574,0.6992808,0.5574036,-0.878542,0.1223611,0.4617271,0.9800837,-0.0605145,-0.1891403,0.0353617,-0.7424255,-0.6689949,-0.836523,-0.4187349,-0.3533986,0.7866094,-0.4321047,-0.4410571,-0.1644505,0.983376,-0.07699233,0.7364076,0.6762716,-0.01899087,-0.7257906,0.6822458,-0.08813977,-0.9949547,0.02674615,-0.09669488,-0.9800837,-0.0605145,-0.1891403,-0.0353617,-0.7424255,-0.6689949,0.836523,-0.4187349,-0.3533986,-0.7604684,-0.3811082,-0.52578,0.04444068,0.9982882,0.03802311,-0.6929097,0.7185265,-0.05996614,0.7257883,0.682248,-0.08814251,0.9949544,0.02674567,-0.09669834,0.1719517,-0.9444632,-0.280039,0.2607526,-0.08303433,-0.9618282,0.8439968,-0.4049019,-0.3517444,0.8352339,-0.5475881,-0.05031555,-0.05013579,-0.151522,-0.9871816,-0.8440002,-0.4048973,-0.3517414,-0.8352508,-0.547562,-0.0503202,-0.8949465,0.4459174,0.01511496,-0.09038442,-0.9519283,-0.2926827,-0.8647608,-0.4920412,-0.1004207,0.9065346,-0.3602454,-0.2200416,0.7832058,0.6028669,-0.1521196,0.02905136,0.991237,-0.1288616,0.9401423,0.3289843,-0.0888924,0.09038418,-0.9519283,-0.2926832,0.8459774,-0.5215653,-0.1108692,-0.9065346,-0.3602453,-0.2200416,-0.8309121,0.5464533,-0.1047571,-0.07411283,0.9923446,-0.09879076,0.847859,-0.5169656,-0.1178214,-0.865603,-0.4946323,-0.07791304,-0.7729874,-0.6292094,-0.08115565,-0.852865,-0.4951522,-0.1656671,-0.8655995,-0.494653,-0.07782065],"vertexPositionIndices":[578,536,429,496,484,415,490,494,413,429,536,537,642,437,469,465,474,473,484,490,411,509,454,455,418,419,421,418,449,423,458,448,431,448,421,432,538,431,432,457,431,538,495,425,413,519,527,426,449,429,430,614,496,426,461,429,449,438,435,434,436,437,434,463,473,475,642,643,438,645,644,434,643,645,435,423,430,495,415,487,493,537,613,495,482,440,441,411,483,487,539,432,496,414,445,459,416,458,459,420,448,458,422,414,460,420,450,418,422,449,418,498,480,507,424,447,458,446,460,459,447,412,459,528,578,461,579,424,457,427,461,460,421,419,490,493,487,444,483,442,444,504,465,463,428,426,493,489,493,443,649,647,470,646,469,472,648,472,470,436,433,470,433,434,471,465,462,468,436,472,469,644,466,475,511,452,456,512,456,453,506,507,478,442,441,492,478,505,417,491,482,486,413,425,491,489,439,660,483,485,486,660,439,680,428,489,659,440,488,492,442,486,441,680,439,682,497,500,506,500,501,507,667,669,467,477,476,417,413,485,483,419,423,494,432,421,484,420,416,501,450,420,500,414,502,498,450,497,499,422,499,502,445,498,501,513,453,451,669,668,466,668,666,503,466,503,463,681,670,462,665,504,503,667,464,462,519,428,658,541,641,613,504,462,465,509,510,451,497,477,481,508,455,452,477,506,476,478,480,505,507,480,478,499,481,479,502,479,480,417,508,511,505,480,510,479,513,510,481,512,513,481,477,511,505,509,508,446,514,516,447,424,517,427,516,637,412,515,514,424,579,635,412,447,518,545,536,578,616,542,524,608,520,522,545,546,537,650,654,587,591,592,583,602,524,520,571,570,629,533,531,530,530,531,535,547,564,574,548,533,564,538,539,548,538,547,573,522,541,615,519,544,542,565,535,546,614,527,542,565,545,577,550,551,554,552,549,550,593,591,581,650,553,554,653,551,550,651,554,551,535,612,615,611,605,524,615,613,537,557,556,600,605,601,520,539,614,616,523,576,575,575,574,525,574,564,532,534,565,576,532,564,530,530,565,534,627,598,618,540,573,574,575,576,562,563,574,575,577,578,528,579,526,573,576,577,543,533,602,608,611,559,560,560,558,601,581,583,624,544,607,611,607,555,559,657,589,588,590,587,654,588,590,656,552,590,588,549,588,589,583,592,586,587,590,552,652,657,593,572,568,631,569,572,632,626,594,596,558,610,557,529,625,596,604,600,609,522,603,609,664,555,607,601,558,604,556,678,664,663,607,544,610,606,556,558,557,604,606,677,678,617,595,626,620,626,627,673,582,585,595,529,594,601,603,522,531,608,612,548,616,602,532,620,621,566,617,620,618,622,523,619,617,566,622,619,534,621,618,561,567,569,633,675,585,584,674,584,623,584,581,623,624,580,679,623,624,671,580,582,673,662,544,519,624,583,580,629,570,567,599,595,617,568,571,628,595,594,626,596,625,598,627,596,598,597,599,619,598,597,622,631,628,529,625,629,630,630,633,597,633,632,599,599,632,631,628,629,625,638,634,562,563,640,639,637,638,543,634,636,521,540,639,635,521,636,640,644,649,471,474,648,647,468,646,648,475,473,647,464,467,645,467,466,644,464,643,642,642,646,468,589,657,652,655,656,592,656,654,586,593,657,655,582,651,653,585,653,652,650,651,582,586,654,650,613,641,425,641,541,662,609,663,662,600,664,663,641,661,658,658,659,491,659,660,482,439,443,667,488,665,666,682,439,670,492,666,668,444,442,668,443,444,669,555,676,673,672,671,606,606,671,679,674,672,610,560,675,674,559,673,675,679,580,676,664,678,555,677,679,676,678,677,555,488,682,681,660,680,440,680,682,488,681,462,504,461,578,429,426,496,415,411,490,413,430,429,537,646,642,469,463,465,473,415,484,411,508,509,455,448,418,421,419,418,423,457,458,431,431,448,432,539,538,432,526,457,538,494,495,413,428,519,426,423,449,430,527,614,426,460,461,449,437,438,434,433,436,434,466,463,475,437,642,438,435,645,434,438,643,435,494,423,495,426,415,493,430,537,495,486,482,441,415,411,487,614,539,496,460,414,459,445,416,459,416,420,458,449,422,460,448,420,418,450,422,418,501,498,507,457,424,458,412,446,459,458,447,459,427,528,461,526,579,457,446,427,460,484,421,490,443,493,444,487,483,444,503,504,463,489,428,493,439,489,443,471,649,470,648,646,472,647,648,470,472,436,470,470,433,471,474,465,468,437,436,469,649,644,475,512,511,456,513,512,453,476,506,478,476,478,417,485,491,486,485,413,491,659,489,660,442,483,486,658,428,659,441,440,492,477,497,506,506,500,507,464,667,467,411,413,483,490,419,494,496,432,484,500,420,501,497,450,500,445,414,498,422,450,499,414,422,502,416,445,501,510,513,451,467,669,466,466,668,503,666,665,503,670,667,462,661,519,658,615,541,613,454,509,451,499,497,481,511,508,452,502,499,479,498,502,480,477,417,511,509,505,510,480,479,510,479,481,513,512,481,511,417,505,508,427,446,516,518,447,517,528,427,637,446,412,514,517,424,635,515,412,518,577,545,578,602,616,524,612,608,522,536,545,537,553,650,587,581,591,583,608,602,520,628,571,629,564,533,530,565,530,535,573,547,574,547,548,564,547,538,548,526,538,573,612,522,615,527,519,542,545,565,546,616,614,542,576,565,577,553,550,554,553,552,550,584,593,581,651,650,554,652,653,550,653,651,551,546,535,615,542,611,524,546,615,537,604,557,600,524,605,520,548,539,616,561,523,575,561,575,525,525,574,532,523,534,576,566,532,530,566,530,534,621,627,618,563,540,574,521,575,562,521,563,575,543,577,528,540,579,573,562,576,543,531,533,608,605,611,560,605,560,601,623,581,624,542,544,611,611,607,559,655,657,588,656,590,654,655,588,656,549,552,588,550,549,589,580,583,586,553,587,552,584,652,593,632,572,631,633,569,632,627,626,596,594,529,596,603,604,609,541,522,609,663,664,607,603,601,604,600,556,664,662,663,544,557,610,556,556,606,678,620,617,626,621,620,627,675,673,585,520,601,522,535,531,612,533,548,602,525,532,621,532,566,620,561,618,523,534,619,566,523,622,534,525,621,561,630,567,633,674,675,584,672,674,623,671,624,679,672,623,671,676,580,673,661,662,519,630,629,567,619,599,617,631,568,628,622,597,619,618,598,622,595,631,529,598,625,630,598,630,597,597,633,599,595,599,631,529,628,625,543,638,562,540,563,639,528,637,543,562,634,521,579,540,635,563,521,640,434,644,471,473,474,647,474,468,648,649,475,647,643,464,645,645,467,644,462,464,642,462,642,468,550,589,652,591,655,592,592,656,586,591,593,655,585,582,653,584,585,652,580,650,582,580,586,650,495,613,425,661,641,662,541,609,662,609,600,663,425,641,658,425,658,491,491,659,482,670,439,667,492,488,666,681,682,670,442,492,668,669,444,668,667,443,669,559,555,673,610,672,606,677,606,679,558,674,610,558,560,674,560,559,675,555,677,676,665,488,681,482,660,440,440,680,488,665,681,504],"vertexPositions":[0.256901,-0.2943463,1.54399,0.2649523,-0.2981382,1.530338,0.05701541,-0.3209031,1.560751,0.2586514,-0.2899554,1.54628,0.06158691,-0.3216869,1.556559,0.07508563,-0.3530221,1.468713,0.2525255,-0.3215989,1.462753,0.2564111,-0.2916415,1.54295,0.05611664,-0.3270828,1.545103,0.2644625,-0.2954333,1.529298,0.05165255,-0.3266707,1.548277,0.2685971,-0.2937135,1.531823,0.05672526,-0.3291893,1.539338,0.05230122,-0.3289157,1.542133,0.2644625,-0.2980898,1.52239,0.2685973,-0.2965329,1.524491,0.06207668,-0.3243918,1.5576,0.269087,-0.2964183,1.532863,0.2591413,-0.2926603,1.54732,0.05750524,-0.323608,1.561791,0.05660641,-0.3297876,1.546143,0.2649523,-0.3007946,1.52343,0.05214238,-0.3293756,1.549317,0.269087,-0.2992378,1.525531,0.05721503,-0.3318941,1.540378,0.05279099,-0.3316206,1.543173,0.3564726,0.0201196,1.425532,0.3564726,0.02162837,1.429456,0.3588176,0.02024471,1.427018,0.3588175,0.02184605,1.431182,-0.2338034,-0.2944225,1.544013,-0.2418549,-0.2982167,1.530362,-0.03390812,-0.3209172,1.560755,-0.2355551,-0.290032,1.546303,-0.03847974,-0.3217024,1.556564,-0.05197697,-0.3530418,1.468719,-0.2294271,-0.3216736,1.462775,-0.2333146,-0.2917174,1.542973,-0.03300887,-0.3270966,1.545107,-0.241366,-0.2955117,1.529322,-0.02854466,-0.3266832,1.54828,-0.2455009,-0.2937932,1.531847,-0.03361737,-0.3292033,1.539343,-0.02919316,-0.3289284,1.542137,-0.2413659,-0.2981682,1.522413,-0.2455009,-0.2966126,1.524515,0.01155495,-0.3308325,1.556566,0.01155501,-0.3331798,1.550462,-0.03896862,-0.3244075,1.557604,-0.2459898,-0.2964982,1.532887,-0.2360439,-0.2927371,1.547343,-0.034397,-0.3236222,1.561795,-0.03349775,-0.3298016,1.546147,-0.2418547,-0.3008732,1.523453,-0.02903354,-0.3293882,1.549321,-0.2459897,-0.2993177,1.525555,-0.03410625,-0.3319083,1.540383,-0.02968204,-0.3316334,1.543177,0.01155543,-0.3335374,1.557606,0.01155549,-0.3358848,1.551502,-0.3334836,0.02001261,1.425564,-0.3334836,0.02152138,1.429488,-0.3358285,0.02013701,1.42705,-0.3358286,0.02173835,1.431215,0.183641,0.3679551,1.289221,0.4311228,0.001061975,1.564422,0.2003665,0.3736001,1.565754,0.3361575,0.2192534,1.575429,0.3323376,-0.165456,1.461388,0.1729064,0.2865952,1.150091,0.1494286,0.2394382,1.085435,0.3354539,0.1926727,1.312114,0.3771941,-0.01449418,1.30111,0.264467,0.1969974,1.151347,0.2151875,0.1792131,1.089345,0.3126987,-0.03589326,1.182739,0.3096075,-0.1045439,1.318861,0.3405179,-0.06959801,1.169099,0.00006021,0.4266485,1.271553,-0.1838579,0.3678759,1.289418,-0.0000844942,0.4439798,1.55279,-0.4311501,0.000923768,1.564404,-0.2005134,0.3735358,1.565746,-0.3362553,0.2191455,1.575415,-0.3323072,-0.1655625,1.461374,0.000246575,0.3527386,1.142835,-0.1645315,0.2936118,1.148929,-0.149443,0.2393434,1.085258,0.000330952,0.2795654,1.090664,-0.3354993,0.1926052,1.312006,-0.3772054,-0.01461517,1.301094,-0.2641881,0.1968752,1.151168,-0.2152681,0.178996,1.089112,-0.3126982,-0.03599357,1.182726,-0.3095908,-0.1046432,1.318848,-0.3405061,-0.06970721,1.169085,0.1292781,0.2840098,1.303311,0.2021837,-0.02336096,1.537875,0.1309261,0.2778697,1.560588,0.237285,0.161647,1.56973,0.2508111,-0.1449525,1.46745,0.1204292,0.223,1.190174,0.1015808,0.1878892,1.132314,0.2514744,0.1367042,1.316055,0.2909331,-0.0151031,1.301479,0.2321945,0.1364402,1.189321,0.1918776,0.1288917,1.127338,0.2522206,-0.01669162,1.169057,0.2396773,-0.1234272,1.314519,0.2547866,-0.05637532,1.167989,-0.000115405,0.3275249,1.290927,-0.1293516,0.2839766,1.303223,-0.0000656992,0.3277445,1.545515,-0.2022021,-0.02342581,1.537866,-0.1310421,0.2778276,1.560583,-0.2373641,0.1615708,1.56972,-0.2507876,-0.145033,1.467439,-0.000172072,0.280378,1.187633,-0.1137628,0.228661,1.190273,-0.1013117,0.1881229,1.132388,-0.00019633,0.2296645,1.136925,-0.2515482,0.1366072,1.316082,-0.2909442,-0.01519638,1.301467,-0.2323472,0.1363298,1.189411,-0.1919298,0.1288872,1.127421,-0.2522258,-0.01677256,1.169047,-0.2396543,-0.1235041,1.314509,-0.2547789,-0.05645704,1.167979,0.05490106,0.003298878,0.909771,0.02779716,0.06480157,0.9189566,0.02952045,-0.04569107,0.8942604,0.04758805,-0.02288037,0.9013026,0.04823738,0.03608077,0.9146738,0.3827958,-0.00492686,0.8244521,0.3827958,-0.007252514,0.7824785,0.3827958,-0.02847445,0.8147556,0.3827959,0.01745778,0.8131617,0.3827958,0.01629495,0.7921749,0.3827958,-0.02963727,0.7937689,0.04194778,0.1112459,0.8528787,0.08203798,0.08756685,0.8537988,0.08509349,0.004191577,0.8948393,0.07515829,-0.06747466,0.8543808,0.04199081,-0.08893108,0.8510628,0.1736841,-0.276628,1.240649,0.3245064,0.01392751,1.221376,0.05112695,-0.008127629,0.9543122,0.02636772,-0.05213272,0.9447857,0.01839435,0.04276478,0.9641637,0.0382573,0.02072751,0.957923,0.04631513,-0.03777283,0.948201,0.2448787,-0.0172038,0.9877118,0.1112771,-0.2073861,0.9235981,0.08800554,0.1627022,1.032915,0.1804878,0.1000132,1.022596,0.1925267,-0.1475697,0.9471224,0.1449994,0.2952502,1.279971,0.3072817,0.05715566,1.207337,0.2461462,-0.2238206,1.221777,0.1683197,-0.2853112,1.514718,0.2998093,-0.02323389,1.545364,0.1364123,0.268591,1.542786,0.2521631,0.1453961,1.547473,0.2600014,-0.2090029,1.524669,0.09238916,-0.2172882,1.608806,0.173373,-0.01618325,1.648929,0.09338253,0.180927,1.645482,0.1549606,0.1149098,1.659168,0.1575731,-0.1661508,1.628828,0.4396079,-0.002393364,0.8294661,0.4382455,-0.00838381,0.7826833,0.4382455,-0.0502519,0.8204999,0.4382455,0.04036641,0.8149053,0.4382455,0.03807234,0.7901449,0.4382455,-0.05254596,0.788245,0.5065115,-0.004694461,0.8168779,0.5013943,-0.007484972,0.7931381,0.5031716,-0.03294903,0.8106809,0.4973989,0.02216476,0.8096623,0.4944744,0.02076953,0.7962496,0.500316,-0.03434431,0.7972682,0.4105207,0.03229659,0.8171718,0.4105206,0.03040105,0.7875056,0.4073011,-0.05125254,0.8141312,0.4100885,-0.004728794,0.8324916,0.4105206,-0.007985293,0.7762498,0.4057926,-0.04562312,0.7859783,0.448207,-0.08292883,0.8031917,0.4465069,-0.07973659,0.7893932,0.4380625,-0.09076726,0.8036617,0.4369945,-0.08828365,0.7887094,0.4707086,0.02942097,0.7931973,0.4707086,-0.007934391,0.794489,0.4707086,0.03126561,0.8122837,0.4707086,-0.04160046,0.8137333,0.4707086,-0.004245102,0.8241751,0.4707086,-0.04344511,0.7946467,0.4215571,-0.06558632,0.7897587,0.4234358,-0.07319349,0.8124735,0.4385529,-0.06625998,0.8124193,0.4379487,-0.06147575,0.7888542,0.1349476,0.238088,1.156132,0.3011168,0.06262356,1.130723,0.3063216,0.02763164,1.11713,0.2414776,-0.2198404,1.126414,0.114027,0.2068761,1.093966,0.302649,0.01602452,1.078839,0.1655446,-0.2493476,1.057741,0.2922257,0.05015015,1.085149,0.2258957,-0.2102863,1.07886,0.2757048,0.1393581,1.289374,0.3299909,-0.02548414,1.275337,0.2674173,0.1299425,1.153903,0.2512853,0.1163818,1.085664,0.3155683,-0.03906345,1.130441,0.2951132,-0.03342705,1.060796,0.3676782,0.03882503,1.215733,0.3567208,0.06081414,1.204482,0.3597336,0.05982923,1.116633,0.3715034,0.03951001,1.116197,0.3402273,0.03610098,1.077885,0.3168203,0.05361473,1.082253,0.2741065,-0.2137796,1.274485,0.165986,-0.2879387,1.297948,0.2716398,-0.1768143,1.131198,0.1054403,-0.2933073,1.230189,0.2424109,-0.1844014,1.045084,0.09859788,-0.2916963,1.106509,0.1480396,-0.2624478,1.020148,0.1110138,-0.2798884,1.079316,0.177096,-0.2841496,1.225832,0.1720343,-0.281625,1.125585,0.1227674,-0.2990412,1.207835,0.111868,-0.298834,1.108043,0.2343118,-0.2287791,1.124697,0.1711876,-0.2591599,1.062903,0.1167641,-0.2868673,1.083606,0.2359772,-0.236001,1.200519,0.2283203,-0.2200224,1.088145,0.08643883,-0.282326,1.00202,0.08875286,-0.2823471,1.005972,0.2951613,0.03264707,0.7827809,0.2951613,0.03688579,0.8186627,0.2890571,-0.003434658,0.8426995,0.2890571,-0.005514383,0.7681877,0.2890571,-0.04351884,0.7908385,0.2890571,-0.03931981,0.825218,0.04439729,-0.02550786,0.921887,0.04597359,-0.001316547,0.928185,0.02564585,-0.04189831,0.9161114,0.02372914,0.04741489,0.9350528,0.04054892,0.02666103,0.9313666,0,-0.3379749,1.249369,-0.05490106,0.003298878,0.909771,0,0.1198856,0.8473116,0,-0.05764603,0.8915473,0,0.3436822,1.268005,-0.02779716,0.06480157,0.9189567,-0.02952045,-0.04569107,0.8942605,-0.04758805,-0.02288043,0.9013025,-0.04823738,0.03608077,0.9146738,-0.3827958,-0.00492686,0.8244521,-0.3827958,-0.007252573,0.7824785,-0.3827958,-0.02847445,0.8147557,-0.3827958,0.01745778,0.8131618,-0.3827958,0.01629495,0.7921749,-0.3827958,-0.02963727,0.7937689,-0.04194778,0.1112459,0.8528787,-0.08203804,0.08756685,0.8537988,-0.08509349,0.004191517,0.8948393,-0.07515829,-0.06747472,0.8543807,-0.04199081,-0.08893108,0.8510628,0,-0.09477561,0.8508488,0,0.07843083,0.9244951,-0.1736841,-0.276628,1.240649,-0.3245064,0.01392751,1.221376,0,0.06439721,0.9709151,0,-0.06691551,0.9422447,-0.05112695,-0.008127629,0.9543122,-0.02636772,-0.05213272,0.9447857,-0.01839435,0.04276478,0.9641637,-0.0382573,0.02072751,0.9579231,-0.04631513,-0.03777283,0.948201,0,0.2042644,1.044426,0,-0.2848506,0.9169887,-0.2448787,-0.0172038,0.9877119,-0.1112771,-0.2073861,0.9235981,-0.0880056,0.1627022,1.032915,-0.1804878,0.1000133,1.022596,-0.1925267,-0.1475697,0.9471224,-0.1449994,0.2952501,1.279971,-0.3072817,0.05715572,1.207337,-0.2461462,-0.2238206,1.221777,0,-0.3250803,1.505384,0,0.3136411,1.529375,-0.1683197,-0.2853112,1.514718,-0.2998093,-0.02323389,1.545364,-0.1364123,0.268591,1.542786,-0.2521631,0.1453961,1.547473,-0.2600014,-0.2090029,1.524669,0,-0.2259208,1.604203,0,0.191853,1.66864,-0.09238916,-0.2172882,1.608806,-0.173373,-0.01618319,1.648929,-0.09338253,0.180927,1.645482,-0.1549606,0.1149098,1.659168,-0.1575731,-0.1661508,1.628828,0,-0.02546072,1.698531,0,-0.1260252,1.671879,0,0.0837844,1.699336,-0.4396079,-0.002393364,0.829466,-0.4382455,-0.00838381,0.7826831,-0.4382455,-0.05025184,0.8204998,-0.4382455,0.04036647,0.8149053,-0.4382455,0.0380724,0.7901448,-0.4382455,-0.05254596,0.788245,-0.5065114,-0.004694461,0.8168779,-0.5013943,-0.007484972,0.7931382,-0.5031716,-0.03294903,0.810681,-0.4973989,0.02216476,0.8096622,-0.4944744,0.02076959,0.7962496,-0.500316,-0.03434425,0.7972683,-0.4105206,0.03229659,0.8171718,-0.4105206,0.03040105,0.7875056,-0.4073011,-0.05125254,0.8141312,-0.4100885,-0.004728794,0.8324915,-0.4105207,-0.007985293,0.7762498,-0.4057926,-0.04562318,0.7859783,-0.448207,-0.08292883,0.8031916,-0.4465069,-0.07973659,0.7893933,-0.4380625,-0.09076726,0.8036616,-0.4369944,-0.08828365,0.7887094,-0.4707086,0.02942097,0.7931972,-0.4707086,-0.007934391,0.7944891,-0.4707086,0.03126555,0.8122838,-0.4707085,-0.04160046,0.8137333,-0.4707086,-0.004245102,0.8241751,-0.4707085,-0.04344516,0.7946467,-0.4215571,-0.06558632,0.7897586,-0.4234358,-0.07319349,0.8124736,-0.4385528,-0.06625998,0.8124194,-0.4379487,-0.06147581,0.7888542,0,0.2993269,1.152143,-0.1278617,0.2438728,1.156251,-0.3011168,0.06262356,1.130723,-0.3063215,0.02763164,1.11713,-0.2414776,-0.2198404,1.126414,0,-0.3431732,1.104758,-0.1137677,0.2070471,1.093982,-0.302649,0.01602458,1.078839,-0.1655447,-0.2493476,1.057741,0,0.2529792,1.094212,-0.2922256,0.05015009,1.085148,-0.2258957,-0.2102863,1.07886,-0.2757047,0.1393581,1.289374,-0.3299909,-0.02548414,1.275337,-0.2674173,0.1299425,1.153903,-0.2512853,0.1163818,1.085664,-0.3155683,-0.03906339,1.130441,-0.2951131,-0.03342705,1.060796,-0.3676781,0.03882497,1.215733,-0.3567208,0.06081414,1.204481,-0.3597337,0.05982917,1.116632,-0.3715033,0.03951001,1.116197,-0.3402273,0.03610098,1.077885,-0.3168203,0.05361473,1.082253,-0.2741065,-0.2137796,1.274485,-0.165986,-0.2879387,1.297948,-0.2716398,-0.1768142,1.131198,-0.1054403,-0.2933072,1.230189,-0.2424109,-0.1844014,1.045084,-0.09859788,-0.2916963,1.106509,-0.1480396,-0.2624478,1.020148,-0.1110138,-0.2798884,1.079316,-0.177096,-0.2841496,1.225832,-0.1720343,-0.281625,1.125585,-0.1227674,-0.2990413,1.207835,-0.111868,-0.298834,1.108043,-0.2343118,-0.2287791,1.124697,-0.1711876,-0.2591598,1.062903,-0.1167642,-0.2868673,1.083606,-0.2359772,-0.236001,1.200519,-0.2283203,-0.2200224,1.088145,0,-0.3107419,0.979686,-0.08643883,-0.282326,1.00202,0,-0.318996,1.000601,-0.08875286,-0.2823471,1.005972,-0.2951613,0.03264707,0.782781,-0.2951613,0.03688579,0.8186627,-0.2890571,-0.003434658,0.8426996,-0.2890571,-0.005514383,0.7681877,-0.2890571,-0.04351884,0.7908385,-0.2890571,-0.03931981,0.825218,0,-0.339116,1.052233,0,-0.3428409,1.080266,-0.04439729,-0.02550786,0.921887,0,0.06469333,0.9398636,-0.04597359,-0.001316547,0.928185,0,-0.05239754,0.9118794,-0.02564585,-0.04189831,0.9161114,-0.02372914,0.04741489,0.9350528,-0.04054892,0.02666103,0.9313666,0,-0.3148689,0.9901433,0.08759588,-0.2823366,1.003996,-0.08759588,-0.2823366,1.003996,0.05033159,-0.2929607,0.990853,0.05222594,-0.2969773,1.003286,0.05127876,-0.294969,0.9970696,-0.05033159,-0.2929608,0.990853,-0.05222594,-0.2969773,1.003286,-0.05127876,-0.294969,0.9970695,0.1993092,-0.000545017,0.4799289,0.05920463,0.002874135,0.9131253,0.1540455,-0.1118504,0.4746489,0.1153402,-0.06002223,0.8536506,0.169965,0.1113895,0.480646,0.1157588,0.07373541,0.8440227,0.254642,0.03813701,0.7787564,0.1553087,-0.000163411,0.7415295,0.1958267,-0.000228365,0.6057669,0.1385455,0.05825215,0.7709159,0.1691274,0.1053938,0.6102687,0.1302352,-0.06164252,0.790529,0.1549888,-0.1281458,0.6074062,0.03028702,0.0679962,0.9221059,0.05089861,-0.1366957,0.4688317,0.03700834,0.1524003,0.4708474,0.03167909,-0.04977858,0.8970156,0.006348669,0.003297746,0.4564626,0.06135737,-0.1533855,0.740528,0.07501012,-0.1631491,0.612089,0.07548272,0.1268727,0.7412114,0.08368545,0.1449681,0.6069644,0.1008977,-0.000418158,-0.005663573,0.1162708,0.03691333,-0.005508542,0.09338134,0.06299197,-0.005263805,0.04560101,-0.002646625,-0.005663573,0.02178114,0.02365285,-0.005495965,0.04962134,0.05379372,-0.005219161,0.005037963,-0.005321145,0.2735891,0.05346381,-0.09005022,0.2763385,0.1359062,-0.09050256,0.2746584,0.1739405,0.003006815,0.2741037,0.0368511,0.08668297,0.2776261,0.123422,0.07991433,0.2745804,0.1176441,0.001687765,0.8874287,0.05119895,-0.0258125,0.9041944,0.05180037,0.03790348,0.9179306,0.1341766,0.09653311,0.7416208,0.1188126,-0.1183996,0.7419414,0.1543206,-0.002658069,0.7500548,0.383807,-0.004750728,0.829929,0.3836025,-0.007706522,0.7770491,0.3837603,-0.03311771,0.8180093,0.3840982,0.02252918,0.815992,0.3840182,0.02081656,0.7886551,0.3836616,-0.03481274,0.7909587,0.04388451,0.1156057,0.8549636,0.08511078,0.0909093,0.8565711,0.08799487,0.003879725,0.8996034,0.07743418,-0.07074511,0.8576586,0.04345041,-0.09275317,0.8541129,0.01611298,0.02550649,0.06243056,0.0954976,-0.02471232,0.06399035,0.04710203,0.05842757,0.06207543,0.0408833,-0.02698153,0.06463462,0.1321753,0.02683091,0.06174558,0.09712249,0.0606566,0.06201672,0.01852691,-0.03801649,0.02002125,0.01989543,-0.02632933,-0.005145668,0.08938425,-0.06457257,-0.005611658,0.1123918,-0.02647304,-0.005328953,0.04331779,-0.06718736,-0.005595207,0.09583669,-0.08643215,0.02009457,0.04397201,-0.08903801,0.02024501,0.1202461,-0.03697931,0.01955389,0.2472852,0.03910529,0.7781764,0.2466754,-0.005015432,0.7626914,0.2475073,0.04508262,0.8214595,0.2468696,-0.04256975,0.8294894,0.2472024,-0.002633035,0.8498989,0.2466067,-0.04802155,0.7894349,0.0556069,-0.09792071,0.3169467,0.1939255,0.000374051,0.4383839,0.1699702,0.1105991,0.4971117,0.1526515,-0.1087641,0.4330779,0.1410507,-0.09687399,0.3041339,0.1664528,0.1097381,0.4548573,0.05214416,-0.07308304,0.2324197,0.01034593,0.007117748,0.4292458,0.1981647,-0.000539344,0.5054316,0.06214994,-0.1173298,0.4195418,0.1320328,-0.08439642,0.2445449,0.04232275,0.1449648,0.4468469,0.1542484,-0.1123737,0.51426,0.07040435,-0.1483411,0.5200844,0.06976336,0.1493613,0.4945516,0.1530553,-0.002457141,0.7494187,0.1380453,0.001154601,0.8811827,0.1447955,-0.05890977,0.7880096,0.143778,0.05573868,0.7688136,0.1411811,0.06608504,0.838904,0.1399573,-0.05620896,0.8476218,0.09685498,-0.02800178,0.07233315,0.04238945,-0.03089159,0.07283949,0.2547104,0.04383993,0.8212887,0.2404243,0.04020887,0.7775675,0.2395964,0.04648977,0.8227975,0.2958557,0.03726315,0.7792131,0.2959278,0.04218596,0.8213308,0.2896179,-0.003225088,0.8483183,0.289421,-0.005982935,0.762669,0.2894028,-0.04887074,0.7881853,0.2895146,-0.04397994,0.8285197,0.04924124,-0.02795821,0.9217517,0.05118161,-0.001145064,0.9289451,0.02861607,-0.04622447,0.9066644,0.02731764,0.05048924,0.937237,0.04507124,0.02858656,0.9332035,5.39623e-7,0.002049028,0.4647502,-0.1993092,-0.000545018,0.4799289,-0.05920463,0.002874135,0.9131253,-0.1540456,-0.1118504,0.4746488,-0.1153402,-0.06002223,0.8536506,-0.169965,0.1113895,0.480646,-0.1157588,0.07373541,0.8440227,0,0.1248254,0.8491239,0,0.1566264,0.4821705,0,-0.06224113,0.8944298,-0.254642,0.03813701,0.7787564,-0.1553087,-0.000163411,0.7415295,-0.1958267,-0.000228365,0.6057669,-0.1385455,0.05825215,0.7709159,-0.1691274,0.1053938,0.6102687,-0.1302352,-0.06164252,0.790529,-0.1549888,-0.1281458,0.6074062,0,-0.1658165,0.7418517,0,-0.1761233,0.6093782,0,0.1466161,0.7411473,0,0.1663522,0.6053959,-0.03028702,0.0679962,0.9221059,-0.05089861,-0.1366957,0.4688318,-0.03700852,0.1523995,0.4708477,-0.03167909,-0.04977858,0.8970156,-0.006319344,0.003237068,0.4564646,-0.06135737,-0.1533855,0.740528,-0.07501012,-0.1631491,0.612089,-0.07548272,0.1268727,0.7412114,-0.08368545,0.1449681,0.6069644,-0.1008977,-0.000418158,-0.005663573,-0.1162708,0.03691333,-0.005508542,-0.09338134,0.06299197,-0.005263805,-0.04560101,-0.002646625,-0.005663573,-0.02178114,0.02365285,-0.005495965,-0.04962134,0.05379372,-0.005219161,-0.005038022,-0.005321145,0.2735889,-0.0534628,-0.09004926,0.2763358,-0.1359062,-0.09050256,0.2746584,-0.1739405,0.003006815,0.2741037,-0.0368514,0.08668303,0.2776259,-0.123422,0.07991433,0.2745804,-0.1176441,0.001687765,0.8874287,-0.05119895,-0.0258125,0.9041944,-0.05180037,0.03790348,0.9179306,-0.1341766,0.09653311,0.7416208,-0.1188126,-0.1183996,0.7419414,-0.1543206,-0.002658069,0.7500548,-0.383807,-0.004750728,0.829929,-0.3836025,-0.007706522,0.7770491,-0.3837603,-0.03311771,0.8180093,-0.3840982,0.02252918,0.815992,-0.3840182,0.02081656,0.7886551,-0.3836616,-0.03481274,0.7909587,-0.04388451,0.1156057,0.8549636,-0.08511078,0.0909093,0.8565711,-0.08799487,0.003879725,0.8996034,-0.07743418,-0.07074511,0.8576586,-0.04345041,-0.09275317,0.8541129,0,-0.0988484,0.853918,0,0.08269196,0.9279879,-0.0161128,0.02550655,0.06243056,-0.0954976,-0.02471232,0.06399035,-0.04710203,0.05842757,0.06207543,-0.0408833,-0.02698153,0.06463462,-0.1321753,0.02683091,0.06174558,-0.09712249,0.0606566,0.06201672,-0.01852691,-0.03801649,0.02002125,-0.01989543,-0.02632933,-0.005145668,-0.08938425,-0.06457257,-0.005611658,-0.1123918,-0.02647304,-0.005328953,-0.04331779,-0.06718736,-0.005595207,-0.09583669,-0.08643215,0.02009457,-0.04397201,-0.08903801,0.02024501,-0.1202461,-0.03697931,0.01955389,-0.2472852,0.03910529,0.7781764,-0.2466754,-0.005015432,0.7626914,-0.2475073,0.04508262,0.8214595,-0.2468696,-0.04256975,0.8294894,-0.2472024,-0.002633035,0.8498989,-0.2466067,-0.04802155,0.7894349,-0.055606,-0.09792095,0.316945,-0.1939255,0.00037405,0.4383839,-0.1699702,0.1105991,0.4971117,-0.1526515,-0.1087641,0.4330779,-0.1410507,-0.09687399,0.3041338,-0.1664528,0.1097381,0.4548573,-0.05214452,-0.07308292,0.2324193,-0.01032978,0.007099092,0.429287,-0.1981647,-0.000539344,0.5054316,-0.06215012,-0.1173298,0.4195417,-0.1320328,-0.08439642,0.2445449,-0.04232329,0.1449646,0.4468463,-0.1542484,-0.1123737,0.51426,0,-0.1597059,0.5151832,0,0.162978,0.4994308,-0.07040435,-0.1483411,0.5200844,-0.06976336,0.1493613,0.4945516,-0.1530553,-0.002457141,0.7494187,-0.1380453,0.001154601,0.8811827,-0.1447955,-0.05890977,0.7880096,-0.143778,0.05573868,0.7688136,-0.1411811,0.06608504,0.838904,-0.1399573,-0.05620896,0.8476218,-0.09685498,-0.02800178,0.07233315,-0.04238986,-0.03089153,0.0728392,-0.2547104,0.04383993,0.8212887,-0.2404243,0.04020887,0.7775675,-0.2395964,0.04648977,0.8227975,-0.2958557,0.03726315,0.7792131,-0.2959278,0.04218596,0.8213308,-0.2896179,-0.003225088,0.8483183,-0.289421,-0.005982935,0.762669,-0.2894028,-0.04887074,0.7881853,-0.2895146,-0.04397994,0.8285197,-0.04924124,-0.02795821,0.9217517,0,0.07045674,0.9433373,-0.05118161,-0.001145064,0.9289451,0,-0.05816149,0.8938948,-0.02861607,-0.04622447,0.9066644,-0.02731764,0.05048924,0.937237,-0.04507124,0.02858656,0.9332035,0,-0.1419612,0.4722249,0.02096003,0.02417194,0.01218688,0.04914158,0.05487149,0.01229947,0.1194742,0.03490519,0.01173329,0.09422522,0.06241786,0.0123887,0.01904648,-0.03210473,0.00844562,0.09236371,-0.07385915,0.005957961,0.04368877,-0.0766229,0.006205022,0.1164875,-0.03149294,0.007475674,-0.02096003,0.02417194,0.01218688,-0.04914158,0.05487149,0.01229947,-0.1194742,0.03490519,0.01173329,-0.09422522,0.06241786,0.0123887,-0.01904648,-0.03210473,0.00844562,-0.09236371,-0.07385915,0.005957961,-0.04368877,-0.0766229,0.006205022,-0.1164875,-0.03149294,0.007475674,0.02219831,-0.06912732,0.4599183,0.02745294,-0.06533998,0.4297375,0.02559971,-0.05924403,0.3028926,3.4518e-7,-0.07163119,0.4661535,-0.02219831,-0.06912904,0.4599193,-0.02745205,-0.06534212,0.4297398,-0.02559989,-0.0592451,0.3028936,0.04725933,-0.0519939,0.1528054,0.1144486,-0.05626499,0.1584801,0.0420798,0.07253342,0.1699631,0.1527451,0.01479578,0.1674815,0.1101695,0.07033008,0.1683646,0.01066994,0.009570598,0.1677186,-0.04725998,-0.05199384,0.152805,-0.1144486,-0.05626499,0.1584801,-0.0420798,0.07253342,0.1699631,-0.1527451,0.01479578,0.1674815,-0.1101695,0.07033008,0.1683646,-0.01067,0.009570777,0.1677184,-0.0273925,-0.03756439,0.2541965,-0.02778446,-0.04525136,0.2746637,-0.02243399,-0.01021206,0.163358,0.02836173,-0.04627037,0.2747147,0.02266573,-0.01060223,0.1632613,0.02804219,-0.03849065,0.2536101],"vertexUVIndices":[1164,1165,1166,1167,1168,1169,1170,1171,1172,1173,1174,1175,1176,1177,1178,1179,1180,1181,1182,1183,1184,1185,1186,1187,1188,1189,1190,1191,1192,1193,1194,1195,1196,1197,1198,1199,1200,1201,1202,1203,1204,1205,1206,1207,1208,1209,1210,1211,1212,1213,1214,1215,1216,1217,1218,1219,1220,1221,1222,1223,1224,1225,1226,1227,1228,1229,1230,1231,1232,1233,1234,1235,1236,1237,1238,1239,1240,1241,1242,1243,1244,1245,1246,1247,1248,1249,1250,1251,1252,1253,1254,1255,1256,1257,1258,1259,1260,1261,1262,1263,1264,1265,1266,1267,1268,1269,1270,1271,1272,1273,1274,1275,1276,1277,1278,1279,1280,1281,1282,1283,1284,1285,1286,1287,1288,1289,1290,1291,1292,1293,1294,1295,1296,1297,1298,1299,1300,1301,1302,1303,1304,1305,1306,1307,1308,1309,1310,1311,1312,1313,1314,1315,1316,1317,1318,1319,1320,1321,1322,1323,1324,1325,1326,1327,1328,1329,1330,1331,1332,1333,1334,1335,1336,1337,1338,1339,1340,1341,1342,1343,1344,1345,1346,1347,1348,1349,1350,1351,1352,1353,1354,1355,1356,1357,1358,1359,1360,1361,1362,1363,1364,1365,1366,1367,1368,1369,1370,1371,1372,1373,1374,1375,1376,1377,1378,1379,1380,1381,1382,1383,1384,1385,1386,1387,1388,1389,1390,1391,1392,1393,1394,1395,1396,1397,1398,1399,1400,1401,1402,1403,1404,1405,1406,1407,1408,1409,1410,1411,1412,1413,1414,1415,1416,1417,1418,1419,1420,1421,1422,1423,1424,1425,1426,1427,1428,1429,1430,1431,1432,1433,1434,1435,1436,1437,1438,1439,1440,1441,1442,1443,1444,1445,1446,1447,1448,1449,1450,1451,1452,1453,1454,1455,1456,1457,1458,1459,1460,1461,1462,1463,1464,1465,1466,1467,1468,1469,1470,1471,1472,1473,1474,1475,1476,1477,1478,1479,1480,1481,1482,1483,1484,1485,1486,1487,1488,1489,1490,1491,1492,1493,1494,1495,1496,1497,1498,1499,1500,1501,1502,1503,1504,1505,1506,1507,1508,1509,1510,1511,1512,1513,1514,1515,1516,1517,1518,1519,1520,1521,1522,1523,1524,1525,1526,1527,1528,1529,1530,1531,1532,1533,1534,1535,1536,1537,1538,1539,1540,1541,1542,1543,1544,1545,1546,1547,1548,1549,1550,1551,1552,1553,1554,1555,1556,1557,1558,1559,1560,1561,1562,1563,1564,1565,1566,1567,1568,1569,1570,1571,1572,1573,1574,1575,1576,1577,1578,1579,1580,1581,1582,1583,1584,1585,1586,1587,1588,1589,1590,1591,1592,1593,1594,1595,1596,1597,1598,1599,1600,1601,1602,1603,1604,1605,1606,1607,1608,1609,1610,1611,1612,1613,1614,1615,1616,1617,1618,1619,1620,1621,1622,1623,1624,1625,1626,1627,1628,1629,1630,1631,1632,1633,1634,1635,1636,1637,1638,1639,1640,1641,1642,1643,1644,1645,1646,1647,1648,1649,1650,1651,1652,1653,1654,1655,1656,1657,1658,1659,1660,1661,1662,1663,1664,1665,1666,1667,1668,1669,1670,1671,1672,1673,1674,1675,1676,1677,1678,1679,1680,1681,1682,1683,1684,1685,1686,1687,1688,1689,1690,1691,1692,1693,1694,1695,1696,1697,1698,1699,1700,1701,1702,1703,1704,1705,1706,1707,1708,1709,1710,1711,1712,1713,1714,1715,1716,1717,1718,1719,1720,1721,1722,1723,1724,1725,1726,1727,1728,1729,1730,1731,1732,1733,1734,1735,1736,1737,1738,1739,1740,1741,1742,1743,1744,1745,1746,1747,1748,1749,1750,1751,1752,1753,1754,1755,1756,1757,1758,1759,1760,1761,1762,1763,1764,1765,1766,1767,1768,1769,1770,1771,1772,1773,1774,1775,1776,1777,1778,1779,1780,1781,1782,1783,1784,1785,1786,1787,1788,1789,1790,1791,1792,1793,1794,1795,1796,1797,1798,1799,1800,1801,1802,1803,1804,1805,1806,1807,1808,1809,1810,1811,1812,1813,1814,1815,1816,1817,1818,1819,1820,1821,1822,1823,1824,1825,1826,1827,1828,1829,1830,1831,1832,1833,1834,1835,1836,1837,1838,1839,1840,1841,1842,1843,1844,1845,1846,1847,1848,1849,1850,1851,1852,1853,1854,1855,1856,1857,1858,1859,1860,1861,1862,1863,1864,1865,1866,1867,1868,1869,1870,1871,1872,1873,1874,1875,1876,1877,1878,1879,1880,1881,1882,1883,1884,1885,1886,1887,1888,1889,1890,1891,1892,1893,1894,1895,1896,1897,1898,1899,1900,1901,1902,1903,1904,1905,1906,1907,1908,1909,1910,1911,1912,1913,1914,1915,1916,1917,1918,1919,1920,1921,1922,1923,1924,1925,1926,1927,1928,1929,1930,1931,1932,1933,1934,1935,1936,1937,1938,1939,1940,1941,1942,1943,1944,1945,1946,1947,1948,1949,1950,1951,1952,1953,1954,1955,1956,1957,1958,1959,1960,1961,1962,1963,1964,1965,1966,1967,1968,1969,1970,1971,1972,1973,1974,1975,1976,1977,1978,1979,3138,3139,3140,3141,3142,3143,3144,3145,3146,3147,3148,3149,3150,3151,3152,3153,3154,3155,3156,3157,3158,3159,3160,3161,3162,3163,3164,3165,3166,3167,3168,3169,3170,3171,3172,3173,3174,3175,3176,3177,3178,3179,3180,3181,3182,3183,3184,3185,3186,3187,3188,3189,3190,3191,3192,3193,3194,3195,3196,3197,3198,3199,3200,3201,3202,3203,3204,3205,3206,3207,3208,3209,3210,3211,3212,3213,3214,3215,3216,3217,3218,3219,3220,3221,3222,3223,3224,3225,3226,3227,3228,3229,3230,3231,3232,3233,3234,3235,3236,3237,3238,3239,3240,3241,3242,3243,3244,3245,3246,3247,3248,3249,3250,3251,3252,3253,3254,3255,3256,3257,3258,3259,3260,3261,3262,3263,3264,3265,3266,3267,3268,3269,3270,3271,3272,3273,3274,3275,3276,3277,3278,3279,3280,3281,3282,3283,3284,3285,3286,3287,3288,3289,3290,3291,3292,3293,3294,3295,3296,3297,3298,3299,3300,3301,3302,3303,3304,3305,3306,3307,3308,3309,3310,3311,3312,3313,3314,3315,3316,3317,3318,3319,3320,3321,3322,3323,3324,3325,3326,3327,3328,3329,3330,3331,3332,3333,3334,3335,3336,3337,3338,3339,3340,3341,3342,3343,3344,3345,3346,3347,3348,3349,3350,3351,3352,3353,3354,3355,3356,3357,3358,3359,3360,3361,3362,3363,3364,3365,3366,3367,3368,3369,3370,3371,3372,3373,3374,3375,3376,3377,3378,3379,3380,3381,3382,3383,3384,3385,3386,3387,3388,3389,3390,3391,3392,3393,3394,3395,3396,3397,3398,3399,3400,3401,3402,3403,3404,3405,3406,3407,3408,3409,3410,3411,3412,3413,3414,3415,3416,3417,3418,3419,3420,3421,3422,3423,3424,3425,3426,3427,3428,3429,3430,3431,3432,3433,3434,3435,3436,3437,3438,3439,3440,3441,3442,3443,3444,3445,3446,3447,3448,3449,3450,3451,3452,3453,3454,3455,3456,3457,3458,3459,3460,3461,3462,3463,3464,3465,3466,3467,3468,3469,3470,3471,3472,3473,3474,3475,3476,3477,3478,3479,3480,3481,3482,3483,3484,3485,3486,3487,3488,3489,3490,3491,3492,3493,3494,3495,3496,3497,3498,3499,3500,3501,3502,3503,3504,3505,3506,3507,3508,3509,3510,3511,3512,3513,3514,3515,3516,3517,3518,3519,3520,3521,3522,3523,3524,3525,3526,3527,3528,3529,3530,3531,3532,3533,3534,3535,3536,3537,3538,3539,3540,3541,3542,3543,3544,3545,3546,3547,3548,3549,3550,3551,3552,3553,3554,3555,3556,3557,3558,3559,3560,3561,3562,3563,3564,3565,3566,3567,3568,3569,3570,3571,3572,3573,3574,3575,3576,3577,3578,3579,3580,3581,3582,3583,3584,3585,3586,3587,3588,3589,3590,3591,3592,3593,3594,3595,3596,3597,3598,3599,3600,3601,3602,3603,3604,3605,3606,3607,3608,3609,3610,3611,3612,3613,3614,3615,3616,3617,3618,3619,3620,3621,3622,3623,3624,3625,3626,3627,3628,3629,3630,3631,3632,3633,3634,3635,3636,3637,3638,3639,3640,3641,3642,3643,3644,3645,3646,3647,3648,3649,3650,3651,3652,3653,3654,3655,3656,3657,3658,3659,3660,3661,3662,3663,3664,3665,3666,3667,3668,3669,3670,3671,3672,3673,3674,3675,3676,3677,3678,3679,3680,3681,3682,3683,3684,3685,3686,3687,3688,3689,3690,3691,3692,3693,3694,3695,3696,3697,3698,3699,3700,3701,3702,3703,3704,3705,3706,3707,3708,3709,3710,3711,3712,3713,3714,3715,3716,3717,3718,3719,3720,3721,3722,3723,3724,3725,3726,3727,3728,3729,3730,3731,3732,3733,3734,3735,3736,3737,3738,3739,3740,3741,3742,3743,3744,3745,3746,3747,3748,3749,3750,3751,3752,3753,3754,3755,3756,3757,3758,3759,3760,3761,3762,3763,3764,3765,3766,3767,3768,3769,3770,3771,3772,3773,3774,3775,3776,3777,3778,3779,3780,3781,3782,3783,3784,3785,3786,3787,3788,3789,3790,3791,3792,3793,3794,3795,3796,3797,3798,3799,3800,3801,3802,3803,3804,3805,3806,3807,3808,3809,3810,3811,3812,3813,3814,3815,3816,3817,3818,3819,3820,3821,3822,3823,3824,3825,3826,3827,3828,3829,3830,3831,3832,3833,3834,3835,3836,3837,3838,3839,3840,3841,3842,3843,3844,3845,3846,3847,3848,3849,3850,3851,3852,3853,3854,3855,3856,3857,3858,3859,3860,3861,3862,3863,3864,3865,3866,3867,3868,3869,3870,3871,3872,3873,3874,3875,3876,3877,3878,3879,3880,3881,3882,3883,3884,3885,3886,3887],"vertexUVs":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.3898947,0.9069001,0.3898947,0.8391237,0.4195565,0.8382653,0.7154975,0.2649434,0.6638709,0.2677386,0.663337,0.259531,0.5312274,0.3911225,0.4925779,0.390421,0.4925779,0.3787322,0.4195565,0.8382653,0.3898947,0.8391237,0.3898947,0.7740816,0.1515395,0.247741,0.1443853,0.217581,0.2021906,0.2417916,0.1763298,0.2888354,0.1972031,0.2897296,0.1933951,0.3171076,0.6638709,0.2677386,0.6126909,0.2692595,0.6126016,0.2625138,0.5861846,0.8029832,0.5455099,0.8175541,0.5411085,0.8085427,0.6255185,0.7224949,0.6251435,0.6541871,0.6744373,0.6541871,0.5077765,0.8374067,0.4465662,0.8408409,0.4603677,0.7740816,0.70972,0.7781699,0.6782817,0.7183521,0.7142565,0.715941,0.6782817,0.7183521,0.6744373,0.6541871,0.7165492,0.6541871,0.7560009,0.7144216,0.7142565,0.715941,0.7165492,0.6541871,0.7341732,0.7722997,0.7142565,0.715941,0.7560009,0.7144216,0.4245957,0.3861595,0.4093036,0.3727298,0.4925779,0.3787322,0.7554032,0.1746022,0.7554032,0.2544687,0.7317804,0.249468,0.4465662,0.8408409,0.4195565,0.8382653,0.4244588,0.7740816,0.7554032,0.2643745,0.7154975,0.2649434,0.7317804,0.249468,0.4174393,0.9081685,0.4195565,0.8382653,0.4465662,0.8408409,0.2034792,0.8032879,0.1752728,0.8088124,0.1612775,0.7925573,0.2085604,0.7663637,0.221722,0.7837696,0.1612775,0.7925573,0.1710333,0.3095125,0.1933951,0.3171076,0.1747262,0.3335458,0.1515395,0.247741,0.1178574,0.2657791,0.09175044,0.2440744,0.1015679,0.3068196,0.1162937,0.3409836,0.08220529,0.3664804,0.1178574,0.2657791,0.1015679,0.3068196,0.06269156,0.3095215,0.4899051,0.466022,0.4354322,0.466022,0.4245957,0.3861595,0.663337,0.259531,0.6626453,0.2509718,0.73048,0.2326613,0.3896697,0.466022,0.3896697,0.3823192,0.4245957,0.3861595,0.4289026,0.2634516,0.4308055,0.250651,0.4925779,0.250651,0.6126016,0.2625138,0.612924,0.2556973,0.6626453,0.2509718,0.7554032,0.3408262,0.710608,0.3408262,0.7154975,0.2649434,0.466657,0.9184214,0.4702548,0.9626304,0.4517678,0.9665372,0.6890416,0.7773949,0.70972,0.7781699,0.699248,0.8220569,0.6583754,0.7406436,0.6782817,0.7183521,0.70972,0.7781699,0.4812456,0.8745813,0.466657,0.9184214,0.4414273,0.9160478,0.6583754,0.7406436,0.6248249,0.7287762,0.6255185,0.7224949,0.4812456,0.8745813,0.4465662,0.8408409,0.5077765,0.8374067,0.6730496,0.8166739,0.6158137,0.8181152,0.6143739,0.7927137,0.7400818,0.8106898,0.7243739,0.8183093,0.70972,0.7781699,0.426943,0.9580217,0.4414273,0.9160478,0.4517678,0.9665372,0.7243739,0.8183093,0.7133805,0.8296629,0.699248,0.8220569,0.3898947,0.9401556,0.3898947,0.9069001,0.4174393,0.9081685,0.7560029,0.8093569,0.7400818,0.8106898,0.7341732,0.7722997,0.4127064,0.9458165,0.4174393,0.9081685,0.4414273,0.9160478,0.6642225,0.3408262,0.6139325,0.3408262,0.6126909,0.2692595,0.73048,0.2326613,0.6626453,0.2509718,0.6716532,0.1499097,0.612924,0.2556973,0.617796,0.1469113,0.6716532,0.1499097,0.434772,0.1397843,0.4342169,0.1291916,0.4925779,0.1304615,0.7481063,0.1727968,0.7317804,0.249468,0.73048,0.2326613,0.7411954,0.1688057,0.73048,0.2326613,0.7078272,0.1412119,0.1775629,0.3507942,0.212006,0.3263753,0.2306169,0.335643,0.1941101,0.2557996,0.2021906,0.2417916,0.2330623,0.2831677,0.2151328,0.2864487,0.2330623,0.2831677,0.2306169,0.335643,0.2085604,0.7663637,0.1691661,0.7674893,0.1792144,0.7244597,0.1691661,0.7674893,0.1612775,0.7925573,0.1637455,0.7494388,0.1763298,0.2888354,0.1586939,0.2779012,0.1860295,0.2698075,0.2085604,0.7663637,0.2089902,0.7232213,0.2238611,0.7501429,0.1162937,0.3409836,0.1503822,0.3154869,0.1747262,0.3335458,0.6123518,0.8706514,0.7037112,0.8891387,0.7037112,0.9125381,0.6111499,0.9006716,0.7037112,0.9125381,0.7037112,0.9338966,0.6039715,0.7749686,0.6143739,0.7927137,0.6099997,0.7939627,0.5346433,0.250651,0.4925779,0.250651,0.4925779,0.2450883,0.6099997,0.7939627,0.6060187,0.7954526,0.5971263,0.7787808,0.4164827,0.3534185,0.4289026,0.2634516,0.4925779,0.2647921,0.4925779,0.3787322,0.4093036,0.3727298,0.4164827,0.3534185,0.4106577,0.347333,0.4203482,0.2496856,0.4246255,0.2565684,0.5340258,0.3591368,0.4925779,0.3573899,0.4925779,0.2647921,0.4246255,0.2565684,0.4203482,0.2496856,0.4254037,0.2501524,0.4029131,0.3481734,0.4106577,0.347333,0.4135702,0.3503757,0.4308055,0.250651,0.4323326,0.2445412,0.4925779,0.2450883,0.5346433,0.250651,0.4925779,0.2647921,0.4925779,0.250651,0.4254037,0.2501524,0.4203482,0.2496856,0.4262131,0.2471681,0.6230134,0.7310217,0.6529309,0.7448169,0.6039715,0.7749686,0.6529309,0.7448169,0.67215,0.7797353,0.6143739,0.7927137,0.6992785,0.07711571,0.667166,0.0814647,0.662679,0.01301968,0.5878009,0.7606213,0.6007382,0.7767702,0.5971263,0.7787808,0.4925779,0.3787322,0.4925779,0.3573899,0.5340258,0.3591368,0.5316801,0.466022,0.4899051,0.466022,0.4925779,0.390421,0.710608,0.3408262,0.6642225,0.3408262,0.6638709,0.2677386,0.6583754,0.7406436,0.6890416,0.7773949,0.67215,0.7797353,0.6248249,0.7287762,0.6583754,0.7406436,0.6529309,0.7448169,0.466657,0.9184214,0.4981029,0.9241486,0.4980311,0.9617646,0.5078161,0.848973,0.5142984,0.8553238,0.5029777,0.8891813,0.4812456,0.8745813,0.5029777,0.8891813,0.4981029,0.9241486,0.6838681,0.8183333,0.6730496,0.8166739,0.67215,0.7797353,0.6117507,0.9306917,0.7037112,0.9338966,0.7037112,0.9609296,0.667166,0.0814647,0.6168364,0.07996547,0.6158769,0.01301968,0.5292648,0.1899057,0.4925779,0.1931164,0.4925779,0.1411445,0.5238863,0.1291604,0.4925779,0.1411445,0.4925779,0.1304615,0.4264236,0.1901286,0.4231663,0.1891994,0.4259845,0.1287134,0.4335523,0.1921626,0.434772,0.1397843,0.4925779,0.1411445,0.6992785,0.07711571,0.6907299,0.01301968,0.7052477,0.01301968,0.3896697,0.3448249,0.4029131,0.3481734,0.4061083,0.3604516,0.3700357,0.3727298,0.3896697,0.3723613,0.3896697,0.3823192,0.434772,0.1397843,0.4259845,0.1287134,0.4342169,0.1291916,0.5861846,0.8029832,0.5950799,0.8230206,0.5480604,0.8291721,0.5142984,0.8553238,0.5730999,0.8585122,0.5743605,0.891974,0.5790019,0.788309,0.5411085,0.8085427,0.5334705,0.7988731,0.5878009,0.7606213,0.6039715,0.7749686,0.6007382,0.7767702,0.6099997,0.7939627,0.6158137,0.8181152,0.6060187,0.7954526,0.6143739,0.7927137,0.6158137,0.8181152,0.6099997,0.7939627,0.5029777,0.8891813,0.5743605,0.891974,0.5756209,0.9254359,0.4981029,0.9241486,0.5756209,0.9254359,0.5768814,0.9588977,0.5971263,0.7787808,0.5790019,0.788309,0.5702447,0.7714349,0.6060187,0.7954526,0.6158137,0.8181152,0.5950799,0.8230206,0.5756209,0.9254359,0.6117507,0.9306917,0.6129528,0.960712,0.5743605,0.891974,0.6111499,0.9006716,0.6117507,0.9306917,0.5743605,0.891974,0.5730999,0.8585122,0.6123518,0.8706514,0.6060187,0.7954526,0.5861846,0.8029832,0.5790019,0.788309,0.1630647,0.6622682,0.1648229,0.6728395,0.1570491,0.6728395,0.1770499,0.6622682,0.1853662,0.6622682,0.1869244,0.6728395,0.1559473,0.6622682,0.1570491,0.6728395,0.1480393,0.6728395,0.1696411,0.6622682,0.1720111,0.6728395,0.1648229,0.6728395,0.1853662,0.6622682,0.1940041,0.6622682,0.1949616,0.6728395,0.1696411,0.6622682,0.1770499,0.6622682,0.1795837,0.6728395,0.3588873,0.8399823,0.3898947,0.8391237,0.3898947,0.9069001,0.7953088,0.2649435,0.7790258,0.249468,0.8474692,0.259531,0.2481116,0.3911225,0.2462905,0.3802828,0.2806485,0.3787322,0.3588873,0.8399823,0.3511101,0.7740816,0.3898947,0.7740816,0.1471613,0.5218979,0.189917,0.5148876,0.197651,0.5290897,0.1907078,0.4535804,0.1938428,0.4810435,0.1729536,0.4814247,0.8469355,0.2677386,0.8474692,0.259531,0.8982046,0.2625139,0.9708954,0.8085275,0.9664968,0.8175387,0.9258211,0.8029742,0.8375619,0.6541871,0.8868559,0.6541871,0.886483,0.7224903,0.271934,0.8425581,0.2685605,0.7740816,0.3145493,0.7740816,0.7977452,0.7159398,0.8337201,0.7183496,0.8022844,0.7781681,0.7954501,0.6541871,0.8375619,0.6541871,0.8337201,0.7183496,0.7560009,0.7144216,0.7559996,0.6541871,0.7954501,0.6541871,0.7560009,0.7144216,0.7977452,0.7159398,0.777831,0.7722989,0.2806485,0.3787322,0.3700357,0.3727298,0.3547435,0.3861595,0.7554032,0.1746022,0.7627002,0.1727968,0.7790258,0.249468,0.332568,0.8416994,0.3145493,0.7740816,0.3511101,0.7740816,0.7554032,0.2643745,0.7554032,0.2544687,0.7790258,0.249468,0.332568,0.8416994,0.3588873,0.8399823,0.3670262,0.9087246,0.1427201,0.7925937,0.1278058,0.8080096,0.09996718,0.8008588,0.0970357,0.7637021,0.1362985,0.7671103,0.1427201,0.7925937,0.1724482,0.4366883,0.1907078,0.4535804,0.1681663,0.460624,0.1471613,0.5218979,0.1392682,0.5518733,0.08730024,0.5240952,0.0986557,0.4616101,0.05985748,0.4579542,0.08076423,0.4014918,0.1139326,0.5030382,0.08730024,0.5240952,0.05985748,0.4579542,0.2828049,0.466022,0.2806485,0.390421,0.3547435,0.3861595,0.7803264,0.2326613,0.8481609,0.2509718,0.8474692,0.259531,0.3547435,0.3861595,0.3896697,0.3823192,0.3896697,0.466022,0.2806485,0.2506508,0.3485338,0.2506508,0.3504368,0.2634513,0.8481609,0.2509718,0.8978822,0.2556974,0.8982046,0.2625139,0.7554032,0.3408262,0.7554032,0.2643745,0.7953088,0.2649435,0.3185674,0.9201748,0.3434681,0.917169,0.3348564,0.9659361,0.8127585,0.8220551,0.8022844,0.7781681,0.8229628,0.7773924,0.8022844,0.7781681,0.8337201,0.7183496,0.8536271,0.74064,0.3020575,0.8779789,0.332568,0.8416994,0.3434681,0.917169,0.8536271,0.74064,0.8337201,0.7183496,0.886483,0.7224903,0.271934,0.8425581,0.332568,0.8416994,0.3020575,0.8779789,0.8976312,0.7927076,0.8961934,0.8181093,0.838957,0.8166707,0.7719239,0.8106893,0.777831,0.7722989,0.8022844,0.7781681,0.3348564,0.9659361,0.3434681,0.917169,0.359167,0.9579634,0.7876322,0.8183082,0.8022844,0.7781681,0.8127585,0.8220551,0.3670262,0.9087246,0.3898947,0.9069001,0.3898947,0.9401556,0.7560029,0.8093569,0.7560022,0.7683148,0.777831,0.7722989,0.3434681,0.917169,0.3670262,0.9087246,0.3726472,0.9458509,0.8465839,0.3408262,0.8469355,0.2677386,0.8981154,0.2692597,0.7803264,0.2326613,0.8029794,0.141212,0.8391532,0.14991,0.8391532,0.14991,0.8930105,0.1469116,0.8978822,0.2556974,0.2806485,0.1304609,0.3451227,0.1291909,0.3445673,0.1397836,0.7627002,0.1727968,0.769611,0.1688057,0.7803264,0.2326613,0.769611,0.1688057,0.7938432,0.1235057,0.8029794,0.141212,0.1757078,0.4195148,0.1789669,0.4023414,0.2283736,0.4359645,0.2295295,0.4884842,0.197651,0.5290897,0.189917,0.5148876,0.2283736,0.4359645,0.2295295,0.4884842,0.2116861,0.4847639,0.0970357,0.7637021,0.09910821,0.7206072,0.1287621,0.7235703,0.1362985,0.7671103,0.1287621,0.7235703,0.1427565,0.7494044,0.1729536,0.4814247,0.1938428,0.4810435,0.182183,0.5006855,0.08270138,0.7466216,0.09910821,0.7206072,0.0970357,0.7637021,0.1142164,0.427818,0.1757078,0.4195148,0.1724482,0.4366883,0.100062,0.9193969,0.100062,0.8939186,0.1599972,0.8832264,0.100062,0.9448751,0.100062,0.9193969,0.1620242,0.9095895,0.9080321,0.7749623,0.9112655,0.7767636,0.9020053,0.7939564,0.2446959,0.2506508,0.2806485,0.2450881,0.2806485,0.2506508,0.9148772,0.7787734,0.9059864,0.7954457,0.9020053,0.7939564,0.2806485,0.2647916,0.3504368,0.2634513,0.3628566,0.3534185,0.2806485,0.3787322,0.2806485,0.3573899,0.3628566,0.3534185,0.3547141,0.2565682,0.3589913,0.2496851,0.3686815,0.3473327,0.2453132,0.3591366,0.2446959,0.2506508,0.2806485,0.2647916,0.3485338,0.2506508,0.3540679,0.2501398,0.3547141,0.2565682,0.3657691,0.3503757,0.3686815,0.3473327,0.3764258,0.3481734,0.2806485,0.2450881,0.3470068,0.2445406,0.3485338,0.2506508,0.2446959,0.2506508,0.2806485,0.2506508,0.2806485,0.2647916,0.3470068,0.2445406,0.3533012,0.2472428,0.3540679,0.2501398,0.8889883,0.7310171,0.9242011,0.7606145,0.9080321,0.7749623,0.8590719,0.744813,0.9080321,0.7749623,0.8976312,0.7927076,0.8119978,0.07711595,0.8210167,0.01301991,0.8472208,0.01301991,0.9242011,0.7606145,0.9148772,0.7787734,0.9112655,0.7767636,0.2453132,0.3591366,0.2806485,0.3573899,0.2806485,0.3787322,0.2476589,0.466022,0.2481116,0.3911225,0.2806485,0.390421,0.8001982,0.3408262,0.7953088,0.2649435,0.8469355,0.2677386,0.8536271,0.74064,0.8590719,0.744813,0.8398546,0.7797322,0.8871768,0.7287721,0.8889883,0.7310171,0.8590719,0.744813,0.2922592,0.9617173,0.2908846,0.9220195,0.3185674,0.9201748,0.2788945,0.8836122,0.2600454,0.8546149,0.2689638,0.8472592,0.2908846,0.9220195,0.2788945,0.8836122,0.3020575,0.8779789,0.8398546,0.7797322,0.838957,0.8166707,0.8281385,0.8183308,0.1000103,0.9645692,0.100062,0.9448751,0.1640512,0.935953,0.843187,0.08146494,0.8472208,0.01301991,0.8921961,0.01301991,0.2500745,0.1899052,0.2554532,0.1291596,0.2806485,0.1411437,0.2554532,0.1291596,0.2806485,0.1304609,0.2806485,0.1411437,0.3445673,0.1397836,0.3533551,0.1287127,0.3529872,0.1901078,0.2806485,0.1411437,0.3445673,0.1397836,0.3457871,0.1921622,0.8082262,0.01301991,0.8210167,0.01301991,0.8119978,0.07711595,0.3732308,0.3604516,0.3764258,0.3481734,0.3896697,0.3448249,0.3445673,0.1397836,0.3451227,0.1291909,0.3533551,0.1287127,0.9258211,0.8029742,0.9664968,0.8175387,0.9639493,0.8291572,0.1958725,0.9031433,0.1942502,0.8689015,0.2600454,0.8546149,0.9785302,0.7988582,0.9708954,0.8085275,0.9330015,0.7883,0.9242011,0.7606145,0.9112655,0.7767636,0.9080321,0.7749623,0.9020053,0.7939564,0.9059864,0.7954457,0.8961934,0.8181093,0.8976312,0.7927076,0.9020053,0.7939564,0.8961934,0.8181093,0.1960763,0.9312182,0.1958725,0.9031433,0.2788945,0.8836122,0.1944297,0.9576656,0.1960763,0.9312182,0.2908846,0.9220195,0.9417565,0.7714266,0.9330015,0.7883,0.9148772,0.7787734,0.9059864,0.7954457,0.9258211,0.8029742,0.9169285,0.8230129,0.1661694,0.9578095,0.1640512,0.935953,0.1960763,0.9312182,0.1640512,0.935953,0.1620242,0.9095895,0.1958725,0.9031433,0.1958725,0.9031433,0.1620242,0.9095895,0.1599972,0.8832264,0.9330015,0.7883,0.9258211,0.8029742,0.9059864,0.7954457,0.1390297,0.6728395,0.1312565,0.6728395,0.1330146,0.6622682,0.1190328,0.6622682,0.1164985,0.6728395,0.1091598,0.6728395,0.1480393,0.6728395,0.1390297,0.6728395,0.1401311,0.6622682,0.1312565,0.6728395,0.1240695,0.6728395,0.1264395,0.6622682,0.1107193,0.6622682,0.1091598,0.6728395,0.1011252,0.6728395,0.1264395,0.6622682,0.1240695,0.6728395,0.1164985,0.6728395,0.1162937,0.3409836,0.1775629,0.3507942,0.1803996,0.3680427,0.1972031,0.2897296,0.2151328,0.2864487,0.212006,0.3263753,0.1860295,0.2698075,0.1941101,0.2557996,0.2151328,0.2864487,0.1747262,0.3335458,0.1933951,0.3171076,0.212006,0.3263753,0.1439644,0.2874839,0.1404442,0.3041175,0.1015679,0.3068196,0.1404442,0.3041175,0.1503822,0.3154869,0.1162937,0.3409836,0.1439644,0.2874839,0.1178574,0.2657791,0.1515395,0.247741,0.1515395,0.247741,0.1941101,0.2557996,0.1860295,0.2698075,0.1789669,0.4023414,0.1757078,0.4195148,0.1142164,0.427818,0.2095406,0.4447724,0.2116861,0.4847639,0.1938428,0.4810435,0.2116861,0.4847639,0.189917,0.5148876,0.182183,0.5006855,0.1724482,0.4366883,0.1757078,0.4195148,0.2095406,0.4447724,0.1405647,0.4819811,0.1139326,0.5030382,0.0986557,0.4616101,0.1374539,0.465266,0.0986557,0.4616101,0.1142164,0.427818,0.1471613,0.5218979,0.1139326,0.5030382,0.1405647,0.4819811,0.182183,0.5006855,0.189917,0.5148876,0.1471613,0.5218979,0.3896697,0.3823192,0.3896697,0.3723613,0.4093036,0.3727298,0.3896697,0.3723613,0.3700357,0.3727298,0.3732308,0.3604516,0.3628566,0.3534185,0.3657691,0.3503757,0.3732308,0.3604516,0.3504368,0.2634513,0.3547141,0.2565682,0.3657691,0.3503757,0.3896697,0.3723613,0.3896697,0.3585931,0.4061083,0.3604516,0.4061083,0.3604516,0.4135702,0.3503757,0.4164827,0.3534185,0.4135702,0.3503757,0.4246255,0.2565684,0.4289026,0.2634516,0.7169635,0.1235056,0.7078272,0.1412119,0.6992785,0.07711571,0.4323326,0.2445412,0.4335523,0.1921626,0.4925779,0.1931164,0.4262131,0.2471681,0.4203482,0.2496856,0.4231663,0.1891994,0.4925779,0.2450883,0.4925779,0.1931164,0.5292648,0.1899057,0.6716532,0.1499097,0.617796,0.1469113,0.6168364,0.07996547,0.7078272,0.1412119,0.6716532,0.1499097,0.667166,0.0814647,0.7938432,0.1235057,0.8010346,0.06826281,0.8119978,0.07711595,0.2806485,0.1931159,0.3457871,0.1921622,0.3470068,0.2445406,0.3470068,0.2445406,0.3457871,0.1921622,0.3529872,0.1901078,0.2500745,0.1899052,0.2806485,0.1931159,0.2806485,0.2450881,0.8391532,0.14991,0.843187,0.08146494,0.8926033,0.07996577,0.8029794,0.141212,0.8119978,0.07711595,0.843187,0.08146494,0.3529872,0.1901078,0.3533551,0.1287127,0.3561732,0.1891989,0.3547141,0.2565682,0.3540679,0.2501398,0.3589913,0.2496851,0.3533012,0.2472428,0.3529872,0.1901078,0.3561732,0.1891989,0.3540679,0.2501398,0.3533012,0.2472428,0.3589913,0.2496851,0.4323326,0.2445412,0.4262131,0.2471681,0.4264236,0.1901286,0.4246255,0.2565684,0.4254037,0.2501524,0.4308055,0.250651,0.4254037,0.2501524,0.4262131,0.2471681,0.4323326,0.2445412,0.4264236,0.1901286,0.4259845,0.1287134,0.434772,0.1397843,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.4174393,0.9081685,0.3898947,0.9069001,0.4195565,0.8382653,0.7317804,0.249468,0.7154975,0.2649434,0.663337,0.259531,0.5330488,0.3802828,0.5312274,0.3911225,0.4925779,0.3787322,0.4244588,0.7740816,0.4195565,0.8382653,0.3898947,0.7740816,0.1941101,0.2557996,0.1515395,0.247741,0.2021906,0.2417916,0.1710333,0.3095125,0.1763298,0.2888354,0.1933951,0.3171076,0.663337,0.259531,0.6638709,0.2677386,0.6126016,0.2625138,0.5790019,0.788309,0.5861846,0.8029832,0.5411085,0.8085427,0.6782817,0.7183521,0.6255185,0.7224949,0.6744373,0.6541871,0.5059746,0.7740816,0.5077765,0.8374067,0.4603677,0.7740816,0.7341732,0.7722997,0.70972,0.7781699,0.7142565,0.715941,0.7142565,0.715941,0.6782817,0.7183521,0.7165492,0.6541871,0.7559996,0.6541871,0.7560009,0.7144216,0.7165492,0.6541871,0.7560022,0.7683148,0.7341732,0.7722997,0.7560009,0.7144216,0.4925779,0.390421,0.4245957,0.3861595,0.4925779,0.3787322,0.7481063,0.1727968,0.7554032,0.1746022,0.7317804,0.249468,0.4603677,0.7740816,0.4465662,0.8408409,0.4244588,0.7740816,0.7554032,0.2544687,0.7554032,0.2643745,0.7317804,0.249468,0.4414273,0.9160478,0.4174393,0.9081685,0.4465662,0.8408409,0.221722,0.7837696,0.2034792,0.8032879,0.1612775,0.7925573,0.1691661,0.7674893,0.2085604,0.7663637,0.1612775,0.7925573,0.1503822,0.3154869,0.1710333,0.3095125,0.1747262,0.3335458,0.1443853,0.217581,0.1515395,0.247741,0.09175044,0.2440744,0.06269156,0.3095215,0.1015679,0.3068196,0.08220529,0.3664804,0.09175044,0.2440744,0.1178574,0.2657791,0.06269156,0.3095215,0.4925779,0.390421,0.4899051,0.466022,0.4245957,0.3861595,0.7317804,0.249468,0.663337,0.259531,0.73048,0.2326613,0.4354322,0.466022,0.3896697,0.466022,0.4245957,0.3861595,0.4925779,0.2647921,0.4289026,0.2634516,0.4925779,0.250651,0.663337,0.259531,0.6126016,0.2625138,0.6626453,0.2509718,0.7554032,0.2643745,0.7554032,0.3408262,0.7154975,0.2649434,0.4414273,0.9160478,0.466657,0.9184214,0.4517678,0.9665372,0.6838681,0.8183333,0.6890416,0.7773949,0.699248,0.8220569,0.6890416,0.7773949,0.6583754,0.7406436,0.70972,0.7781699,0.4465662,0.8408409,0.4812456,0.8745813,0.4414273,0.9160478,0.6782817,0.7183521,0.6583754,0.7406436,0.6255185,0.7224949,0.5078161,0.848973,0.4812456,0.8745813,0.5077765,0.8374067,0.67215,0.7797353,0.6730496,0.8166739,0.6143739,0.7927137,0.7341732,0.7722997,0.7400818,0.8106898,0.70972,0.7781699,0.4357593,0.9713098,0.426943,0.9580217,0.4517678,0.9665372,0.70972,0.7781699,0.7243739,0.8183093,0.699248,0.8220569,0.4127064,0.9458165,0.3898947,0.9401556,0.4174393,0.9081685,0.7560022,0.7683148,0.7560029,0.8093569,0.7341732,0.7722997,0.426943,0.9580217,0.4127064,0.9458165,0.4414273,0.9160478,0.6638709,0.2677386,0.6642225,0.3408262,0.6126909,0.2692595,0.7078272,0.1412119,0.73048,0.2326613,0.6716532,0.1499097,0.6626453,0.2509718,0.612924,0.2556973,0.6716532,0.1499097,0.4925779,0.1411445,0.434772,0.1397843,0.4925779,0.1304615,0.7411954,0.1688057,0.7481063,0.1727968,0.73048,0.2326613,0.7169635,0.1235056,0.7411954,0.1688057,0.7078272,0.1412119,0.1803996,0.3680427,0.1775629,0.3507942,0.2306169,0.335643,0.2151328,0.2864487,0.1941101,0.2557996,0.2330623,0.2831677,0.212006,0.3263753,0.2151328,0.2864487,0.2306169,0.335643,0.2089902,0.7232213,0.2085604,0.7663637,0.1792144,0.7244597,0.1792144,0.7244597,0.1691661,0.7674893,0.1637455,0.7494388,0.1972031,0.2897296,0.1763298,0.2888354,0.1860295,0.2698075,0.221722,0.7837696,0.2085604,0.7663637,0.2238611,0.7501429,0.1775629,0.3507942,0.1162937,0.3409836,0.1747262,0.3335458,0.6111499,0.9006716,0.6123518,0.8706514,0.7037112,0.9125381,0.6117507,0.9306917,0.6111499,0.9006716,0.7037112,0.9338966,0.6007382,0.7767702,0.6039715,0.7749686,0.6099997,0.7939627,0.6007382,0.7767702,0.6099997,0.7939627,0.5971263,0.7787808,0.4925779,0.3573899,0.4164827,0.3534185,0.4925779,0.2647921,0.4925779,0.3573899,0.4925779,0.3787322,0.4164827,0.3534185,0.4135702,0.3503757,0.4106577,0.347333,0.4246255,0.2565684,0.5346433,0.250651,0.5340258,0.3591368,0.4925779,0.2647921,0.4061083,0.3604516,0.4029131,0.3481734,0.4135702,0.3503757,0.4925779,0.250651,0.4308055,0.250651,0.4925779,0.2450883,0.5878009,0.7606213,0.6230134,0.7310217,0.6039715,0.7749686,0.6039715,0.7749686,0.6529309,0.7448169,0.6143739,0.7927137,0.6907299,0.01301968,0.6992785,0.07711571,0.662679,0.01301968,0.5330488,0.3802828,0.4925779,0.3787322,0.5340258,0.3591368,0.5312274,0.3911225,0.5316801,0.466022,0.4925779,0.390421,0.7154975,0.2649434,0.710608,0.3408262,0.6638709,0.2677386,0.6529309,0.7448169,0.6583754,0.7406436,0.67215,0.7797353,0.6230134,0.7310217,0.6248249,0.7287762,0.6529309,0.7448169,0.4702548,0.9626304,0.466657,0.9184214,0.4980311,0.9617646,0.4812456,0.8745813,0.5078161,0.848973,0.5029777,0.8891813,0.466657,0.9184214,0.4812456,0.8745813,0.4981029,0.9241486,0.6890416,0.7773949,0.6838681,0.8183333,0.67215,0.7797353,0.6129528,0.960712,0.6117507,0.9306917,0.7037112,0.9609296,0.662679,0.01301968,0.667166,0.0814647,0.6158769,0.01301968,0.5238863,0.1291604,0.5292648,0.1899057,0.4925779,0.1411445,0.4925779,0.1931164,0.4335523,0.1921626,0.4925779,0.1411445,0.7111056,0.06826269,0.6992785,0.07711571,0.7052477,0.01301968,0.3896697,0.3585931,0.3896697,0.3448249,0.4061083,0.3604516,0.3547435,0.3861595,0.3700357,0.3727298,0.3896697,0.3823192,0.5455099,0.8175541,0.5861846,0.8029832,0.5480604,0.8291721,0.5029777,0.8891813,0.5142984,0.8553238,0.5743605,0.891974,0.5702447,0.7714349,0.5790019,0.788309,0.5334705,0.7988731,0.4981029,0.9241486,0.5029777,0.8891813,0.5756209,0.9254359,0.4980311,0.9617646,0.4981029,0.9241486,0.5768814,0.9588977,0.5878009,0.7606213,0.5971263,0.7787808,0.5702447,0.7714349,0.5861846,0.8029832,0.6060187,0.7954526,0.5950799,0.8230206,0.5768814,0.9588977,0.5756209,0.9254359,0.6129528,0.960712,0.5756209,0.9254359,0.5743605,0.891974,0.6117507,0.9306917,0.6111499,0.9006716,0.5743605,0.891974,0.6123518,0.8706514,0.5971263,0.7787808,0.6060187,0.7954526,0.5790019,0.788309,0.1559473,0.6622682,0.1630647,0.6622682,0.1570491,0.6728395,0.1795837,0.6728395,0.1770499,0.6622682,0.1869244,0.6728395,0.1480391,0.6622682,0.1559473,0.6622682,0.1480393,0.6728395,0.1630647,0.6622682,0.1696411,0.6622682,0.1648229,0.6728395,0.1869244,0.6728395,0.1853662,0.6622682,0.1949616,0.6728395,0.1720111,0.6728395,0.1696411,0.6622682,0.1795837,0.6728395,0.3670262,0.9087246,0.3588873,0.8399823,0.3898947,0.9069001,0.8469355,0.2677386,0.7953088,0.2649435,0.8474692,0.259531,0.2806485,0.390421,0.2481116,0.3911225,0.2806485,0.3787322,0.3898947,0.8391237,0.3588873,0.8399823,0.3898947,0.7740816,0.1392682,0.5518733,0.1471613,0.5218979,0.197651,0.5290897,0.1681663,0.460624,0.1907078,0.4535804,0.1729536,0.4814247,0.8981154,0.2692597,0.8469355,0.2677386,0.8982046,0.2625139,0.9330015,0.7883,0.9708954,0.8085275,0.9258211,0.8029742,0.8337201,0.7183496,0.8375619,0.6541871,0.886483,0.7224903,0.332568,0.8416994,0.271934,0.8425581,0.3145493,0.7740816,0.777831,0.7722989,0.7977452,0.7159398,0.8022844,0.7781681,0.7977452,0.7159398,0.7954501,0.6541871,0.8337201,0.7183496,0.7977452,0.7159398,0.7560009,0.7144216,0.7954501,0.6541871,0.7560022,0.7683148,0.7560009,0.7144216,0.777831,0.7722989,0.2806485,0.390421,0.2806485,0.3787322,0.3547435,0.3861595,0.7554032,0.2544687,0.7554032,0.1746022,0.7790258,0.249468,0.3588873,0.8399823,0.332568,0.8416994,0.3511101,0.7740816,0.7953088,0.2649435,0.7554032,0.2643745,0.7790258,0.249468,0.3434681,0.917169,0.332568,0.8416994,0.3670262,0.9087246,0.08288711,0.7803153,0.1427201,0.7925937,0.09996718,0.8008588,0.08288711,0.7803153,0.0970357,0.7637021,0.1427201,0.7925937,0.1476685,0.4541442,0.1724482,0.4366883,0.1681663,0.460624,0.1139326,0.5030382,0.1471613,0.5218979,0.08730024,0.5240952,0.1142164,0.427818,0.0986557,0.4616101,0.08076423,0.4014918,0.0986557,0.4616101,0.1139326,0.5030382,0.05985748,0.4579542,0.343907,0.466022,0.2828049,0.466022,0.3547435,0.3861595,0.7790258,0.249468,0.7803264,0.2326613,0.8474692,0.259531,0.343907,0.466022,0.3547435,0.3861595,0.3896697,0.466022,0.2806485,0.2647916,0.2806485,0.2506508,0.3504368,0.2634513,0.8474692,0.259531,0.8481609,0.2509718,0.8982046,0.2625139,0.8001982,0.3408262,0.7554032,0.3408262,0.7953088,0.2649435,0.3163036,0.9618205,0.3185674,0.9201748,0.3348564,0.9659361,0.8281385,0.8183308,0.8127585,0.8220551,0.8229628,0.7773924,0.8229628,0.7773924,0.8022844,0.7781681,0.8536271,0.74064,0.3185674,0.9201748,0.3020575,0.8779789,0.3434681,0.917169,0.8871768,0.7287721,0.8536271,0.74064,0.886483,0.7224903,0.2689638,0.8472592,0.271934,0.8425581,0.3020575,0.8779789,0.8398546,0.7797322,0.8976312,0.7927076,0.838957,0.8166707,0.7876322,0.8183082,0.7719239,0.8106893,0.8022844,0.7781681,0.3514357,0.9703859,0.3348564,0.9659361,0.359167,0.9579634,0.7986263,0.8296617,0.7876322,0.8183082,0.8127585,0.8220551,0.3726472,0.9458509,0.3670262,0.9087246,0.3898947,0.9401556,0.7719239,0.8106893,0.7560029,0.8093569,0.777831,0.7722989,0.359167,0.9579634,0.3434681,0.917169,0.3726472,0.9458509,0.8968738,0.3408262,0.8465839,0.3408262,0.8981154,0.2692597,0.8481609,0.2509718,0.7803264,0.2326613,0.8391532,0.14991,0.8481609,0.2509718,0.8391532,0.14991,0.8978822,0.2556974,0.2806485,0.1411437,0.2806485,0.1304609,0.3445673,0.1397836,0.7790258,0.249468,0.7627002,0.1727968,0.7803264,0.2326613,0.7803264,0.2326613,0.769611,0.1688057,0.8029794,0.141212,0.2095406,0.4447724,0.1757078,0.4195148,0.2283736,0.4359645,0.2116861,0.4847639,0.2295295,0.4884842,0.189917,0.5148876,0.2095406,0.4447724,0.2283736,0.4359645,0.2116861,0.4847639,0.1362985,0.7671103,0.0970357,0.7637021,0.1287621,0.7235703,0.1427201,0.7925937,0.1362985,0.7671103,0.1427565,0.7494044,0.1550543,0.4919224,0.1729536,0.4814247,0.182183,0.5006855,0.08288711,0.7803153,0.08270138,0.7466216,0.0970357,0.7637021,0.1476685,0.4541442,0.1142164,0.427818,0.1724482,0.4366883,0.1620242,0.9095895,0.100062,0.9193969,0.1599972,0.8832264,0.1640512,0.935953,0.100062,0.9448751,0.1620242,0.9095895,0.8976312,0.7927076,0.9080321,0.7749623,0.9020053,0.7939564,0.9112655,0.7767636,0.9148772,0.7787734,0.9020053,0.7939564,0.2806485,0.3573899,0.2806485,0.2647916,0.3628566,0.3534185,0.3700357,0.3727298,0.2806485,0.3787322,0.3628566,0.3534185,0.3657691,0.3503757,0.3547141,0.2565682,0.3686815,0.3473327,0.2806485,0.3573899,0.2453132,0.3591366,0.2806485,0.2647916,0.3504368,0.2634513,0.3485338,0.2506508,0.3547141,0.2565682,0.3732308,0.3604516,0.3657691,0.3503757,0.3764258,0.3481734,0.2806485,0.2506508,0.2806485,0.2450881,0.3485338,0.2506508,0.3485338,0.2506508,0.3470068,0.2445406,0.3540679,0.2501398,0.8590719,0.744813,0.8889883,0.7310171,0.9080321,0.7749623,0.8398546,0.7797322,0.8590719,0.744813,0.8976312,0.7927076,0.843187,0.08146494,0.8119978,0.07711595,0.8472208,0.01301991,0.2462905,0.3802828,0.2453132,0.3591366,0.2806485,0.3787322,0.2828049,0.466022,0.2476589,0.466022,0.2806485,0.390421,0.8465839,0.3408262,0.8001982,0.3408262,0.8469355,0.2677386,0.8229628,0.7773924,0.8536271,0.74064,0.8398546,0.7797322,0.8536271,0.74064,0.8871768,0.7287721,0.8590719,0.744813,0.3163036,0.9618205,0.2922592,0.9617173,0.3185674,0.9201748,0.3020575,0.8779789,0.2788945,0.8836122,0.2689638,0.8472592,0.3185674,0.9201748,0.2908846,0.9220195,0.3020575,0.8779789,0.8229628,0.7773924,0.8398546,0.7797322,0.8281385,0.8183308,0.1661694,0.9578095,0.1000103,0.9645692,0.1640512,0.935953,0.8926033,0.07996577,0.843187,0.08146494,0.8921961,0.01301991,0.2806485,0.1931159,0.2500745,0.1899052,0.2806485,0.1411437,0.3457871,0.1921622,0.3445673,0.1397836,0.3529872,0.1901078,0.2806485,0.1931159,0.2806485,0.1411437,0.3457871,0.1921622,0.8010346,0.06826281,0.8082262,0.01301991,0.8119978,0.07711595,0.3896697,0.3585931,0.3732308,0.3604516,0.3896697,0.3448249,0.9169285,0.8230129,0.9258211,0.8029742,0.9639493,0.8291572,0.2788945,0.8836122,0.1958725,0.9031433,0.2600454,0.8546149,0.9417565,0.7714266,0.9785302,0.7988582,0.9330015,0.7883,0.2908846,0.9220195,0.1960763,0.9312182,0.2788945,0.8836122,0.2922592,0.9617173,0.1944297,0.9576656,0.2908846,0.9220195,0.9242011,0.7606145,0.9417565,0.7714266,0.9148772,0.7787734,0.8961934,0.8181093,0.9059864,0.7954457,0.9169285,0.8230129,0.1944297,0.9576656,0.1661694,0.9578095,0.1960763,0.9312182,0.1960763,0.9312182,0.1640512,0.935953,0.1958725,0.9031433,0.1942502,0.8689015,0.1958725,0.9031433,0.1599972,0.8832264,0.9148772,0.7787734,0.9330015,0.7883,0.9059864,0.7954457,0.1401311,0.6622682,0.1390297,0.6728395,0.1330146,0.6622682,0.1107193,0.6622682,0.1190328,0.6622682,0.1091598,0.6728395,0.1480391,0.6622682,0.1480393,0.6728395,0.1401311,0.6622682,0.1330146,0.6622682,0.1312565,0.6728395,0.1264395,0.6622682,0.1020838,0.6622682,0.1107193,0.6622682,0.1011252,0.6728395,0.1190328,0.6622682,0.1264395,0.6622682,0.1164985,0.6728395,0.08220529,0.3664804,0.1162937,0.3409836,0.1803996,0.3680427,0.1933951,0.3171076,0.1972031,0.2897296,0.212006,0.3263753,0.1972031,0.2897296,0.1860295,0.2698075,0.2151328,0.2864487,0.1775629,0.3507942,0.1747262,0.3335458,0.212006,0.3263753,0.1178574,0.2657791,0.1439644,0.2874839,0.1015679,0.3068196,0.1015679,0.3068196,0.1404442,0.3041175,0.1162937,0.3409836,0.1586939,0.2779012,0.1439644,0.2874839,0.1515395,0.247741,0.1586939,0.2779012,0.1515395,0.247741,0.1860295,0.2698075,0.08076423,0.4014918,0.1789669,0.4023414,0.1142164,0.427818,0.1907078,0.4535804,0.2095406,0.4447724,0.1938428,0.4810435,0.1938428,0.4810435,0.2116861,0.4847639,0.182183,0.5006855,0.1907078,0.4535804,0.1724482,0.4366883,0.2095406,0.4447724,0.1374539,0.465266,0.1405647,0.4819811,0.0986557,0.4616101,0.1476685,0.4541442,0.1374539,0.465266,0.1142164,0.427818,0.1550543,0.4919224,0.1471613,0.5218979,0.1405647,0.4819811,0.1550543,0.4919224,0.182183,0.5006855,0.1471613,0.5218979,0.4245957,0.3861595,0.3896697,0.3823192,0.4093036,0.3727298,0.3896697,0.3585931,0.3896697,0.3723613,0.3732308,0.3604516,0.3700357,0.3727298,0.3628566,0.3534185,0.3732308,0.3604516,0.3628566,0.3534185,0.3504368,0.2634513,0.3657691,0.3503757,0.4093036,0.3727298,0.3896697,0.3723613,0.4061083,0.3604516,0.4093036,0.3727298,0.4061083,0.3604516,0.4164827,0.3534185,0.4164827,0.3534185,0.4135702,0.3503757,0.4289026,0.2634516,0.7111056,0.06826269,0.7169635,0.1235056,0.6992785,0.07711571,0.4925779,0.2450883,0.4323326,0.2445412,0.4925779,0.1931164,0.4264236,0.1901286,0.4262131,0.2471681,0.4231663,0.1891994,0.5346433,0.250651,0.4925779,0.2450883,0.5292648,0.1899057,0.667166,0.0814647,0.6716532,0.1499097,0.6168364,0.07996547,0.6992785,0.07711571,0.7078272,0.1412119,0.667166,0.0814647,0.8029794,0.141212,0.7938432,0.1235057,0.8119978,0.07711595,0.2806485,0.2450881,0.2806485,0.1931159,0.3470068,0.2445406,0.3533012,0.2472428,0.3470068,0.2445406,0.3529872,0.1901078,0.2446959,0.2506508,0.2500745,0.1899052,0.2806485,0.2450881,0.8930105,0.1469116,0.8391532,0.14991,0.8926033,0.07996577,0.8391532,0.14991,0.8029794,0.141212,0.843187,0.08146494,0.3589913,0.2496851,0.3533012,0.2472428,0.3561732,0.1891989,0.4335523,0.1921626,0.4323326,0.2445412,0.4264236,0.1901286,0.4289026,0.2634516,0.4246255,0.2565684,0.4308055,0.250651,0.4308055,0.250651,0.4254037,0.2501524,0.4323326,0.2445412,0.4335523,0.1921626,0.4264236,0.1901286,0.434772,0.1397843]}

},{}],13:[function(require,module,exports){
var mount = document.createElement('div')
mount.style.width = '100%'
mount.style.height = '100%'
mount.style.overflow = 'hidden'

var demo = require('./demo.js')()

// Download a fork me on GitHub banner for use offline..

mount.appendChild(demo.control)
mount.appendChild(demo.canvas)
document.body.appendChild(mount)

document.querySelector('html').style.height = '100%'
document.body.style.height = '100%'
document.body.style.margin = 0


},{"./demo.js":18}],14:[function(require,module,exports){
module.exports = renderFullBodyControls

function renderFullBodyControls (h, State) {
  return h('div', {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, [
    h('button', {
      onclick: function (e) {
        var state = State.get()

        State.set('upperBody.previousAnimation', {
          range: state.animationRanges[State.get().upperBody.currentAnimation.name],
          startTime: State.get().upperBody.currentAnimation.startTime
        })
        var upperBodyAnimName = State.get().upperBody.currentAnimation.name === 'dance' ? 'bend' : 'dance'
        State.set('upperBody.currentAnimation', {
          name: upperBodyAnimName,
          range: state.animationRanges[upperBodyAnimName],
          startTime: State.get().currentTime
        })

        State.set('lowerBody.previousAnimation', {
          range: state.animationRanges[State.get().lowerBody.currentAnimation.name],
          startTime: State.get().lowerBody.currentAnimation.startTime
        })
        var lowerBodyAnimName = State.get().lowerBody.currentAnimation.name === 'dance' ? 'bend' : 'dance'
        State.set('lowerBody.currentAnimation', {
          name: lowerBodyAnimName,
          range: state.animationRanges[lowerBodyAnimName],
          startTime: State.get().currentTime
        })
      },
      style: {
        width: '140px'
      }
    }, 'Toggle Full Body animation')
  ])
}

},{}],15:[function(require,module,exports){
module.exports = renderLowerBodyControls

function renderLowerBodyControls (h, State) {
  return h('div', {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, [
    h('button', {
      onclick: function (e) {
        var state = State.get()

        State.set('lowerBody.previousAnimation', {
          range: state.animationRanges[State.get().lowerBody.currentAnimation.name],
          startTime: State.get().lowerBody.currentAnimation.startTime
        })
        var lowerBodyAnimName = State.get().lowerBody.currentAnimation.name === 'dance' ? 'bend' : 'dance'
        State.set('lowerBody.currentAnimation', {
          name: lowerBodyAnimName,
          range: state.animationRanges[lowerBodyAnimName],
          startTime: State.get().currentTime
        })
      },
      style: {
        width: '140px'
      }
    }, 'Toggle Lower Body animation'),
    h('span', {
    }, 'Lower body animation: ' + State.get().lowerBody.currentAnimation.name)
  ])
}

},{}],16:[function(require,module,exports){
module.exports = renderUpperBodyControls

function renderUpperBodyControls (h, State) {
  return h('div', {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, [
    h('button', {
      onclick: function (e) {
        var state = State.get()

        State.set('upperBody.previousAnimation', {
          range: state.animationRanges[State.get().upperBody.currentAnimation.name],
          startTime: State.get().upperBody.currentAnimation.startTime
        })
        var upperBodyAnimName = State.get().upperBody.currentAnimation.name === 'dance' ? 'bend' : 'dance'
        State.set('upperBody.currentAnimation', {
          name: upperBodyAnimName,
          range: state.animationRanges[upperBodyAnimName],
          startTime: State.get().currentTime
        })
      },
      style: {
        width: '140px'
      }
    }, 'Toggle Upper Body animation'),
    h('span', {
    }, 'Upper body animation: ' + State.get().upperBody.currentAnimation.name)
  ])
}

},{}],17:[function(require,module,exports){
var cameraControls = require('orbit-controls')


module.exports = createCanvas

// TODO: Turn into module
function createCanvas (State) {
  var canvas = document.createElement('canvas')
  canvas.style.width = '100%'
  canvas.style.height = '100%'

  var observer = new window.MutationObserver(checkForCanvas.bind(observer, State, stopObserving, canvas))
  observer.observe(document.body, {childList: true, subtree: true})

  window.addEventListener('resize', function () {
    console.log('resize')
    var positionInfo = canvas.getBoundingClientRect()
    canvas.height = positionInfo.height
    canvas.width = positionInfo.width
    State.set('viewport', {width: canvas.width, height: canvas.height})
  })

  canvas.addEventListener('touchstart', function preventScroll (e) {
    e.preventDefault()
  })

  var controls = cameraControls({
    position: [0, 0, -5],
    element: canvas,
    distanceBounds: [0.1, 100]
  })

  return {
    cameraControls: controls,
    canvas: canvas
  }

  function stopObserving () {
    observer.disconnect()
    console.log('hi')
  }
}

function checkForCanvas (State, stop, canvas, mutationRecords) {
  // TODO: Remove this console.log once we know this isn't getting called over and over again
  console.log('mutation observed')
  mutationRecords.forEach(function (mutationRecord) {
    var positionInfo = canvas.getBoundingClientRect()
    canvas.width = positionInfo.width
    canvas.height = positionInfo.height
    State.set('viewport', {width: canvas.width, height: canvas.height})
    stop()
  })
}

},{"orbit-controls":81}],18:[function(require,module,exports){
// TODO: Refactor this example out into modules that handle the boilerplate
//  i.e. you shouldn't need to convert to dual quats yourself
var mat3FromMat4 = require('gl-mat3/from-mat4')
var quatMultiply = require('gl-quat/multiply')
var quatFromMat3 = require('gl-quat/fromMat3')
var quatScale = require('gl-quat/scale')

var loadDae = require('../../load-collada-dae')
var loaded3dModel

var createCanvas = require('./create-canvas.js')

var modelJSON = require('./asset/old-man.json')

var SS = require('solid-state')
var xhr = require('xhr')

var mainLoop = require('main-loop')

module.exports = createSkeletonCanvas

// Keep in mind that things were haphazardly thrown around
// and you'd want better organization in a real application
function createSkeletonCanvas () {
  var State = new SS({
    animationRanges: {
      'dance': [0, 3],
      'bend': [3, 6]
    },
    upperBody: {
      currentAnimation: {
        name: 'dance',
        range: [0, 3],
        startTime: 0
      }
    },
    lowerBody: {
      currentAnimation: {
        name: 'dance',
        range: [0, 3],
        startTime: 0
      }
    }
  })

  var dualQuatKeyframes
  var imageLoaded

  // Download our model's texture image
  var image = new window.Image()
  image.crossOrigin = 'anonymous'
  image.onload = function () {
    imageLoaded = true
    loadModel()
  }
  image.src = 'suite01d.png'

  // Download our model's JSON
  xhr.get('old-man.json', function (err, resp) {
    if (err) { throw err }
    modelJSON = JSON.parse(resp.body)
    dualQuatKeyframes = convertKeyframesToDualQuats(modelJSON.keyframes)
    loadModel()
  })

  // Once our model and image have been downloaded we
  // prepare our data for the GPU so that we can later draw it
  function loadModel () {
    if (modelJSON && imageLoaded) {
      loaded3dModel = loadDae(gl, modelJSON, {texture: image})
    }
  }

  // Create our canvas and WebGL context
  var canvasData = createCanvas(State)
  var canvas = canvasData.canvas
  var gl = canvas.getContext('webgl')
  gl.clearColor(0.0, 0.0, 0.0, 1.0)
  gl.enable(gl.DEPTH_TEST)

  // Render our model every request animation frame
  var canvasLoop = require('raf-loop')

  var currentTime = 0
  canvasLoop(function (dt) {
    currentTime += dt / 1000
    State.set('currentTime', currentTime)
    var state = State.get()
    require('./render-canvas.js')(gl, state, canvasData.cameraControls, dt, {
      model: loaded3dModel,
      dualQuatKeyframes: dualQuatKeyframes
    })
  }).start()

  var controlLoop = mainLoop(State.get(), require('./render-controls').bind(null, State), require('virtual-dom'))
  State.addListener(controlLoop.update)

  return {
    control: controlLoop.target,
    canvas: canvas
  }
}

function convertKeyframesToDualQuats (keyframes) {
  return Object.keys(modelJSON.keyframes)
  .reduce(function (acc, time) {
    var keyframes = convertMatricesToDualQuats(modelJSON.keyframes[time])
    keyframes = keyframes.rotQuaternions.reduce(function (all, quat, index) {
      all[index] = keyframes.rotQuaternions[index].concat(keyframes.transQuaternions[index])
      return all
    }, {})
    acc[time] = keyframes
    return acc
  }, {})
}

// TODO: Turn into module
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

},{"../../load-collada-dae":8,"./asset/old-man.json":12,"./create-canvas.js":17,"./render-canvas.js":20,"./render-controls":21,"gl-mat3/from-mat4":40,"gl-quat/fromMat3":46,"gl-quat/multiply":48,"gl-quat/scale":50,"main-loop":76,"raf-loop":93,"solid-state":101,"virtual-dom":110,"xhr":136}],19:[function(require,module,exports){
var animationSystem = require('../')

module.exports = lowerBody

var jointNums = [5, 6, 7, 8, 9]

function lowerBody (state, dualQuatKeyframes) {
  var interpolatedQuats = animationSystem.interpolateJoints({
    // TODO: Fix test case when current time is 0
    currentTime: state.currentTime,
    keyframes: dualQuatKeyframes,
    jointNums: jointNums,
    currentAnimation: {
      range: state.lowerBody.currentAnimation.range,
      // TODO: Fix test case when current time is 0
      startTime: state.lowerBody.currentAnimation.startTime
    },
    previousAnimation: state.lowerBody.previousAnimation
  })

  var interpolatedRotQuats = []
  var interpolatedTransQuats = []
  jointNums.forEach(function (jointNum) {
    interpolatedRotQuats[jointNum] = interpolatedQuats[jointNum].slice(0, 4)
    interpolatedTransQuats[jointNum] = interpolatedQuats[jointNum].slice(4, 8)
  })

  return {
    length: jointNums.length,
    rot: interpolatedRotQuats,
    trans: interpolatedTransQuats
  }
}


},{"../":23}],20:[function(require,module,exports){
var mat4Perspective = require('gl-mat4/perspective')
var camera = require('perspective-camera')({
  fov: 50 * Math.PI / 180,
  position: [0, 0, 1],
  near: 0.00001,
  far: 100
})

module.exports = renderCanvas

function renderCanvas (gl, state, cameraControls, dt, opts) {
  gl.viewport(0, 0, state.viewport.width, state.viewport.height)
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

  var upperBodyQuats = require('./upper-body.js')(state, opts.dualQuatKeyframes)
  var lowerBodyQuats = require('./lower-body.js')(state, opts.dualQuatKeyframes)

  if (!upperBodyQuats || !lowerBodyQuats) {
    return
  }

  var interpolatedQuats = {rot: [], trans: []}
  var totalJoints = upperBodyQuats.length + lowerBodyQuats.length
  for (var i = 0; i < totalJoints; i++) {
    interpolatedQuats.rot[i] = upperBodyQuats.rot[i] || lowerBodyQuats.rot[i]
    interpolatedQuats.trans[i] = upperBodyQuats.trans[i] || lowerBodyQuats.trans[i]
  }

  cameraControls.update()
  cameraControls.copyInto(camera.position, camera.direction, camera.up)
  camera.viewport = [0, 0, state.viewport.width, state.viewport.height]
  camera.lookAt([0, 0, 0])

  // Gets around an issue in our `orbit-controls` dependency
  // when you try to view the model from the top or bottom
  if (camera.up[0] + camera.up[1] + camera.up[2] === 0) {
    camera.up = [0, -1, 0]
  }

  camera.update()

  // Once we've loaded our model we draw it every frame
  if (opts.model) {
    opts.model.draw({
      perspective: camera.projection,
      viewMatrix: camera.view,
      position: [0, 0, 0],
      rotQuaternions: interpolatedQuats.rot,
      transQuaternions: interpolatedQuats.trans
      // TODO: Leave comment in tutorial about using a view matrix to create a camera
      //  If you're interested in that let me know on twitter
    })
  }
}

},{"./lower-body.js":19,"./upper-body.js":22,"gl-mat4/perspective":45,"perspective-camera":86}],21:[function(require,module,exports){
var h = require('virtual-dom/h')

module.exports = renderControls

function renderControls (State) {
  var controls = h('div', {
  }, [
    h('div', {
      style: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-around',
        width: '100%',
        height: '100px'

      }
    }, [
      require('./control/full-body-control.js')(h, State),
      require('./control/upper-body-controls.js')(h, State),
      require('./control/lower-body-controls.js')(h, State)
    ]),
    h('a', {
      href: 'https://github.com/chinedufn/skeletal-animation-system'
    }, [
      h('img#fork-github', {
        style: {
          alt: 'Fork me on GitHub',
          border: 0,
          position: 'absolute',
          right: 0,
          top: 0
        },
        src: 'fork-github.png'
      })
    ])
  ])

  return controls
}

},{"./control/full-body-control.js":14,"./control/lower-body-controls.js":15,"./control/upper-body-controls.js":16,"virtual-dom/h":109}],22:[function(require,module,exports){
var animationSystem = require('../')

module.exports = upperBody

var jointNums = [0, 1, 2, 3, 4]

function upperBody (state, dualQuatKeyframes) {
  var interpolatedQuats = animationSystem.interpolateJoints({
    // TODO: Fix test case when current time is 0
    currentTime: state.currentTime,
    keyframes: dualQuatKeyframes,
    jointNums: jointNums,
    currentAnimation: {
      range: state.upperBody.currentAnimation.range,
      // TODO: Fix test case when current time is 0
      startTime: state.upperBody.currentAnimation.startTime
    },
    previousAnimation: state.upperBody.previousAnimation
  })

  var interpolatedRotQuats = []
  var interpolatedTransQuats = []
  jointNums.forEach(function (jointNum) {
    interpolatedRotQuats[jointNum] = interpolatedQuats[jointNum].slice(0, 4)
    interpolatedTransQuats[jointNum] = interpolatedQuats[jointNum].slice(4, 8)
  })

  return {
    length: jointNums.length,
    rot: interpolatedRotQuats,
    trans: interpolatedTransQuats
  }
}

},{"../":23}],23:[function(require,module,exports){
module.exports = require('./src/skeletal-animation-system')

},{"./src/skeletal-animation-system":140}],24:[function(require,module,exports){
'use strict'

module.exports = function assertFunction (value) {
  if (typeof value !== 'function') {
    throw new TypeError('Expected function, got: ' + value)
  }
}

},{}],25:[function(require,module,exports){

},{}],26:[function(require,module,exports){
module.exports = function(obj) {
    if (typeof obj === 'string') return camelCase(obj);
    return walk(obj);
};

function walk (obj) {
    if (!obj || typeof obj !== 'object') return obj;
    if (isDate(obj) || isRegex(obj)) return obj;
    if (isArray(obj)) return map(obj, walk);
    return reduce(objectKeys(obj), function (acc, key) {
        var camel = camelCase(key);
        acc[camel] = walk(obj[key]);
        return acc;
    }, {});
}

function camelCase(str) {
    return str.replace(/[_.-](\w|$)/g, function (_,x) {
        return x.toUpperCase();
    });
}

var isArray = Array.isArray || function (obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
};

var isDate = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Date]';
};

var isRegex = function (obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
};

var has = Object.prototype.hasOwnProperty;
var objectKeys = Object.keys || function (obj) {
    var keys = [];
    for (var key in obj) {
        if (has.call(obj, key)) keys.push(key);
    }
    return keys;
};

function map (xs, f) {
    if (xs.map) return xs.map(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        res.push(f(xs[i], i));
    }
    return res;
}

function reduce (xs, f, acc) {
    if (xs.reduce) return xs.reduce(f, acc);
    for (var i = 0; i < xs.length; i++) {
        acc = f(acc, xs[i], i);
    }
    return acc;
}

},{}],27:[function(require,module,exports){
var unproject = require('camera-unproject')
var set = require('gl-vec3/set')
var sub = require('gl-vec3/subtract')
var normalize = require('gl-vec3/normalize')

module.exports = createPickRay
function createPickRay(origin, direction, point, viewport, invProjView) {
  set(origin, point[0], point[1], 0)
  set(direction, point[0], point[1], 1)
  unproject(origin, origin, viewport, invProjView)
  unproject(direction, direction, viewport, invProjView)
  sub(direction, direction, origin)
  normalize(direction, direction)
}
},{"camera-unproject":29,"gl-vec3/normalize":57,"gl-vec3/set":60,"gl-vec3/subtract":62}],28:[function(require,module,exports){
var transformMat4 = require('gl-vec4/transformMat4')
var set = require('gl-vec4/set')

var NEAR_RANGE = 0
var FAR_RANGE = 1
var tmp4 = [0, 0, 0, 0]

module.exports = cameraProject
function cameraProject (out, vec, viewport, combinedProjView) {
  var vX = viewport[0],
    vY = viewport[1],
    vWidth = viewport[2],
    vHeight = viewport[3],
    n = NEAR_RANGE,
    f = FAR_RANGE

  // convert: clip space -> NDC -> window coords
  // implicit 1.0 for w component
  set(tmp4, vec[0], vec[1], vec[2], 1.0)

  // transform into clip space
  transformMat4(tmp4, tmp4, combinedProjView)

  // now transform into NDC
  var w = tmp4[3]
  if (w !== 0) { // how to handle infinity here?
    tmp4[0] = tmp4[0] / w
    tmp4[1] = tmp4[1] / w
    tmp4[2] = tmp4[2] / w
  }

  // and finally into window coordinates
  // the foruth component is (1/clip.w)
  // which is the same as gl_FragCoord.w
  out[0] = vX + vWidth / 2 * tmp4[0] + (0 + vWidth / 2)
  out[1] = vY + vHeight / 2 * tmp4[1] + (0 + vHeight / 2)
  out[2] = (f - n) / 2 * tmp4[2] + (f + n) / 2
  out[3] = w === 0 ? 0 : 1 / w
  return out
}

},{"gl-vec4/set":66,"gl-vec4/transformMat4":67}],29:[function(require,module,exports){
var transform = require('./lib/projectMat4')

module.exports = unproject

/**
 * Unproject a point from screen space to 3D space.
 * The point should have its x and y properties set to
 * 2D screen space, and the z either at 0 (near plane)
 * or 1 (far plane). The provided matrix is assumed to already
 * be combined, i.e. projection * view.
 *
 * After this operation, the out vector's [x, y, z] components will
 * represent the unprojected 3D coordinate.
 *
 * @param  {vec3} out               the output vector
 * @param  {vec3} vec               the 2D space vector to unproject
 * @param  {vec4} viewport          screen x, y, width and height in pixels
 * @param  {mat4} invProjectionView combined projection and view matrix
 * @return {vec3}                   the output vector
 */
function unproject (out, vec, viewport, invProjectionView) {
  var viewX = viewport[0],
    viewY = viewport[1],
    viewWidth = viewport[2],
    viewHeight = viewport[3]

  var x = vec[0],
    y = vec[1],
    z = vec[2]

  x = x - viewX
  y = viewHeight - y - 1
  y = y - viewY

  out[0] = (2 * x) / viewWidth - 1
  out[1] = (2 * y) / viewHeight - 1
  out[2] = 2 * z - 1
  return transform(out, out, invProjectionView)
}

},{"./lib/projectMat4":30}],30:[function(require,module,exports){
module.exports = project

/**
 * Multiplies the input vec by the specified matrix, 
 * applying a W divide, and stores the result in out 
 * vector. This is useful for projection,
 * e.g. unprojecting a 2D point into 3D space.
 *
 * @method  prj
 * @param {vec3} out the output vector
 * @param {vec3} vec the input vector to project
 * @param {mat4} m the 4x4 matrix to multiply with 
 * @return {vec3} the out vector
 */
function project (out, vec, m) {
  var x = vec[0],
    y = vec[1],
    z = vec[2],
    a00 = m[0], a01 = m[1], a02 = m[2], a03 = m[3],
    a10 = m[4], a11 = m[5], a12 = m[6], a13 = m[7],
    a20 = m[8], a21 = m[9], a22 = m[10], a23 = m[11],
    a30 = m[12], a31 = m[13], a32 = m[14], a33 = m[15]

  var lw = 1 / (x * a03 + y * a13 + z * a23 + a33)

  out[0] = (x * a00 + y * a10 + z * a20 + a30) * lw
  out[1] = (x * a01 + y * a11 + z * a21 + a31) * lw
  out[2] = (x * a02 + y * a12 + z * a22 + a32) * lw
  return out
}

},{}],31:[function(require,module,exports){
module.exports = clamp

function clamp(value, min, max) {
  return min < max
    ? (value < min ? min : value > max ? max : value)
    : (value < max ? max : value > min ? min : value)
}

},{}],32:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],33:[function(require,module,exports){
'use strict';
var isObj = require('is-obj');

module.exports.get = function (obj, path) {
	if (!isObj(obj) || typeof path !== 'string') {
		return obj;
	}

	var pathArr = getPathSegments(path);

	for (var i = 0; i < pathArr.length; i++) {
		var descriptor = Object.getOwnPropertyDescriptor(obj, pathArr[i]) || Object.getOwnPropertyDescriptor(Object.prototype, pathArr[i]);
		if (descriptor && !descriptor.enumerable) {
			return;
		}

		obj = obj[pathArr[i]];

		if (obj === undefined || obj === null) {
			// `obj` is either `undefined` or `null` so we want to stop the loop, and
			// if this is not the last bit of the path, and
			// if it did't return `undefined`
			// it would return `null` if `obj` is `null`
			// but we want `get({foo: null}, 'foo.bar')` to equal `undefined` not `null`
			if (i !== pathArr.length - 1) {
				return undefined;
			}

			break;
		}
	}

	return obj;
};

module.exports.set = function (obj, path, value) {
	if (!isObj(obj) || typeof path !== 'string') {
		return;
	}

	var pathArr = getPathSegments(path);

	for (var i = 0; i < pathArr.length; i++) {
		var p = pathArr[i];

		if (!isObj(obj[p])) {
			obj[p] = {};
		}

		if (i === pathArr.length - 1) {
			obj[p] = value;
		}

		obj = obj[p];
	}
};

module.exports.delete = function (obj, path) {
	if (!isObj(obj) || typeof path !== 'string') {
		return;
	}

	var pathArr = getPathSegments(path);

	for (var i = 0; i < pathArr.length; i++) {
		var p = pathArr[i];

		if (i === pathArr.length - 1) {
			delete obj[p];
			return;
		}

		obj = obj[p];
	}
};

module.exports.has = function (obj, path) {
	if (!isObj(obj) || typeof path !== 'string') {
		return false;
	}

	var pathArr = getPathSegments(path);

	for (var i = 0; i < pathArr.length; i++) {
		obj = obj[pathArr[i]];

		if (obj === undefined) {
			return false;
		}
	}

	return true;
};

function getPathSegments(path) {
	var pathArr = path.split('.');
	var parts = [];

	for (var i = 0; i < pathArr.length; i++) {
		var p = pathArr[i];

		while (p[p.length - 1] === '\\' && pathArr[i + 1] !== undefined) {
			p = p.slice(0, -1) + '.';
			p += pathArr[++i];
		}

		parts.push(p);
	}

	return parts;
}

},{"is-obj":74}],34:[function(require,module,exports){
module.exports = defaultProperty

function defaultProperty (get, set) {
  return {
    configurable: true,
    enumerable: true,
    get: get,
    set: set
  }
}

},{}],35:[function(require,module,exports){
'use strict'

var assertFn = require('assert-function')

module.exports = Ear

function Ear () {
  var callbacks = []

  function listeners () {
    var args = arguments
    var i = 0
    var length = callbacks.length
    for (; i < length; i++) {
      var callback = callbacks[i]
      callback.apply(null, args)
    }
  }

  listeners.add = function (listener) {
    assertFn(listener)
    callbacks.push(listener)
    return function remove () {
      var i = 0
      var length = callbacks.length
      for (; i < length; i++) {
        if (callbacks[i] === listener) {
          callbacks.splice(i, 1)
          return
        }
      }
    }
  }

  return listeners
}

},{"assert-function":24}],36:[function(require,module,exports){
var camelize = require("camelize")
var template = require("string-template")
var extend = require("xtend/mutable")

module.exports = TypedError

function TypedError(args) {
    if (!args) {
        throw new Error("args is required");
    }
    if (!args.type) {
        throw new Error("args.type is required");
    }
    if (!args.message) {
        throw new Error("args.message is required");
    }

    var message = args.message

    if (args.type && !args.name) {
        var errorName = camelize(args.type) + "Error"
        args.name = errorName[0].toUpperCase() + errorName.substr(1)
    }

    extend(createError, args);
    createError._name = args.name;

    return createError;

    function createError(opts) {
        var result = new Error()

        Object.defineProperty(result, "type", {
            value: result.type,
            enumerable: true,
            writable: true,
            configurable: true
        })

        var options = extend({}, args, opts)

        extend(result, options)
        result.message = template(message, options)

        return result
    }
}


},{"camelize":26,"string-template":102,"xtend/mutable":138}],37:[function(require,module,exports){
'use strict';

var OneVersionConstraint = require('individual/one-version');

var MY_VERSION = '7';
OneVersionConstraint('ev-store', MY_VERSION);

var hashKey = '__EV_STORE_KEY@' + MY_VERSION;

module.exports = EvStore;

function EvStore(elem) {
    var hash = elem[hashKey];

    if (!hash) {
        hash = elem[hashKey] = {};
    }

    return hash;
}

},{"individual/one-version":71}],38:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],39:[function(require,module,exports){
var isFunction = require('is-function')

module.exports = forEach

var toString = Object.prototype.toString
var hasOwnProperty = Object.prototype.hasOwnProperty

function forEach(list, iterator, context) {
    if (!isFunction(iterator)) {
        throw new TypeError('iterator must be a function')
    }

    if (arguments.length < 3) {
        context = this
    }
    
    if (toString.call(list) === '[object Array]')
        forEachArray(list, iterator, context)
    else if (typeof list === 'string')
        forEachString(list, iterator, context)
    else
        forEachObject(list, iterator, context)
}

function forEachArray(array, iterator, context) {
    for (var i = 0, len = array.length; i < len; i++) {
        if (hasOwnProperty.call(array, i)) {
            iterator.call(context, array[i], i, array)
        }
    }
}

function forEachString(string, iterator, context) {
    for (var i = 0, len = string.length; i < len; i++) {
        // no such thing as a sparse string.
        iterator.call(context, string.charAt(i), i, string)
    }
}

function forEachObject(object, iterator, context) {
    for (var k in object) {
        if (hasOwnProperty.call(object, k)) {
            iterator.call(context, object[k], k, object)
        }
    }
}

},{"is-function":73}],40:[function(require,module,exports){
module.exports = fromMat4

/**
 * Copies the upper-left 3x3 values into the given mat3.
 *
 * @alias mat3.fromMat4
 * @param {mat3} out the receiving 3x3 matrix
 * @param {mat4} a   the source 4x4 matrix
 * @returns {mat3} out
 */
function fromMat4(out, a) {
  out[0] = a[0]
  out[1] = a[1]
  out[2] = a[2]
  out[3] = a[4]
  out[4] = a[5]
  out[5] = a[6]
  out[6] = a[8]
  out[7] = a[9]
  out[8] = a[10]
  return out
}

},{}],41:[function(require,module,exports){
module.exports = identity;

/**
 * Set a mat4 to the identity matrix
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */
function identity(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};
},{}],42:[function(require,module,exports){
module.exports = invert;

/**
 * Inverts a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
function invert(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,

        // Calculate the determinant
        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) { 
        return null; 
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

    return out;
};
},{}],43:[function(require,module,exports){
var identity = require('./identity');

module.exports = lookAt;

/**
 * Generates a look-at matrix with the given eye position, focal point, and up axis
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {vec3} eye Position of the viewer
 * @param {vec3} center Point the viewer is looking at
 * @param {vec3} up vec3 pointing up
 * @returns {mat4} out
 */
function lookAt(out, eye, center, up) {
    var x0, x1, x2, y0, y1, y2, z0, z1, z2, len,
        eyex = eye[0],
        eyey = eye[1],
        eyez = eye[2],
        upx = up[0],
        upy = up[1],
        upz = up[2],
        centerx = center[0],
        centery = center[1],
        centerz = center[2];

    if (Math.abs(eyex - centerx) < 0.000001 &&
        Math.abs(eyey - centery) < 0.000001 &&
        Math.abs(eyez - centerz) < 0.000001) {
        return identity(out);
    }

    z0 = eyex - centerx;
    z1 = eyey - centery;
    z2 = eyez - centerz;

    len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;

    x0 = upy * z2 - upz * z1;
    x1 = upz * z0 - upx * z2;
    x2 = upx * z1 - upy * z0;
    len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
    if (!len) {
        x0 = 0;
        x1 = 0;
        x2 = 0;
    } else {
        len = 1 / len;
        x0 *= len;
        x1 *= len;
        x2 *= len;
    }

    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;

    len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
    if (!len) {
        y0 = 0;
        y1 = 0;
        y2 = 0;
    } else {
        len = 1 / len;
        y0 *= len;
        y1 *= len;
        y2 *= len;
    }

    out[0] = x0;
    out[1] = y0;
    out[2] = z0;
    out[3] = 0;
    out[4] = x1;
    out[5] = y1;
    out[6] = z1;
    out[7] = 0;
    out[8] = x2;
    out[9] = y2;
    out[10] = z2;
    out[11] = 0;
    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    out[15] = 1;

    return out;
};
},{"./identity":41}],44:[function(require,module,exports){
arguments[4][2][0].apply(exports,arguments)
},{"dup":2}],45:[function(require,module,exports){
arguments[4][3][0].apply(exports,arguments)
},{"dup":3}],46:[function(require,module,exports){
module.exports = fromMat3

/**
 * Creates a quaternion from the given 3x3 rotation matrix.
 *
 * NOTE: The resultant quaternion is not normalized, so you should be sure
 * to renormalize the quaternion yourself where necessary.
 *
 * @param {quat} out the receiving quaternion
 * @param {mat3} m rotation matrix
 * @returns {quat} out
 * @function
 */
function fromMat3 (out, m) {
  // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
  // article "Quaternion Calculus and Fast Animation".
  var fTrace = m[0] + m[4] + m[8]
  var fRoot

  if (fTrace > 0.0) {
    // |w| > 1/2, may as well choose w > 1/2
    fRoot = Math.sqrt(fTrace + 1.0)  // 2w
    out[3] = 0.5 * fRoot
    fRoot = 0.5 / fRoot  // 1/(4w)
    out[0] = (m[5] - m[7]) * fRoot
    out[1] = (m[6] - m[2]) * fRoot
    out[2] = (m[1] - m[3]) * fRoot
  } else {
    // |w| <= 1/2
    var i = 0
    if (m[4] > m[0]) {
      i = 1
    }
    if (m[8] > m[i * 3 + i]) {
      i = 2
    }
    var j = (i + 1) % 3
    var k = (i + 2) % 3

    fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1.0)
    out[i] = 0.5 * fRoot
    fRoot = 0.5 / fRoot
    out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot
    out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot
    out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot
  }

  return out
}

},{}],47:[function(require,module,exports){
module.exports = invert

/**
 * Calculates the inverse of a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate inverse of
 * @returns {quat} out
 */
function invert (out, a) {
  var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
    dot = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3,
    invDot = dot ? 1.0 / dot : 0

  // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0

  out[0] = -a0 * invDot
  out[1] = -a1 * invDot
  out[2] = -a2 * invDot
  out[3] = a3 * invDot
  return out
}

},{}],48:[function(require,module,exports){
module.exports = multiply

/**
 * Multiplies two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 */
function multiply (out, a, b) {
  var ax = a[0], ay = a[1], az = a[2], aw = a[3],
    bx = b[0], by = b[1], bz = b[2], bw = b[3]

  out[0] = ax * bw + aw * bx + ay * bz - az * by
  out[1] = ay * bw + aw * by + az * bx - ax * bz
  out[2] = az * bw + aw * bz + ax * by - ay * bx
  out[3] = aw * bw - ax * bx - ay * by - az * bz
  return out
}

},{}],49:[function(require,module,exports){
/**
 * Normalize a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quaternion to normalize
 * @returns {quat} out
 * @function
 */
module.exports = require('gl-vec4/normalize')

},{"gl-vec4/normalize":64}],50:[function(require,module,exports){
/**
 * Scales a quat by a scalar number
 *
 * @param {quat} out the receiving vector
 * @param {quat} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {quat} out
 * @function
 */
module.exports = require('gl-vec4/scale')

},{"gl-vec4/scale":65}],51:[function(require,module,exports){
module.exports = distance

/**
 * Calculates the euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} distance between a and b
 */
function distance(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1]
    return Math.sqrt(x*x + y*y)
}
},{}],52:[function(require,module,exports){
module.exports = add;

/**
 * Adds two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function add(out, a, b) {
    out[0] = a[0] + b[0]
    out[1] = a[1] + b[1]
    out[2] = a[2] + b[2]
    return out
}
},{}],53:[function(require,module,exports){
module.exports = copy;

/**
 * Copy the values from one vec3 to another
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the source vector
 * @returns {vec3} out
 */
function copy(out, a) {
    out[0] = a[0]
    out[1] = a[1]
    out[2] = a[2]
    return out
}
},{}],54:[function(require,module,exports){
module.exports = cross;

/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function cross(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2],
        bx = b[0], by = b[1], bz = b[2]

    out[0] = ay * bz - az * by
    out[1] = az * bx - ax * bz
    out[2] = ax * by - ay * bx
    return out
}
},{}],55:[function(require,module,exports){
module.exports = dot;

/**
 * Calculates the dot product of two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} dot product of a and b
 */
function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
}
},{}],56:[function(require,module,exports){
module.exports = length;

/**
 * Calculates the length of a vec3
 *
 * @param {vec3} a vector to calculate length of
 * @returns {Number} length of a
 */
function length(a) {
    var x = a[0],
        y = a[1],
        z = a[2]
    return Math.sqrt(x*x + y*y + z*z)
}
},{}],57:[function(require,module,exports){
module.exports = normalize;

/**
 * Normalize a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to normalize
 * @returns {vec3} out
 */
function normalize(out, a) {
    var x = a[0],
        y = a[1],
        z = a[2]
    var len = x*x + y*y + z*z
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len)
        out[0] = a[0] * len
        out[1] = a[1] * len
        out[2] = a[2] * len
    }
    return out
}
},{}],58:[function(require,module,exports){
module.exports = scale;

/**
 * Scales a vec3 by a scalar number
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec3} out
 */
function scale(out, a, b) {
    out[0] = a[0] * b
    out[1] = a[1] * b
    out[2] = a[2] * b
    return out
}
},{}],59:[function(require,module,exports){
module.exports = scaleAndAdd;

/**
 * Adds two vec3's after scaling the second operand by a scalar value
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec3} out
 */
function scaleAndAdd(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale)
    out[1] = a[1] + (b[1] * scale)
    out[2] = a[2] + (b[2] * scale)
    return out
}
},{}],60:[function(require,module,exports){
module.exports = set;

/**
 * Set the components of a vec3 to the given values
 *
 * @param {vec3} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} out
 */
function set(out, x, y, z) {
    out[0] = x
    out[1] = y
    out[2] = z
    return out
}
},{}],61:[function(require,module,exports){
module.exports = squaredDistance;

/**
 * Calculates the squared euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} squared distance between a and b
 */
function squaredDistance(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2]
    return x*x + y*y + z*z
}
},{}],62:[function(require,module,exports){
module.exports = subtract;

/**
 * Subtracts vector b from vector a
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function subtract(out, a, b) {
    out[0] = a[0] - b[0]
    out[1] = a[1] - b[1]
    out[2] = a[2] - b[2]
    return out
}
},{}],63:[function(require,module,exports){
module.exports = transformQuat;

/**
 * Transforms the vec3 with a quat
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec3} out
 */
function transformQuat(out, a, q) {
    // benchmarks: http://jsperf.com/quaternion-transform-vec3-implementations

    var x = a[0], y = a[1], z = a[2],
        qx = q[0], qy = q[1], qz = q[2], qw = q[3],

        // calculate quat * vec
        ix = qw * x + qy * z - qz * y,
        iy = qw * y + qz * x - qx * z,
        iz = qw * z + qx * y - qy * x,
        iw = -qx * x - qy * y - qz * z

    // calculate result * inverse quat
    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx
    return out
}
},{}],64:[function(require,module,exports){
module.exports = normalize

/**
 * Normalize a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to normalize
 * @returns {vec4} out
 */
function normalize (out, a) {
  var x = a[0],
    y = a[1],
    z = a[2],
    w = a[3]
  var len = x * x + y * y + z * z + w * w
  if (len > 0) {
    len = 1 / Math.sqrt(len)
    out[0] = x * len
    out[1] = y * len
    out[2] = z * len
    out[3] = w * len
  }
  return out
}

},{}],65:[function(require,module,exports){
module.exports = scale

/**
 * Scales a vec4 by a scalar number
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec4} out
 */
function scale (out, a, b) {
  out[0] = a[0] * b
  out[1] = a[1] * b
  out[2] = a[2] * b
  out[3] = a[3] * b
  return out
}

},{}],66:[function(require,module,exports){
module.exports = set

/**
 * Set the components of a vec4 to the given values
 *
 * @param {vec4} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} out
 */
function set (out, x, y, z, w) {
  out[0] = x
  out[1] = y
  out[2] = z
  out[3] = w
  return out
}

},{}],67:[function(require,module,exports){
module.exports = transformMat4

/**
 * Transforms the vec4 with a mat4.
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec4} out
 */
function transformMat4 (out, a, m) {
  var x = a[0], y = a[1], z = a[2], w = a[3]
  out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w
  out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w
  out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w
  out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w
  return out
}

},{}],68:[function(require,module,exports){
(function (global){
var topLevel = typeof global !== 'undefined' ? global :
    typeof window !== 'undefined' ? window : {}
var minDoc = require('min-document');

if (typeof document !== 'undefined') {
    module.exports = document;
} else {
    var doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

    if (!doccy) {
        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
    }

    module.exports = doccy;
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"min-document":25}],69:[function(require,module,exports){
(function (global){
if (typeof window !== "undefined") {
    module.exports = window;
} else if (typeof global !== "undefined") {
    module.exports = global;
} else if (typeof self !== "undefined"){
    module.exports = self;
} else {
    module.exports = {};
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],70:[function(require,module,exports){
(function (global){
'use strict';

/*global window, global*/

var root = typeof window !== 'undefined' ?
    window : typeof global !== 'undefined' ?
    global : {};

module.exports = Individual;

function Individual(key, value) {
    if (key in root) {
        return root[key];
    }

    root[key] = value;

    return value;
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],71:[function(require,module,exports){
'use strict';

var Individual = require('./index.js');

module.exports = OneVersion;

function OneVersion(moduleName, version, defaultValue) {
    var key = '__INDIVIDUAL_ONE_VERSION_' + moduleName;
    var enforceKey = key + '_ENFORCE_SINGLETON';

    var versionValue = Individual(enforceKey, version);

    if (versionValue !== version) {
        throw new Error('Can only have one copy of ' +
            moduleName + '.\n' +
            'You already have version ' + versionValue +
            ' installed.\n' +
            'This means you cannot install version ' + version);
    }

    return Individual(key, defaultValue);
}

},{"./index.js":70}],72:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],73:[function(require,module,exports){
module.exports = isFunction

var toString = Object.prototype.toString

function isFunction (fn) {
  var string = toString.call(fn)
  return string === '[object Function]' ||
    (typeof fn === 'function' && string !== '[object RegExp]') ||
    (typeof window !== 'undefined' &&
     // IE8 and below
     (fn === window.setTimeout ||
      fn === window.alert ||
      fn === window.confirm ||
      fn === window.prompt))
};

},{}],74:[function(require,module,exports){
'use strict';
module.exports = function (x) {
	var type = typeof x;
	return x !== null && (type === 'object' || type === 'function');
};

},{}],75:[function(require,module,exports){
"use strict";

module.exports = function isObject(x) {
	return typeof x === "object" && x !== null;
};

},{}],76:[function(require,module,exports){
var raf = require("raf")
var TypedError = require("error/typed")

var InvalidUpdateInRender = TypedError({
    type: "main-loop.invalid.update.in-render",
    message: "main-loop: Unexpected update occurred in loop.\n" +
        "We are currently rendering a view, " +
            "you can't change state right now.\n" +
        "The diff is: {stringDiff}.\n" +
        "SUGGESTED FIX: find the state mutation in your view " +
            "or rendering function and remove it.\n" +
        "The view should not have any side effects.\n" +
        "This may also have happened if rendering did not complete due to an error.\n",
    diff: null,
    stringDiff: null
})

module.exports = main

function main(initialState, view, opts) {
    opts = opts || {}

    var currentState = initialState
    var create = opts.create
    var diff = opts.diff
    var patch = opts.patch
    var redrawScheduled = false

    var tree = opts.initialTree || view(currentState, 0);
    var target = opts.target || create(tree, opts)
    var inRenderingTransaction = false

    currentState = null

    var loop = {
        state: initialState,
        target: target,
        update: update
    }
    return loop

    function update(state) {
        if (inRenderingTransaction) {
            throw InvalidUpdateInRender({
                diff: state._diff,
                stringDiff: JSON.stringify(state._diff)
            })
        }

        if (currentState === null && !redrawScheduled) {
            redrawScheduled = true
            raf(redraw)
        }

        currentState = state
        loop.state = state
    }

    function redraw(time) {
        redrawScheduled = false
        if (currentState === null) {
            return
        }

        inRenderingTransaction = true
        var newTree = view(currentState, time)

        if (opts.createOnly) {
            inRenderingTransaction = false
            create(newTree, opts)
        } else {
            var patches = diff(tree, newTree, opts)
            inRenderingTransaction = false
            target = patch(target, patches, opts)
        }

        tree = newTree
        currentState = null
    }
}

},{"error/typed":36,"raf":78}],77:[function(require,module,exports){
(function (process){
// Generated by CoffeeScript 1.6.3
(function() {
  var getNanoSeconds, hrtime, loadTime;

  if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
    module.exports = function() {
      return performance.now();
    };
  } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
    module.exports = function() {
      return (getNanoSeconds() - loadTime) / 1e6;
    };
    hrtime = process.hrtime;
    getNanoSeconds = function() {
      var hr;
      hr = hrtime();
      return hr[0] * 1e9 + hr[1];
    };
    loadTime = getNanoSeconds();
  } else if (Date.now) {
    module.exports = function() {
      return Date.now() - loadTime;
    };
    loadTime = Date.now();
  } else {
    module.exports = function() {
      return new Date().getTime() - loadTime;
    };
    loadTime = new Date().getTime();
  }

}).call(this);

/*

*/

}).call(this,require('_process'))
},{"_process":91}],78:[function(require,module,exports){
var now = require('performance-now')
  , global = typeof window === 'undefined' ? {} : window
  , vendors = ['moz', 'webkit']
  , suffix = 'AnimationFrame'
  , raf = global['request' + suffix]
  , caf = global['cancel' + suffix] || global['cancelRequest' + suffix]
  , isNative = true

for(var i = 0; i < vendors.length && !raf; i++) {
  raf = global[vendors[i] + 'Request' + suffix]
  caf = global[vendors[i] + 'Cancel' + suffix]
      || global[vendors[i] + 'CancelRequest' + suffix]
}

// Some versions of FF have rAF but not cAF
if(!raf || !caf) {
  isNative = false

  var last = 0
    , id = 0
    , queue = []
    , frameDuration = 1000 / 60

  raf = function(callback) {
    if(queue.length === 0) {
      var _now = now()
        , next = Math.max(0, frameDuration - (_now - last))
      last = next + _now
      setTimeout(function() {
        var cp = queue.slice(0)
        // Clear queue here to prevent
        // callbacks from appending listeners
        // to the current frame's queue
        queue.length = 0
        for(var i = 0; i < cp.length; i++) {
          if(!cp[i].cancelled) {
            try{
              cp[i].callback(last)
            } catch(e) {
              setTimeout(function() { throw e }, 0)
            }
          }
        }
      }, Math.round(next))
    }
    queue.push({
      handle: ++id,
      callback: callback,
      cancelled: false
    })
    return id
  }

  caf = function(handle) {
    for(var i = 0; i < queue.length; i++) {
      if(queue[i].handle === handle) {
        queue[i].cancelled = true
      }
    }
  }
}

module.exports = function(fn) {
  // Wrap in a new function to prevent
  // `cancel` potentially being assigned
  // to the native rAF function
  if(!isNative) {
    return raf.call(global, fn)
  }
  return raf.call(global, function() {
    try{
      fn.apply(this, arguments)
    } catch(e) {
      setTimeout(function() { throw e }, 0)
    }
  })
}
module.exports.cancel = function() {
  caf.apply(global, arguments)
}

},{"performance-now":77}],79:[function(require,module,exports){
var rootPosition = { left: 0, top: 0 }

module.exports = mouseEventOffset
function mouseEventOffset (ev, target, out) {
  target = target || ev.currentTarget || ev.srcElement
  if (!Array.isArray(out)) {
    out = [ 0, 0 ]
  }
  var cx = ev.clientX || 0
  var cy = ev.clientY || 0
  var rect = getBoundingClientOffset(target)
  out[0] = cx - rect.left
  out[1] = cy - rect.top
  return out
}

function getBoundingClientOffset (element) {
  if (element === window ||
      element === document ||
      element === document.body) {
    return rootPosition
  } else {
    return element.getBoundingClientRect()
  }
}

},{}],80:[function(require,module,exports){
'use strict'

var toPX = require('to-px')

module.exports = mouseWheelListen

function mouseWheelListen(element, callback, noScroll) {
  if(typeof element === 'function') {
    noScroll = !!callback
    callback = element
    element = window
  }
  var lineHeight = toPX('ex', element)
  var listener = function(ev) {
    if(noScroll) {
      ev.preventDefault()
    }
    var dx = ev.deltaX || 0
    var dy = ev.deltaY || 0
    var dz = ev.deltaZ || 0
    var mode = ev.deltaMode
    var scale = 1
    switch(mode) {
      case 1:
        scale = lineHeight
      break
      case 2:
        scale = window.innerHeight
      break
    }
    dx *= scale
    dy *= scale
    dz *= scale
    if(dx || dy || dz) {
      return callback(dx, dy, dz, ev)
    }
  }
  element.addEventListener('wheel', listener)
  return listener
}

},{"to-px":103}],81:[function(require,module,exports){
var defined = require('defined')
var clamp = require('clamp')

var inputEvents = require('./lib/input')
var quatFromVec3 = require('quat-from-unit-vec3')
var quatInvert = require('gl-quat/invert')

var glVec3 = {
  length: require('gl-vec3/length'),
  add: require('gl-vec3/add'),
  subtract: require('gl-vec3/subtract'),
  transformQuat: require('gl-vec3/transformQuat'),
  copy: require('gl-vec3/copy'),
  normalize: require('gl-vec3/normalize'),
  cross: require('gl-vec3/cross')
}

var Y_UP = [0, 1, 0]
var EPSILON = Math.pow(2, -23)
var tmpVec3 = [0, 0, 0]

module.exports = createOrbitControls
function createOrbitControls (opt) {
  opt = opt || {}

  var inputDelta = [0, 0, 0] // x, y, zoom
  var offset = [0, 0, 0]

  var upQuat = [0, 0, 0, 1]
  var upQuatInverse = upQuat.slice()

  var controls = {
    update: update,
    copyInto: copyInto,

    position: opt.position ? opt.position.slice() : [0, 0, 1],
    direction: [0, 0, -1],
    up: opt.up ? opt.up.slice() : [0, 1, 0],

    target: opt.target ? opt.target.slice() : [0, 0, 0],
    phi: defined(opt.phi, Math.PI / 2),
    theta: opt.theta || 0,
    distance: defined(opt.distance, 1),
    damping: defined(opt.damping, 0.25),
    rotateSpeed: defined(opt.rotateSpeed, 0.28),
    zoomSpeed: defined(opt.zoomSpeed, 0.0075),
    pinchSpeed: defined(opt.pinchSpeed, 0.0075),

    pinch: opt.pinching !== false,
    zoom: opt.zoom !== false,
    rotate: opt.rotate !== false,

    phiBounds: opt.phiBounds || [0, Math.PI],
    thetaBounds: opt.thetaBounds || [-Infinity, Infinity],
    distanceBounds: opt.distanceBounds || [0, Infinity]
  }

  // Compute distance if not defined in user options
  if (typeof opt.distance !== 'number') {
    glVec3.subtract(tmpVec3, controls.position, controls.target)
    controls.distance = glVec3.length(tmpVec3)
  }

  // Apply an initial phi and theta
  applyPhiTheta()

  const input = inputEvents({
    parent: opt.parent || window,
    element: opt.element,
    rotate: opt.rotate !== false ? inputRotate : null,
    zoom: opt.zoom !== false ? inputZoom : null,
    pinch: opt.pinch !== false ? inputPinch : null
  })

  controls.enable = input.enable
  controls.disable = input.disable

  return controls

  function inputRotate (dx, dy) {
    var PI2 = Math.PI * 2
    inputDelta[0] -= PI2 * dx * controls.rotateSpeed
    inputDelta[1] -= PI2 * dy * controls.rotateSpeed
  }

  function inputZoom (delta) {
    inputDelta[2] += delta * controls.zoomSpeed
  }

  function inputPinch (delta) {
    inputDelta[2] -= delta * controls.pinchSpeed
  }

  function update () {
    var cameraUp = controls.up || Y_UP
    quatFromVec3(upQuat, cameraUp, Y_UP)
    quatInvert(upQuatInverse, upQuat)

    var distance = controls.distance

    glVec3.subtract(offset, controls.position, controls.target)
    glVec3.transformQuat(offset, offset, upQuat)

    var theta = Math.atan2(offset[0], offset[2])
    var phi = Math.atan2(Math.sqrt(offset[0] * offset[0] + offset[2] * offset[2]), offset[1])

    theta += inputDelta[0]
    phi += inputDelta[1]

    theta = clamp(theta, controls.thetaBounds[0], controls.thetaBounds[1])
    phi = clamp(phi, controls.phiBounds[0], controls.phiBounds[1])
    phi = clamp(phi, EPSILON, Math.PI - EPSILON)

    distance += inputDelta[2]
    distance = clamp(distance, controls.distanceBounds[0], controls.distanceBounds[1])

    var radius = Math.abs(distance) <= EPSILON ? EPSILON : distance
    offset[0] = radius * Math.sin(phi) * Math.sin(theta)
    offset[1] = radius * Math.cos(phi)
    offset[2] = radius * Math.sin(phi) * Math.cos(theta)

    controls.phi = phi
    controls.theta = theta
    controls.distance = distance

    glVec3.transformQuat(offset, offset, upQuatInverse)
    glVec3.add(controls.position, controls.target, offset)
    camLookAt(controls.direction, cameraUp, controls.position, controls.target)

    var damp = typeof controls.damping === 'number' ? controls.damping : 1
    for (var i = 0; i < inputDelta.length; i++) {
      inputDelta[i] *= 1 - damp
    }
  }

  function copyInto (position, direction, up) {
    if (position) glVec3.copy(position, controls.position)
    if (direction) glVec3.copy(direction, controls.direction)
    if (up) glVec3.copy(up, controls.up)
  }

  function applyPhiTheta () {
    var dist = Math.max(EPSILON, controls.distance)
    controls.position[0] = dist * Math.sin(controls.phi) * Math.sin(controls.theta)
    controls.position[1] = dist * Math.cos(controls.phi)
    controls.position[2] = dist * Math.sin(controls.phi) * Math.cos(controls.theta)
    glVec3.add(controls.position, controls.position, controls.target)
  }
}

function camLookAt (direction, up, position, target) {
  glVec3.copy(direction, target)
  glVec3.subtract(direction, direction, position)
  glVec3.normalize(direction, direction)
}

},{"./lib/input":82,"clamp":31,"defined":32,"gl-quat/invert":47,"gl-vec3/add":52,"gl-vec3/copy":53,"gl-vec3/cross":54,"gl-vec3/length":56,"gl-vec3/normalize":57,"gl-vec3/subtract":62,"gl-vec3/transformQuat":63,"quat-from-unit-vec3":92}],82:[function(require,module,exports){
var mouseWheel = require('mouse-wheel')
var eventOffset = require('mouse-event-offset')
var createPinch = require('touch-pinch')

module.exports = inputEvents
function inputEvents (opt) {
  var element = opt.element || window
  var parent = opt.parent || element
  var mouseStart = [0, 0]
  var dragging = false
  var tmp = [0, 0]
  var tmp2 = [0, 0]
  var pinch

  var zoomFn = opt.zoom
  var rotateFn = opt.rotate
  var pinchFn = opt.pinch
  var mouseWheelListener
  var enabled = false
  enable()

  return {
    enable: enable,
    disable: disable
  }

  function enable () {
    if (enabled) return
    enabled = true
    if (zoomFn) {
      mouseWheelListener = mouseWheel(element, function (dx, dy) {
        zoomFn(dy)
      }, true)
    }

    if (rotateFn) {
      // for dragging to work outside canvas bounds,
      // mouse events have to be added to parent
      parent.addEventListener('mousedown', onInputDown, false)
      parent.addEventListener('mousemove', onInputMove, false)
      parent.addEventListener('mouseup', onInputUp, false)
    }

    if (rotateFn || pinchFn) {
      pinch = createPinch(element)

      // don't allow simulated mouse events
      element.addEventListener('touchstart', preventDefault, false)

      if (rotateFn) {
        element.addEventListener('touchmove', onTouchMove, false)
        pinch.on('place', onPinchPlace)
        pinch.on('lift', onPinchLift)
      }
      if (pinchFn) {
        pinch.on('change', onPinchChange)
      }
    }
  }

  function disable () {
    if (!enabled) return
    enabled = false
    if (mouseWheelListener) {
      element.removeEventListener('wheel', mouseWheelListener)
    }
    if (pinch) {
      pinch.disable()
      element.removeEventListener('touchstart', preventDefault, false)
      if (rotateFn) {
        element.removeEventListener('touchmove', onTouchMove, false)
      }
    }
    if (rotateFn) {
      parent.removeEventListener('mousedown', onInputDown, false)
      parent.removeEventListener('mousemove', onInputMove, false)
      parent.removeEventListener('mouseup', onInputUp, false)
    }
  }

  function preventDefault (ev) {
    ev.preventDefault()
  }

  function onTouchMove (ev) {
    if (!dragging || isPinching()) return

    // find currently active finger
    for (var i = 0; i < ev.changedTouches.length; i++) {
      var changed = ev.changedTouches[i]
      var idx = pinch.indexOfTouch(changed)
      // if pinch is disabled but rotate enabled,
      // only allow first finger to affect rotation
      var allow = pinchFn ? idx !== -1 : idx === 0
      if (allow) {
        onInputMove(changed)
        break
      }
    }
  }

  function onPinchPlace (newFinger, lastFinger) {
    dragging = !isPinching()
    if (dragging) {
      var firstFinger = lastFinger || newFinger
      onInputDown(firstFinger)
    }
  }

  function onPinchLift (lifted, remaining) {
    dragging = !isPinching()
    if (dragging && remaining) {
      eventOffset(remaining, element, mouseStart)
    }
  }

  function isPinching () {
    return pinch.pinching && pinchFn
  }

  function onPinchChange (current, prev) {
    pinchFn(current - prev)
  }

  function onInputDown (ev) {
    eventOffset(ev, element, mouseStart)
    if (insideBounds(mouseStart)) {
      dragging = true
    }
  }

  function onInputUp () {
    dragging = false
  }

  function onInputMove (ev) {
    var end = eventOffset(ev, element, tmp)
    if (pinch && isPinching()) {
      mouseStart = end
      return
    }
    if (!dragging) return
    var rect = getClientSize(tmp2)
    var dx = (end[0] - mouseStart[0]) / rect[0]
    var dy = (end[1] - mouseStart[1]) / rect[1]
    rotateFn(dx, dy)
    mouseStart[0] = end[0]
    mouseStart[1] = end[1]
  }

  function insideBounds (pos) {
    if (element === window ||
        element === document ||
        element === document.body) {
      return true
    } else {
      var rect = element.getBoundingClientRect()
      return pos[0] >= 0 && pos[1] >= 0 &&
        pos[0] < rect.width && pos[1] < rect.height
    }
  }

  function getClientSize (out) {
    var source = element
    if (source === window ||
        source === document ||
        source === document.body) {
      source = document.documentElement
    }
    out[0] = source.clientWidth
    out[1] = source.clientHeight
    return out
  }
}

},{"mouse-event-offset":79,"mouse-wheel":80,"touch-pinch":104}],83:[function(require,module,exports){
var trim = require('trim')
  , forEach = require('for-each')
  , isArray = function(arg) {
      return Object.prototype.toString.call(arg) === '[object Array]';
    }

module.exports = function (headers) {
  if (!headers)
    return {}

  var result = {}

  forEach(
      trim(headers).split('\n')
    , function (row) {
        var index = row.indexOf(':')
          , key = trim(row.slice(0, index)).toLowerCase()
          , value = trim(row.slice(index + 1))

        if (typeof(result[key]) === 'undefined') {
          result[key] = value
        } else if (isArray(result[key])) {
          result[key].push(value)
        } else {
          result[key] = [ result[key], value ]
        }
      }
  )

  return result
}
},{"for-each":39,"trim":106}],84:[function(require,module,exports){
module.exports = function parseUnit(str, out) {
    if (!out)
        out = [ 0, '' ]

    str = String(str)
    var num = parseFloat(str, 10)
    out[0] = num
    out[1] = str.match(/[\d.\-\+]*\s*(.*)/)[1] || ''
    return out
}
},{}],85:[function(require,module,exports){
(function (process){
// Generated by CoffeeScript 1.7.1
(function() {
  var getNanoSeconds, hrtime, loadTime;

  if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
    module.exports = function() {
      return performance.now();
    };
  } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
    module.exports = function() {
      return (getNanoSeconds() - loadTime) / 1e6;
    };
    hrtime = process.hrtime;
    getNanoSeconds = function() {
      var hr;
      hr = hrtime();
      return hr[0] * 1e9 + hr[1];
    };
    loadTime = getNanoSeconds();
  } else if (Date.now) {
    module.exports = function() {
      return Date.now() - loadTime;
    };
    loadTime = Date.now();
  } else {
    module.exports = function() {
      return new Date().getTime() - loadTime;
    };
    loadTime = new Date().getTime();
  }

}).call(this);

}).call(this,require('_process'))
},{"_process":91}],86:[function(require,module,exports){
module.exports = require('./lib/camera-perspective')

},{"./lib/camera-perspective":89}],87:[function(require,module,exports){
var assign = require('object-assign')
var Ray = require('ray-3d')

var cameraProject = require('camera-project')
var cameraUnproject = require('camera-unproject')
var cameraLookAt = require('./camera-look-at')
var cameraPickRay = require('camera-picking-ray')

var add = require('gl-vec3/add')
var multiply4x4 = require('gl-mat4/multiply')
var invert4x4 = require('gl-mat4/invert')
var identity4x4 = require('gl-mat4/identity')
var setVec3 = require('gl-vec3/set')

// this could also be useful for a orthographic camera
module.exports = function cameraBase (opt) {
  opt = opt || {}

  var camera = {
    projection: identity4x4([]),
    view: identity4x4([]),
    position: opt.position || [0, 0, 0],
    direction: opt.direction || [0, 0, -1],
    up: opt.up || [0, 1, 0],
    viewport: opt.viewport || [ -1, -1, 1, 1 ],
    projView: identity4x4([]),
    invProjView: identity4x4([])
  }

  function update () {
    multiply4x4(camera.projView, camera.projection, camera.view)
    var valid = invert4x4(camera.invProjView, camera.projView)
    if (!valid) {
      throw new Error('camera projection * view is non-invertible')
    }
  }

  function lookAt (target) {
    cameraLookAt(camera.direction, camera.up, camera.position, target)
    return camera
  }

  function identity () {
    setVec3(camera.position, 0, 0, 0)
    setVec3(camera.direction, 0, 0, -1)
    setVec3(camera.up, 0, 1, 0)
    identity4x4(camera.view)
    identity4x4(camera.projection)
    identity4x4(camera.projView)
    identity4x4(camera.invProjView)
    return camera
  }

  function translate (vec) {
    add(camera.position, camera.position, vec)
    return camera
  }

  function createPickingRay (mouse) {
    var ray = new Ray()
    cameraPickRay(ray.origin, ray.direction, mouse, camera.viewport, camera.invProjView)
    return ray
  }

  function project (point) {
    return cameraProject([], point, camera.viewport, camera.projView)
  }

  function unproject (point) {
    return cameraUnproject([], point, camera.viewport, camera.invProjView)
  }

  return assign(camera, {
    translate: translate,
    identity: identity,
    lookAt: lookAt,
    createPickingRay: createPickingRay,
    update: update,
    project: project,
    unproject: unproject
  })
}

},{"./camera-look-at":88,"camera-picking-ray":27,"camera-project":28,"camera-unproject":29,"gl-mat4/identity":41,"gl-mat4/invert":42,"gl-mat4/multiply":44,"gl-vec3/add":52,"gl-vec3/set":60,"object-assign":90,"ray-3d":95}],88:[function(require,module,exports){
// could be modularized...
var cross = require('gl-vec3/cross')
var sub = require('gl-vec3/subtract')
var normalize = require('gl-vec3/normalize')
var copy = require('gl-vec3/copy')
var dot = require('gl-vec3/dot')
var scale = require('gl-vec3/scale')

var tmp = [0, 0, 0]
var epsilon = 0.000000001

// modifies direction & up vectors in place
module.exports = function (direction, up, position, target) {
  sub(tmp, target, position)
  normalize(tmp, tmp)
  var isZero = tmp[0] === 0 && tmp[1] === 0 && tmp[2] === 0
  if (!isZero) {
    var d = dot(tmp, up)
    if (Math.abs(d - 1) < epsilon) { // collinear
      scale(up, direction, -1)
    } else if (Math.abs(d + 1) < epsilon) { // collinear opposite
      copy(up, direction)
    }
    copy(direction, tmp)

    // normalize up vector
    cross(tmp, direction, up)
    normalize(tmp, tmp)

    cross(up, tmp, direction)
    normalize(up, up)
  }
}

},{"gl-vec3/copy":53,"gl-vec3/cross":54,"gl-vec3/dot":55,"gl-vec3/normalize":57,"gl-vec3/scale":58,"gl-vec3/subtract":62}],89:[function(require,module,exports){
var create = require('./camera-base')
var assign = require('object-assign')
var defined = require('defined')

var perspective = require('gl-mat4/perspective')
var lookAt4x4 = require('gl-mat4/lookAt')
var add = require('gl-vec3/add')

module.exports = function cameraPerspective (opt) {
  opt = opt || {}

  var camera = create(opt)
  camera.fov = defined(opt.fov, Math.PI / 4)
  camera.near = defined(opt.near, 1)
  camera.far = defined(opt.far, 100)

  var center = [0, 0, 0]

  var updateCombined = camera.update

  function update () {
    var aspect = camera.viewport[2] / camera.viewport[3]

    // build projection matrix
    perspective(camera.projection, camera.fov, aspect, Math.abs(camera.near), Math.abs(camera.far))

    // build view matrix
    add(center, camera.position, camera.direction)
    lookAt4x4(camera.view, camera.position, center, camera.up)

    // update projection * view and invert
    updateCombined()
    return camera
  }

  // set it up initially from constructor options
  update()
  return assign(camera, {
    update: update
  })
}

},{"./camera-base":87,"defined":32,"gl-mat4/lookAt":43,"gl-mat4/perspective":45,"gl-vec3/add":52,"object-assign":90}],90:[function(require,module,exports){
'use strict';

function ToObject(val) {
	if (val == null) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

module.exports = Object.assign || function (target, source) {
	var from;
	var keys;
	var to = ToObject(target);

	for (var s = 1; s < arguments.length; s++) {
		from = arguments[s];
		keys = Object.keys(Object(from));

		for (var i = 0; i < keys.length; i++) {
			to[keys[i]] = from[keys[i]];
		}
	}

	return to;
};

},{}],91:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],92:[function(require,module,exports){
// Original implementation:
// http://lolengine.net/blog/2014/02/24/quaternion-from-two-vectors-final

var dot = require('gl-vec3/dot')
var set = require('gl-vec3/set')
var normalize = require('gl-quat/normalize')
var cross = require('gl-vec3/cross')

var tmp = [0, 0, 0]
var EPS = 1e-6

module.exports = quatFromUnitVec3
function quatFromUnitVec3 (out, a, b) {
  // assumes a and b are normalized
  var r = dot(a, b) + 1
  if (r < EPS) {
    /* If u and v are exactly opposite, rotate 180 degrees
     * around an arbitrary orthogonal axis. Axis normalisation
     * can happen later, when we normalise the quaternion. */
    r = 0
    if (Math.abs(a[0]) > Math.abs(a[2])) {
      set(tmp, -a[1], a[0], 0)
    } else {
      set(tmp, 0, -a[2], a[1])
    }
  } else {
    /* Otherwise, build quaternion the standard way. */
    cross(tmp, a, b)
  }

  out[0] = tmp[0]
  out[1] = tmp[1]
  out[2] = tmp[2]
  out[3] = r
  normalize(out, out)
  return out
}

},{"gl-quat/normalize":49,"gl-vec3/cross":54,"gl-vec3/dot":55,"gl-vec3/set":60}],93:[function(require,module,exports){
var inherits = require('inherits')
var EventEmitter = require('events').EventEmitter
var now = require('right-now')
var raf = require('raf')

module.exports = Engine
function Engine(fn) {
    if (!(this instanceof Engine)) 
        return new Engine(fn)
    this.running = false
    this.last = now()
    this._frame = 0
    this._tick = this.tick.bind(this)

    if (fn)
        this.on('tick', fn)
}

inherits(Engine, EventEmitter)

Engine.prototype.start = function() {
    if (this.running) 
        return
    this.running = true
    this.last = now()
    this._frame = raf(this._tick)
    return this
}

Engine.prototype.stop = function() {
    this.running = false
    if (this._frame !== 0)
        raf.cancel(this._frame)
    this._frame = 0
    return this
}

Engine.prototype.tick = function() {
    this._frame = raf(this._tick)
    var time = now()
    var dt = time - this.last
    this.emit('tick', dt)
    this.last = time
}
},{"events":38,"inherits":72,"raf":94,"right-now":100}],94:[function(require,module,exports){
(function (global){
var now = require('performance-now')
  , root = typeof window === 'undefined' ? global : window
  , vendors = ['moz', 'webkit']
  , suffix = 'AnimationFrame'
  , raf = root['request' + suffix]
  , caf = root['cancel' + suffix] || root['cancelRequest' + suffix]

for(var i = 0; !raf && i < vendors.length; i++) {
  raf = root[vendors[i] + 'Request' + suffix]
  caf = root[vendors[i] + 'Cancel' + suffix]
      || root[vendors[i] + 'CancelRequest' + suffix]
}

// Some versions of FF have rAF but not cAF
if(!raf || !caf) {
  var last = 0
    , id = 0
    , queue = []
    , frameDuration = 1000 / 60

  raf = function(callback) {
    if(queue.length === 0) {
      var _now = now()
        , next = Math.max(0, frameDuration - (_now - last))
      last = next + _now
      setTimeout(function() {
        var cp = queue.slice(0)
        // Clear queue here to prevent
        // callbacks from appending listeners
        // to the current frame's queue
        queue.length = 0
        for(var i = 0; i < cp.length; i++) {
          if(!cp[i].cancelled) {
            try{
              cp[i].callback(last)
            } catch(e) {
              setTimeout(function() { throw e }, 0)
            }
          }
        }
      }, Math.round(next))
    }
    queue.push({
      handle: ++id,
      callback: callback,
      cancelled: false
    })
    return id
  }

  caf = function(handle) {
    for(var i = 0; i < queue.length; i++) {
      if(queue[i].handle === handle) {
        queue[i].cancelled = true
      }
    }
  }
}

module.exports = function(fn) {
  // Wrap in a new function to prevent
  // `cancel` potentially being assigned
  // to the native rAF function
  return raf.call(root, fn)
}
module.exports.cancel = function() {
  caf.apply(root, arguments)
}
module.exports.polyfill = function() {
  root.requestAnimationFrame = raf
  root.cancelAnimationFrame = caf
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"performance-now":85}],95:[function(require,module,exports){
var intersectRayTriangle = require('ray-triangle-intersection')
var intersectRayPlane = require('ray-plane-intersection')
var intersectRaySphere = require('ray-sphere-intersection')
var intersectRayBox = require('ray-aabb-intersection')
var copy3 = require('gl-vec3/copy')

var tmpTriangle = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
]

var tmp3 = [0, 0, 0]

module.exports = Ray
function Ray (origin, direction) {
  this.origin = origin || [ 0, 0, 0 ]
  this.direction = direction || [ 0, 0, -1 ]
}

Ray.prototype.set = function (origin, direction) {
  this.origin = origin
  this.direction = direction
}

Ray.prototype.copy = function (other) {
  copy3(this.origin, other.origin)
  copy3(this.direction, other.direction)
}

Ray.prototype.clone = function () {
  var other = new Ray()
  other.copy(this)
  return other
}

Ray.prototype.intersectsSphere = function (center, radius) {
  return intersectRaySphere(tmp3, this.origin, this.direction, center, radius)
}

Ray.prototype.intersectsPlane = function (normal, distance) {
  return intersectRayPlane(tmp3, this.origin, this.direction, normal, distance)
}

Ray.prototype.intersectsTriangle = function (triangle) {
  return intersectRayTriangle(tmp3, this.origin, this.direction, triangle)
}

Ray.prototype.intersectsBox = function (aabb) {
  return intersectRayBox(tmp3, this.origin, this.direction, aabb)
}

Ray.prototype.intersectsTriangleCell = function (cell, positions) {
  var a = cell[0], b = cell[1], c = cell[2]
  tmpTriangle[0] = positions[a]
  tmpTriangle[1] = positions[b]
  tmpTriangle[2] = positions[c]
  return this.intersectsTriangle(tmpTriangle)
}

},{"gl-vec3/copy":53,"ray-aabb-intersection":96,"ray-plane-intersection":97,"ray-sphere-intersection":98,"ray-triangle-intersection":99}],96:[function(require,module,exports){
module.exports = intersection
module.exports.distance = distance

function intersection (out, ro, rd, aabb) {
  var d = distance(ro, rd, aabb)
  if (d === Infinity) {
    out = null
  } else {
    out = out || []
    for (var i = 0; i < ro.length; i++) {
      out[i] = ro[i] + rd[i] * d
    }
  }

  return out
}

function distance (ro, rd, aabb) {
  var dims = ro.length
  var lo = -Infinity
  var hi = +Infinity

  for (var i = 0; i < dims; i++) {
    var dimLo = (aabb[0][i] - ro[i]) / rd[i]
    var dimHi = (aabb[1][i] - ro[i]) / rd[i]

    if (dimLo > dimHi) {
      var tmp = dimLo
      dimLo = dimHi
      dimHi = tmp
    }

    if (dimHi < lo || dimLo > hi) {
      return Infinity
    }

    if (dimLo > lo) lo = dimLo
    if (dimHi < hi) hi = dimHi
  }

  return lo > hi ? Infinity : lo
}

},{}],97:[function(require,module,exports){
var dot = require('gl-vec3/dot')
var add = require('gl-vec3/add')
var scale = require('gl-vec3/scale')
var copy = require('gl-vec3/copy')

module.exports = intersectRayPlane

var v0 = [0, 0, 0]

function intersectRayPlane(out, origin, direction, normal, dist) {
  var denom = dot(direction, normal)
  if (denom !== 0) {
    var t = -(dot(origin, normal) + dist) / denom
    if (t < 0) {
      return null
    }
    scale(v0, direction, t)
    return add(out, origin, v0)
  } else if (dot(normal, origin) + dist === 0) {
    return copy(out, origin)
  } else {
    return null
  }
}

},{"gl-vec3/add":52,"gl-vec3/copy":53,"gl-vec3/dot":55,"gl-vec3/scale":58}],98:[function(require,module,exports){
var squaredDist = require('gl-vec3/squaredDistance')
var dot = require('gl-vec3/dot')
var sub = require('gl-vec3/subtract')
var scaleAndAdd = require('gl-vec3/scaleAndAdd')
var scale = require('gl-vec3/scale')
var add = require('gl-vec3/add')

var tmp = [0, 0, 0]

module.exports = intersectRaySphere
function intersectRaySphere (out, origin, direction, center, radius) {
  sub(tmp, center, origin)
  var len = dot(direction, tmp)
  if (len < 0) { // sphere is behind ray
    return null
  }

  scaleAndAdd(tmp, origin, direction, len)
  var dSq = squaredDist(center, tmp)
  var rSq = radius * radius
  if (dSq > rSq) {
    return null
  }

  scale(out, direction, len - Math.sqrt(rSq - dSq))
  return add(out, out, origin)
}

},{"gl-vec3/add":52,"gl-vec3/dot":55,"gl-vec3/scale":58,"gl-vec3/scaleAndAdd":59,"gl-vec3/squaredDistance":61,"gl-vec3/subtract":62}],99:[function(require,module,exports){
var cross = require('gl-vec3/cross');
var dot = require('gl-vec3/dot');
var sub = require('gl-vec3/subtract');

var EPSILON = 0.000001;
var edge1 = [0,0,0];
var edge2 = [0,0,0];
var tvec = [0,0,0];
var pvec = [0,0,0];
var qvec = [0,0,0];

module.exports = intersectTriangle;

function intersectTriangle (out, pt, dir, tri) {
    sub(edge1, tri[1], tri[0]);
    sub(edge2, tri[2], tri[0]);
    
    cross(pvec, dir, edge2);
    var det = dot(edge1, pvec);
    
    if (det < EPSILON) return null;
    sub(tvec, pt, tri[0]);
    var u = dot(tvec, pvec);
    if (u < 0 || u > det) return null;
    cross(qvec, tvec, edge1);
    var v = dot(dir, qvec);
    if (v < 0 || u + v > det) return null;
    
    var t = dot(edge2, qvec) / det;
    out[0] = pt[0] + t * dir[0];
    out[1] = pt[1] + t * dir[1];
    out[2] = pt[2] + t * dir[2];
    return out;
}

},{"gl-vec3/cross":54,"gl-vec3/dot":55,"gl-vec3/subtract":62}],100:[function(require,module,exports){
(function (global){
module.exports =
  global.performance &&
  global.performance.now ? function now() {
    return performance.now()
  } : Date.now || function now() {
    return +new Date
  }

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],101:[function(require,module,exports){
var Listeners = require('ear')
var dotProp = require('dot-prop')
var extend = require('xtend')
var traverse = require('traverse')

module.exports = State

function State (initialState) {
  this.__ImmutableState__ = extend({}, initialState)
  this.listeners = Listeners()
}

State.prototype.addListener = function (listener) {
  return this.listeners.add(listener) // Returns function to removeListener()
}

State.prototype.set = function (key, value) {
  if (arguments.length === 2) {
    // If a key and value were provided we use dot-prop
    dotProp.set(this.__ImmutableState__, key, value)
  } else {
    // If only a value was provided we overwrite state
    this.__ImmutableState__ = traverse.clone(key)
  }
  this.listeners(this.get())
}

State.prototype.get = function () {
  return traverse.clone(this.__ImmutableState__)
}

State.prototype.del = function (key) {
  dotProp.delete(this.__ImmutableState__, key)
  this.listeners(this.get())
}

},{"dot-prop":33,"ear":35,"traverse":105,"xtend":137}],102:[function(require,module,exports){
var nargs = /\{([0-9a-zA-Z]+)\}/g
var slice = Array.prototype.slice

module.exports = template

function template(string) {
    var args

    if (arguments.length === 2 && typeof arguments[1] === "object") {
        args = arguments[1]
    } else {
        args = slice.call(arguments, 1)
    }

    if (!args || !args.hasOwnProperty) {
        args = {}
    }

    return string.replace(nargs, function replaceArg(match, i, index) {
        var result

        if (string[index - 1] === "{" &&
            string[index + match.length] === "}") {
            return i
        } else {
            result = args.hasOwnProperty(i) ? args[i] : null
            if (result === null || result === undefined) {
                return ""
            }

            return result
        }
    })
}

},{}],103:[function(require,module,exports){
'use strict'

var parseUnit = require('parse-unit')

module.exports = toPX

var PIXELS_PER_INCH = 96

function getPropertyInPX(element, prop) {
  var parts = parseUnit(getComputedStyle(element).getPropertyValue(prop))
  return parts[0] * toPX(parts[1], element)
}

//This brutal hack is needed
function getSizeBrutal(unit, element) {
  var testDIV = document.createElement('div')
  testDIV.style['font-size'] = '128' + unit
  element.appendChild(testDIV)
  var size = getPropertyInPX(testDIV, 'font-size') / 128
  element.removeChild(testDIV)
  return size
}

function toPX(str, element) {
  element = element || document.body
  str = (str || 'px').trim().toLowerCase()
  if(element === window || element === document) {
    element = document.body 
  }
  switch(str) {
    case '%':  //Ambiguous, not sure if we should use width or height
      return element.clientHeight / 100.0
    case 'ch':
    case 'ex':
      return getSizeBrutal(str, element)
    case 'em':
      return getPropertyInPX(element, 'font-size')
    case 'rem':
      return getPropertyInPX(document.body, 'font-size')
    case 'vw':
      return window.innerWidth/100
    case 'vh':
      return window.innerHeight/100
    case 'vmin':
      return Math.min(window.innerWidth, window.innerHeight) / 100
    case 'vmax':
      return Math.max(window.innerWidth, window.innerHeight) / 100
    case 'in':
      return PIXELS_PER_INCH
    case 'cm':
      return PIXELS_PER_INCH / 2.54
    case 'mm':
      return PIXELS_PER_INCH / 25.4
    case 'pt':
      return PIXELS_PER_INCH / 72
    case 'pc':
      return PIXELS_PER_INCH / 6
  }
  return 1
}
},{"parse-unit":84}],104:[function(require,module,exports){
var getDistance = require('gl-vec2/distance')
var EventEmitter = require('events').EventEmitter
var dprop = require('dprop')
var eventOffset = require('mouse-event-offset')

module.exports = touchPinch
function touchPinch (target) {
  target = target || window

  var emitter = new EventEmitter()
  var fingers = [ null, null ]
  var activeCount = 0

  var lastDistance = 0
  var ended = false
  var enabled = false

  // some read-only values
  Object.defineProperties(emitter, {
    pinching: dprop(function () {
      return activeCount === 2
    }),

    fingers: dprop(function () {
      return fingers
    })
  })

  enable()
  emitter.enable = enable
  emitter.disable = disable
  emitter.indexOfTouch = indexOfTouch
  return emitter

  function indexOfTouch (touch) {
    var id = touch.identifier
    for (var i = 0; i < fingers.length; i++) {
      if (fingers[i] &&
        fingers[i].touch &&
        fingers[i].touch.identifier === id) {
        return i
      }
    }
    return -1
  }

  function enable () {
    if (enabled) return
    enabled = true
    target.addEventListener('touchstart', onTouchStart, false)
    target.addEventListener('touchmove', onTouchMove, false)
    target.addEventListener('touchend', onTouchRemoved, false)
    target.addEventListener('touchcancel', onTouchRemoved, false)
  }

  function disable () {
    if (!enabled) return
    enabled = false
    target.removeEventListener('touchstart', onTouchStart, false)
    target.removeEventListener('touchmove', onTouchMove, false)
    target.removeEventListener('touchend', onTouchRemoved, false)
    target.removeEventListener('touchcancel', onTouchRemoved, false)
  }

  function onTouchStart (ev) {
    for (var i = 0; i < ev.changedTouches.length; i++) {
      var newTouch = ev.changedTouches[i]
      var id = newTouch.identifier
      var idx = indexOfTouch(id)

      if (idx === -1 && activeCount < 2) {
        var first = activeCount === 0

        // newest and previous finger (previous may be undefined)
        var newIndex = fingers[0] ? 1 : 0
        var oldIndex = fingers[0] ? 0 : 1
        var newFinger = new Finger()

        // add to stack
        fingers[newIndex] = newFinger
        activeCount++

        // update touch event & position
        newFinger.touch = newTouch
        eventOffset(newTouch, target, newFinger.position)

        var oldTouch = fingers[oldIndex] ? fingers[oldIndex].touch : undefined
        emitter.emit('place', newTouch, oldTouch)

        if (!first) {
          var initialDistance = computeDistance()
          ended = false
          emitter.emit('start', initialDistance)
          lastDistance = initialDistance
        }
      }
    }
  }

  function onTouchMove (ev) {
    var changed = false
    for (var i = 0; i < ev.changedTouches.length; i++) {
      var movedTouch = ev.changedTouches[i]
      var idx = indexOfTouch(movedTouch)
      if (idx !== -1) {
        changed = true
        fingers[idx].touch = movedTouch // avoid caching touches
        eventOffset(movedTouch, target, fingers[idx].position)
      }
    }

    if (activeCount === 2 && changed) {
      var currentDistance = computeDistance()
      emitter.emit('change', currentDistance, lastDistance)
      lastDistance = currentDistance
    }
  }

  function onTouchRemoved (ev) {
    for (var i = 0; i < ev.changedTouches.length; i++) {
      var removed = ev.changedTouches[i]
      var idx = indexOfTouch(removed)

      if (idx !== -1) {
        fingers[idx] = null
        activeCount--
        var otherIdx = idx === 0 ? 1 : 0
        var otherTouch = fingers[otherIdx] ? fingers[otherIdx].touch : undefined
        emitter.emit('lift', removed, otherTouch)
      }
    }

    if (!ended && activeCount !== 2) {
      ended = true
      emitter.emit('end')
    }
  }

  function computeDistance () {
    if (activeCount < 2) return 0
    return getDistance(fingers[0].position, fingers[1].position)
  }
}

function Finger () {
  this.position = [0, 0]
  this.touch = null
}

},{"dprop":34,"events":38,"gl-vec2/distance":51,"mouse-event-offset":79}],105:[function(require,module,exports){
var traverse = module.exports = function (obj) {
    return new Traverse(obj);
};

function Traverse (obj) {
    this.value = obj;
}

Traverse.prototype.get = function (ps) {
    var node = this.value;
    for (var i = 0; i < ps.length; i ++) {
        var key = ps[i];
        if (!node || !hasOwnProperty.call(node, key)) {
            node = undefined;
            break;
        }
        node = node[key];
    }
    return node;
};

Traverse.prototype.has = function (ps) {
    var node = this.value;
    for (var i = 0; i < ps.length; i ++) {
        var key = ps[i];
        if (!node || !hasOwnProperty.call(node, key)) {
            return false;
        }
        node = node[key];
    }
    return true;
};

Traverse.prototype.set = function (ps, value) {
    var node = this.value;
    for (var i = 0; i < ps.length - 1; i ++) {
        var key = ps[i];
        if (!hasOwnProperty.call(node, key)) node[key] = {};
        node = node[key];
    }
    node[ps[i]] = value;
    return value;
};

Traverse.prototype.map = function (cb) {
    return walk(this.value, cb, true);
};

Traverse.prototype.forEach = function (cb) {
    this.value = walk(this.value, cb, false);
    return this.value;
};

Traverse.prototype.reduce = function (cb, init) {
    var skip = arguments.length === 1;
    var acc = skip ? this.value : init;
    this.forEach(function (x) {
        if (!this.isRoot || !skip) {
            acc = cb.call(this, acc, x);
        }
    });
    return acc;
};

Traverse.prototype.paths = function () {
    var acc = [];
    this.forEach(function (x) {
        acc.push(this.path); 
    });
    return acc;
};

Traverse.prototype.nodes = function () {
    var acc = [];
    this.forEach(function (x) {
        acc.push(this.node);
    });
    return acc;
};

Traverse.prototype.clone = function () {
    var parents = [], nodes = [];
    
    return (function clone (src) {
        for (var i = 0; i < parents.length; i++) {
            if (parents[i] === src) {
                return nodes[i];
            }
        }
        
        if (typeof src === 'object' && src !== null) {
            var dst = copy(src);
            
            parents.push(src);
            nodes.push(dst);
            
            forEach(objectKeys(src), function (key) {
                dst[key] = clone(src[key]);
            });
            
            parents.pop();
            nodes.pop();
            return dst;
        }
        else {
            return src;
        }
    })(this.value);
};

function walk (root, cb, immutable) {
    var path = [];
    var parents = [];
    var alive = true;
    
    return (function walker (node_) {
        var node = immutable ? copy(node_) : node_;
        var modifiers = {};
        
        var keepGoing = true;
        
        var state = {
            node : node,
            node_ : node_,
            path : [].concat(path),
            parent : parents[parents.length - 1],
            parents : parents,
            key : path.slice(-1)[0],
            isRoot : path.length === 0,
            level : path.length,
            circular : null,
            update : function (x, stopHere) {
                if (!state.isRoot) {
                    state.parent.node[state.key] = x;
                }
                state.node = x;
                if (stopHere) keepGoing = false;
            },
            'delete' : function (stopHere) {
                delete state.parent.node[state.key];
                if (stopHere) keepGoing = false;
            },
            remove : function (stopHere) {
                if (isArray(state.parent.node)) {
                    state.parent.node.splice(state.key, 1);
                }
                else {
                    delete state.parent.node[state.key];
                }
                if (stopHere) keepGoing = false;
            },
            keys : null,
            before : function (f) { modifiers.before = f },
            after : function (f) { modifiers.after = f },
            pre : function (f) { modifiers.pre = f },
            post : function (f) { modifiers.post = f },
            stop : function () { alive = false },
            block : function () { keepGoing = false }
        };
        
        if (!alive) return state;
        
        function updateState() {
            if (typeof state.node === 'object' && state.node !== null) {
                if (!state.keys || state.node_ !== state.node) {
                    state.keys = objectKeys(state.node)
                }
                
                state.isLeaf = state.keys.length == 0;
                
                for (var i = 0; i < parents.length; i++) {
                    if (parents[i].node_ === node_) {
                        state.circular = parents[i];
                        break;
                    }
                }
            }
            else {
                state.isLeaf = true;
                state.keys = null;
            }
            
            state.notLeaf = !state.isLeaf;
            state.notRoot = !state.isRoot;
        }
        
        updateState();
        
        // use return values to update if defined
        var ret = cb.call(state, state.node);
        if (ret !== undefined && state.update) state.update(ret);
        
        if (modifiers.before) modifiers.before.call(state, state.node);
        
        if (!keepGoing) return state;
        
        if (typeof state.node == 'object'
        && state.node !== null && !state.circular) {
            parents.push(state);
            
            updateState();
            
            forEach(state.keys, function (key, i) {
                path.push(key);
                
                if (modifiers.pre) modifiers.pre.call(state, state.node[key], key);
                
                var child = walker(state.node[key]);
                if (immutable && hasOwnProperty.call(state.node, key)) {
                    state.node[key] = child.node;
                }
                
                child.isLast = i == state.keys.length - 1;
                child.isFirst = i == 0;
                
                if (modifiers.post) modifiers.post.call(state, child);
                
                path.pop();
            });
            parents.pop();
        }
        
        if (modifiers.after) modifiers.after.call(state, state.node);
        
        return state;
    })(root).node;
}

function copy (src) {
    if (typeof src === 'object' && src !== null) {
        var dst;
        
        if (isArray(src)) {
            dst = [];
        }
        else if (isDate(src)) {
            dst = new Date(src.getTime ? src.getTime() : src);
        }
        else if (isRegExp(src)) {
            dst = new RegExp(src);
        }
        else if (isError(src)) {
            dst = { message: src.message };
        }
        else if (isBoolean(src)) {
            dst = new Boolean(src);
        }
        else if (isNumber(src)) {
            dst = new Number(src);
        }
        else if (isString(src)) {
            dst = new String(src);
        }
        else if (Object.create && Object.getPrototypeOf) {
            dst = Object.create(Object.getPrototypeOf(src));
        }
        else if (src.constructor === Object) {
            dst = {};
        }
        else {
            var proto =
                (src.constructor && src.constructor.prototype)
                || src.__proto__
                || {}
            ;
            var T = function () {};
            T.prototype = proto;
            dst = new T;
        }
        
        forEach(objectKeys(src), function (key) {
            dst[key] = src[key];
        });
        return dst;
    }
    else return src;
}

var objectKeys = Object.keys || function keys (obj) {
    var res = [];
    for (var key in obj) res.push(key)
    return res;
};

function toS (obj) { return Object.prototype.toString.call(obj) }
function isDate (obj) { return toS(obj) === '[object Date]' }
function isRegExp (obj) { return toS(obj) === '[object RegExp]' }
function isError (obj) { return toS(obj) === '[object Error]' }
function isBoolean (obj) { return toS(obj) === '[object Boolean]' }
function isNumber (obj) { return toS(obj) === '[object Number]' }
function isString (obj) { return toS(obj) === '[object String]' }

var isArray = Array.isArray || function isArray (xs) {
    return Object.prototype.toString.call(xs) === '[object Array]';
};

var forEach = function (xs, fn) {
    if (xs.forEach) return xs.forEach(fn)
    else for (var i = 0; i < xs.length; i++) {
        fn(xs[i], i, xs);
    }
};

forEach(objectKeys(Traverse.prototype), function (key) {
    traverse[key] = function (obj) {
        var args = [].slice.call(arguments, 1);
        var t = new Traverse(obj);
        return t[key].apply(t, args);
    };
});

var hasOwnProperty = Object.hasOwnProperty || function (obj, key) {
    return key in obj;
};

},{}],106:[function(require,module,exports){

exports = module.exports = trim;

function trim(str){
  return str.replace(/^\s*|\s*$/g, '');
}

exports.left = function(str){
  return str.replace(/^\s*/, '');
};

exports.right = function(str){
  return str.replace(/\s*$/, '');
};

},{}],107:[function(require,module,exports){
var createElement = require("./vdom/create-element.js")

module.exports = createElement

},{"./vdom/create-element.js":114}],108:[function(require,module,exports){
var diff = require("./vtree/diff.js")

module.exports = diff

},{"./vtree/diff.js":134}],109:[function(require,module,exports){
var h = require("./virtual-hyperscript/index.js")

module.exports = h

},{"./virtual-hyperscript/index.js":121}],110:[function(require,module,exports){
var diff = require("./diff.js")
var patch = require("./patch.js")
var h = require("./h.js")
var create = require("./create-element.js")
var VNode = require('./vnode/vnode.js')
var VText = require('./vnode/vtext.js')

module.exports = {
    diff: diff,
    patch: patch,
    h: h,
    create: create,
    VNode: VNode,
    VText: VText
}

},{"./create-element.js":107,"./diff.js":108,"./h.js":109,"./patch.js":112,"./vnode/vnode.js":130,"./vnode/vtext.js":132}],111:[function(require,module,exports){
/*!
 * Cross-Browser Split 1.1.1
 * Copyright 2007-2012 Steven Levithan <stevenlevithan.com>
 * Available under the MIT License
 * ECMAScript compliant, uniform cross-browser split method
 */

/**
 * Splits a string into an array of strings using a regex or string separator. Matches of the
 * separator are not included in the result array. However, if `separator` is a regex that contains
 * capturing groups, backreferences are spliced into the result each time `separator` is matched.
 * Fixes browser bugs compared to the native `String.prototype.split` and can be used reliably
 * cross-browser.
 * @param {String} str String to split.
 * @param {RegExp|String} separator Regex or string to use for separating the string.
 * @param {Number} [limit] Maximum number of items to include in the result array.
 * @returns {Array} Array of substrings.
 * @example
 *
 * // Basic use
 * split('a b c d', ' ');
 * // -> ['a', 'b', 'c', 'd']
 *
 * // With limit
 * split('a b c d', ' ', 2);
 * // -> ['a', 'b']
 *
 * // Backreferences in result array
 * split('..word1 word2..', /([a-z]+)(\d+)/i);
 * // -> ['..', 'word', '1', ' ', 'word', '2', '..']
 */
module.exports = (function split(undef) {

  var nativeSplit = String.prototype.split,
    compliantExecNpcg = /()??/.exec("")[1] === undef,
    // NPCG: nonparticipating capturing group
    self;

  self = function(str, separator, limit) {
    // If `separator` is not a regex, use `nativeSplit`
    if (Object.prototype.toString.call(separator) !== "[object RegExp]") {
      return nativeSplit.call(str, separator, limit);
    }
    var output = [],
      flags = (separator.ignoreCase ? "i" : "") + (separator.multiline ? "m" : "") + (separator.extended ? "x" : "") + // Proposed for ES6
      (separator.sticky ? "y" : ""),
      // Firefox 3+
      lastLastIndex = 0,
      // Make `global` and avoid `lastIndex` issues by working with a copy
      separator = new RegExp(separator.source, flags + "g"),
      separator2, match, lastIndex, lastLength;
    str += ""; // Type-convert
    if (!compliantExecNpcg) {
      // Doesn't need flags gy, but they don't hurt
      separator2 = new RegExp("^" + separator.source + "$(?!\\s)", flags);
    }
    /* Values for `limit`, per the spec:
     * If undefined: 4294967295 // Math.pow(2, 32) - 1
     * If 0, Infinity, or NaN: 0
     * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
     * If negative number: 4294967296 - Math.floor(Math.abs(limit))
     * If other: Type-convert, then use the above rules
     */
    limit = limit === undef ? -1 >>> 0 : // Math.pow(2, 32) - 1
    limit >>> 0; // ToUint32(limit)
    while (match = separator.exec(str)) {
      // `separator.lastIndex` is not reliable cross-browser
      lastIndex = match.index + match[0].length;
      if (lastIndex > lastLastIndex) {
        output.push(str.slice(lastLastIndex, match.index));
        // Fix browsers whose `exec` methods don't consistently return `undefined` for
        // nonparticipating capturing groups
        if (!compliantExecNpcg && match.length > 1) {
          match[0].replace(separator2, function() {
            for (var i = 1; i < arguments.length - 2; i++) {
              if (arguments[i] === undef) {
                match[i] = undef;
              }
            }
          });
        }
        if (match.length > 1 && match.index < str.length) {
          Array.prototype.push.apply(output, match.slice(1));
        }
        lastLength = match[0].length;
        lastLastIndex = lastIndex;
        if (output.length >= limit) {
          break;
        }
      }
      if (separator.lastIndex === match.index) {
        separator.lastIndex++; // Avoid an infinite loop
      }
    }
    if (lastLastIndex === str.length) {
      if (lastLength || !separator.test("")) {
        output.push("");
      }
    } else {
      output.push(str.slice(lastLastIndex));
    }
    return output.length > limit ? output.slice(0, limit) : output;
  };

  return self;
})();

},{}],112:[function(require,module,exports){
var patch = require("./vdom/patch.js")

module.exports = patch

},{"./vdom/patch.js":117}],113:[function(require,module,exports){
var isObject = require("is-object")
var isHook = require("../vnode/is-vhook.js")

module.exports = applyProperties

function applyProperties(node, props, previous) {
    for (var propName in props) {
        var propValue = props[propName]

        if (propValue === undefined) {
            removeProperty(node, propName, propValue, previous);
        } else if (isHook(propValue)) {
            removeProperty(node, propName, propValue, previous)
            if (propValue.hook) {
                propValue.hook(node,
                    propName,
                    previous ? previous[propName] : undefined)
            }
        } else {
            if (isObject(propValue)) {
                patchObject(node, props, previous, propName, propValue);
            } else {
                node[propName] = propValue
            }
        }
    }
}

function removeProperty(node, propName, propValue, previous) {
    if (previous) {
        var previousValue = previous[propName]

        if (!isHook(previousValue)) {
            if (propName === "attributes") {
                for (var attrName in previousValue) {
                    node.removeAttribute(attrName)
                }
            } else if (propName === "style") {
                for (var i in previousValue) {
                    node.style[i] = ""
                }
            } else if (typeof previousValue === "string") {
                node[propName] = ""
            } else {
                node[propName] = null
            }
        } else if (previousValue.unhook) {
            previousValue.unhook(node, propName, propValue)
        }
    }
}

function patchObject(node, props, previous, propName, propValue) {
    var previousValue = previous ? previous[propName] : undefined

    // Set attributes
    if (propName === "attributes") {
        for (var attrName in propValue) {
            var attrValue = propValue[attrName]

            if (attrValue === undefined) {
                node.removeAttribute(attrName)
            } else {
                node.setAttribute(attrName, attrValue)
            }
        }

        return
    }

    if(previousValue && isObject(previousValue) &&
        getPrototype(previousValue) !== getPrototype(propValue)) {
        node[propName] = propValue
        return
    }

    if (!isObject(node[propName])) {
        node[propName] = {}
    }

    var replacer = propName === "style" ? "" : undefined

    for (var k in propValue) {
        var value = propValue[k]
        node[propName][k] = (value === undefined) ? replacer : value
    }
}

function getPrototype(value) {
    if (Object.getPrototypeOf) {
        return Object.getPrototypeOf(value)
    } else if (value.__proto__) {
        return value.__proto__
    } else if (value.constructor) {
        return value.constructor.prototype
    }
}

},{"../vnode/is-vhook.js":125,"is-object":75}],114:[function(require,module,exports){
var document = require("global/document")

var applyProperties = require("./apply-properties")

var isVNode = require("../vnode/is-vnode.js")
var isVText = require("../vnode/is-vtext.js")
var isWidget = require("../vnode/is-widget.js")
var handleThunk = require("../vnode/handle-thunk.js")

module.exports = createElement

function createElement(vnode, opts) {
    var doc = opts ? opts.document || document : document
    var warn = opts ? opts.warn : null

    vnode = handleThunk(vnode).a

    if (isWidget(vnode)) {
        return vnode.init()
    } else if (isVText(vnode)) {
        return doc.createTextNode(vnode.text)
    } else if (!isVNode(vnode)) {
        if (warn) {
            warn("Item is not a valid virtual dom node", vnode)
        }
        return null
    }

    var node = (vnode.namespace === null) ?
        doc.createElement(vnode.tagName) :
        doc.createElementNS(vnode.namespace, vnode.tagName)

    var props = vnode.properties
    applyProperties(node, props)

    var children = vnode.children

    for (var i = 0; i < children.length; i++) {
        var childNode = createElement(children[i], opts)
        if (childNode) {
            node.appendChild(childNode)
        }
    }

    return node
}

},{"../vnode/handle-thunk.js":123,"../vnode/is-vnode.js":126,"../vnode/is-vtext.js":127,"../vnode/is-widget.js":128,"./apply-properties":113,"global/document":68}],115:[function(require,module,exports){
// Maps a virtual DOM tree onto a real DOM tree in an efficient manner.
// We don't want to read all of the DOM nodes in the tree so we use
// the in-order tree indexing to eliminate recursion down certain branches.
// We only recurse into a DOM node if we know that it contains a child of
// interest.

var noChild = {}

module.exports = domIndex

function domIndex(rootNode, tree, indices, nodes) {
    if (!indices || indices.length === 0) {
        return {}
    } else {
        indices.sort(ascending)
        return recurse(rootNode, tree, indices, nodes, 0)
    }
}

function recurse(rootNode, tree, indices, nodes, rootIndex) {
    nodes = nodes || {}


    if (rootNode) {
        if (indexInRange(indices, rootIndex, rootIndex)) {
            nodes[rootIndex] = rootNode
        }

        var vChildren = tree.children

        if (vChildren) {

            var childNodes = rootNode.childNodes

            for (var i = 0; i < tree.children.length; i++) {
                rootIndex += 1

                var vChild = vChildren[i] || noChild
                var nextIndex = rootIndex + (vChild.count || 0)

                // skip recursion down the tree if there are no nodes down here
                if (indexInRange(indices, rootIndex, nextIndex)) {
                    recurse(childNodes[i], vChild, indices, nodes, rootIndex)
                }

                rootIndex = nextIndex
            }
        }
    }

    return nodes
}

// Binary search for an index in the interval [left, right]
function indexInRange(indices, left, right) {
    if (indices.length === 0) {
        return false
    }

    var minIndex = 0
    var maxIndex = indices.length - 1
    var currentIndex
    var currentItem

    while (minIndex <= maxIndex) {
        currentIndex = ((maxIndex + minIndex) / 2) >> 0
        currentItem = indices[currentIndex]

        if (minIndex === maxIndex) {
            return currentItem >= left && currentItem <= right
        } else if (currentItem < left) {
            minIndex = currentIndex + 1
        } else  if (currentItem > right) {
            maxIndex = currentIndex - 1
        } else {
            return true
        }
    }

    return false;
}

function ascending(a, b) {
    return a > b ? 1 : -1
}

},{}],116:[function(require,module,exports){
var applyProperties = require("./apply-properties")

var isWidget = require("../vnode/is-widget.js")
var VPatch = require("../vnode/vpatch.js")

var updateWidget = require("./update-widget")

module.exports = applyPatch

function applyPatch(vpatch, domNode, renderOptions) {
    var type = vpatch.type
    var vNode = vpatch.vNode
    var patch = vpatch.patch

    switch (type) {
        case VPatch.REMOVE:
            return removeNode(domNode, vNode)
        case VPatch.INSERT:
            return insertNode(domNode, patch, renderOptions)
        case VPatch.VTEXT:
            return stringPatch(domNode, vNode, patch, renderOptions)
        case VPatch.WIDGET:
            return widgetPatch(domNode, vNode, patch, renderOptions)
        case VPatch.VNODE:
            return vNodePatch(domNode, vNode, patch, renderOptions)
        case VPatch.ORDER:
            reorderChildren(domNode, patch)
            return domNode
        case VPatch.PROPS:
            applyProperties(domNode, patch, vNode.properties)
            return domNode
        case VPatch.THUNK:
            return replaceRoot(domNode,
                renderOptions.patch(domNode, patch, renderOptions))
        default:
            return domNode
    }
}

function removeNode(domNode, vNode) {
    var parentNode = domNode.parentNode

    if (parentNode) {
        parentNode.removeChild(domNode)
    }

    destroyWidget(domNode, vNode);

    return null
}

function insertNode(parentNode, vNode, renderOptions) {
    var newNode = renderOptions.render(vNode, renderOptions)

    if (parentNode) {
        parentNode.appendChild(newNode)
    }

    return parentNode
}

function stringPatch(domNode, leftVNode, vText, renderOptions) {
    var newNode

    if (domNode.nodeType === 3) {
        domNode.replaceData(0, domNode.length, vText.text)
        newNode = domNode
    } else {
        var parentNode = domNode.parentNode
        newNode = renderOptions.render(vText, renderOptions)

        if (parentNode && newNode !== domNode) {
            parentNode.replaceChild(newNode, domNode)
        }
    }

    return newNode
}

function widgetPatch(domNode, leftVNode, widget, renderOptions) {
    var updating = updateWidget(leftVNode, widget)
    var newNode

    if (updating) {
        newNode = widget.update(leftVNode, domNode) || domNode
    } else {
        newNode = renderOptions.render(widget, renderOptions)
    }

    var parentNode = domNode.parentNode

    if (parentNode && newNode !== domNode) {
        parentNode.replaceChild(newNode, domNode)
    }

    if (!updating) {
        destroyWidget(domNode, leftVNode)
    }

    return newNode
}

function vNodePatch(domNode, leftVNode, vNode, renderOptions) {
    var parentNode = domNode.parentNode
    var newNode = renderOptions.render(vNode, renderOptions)

    if (parentNode && newNode !== domNode) {
        parentNode.replaceChild(newNode, domNode)
    }

    return newNode
}

function destroyWidget(domNode, w) {
    if (typeof w.destroy === "function" && isWidget(w)) {
        w.destroy(domNode)
    }
}

function reorderChildren(domNode, moves) {
    var childNodes = domNode.childNodes
    var keyMap = {}
    var node
    var remove
    var insert

    for (var i = 0; i < moves.removes.length; i++) {
        remove = moves.removes[i]
        node = childNodes[remove.from]
        if (remove.key) {
            keyMap[remove.key] = node
        }
        domNode.removeChild(node)
    }

    var length = childNodes.length
    for (var j = 0; j < moves.inserts.length; j++) {
        insert = moves.inserts[j]
        node = keyMap[insert.key]
        // this is the weirdest bug i've ever seen in webkit
        domNode.insertBefore(node, insert.to >= length++ ? null : childNodes[insert.to])
    }
}

function replaceRoot(oldRoot, newRoot) {
    if (oldRoot && newRoot && oldRoot !== newRoot && oldRoot.parentNode) {
        oldRoot.parentNode.replaceChild(newRoot, oldRoot)
    }

    return newRoot;
}

},{"../vnode/is-widget.js":128,"../vnode/vpatch.js":131,"./apply-properties":113,"./update-widget":118}],117:[function(require,module,exports){
var document = require("global/document")
var isArray = require("x-is-array")

var render = require("./create-element")
var domIndex = require("./dom-index")
var patchOp = require("./patch-op")
module.exports = patch

function patch(rootNode, patches, renderOptions) {
    renderOptions = renderOptions || {}
    renderOptions.patch = renderOptions.patch && renderOptions.patch !== patch
        ? renderOptions.patch
        : patchRecursive
    renderOptions.render = renderOptions.render || render

    return renderOptions.patch(rootNode, patches, renderOptions)
}

function patchRecursive(rootNode, patches, renderOptions) {
    var indices = patchIndices(patches)

    if (indices.length === 0) {
        return rootNode
    }

    var index = domIndex(rootNode, patches.a, indices)
    var ownerDocument = rootNode.ownerDocument

    if (!renderOptions.document && ownerDocument !== document) {
        renderOptions.document = ownerDocument
    }

    for (var i = 0; i < indices.length; i++) {
        var nodeIndex = indices[i]
        rootNode = applyPatch(rootNode,
            index[nodeIndex],
            patches[nodeIndex],
            renderOptions)
    }

    return rootNode
}

function applyPatch(rootNode, domNode, patchList, renderOptions) {
    if (!domNode) {
        return rootNode
    }

    var newNode

    if (isArray(patchList)) {
        for (var i = 0; i < patchList.length; i++) {
            newNode = patchOp(patchList[i], domNode, renderOptions)

            if (domNode === rootNode) {
                rootNode = newNode
            }
        }
    } else {
        newNode = patchOp(patchList, domNode, renderOptions)

        if (domNode === rootNode) {
            rootNode = newNode
        }
    }

    return rootNode
}

function patchIndices(patches) {
    var indices = []

    for (var key in patches) {
        if (key !== "a") {
            indices.push(Number(key))
        }
    }

    return indices
}

},{"./create-element":114,"./dom-index":115,"./patch-op":116,"global/document":68,"x-is-array":135}],118:[function(require,module,exports){
var isWidget = require("../vnode/is-widget.js")

module.exports = updateWidget

function updateWidget(a, b) {
    if (isWidget(a) && isWidget(b)) {
        if ("name" in a && "name" in b) {
            return a.id === b.id
        } else {
            return a.init === b.init
        }
    }

    return false
}

},{"../vnode/is-widget.js":128}],119:[function(require,module,exports){
'use strict';

var EvStore = require('ev-store');

module.exports = EvHook;

function EvHook(value) {
    if (!(this instanceof EvHook)) {
        return new EvHook(value);
    }

    this.value = value;
}

EvHook.prototype.hook = function (node, propertyName) {
    var es = EvStore(node);
    var propName = propertyName.substr(3);

    es[propName] = this.value;
};

EvHook.prototype.unhook = function(node, propertyName) {
    var es = EvStore(node);
    var propName = propertyName.substr(3);

    es[propName] = undefined;
};

},{"ev-store":37}],120:[function(require,module,exports){
'use strict';

module.exports = SoftSetHook;

function SoftSetHook(value) {
    if (!(this instanceof SoftSetHook)) {
        return new SoftSetHook(value);
    }

    this.value = value;
}

SoftSetHook.prototype.hook = function (node, propertyName) {
    if (node[propertyName] !== this.value) {
        node[propertyName] = this.value;
    }
};

},{}],121:[function(require,module,exports){
'use strict';

var isArray = require('x-is-array');

var VNode = require('../vnode/vnode.js');
var VText = require('../vnode/vtext.js');
var isVNode = require('../vnode/is-vnode');
var isVText = require('../vnode/is-vtext');
var isWidget = require('../vnode/is-widget');
var isHook = require('../vnode/is-vhook');
var isVThunk = require('../vnode/is-thunk');

var parseTag = require('./parse-tag.js');
var softSetHook = require('./hooks/soft-set-hook.js');
var evHook = require('./hooks/ev-hook.js');

module.exports = h;

function h(tagName, properties, children) {
    var childNodes = [];
    var tag, props, key, namespace;

    if (!children && isChildren(properties)) {
        children = properties;
        props = {};
    }

    props = props || properties || {};
    tag = parseTag(tagName, props);

    // support keys
    if (props.hasOwnProperty('key')) {
        key = props.key;
        props.key = undefined;
    }

    // support namespace
    if (props.hasOwnProperty('namespace')) {
        namespace = props.namespace;
        props.namespace = undefined;
    }

    // fix cursor bug
    if (tag === 'INPUT' &&
        !namespace &&
        props.hasOwnProperty('value') &&
        props.value !== undefined &&
        !isHook(props.value)
    ) {
        props.value = softSetHook(props.value);
    }

    transformProperties(props);

    if (children !== undefined && children !== null) {
        addChild(children, childNodes, tag, props);
    }


    return new VNode(tag, props, childNodes, key, namespace);
}

function addChild(c, childNodes, tag, props) {
    if (typeof c === 'string') {
        childNodes.push(new VText(c));
    } else if (typeof c === 'number') {
        childNodes.push(new VText(String(c)));
    } else if (isChild(c)) {
        childNodes.push(c);
    } else if (isArray(c)) {
        for (var i = 0; i < c.length; i++) {
            addChild(c[i], childNodes, tag, props);
        }
    } else if (c === null || c === undefined) {
        return;
    } else {
        throw UnexpectedVirtualElement({
            foreignObject: c,
            parentVnode: {
                tagName: tag,
                properties: props
            }
        });
    }
}

function transformProperties(props) {
    for (var propName in props) {
        if (props.hasOwnProperty(propName)) {
            var value = props[propName];

            if (isHook(value)) {
                continue;
            }

            if (propName.substr(0, 3) === 'ev-') {
                // add ev-foo support
                props[propName] = evHook(value);
            }
        }
    }
}

function isChild(x) {
    return isVNode(x) || isVText(x) || isWidget(x) || isVThunk(x);
}

function isChildren(x) {
    return typeof x === 'string' || isArray(x) || isChild(x);
}

function UnexpectedVirtualElement(data) {
    var err = new Error();

    err.type = 'virtual-hyperscript.unexpected.virtual-element';
    err.message = 'Unexpected virtual child passed to h().\n' +
        'Expected a VNode / Vthunk / VWidget / string but:\n' +
        'got:\n' +
        errorString(data.foreignObject) +
        '.\n' +
        'The parent vnode is:\n' +
        errorString(data.parentVnode)
        '\n' +
        'Suggested fix: change your `h(..., [ ... ])` callsite.';
    err.foreignObject = data.foreignObject;
    err.parentVnode = data.parentVnode;

    return err;
}

function errorString(obj) {
    try {
        return JSON.stringify(obj, null, '    ');
    } catch (e) {
        return String(obj);
    }
}

},{"../vnode/is-thunk":124,"../vnode/is-vhook":125,"../vnode/is-vnode":126,"../vnode/is-vtext":127,"../vnode/is-widget":128,"../vnode/vnode.js":130,"../vnode/vtext.js":132,"./hooks/ev-hook.js":119,"./hooks/soft-set-hook.js":120,"./parse-tag.js":122,"x-is-array":135}],122:[function(require,module,exports){
'use strict';

var split = require('browser-split');

var classIdSplit = /([\.#]?[a-zA-Z0-9\u007F-\uFFFF_:-]+)/;
var notClassId = /^\.|#/;

module.exports = parseTag;

function parseTag(tag, props) {
    if (!tag) {
        return 'DIV';
    }

    var noId = !(props.hasOwnProperty('id'));

    var tagParts = split(tag, classIdSplit);
    var tagName = null;

    if (notClassId.test(tagParts[1])) {
        tagName = 'DIV';
    }

    var classes, part, type, i;

    for (i = 0; i < tagParts.length; i++) {
        part = tagParts[i];

        if (!part) {
            continue;
        }

        type = part.charAt(0);

        if (!tagName) {
            tagName = part;
        } else if (type === '.') {
            classes = classes || [];
            classes.push(part.substring(1, part.length));
        } else if (type === '#' && noId) {
            props.id = part.substring(1, part.length);
        }
    }

    if (classes) {
        if (props.className) {
            classes.push(props.className);
        }

        props.className = classes.join(' ');
    }

    return props.namespace ? tagName : tagName.toUpperCase();
}

},{"browser-split":111}],123:[function(require,module,exports){
var isVNode = require("./is-vnode")
var isVText = require("./is-vtext")
var isWidget = require("./is-widget")
var isThunk = require("./is-thunk")

module.exports = handleThunk

function handleThunk(a, b) {
    var renderedA = a
    var renderedB = b

    if (isThunk(b)) {
        renderedB = renderThunk(b, a)
    }

    if (isThunk(a)) {
        renderedA = renderThunk(a, null)
    }

    return {
        a: renderedA,
        b: renderedB
    }
}

function renderThunk(thunk, previous) {
    var renderedThunk = thunk.vnode

    if (!renderedThunk) {
        renderedThunk = thunk.vnode = thunk.render(previous)
    }

    if (!(isVNode(renderedThunk) ||
            isVText(renderedThunk) ||
            isWidget(renderedThunk))) {
        throw new Error("thunk did not return a valid node");
    }

    return renderedThunk
}

},{"./is-thunk":124,"./is-vnode":126,"./is-vtext":127,"./is-widget":128}],124:[function(require,module,exports){
module.exports = isThunk

function isThunk(t) {
    return t && t.type === "Thunk"
}

},{}],125:[function(require,module,exports){
module.exports = isHook

function isHook(hook) {
    return hook &&
      (typeof hook.hook === "function" && !hook.hasOwnProperty("hook") ||
       typeof hook.unhook === "function" && !hook.hasOwnProperty("unhook"))
}

},{}],126:[function(require,module,exports){
var version = require("./version")

module.exports = isVirtualNode

function isVirtualNode(x) {
    return x && x.type === "VirtualNode" && x.version === version
}

},{"./version":129}],127:[function(require,module,exports){
var version = require("./version")

module.exports = isVirtualText

function isVirtualText(x) {
    return x && x.type === "VirtualText" && x.version === version
}

},{"./version":129}],128:[function(require,module,exports){
module.exports = isWidget

function isWidget(w) {
    return w && w.type === "Widget"
}

},{}],129:[function(require,module,exports){
module.exports = "2"

},{}],130:[function(require,module,exports){
var version = require("./version")
var isVNode = require("./is-vnode")
var isWidget = require("./is-widget")
var isThunk = require("./is-thunk")
var isVHook = require("./is-vhook")

module.exports = VirtualNode

var noProperties = {}
var noChildren = []

function VirtualNode(tagName, properties, children, key, namespace) {
    this.tagName = tagName
    this.properties = properties || noProperties
    this.children = children || noChildren
    this.key = key != null ? String(key) : undefined
    this.namespace = (typeof namespace === "string") ? namespace : null

    var count = (children && children.length) || 0
    var descendants = 0
    var hasWidgets = false
    var hasThunks = false
    var descendantHooks = false
    var hooks

    for (var propName in properties) {
        if (properties.hasOwnProperty(propName)) {
            var property = properties[propName]
            if (isVHook(property) && property.unhook) {
                if (!hooks) {
                    hooks = {}
                }

                hooks[propName] = property
            }
        }
    }

    for (var i = 0; i < count; i++) {
        var child = children[i]
        if (isVNode(child)) {
            descendants += child.count || 0

            if (!hasWidgets && child.hasWidgets) {
                hasWidgets = true
            }

            if (!hasThunks && child.hasThunks) {
                hasThunks = true
            }

            if (!descendantHooks && (child.hooks || child.descendantHooks)) {
                descendantHooks = true
            }
        } else if (!hasWidgets && isWidget(child)) {
            if (typeof child.destroy === "function") {
                hasWidgets = true
            }
        } else if (!hasThunks && isThunk(child)) {
            hasThunks = true;
        }
    }

    this.count = count + descendants
    this.hasWidgets = hasWidgets
    this.hasThunks = hasThunks
    this.hooks = hooks
    this.descendantHooks = descendantHooks
}

VirtualNode.prototype.version = version
VirtualNode.prototype.type = "VirtualNode"

},{"./is-thunk":124,"./is-vhook":125,"./is-vnode":126,"./is-widget":128,"./version":129}],131:[function(require,module,exports){
var version = require("./version")

VirtualPatch.NONE = 0
VirtualPatch.VTEXT = 1
VirtualPatch.VNODE = 2
VirtualPatch.WIDGET = 3
VirtualPatch.PROPS = 4
VirtualPatch.ORDER = 5
VirtualPatch.INSERT = 6
VirtualPatch.REMOVE = 7
VirtualPatch.THUNK = 8

module.exports = VirtualPatch

function VirtualPatch(type, vNode, patch) {
    this.type = Number(type)
    this.vNode = vNode
    this.patch = patch
}

VirtualPatch.prototype.version = version
VirtualPatch.prototype.type = "VirtualPatch"

},{"./version":129}],132:[function(require,module,exports){
var version = require("./version")

module.exports = VirtualText

function VirtualText(text) {
    this.text = String(text)
}

VirtualText.prototype.version = version
VirtualText.prototype.type = "VirtualText"

},{"./version":129}],133:[function(require,module,exports){
var isObject = require("is-object")
var isHook = require("../vnode/is-vhook")

module.exports = diffProps

function diffProps(a, b) {
    var diff

    for (var aKey in a) {
        if (!(aKey in b)) {
            diff = diff || {}
            diff[aKey] = undefined
        }

        var aValue = a[aKey]
        var bValue = b[aKey]

        if (aValue === bValue) {
            continue
        } else if (isObject(aValue) && isObject(bValue)) {
            if (getPrototype(bValue) !== getPrototype(aValue)) {
                diff = diff || {}
                diff[aKey] = bValue
            } else if (isHook(bValue)) {
                 diff = diff || {}
                 diff[aKey] = bValue
            } else {
                var objectDiff = diffProps(aValue, bValue)
                if (objectDiff) {
                    diff = diff || {}
                    diff[aKey] = objectDiff
                }
            }
        } else {
            diff = diff || {}
            diff[aKey] = bValue
        }
    }

    for (var bKey in b) {
        if (!(bKey in a)) {
            diff = diff || {}
            diff[bKey] = b[bKey]
        }
    }

    return diff
}

function getPrototype(value) {
  if (Object.getPrototypeOf) {
    return Object.getPrototypeOf(value)
  } else if (value.__proto__) {
    return value.__proto__
  } else if (value.constructor) {
    return value.constructor.prototype
  }
}

},{"../vnode/is-vhook":125,"is-object":75}],134:[function(require,module,exports){
var isArray = require("x-is-array")

var VPatch = require("../vnode/vpatch")
var isVNode = require("../vnode/is-vnode")
var isVText = require("../vnode/is-vtext")
var isWidget = require("../vnode/is-widget")
var isThunk = require("../vnode/is-thunk")
var handleThunk = require("../vnode/handle-thunk")

var diffProps = require("./diff-props")

module.exports = diff

function diff(a, b) {
    var patch = { a: a }
    walk(a, b, patch, 0)
    return patch
}

function walk(a, b, patch, index) {
    if (a === b) {
        return
    }

    var apply = patch[index]
    var applyClear = false

    if (isThunk(a) || isThunk(b)) {
        thunks(a, b, patch, index)
    } else if (b == null) {

        // If a is a widget we will add a remove patch for it
        // Otherwise any child widgets/hooks must be destroyed.
        // This prevents adding two remove patches for a widget.
        if (!isWidget(a)) {
            clearState(a, patch, index)
            apply = patch[index]
        }

        apply = appendPatch(apply, new VPatch(VPatch.REMOVE, a, b))
    } else if (isVNode(b)) {
        if (isVNode(a)) {
            if (a.tagName === b.tagName &&
                a.namespace === b.namespace &&
                a.key === b.key) {
                var propsPatch = diffProps(a.properties, b.properties)
                if (propsPatch) {
                    apply = appendPatch(apply,
                        new VPatch(VPatch.PROPS, a, propsPatch))
                }
                apply = diffChildren(a, b, patch, apply, index)
            } else {
                apply = appendPatch(apply, new VPatch(VPatch.VNODE, a, b))
                applyClear = true
            }
        } else {
            apply = appendPatch(apply, new VPatch(VPatch.VNODE, a, b))
            applyClear = true
        }
    } else if (isVText(b)) {
        if (!isVText(a)) {
            apply = appendPatch(apply, new VPatch(VPatch.VTEXT, a, b))
            applyClear = true
        } else if (a.text !== b.text) {
            apply = appendPatch(apply, new VPatch(VPatch.VTEXT, a, b))
        }
    } else if (isWidget(b)) {
        if (!isWidget(a)) {
            applyClear = true
        }

        apply = appendPatch(apply, new VPatch(VPatch.WIDGET, a, b))
    }

    if (apply) {
        patch[index] = apply
    }

    if (applyClear) {
        clearState(a, patch, index)
    }
}

function diffChildren(a, b, patch, apply, index) {
    var aChildren = a.children
    var orderedSet = reorder(aChildren, b.children)
    var bChildren = orderedSet.children

    var aLen = aChildren.length
    var bLen = bChildren.length
    var len = aLen > bLen ? aLen : bLen

    for (var i = 0; i < len; i++) {
        var leftNode = aChildren[i]
        var rightNode = bChildren[i]
        index += 1

        if (!leftNode) {
            if (rightNode) {
                // Excess nodes in b need to be added
                apply = appendPatch(apply,
                    new VPatch(VPatch.INSERT, null, rightNode))
            }
        } else {
            walk(leftNode, rightNode, patch, index)
        }

        if (isVNode(leftNode) && leftNode.count) {
            index += leftNode.count
        }
    }

    if (orderedSet.moves) {
        // Reorder nodes last
        apply = appendPatch(apply, new VPatch(
            VPatch.ORDER,
            a,
            orderedSet.moves
        ))
    }

    return apply
}

function clearState(vNode, patch, index) {
    // TODO: Make this a single walk, not two
    unhook(vNode, patch, index)
    destroyWidgets(vNode, patch, index)
}

// Patch records for all destroyed widgets must be added because we need
// a DOM node reference for the destroy function
function destroyWidgets(vNode, patch, index) {
    if (isWidget(vNode)) {
        if (typeof vNode.destroy === "function") {
            patch[index] = appendPatch(
                patch[index],
                new VPatch(VPatch.REMOVE, vNode, null)
            )
        }
    } else if (isVNode(vNode) && (vNode.hasWidgets || vNode.hasThunks)) {
        var children = vNode.children
        var len = children.length
        for (var i = 0; i < len; i++) {
            var child = children[i]
            index += 1

            destroyWidgets(child, patch, index)

            if (isVNode(child) && child.count) {
                index += child.count
            }
        }
    } else if (isThunk(vNode)) {
        thunks(vNode, null, patch, index)
    }
}

// Create a sub-patch for thunks
function thunks(a, b, patch, index) {
    var nodes = handleThunk(a, b)
    var thunkPatch = diff(nodes.a, nodes.b)
    if (hasPatches(thunkPatch)) {
        patch[index] = new VPatch(VPatch.THUNK, null, thunkPatch)
    }
}

function hasPatches(patch) {
    for (var index in patch) {
        if (index !== "a") {
            return true
        }
    }

    return false
}

// Execute hooks when two nodes are identical
function unhook(vNode, patch, index) {
    if (isVNode(vNode)) {
        if (vNode.hooks) {
            patch[index] = appendPatch(
                patch[index],
                new VPatch(
                    VPatch.PROPS,
                    vNode,
                    undefinedKeys(vNode.hooks)
                )
            )
        }

        if (vNode.descendantHooks || vNode.hasThunks) {
            var children = vNode.children
            var len = children.length
            for (var i = 0; i < len; i++) {
                var child = children[i]
                index += 1

                unhook(child, patch, index)

                if (isVNode(child) && child.count) {
                    index += child.count
                }
            }
        }
    } else if (isThunk(vNode)) {
        thunks(vNode, null, patch, index)
    }
}

function undefinedKeys(obj) {
    var result = {}

    for (var key in obj) {
        result[key] = undefined
    }

    return result
}

// List diff, naive left to right reordering
function reorder(aChildren, bChildren) {
    // O(M) time, O(M) memory
    var bChildIndex = keyIndex(bChildren)
    var bKeys = bChildIndex.keys
    var bFree = bChildIndex.free

    if (bFree.length === bChildren.length) {
        return {
            children: bChildren,
            moves: null
        }
    }

    // O(N) time, O(N) memory
    var aChildIndex = keyIndex(aChildren)
    var aKeys = aChildIndex.keys
    var aFree = aChildIndex.free

    if (aFree.length === aChildren.length) {
        return {
            children: bChildren,
            moves: null
        }
    }

    // O(MAX(N, M)) memory
    var newChildren = []

    var freeIndex = 0
    var freeCount = bFree.length
    var deletedItems = 0

    // Iterate through a and match a node in b
    // O(N) time,
    for (var i = 0 ; i < aChildren.length; i++) {
        var aItem = aChildren[i]
        var itemIndex

        if (aItem.key) {
            if (bKeys.hasOwnProperty(aItem.key)) {
                // Match up the old keys
                itemIndex = bKeys[aItem.key]
                newChildren.push(bChildren[itemIndex])

            } else {
                // Remove old keyed items
                itemIndex = i - deletedItems++
                newChildren.push(null)
            }
        } else {
            // Match the item in a with the next free item in b
            if (freeIndex < freeCount) {
                itemIndex = bFree[freeIndex++]
                newChildren.push(bChildren[itemIndex])
            } else {
                // There are no free items in b to match with
                // the free items in a, so the extra free nodes
                // are deleted.
                itemIndex = i - deletedItems++
                newChildren.push(null)
            }
        }
    }

    var lastFreeIndex = freeIndex >= bFree.length ?
        bChildren.length :
        bFree[freeIndex]

    // Iterate through b and append any new keys
    // O(M) time
    for (var j = 0; j < bChildren.length; j++) {
        var newItem = bChildren[j]

        if (newItem.key) {
            if (!aKeys.hasOwnProperty(newItem.key)) {
                // Add any new keyed items
                // We are adding new items to the end and then sorting them
                // in place. In future we should insert new items in place.
                newChildren.push(newItem)
            }
        } else if (j >= lastFreeIndex) {
            // Add any leftover non-keyed items
            newChildren.push(newItem)
        }
    }

    var simulate = newChildren.slice()
    var simulateIndex = 0
    var removes = []
    var inserts = []
    var simulateItem

    for (var k = 0; k < bChildren.length;) {
        var wantedItem = bChildren[k]
        simulateItem = simulate[simulateIndex]

        // remove items
        while (simulateItem === null && simulate.length) {
            removes.push(remove(simulate, simulateIndex, null))
            simulateItem = simulate[simulateIndex]
        }

        if (!simulateItem || simulateItem.key !== wantedItem.key) {
            // if we need a key in this position...
            if (wantedItem.key) {
                if (simulateItem && simulateItem.key) {
                    // if an insert doesn't put this key in place, it needs to move
                    if (bKeys[simulateItem.key] !== k + 1) {
                        removes.push(remove(simulate, simulateIndex, simulateItem.key))
                        simulateItem = simulate[simulateIndex]
                        // if the remove didn't put the wanted item in place, we need to insert it
                        if (!simulateItem || simulateItem.key !== wantedItem.key) {
                            inserts.push({key: wantedItem.key, to: k})
                        }
                        // items are matching, so skip ahead
                        else {
                            simulateIndex++
                        }
                    }
                    else {
                        inserts.push({key: wantedItem.key, to: k})
                    }
                }
                else {
                    inserts.push({key: wantedItem.key, to: k})
                }
                k++
            }
            // a key in simulate has no matching wanted key, remove it
            else if (simulateItem && simulateItem.key) {
                removes.push(remove(simulate, simulateIndex, simulateItem.key))
            }
        }
        else {
            simulateIndex++
            k++
        }
    }

    // remove all the remaining nodes from simulate
    while(simulateIndex < simulate.length) {
        simulateItem = simulate[simulateIndex]
        removes.push(remove(simulate, simulateIndex, simulateItem && simulateItem.key))
    }

    // If the only moves we have are deletes then we can just
    // let the delete patch remove these items.
    if (removes.length === deletedItems && !inserts.length) {
        return {
            children: newChildren,
            moves: null
        }
    }

    return {
        children: newChildren,
        moves: {
            removes: removes,
            inserts: inserts
        }
    }
}

function remove(arr, index, key) {
    arr.splice(index, 1)

    return {
        from: index,
        key: key
    }
}

function keyIndex(children) {
    var keys = {}
    var free = []
    var length = children.length

    for (var i = 0; i < length; i++) {
        var child = children[i]

        if (child.key) {
            keys[child.key] = i
        } else {
            free.push(i)
        }
    }

    return {
        keys: keys,     // A hash of key name to index
        free: free      // An array of unkeyed item indices
    }
}

function appendPatch(apply, patch) {
    if (apply) {
        if (isArray(apply)) {
            apply.push(patch)
        } else {
            apply = [apply, patch]
        }

        return apply
    } else {
        return patch
    }
}

},{"../vnode/handle-thunk":123,"../vnode/is-thunk":124,"../vnode/is-vnode":126,"../vnode/is-vtext":127,"../vnode/is-widget":128,"../vnode/vpatch":131,"./diff-props":133,"x-is-array":135}],135:[function(require,module,exports){
var nativeIsArray = Array.isArray
var toString = Object.prototype.toString

module.exports = nativeIsArray || isArray

function isArray(obj) {
    return toString.call(obj) === "[object Array]"
}

},{}],136:[function(require,module,exports){
"use strict";
var window = require("global/window")
var isFunction = require("is-function")
var parseHeaders = require("parse-headers")
var xtend = require("xtend")

module.exports = createXHR
createXHR.XMLHttpRequest = window.XMLHttpRequest || noop
createXHR.XDomainRequest = "withCredentials" in (new createXHR.XMLHttpRequest()) ? createXHR.XMLHttpRequest : window.XDomainRequest

forEachArray(["get", "put", "post", "patch", "head", "delete"], function(method) {
    createXHR[method === "delete" ? "del" : method] = function(uri, options, callback) {
        options = initParams(uri, options, callback)
        options.method = method.toUpperCase()
        return _createXHR(options)
    }
})

function forEachArray(array, iterator) {
    for (var i = 0; i < array.length; i++) {
        iterator(array[i])
    }
}

function isEmpty(obj){
    for(var i in obj){
        if(obj.hasOwnProperty(i)) return false
    }
    return true
}

function initParams(uri, options, callback) {
    var params = uri

    if (isFunction(options)) {
        callback = options
        if (typeof uri === "string") {
            params = {uri:uri}
        }
    } else {
        params = xtend(options, {uri: uri})
    }

    params.callback = callback
    return params
}

function createXHR(uri, options, callback) {
    options = initParams(uri, options, callback)
    return _createXHR(options)
}

function _createXHR(options) {
    if(typeof options.callback === "undefined"){
        throw new Error("callback argument missing")
    }

    var called = false
    var callback = function cbOnce(err, response, body){
        if(!called){
            called = true
            options.callback(err, response, body)
        }
    }

    function readystatechange() {
        if (xhr.readyState === 4) {
            loadFunc()
        }
    }

    function getBody() {
        // Chrome with requestType=blob throws errors arround when even testing access to responseText
        var body = undefined

        if (xhr.response) {
            body = xhr.response
        } else {
            body = xhr.responseText || getXml(xhr)
        }

        if (isJson) {
            try {
                body = JSON.parse(body)
            } catch (e) {}
        }

        return body
    }

    function errorFunc(evt) {
        clearTimeout(timeoutTimer)
        if(!(evt instanceof Error)){
            evt = new Error("" + (evt || "Unknown XMLHttpRequest Error") )
        }
        evt.statusCode = 0
        return callback(evt, failureResponse)
    }

    // will load the data & process the response in a special response object
    function loadFunc() {
        if (aborted) return
        var status
        clearTimeout(timeoutTimer)
        if(options.useXDR && xhr.status===undefined) {
            //IE8 CORS GET successful response doesn't have a status field, but body is fine
            status = 200
        } else {
            status = (xhr.status === 1223 ? 204 : xhr.status)
        }
        var response = failureResponse
        var err = null

        if (status !== 0){
            response = {
                body: getBody(),
                statusCode: status,
                method: method,
                headers: {},
                url: uri,
                rawRequest: xhr
            }
            if(xhr.getAllResponseHeaders){ //remember xhr can in fact be XDR for CORS in IE
                response.headers = parseHeaders(xhr.getAllResponseHeaders())
            }
        } else {
            err = new Error("Internal XMLHttpRequest Error")
        }
        return callback(err, response, response.body)
    }

    var xhr = options.xhr || null

    if (!xhr) {
        if (options.cors || options.useXDR) {
            xhr = new createXHR.XDomainRequest()
        }else{
            xhr = new createXHR.XMLHttpRequest()
        }
    }

    var key
    var aborted
    var uri = xhr.url = options.uri || options.url
    var method = xhr.method = options.method || "GET"
    var body = options.body || options.data || null
    var headers = xhr.headers = options.headers || {}
    var sync = !!options.sync
    var isJson = false
    var timeoutTimer
    var failureResponse = {
        body: undefined,
        headers: {},
        statusCode: 0,
        method: method,
        url: uri,
        rawRequest: xhr
    }

    if ("json" in options && options.json !== false) {
        isJson = true
        headers["accept"] || headers["Accept"] || (headers["Accept"] = "application/json") //Don't override existing accept header declared by user
        if (method !== "GET" && method !== "HEAD") {
            headers["content-type"] || headers["Content-Type"] || (headers["Content-Type"] = "application/json") //Don't override existing accept header declared by user
            body = JSON.stringify(options.json === true ? body : options.json)
        }
    }

    xhr.onreadystatechange = readystatechange
    xhr.onload = loadFunc
    xhr.onerror = errorFunc
    // IE9 must have onprogress be set to a unique function.
    xhr.onprogress = function () {
        // IE must die
    }
    xhr.onabort = function(){
        aborted = true;
    }
    xhr.ontimeout = errorFunc
    xhr.open(method, uri, !sync, options.username, options.password)
    //has to be after open
    if(!sync) {
        xhr.withCredentials = !!options.withCredentials
    }
    // Cannot set timeout with sync request
    // not setting timeout on the xhr object, because of old webkits etc. not handling that correctly
    // both npm's request and jquery 1.x use this kind of timeout, so this is being consistent
    if (!sync && options.timeout > 0 ) {
        timeoutTimer = setTimeout(function(){
            if (aborted) return
            aborted = true//IE9 may still call readystatechange
            xhr.abort("timeout")
            var e = new Error("XMLHttpRequest timeout")
            e.code = "ETIMEDOUT"
            errorFunc(e)
        }, options.timeout )
    }

    if (xhr.setRequestHeader) {
        for(key in headers){
            if(headers.hasOwnProperty(key)){
                xhr.setRequestHeader(key, headers[key])
            }
        }
    } else if (options.headers && !isEmpty(options.headers)) {
        throw new Error("Headers cannot be set on an XDomainRequest object")
    }

    if ("responseType" in options) {
        xhr.responseType = options.responseType
    }

    if ("beforeSend" in options &&
        typeof options.beforeSend === "function"
    ) {
        options.beforeSend(xhr)
    }

    xhr.send(body)

    return xhr


}

function getXml(xhr) {
    if (xhr.responseType === "document") {
        return xhr.responseXML
    }
    var firefoxBugTakenEffect = xhr.status === 204 && xhr.responseXML && xhr.responseXML.documentElement.nodeName === "parsererror"
    if (xhr.responseType === "" && !firefoxBugTakenEffect) {
        return xhr.responseXML
    }

    return null
}

function noop() {}

},{"global/window":69,"is-function":73,"parse-headers":83,"xtend":137}],137:[function(require,module,exports){
module.exports = extend

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend() {
    var target = {}

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}

},{}],138:[function(require,module,exports){
module.exports = extend

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}

},{}],139:[function(require,module,exports){
module.exports = getPreviousAnimationData

function getPreviousAnimationData (opts, keyframeTimes) {
  var prevAnimElapsedTime = opts.currentTime - opts.previousAnimation.startTime
  var previousAnimLowerKeyframe
  var previousAnimUpperKeyframe

  var previousKeyframeTimes = keyframeTimes.slice(
    opts.previousAnimation.range[0],
    opts.previousAnimation.range[1] + 1
  )

  // The amount of time that the previous animation was running before the new animation began
  //  during this time it is okay to loop the animation
  // TODO: Better naming
  var leway = opts.currentAnimation.startTime - opts.previousAnimation.startTime
  var currentAnimTimeElapsed = opts.currentTime - opts.currentAnimation.startTime

  // TODO: My mind is jelly but the tests have passed... Refactor this!
  var prevAnimTimeRelToFirstFrame = Number(previousKeyframeTimes[0]) + Number(prevAnimElapsedTime)
  if (prevAnimTimeRelToFirstFrame - leway > previousKeyframeTimes[previousKeyframeTimes.length - 1]) {
    previousAnimLowerKeyframe = previousAnimUpperKeyframe = previousKeyframeTimes[previousKeyframeTimes.length - 1]
    prevAnimElapsedTime = 0
  } else {
    prevAnimTimeRelToFirstFrame = Number(previousKeyframeTimes[0]) + Number(prevAnimElapsedTime)
    var range = previousKeyframeTimes[previousKeyframeTimes.length - 1] - previousKeyframeTimes[0]
    if (prevAnimTimeRelToFirstFrame > range) {
      if (leway > range) {
        var lewayStart = leway % range
        if (lewayStart + currentAnimTimeElapsed > previousKeyframeTimes[previousKeyframeTimes.length - 1]) {
          previousAnimLowerKeyframe = previousAnimUpperKeyframe = previousKeyframeTimes[previousKeyframeTimes.length - 1]
          prevAnimElapsedTime = 0
        } else {
          prevAnimElapsedTime = prevAnimElapsedTime % range
          prevAnimTimeRelToFirstFrame = prevAnimElapsedTime + Number(previousKeyframeTimes[0])
        }
      } else {
        prevAnimElapsedTime = prevAnimElapsedTime % range
        prevAnimTimeRelToFirstFrame = prevAnimElapsedTime + Number(previousKeyframeTimes[0])
      }
    }

    // Get the surrounding keyframes for our previous animation
    previousKeyframeTimes.forEach(function (keyframeTime) {
      if (previousAnimLowerKeyframe && previousAnimUpperKeyframe) { return }
      if (prevAnimTimeRelToFirstFrame > keyframeTime) {
        previousAnimLowerKeyframe = keyframeTime
      }
      if (prevAnimTimeRelToFirstFrame < keyframeTime) {
        previousAnimUpperKeyframe = keyframeTime
      }
    })
  }
  prevAnimElapsedTime = prevAnimTimeRelToFirstFrame - previousAnimLowerKeyframe

  return {
    lower: previousAnimLowerKeyframe,
    upper: previousAnimUpperKeyframe,
    elapsedTime: prevAnimElapsedTime
  }
}

},{}],140:[function(require,module,exports){
module.exports = {
  interpolateJoints: interpolateJoints
}

// TODO: Add thorough comments
// TODO: Refactor duplicative code
// TODO: Rename animation time -> frame. We're dealing with frames not time
// TODO: Benchmark perf
// TODO: Document and accept a frame range AND a keyframe range
//        you can specify the first and last pre-specified keyframes to use or just the actual frame
function interpolateJoints (opts) {
  var currentAnimElapsedTime = opts.currentTime - opts.currentAnimation.startTime

  var keyframeTimes = Object.keys(opts.keyframes).sort(function (a, b) {
    if (Number(a) > Number(b)) { return 1 }
    if (Number(a) < Number(b)) { return -1 }
    return 0
  })

  var currentKeyframeTimes = keyframeTimes.slice(
    opts.currentAnimation.range[0],
    opts.currentAnimation.range[1] + 1
  )

  // Get the number of frames passed the first animation frame
  // TODO: This isn't actually the frame relative to the first..?
  // TODO: Yeah refactor everything once this works
  // Handle looping here
  var frameRelToFirst = Number(currentKeyframeTimes[0]) + Number(currentAnimElapsedTime)
  var range = currentKeyframeTimes[currentKeyframeTimes.length - 1] - currentKeyframeTimes[0]
  if (frameRelToFirst > range) {
    currentAnimElapsedTime = currentAnimElapsedTime % range
    frameRelToFirst = currentAnimElapsedTime + Number(currentKeyframeTimes[0])
  }

  var currentAnimLowerKeyframe
  var currentAnimUpperKeyframe
  // Get the surrounding keyframes for our current animation
  currentKeyframeTimes.forEach(function (keyframeTime) {
    if (currentAnimLowerKeyframe && currentAnimUpperKeyframe) { return }
    if (frameRelToFirst > keyframeTime) {
      currentAnimLowerKeyframe = keyframeTime
    } else if (frameRelToFirst < keyframeTime) {
      currentAnimUpperKeyframe = keyframeTime
    } else if (frameRelToFirst === Number(keyframeTime)) {
      // TODO: Perform fewer calculations in places that we already know
      // that the keyframe time doesn't need to be blended against an upper
      // and lower keyframe. For now we don't handle this special case
      currentAnimLowerKeyframe = currentAnimUpperKeyframe = keyframeTime
    }
  })
  // Set the elapsed time relative to our current lower bound keyframe instead of our lowest out of all keyframes
  currentAnimElapsedTime = frameRelToFirst - currentAnimLowerKeyframe

  var previousAnimLowerKeyframe
  var previousAnimUpperKeyframe
  var prevAnimElapsedTime
  if (opts.previousAnimation) {
    var previousKeyframeData = require('./get-previous-animation-data.js')(opts, keyframeTimes)
    previousAnimLowerKeyframe = previousKeyframeData.lower
    previousAnimUpperKeyframe = previousKeyframeData.upper
    prevAnimElapsedTime = previousKeyframeData.elapsedTime
  }

  // Calculate the interpolated joint matrices for our consumer's animation
  var interpolatedJoints = opts.jointNums.reduce(function (acc, jointName) {
    // If there is a previous animation
    // TODO: don't blend if blend is > 1
    var blend = defaultBlend(opts.currentTime - opts.currentAnimation.startTime)
    if (opts.previousAnimation && blend < 1) {
      acc[jointName] = []

      var previousAnimJointMatrix = []
      var currentAnimJointMatrix = []
      // Blend the two dual quaternions based on where we are in the current keyframe
      // TODO: Rename to previousAnimDualQuat
      previousAnimJointMatrix = opts.keyframes[previousAnimLowerKeyframe][jointName].reduce(function (dualQuat, value, index) {
        // If we are using an exact frame that we already have we do not need to blend
        // TODO: No need to loop in this case
        if (previousAnimUpperKeyframe === previousAnimLowerKeyframe) {
          dualQuat[index] = opts.keyframes[previousAnimLowerKeyframe][jointName][index]
        } else {
          dualQuat[index] = opts.keyframes[previousAnimLowerKeyframe][jointName][index] + (opts.keyframes[previousAnimUpperKeyframe][jointName][index] - opts.keyframes[previousAnimLowerKeyframe][jointName][index]) * (prevAnimElapsedTime / (previousAnimUpperKeyframe - previousAnimLowerKeyframe))
        }
        return dualQuat
      }, [])

      currentAnimJointMatrix = opts.keyframes[currentAnimLowerKeyframe][jointName].reduce(function (dualQuat, value, index) {
        dualQuat[index] = opts.keyframes[currentAnimLowerKeyframe][jointName][index] + (opts.keyframes[currentAnimUpperKeyframe][jointName][index] - opts.keyframes[currentAnimLowerKeyframe][jointName][index]) * (currentAnimElapsedTime / (currentAnimUpperKeyframe - currentAnimLowerKeyframe))
        return dualQuat
      }, [])

      acc[jointName] = previousAnimJointMatrix.reduce(function (dualQuat, value, index) {
        dualQuat[index] = (currentAnimJointMatrix[index] - previousAnimJointMatrix[index]) * blend + previousAnimJointMatrix[index]
        return dualQuat
      }, [])
    } else {
      // Blend the two dual quaternions based on where we are in the current keyframe
      acc[jointName] = opts.keyframes[currentAnimLowerKeyframe][jointName].reduce(function (dualQuat, value, index) {
        // If we have an exact keyframe we just return the value that we already have
        // TODO: We can accomplish this without loopign through each value since we
        // already know that we are at an exact keyframe
        if (currentAnimUpperKeyframe === currentAnimLowerKeyframe) {
          dualQuat[index] = opts.keyframes[currentAnimLowerKeyframe][jointName][index]
          return dualQuat
        }

        dualQuat[index] = opts.keyframes[currentAnimLowerKeyframe][jointName][index] +
        (opts.keyframes[currentAnimUpperKeyframe][jointName][index] - opts.keyframes[currentAnimLowerKeyframe][jointName][index]) *
        (currentAnimElapsedTime / (currentAnimUpperKeyframe - currentAnimLowerKeyframe))
        return dualQuat
      }, [])
    }
    return acc
  }, {})

  return interpolatedJoints
}

// TODO: Comment on what `dt` represents
function defaultBlend (dt) {
  // If zero time has elapsed we avoid dividing by 0
  if (!dt) { return 0 }
  return 1 / 2 * dt
}

// TODO: Event emitter for when animation ends ?

},{"./get-previous-animation-data.js":139}]},{},[13]);
