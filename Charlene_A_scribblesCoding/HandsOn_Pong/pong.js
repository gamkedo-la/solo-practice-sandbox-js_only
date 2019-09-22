const MAX_BALL_SPEED = 12;

var ballX = 75, ballY = 75;
var ballSpeedX = 6, ballSpeedY = 6;
var canvas, canvasContext;
var framesPerSecond = 30;

var paddle1Y = 250, paddle2Y = 250;
const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10;

var playerSP = 0;
var compSP = 0;
var winningScore = 3;
var isGameOver = false;

window.onload = function() {
  loadSounds();

  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');      

  setInterval(function() {
    console.log(isGameOver);
    if (!isGameOver) {
      moveEverything();
    }        
    drawEverything();
  }, 1000/framesPerSecond);

  canvas.addEventListener('mousemove', function(evt) {
    if (!isGameOver) {
      var mousePos = calcMousePos(evt);
      paddle1Y = mousePos.y - (PADDLE_HEIGHT/2);
    }
  });

  canvas.addEventListener('dblclick', function(evt) {
    if (isGameOver) {
      if (playerSP > compSP) {
        ballSpeedX = 6;
        ballSpeedY = 6;            
      } else {
        ballSpeedX = -6;
        ballSpeedY = -6;
      }

      playerSP = 0;
      compSP = 0;
      paddle1Y = 250;
      paddle2Y = 250;         
      
      isGameOver = false;
    }
  });
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

function ballReset(isPlayerScore) {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;

  if (isPlayerScore) {        
    ballSpeedX = -6;
    ballSpeedY = -6;
    playerSP += 1;
  } else {        
    ballSpeedX = 6;
    ballSpeedY = 6;
    compSP += 1;
  }

  if (compSP == winningScore || playerSP == winningScore) {           
    isGameOver = true;
  }      
}

function moveBallAngle(paddle) {
  var middle = paddle + PADDLE_HEIGHT / 2;
  ballSpeedY = ballY - middle;
}

function moveComputerPaddle() {
  var middle = paddle2Y + PADDLE_HEIGHT / 2;
  
  if (ballY > middle + 25) {
    paddle2Y += 8;
  } else if (ballY < middle - 25) {
    paddle2Y -= 8;
  }
}

function moveEverything() {
  // <-- Computer/AI movement --> //
  moveComputerPaddle();

  // if ball moves beyond the right edge, reverse direction
  if (ballX > canvas.width - PADDLE_THICKNESS) {
    // positive value = to the right, negative value = to the left
    if (ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT) {
      ballHitPaddleSound.play();
      ballSpeedX *= -1;
      moveBallAngle(paddle2Y);
    } else {
      // computer win +1
      // otherwise, reset the ball back
      ballReset(true);
    }
  } else if (ballX < PADDLE_THICKNESS) {
    // ball bounces back to the other side of the screen
    if (ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT) {
      ballHitPaddleSound.play();
      ballSpeedX *= -1;
      moveBallAngle(paddle1Y); 
    } else {
      // player win +1
      // otherwise, reset the ball back          
      ballReset(false);
    }
  } else if (ballY > canvas.height) {
    ballSpeedY *= -1;
  } else if (ballY < 0) {
    ballSpeedY *= -1;
  }
  
  // ball moves to the right by a small increment //
  // if the ball speed is greater than the max ball speed, set it to the max ball speed, put the direction back in
  // if not, set it to itself
  ballSpeedX = Math.abs(ballSpeedX) > MAX_BALL_SPEED ? Math.sign(ballSpeedX) * MAX_BALL_SPEED : ballSpeedX;
  ballSpeedY = Math.abs(ballSpeedY) > MAX_BALL_SPEED ? Math.sign(ballSpeedY) * MAX_BALL_SPEED : ballSpeedY;
  ballX += ballSpeedX;
  ballY += ballSpeedY;
}

function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

function colorCircle(centerX, centerY, radius, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
  canvasContext.fill();
}

function drawEverything() {
  // <-- background --> //
  // canvasContext.fillStyle = 'black';
  // x coord, y coord, width of canvas, height of canvas //
  // canvasContext.fillRect(0, 0, canvas.width, canvas.height);
  colorRect(0, 0, canvas.width, canvas.height, 'black');

  // <-- Dashed line for the net --> //
  for (var i = 0; i < canvas.height; i += 30) {
    colorRect(canvas.width / 2, i, 2, 20, 'white');
  }

  // <-- paddle --> //
  colorRect(0, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');

  // <-- Computer paddle --> //
  colorRect(canvas.width - PADDLE_THICKNESS, paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');

  // <-- white circle --> //
  // canvasContext.fillStyle = 'white';
  // beginPath = tells the browser that this is a new, separate shape rather than a continuation of previous shapes
  // canvasContext.beginPath();
  // describes the circle
  // takes 5 arguments; x coord, y coord, radius, start angle, end angle (math.pi * 2 = full circle), clockwise or not (boolean)
  // canvasContext.arc(ballX, ballY, 10, 0, Math.PI*2, true);
  // color the shape of the recent arc since beginPath
  // canvasContext.fill();
  
  if (!isGameOver) {
    colorCircle(ballX, ballY, 10, 'white');
  }

  // <-- Score texts --> //
  canvasContext.font = '12px serif';
  canvasContext.fillText(playerSP, 100, 100);

  canvasContext.font = '12px serif';
  canvasContext.fillText(compSP, canvas.width - 100, canvas.height - 500);

  if (isGameOver) {
    var gameOverMessage = playerSP > compSP ? 'Player won!!!' : 'Computer won... :(';
    canvasContext.font = '36px serif';
    canvasContext.fillText(gameOverMessage, 275, 300);
  }
}