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
//variables vor animated drawing
var animatedK;
var animatedO;
var fpsLabel;
var guiElements; // data object for gui
var gui; // actual gui object (dat.gui)
/////////////////////////////////
/// Start Point
$(document).ready(function() {
    preInit();
    init();
});
// PreInit
function preInit() {
    //Initialise GUI
    guiElements = {
        Message: "",
        InnerText: "1",
        OuterText: "0",
        IsAnimated: false,
        Start: startVisualisation,
        ExportJPG: exportJPEG
    };
    gui = new dat.GUI();
    gui.add(guiElements, 'Message').name("Your text: ");
    gui.add(guiElements, 'InnerText').name("Inner text: ");
    gui.add(guiElements, 'OuterText').name("Outer text: ");
    gui.add(guiElements, 'IsAnimated').name("Animated Drawing");
    gui.add(guiElements, 'Start').name("Start");
    gui.add(guiElements, 'ExportJPG').name("Export");
    // set canvas size
    $("#demoCanvas").attr({
        width: $("body").width(),
        height: $("body").height()
    });
};
//initialize the project
function init() {
    /*
     * SETTINGS
     */
    canBackground = "RGB(255,255,255)";
    fps = 500;
    rectSize = 10;
    thresholdAlpha = 250;
    /*
     * SETTINGS END
     */
    //create stage
    stage = new createjs.Stage("demoCanvas");
    stage.canvas.style.background = canBackground;
    resolution = Math.floor((rectSize * rectSize) / 2);
    rectResolution = {
        x: Math.floor(stage.canvas.width / rectSize),
        y: Math.floor(stage.canvas.height / rectSize)
    };
    //calculate array size by rectSize
    rawPixelData = [];
    pixelMatrix = createEmpty3DArray(rectResolution.x + 1, rectResolution.y + 1);
    blackRects = createFilled2DArray(rectResolution.x, rectResolution.y);
    //fps label to show the fps
    fpsLabel = new createjs.Text("-- fps", "bold 18px Arial", "#000");
    fpsLabel.visible = guiElements.IsAnimated;
    fpsLabel.x = 10;
    fpsLabel.y = 10;
    stage.addChild(fpsLabel);
    stage.update();
}
//ticker, which controls the drawing
function tick() {
    if (!createjs.Ticker.paused) {
        drawAnimated();
        fpsLabel.text = Math.round(createjs.Ticker.getMeasuredFPS()) + " fps";
        //update on every row
        if (animatedO == 0) {
            stage.update();
        }
    }
}

function startVisualisation() {
    createjs.Ticker.paused = false;
    stage.removeAllChildren();
    fpsLabel.visible = guiElements.IsAnimated;
    stage.addChild(fpsLabel); //add fps label again
    showText(guiElements.Message, stage.canvas.width / 2, stage.canvas.height / 2, 20, true);
    rawPixelData = getPixels();
    stage.removeChild(text);
    for (i = 0; i < rawPixelData.length; i++) {
        for (j = 0; j < rawPixelData[i].length; j++) {
            x = Math.floor(i / rectSize);
            y = Math.floor(j / rectSize);
            pixelMatrix[x][y].push(rawPixelData[i][j]);
        }
    }
    blackRects = calcFilledAreas(pixelMatrix, resolution);
    if (guiElements.IsAnimated) {
        animatedO = 0;
        animatedK = 0;
        createjs.Ticker.addEventListener("tick", tick);
        createjs.Ticker.setFPS(fps);
    } else {
        draw();
    }
}

function getPixels() {
    var imageData = stage.canvas.getContext('2d').getImageData(0, 0, stage.canvas.width, stage.canvas.height).data;
    var arr = [];
    for (i = 0; i < imageData.length; i = i + 4) {
        arr.push({
            r: imageData[i],
            g: imageData[i + 1],
            b: imageData[i + 2],
            a: imageData[i + 3]
        });
    }
    var matrix = createFilled2DArray(stage.canvas.width, stage.canvas.height);
    var index = 0;
    for (i = 0; i < stage.canvas.height; i++) {
        for (j = 0; j < stage.canvas.width; j++) {
            matrix[j][i] = arr[index];
            index++;
        }
    }
    return matrix;
}

function showText(msg, x, y, scale, update) {
    text = new createjs.Text();
    text.set({
        text: msg,
        textAlign: 'center',
        textBaseline: 'middle'
    });
    //scale text
    text.scaleX = scale;
    text.scaleY = scale;
    //move text to mid of canvas
    b = text.getBounds();
    text.x = x;
    text.y = y;
    text.snapToPixel = true;
    stage.addChild(text);
    if (update) stage.update(); //update stage to show text
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

function calcFilledAreas(pM, res) {
    var blackPixelCounter = 0;
    var matrixWithBlackAreas = createFilled2DArray(pM.length, pM[0].length);
    for (i = 0; i < pM.length; i++) {
        for (j = 0; j < pM[i].length; j++) {
            for (k = 0; k < pM[i][j].length; k++) {
                if (pM[i][j][k].a >= thresholdAlpha) {
                    blackPixelCounter++;
                }
            }
            if (blackPixelCounter >= res) {
                matrixWithBlackAreas[i][j] = true;
            } else {
                matrixWithBlackAreas[i][j] = false;
            }
            blackPixelCounter = 0;
        }
    }
    return matrixWithBlackAreas;
}

function draw() {
    innerText = guiElements.InnerText;
    outterText = guiElements.OuterText;
    for (k = 0; k < blackRects.length; k++) {
        for (o = 0; o < blackRects[k].length; o++) {
            if (blackRects[k][o] == true) {
                showText(innerText, k * rectSize, o * rectSize, 1, false);
            } else {
                showText(outterText, k * rectSize, o * rectSize, 1, false);
            }
        }
    }
    stage.update();
    createjs.Ticker.paused = true;
}
cacheCon = new createjs.Shape();

function drawAnimated() {
    innerText = guiElements.InnerText;
    outterText = guiElements.OuterText;
    if (animatedK < blackRects.length) {
        if (animatedO < blackRects[animatedK].length) {
            if (blackRects[animatedK][animatedO] == true) {
                showText(innerText, animatedK * rectSize, animatedO * rectSize, 1, false);
            } else {
                showText(outterText, animatedK * rectSize, animatedO * rectSize, 1, false);
            }
            animatedO++;
        } else {
            animatedK++;
            animatedO = 0;
            cacheCon.uncache();
            cacheCon.cache(0, 0, animatedK * rectSize, stage.canvas.height);
        }
    } else {
        createjs.Ticker.paused = true;
        animatedK = 0;
        animatedO = 0;
    }
}

function exportJPEG() {
    stage.removeChild(fpsLabel);
    //generate the url using toDataURL
    canvas = document.getElementById("demoCanvas");
    var img = canvas.toDataURL("image/png;base64;");
    //img = img.replace("image/png","image/octet-stream"); // force download, user would have to give the file name.
    // you can also use anchor tag with download attribute to force download the canvas with file name.
    window.open(img, "", "width=500,height=500");
}
