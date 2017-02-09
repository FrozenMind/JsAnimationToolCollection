var stage;
var circle;
var arr = [];

init();

function init() {
    stage = new createjs.Stage("demoCanvas");
    for (i = 0; i <
        arr.length; i++) {
        stage.addChild(arr[i]);
    }
    createjs.Ticker.addEventListener("tick", tick);
    createjs.Ticker.setFPS(30);
}
var up = false;

function tick() {
    arr.push(newCircle(Math.floor(Math.random() * (stage.canvas.width - 10) + 1), Math.floor(Math.random() * 6 + 1), Math.floor(Math.random() * 30 + 5)));
    for (i = arr.length - 1; i >= 0; i--) {
        arr[i].y += arr[i].speed;
        if (arr[i].y > stage.canvas.height + 10) {
            stage.removeChild(arr[i]);
            arr.splice(i, 1);
        }
    }
    stage.update();
}
var r, g, b;

function newCircle(yy, spee, siz) {
    var cir = new createjs.Shape();
    r = Math.floor((Math.random() * 255) + 1);
    g = Math.floor((Math.random() * 255) + 1);
    b = Math.floor((Math.random() * 255) + 1);
    g = 0;
    b = 0;
    cir.graphics.beginFill("rgb(" + r + "," + g + "," + b + ")").drawCircle(0, 0, siz);
    cir.x = yy;
    cir.y = -10;
    stage.addChild(cir);
    cir.speed = spee;
    return cir;
}
