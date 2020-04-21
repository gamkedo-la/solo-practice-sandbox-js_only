// Ball-related variables
const BALL_SPEED_X_STEP_INCREMENTS = [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1]
const BASE_BALL_SPEED_X = 15;
const SERVE_BALL_MAX_SPEED_Y = 15;
const SERVE_BALL_MIN_SPEED_Y = 1;
var ballX = 50;
var ballY = 50;
var ballSpeedX = BASE_BALL_SPEED_X;
var ballSpeedY = -1;
var ballSpeedXIncrement = -1;

function checkIncrementBallSpeedX() {
  ballSpeedXIncrement++;

  if (BALL_SPEED_X_STEP_INCREMENTS[ballSpeedXIncrement] > 0) {
    console.log("Increment");
    ballSpeedX = ballSpeedX * 1.25;
  }
}

function setServeSpeed() {
  var direction = Math.random() < 0.5 ? -1 : 1
  return direction * Math.round(Math.random()*(SERVE_BALL_MAX_SPEED_Y-SERVE_BALL_MIN_SPEED_Y+1)+SERVE_BALL_MIN_SPEED_Y);
}

function ballReset(winner) {
  if (paddle1Score >= WINNING_SCORE || paddle2Score >= WINNING_SCORE) {
    showWinningScreen = true;

    showWinningScreenHandler = setInterval(function() {
      if (showWinningScreenFrame == 0) {
        scoreColor = 'black';
      } else  {
        scoreColor = 'white';
      }
      showWinningScreenFrame = (showWinningScreenFrame + 1) % 2
    }, 1000);
  }

  ballX = canvas.width / 2;
  ballY = canvas.height / 2;

  if (winner == 1) {
    ballSpeedX = BASE_BALL_SPEED_X
  } else if (winner == 2) {
    ballSpeedX = -BASE_BALL_SPEED_X
  } else {
    var direction = Math.random() < 0.5 ? -1 : 1;
    ballSpeedX = direction * BASE_BALL_SPEED_X;
  }
  ballSpeedXIncrement = -1;
  ballSpeedX = BASE_BALL_SPEED_X;
  ballSpeedY = setServeSpeed();
}

