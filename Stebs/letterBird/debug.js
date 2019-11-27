function drawCurrentCorrectLetter()
{
  gameCanvasContext.fillStyle = 'white';
  gameCanvasContext.font = '30px Helvetica';
  gameCanvasContext.fillText(currentCorrectLetter, 50,50);
}

function drawLetterColliders()
{
  gameCanvasContext.strokeStyle = 'white';
  for (let letterIndex = 0; letterIndex < arrayOfLetters.length; letterIndex++)
  {

    gameCanvasContext.strokeRect(arrayOfLetters[letterIndex].x,arrayOfLetters[letterIndex].y - 20,
                                30,30);
  }
}
