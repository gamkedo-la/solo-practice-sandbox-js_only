// Tim Chase
// Aug 13, 2020
// Breakout, mostly from How to Program Games

// TODO: if ballSpeedX is 10, then paddle misses
// TODO: on right side, if "corder" (of what would be a brick) then ball rises rather than bounce;
//       couldn't replicate on left side. 


const MOUSE_CHEAT = false;

var ballX = 75;
var ballSpeedX = 9;
var ballY = 73;
var ballSpeedY = 9;
var score = 0;

const PADDLE_WIDTH = 100;
const PADDLE_THICKNESS = 10;
const PADDLE_DIST_FROM_EDGE = 60;
var paddleX = 400;

const BRICK_W = 80;
const BRICK_H = 20;
const BRICK_COLS = 10;
const BRICK_GAP = 2;
const BRICK_ROWS = 14;
var brickGrid = new Array(BRICK_COLS * BRICK_ROWS); 
var bricksLeft = 0;


var canvas, canvasContext;

var mouseX = 0; 
var mouseY = 0;

// loader
window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    init();

    var framesPerSecond = 30;
    setInterval(function() {
        update();
        draw();
    }, 1000/framesPerSecond);  

    //canvas.addEventListener('mousedown', handleMouseClick);

    canvas.addEventListener('mousemove', updateMousePos);

    brickReset();
    ballReset();
}



function init() {
    console.log("init");
}

function update() {
    ballMove();
    ballBrickHandling();
    ballPaddleHandling();
}

function draw() {
    // background
    drawRect(0, 0, canvas.width, canvas.height, "black"); 
    // ball
    drawCicle(ballX, ballY, 10, "white");        
    // paddle 
    drawRect(paddleX, canvas.height - PADDLE_DIST_FROM_EDGE, PADDLE_WIDTH, PADDLE_THICKNESS, "white");

    drawBricks();

    // score
    drawText("Score: "+score, 5, 30, "yellow");

    // mouse debug
    // drawText(mouseX+","+mouseY, mouseX, mouseY, "yellow");
    // var mouseXoffset = 4;
    // var mouseYoffset = -4;
    // var mouseBrickCol = Math.floor(mouseX / BRICK_W);
    // var mouseBrickRow = Math.floor(mouseY / BRICK_H);
    // var brickIndexUnderMouse = rowColToArrayIndex(mouseBrickCol, mouseBrickRow);
    //drawText(mouseBrickCol+","+mouseBrickRow+": "+brickIndexUnderMouse, mouseX+mouseXoffset, mouseY+mouseYoffset, "yellow");
    
}

// brick functions
function brickReset() {
    bricksLeft = 0;
    score = 0;
    // gutter - set frist 3 rows false
    var i;
    for(i=0;i<3*BRICK_COLS;i++){
        brickGrid[i] = false;
    }
    for(;i<BRICK_COLS*BRICK_ROWS;i++) {
        brickGrid[i] = true;
        bricksLeft++;
    }
}

function rowColToArrayIndex(col, row) {
    return col + (BRICK_COLS * row)
}

function drawBricks() {
    for(var eachRow=0;eachRow<BRICK_ROWS;eachRow++) {
        for(var eachCol=0;eachCol<BRICK_COLS;eachCol++) {
            var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
            if(brickGrid[arrayIndex]) {
                drawRect(BRICK_W*eachCol, BRICK_H*eachRow, BRICK_W-BRICK_GAP, BRICK_H-BRICK_GAP, 'blue');
            } // draw if turned on
        } // draw rows
    } // draw cols
}


// ball functions 
function ballReset() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
}

function ballMove() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    // left
    if (ballX < 0 && ballSpeedX < 0.0) {
        ballSpeedX *= -1;
    }
    // right
    if (ballX > canvas.width && ballSpeedX > 0.0) {
        ballSpeedX *= -1;
    }
    // top
    if (ballY < 0 && ballSpeedY < 0.0 ) {
        ballSpeedY *= -1;
    }
    // bottom
    if (ballY > canvas.height) {
        ballReset();
        brickReset();
        //ballSpeedY *= -1;
    }
}

