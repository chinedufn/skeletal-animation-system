// test to see which version of scrollTop the browser uses
document.body.scrollTop += 1
var doc = document.body.scrollTop ? document.body : document.documentElement
document.body.scrollTop -= 1

window.onload = function () {
  var mobile = false

  var mask
  if (navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i)) {
    mask = document.getElementById('mask')
    mask.parentNode.removeChild(mask)
    document.getElementById('lines-dots').style.fill = '#fafafa'
    mobile = true
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

  document.onscroll = function () {
    if (doc.scrollTop > 100) {
      document.getElementsByTagName('nav')[0].style.background = '#FFF'
    } else if (doc.scrollTop < 100 &&
       window.innerWidth > 763) {
      document.getElementsByTagName('nav')[0].style.background = 'transparent'
    }
  }

  var demoBtn = document.getElementById('demo-btn')
  anime({
    targets: '#demo-btn svg',
    top: '+=5',
    direction: 'alternate',
    loop: true,
    easing: 'easeInOutSine',
    duration: 400
  })

  demoBtn.onclick = function () {
    scrollTo(document.getElementById('demo-btn').offsetTop)
  }

  document.getElementById('tuts-a').onclick = function () {
    scrollTo(document.getElementById('tuts').offsetTop)
  }

  document.getElementById('api-a').onclick = function () {
    scrollTo(document.getElementById('ap').offsetTop)
  }

  document.getElementById('abt-a').onclick = function () {
    scrollTo(document.getElementById('abt').offsetTop)
  }

  var demoBtns = document.getElementsByClassName('lbl')
  for (var i = 0; i < demoBtns.length; ++i) {
    demoBtns[i].anime = btnAnimation(demoBtns[i])
    if (!mobile) {
      demoBtns[i].onmouseenter = function () {
        this.anime.out.pause()
        this.anime.in.restart()
      }
      demoBtns[i].onmouseleave = function () {
        this.anime.in.pause()
        this.anime.out.pause()
        this.anime.out.restart()
      }
      demoBtns[i].onclick = function () {
      }
    } else {
      demoBtns[i].onclick = function () {
        this.anime.in.pause()
        this.anime.click.restart()
      }
    }
  }

  var gsBtn = document.getElementById('get-started-btn')
  gsBtn.anime = btnAnimation(gsBtn)

  if (!mobile) {
    gsBtn.onmouseenter = function () {
      gsBtn.anime.out.pause()
      gsBtn.anime.in.restart()
    }

    gsBtn.onmouseleave = function () {
      gsBtn.anime.in.pause()
      gsBtn.anime.out.restart()
    }
  }

  gsBtn.onclick = function () {
    gsBtn.anime.in.pause()
    gsBtn.anime.click.restart()
    scrollTo(document.getElementById('abt').offsetTop)
  }
}

function btnAnimation (target) {
  var ain = anime({
    targets: target,
    scale: 1.05,
    duration: 1500
  })
  ain.pause()
  var cl = anime({
    targets: target,
    scale: 0.9,
    direction: 'alternate',
    ease: 'outCirc',
    duration: 50
  })
  cl.pause()
  var aout = anime({
    targets: target,
    scale: [1.05, 1]
  })

  return {in: ain, out: aout, click: cl}
}

function scrollTo (target) {
  anime({
    targets: doc,
    scrollTop: target,
    easing: 'easeInOutCubic',
    duration: 500
  })
}
