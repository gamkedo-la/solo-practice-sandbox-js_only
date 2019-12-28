window.onload = function()
{
  gameCanvas = document.getElementById("gameCanvas");
  gameCanvasContext = gameCanvas.getContext('2d');

  statsCanvas = document.getElementById("statsCanvas");
  statsCanvasContext = statsCanvas.getContext('2d');

  drawLoadingOrSplashOrTitleScreenBackground();
  drawDualPurposeLoadingSplashScreen();

  document.addEventListener('keydown',keyDown);
  document.addEventListener('keyup',keyUp);
  document.addEventListener('click', gameCanvasClick, false);
  gameCanvas.addEventListener('mousemove', calculateMousePosition);

  // initializeCorrectLetterAudioTag();
}

function advanceGameFrame()
{
  updateEverythingInTheGame();
  drawEverythingInTheGame();
}


//update section
function updateEverythingInTheGame()
{
  moveGameSpecificPlayer();
  gameSpecificUpdates();
  handleGameSpecificSpritesOffScreen();
  moveLettersIfAppropriate();
  handleCollisionsWithLetters();
}

function gameSpecificUpdates()
{
  if (playerShouldBePlayingSnake)
  {
    updateSnakeTail();
  } else if (playerShouldBePlayingLane)
  {
    moveYellowCenterDashes();
    handleDashArrayPopulation();
  } else if (playerShouldBePlayingSpaceShooter)
  {
    moveSpaceShooterBullets();
  }
}

function handleGameSpecificSpritesOffScreen()
{
  if (playerShouldBePlayingSnake)
  {
    wrapSnakeIfOffScreen();
  } else if (playerShouldBePlayingBird) {
    handleBirdOffScreenPossibilities();
  }
}
//end of update section

//draw section
function drawEverythingInTheGame()
{
  drawGameSpecificBackground();
  drawBackButton();
  drawGameSpecificPlayer();
  if (playerShouldBePlayingSpaceShooter)
  {
    drawSpaceShooterBullets();
  }
  drawLetters();
  drawStatsBackground();
  drawStats();

  if (debugOn)
  {
    drawDebugStuff();
  }
}
//end of draw section
