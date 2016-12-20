module.exports = createControls

function createControls (State) {
  var controls = document.createElement('div')
  controls.innerHTML = 'hi'
  controls.style.height = '100px'

  return controls
}
