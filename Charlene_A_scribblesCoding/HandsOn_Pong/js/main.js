const MAX_BALL_SPEED = 12;

var ballX = 75, ballY = 75;
var ballSpeedX = 10, ballSpeedY = 6;
var canvas, canvasContext;
var framesPerSecond = 30;
var awayFromSides = 20;

var paddle1Y = 250, paddle2Y = 350;
const PADDLE_HEIGHT = 80;
const PADDLE_THICKNESS = 10;

var playerSP = 0;
var compSP = 0;
var winningScore = 1;
var isGameOver = false;
var isGameStarted = false;

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');      
  //loadSounds();

  // Title screen, cheating by making it black on white text,
  // So when the game starts, it "disappears" into the background
  menu();

  canvas.addEventListener('click', function(e) {
    isGameStarted = true;
  });

  setInterval(function() {    
    if (isGameStarted == true) {
      if (!isGameOver) {
        moveEverything();
      }

      drawEverything();
    }
  }, 1000/framesPerSecond);

  canvas.addEventListener('mousemove', mousemoveHandler);
  canvas.addEventListener('dblclick', dblclickHandler);
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

function menu() {
  canvasContext.font = "48px serif";
  canvasContext.fillStyle = "black";
  canvasContext.fillText("Welcome to Pong!", 200, 200);
  canvasContext.font = "30px serif";
  canvasContext.fillText("Click anywhere to start playing", 180, 250);
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

function moveEverything() {
  // <-- Computer/AI movement --> //
  moveComputerPaddle();

  // if ball moves beyond the right edge, reverse direction
  if (ballX > canvas.width - PADDLE_THICKNESS - awayFromSides) {
    // positive value = to the right, negative value = to the left
    if (ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT) {
      //ballHitPaddleSound.play();
      ballSpeedX *= -1;
      moveBallAngle(paddle2Y);
    } else {
      if (ballX > canvas.width - PADDLE_THICKNESS) {
        // computer win +1
        // otherwise, reset the ball back
        ballReset(true);
      }
    }
  } else if (ballX < PADDLE_THICKNESS + awayFromSides) {
    // ball bounces back to the other side of the screen
    if (ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT) {
      // ballHitPaddleSound.play();
      ballSpeedX *= -1;
      moveBallAngle(paddle1Y); 
    } else {
      if (ballX < PADDLE_THICKNESS) {
        // player win +1
        // otherwise, reset the ball back
        ballReset(false);
      }
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
  colorRect(awayFromSides, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');

  // <-- Computer paddle --> //
  colorRect(canvas.width - PADDLE_THICKNESS - awayFromSides, paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');

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
    canvasContext.fillText(gameOverMessage, 250, 250);
    canvasContext.font = '24px serif';
    canvasContext.fillText("Restart Game?", 310, 330);
    canvasContext.font = '18px serif';
    canvasContext.fillText("[Double Click] to restart", 290, 355);
  }
}