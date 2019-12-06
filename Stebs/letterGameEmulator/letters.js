var arrayOfLetters = [];

var letterDimensionX = 45;
var letterDimensionY = 45;
var letterSpeed = undefined;

var correctLetterAudioTag = undefined;

var currentCorrectLetter = undefined;

function setOrResetCorrectLetter()
{
  let randomNumber = Math.random()*10;

  if (randomNumber < 5)
  {
    currentCorrectLetter = 'm';
  } else {
    currentCorrectLetter = 'n';
  }
  correctLetterAudioTag.src = currentCorrectLetter + '.mp3';
  correctLetterAudioTag.play();
}

function initializeCorrectLetterAudioTag()
{
  correctLetterAudioTag = document.getElementById('correctLetter');
}

var letterSpawnRate = undefined;

function spawnALetterIfAppropriate()
{
  let randomNumber = Math.random()*10;
  let name = undefined;
  if (randomNumber < 5)
  {
    name = 'm';
  } else {
    name = 'n';
  }
  arrayOfLetters.push({xCoordinate:640,yCoordinate:Math.random()*700, name:name, correctAnswer:false});
}

function moveLettersIfAppropriate()
{
  if (playerShouldBePlayingBird)
  {
    for (var letterIndex = 0; letterIndex < arrayOfLetters.length; letterIndex++)
    {
      arrayOfLetters[letterIndex].xCoordinate -= letterSpeed;
    }
  }
}

function drawLetters()
{
  if (playerShouldBePlayingSnake)
  {
    gameCanvasContext.fillStyle = snakeLetterColor;
  } else if (playerShouldBePlayingBird)
  {
    gameCanvasContext.fillStyle = birdLetterColor;
  }
  gameCanvasContext.font = '30px Helvetica';
  for (var letterIndex = 0; letterIndex < arrayOfLetters.length; letterIndex++)
  {
    gameCanvasContext.fillText(arrayOfLetters[letterIndex].name,
    arrayOfLetters[letterIndex].xCoordinate,arrayOfLetters[letterIndex].yCoordinate);
  }
}

function handleCollisionsWithLetters()
{
  if (playerShouldBePlayingSnake)
  {
    for (let letterIndex = 0; letterIndex < arrayOfLetters.length; letterIndex++)
    {
      if (playerXCoordinate > arrayOfLetters[letterIndex].xCoordinate - 15 && playerXCoordinate < arrayOfLetters[letterIndex].xCoordinate + 40
        && playerYCoordinate > arrayOfLetters[letterIndex].yCoordinate - 30 && playerYCoordinate < arrayOfLetters[letterIndex].yCoordinate + 5)
        {
          if (arrayOfLetters[letterIndex].name === currentCorrectLetter)
          {
            amountCorrect++;
          } else if (arrayOfLetters[letterIndex].name !== currentCorrectLetter)
          {
            amountIncorrect++;
          }
          calculateAccuracy();
          populateArrayOfLettersForSnake();
          setOrResetCorrectLetter();

        }
    }
  } else if (playerShouldBePlayingBird)
  {
    for (let letterIndex = 0; letterIndex < arrayOfLetters.length; letterIndex++)
    {
      if (playerXCoordinate > arrayOfLetters[letterIndex].xCoordinate - 15 && playerXCoordinate < arrayOfLetters[letterIndex].xCoordinate + 40
        && playerYCoordinate > arrayOfLetters[letterIndex].yCoordinate - 30 && playerYCoordinate < arrayOfLetters[letterIndex].yCoordinate + 5)
        {
          if (arrayOfLetters[letterIndex].name === currentCorrectLetter)
          {
            amountCorrect++;
          } else if (arrayOfLetters[letterIndex].name !== currentCorrectLetter)
          {
            amountIncorrect++;
          }
          calculateAccuracy();
          setOrResetCorrectLetter();
          arrayOfLetters.splice(letterIndex,1);
        }
    }
  }
}

// function checkForLettersOffLeftSideOfScreen()
// {
//   for (let letterIndex = 0; letterIndex < arrayOfLetters.length; letterIndex++)
//   {
//     if (arrayOfLetters[letterIndex].x < 0)
//     {
//       arrayOfLetters.splice(letterIndex,1);
//     }
//   }
// }
