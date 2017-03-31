$(document).ready(function() {
    mainInit();
    cellAnimationInit();
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
            console.log("started Cell Animation");
            cellAnimationInit();
            break;
        case 1: //rain
            console.log("started Rain Animation");
            rainInit();
            break;
        case 2: //redball
            console.log("started Red Ball Animation");
            redBallsFallInit();
            break;
        case 3: //text Visualisation
            break;
    }
}
