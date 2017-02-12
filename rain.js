var stage;
var circle;
var drops = [];
var cloud, rain;
//settings variables
var windSpeed, fps, rainOptions, rainRatio, canBackground;
init();

function init() {
    /*
     * SETTINGS
     */
    windSpeed = 10;
    fps = 10;
    rainRatio = 30; //amount of drops that are generated every frame
    canBackground = "RGB(40,40,40)";
    //to set the rain options, dont remove an attribute: if u want to use default value set it undefined
    rainOptions = {
        minHeight: 5
        , maxHeight: 7
        , minWidth: 4
        , maxWidth: 6
        , dropSpeed: 200
        , blueStartColor: 100
        , blueEndColor: 200 //max is 256
    };
    /*
     * SETTINGS END
     */
    cloud = new Cloud();
    rain = new Rain(rainOptions);
    stage = new createjs.Stage("demoCanvas");
    stage.canvas.style.background = canBackground;
    createjs.Ticker.addEventListener("tick", tick);
    createjs.Ticker.setFPS(fps);
}

function tick() {
    rain.addDrops(rainRatio);
    rain.update();
    cloud.update();
    rain.show();
    stage.update();
    console.log(createjs.Ticker.getMeasuredFPS());
}
//create an ellipse and push it to stage
function Raindrop(opts) {
    this.cir = new createjs.Shape();
    this.b = Math.floor(Math.random() * (opts.blueEndColor - opts.blueStartColor || 230) + (opts.blueStartColor || 40)); //random blue color
    this.width = Math.floor(Math.random() * (opts.maxWidth - opts.minWidth || 8) + (opts.minWidth || 3)); //width of ellipse
    this.height = Math.floor(Math.random() * (opts.maxHeight - opts.minHeight || 8) + (opts.minHeight || 3)); //height of ellipse
    this.cir.x = Math.floor(Math.random() * (stage.canvas.width + windSpeed) - windSpeed);
    this.cir.y = -this.height;
    this.speedX = windSpeed / (this.height + this.width); //its the wind effect
    this.speedY = (opts.dropSpeed || 100) / (this.height + this.width); //bigger raindrop should fall faster
    this.update = function () {
        this.cir.x += this.speedX;
        this.cir.y += this.speedY;
    };
    this.show = function () {
        this.cir.graphics.beginFill("rgb(0,0," + this.b + ")").drawEllipse(this.cir.x, this.cir.y, this.width, this.height);
        this.cir.updateCache();
        stage.addChild(this.cir);
    };
}
//rain controls drops, so i can create a modify the constructor to make things like color rain
function Rain(opts) {
    this.drops = [];
    this.addDrops = function (count) {
        for (i = 1; i < count; i++) {
            this.drops.push(new Raindrop(opts));
        }
    };
    this.update = function () {
        for (i = this.drops.length - 1; i >= 0; i--) {
            this.drops[i].update();
            if (this.drops[i].cir.y > stage.canvas.height) {
                stage.removeChild(this.drops[i].cir);
                this.drops.splice(i, 1);
            }
        }
    };
    this.show = function () {
        for (var i = 0; i < this.drops.length; i++) {
            var drop = this.drops[i];
            drop.cir.snapToPixel = true;
            drop.cir.cache(drop.cir.x, drop.cir.y, drop.width, drop.height);
            drop.show();
        }
    }
}
//generate Cloud
function Cloud() {
    this.cir = [];
    this.speedX = windSpeed; //wind moves clouds
    this.update = function () {};
}