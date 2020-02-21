const PROJECTION_PLANE_WIDTH = 320;
const PROJECTION_PLANE_HEIGHT = 200;
const FOV_DEGREES = 60;
const FOV_RADS = FOV_DEGREES * (Math.PI /180);
const RAY_INCREMENT_WIDTH = 50;
const NUM_OF_RAYS = PROJECTION_PLANE_WIDTH / RAY_INCREMENT_WIDTH;
const RAY_ANGLE_INCREMENT = FOV_RADS / NUM_OF_RAYS;

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
    
}

function drawEverything() {

    // clear the game view by filling it with white
    colorRect(0, 0, canvas.width, canvas.height, 'white');

    grid.draw();
    
    player.draw();
    player.update();

}