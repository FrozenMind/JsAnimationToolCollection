$(document).ready(function() {
    mainInit();
});

function mainInit() {
    //set canvas fullscreen
    $("#demoCanvas").attr({
        width: $("body").width(),
        height: $("body").height()
    });
}

function changeMode() {
    //TODO: delete all active createjs Ticker
    var selectedMode = parseInt($("#mode").val());
    console.log(selectedMode);
    switch (selectedMode) {
        case 0: //cellAnimation
            cellAnimationInit();
            break;
        case 1: //rain
            rainInit();
            break;
        case 2: //redball
            redBallsFallInit();
            break;
        case 3: //text Visualisation
            break;
    }
}
