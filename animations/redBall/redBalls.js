let balls = []

function redBallsInit() {
  stage.canvas.style.background = opt.redBall.canBg || opt.global.canBg
}

function redBallTick() {
  //create a new ball every tick
  balls.push(newCircle())
  for (i = balls.length - 1; i >= 0; i--) {
    if (opt.redBall.down)
      balls[i].y += balls[i].speed
    else
      balls[i].y -= balls[i].speed
    if (balls[i].y > height + opt.redBall.maxSize || balls[i].y < -opt.redBall.maxSize) {
      stage.removeChild(balls[i])
      balls.splice(i, 1)
    }
  }
}

function newCircle() {
  //calc random start pos, speed, size
  let x = Math.floor(Math.random() * width)
  let speed = Math.floor(Math.random() * (opt.redBall.maxSpeed - opt.redBall.minSpeed + 1) + opt.redBall.minSpeed)
  let size = Math.floor(Math.random() * (opt.redBall.maxSize - opt.redBall.minSize + 1) + opt.redBall.minSize)
  let cir = new createjs.Shape()
  //calculte random color
  r = Math.floor((Math.random() * 255) + 1) //0-256
  //  g = Math.floor((Math.random() * 255) + 1)
  //  b = Math.floor((Math.random() * 255) + 1)
  g = 0
  b = 0
  cir.graphics.beginFill("rgb(" + r + "," + g + "," + b + ")").drawCircle(0, 0, size)
  cir.x = x
  //if will fall down, set on top of screen
  if (opt.redBall.down)
    cir.y = -opt.redBall.maxSize
  else //otherwie on bottom
    cir.y = height + opt.redBall.maxSize
  stage.addChild(cir)
  cir.speed = speed
  return cir
}
