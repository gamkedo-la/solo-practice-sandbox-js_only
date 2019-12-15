var playerShouldSeeTitleScreen = false;
var playerIsPlayingAnyGame = false;

var cellXTopLeftCoordinate = 0;
var cellYTopLeftCoordinate = 0;

function drawTitleScreen()
{
  drawTitleScreenHeader();
  drawCellTextAndCheckForHighlightingFromMouseOver();
  drawGameNames();
}

function drawTitleScreenHeader()
{
  //title text
  gameCanvasContext.fillStyle = 'lime';
  gameCanvasContext.font = '30px Helvetica';
  gameCanvasContext.fillText("Letter Game Emulator", 200,50);
  gameCanvasContext.fillText("Choose A Game", 200,100);
}

function drawCellTextAndCheckForHighlightingFromMouseOver()
{
  //basic cell outlines
  gameCanvasContext.strokeStyle = 'white';
  for (let cellRowIndex = 0; cellRowIndex < 5; cellRowIndex++)
  {
    for (let cellColumnIndex = 0; cellColumnIndex < 6; cellColumnIndex++)
    {
      cellXTopLeftCoordinate = cellColumnIndex*100 + 20;
      cellYTopLeftCoordinate = cellRowIndex*100 + 150;
      gameCanvasContext.strokeRect(cellXTopLeftCoordinate,cellYTopLeftCoordinate, 100,100);
      //highlight cell if the mouse is inside it
      if (mouseCoordinates.mouseX > cellXTopLeftCoordinate && mouseCoordinates.mouseX < cellXTopLeftCoordinate + 100 &&
          mouseCoordinates.mouseY > cellYTopLeftCoordinate && mouseCoordinates.mouseY < cellYTopLeftCoordinate + 100)
          {
            gameCanvasContext.fillStyle = 'white';
            gameCanvasContext.fillRect(cellXTopLeftCoordinate,cellYTopLeftCoordinate, 100,100);
          }
    }
  }
}

function drawGameNames()
{
  gameCanvasContext.fillStyle = 'blue';
  gameCanvasContext.font = '27px Helvetica';

  //row 1
  gameCanvasContext.fillText('Snake', 29,205);

  gameCanvasContext.fillText('Bird', 142,205);

  gameCanvasContext.fillText('Lane', 237,205);

  gameCanvasContext.fillText('Jumper', 322,205);

  gameCanvasContext.fillText('Finder', 429,205);

  gameCanvasContext.fillText('Catcher', 522,205);

  //row two
  gameCanvasContext.fillText('Shooter', 22,305);

  gameCanvasContext.fillText('Space', 130, 290);
  gameCanvasContext.fillText('Shooter', 122,325);
}

function handleGameCellClicks()
{
  //1st row
  if (mouseCoordinates.mouseX > 20 && mouseCoordinates.mouseX < 120 &&
      mouseCoordinates.mouseY > 150 && mouseCoordinates.mouseY < 250)
  {
    playerShouldBePlayingSnake = true;
    playerShouldSeeTitleScreen = false;
    gameInterval.reset(snakeGameFrameRate);
    playerIsPlayingAnyGame = true;
    setOrResetCorrectLetter();
  }
  else if (mouseCoordinates.mouseX > 120 && mouseCoordinates.mouseX < 220 &&
           mouseCoordinates.mouseY > 150 && mouseCoordinates.mouseY < 250)
      {
        playerShouldBePlayingBird = true;
        playerShouldSeeTitleScreen = false;
        gameInterval.reset(birdGameFrameRate);
        letterSpawnInterval.reset(birdLetterSpawnRate);
        playerIsPlayingAnyGame = true;
        setOrResetCorrectLetter();
      }
  else if (mouseCoordinates.mouseX > 220 && mouseCoordinates.mouseX < 320 &&
           mouseCoordinates.mouseY > 150 && mouseCoordinates.mouseY < 250)
      {
        console.log("inside lane cell click");
        playerShouldBePlayingLane = true;
        playerShouldSeeTitleScreen = false;
        letterSpawnInterval.reset(laneLetterSpawnRate);
        playerIsPlayingAnyGame = true;
        gameInterval.reset(laneFrameRate);
        setOrResetCorrectLetter();
      }
  else if (mouseCoordinates.mouseX > 320 && mouseCoordinates.mouseX < 420 &&
           mouseCoordinates.mouseY > 150 && mouseCoordinates.mouseY < 250)
      {
        console.log("inside jumper cell click");
        playerShouldBePlayingJumper = true;
        playerShouldSeeTitleScreen = false;
        playerIsPlayingAnyGame = true;
        gameInterval.reset(jumperFrameRate);
        setOrResetCorrectLetter();
        initializeLettersForJumper();
      }
  else if (mouseCoordinates.mouseX > 420 && mouseCoordinates.mouseX < 520 &&
           mouseCoordinates.mouseY > 150 && mouseCoordinates.mouseY < 250)
      {
        playerShouldBePlayingFinder = true;
        playerShouldSeeTitleScreen = false;
        playerIsPlayingAnyGame = true;
      }
  else if (mouseCoordinates.mouseX > 520 && mouseCoordinates.mouseX < 620 &&
           mouseCoordinates.mouseY > 150 && mouseCoordinates.mouseY < 250)
      {
        playerShouldBePlayingCatcher = true;
        playerShouldSeeTitleScreen = false;
        playerIsPlayingAnyGame = true;
      }

  //2nd row
  else if (mouseCoordinates.mouseX > 120 && mouseCoordinates.mouseX < 220 &&
           mouseCoordinates.mouseY > 250 && mouseCoordinates.mouseY < 350)
      {
        playerShouldBePlayingSpaceShooter = true;
        playerShouldSeeTitleScreen = false;
        playerIsPlayingAnyGame = true;
        gameInterval.reset(spaceShooterFrameRate);
        setOrResetCorrectLetter();
        letterSpawnInterval.reset(spaceShooterLetterSpawnRate);
      }
  else if (mouseCoordinates.mouseX > 20 && mouseCoordinates.mouseX < 120 &&
           mouseCoordinates.mouseY > 250 && mouseCoordinates.mouseY < 350)
      {
        playerShouldBePlayingSpaceShooter = true;
        playerShouldSeeTitleScreen = false;
        playerIsPlayingAnyGame = true;
      }

}
