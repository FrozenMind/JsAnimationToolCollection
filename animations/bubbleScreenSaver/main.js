//global variables
var stage;
//setting variables
var canBackground, fps;
//call init to start when document is fully loaded
$(document).ready(function () {
    init();
});
//initialize the project
function init() {
    /*
     * SETTINGS
     */
    canBackground = "RGB(255,255,255)";
    fps = 30;
    /*
     * SETTINGS END
     */
    //create stage
    stage = new createjs.Stage("demoCanvas");
    stage.canvas.style.background = canBackground;
    //create ticker and set fps
    createjs.Ticker.addEventListener("tick", tick);
    createjs.Ticker.setFPS(fps);
}
//ticker, which controls the drawing
function tick() {
    stage.update();
}