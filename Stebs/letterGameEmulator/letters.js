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
  correctLetterAudioTag.src = "audio/" + currentCorrectLetter + '.mp3';
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
  if (playerShouldBePlayingBird || playerShouldBePlayingSpaceShooter)
  {
    arrayOfLetters.push({xCoordinate:640,yCoordinate:Math.random()*700, name:name, correctAnswer:false});
    console.log(arrayOfLetters);
  } else if (playerShouldBePlayingLane)
  {
    let randomNumber2 = Math.random()*10;
    let randomChoiceOf2XStartingPositions = undefined;
    if (randomNumber2 < 5)
    {
      randomChoiceOf2XStartingPositions = 230;
    } else {
      randomChoiceOf2XStartingPositions = 380;
    }
    arrayOfLetters.push({xCoordinate:randomChoiceOf2XStartingPositions,yCoordinate:-20, name:name, correctAnswer:false});
  }

}

function moveLettersIfAppropriate()
{
  if (playerShouldBePlayingBird || playerShouldBePlayingSpaceShooter)
  {
    for (var letterIndex = 0; letterIndex < arrayOfLetters.length; letterIndex++)
    {
      arrayOfLetters[letterIndex].xCoordinate -= letterSpeed;//letters move right to left in bird
    }
  } else if (playerShouldBePlayingLane)
  {
    for (var letterIndex = 0; letterIndex < arrayOfLetters.length; letterIndex++)
    {
      arrayOfLetters[letterIndex].yCoordinate += letterSpeed;//letters move top to bottom in lane
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
  } else if (playerShouldBePlayingLane)
  {
    gameCanvasContext.fillStyle = laneLetterColor;
  } else if (playerShouldBePlayingJumper)
  {
    gameCanvasContext.fillStyle = jumperLetterColor;
  } else if (playerShouldBePlayingSpaceShooter)
  {
    gameCanvasContext.fillStyle = spaceShooterLetterColor;
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
  } else if (playerShouldBePlayingLane)
  {
    for (let letterIndex = 0; letterIndex < arrayOfLetters.length; letterIndex++)
    {
      if (arrayOfLetters[letterIndex].yCoordinate - 5 > playerYCoordinate && arrayOfLetters[letterIndex].yCoordinate - 5 < playerYCoordinate + 60 &&
        arrayOfLetters[letterIndex].xCoordinate === playerXCoordinate &&
        arrayOfLetters[letterIndex].name === currentCorrectLetter)
      {
        console.log('correct letter collision detected');
        amountCorrect++;
        calculateAccuracy();
        setOrResetCorrectLetter();
        arrayOfLetters.splice(letterIndex,1);
      } else if (arrayOfLetters[letterIndex].yCoordinate - 5 > playerYCoordinate && arrayOfLetters[letterIndex].yCoordinate - 5 < playerYCoordinate + 60 &&
        arrayOfLetters[letterIndex].xCoordinate === playerXCoordinate &&
        arrayOfLetters[letterIndex].name !== currentCorrectLetter)
      {
        console.log('incorrect letter collision detected');
        amountIncorrect++;
        calculateAccuracy();
        setOrResetCorrectLetter();
        arrayOfLetters.splice(letterIndex,1);
      }
    }
  }
  else if (playerShouldBePlayingJumper)
  {
    for (let letterIndex = 0; letterIndex < arrayOfLetters.length; letterIndex++)
    {
      if (playerYCoordinate + 20 > arrayOfLetters[letterIndex].yCoordinate - 20 &&
        playerYCoordinate < arrayOfLetters[letterIndex].yCoordinate &&
        playerXCoordinate + 20 > arrayOfLetters[letterIndex].xCoordinate &&
        playerXCoordinate < arrayOfLetters[letterIndex].xCoordinate + 20 &&
        arrayOfLetters[letterIndex].name === currentCorrectLetter)
      {
        console.log('correct letter collision detected');
        amountCorrect++;
        calculateAccuracy();
        setOrResetCorrectLetter();
        initializeLettersForJumper();
      } else if (playerYCoordinate + 20 > arrayOfLetters[letterIndex].yCoordinate - 20 &&
        playerYCoordinate < arrayOfLetters[letterIndex].yCoordinate &&
        playerXCoordinate + 20 > arrayOfLetters[letterIndex].xCoordinate &&
        playerXCoordinate < arrayOfLetters[letterIndex].xCoordinate + 20 &&
        arrayOfLetters[letterIndex].name !== currentCorrectLetter)
      {
        console.log('incorrect letter collision detected');
        amountIncorrect++;
        calculateAccuracy();
        setOrResetCorrectLetter();
        initializeLettersForJumper();
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
