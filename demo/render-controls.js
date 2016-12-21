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
