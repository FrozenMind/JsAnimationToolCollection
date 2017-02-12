//global variables
var stage;
var text;
var pixelMatrix; // 3D array of the row and columns with an area of rectSize^2
var rawPixelData; // array of pixel objects
var blackRects;
//setting variables
var canBackground, fps;
var rectSize, thresholdAlpha, resolution;
var innerText, outerText;
//call init to start
$(document).ready(function () {
    init();
});
//initialize the project
function init() {
    //create stage
    stage = new createjs.Stage("demoCanvas");
    stage.canvas.style.background = canBackground;
    /*
     * SETTINGS
     */
    canBackground = "RGB(255,255,255)";
    fps = 500;
    rectSize = 10;
    resolution = Math.floor((rectSize * rectSize) / 2);
    thresholdAlpha = 250;
    rectResolution = {
        x: Math.floor(stage.canvas.width / rectSize)
        , y: Math.floor(stage.canvas.height / rectSize)
    };
    $("#innerText").val("1");
    $("#outterText").val("0");
    /*
     * SETTINGS END
     */
    //calculate array size by rectSize
    rawPixelData = [];
    pixelMatrix = createEmpty3DArray(rectResolution.x, rectResolution.y);
    blackRects = createFilled2DArray(rectResolution.x, rectResolution.y);
    // register events
    $("#start").click(startVisualisation);
    $("#export").click(exportJPEG);
}
//ticker, which controls the drawing
function tick() {
    if (createjs.Ticker.paused) return;
    draw();
}

function startVisualisation() {
    createjs.Ticker.paused = false;
    stage.removeAllChildren();
    showText($("#textToShow").val(), stage.canvas.width / 2, stage.canvas.height / 2, 20);
    rawPixelData = getPixels(stage);
    stage.removeChild(text);
    for (i = 0; i < rawPixelData.length; i++) {
        var x = Math.floor((i / rectSize) % rectResolution.x);
        var y = Math.floor(i / (rectResolution.x * rectSize * rectSize));
        pixelMatrix[x][y].push(i);
    }
    blackRects = calcFilledAreas(rawPixelData, pixelMatrix, resolution);
    createjs.Ticker.addEventListener("tick", tick);
    createjs.Ticker.setFPS(fps);
}

function getPixels(stage) {
    var imageData = stage.canvas.getContext('2d').getImageData(0, 0, stage.canvas.width, stage.canvas.height).data;
    var arr = []
    for (i = 0; i < imageData.length; i = i + 4) {
        arr.push({
            r: imageData[i]
            , g: imageData[i + 1]
            , b: imageData[i + 2]
            , a: imageData[i + 3]
        });
    }
    return arr;
}

function showText(msg, x, y, scale) {
    text = new createjs.Text();
    text.set({
        text: msg
        , textAlign: 'center'
        , textBaseline: 'middle'
    });
    //scale text
    text.scaleX = scale;
    text.scaleY = scale;
    //move text to mid of canvas
    b = text.getBounds();
    text.x = x;
    text.y = y;
    stage.addChild(text);
    stage.update(); //update stage to show text
}

function createEmpty3DArray(xSize, ySize) {
    var array3D = new Array(xSize);
    for (i = 0; i < array3D.length; i++) {
        array3D[i] = new Array(ySize);
        for (j = 0; j < array3D[i].length; j++) {
            array3D[i][j] = [];
        }
    }
    return array3D;
}

function createFilled2DArray(xSize, ySize) {
    var array2D = new Array(xSize);
    for (i = 0; i < array2D.length; i++) {
        array2D[i] = new Array(ySize);
    }
    return array2D;
}

function calcFilledAreas(rawData, array3D, res) {
    var blackPixelCounter;
    var matrixWithBlackAreas = createFilled2DArray(array3D.length, array3D[0].length);
    for (i = 0; i < array3D.length; i++) {
        for (j = 0; j < array3D[i].length; j++) {
            blackPixelCounter = 0;
            for (k = 0; k < array3D[i][j].length; k++) {
                if (rawData[array3D[i][j][k]].a >= thresholdAlpha) {
                    blackPixelCounter++;
                }
            }
            if (blackPixelCounter >= res) {
                matrixWithBlackAreas[i][j] = true;
            }
            else {
                matrixWithBlackAreas[i][j] = false;
            }
        }
    }
    return matrixWithBlackAreas;
}

function draw() {
    innerText = $("#innerText").val();
    outterText = $("#outterText").val();
    for (k = 0; k < blackRects.length; k++) {
        for (o = 0; o < blackRects[k].length; o++) {
            if (blackRects[k][o] == true) {
                showText(innerText, k * rectSize, o * rectSize, 1);
            }
            else {
                showText(outerText, k * rectSize, o * rectSize, 1);
            }
        }
    }
    stage.update();
    createjs.Ticker.paused = true;
}

function exportJPEG() {
    //generate the url using toDataURL
    canvas = document.getElementById("demoCanvas");
    var img = canvas.toDataURL("image/png;base64;");
    //img = img.replace("image/png","image/octet-stream"); // force download, user would have to give the file name.
    // you can also use anchor tag with download attribute to force download the canvas with file name.
    window.open(img, "", "width=500,height=500");
}