//global variables
var stage, text;
var pixels, pixelMatrix, sortedPixels;
var blackRects;

//setting variables
var canBackground, fps;
var rectSize, thresholdAlpha, resolution;
var innerText, outterText;

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
    outterText = ".";
    /*
     * SETTINGS END
     */

    //create ticker and set fps

}

//ticker, which controls the drawing
function tick() {

}

function clicked() {
    stage.removeAllChildren();
    text = new createjs.Text();
    text.set({
        text: document.getElementById('textToShow').value,
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
    stage.removeChild(text);
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
    //createjs.Ticker.addEventListener("tick", tick);
    //createjs.Ticker.setFPS(fps);
    draw();
}

function draw() {
    innerText = document.getElementById('innerText').value;
    outterText = document.getElementById('outterText').value;
    for (k = 0; k < blackRects.length; k++) {
        for (o = 0; o < blackRects[k].length; o++) {
            if (blackRects[k][o] == true) {
                var text2 = new createjs.Text();
                text2.set({
                    text: innerText,
                    textAlign: 'center',
                    textBaseline: 'middle'
                });
                text2.x = k * rectSize;
                text2.y = o * rectSize;
                //text2.snapToPixel = true;
                var bb = text2.getBounds();
                //text2.cache(bb.x, bb.y, bb.width, bb.height);
                stage.addChild(text2);
            } else {
                var text2 = new createjs.Text();
                text2.set({
                    text: outterText,
                    textAlign: 'center',
                    textBaseline: 'middle'
                });
                text2.x = k * rectSize;
                text2.y = o * rectSize;
                //text2.snapToPixel = true;
                var bb = text2.getBounds();
                //text2.cache(bb.x, bb.y, bb.width, bb.height);
                stage.addChild(text2);
            }
            //stage.update();
        }
    }
    stage.update();
}

function exportJPEG() {
    //generate the url using toDataURL
    canvas = document.getElementById("demoCanvas");
    var img = canvas.toDataURL("image/png;base64;");
    //img = img.replace("image/png","image/octet-stream"); // force download, user would have to give the file name.
    // you can also use anchor tag with download attribute to force download the canvas with file name.
    window.open(img, "", "width=500,height=500");
}
