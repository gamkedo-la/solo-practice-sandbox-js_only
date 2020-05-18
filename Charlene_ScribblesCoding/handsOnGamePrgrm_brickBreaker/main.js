var canvas = document.getElementById('gameCanvas');
var canvasContext = canvas.getContext('2d');
var framesPerSecond = 30;
var paddleX = canvas.width / 2.3;
var paddleY = canvas.height / 1.1;
var ballX = canvas.width / 2;
var ballY = canvas.height / 1.7;
var ballSpeedX = 2, ballSpeedY = 6;
const PADDLE_LENGTH = 100;
const PADDLE_THICKNESS = 10;
const MAX_BALL_SPEED = 8;
const BRICK_W = 80;
const BRICK_H = 20;
const BRICK_GAP = 2;
const BRICK_COLS = 10;
const BRICK_ROWS = 14;
var brickGrid = new Array(BRICK_COLS * BRICK_ROWS);
var score = 0;
var life = 3;
var isGameOver = false;
var isGameStarted = false;

window.onload = function() {
    // Title screen, cheating by making it black on white text,
    // So when the game starts, it "disappears" into the background
    canvasContext.font = "48px serif";
    canvasContext.fillStyle = "black";
    canvasContext.fillText("Welcome to Brick Breaker!", 100, 200);
    canvasContext.font = "30px serif";
    canvasContext.fillText("Click anywhere to start playing", 180, 250);
    
    canvas.addEventListener('click', function(e) {
        isGameStarted = true;
    });

    resetBricks();
    
    setInterval(function() {
        if (isGameStarted == true) {        
            if (!isGameOver) {
                moveEverything();
            }

            drawEverything();
        }
    }, 1000/framesPerSecond);

    canvas.addEventListener('mousemove', function(evt) {
        if (!isGameOver) {
            var mousePos = calcMousePos(evt);
            paddleX = mousePos.x - (PADDLE_LENGTH/2);
        }
    });

    canvas.addEventListener('dblclick', dblclickHandler);
}

function dblclickHandler() {
    if (isGameOver) { 
        life = 4;
        score = 0;      
        isGameOver = false;
        console.log("it's double clicked!");
        console.log("GameStarted = " + isGameStarted);
        console.log("isGameOver = " + isGameOver);
    }
}

function calcMousePos(evt) {
    var rect = canvas.getBoundingClientRect(), root = document.documentElement;
  
    // account for the margins, canvas position on page, scroll amount, etc
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
      x: mouseX,
      y: mouseY
    };
}

function reset() {
    if (life < 0) {
        isGameOver = true;
        score = 0;
        life = 0;
    } else {
        ballX = canvas.width / 2;
        ballY = canvas.height / 1.7;
        ballSpeedX = 2;
        ballSpeedY = 6;
    }
}

function resetBricks() {
    for (var i = 0; i < BRICK_COLS * BRICK_ROWS; i++) {
        brickGrid[i] = 1;
    }
}

function isBrickAtTileCoord(brickTileCol, brickTileRow) {
    var brickIndex = brickTileToIndex(brickTileCol, brickTileRow);
    return (brickGrid[brickIndex] == 1);
}

function brickTileToIndex(tileCol, tileRow) {
    return (tileCol + BRICK_COLS * tileRow);
}

function breakAndBounceOffBrickAtPixelCoord(x, y) {
    var tileCol = x / BRICK_W;
    var tileRow = y / BRICK_H;

    // Use Math.floor to round down to the nearest whole number
    tileCol = Math.floor(tileCol);
    tileRow = Math.floor(tileRow);

    // Check whether the ball is within any part of the brick wall
    if (tileCol < 0 || tileCol >= BRICK_COLS || tileRow < 0 || tileRow >= BRICK_ROWS) {
        return false; // ball out of function to avoid illegal array position usage
    }

    var brickIndex = brickTileToIndex(tileCol, tileRow);

    if (brickGrid[brickIndex] == 1) {
        var prevBallX = ballX - ballSpeedX;
        var prevBallY = ballY - ballSpeedY;
        var prevTileCol = Math.floor(prevBallX / BRICK_W);
        var prevTileRow = Math.floor(prevBallY / BRICK_H);

        var bothTestsFailed = true;

        if (prevTileCol != tileCol) {
            var adjacentBrickIndex = brickTileToIndex(prevTileCol, tileRow);
            // make sure the side we want to reflect isn't blocked!
            if (brickGrid[adjacentBrickIndex] != 1) {
                ballSpeedX *= -1;
                bothTestsFailed = false;
            }
        }

        if (prevTileRow != tileRow) {
            var adjacentBrickIndex = brickTileToIndex(tileCol, prevTileRow);
            // make sure the side we want to reflect isn't blocked!
            if (brickGrid[adjacentBrickIndex] != 1) {
                ballSpeedY *= -1;
                bothTestsFailed = false;
            }
        }

        // we hit an "armpit" on the inside corner, flip both to
        // avoid going into it
        if (bothTestsFailed) {
            ballSpeedX *= -1;
            ballSpeedY *= -1;
        }
    }

    // using array, 
    // turn brick to 0, or none, if ball touches a brick
    brickGrid[brickIndex] = 0;

    score += 100;
}

function moveEverything() {
    ballMoveHandler();
}

function drawBricks() {
    for (var i = 0; i < BRICK_COLS; i++) {
        for (var j = 0; j < BRICK_ROWS; j++) {
            if (isBrickAtTileCoord(i, j)) {
                var brickLeftEdgeX = i * BRICK_W;
                var brickTopEdgeY = j * BRICK_H;
                drawRect(brickLeftEdgeX, brickTopEdgeY, BRICK_W - BRICK_GAP, BRICK_H - BRICK_GAP, 'blue');
            }
        }
    }
}

function drawEverything() {
    // <-- background --> //
    drawRect(0, 0, canvas.width, canvas.height, 'black');

    // <-- ball --> //
    if (!isGameOver) {
        drawBall();
    }

    // <-- paddle --> //
    drawRect (paddleX, paddleY, PADDLE_LENGTH, PADDLE_THICKNESS, 'orange');
    drawBricks();

    // <-- Score texts --> //
    canvasContext.font = '12px serif';
    canvasContext.fillStyle = "white";
    canvasContext.fillText(score, 50, 580);

    // <-- Life texts --> //
    canvasContext.font = '12px serif';
    canvasContext.fillText(life, 700, 580);

    if (isGameOver) {
        var gameOverMessage = "You lost :("
        canvasContext.font = '36px serif';
        canvasContext.fillStyle = "white";
        canvasContext.fillText(gameOverMessage, 320, 400);
        canvasContext.font = "20px serif";
        canvasContext.fillText("[Double Click] to restart", 280, 430);
    }
}