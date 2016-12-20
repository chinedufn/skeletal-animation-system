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

