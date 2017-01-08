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
        var lowerBodyAnimName = State.get().lowerBody.currentAnimation.name === 'walk' ? 'point' : 'walk'
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
