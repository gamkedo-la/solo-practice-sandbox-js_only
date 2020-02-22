const PROJECTION_PLANE_WIDTH = 800;
const PROJECTION_PLANE_HEIGHT = 600;
const FOV_DEGREES = 60;
const FOV_RADS = FOV_DEGREES * (Math.PI /180);
const RAY_INCREMENT_WIDTH = 1;
const NUM_OF_RAYS = PROJECTION_PLANE_WIDTH / RAY_INCREMENT_WIDTH;
const RAY_ANGLE_INCREMENT = FOV_RADS / NUM_OF_RAYS;

const MINIMAP_SCALE_FACTOR = 0.2;

var canvas;
var canvasContext;

var player;
var grid;

window.onload = function () {

    //console.log("onload");
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    canvasContext.canvas.width = PROJECTION_PLANE_WIDTH;
    canvasContext.canvas.height = PROJECTION_PLANE_HEIGHT;

    grid = new Map();
    player = new Player();

    initRenderLoop();
}

function initRenderLoop() {
    var framesPerSecond = 30;
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

    // clear the game view by filling it with white
    colorRect(0, 0, canvas.width, canvas.height, 'brown');

    render3DProjectedWalls();
    
    grid.draw();

    player.draw();

}

function render3DProjectedWalls(){
    for (var i = 0; i < NUM_OF_RAYS; i++){
        var ray = player.rays[i];
        var correctedWallDistance = ray.distance * Math.cos(ray.angle - player.rotationAngle);
        //calculate distance to the projection plane
        var distanceProjectionPlane = (canvas.width / 2) / Math.tan(FOV_RADS / 2);

        //projected wall height
        var wallStripHeight = (TILE_SIZE / correctedWallDistance ) * distanceProjectionPlane;

        colorRect(i * RAY_INCREMENT_WIDTH, (canvas.height /2) - (wallStripHeight /2), RAY_INCREMENT_WIDTH, wallStripHeight, 'gray');
    }
}