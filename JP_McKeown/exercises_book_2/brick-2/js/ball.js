'use strict';
const BALL_RADIUS = 20;

// variables to keep track of ball position
let ballX, ballY;
const BALL_SPEED_X_INITIAL = 3;
const BALL_SPEED_Y_INITIAL = 5; //5
let ballSpeedX; // = BALL_SPEED_X_INITIAL;
let ballSpeedY; // = BALL_SPEED_Y_INITIAL;

function moveBall() {
  // ball starts near paddle ready to move toward bricks
  if(ballReady){
    ballX = paddleX + PADDLE_WIDTH/2 - 5;
    ballY = PADDLE_Y - 10 - BALL_RADIUS;
    // ballReady = false;
    return;
  }

  if(ballX < 0 && ballSpeedX < 0) { // if ball has moved beyond left edge
      ballSpeedX *= -1; // reverse ball's horizontal direction
  }

  if(ballX > canvas.width && ballSpeedX > 0) { // if ball has moved beyond right edge
      ballSpeedX *= -1; // reverse ball's horizontal direction
  }

  if(ballY < 0) { // if ball has moved beyond the top edge
      ballSpeedY *= -1; // reverse ball's vertical direction
  }

  if(ballSpeedY > 0.0) { // only bounce off paddle if the ball is moving downward
    if(ballY >= PADDLE_Y && ballY <= PADDLE_Y + PADDLE_THICKNESS) { // vertically over paddle
      if(ballX > paddleX && ballX < paddleX+PADDLE_WIDTH) { // horizontally too?
          ballSpeedY *= -1; // reverse ball's vertical direction
          
          if(bricksLeft == 0) {
              resetBricks();
          }
          
          var deltaX = ballX-(paddleX+PADDLE_WIDTH/2);
          ballSpeedX = deltaX * 0.15;
      }
    }
  }

  if(ballY > canvas.height) { // if ball has moved beyond the bottom edge
    loseLife();
    resetBall();
  }

  ballLeftHit(ballX, ballY);
  ballRightHit(ballX, ballY);
  ballTopHit(ballX, ballY);
  ballBottomHit(ballX, ballY);

  // breakAndBounceOffBrickAtPixelCoord(ballX, ballY);

  ballX += ballSpeedX; // move ball horizontal speed 
  ballY += ballSpeedY; // same for vertical
}

function resetBall() {
  ballSpeedX = BALL_SPEED_X_INITIAL;
  ballSpeedY = BALL_SPEED_Y_INITIAL;
  ballReady = true;  
}

function loseLife() {
  livesRemaining--;
  if(livesRemaining <= 0) {
    gameState = STATE_MENU;
    finalScore = score;
  }
  writeUI();
  drawUI();
}

function ballLeftHit(ballX, ballY) {
  var ballLeft = ballX - BALL_RADIUS;
  if(isBrickAtPixel(ballLeft, ballY)) {
    ballSpeedX = ballSpeedX * -1;
  }
}
function ballRightHit(ballX, ballY) {
  var ballRight = ballX + BALL_RADIUS;
  if(isBrickAtPixel(ballRight, ballY)) {
    ballSpeedX = ballSpeedX * -1;
  }
}
function ballTopHit(ballX, ballY) {
  var ballTop = ballY - BALL_RADIUS;
  if(isBrickAtPixel(ballX, ballTop)) {
    ballSpeedY = ballSpeedY * -1;
  }
}
function ballBottomHit(ballX, ballY) {
  var ballBottom = ballY + BALL_RADIUS;
  if(isBrickAtPixel(ballX, ballBottom)) {
    ballSpeedY = ballSpeedY * -1;
  }
}