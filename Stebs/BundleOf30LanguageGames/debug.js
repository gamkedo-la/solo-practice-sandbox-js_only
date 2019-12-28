var debugOn = false;

function drawDebugStuff()
{
  if (playerShouldSeeTitleScreen)
  {
    gameCanvasContext.fillText(mouseCoordinates.mouseX + "," + mouseCoordinates.mouseY,
                                mouseCoordinates.mouseX,mouseCoordinates.mouseY);
  } else if (playerIsPlayingAnyGame)
  {
    drawLetterCoordinates();
    drawPlayerCoordinates();
    drawLetterColliders();
  }
}

function drawLetterCoordinates()
{
  for (let letterIndex = 0; letterIndex < arrayOfLetters.length; letterIndex++)
  {
    gameCanvasContext.fillStyle = 'black';
    gameCanvasContext.fillText(arrayOfLetters[letterIndex].xCoordinate + ',' + arrayOfLetters[letterIndex].yCoordinate,
                              arrayOfLetters[letterIndex].xCoordinate, arrayOfLetters[letterIndex].yCoordinate - 27);
  }
}

function drawPlayerCoordinates()
{
  gameCanvasContext.fillStyle = 'black';
  gameCanvasContext.font = '27px Helvetica';
  gameCanvasContext.fillText(playerXCoordinate + ',' + playerYCoordinate, playerXCoordinate,playerYCoordinate);
}

function drawLetterColliders()
{
  for(let letterIndex = 0; letterIndex < arrayOfLetters.length; letterIndex++)
  {
    gameCanvasContext.strokeStyle = 'black';
    gameCanvasContext.strokeRect(arrayOfLetters[letterIndex].xCoordinate,arrayOfLetters[letterIndex].yCoordinate - 20,
                                27,27);
  }
}
