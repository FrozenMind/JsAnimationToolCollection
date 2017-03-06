function Cell(x, y) {
    this.speed = 2;
    this.speedX = Math.floor(Math.random() * this.speed * 2 - this.speed);
    this.speedY = (this.speed - Math.abs(this.speedX)) * (Math.floor(Math.random() * 2) == 0 ? -1 : 1);
    this.dicellion = Math.floor(Math.random() * 8 + 1);
    this.cell = new createjs.Shape();
    this.cell.x = x;
    this.cell.y = y;
    this.cell.radius = cellRadius;
    this.cell.graphics.beginFill('#cc0000').drawCircle(0, 0, cellRadius);
    stage.addChild(this.cell);
}

Cell.prototype.update = function() {
    this.cell.x += this.speedX;
    this.cell.y += this.speedY;
}

Cell.prototype.setNewSpeed = function() {
    this.speedX = Math.floor(Math.random() * this.speed * 2 - this.speed);
    this.speedY = (this.speed - Math.abs(this.speedX)) * Math.floor(Math.random() * 2 - 1);
}
