function drawLetterColliders()
{
  gameCanvasContext.fillStyle = 'white';

  for (let letterIndex = 0; letterIndex < arrayOfLetters.length; letterIndex++)
  {
    gameCanvasContext.strokeRect(arrayOfLetters[letterIndex].x,arrayOfLetters[letterIndex].y - 30, 30,30);
  }
}

function drawCorrectLetter()
{
  gameCanvasContext.fillStyle = 'white';
  gameCanvasContext.fillText(correctLetter, 100,100);
}

function drawCarCoordinates()
{
  gameCanvasContext.fillStyle = 'white';
  gameCanvasContext.fillText(carX + ',' + carY, carX,carY - 20);
}

function drawLetterCoordinates()
{
  gameCanvasContext.fillStyle = 'white';
  gameCanvasContext.font = '15px Helvetica';

  for (let letterIndex = 0; letterIndex < arrayOfLetters.length; letterIndex++)
  {
    gameCanvasContext.fillText(arrayOfLetters[letterIndex].x + ',' + arrayOfLetters[letterIndex].y,
      arrayOfLetters[letterIndex].x, arrayOfLetters[letterIndex].y - 15);
  }
}
