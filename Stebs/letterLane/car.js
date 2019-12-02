var carX = 310;
var carY = 450;

function drawCar()
{
  gameCanvasContext.fillStyle = 'blue';
  gameCanvasContext.fillRect(carX,carY, 30,60);
}

function checkCarCollisionsWithLetters()
{
  for (let letterIndex = 0; letterIndex < arrayOfLetters.length; letterIndex++)
  {
    if (arrayOfLetters[letterIndex].y - 5 > carY && arrayOfLetters[letterIndex].y - 5< carY + 60 &&
      arrayOfLetters[letterIndex].x === carX &&
      arrayOfLetters[letterIndex].name === correctLetter)
    {
      amountCorrect++;
      calculateAccuracy();
      setCorrectLetter();
      arrayOfLetters.splice(letterIndex,1);
    } else if (arrayOfLetters[letterIndex].y - 5 > carY && arrayOfLetters[letterIndex].y - 5 < carY + 60 &&
      arrayOfLetters[letterIndex].x === carX &&
      arrayOfLetters[letterIndex].name !== correctLetter)
    {
      amountIncorrect++;
      calculateAccuracy();
      setCorrectLetter();
      arrayOfLetters.splice(letterIndex,1);
    }
  }
}
