var canvas;
var canvasContext;

var player;
var grid;

window.onload = function () {

    //console.log("onload");
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    canvasContext.canvas.width = MAP_NUM_COLS * TILE_SIZE;
    canvasContext.canvas.height = MAP_NUM_ROWS * TILE_SIZE;

    grid = new Map();
    player = new Player();

    initRenderLoop();
}

function initRenderLoop() {
    var framesPerSecond = 60;
    setInterval(function () {

        moveEverything();
        drawEverything();

    }, 1000 / framesPerSecond);
    initInput();
}

function moveEverything() {
    player.update();
}

function drawEverything() {

    grid.draw();
    player.draw();

}