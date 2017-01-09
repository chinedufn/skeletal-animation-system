module.exports = createCanvas

// TODO: Turn into module
function createCanvas (State) {
  var canvas = document.createElement('canvas')
  canvas.style.width = '100%'
  canvas.style.height = '100%'

  var observer = new window.MutationObserver(checkForCanvas.bind(observer, State, stopObserving, canvas))
  observer.observe(document.body, {childList: true, subtree: true})

  // Adjust our viewport in state whenever the screen resizes, otherwise our would get distorted
  window.addEventListener('resize', function () {
    var positionInfo = canvas.getBoundingClientRect()
    canvas.height = positionInfo.height
    canvas.width = positionInfo.width
    State.set('viewport', {width: canvas.width, height: canvas.height})
  })

  canvas.addEventListener('touchstart', function preventScroll (e) {
    e.preventDefault()

    for (var i = 0; i < e.changedTouches.length; i++) {
      var touch = e.changedTouches[i]
      var touchID = touch.identifier
      State.set('touches.' + touchID, {
        startXPos: touch.pageX,
        startYPos: touch.pageY,
        xPos: touch.pageX,
        yPos: touch.pageY
      })
    }
  })

  canvas.addEventListener('touchmove', function (e) {
    e.preventDefault()

    var numTouches = e.changedTouches.length
    if (numTouches === 1) {
      var state = State.get()
      var touch = e.changedTouches[0]
      var xDelta = touch.pageX - state.touches[touch.identifier].xPos
      var yDelta = touch.pageY - state.touches[touch.identifier].yPos

      var newXRadians = state.camera.xRadians + (yDelta / 225)
      var newYRadians = state.camera.yRadians - (xDelta / 225)
      newXRadians = Math.min(newXRadians, 0.8)
      newXRadians = Math.max(newXRadians, -0.8)

      state.touches[touch.identifier] = {
        xPos: touch.pageX,
        yPos: touch.pageY
      }
      state.camera = {
        xRadians: newXRadians,
        yRadians: newYRadians
      }
      State.set(state)
    } else if (numTouches === 2) {
      // Zoom in and out
    }
  })

  canvas.addEventListener('touchend', function (e) {
    e.preventDefault()

    for (var i = 0; i < e.changedTouches.length; i++) {
      var touch = e.changedTouches[i]
      var touchID = touch.identifier
      State.del('touches.' + touchID)
    }
  })

  canvas.addEventListener('mousedown', function (e) {
    State.set('mousepressed', {
      startXPos: e.pageX,
      startYPos: e.pageY,
      xPos: e.pageX,
      yPos: e.pageY
    })
  })

  canvas.addEventListener('mousemove', function (e) {
    var state = State.get()
    // If the mouse is currently held down then any mouse movement will cause the camera to move
    if (state.mousepressed) {
      var xDelta = e.pageX - state.mousepressed.xPos
      var yDelta = e.pageY - state.mousepressed.yPos

      var newXRadians = state.camera.xRadians + (yDelta / 200)
      var newYRadians = state.camera.yRadians - (xDelta / 200)

      // Clamp the camera between a maximum and minimum up and down rotation
      newXRadians = Math.min(newXRadians, 0.8)
      newXRadians = Math.max(newXRadians, -0.8)

      // Update our current mouse position so that we can compare against it on next mouse move
      state.mousepressed = {
        xPos: e.pageX,
        yPos: e.pageY
      }
      // Update our camera's rotation
      state.camera = {
        xRadians: newXRadians,
        yRadians: newYRadians
      }
      State.set(state)
    }
  })

  // Set that the mouse is no longer pressed
  canvas.addEventListener('mouseup', function (e) {
    State.set('mousepressed', false)
  })

  return {
    canvas: canvas
  }

  // TODO: I forgot what I'm even using this for
  function stopObserving () {
    observer.disconnect()
  }
}

function checkForCanvas (State, stop, canvas, mutationRecords) {
  // wait this makes no sense. whatever
  mutationRecords.forEach(function (mutationRecord) {
    var positionInfo = canvas.getBoundingClientRect()
    canvas.width = positionInfo.width
    canvas.height = positionInfo.height
    State.set('viewport', {width: canvas.width, height: canvas.height})
    stop()
  })
}
