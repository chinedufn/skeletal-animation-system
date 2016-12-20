var h = require('virtual-dom/h')

module.exports = renderControls

var animationRanges = {
  'dance': [0, 3],
  'bend': [3, 6]
}

function renderControls (State) {
  var controls = h('div', {
  }, [
    h('div', {
      style: {
        display: 'flex',
        'align-items': 'center',
        width: '100%',
        height: '100px'
      }
    }, [
      h('button', {
        style: {
          cursor: 'pointer',
          height: '30px'
        },
        onclick: function () {
          State.set('previousAnimation', {
            range: animationRanges[State.get().currentAnimation.name],
            startTime: State.get().currentAnimation.startTime
          })

          var newAnimationName = State.get().currentAnimation.name === 'dance' ? 'bend' : 'dance'
          State.set('currentAnimation', {
            name: newAnimationName,
            range: animationRanges[newAnimationName],
            startTime: State.get().currentTime
          })
        }
      }, 'Change animation')
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
