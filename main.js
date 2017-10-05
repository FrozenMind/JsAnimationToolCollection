let selectedMode
let stage, width, height

$(document).ready(function() {
  mainInit();
})

function mainInit() {
  //set canvas fullscreen
  $("#demoCanvas").attr({
    width: $("body").width(),
    height: $("body").height()
  });
  stage = new createjs.Stage('demoCanvas');
  stage.background = opt.global.canBg
  width = stage.canvas.width;
  height = stage.canvas.height;
  createjs.Ticker.addEventListener("tick", mainTick)
  createjs.Ticker.setFPS(opt.global.fps);
}

function changeMode() {
  //TODO: delete all active createjs Ticker
  selectedMode = parseInt($("#mode").val());
  console.log(selectedMode);
  stage.removeAllChildren()
  switch (selectedMode) {
    case -1: //off
      break;
    case 0: //cellAnimation
      console.log("started Cell Animation");
      cellAnimationInit();
      break;
    case 1: //rain
      console.log("started Rain Animation");
      rainInit();
      break;
    case 2: //redball
      console.log("started Red Ball Animation");
      redBallsInit();
      break;
    case 3: //bubbleTick
      bubbleInit()
      break
  }
}

function mainTick() {
  switch (selectedMode) {
    case -1: //none
      break;
    case 0: //cellAnimation
      cellTick()
      break;
    case 1: //rain
      rainTick()
      break;
    case 2: //redball
      redBallTick()
      break;
    case 3: //bubble
      bubbleTick()
      break
  }
  stage.update()
  //createjs.Ticker.getMeasuredFPS()
}
