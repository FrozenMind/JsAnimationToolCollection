var stage;
var cells = [];
var cellAmount, cellRadius, plopCount;
var fps;
var width, height;

$(document).ready(function() {
    init();
});

function init() {
    /*
     * SETTING AREA
     */
    cellAmount = 150;
    cellRadius = 5;
    fps = 60;
    plopCount = 5;
    /*
     * END SETTING AREA
     */
    //set canvas fullscreen
    $("#demoCanvas").attr({
        width: $("body").width(),
        height: $("body").height()
    });
    stage = new createjs.Stage('demoCanvas');
    stage.canvas.style.background = '#000000';
    width = stage.canvas.width;
    height = stage.canvas.height;

    spawncells();
    createjs.Ticker.addEventListener("tick", tick);
    createjs.Ticker.setFPS(fps);
}

function tick() {
    for (i = cells.length - 1; i >= 0; i--) {
        //check if cells hit borders, return speed if they do
        if (cells[i].cell.x < 0 + cells[i].radius || cells[i].cell.x > width - cells[i].radius) {
            cells[i].speedX *= -1;
        } else if (cells[i].cell.y < 0 + cells[i].radius || cells[i].cell.y > height - cells[i].radius) {
            cells[i].speedY *= -1;
        }
        var spliced = false;
        //check hit with other cells
        for (j = i - 1; j >= 0; j--) {
            var d = Math.sqrt(Math.pow(cells[i].cell.x - cells[j].cell.x, 2) + Math.pow(cells[i].cell.y - cells[j].cell.y, 2));
            if (d < cells[j].radius + cells[i].radius) {
                console.log("hitted");
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
            var max = Math.floor(cells[i].radius / cellRadius);
            for (j = 0; j < max; j++) {
                cells.push(new Cell(cells[i].cell.x + Math.cos(360 * (j / max - 1)) * cellRadius * 5, cells[i].cell.y + Math.sin(360 * (j / max - 1)) * cellRadius * 5));
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
    while (counter < cellAmount) {
        x = Math.random() * (width - cellRadius * 2) + cellRadius;
        y = Math.random() * (height - cellRadius * 2) + cellRadius;
        hit = false;
        for (i = 0; i < cells.length; i++) {
            dist = Math.sqrt(Math.pow(cells[i].cell.x - x, 2) + Math.pow(cells[i].cell.y - y, 2))
            if (dist < cellRadius * 2) {
                hit = true;
            }
        }
        if (!hit) {
            cells.push(new Cell(x, y));
            counter++;
        }
    }
    console.log('Cells spawned');
}
