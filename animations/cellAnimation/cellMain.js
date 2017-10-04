var cells = [];
var cellAmount, cellRadius, plopCount, cellSpeed;
var width, height;

function cellAnimationInit() {
  /*
   * SETTING AREA
   */
  cellAmount = 100;
  cellRadius = 5;
  plopCount = 5;
  cellSpeed = 2;
  /*
   * END SETTING AREA
   */
  stage.canvas.style.background = '#000000';
  spawncells();
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
        var color = {
          //r: midOfTwoHex(cells[j].r, cells[i].r),
          r: '00',
          //g: midOfTwoHex(cells[j].g, cells[i].g),
          g: '00',
          b: midOfTwoHex(cells[j].b, cells[i].b)
        };
        cells[j].cell.graphics.beginFill('#' + color.r + '' + color.g + '' + color.b).drawCircle(0, 0, cells[j].radius);
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
        var color = {
          r: cells[i].r,
          g: cells[i].g,
          b: cells[i].b
        };
        cells.push(new Cell(newX, newY, color));
        cells[cells.length - 1].setNewSpeed(newSpeedX, newSpeedY);
      }
      stage.removeChild(cells[i].cell);
      cells.splice(i, 1);
    }
  }
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
      var color = {
        //r: randomHexValue(),
        r: '00',
        //g: randomHexValue(),
        g: '00',
        b: randomHexValue()
      };
      cells.push(new Cell(x, y, color));
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

function midOfTwoHex(h1, h2) {
  h1 = parseInt(h1, 16);
  h2 = parseInt(h2, 16);
  var newH = Math.floor((h1 + h2) / 2).toString(16);
  return newH;
}

function randomHexValue() {
  //return Math.floor((Math.random() * 255)).toString(16);
  return Math.floor((Math.random() * 205) + 50).toString(16);
}
