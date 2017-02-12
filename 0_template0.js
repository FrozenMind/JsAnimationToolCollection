//global variables
var stage;

//setting variables
var canBackground, fps;

//call init to start
init();

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
