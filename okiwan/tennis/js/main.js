// This next line prepares for the LiveReload connection
document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>')

// Program starts here...
var canvas;
var canvasContext;

// Scoring-related vars
var showWinningScreen = false;
var showWinningScreenFrame = 0;
var showWinningScreenHandler = 0;
const WINNING_SCORE = 10;
var scoreColor = 'white';

window.onload = () => {
  console.log("Loading sound effects...");
  bloop = new SoundOverlapsClass();
  goal = new SoundOverlapsClass();
  bloop.load("./sounds/bloop");
  goal.load("./sounds/goal");

  console.log("Initializing canvas...");
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext("2d");

  paddle1Y = (canvas.height - paddle1Height) / 2;
  paddle2Y = (canvas.height - paddle2Height) / 2;
  paddle2X = canvas.width - PADDLE_WIDTH - PADDLE_MARGIN;

  console.log("Game start!");
  ballReset();
  var framesPerSecond = 30;
  setInterval(function() {
    moveEverything();
    drawEverything();
  }, 1000/framesPerSecond);

  canvas.addEventListener('mousemove', mouseMove);
  canvas.addEventListener('click', mouseClick);
}

function startOver() {
  // Set ball direction depending on who lost the last game
  ballSpeedX = (paddle1Score < paddle2Score) ? -Math.abs(ballSpeedX) : Math.abs(ballSpeedX);
  scoreColor = 'white';
  clearInterval(showWinningScreenHandler);
  paddle1Score = 0;
  paddle2Score = 0;
  showWinningScreen = false;
}

function drawEverything() {
  // Draw canvas
  colorRect(0, 0, canvas.width, canvas.height, 'black');
  // Draw winning message
  if (showWinningScreen) {
    canvasContext.fillStyle = 'white';
    canvasContext.font = "15px sans-serif";
    canvasContext.fillText("Click to play again!", canvas.width / 2.3, canvas.height - 20);
  }
  // Draw ball
  colorCircle(ballX, ballY, 10, 'white');
  // Draw left paddle
  colorRect(paddle1X, paddle1Y, PADDLE_WIDTH, paddle1Height, 'white');
  // Draw right paddle
  colorRect(paddle2X, paddle2Y, PADDLE_WIDTH, paddle2Height, 'white');
  // Draw net
  drawNet();
  // Draw scores
  printScore(scoreColor);
}

function computerMovement() {
  var paddle2Center = paddle2Y + (paddle2Height / 2);
  if (paddle2Center < ballY - 25) {
    paddle2Y += 20;
  } else if (paddle2Center > ballY + 25) {
    paddle2Y -= 20;
  }
}

function moveEverything() {
  if (showWinningScreen) {
    return;
  }

  computerMovement();

  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Horizontal movement
  if (ballX < (paddle1X + PADDLE_WIDTH)) {
    if (ballX < 0) {
      paddle2Score++;       // Must be BEFORE ballReset
      goal.play();
      ballReset(2);
    } else {
      if (ballY > paddle1Y && ballY < paddle1Y + paddle1Height) {
        checkIncrementBallSpeedX();
        ballSpeedX = -ballSpeedX;
        bloop.play();

        var deltaY = ballY - (paddle1Y + paddle1Height / 2);
        ballSpeedY = deltaY * 0.70;
      }
    }
  }

  if (ballX > paddle2X) {
    if (ballX > canvas.width) {
      paddle1Score++;       // Must be BEFORE ballReset
      goal.play();
      ballReset(1);
    } else {
      if (ballY > paddle2Y && ballY < paddle2Y + paddle2Height) {
        checkIncrementBallSpeedX();
        ballSpeedX = -ballSpeedX;
        bloop.play();

        var deltaY = ballY - (paddle2Y + paddle2Height / 2);
        ballSpeedY = deltaY * 0.70;
      }
    }
  }

  // Vertical movement
  if (ballY < 0 || ballY > canvas.height) {
    ballSpeedY = -ballSpeedY;
    bloop.play();
  }
}

