$(document).ready(function() {
  mainInit();
});

function mainInit() {
  //set canvas fullscreen
  $("#demoCanvas").attr({
    width: $("body").width(),
    height: $("body").height()
  });
  stage = new createjs.Stage('demoCanvas');
  width = stage.canvas.width;
  height = stage.canvas.height;
  createjs.Ticker.addEventListener("tick", mainTick)
  createjs.Ticker.setFPS(30);
}

var selectedMode
var stage

function changeMode() {
  //TODO: delete all active createjs Ticker
  selectedMode = parseInt($("#mode").val());
  console.log(selectedMode);
  stage.removeAllChildren()
  switch (selectedMode) {
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
      redBallsFallInit();
      break;
    case 3: //bubbleTick
      bubbleInit()
      break
  }
}

function mainTick() {
  switch (selectedMode) {
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
