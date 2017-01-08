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
        var upperBodyAnimName = State.get().upperBody.currentAnimation.name === 'walk' ? 'point' : 'walk'
        State.set('upperBody.currentAnimation', {
          name: upperBodyAnimName,
          range: state.animationRanges[upperBodyAnimName],
          startTime: State.get().currentTime
        })

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
    }, 'Toggle Full Body animation')
  ])
}
