function Cell(x, y, color) {
    this.speed = cellSpeed;
    this.speedX = Math.floor(Math.random() * this.speed * 2 - this.speed);
    this.speedY = (this.speed - Math.abs(this.speedX)) * (Math.floor(Math.random() * 2) == 0 ? -1 : 1);
    this.dicellion = Math.floor(Math.random() * 8 + 1);
    this.cell = new createjs.Shape();
    this.cell.x = x;
    this.cell.y = y;
    this.radius = cellRadius;
    //colors in hex string
    this.r = color.r;
    this.g = color.g;
    this.b = color.b;
    this.cell.graphics.beginFill('#' + this.r + '' + this.g + '' + this.b).drawCircle(0, 0, this.radius);
    stage.addChild(this.cell);
}

Cell.prototype.update = function() {
    this.cell.x += this.speedX;
    this.cell.y += this.speedY;
}

Cell.prototype.setNewSpeed = function(x, y) {
    this.speedX = x
    this.speedY = y
}
