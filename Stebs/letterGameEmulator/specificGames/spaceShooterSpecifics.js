var spaceShooterStartingXCoordinate = 100;
var spaceShooterStartingYCoordinate = 100;
var spaceShooterPlayerSpeed = 15;
var spaceShooterFrameRate = 1000/30;


//Player section
function drawSpaceShooterBackground()
{
  gameCanvasContext.fillStyle = 'black';
  gameCanvasContext.fillRect(0,0, 640,700);
}

function drawSpaceShooterPlayer()
{
  gameCanvasContext.fillStyle = 'white';
  gameCanvasContext.fillRect(playerXCoordinate,playerYCoordinate, 20,20);
  console.log('inside drawSpaceShooterPlayer');
}

function moveSpaceShooterPlayer()
{
  if (upArrowIsBeingHeld)
  {
    playerYCoordinate -= spaceShooterPlayerSpeed;
  }
  if (rightArrowIsBeingHeld)
  {
    playerXCoordinate += spaceShooterPlayerSpeed;
  }
  if (downArrowIsBeingHeld)
  {
    playerYCoordinate += spaceShooterPlayerSpeed;
  }
  if (leftArrowIsBeingHeld)
  {
    playerXCoordinate -= spaceShooterPlayerSpeed;
  }
}


//shots section
var arrayOfBullets = [];
var bulletDimensionX = 4;
var bulletDimensionY = 4;
var bulletSpeed = 7;

function moveSpaceShooterBullets()
{
  //console.log("inside moveSpaceShooterBullets");
  for (var bulletIndex = 0; bulletIndex < arrayOfBullets.length; bulletIndex++)
  {
    arrayOfBullets[bulletIndex].x+=bulletSpeed;
  }
}

function drawSpaceShooterBullets()
{
  gameCanvasContext.fillStyle = 'white';
  //console.log("inside drawSpaceShooterBullets");
  for (var bulletIndex = 0; bulletIndex < arrayOfBullets.length; bulletIndex++)
  {
    gameCanvasContext.fillRect(arrayOfBullets[bulletIndex].x,arrayOfBullets[bulletIndex].y,
    bulletDimensionX,bulletDimensionY);
  }
}

var spaceShooterLetterSpawnRate = 2000;
var spaceShooterLetterColor = 'red';
