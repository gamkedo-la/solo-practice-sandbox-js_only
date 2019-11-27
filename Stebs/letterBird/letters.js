var arrayOfLetters = [];

var letterDimensionX = 45;
var letterDimensionY = 45;
var letterSpeed = 5;

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

function spawnALetter()
{
  let randomNumber = Math.random()*10;
  let name = undefined;
  if (randomNumber < 5)
  {
    name = 'm';
  } else {
    name = 'n';
  }
  arrayOfLetters.push({x:gameCanvas.width,y:Math.random()*gameCanvas.height, name:name, correctAnswer:false});
  console.log(arrayOfLetters);
}

function moveLetters()
{
  for (var letterIndex = 0; letterIndex < arrayOfLetters.length; letterIndex++)
  {
    arrayOfLetters[letterIndex].x-=letterSpeed;
  }
}

function drawLetters()
{
  gameCanvasContext.fillStyle = 'red';
  gameCanvasContext.font = '45px Helvetica';
  for (var letterIndex = 0; letterIndex < arrayOfLetters.length; letterIndex++)
  {
    gameCanvasContext.fillText(arrayOfLetters[letterIndex].name,
    arrayOfLetters[letterIndex].x-letterDimensionX/2,arrayOfLetters[letterIndex].y+13);
  }
}

function checkForLettersOffLeftSideOfScreen()
{
  for (let letterIndex = 0; letterIndex < arrayOfLetters.length; letterIndex++)
  {
    if (arrayOfLetters[letterIndex].x < 0)
    {
      arrayOfLetters.splice(letterIndex,1);
    }
  }
}
