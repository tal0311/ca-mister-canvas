var gUser = {
  color: '#3333',
  shape: 'line',
  lineWidth: 2,
  isDraw: false,
}

function getUserProps() {
  return gUser
}

function setUserColor(userColor) {
  gUser.color = userColor
  console.log(gUser.color)
}

function setUserShape(shape) {
  gUser.shape = shape
  console.log('set user shape:', gUser.shape)
}
function setUserLineWidth(value) {
  gUser.lineWidth = value
  console.log('line', gUser.lineWidth)
}

function setPosition(ev) {
  gUser.x = ev.offsetX
  gUser.y = ev.offsetY
  console.log(gUser.x, gUser.y)
}

function setDrawState() {
  return (gUser.isDraw = !gUser.isDraw)
}