function isBrickAtColRow(col, row) {
    if(col >= 0 && col < BRICK_COLS && 
       row >= 0 && row < BRICK_ROWS) {
        var brickIndexUnderCoord = rowColToArrayIndex(col, row);
        return brickGrid[brickIndexUnderCoord];
    } else {
        return false;
    }
}

function ballBrickHandling() {
    // collision
    var ballBrickCol = Math.floor(ballX / BRICK_W);
    var ballBrickRow = Math.floor(ballY / BRICK_H);
    var brickIndexUnderBall = rowColToArrayIndex(ballBrickCol, ballBrickRow);

    var bothTestsFailed = true;

    if(ballBrickCol >=0 && ballBrickCol < BRICK_COLS && 
       ballBrickRow >=0 && ballBrickRow < BRICK_ROWS) {

        if(isBrickAtColRow(ballBrickCol, ballBrickRow)) {
            brickGrid[brickIndexUnderBall] = false;
            bricksLeft--;

            var prevBallX = ballX - ballSpeedX;
            var prevBallY = ballY - ballSpeedY;
            var prevBrickCol = Math.floor(prevBallX / BRICK_W);
            var prevBrickRow = Math.floor(prevBallY / BRICK_H);

            if(prevBrickCol != ballBrickCol) {
                if(isBrickAtColRow(prevBrickCol, ballBrickRow) == false) {
                    ballSpeedX *= -1;
                    score++;
                    bothTestsFailed = false;
                }
            }

            if(prevBrickRow != ballBrickRow) {
                if(isBrickAtColRow(ballBrickCol, prevBrickRow) == false) {
                    ballSpeedY *= -1;
                    score++;
                    bothTestsFailed = false;
                }
            }

            if(bothTestsFailed) {
                ballSpeedX *= -1;
                ballSpeedY *= -1;
                score++;
            }
        } // end brick found
    } // end valid col row
} // ballBrickHandling

function ballPaddleHandling() {
    var paddleTopEdgeY = canvas.height-PADDLE_DIST_FROM_EDGE;
    var paddleBottomEdgeY = paddleTopEdgeY+PADDLE_THICKNESS;
    var paddleLeftEdgeX = paddleX;
    var paddleRightEdgeX = paddleLeftEdgeX+PADDLE_WIDTH;

    // console.log(paddleLeftEdgeX+","+paddleRightEdgeX+","+paddleTopEdgeY+","+paddleBottomEdgeY);
    

    if(ballY>paddleTopEdgeY && 
        ballY < paddleBottomEdgeY && 
        ballX>paddleLeftEdgeX && 
        ballX < paddleRightEdgeX ) { 
            ballSpeedY *= -1;
            var centerOfPaddleX = paddleX + (PADDLE_WIDTH / 2);
            var ballDistFromPaddleCenterX = ballX - centerOfPaddleX;
            ballSpeedX = ballDistFromPaddleCenterX * 0.35;

        if(bricksLeft == 0) {
            brickReset();
        } // out of bricks
    } // ball center inside paddle
} // end ballPaddleHandling

// mouse functions
function updateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    mouseX = evt.clientX - rect.left - root.scrollLeft;
    mouseY = evt.clientY - rect.top - root.scrollTop;
    
    paddleX = mouseX - (PADDLE_WIDTH / 2);

    // mouse cheat
    if(MOUSE_CHEAT) {
        ballX = mouseX;
        ballY = mouseY;
        ballSpeedX = 4;
        ballSpeedY = -4;
    }
}


// drawing functions
function drawText(words, textX, textY, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillText(words, textX, textY);
}

function drawCicle(centerX, centerY, radius, drawColor) {
    // ball
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
    canvasContext.fill();
}

function drawRect(leftX, topY, width, height, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
}
