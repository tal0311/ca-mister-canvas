var gElCanvas
var gCtx

function onInit() {
  gElCanvas = document.querySelector('canvas')

  console.log('canvas loaded')
  gCtx = gElCanvas.getContext('2d')
  addListeners()
}

function onWidthChange(value) {
  console.log(value)
  setUserLineWidth(+value)
}

function oncShapeSelection(el) {
  const { value } = el
  setUserShape(value)
}

function onColorPIcked(value) {
  const userColor = value
  setUserColor(userColor)
}

// export to utils
function addListeners() {
  gElCanvas.addEventListener('mousemove', onMove)
  gElCanvas.addEventListener('mousedown', onDown)
  gElCanvas.addEventListener('mouseup', onUp)
}

// mouse events
function onDown(ev) {
  setDrawState()
  console.log('mouse down')
}

function onMove(ev) {
  if (gUser.isDraw) {
    setPosition(ev)
    drawShape()
  }
}

function onUp() {
  setDrawState()
  console.log('mouse up')
}

function drawShape() {
  let user = getUserProps()
  let { color, shape, lineWidth, x, y, isDraw } = user
  isDraw = true

  if (shape === 'triangle') {
    drawTriangle(x, y, color, lineWidth)
  }

  if (shape === 'circle') {
    drawCircle(x, y, color, lineWidth)
  }

  if (shape === 'square') {
    drawRectangle(x, y, color, lineWidth)
  }
  if (shape === 'line') {
    drawLine(x, y, color, lineWidth)
  }
}

function drawTriangle(x, y, color, lineWidth) {
  console.log('triangle')
  console.log(x, y)
  gCtx.beginPath()
  gCtx.moveTo(x, y)
  gCtx.lineWidth = lineWidth
  gCtx.lineTo(x + 30, y + 30)
  gCtx.lineTo(x - 30, y + 30)
  gCtx.closePath()
  gCtx.fillStyle = color
  // gCtx.fill()
  gCtx.strokeStyle = color
  gCtx.stroke()
  gCtx.closePath()
}

function drawCircle(x, y, color, lineWidth) {
  console.log('circle')
  gCtx.beginPath()
  gCtx.lineWidth = lineWidth
  gCtx.arc(x, y, 20, 0, 2 * Math.PI)
  gCtx.strokeStyle = color
  gCtx.stroke()
  gCtx.fillStyle = color
  // gCtx.fill()
  gCtx.closePath()
}

function drawRectangle(x, y, color, lineWidth) {
  console.log('suqare')
  gCtx.beginPath()
  gCtx.rect(x, y, 50, 50)
  gCtx.fillStyle = color
  // gCtx.fillRect(x, y, 50, 50)
  gCtx.strokeStyle = color
  gCtx.stroke()
  gCtx.closePath()
}

function drawLine(x, y, color, lineWidth) {
  gCtx.beginPath()
  gCtx.moveTo(x, y)
  gCtx.lineWidth = lineWidth
  gCtx.strokeStyle = color
  gCtx.lineTo(x + 30, y + 30)
  gCtx.stroke()
  gCtx.closePath()
}

function onDownloadImg(elLink) {
  let imgContent = gElCanvas.toDataURL('image/png')

  elLink.href = imgContent
}

function clearCanvas() {
  console.log('clear canvas')
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}

// upload image to canvas
function onImgInput(ev) {
  loadImageFromInput(ev, renderImg)
}

function loadImageFromInput(ev, onImageReady) {
  var reader = new FileReader()

  reader.onload = function (event) {
    console.log('onload')
    var img = new Image()
    // Render on canvas
    img.onload = onImageReady.bind(null, img)
    img.src = event.target.result
  }
  console.log('after')
  reader.readAsDataURL(ev.target.files[0])
}

function renderImg(img) {
  gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}
