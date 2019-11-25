function drawLetterColliders()
{
  gameCanvasContext.strokeStyle = 'white';

  for (let letterIndex = 0; letterIndex < arrayOfLetters.length; letterIndex++)
  {
    gameCanvasContext.strokeRect(arrayOfLetters[letterIndex].x,arrayOfLetters[letterIndex].y - 30,
                                30,30);
  }
}

function drawPlayerXYCoordinates()
{
  gameCanvasContext.fillStyle = 'white';
  gameCanvasContext.fillText(Math.floor(playerXCoordinate) + ', ' + playerYCoordinate, playerXCoordinate,playerYCoordinate - 30);
}
