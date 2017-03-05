var stage;
var cells = [];
var cellAmount, cellSize;
var width, height;

$(document).ready(function() {
    init();
});

function init() {
    /*
     * SETTING AREA
     */
    cellAmount = 30;
    cellSize = 5;
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
    createjs.Ticker.setFPS(30);
}

function tick() {
    for (i = cells.length - 1; i >= 0; i--) {
        //check if cells hit borders
        if (cells[i].cell.x < 0 + cellSize || cells[i].cell.x > width - cellSize) {
            cells[i].speedX *= -1;
        } else if (cells[i].cell.y < 0 + cellSize || cells[i].cell.y > height - cellSize) {
            cells[i].speedY *= -1;
        }
        //TODO: check if cell hit another cell
        //and fuse cells if they hit each other by splice one and double add there size to the other one
        cells[i].update();
    }
    stage.update();
}

//cells spawn and check that cells dont hit each other on beginning
function spawncells() {
    counter = 0;
    while (counter < cellAmount) {
        x = Math.random() * (width - cellSize * 2) + cellSize;
        y = Math.random() * (height - cellSize * 2) + cellSize;
        hit = false;
        for (i = 0; i < cells.length; i++) {
            dist = Math.sqrt(Math.pow(cells[i].cell.x - x, 2) + Math.pow(cells[i].cell.y - y, 2))
            if (dist < cellSize * 2) {
                hit = true;
            }
        }
        if (!hit) {
            cells.push(new Cell(x, y));
            counter++;
        }
    }
}
