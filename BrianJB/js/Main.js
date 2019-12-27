var canvas;
var canvasContext;

window.onload = function () {

    console.log("onload");
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

}

function initRenderLoop() {
    var framesPerSecond = 60;
    setInterval(function () {

        moveEverything();
        drawEverything();

    }, 1000 / framesPerSecond);
}

function moveEverything() {

}

function drawEverything() {
    console.log("drawing");
}