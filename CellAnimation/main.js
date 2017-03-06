var stage;
var cells = [];
var cellAmount, cellRadius;
var width, height;

$(document).ready(function() {
    init();
});

function init() {
    /*
     * SETTING AREA
     */
    cellAmount = 30;
    cellRadius = 5;
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
        if (cells[i].cell.x < 0 + cellRadius || cells[i].cell.x > width - cellRadius) {
            cells[i].speedX *= -1;
        } else if (cells[i].cell.y < 0 + cellRadius || cells[i].cell.y > height - cellRadius) {
            cells[i].speedY *= -1;
        }
        for (j = i - 1; j >= 0; j--) {
            var d = Math.sqrt(Math.pow(cells[i].cell.x - cells[j].cell.x, 2) + Math.pow(cells[i].cell.y - cells[j].cell.y, 2));
            if (d < cellRadius) {
                console.log("hitted");
                //cells[j].cell.radius += cells[i].cell.radius; //TODO: increase radius of cell
                stage.removeChild(cells[i].cell);
                cells.splice(i, 1);
                break;

            }
        }
        cells[i].update();
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
}
