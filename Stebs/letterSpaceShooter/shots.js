var arrayOfShots = [];
var shotDimensionX = 4;
var shotDimensionY = 4;
var shotSpeed = 7;

function moveShots()
{
  for (var shotIndex = 0; shotIndex < arrayOfShots.length; shotIndex++)
  {
    arrayOfShots[shotIndex].x+=shotSpeed;
  }
}

function drawShots()
{
  gameCanvasContext.fillStyle = 'lime';

  for (var shotIndex = 0; shotIndex < arrayOfShots.length; shotIndex++)
  {

    gameCanvasContext.fillRect(arrayOfShots[shotIndex].x,arrayOfShots[shotIndex].y,
    shotDimensionX,shotDimensionY);
  }
}

function checkCollisionsForShotsWithLetters()
{
  for (let shotIndex = 0; shotIndex < arrayOfShots.length; shotIndex++)
  {
    for (let letterIndex = 0; letterIndex < arrayOfLetters.length; letterIndex++)
    if (arrayOfShots[shotIndex].x > arrayOfLetters[letterIndex].x &&
        arrayOfShots[shotIndex].x < arrayOfLetters[letterIndex].x + letterDimensionX &&
        arrayOfShots[shotIndex].y > arrayOfLetters[letterIndex].y - 20 &&
        arrayOfShots[shotIndex].y < arrayOfLetters[letterIndex].y + letterDimensionY - 20 &&
        arrayOfLetters[letterIndex].name === currentCorrectLetter)
      {
        arrayOfLetters.splice(letterIndex,1);
        arrayOfShots.splice(shotIndex,1);
        amountCorrect++;
        calculateAccuracy();
        setOrResetCorrectLetter();
      }
      else if (arrayOfShots[shotIndex].x > arrayOfLetters[letterIndex].x &&
          arrayOfShots[shotIndex].x < arrayOfLetters[letterIndex].x + letterDimensionX &&
          arrayOfShots[shotIndex].y > arrayOfLetters[letterIndex].y - 20 &&
          arrayOfShots[shotIndex].y < arrayOfLetters[letterIndex].y + letterDimensionY - 20 &&
          arrayOfLetters[letterIndex].name !== currentCorrectLetter)
                      {
                        amountIncorrect++;
                        calculateAccuracy();
                        arrayOfShots.splice(shotIndex,1);
                      }
  }
}

function checkForShotsOffRightSideOfScreen()
{
  for (let shotIndex = 0; shotIndex < arrayOfShots.length; shotIndex++)
  {
    if (arrayOfShots[shotIndex].x > gameCanvas.width)
    {
      amountIncorrect++;
      calculateAccuracy();
      arrayOfShots.splice(shotIndex,1);
    }
  }
}
