var birdX = 100;
var birdY = 100;

var birdSpeed = 5;

var gravity = 4;

function drawBird()
{
  gameCanvasContext.fillStyle = 'lightCoral';
  gameCanvasContext.fillRect(birdX,birdY, 20,20);
}

function moveBird()
{
  birdY += gravity;
  handleLeftAndRightArrows();
}

function flapUp()
{
  birdY -= 50;
}

function checkCollisionsOfBirdWithLetters()
{
  for (let letterIndex = 0; letterIndex < arrayOfLetters.length; letterIndex++)
  {
    for (let letterIndex = 0; letterIndex < arrayOfLetters.length; letterIndex++)
    if ( birdX - 10 > arrayOfLetters[letterIndex].x -50 &&
        birdX + 10 < arrayOfLetters[letterIndex].x + 60 &&
        birdY + 10> arrayOfLetters[letterIndex].y - 20 &&
        birdY + 10 < arrayOfLetters[letterIndex].y + 40  &&
        arrayOfLetters[letterIndex].name === currentCorrectLetter)
      {
        arrayOfLetters.splice(letterIndex,1);
        amountCorrect++;
        calculateAccuracy();
        setOrResetCorrectLetter();
      }
      else if (birdX - 10 > arrayOfLetters[letterIndex].x -50 &&
          birdX + 10 < arrayOfLetters[letterIndex].x + 60 &&
          birdY + 10 > arrayOfLetters[letterIndex].y - 20 &&
          birdY + 10  < arrayOfLetters[letterIndex].y + 40  &&
          arrayOfLetters[letterIndex].name !== currentCorrectLetter)
                      {
                        amountIncorrect++;
                        calculateAccuracy();
                        arrayOfLetters.splice(letterIndex,1);
                        setOrResetCorrectLetter();
                      }
  }
}

function handleBirdOffScreenPossibilities()
{
  if (birdY > 470)
  {
    birdY = 5;
  } else if (birdY < 0) {
    birdY = 0;
  } else if (birdX > 630)
  {
    birdX = -5;
  } else if (birdX < -5)
  {
    birdX = 635;
  }
}
