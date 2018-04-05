window.onload = function () {
  var mask
  if (navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i)) {
    mask = document.getElementById('mask')
    mask.parentNode.removeChild(mask)
    document.getElementById('lines-dots').style.fill = '#fafafa'
  } else {
    mask = document.getElementById('mask')
    mask.setAttribute('width', window.innerWidth * 2)
    mask.setAttribute('height', window.innerHeight * 2)
    mask.setAttribute('x', -window.innerWidth)
    mask.setAttribute('y', -window.innerHeight)
    document.onmousemove = function (evt) {
      mask.setAttribute('x', evt.clientX - mask.getAttribute('width') / 2)
      mask.setAttribute('y', evt.clientY - mask.getAttribute('height') / 2)
    }
  }
}
