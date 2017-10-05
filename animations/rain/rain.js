let drops = []
let rain

function rainInit() {
  rain = new Rain()
  stage.canvas.style.background = opt.rain.canBg || opt.global.canBg
}

function rainTick() {
  rain.addDrops(opt.rain.ratio)
  rain.update()
}

//rain controls the display of rain drops
function Rain() {
  this.drops = []
  //add an amout of new drops
  this.addDrops = function(count) {
    for (i = 1; i < count; i++) {
      this.drops.push(new Raindrop())
    }
  }
  //update raindrops
  this.update = function() {
    for (i = this.drops.length - 1; i >= 0; i--) {
      this.drops[i].update();
      if (this.drops[i].cir.y > height || this.drops[i].cir.x > width) {
        stage.removeChild(this.drops[i].cir);
        this.drops.splice(i, 1);
      }
    }
  }
}

//create an drop(ellipse) and add it to stage
function Raindrop() {
  this.cir = new createjs.Shape();
  this.blue = Math.floor(Math.random() * (opt.rain.drop.blueEndColor - opt.rain.drop.blueStartColor + 1) + (opt.rain.drop.blueStartColor)) //random blue color
  this.width = Math.floor(Math.random() * (opt.rain.drop.maxWidth - opt.rain.drop.minWidth + 1) + (opt.rain.drop.minWidth)) //width of ellipse
  this.height = Math.floor(Math.random() * (opt.rain.drop.maxHeight - opt.rain.drop.minHeight + 1) + (opt.rain.drop.minHeight)) //height of ellipse
  this.cir.x = Math.floor(Math.random() * width) //random x start pos
  this.cir.y = -this.height //y start pos is out of top screen for the amout of the drop height
  this.speedX = opt.rain.windSpeed / (this.height + this.width) //its the wind effect TODO: check calc
  this.speedY = (opt.rain.drop.dropSpeed) / (this.height + this.width); //bigger raindrop should fall faster TODO: check calc
  this.cir.graphics.beginFill("rgb(0,0," + this.blue + ")").drawEllipse(this.cir.x, this.cir.y, this.width, this.height)
  stage.addChild(this.cir)
  //update the raindrop pos
  this.update = function() {
    this.cir.x += this.speedX
    this.cir.y += this.speedY
  }
}
