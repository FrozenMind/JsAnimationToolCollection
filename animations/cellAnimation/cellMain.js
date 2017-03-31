var stage;
var cells = [];
var cellAmount, cellRadius, plopCount, cellSpeed;
var fps;
var width, height;

function cellAnimationInit() {
    /*
     * SETTING AREA
     */
    cellAmount = 100;
    cellRadius = 5;
    fps = 60;
    plopCount = 5;
    cellSpeed = 2;
    /*
     * END SETTING AREA
     */
    stage = new createjs.Stage('demoCanvas');
    stage.canvas.style.background = '#000000';
    width = stage.canvas.width;
    height = stage.canvas.height;

    spawncells();
    createjs.Ticker.addEventListener("tick", cellTick);
    createjs.Ticker.setFPS(fps);
}

function cellTick() {
    for (i = cells.length - 1; i >= 0; i--) {
        //check if cells hit borders, return speed if they do
        //set cell to border, so it dont escape
        if (cells[i].cell.x < cells[i].radius) {
            cells[i].speedX *= -1;
            cells[i].cell.x = cells[i].radius;
        } else if (cells[i].cell.x > width - cells[i].radius) {
            cells[i].speedX *= -1;
            cells[i].cell.x = width - cells[i].radius;
        } else if (cells[i].cell.y < cells[i].radius) {
            cells[i].speedY *= -1;
            cells[i].cell.y = cells[i].radius;
        } else if (cells[i].cell.y > height - cells[i].radius) {
            cells[i].speedY *= -1;
            cells[i].cell.y = height - cells[i].radius;
        }
        var spliced = false;
        //check hit with other cells
        for (j = i - 1; j >= 0; j--) {
            var d = Math.sqrt(Math.pow(cells[i].cell.x - cells[j].cell.x, 2) + Math.pow(cells[i].cell.y - cells[j].cell.y, 2));
            if (d < cells[j].radius + cells[i].radius) {
                cells[j].radius += cells[i].radius;
                cells[j].cell.graphics.drawCircle(0, 0, cells[j].radius);
                stage.removeChild(cells[i].cell);
                cells.splice(i, 1);
                spliced = true;
                break;
            }
        }
        if (!spliced)
            cells[i].update();
    }
    for (i = cells.length - 1; i >= 0; i--) {
        //cell explodes when its to huge
        if (cells[i].radius > cellRadius * plopCount) {
            var newCellCount = Math.floor(cells[i].radius / cellRadius);
            for (j = 0; j < newCellCount; j++) {
                var newX = cells[i].cell.x + Math.cos(360 * (j / newCellCount - 1)) * cellRadius * 5;
                var newY = cells[i].cell.y + Math.sin(360 * (j / newCellCount - 1)) * cellRadius * 5;
                var newSpeedX = cellSpeed * Math.cos(360 * (j / newCellCount - 1));
                var newSpeedY = cellSpeed * Math.sin(360 * (j / newCellCount - 1));
                cells.push(new Cell(newX, newY));
                cells[cells.length - 1].setNewSpeed(newSpeedX, newSpeedY);
            }
            stage.removeChild(cells[i].cell);
            cells.splice(i, 1);
        }
    }
    stage.update();
}

//cells spawn and check that cells dont hit each other on beginning
function spawncells() {
    counter = 0;
    var spawnTimeout = 0;
    while (counter < cellAmount) {
        x = Math.random() * (width - cellRadius * 2) + cellRadius;
        y = Math.random() * (height - cellRadius * 2) + cellRadius;
        hit = false;
        for (i = 0; i < cells.length; i++) {
            dist = Math.sqrt(Math.pow(cells[i].cell.x - x, 2) + Math.pow(cells[i].cell.y - y, 2))
            if (dist < (cellRadius + cellSpeed) * 2) {
                hit = true;
            }
        }
        if (!hit) {
            cells.push(new Cell(x, y));
            counter++;
            spawnTimeout = 0;
        } else {
            spawnTimeout++;
        }
        //check if timeout is reached
        if (spawnTimeout >= 1000) {
            console.log("Timeout reached");
            break;
        }
    }
    console.log(cells.length + ' Cells spawned');
}
