var playerXCoordinate = Math.random() * 780;
var playerYCoordinate = (Math.floor(Math.random() * 6) * 100) + 30;
var playerXVelocity = 0;
var playerYVelocity = 0;

function drawPlayer()
{
  gameCanvasContext.fillStyle = 'white';
  gameCanvasContext.fillRect(playerXCoordinate,playerYCoordinate, 20,20);
}

function movePlayer()
{
  if (leftArrowIsBeingHeld)
  {
    playerXCoordinate -= 3;
    if (playerXCoordinate < -10)//if the player goes off the left side of the screen
    {
      playerXCoordinate = gameCanvas.width - 5;//put them on the right side
    }
  }
  else if (rightArrowIsBeingHeld)
  {
    playerXCoordinate += 3;
    if (playerXCoordinate > gameCanvas.width - 5)//if the player goes off the right side of the screen
    {
      playerXCoordinate = -5;//put them on the left side of the screen
    }
  }

  if (upArrowIsBeingHeld)
  {
    playerYCoordinate += playerYVelocity;
  } else if (!upArrowIsBeingHeld)
  {
      playerYCoordinate -= playerYVelocity;
      if (playerYCoordinate === 30 || playerYCoordinate === 130 || playerYCoordinate === 230
      || playerYCoordinate === 330 || playerYCoordinate === 430 || playerYCoordinate === 530)
      {
        playerYVelocity = 0;
      }
  }
}

function checkForPlayerCollisionsWithLetters()
{
  for (let letterIndex = 0; letterIndex < arrayOfLetters.length; letterIndex++)
  {
    if ( (playerXCoordinate + 15 > arrayOfLetters[letterIndex].x && playerXCoordinate < arrayOfLetters[letterIndex].x + 30) &&
          (playerYCoordinate >= arrayOfLetters[letterIndex].y - 30 && playerYCoordinate + 25 < arrayOfLetters[letterIndex].y + 30) )
    {
      if (arrayOfLetters[letterIndex].name === correctLetter)
      {
        amountCorrect++;
      } else {
        amountIncorrect++;
      }
      calculateAccuracy();
      console.log("playerYCoordinate: " + playerYCoordinate);
      resetLetterPositions();
      setCorrectLetter();
    }
  }
}
