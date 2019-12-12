var birdStartingX = 100;
var birdStartingY = 100;

var birdSpeed = 5;

var gravity = 4;

var birdGameFrameRate = 1000/30;

var birdBackButtonRectangleColor = 'yellow';
var birdBackButtonTextColor = 'red';

var birdLetterSpawnRate = 2000;

var birdLetterSpeed = 3;
var birdLetterColor = 'BlueViolet';

function drawBirdBackground()
{
  gameCanvasContext.fillStyle = 'cyan';
  gameCanvasContext.fillRect(0,0, gameCanvas.width,gameCanvas.height);
}

function drawBirdPlayer()
{
    gameCanvasContext.fillStyle = 'lightCoral';
    gameCanvasContext.fillRect(playerXCoordinate,playerYCoordinate, 20,20);
}

function moveBirdPlayer()
{
  applyGravityToBird();
  if (leftArrowIsBeingHeld)
  {
    moveBirdPlayerLeft();
  } else if (rightArrowIsBeingHeld)
  {
    moveBirdPlayerRight();
  }
}

function applyGravityToBird()
{
  playerYCoordinate += gravity;
}

function moveBirdPlayerLeft()
{
  playerXCoordinate -= playerSpeedX;
}

function moveBirdPlayerRight()
{
  playerXCoordinate += playerSpeedX;
}

function flapUp()
{
  playerYCoordinate -= 50;
}

function handleBirdOffScreenPossibilities()
{
  if (playerYCoordinate > 690)
  {
    playerYCoordinate = 5;
  } else if (playerYCoordinate < 0) {
    playerYCoordinate = 0;
  } else if (playerXCoordinate > 630)
  {
    playerXCoordinate = -5;
  } else if (playerXCoordinate < -5)
  {
    playerXCoordinate = 635;
  }
}
