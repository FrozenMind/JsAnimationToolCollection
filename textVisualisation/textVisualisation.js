//global variables
var stage, text;
var pixels, pixelMatrix, sortedPixels;
var blackRects;

//setting variables
var canBackground, fps;
var rectSize, thresholdAlpha, resolution;
var innerText, outerText;

//call init to start
init();

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
        x: Math.floor(stage.canvas.width / rectSize),
        y: Math.floor(stage.canvas.height / rectSize)
    };
    innerText = "@";
    outerText = ".";
    /*
     * SETTINGS END
     */

    //create ticker and set fps

}

//ticker, which controls the drawing
var kk = 0;
var oo = 0;

function tick() {
    if (kk < sortedPixels.length) {
        if (oo < blackRects[kk].length) {
            if (blackRects[kk][oo] == true) {
                var text2 = new createjs.Text();
                text2.set({
                    text: innerText,
                    textAlign: 'center',
                    textBaseline: 'middle'
                });
                text2.x = kk * rectSize;
                text2.y = oo * rectSize;
                stage.addChild(text2);
            } else {
                var text2 = new createjs.Text();
                text2.set({
                    text: outerText,
                    textAlign: 'center',
                    textBaseline: 'middle'
                });
                text2.x = kk * rectSize;
                text2.y = oo * rectSize;
                stage.addChild(text2);
            }
            stage.update();
            oo++;
        } else {
            kk++;
            oo = 0;
        }
    }
}

function clicked() {
    stage.removeAllChildren();
    text = new createjs.Text();
    text.set({
        text: document.getElementById("textToShow").value,
        textAlign: 'center',
        textBaseline: 'middle'
    });
    //calculate array size by rectSize
    sortedPixels = [];
    pixelMatrix = new Array(rectResolution.x);
    blackRects = new Array(rectResolution.x);
    //scale text
    text.scaleX = 20;
    text.scaleY = 20;
    //move text to mid of canvas
    b = text.getBounds();
    text.x = stage.canvas.width / 2 - b.width / 2;
    text.y = stage.canvas.height / 2 - b.height / 2;
    stage.addChild(text);
    stage.update(); //update stage to show text
    //read pixel of canvas with set text
    pixels = stage.canvas.getContext('2d').getImageData(0, 0, stage.canvas.width, stage.canvas.height).data;
    //stage.canvas.getContext('2d').putImageData(pixels, 20, 20);

    for (i = 0; i < pixels.length; i = i + 4) {
        sortedPixels.push({
            r: pixels[i],
            g: pixels[i + 1],
            b: pixels[i + 2],
            a: pixels[i + 3]
        });
    }
    for (i = 0; i < pixelMatrix.length; i++) {
        pixelMatrix[i] = new Array(rectResolution.y);
        for (j = 0; j < pixelMatrix[i].length; j++) {
            pixelMatrix[i][j] = [];
        }
    }

    for (i = 0; i < sortedPixels.length; i++) {
        var x = Math.floor((i / rectSize) % rectResolution.x);
        //var x = Math.floor((i - i * (i % 500)) / 10);
        var y = Math.floor(i / (rectResolution.x * rectSize * rectSize));
        //console.log("x: " + x + " y: " + y + " i:" + i);
        pixelMatrix[x][y].push(i);
    }
    var bC;
    for (i = 0; i < blackRects.length; i++) {
        blackRects[i] = new Array(rectResolution.y);
    }
    for (i = 0; i < pixelMatrix.length; i++) {
        for (j = 0; j < pixelMatrix[i].length; j++) {
            bC = 0;
            for (k = 0; k < pixelMatrix[i][j].length; k++) {
                if (sortedPixels[pixelMatrix[i][j][k]].a >= thresholdAlpha) {
                    bC++;
                }
            }
            if (bC >= resolution) {
                blackRects[i][j] = true;
            } else {
                blackRects[i][j] = false;
            }
        }
    }
    stage.removeChild(text);
    createjs.Ticker.addEventListener("tick", tick);
    createjs.Ticker.setFPS(fps);
}
