// var radios = document.forms["alienWidth"].elements["optradio"]; 
var gameRunning = false;
var gameOver = false;

// variables to keep track of player shot position
var shotX = 75, shotY = 75;
const PLAYER_SHOT_SPEED = 20;
var shotIsActive = false;

// variables to keep track of enemy shot position
var enemyShotX = 75, enemyShotY = 75;
const ENEMY_SHOT_SPEED = 12;
var enemyShotIsActive = false;

// alien constants and variables
const ALIEN_W = 80;
const ALIEN_H = 35;
var alienSpacingWidth = 40;
const ALIEN_SPACING_H = 10;
const ALIEN_COLS = 7;
const ALIEN_ROWS = 5;
var alienGrid = new Array(ALIEN_COLS * ALIEN_ROWS);
var aliensLeft; // will get set in resetAliens()

// variables related to the aliens moving as a group, depends on which are alive
var swarmOffsetX = 0;
var swarmOffsetY = 0;
var swarmMoveDir = 1;
var swarmLowPopulationSpeedBoost = 1.0;
var swarmGroupWidth = 0;
var swarmGroupLeftMargin = 0;
var swarmGroupLowest = 0;
const SWARM_ADVANCE_JUMP = 15;
const ALIEN_POPULATION_BOOST_THRESHOLD = 25; // fewer than this, they speed up
const ALIEN_BOOST_MULT = 0.4; // higher means faster when few aliens left

// player constants and variables
const PLAYER_WIDTH = 40;
const PLAYER_THICKNESS = 40;
const PLAYER_Y = 530;
var playerX = 720;

// save the canvas for dimensions, and its 2d context for drawing to it
var canvas, canvasContext;

window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    // these next few lines set up our game logic and render to happen 30 times per second
    var framesPerSecond = 30;

    setInterval(function() {

        if(gameOver){
            colorRect(0, 0, canvas.width, canvas.height, 'black');
            canvasContext.font = `24px Verdana`;
            canvasContext.fillStyle = 'yellow';
            canvasContext.fillText("Game Over", 300, 300);
        } else {
            if(gameRunning) {
                moveEverything(); 
            }
            drawEverything();
        }
    }, 1000/framesPerSecond);

    canvas.addEventListener('mousedown', mousedownHandler);

    canvas.addEventListener('mousemove', 
        function(evt) {
            var mousePos = calculateMousePos(evt);
            playerX = mousePos.x - (PLAYER_WIDTH/2); // minus half player height to center
        } );

    resetGame();
}

function movePlayer() {

}

function moveEverything() {
    moveAliens();
    enemyInColAbovePlayerAttemptToFire();
    moveShots();
    movePlayer();
}

function drawEverything() {
    // clear the game view by filling it with black
    colorRect(0, 0, canvas.width, canvas.height, 'black');

    // draw a white rectangle to use as the left player's player
    colorRect(playerX, PLAYER_Y, PLAYER_WIDTH, PLAYER_THICKNESS, 'white');
    
    
    drawShots();  

    drawAliens();
}

function loseGame() {
    gameRunning = false;

    // clear canvas
    //colorRect(0, 0, 800, 600, 'black');

    resetGame();
}