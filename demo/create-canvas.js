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
