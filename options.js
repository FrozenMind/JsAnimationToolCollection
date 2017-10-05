//TODO: handle default values somehow
let opt = {
  global: {
    canBg: "#000",
    fps: 30
  },
  bubble: {
    canBg: "#000"
  },
  cell: {
    canBg: "#000",
    amount: 100,
    radius: 5,
    plopCount: 5,
    speed: 2
  },
  rain: {
    canBg: "#888",
    windSpeed: 10,
    ratio: 3, //new drops per tick
    drop: {
      minHeight: 7,
      maxHeight: 9,
      minWidth: 5,
      maxWidth: 7,
      dropSpeed: 50,
      blueStartColor: 100,
      blueEndColor: 200 //max is 256
    }
  },
  redBall: {
    canBg: "#fff",
    down: true, //true = balls fall, false = balls go up
    maxSpeed: 10, //max fall speed ! maxSpeed >= minSpeed !
    minSpeed: 5, //min fall speed
    maxSize: 15, //max ball size ! maxSize >= minSize !
    minSize: 10 //min ball size
  }
}
