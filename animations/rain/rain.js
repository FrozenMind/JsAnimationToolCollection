var circle;
var drops = [];
var cloud, rain;

function rainInit() {
  cloud = new Cloud();
  rain = new Rain();
  stage.canvas.style.background = opt.rain.canBg || opt.global.canBg
}

function rainTick() {
  rain.addDrops(opt.rain.ratio);
  rain.update();
  cloud.update();
  rain.show();
}
//create an ellipse and push it to stage
function Raindrop() {
  this.cir = new createjs.Shape();
  this.b = Math.floor(Math.random() * (opt.rain.drop.blueEndColor - opt.rain.drop.blueStartColor || 230) + (opt.rain.drop.blueStartColor || 40)); //random blue color
  this.width = Math.floor(Math.random() * (opt.rain.drop.maxWidth - opt.rain.drop.minWidth || 8) + (opt.rain.drop.minWidth || 3)); //width of ellipse
  this.height = Math.floor(Math.random() * (opt.rain.drop.maxHeight - opt.rain.drop.minHeight || 8) + (opt.rain.drop.minHeight || 3)); //height of ellipse
  this.cir.x = Math.floor(Math.random() * (stage.canvas.width + opt.rain.windSpeed) - opt.rain.windSpeed);
  this.cir.y = -this.height;
  this.speedX = opt.rain.windSpeed / (this.height + this.width); //its the wind effect
  this.speedY = (opt.rain.drop.dropSpeed || 100) / (this.height + this.width); //bigger raindrop should fall faster
  this.update = function() {
    this.cir.x += this.speedX;
    this.cir.y += this.speedY;
  };
  this.show = function() {
    this.cir.graphics.beginFill("rgb(0,0," + this.b + ")").drawEllipse(this.cir.x, this.cir.y, this.width, this.height);
    this.cir.updateCache();
    stage.addChild(this.cir);
  };
}
//rain controls drops, so i can create a modify the constructor to make things like color rain
function Rain() {
  this.drops = [];
  this.addDrops = function(count) {
    for (i = 1; i < count; i++) {
      this.drops.push(new Raindrop());
    }
  };
  this.update = function() {
    for (i = this.drops.length - 1; i >= 0; i--) {
      this.drops[i].update();
      if (this.drops[i].cir.y > stage.canvas.height) {
        stage.removeChild(this.drops[i].cir);
        this.drops.splice(i, 1);
      }
    }
  };
  this.show = function() {
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
  this.speedX = opt.rain.windSpeed; //wind moves clouds
  this.update = function() {};
}
