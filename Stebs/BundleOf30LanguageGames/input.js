var playerShouldBePlayingSnake = false;
var playerShouldBePlayingBird = false;
var playerShouldBePlayingLane = false;
var playerShouldBePlayingJumper = false;
var playerShouldBePlayingFinder = false;
var playerShouldBePlayingCatcher = false;
var playerShouldBePlayingSpaceShooter = false;

var frameRate = 1000/30;

function gameCanvasClick()
{
  if (playerShouldSeeDualPurposeLoadingSplashScreen)
  {
    handleDualPurposeSplashAndLoadingSceneClick();//dualLoadingSplashScreen.js, player advances to main menu after loading
    initializeCorrectLetterAudioTag();
  } else if (playerShouldSeeTitleScreen)
  {
    handleGameCellClicks();//titleScreen.js, player chooses a game
    initializeSpecificGameSettings();//game initializes
  } else if (playerIsPlayingAnyGame)//back button in games
  {
    handleBackButtonClick();//backButton.js, player goes back to menu/title screen
  }
}

var mouseCoordinates = {mouseX:undefined,mouseY:undefined};

function calculateMousePosition(builtInDocumentEventObject)
{
  var rect = gameCanvas.getBoundingClientRect();
  var root = document.documentElement;
  var x = builtInDocumentEventObject.clientX - rect.left - root.scrollLeft;
  var y = builtInDocumentEventObject.clientY - rect.top - root.scrollTop;
  mouseCoordinates.mouseX = x;
  mouseCoordinates.mouseY = y;
}

var leftArrowIsBeingHeld = false;
var rightArrowIsBeingHeld = false;
var upArrowIsBeingHeld = false;
var downArrowIsBeingHeld = false;

function keyDown(builtInDocumentEventObject)
{
  builtInDocumentEventObject.preventDefault();
  switch(builtInDocumentEventObject.keyCode)
  {
    case 37://left arrow
    leftArrowIsBeingHeld = true;
    if (playerShouldBePlayingSnake)
    {
      playerSpeedX = -20;
      playerSpeedY = 0;
    } else if (playerShouldBePlayingBird)
    {

    } else if (playerShouldBePlayingLane)
    {
      if (playerXCoordinate > 230)
      playerXCoordinate = 230;
    } else if (playerShouldBePlayingJumper)
    {

    }
    break;

    case 38://up arrow
    upArrowIsBeingHeld = true;
    if (playerShouldBePlayingSnake)
    {
      playerSpeedX = 0;
      playerSpeedY = -20;
    } else if (playerShouldBePlayingJumper)
    {

    }
    break;

    case 39://right arrow
    rightArrowIsBeingHeld = true;
    if (playerShouldBePlayingSnake)
    {
      playerSpeedX = 20;
      playerSpeedY = 0;
    }  else if (playerShouldBePlayingBird)
    {

    } else if (playerShouldBePlayingLane)
    {
      if (playerXCoordinate !== 380)
      {
        playerXCoordinate = 380;
      }
    }
    break;

    case 40://down arrow
    downArrowIsBeingHeld = true;
    if (playerShouldBePlayingSnake)
    {
      playerSpeedX = 0;
      playerSpeedY = 20;
    } else if (playerShouldBePlayingJumper)
    {
      playerYCoordinate += 100;
      if (playerYCoordinate > 700)//if the player goes below the screen
      {
        playerYCoordinate = 30;//put them at the top platform
      }
    }

    break;

    case 32://spacebar
      if (playerShouldBePlayingBird)
      {
        flapUp();
      } else if (playerShouldBePlayingJumper)
      {
        playerYCoordinate += -5;
      } else if (playerShouldBePlayingSpaceShooter)
      {
        arrayOfBullets.push({x:playerXCoordinate,y:playerYCoordinate});
      }
    break;

    case 68://d
    if (debugOn === true)
    {
      debugOn = false;
    } else if (debugOn === false)
    {
      debugOn = true;
    }
    break;
  }
}

function keyUp(builtInDocumentEventObject)
{

  switch(builtInDocumentEventObject.keyCode)
  {
    case 37://left arrow
    leftArrowIsBeingHeld = false;
    if (playerShouldBePlayingBird)
    {

    }
    break;

    case 38://up arrow
    upArrowIsBeingHeld = false;
    break;

    case 39://right arrow
    rightArrowIsBeingHeld = false;
    if (playerShouldBePlayingBird)
    {
      rightArrowDown = false;
    }
    break;

    case 40://down arrow
    downArrowIsBeingHeld = false;
    break;
  }
}
