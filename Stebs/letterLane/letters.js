var arrayOfLetters = [];

var correctLetter = undefined;

var correctLetterAudio = undefined;

function setCorrectLetter()
{
  let randomNumber = Math.random();
  if (randomNumber < 0.5)
  {
    correctLetter = 'm';
  } else {
    correctLetter = 'n'
  }
  correctLetterAudio.src = correctLetter + '.mp3';
  correctLetterAudio.play();
}

function LetterClass(randomX, letterName)
{
  this.name = letterName;
  this.x = randomX;
  this.y = -10;

  this.draw = function()
  {
    gameCanvasContext.fillStyle = 'red';
    gameCanvasContext.font = '30px Helvetica';
    gameCanvasContext.fillText(this.name, this.x,this.y);
  }
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

  let randomNumber2 = Math.random()*10;
  let randomXPosition = undefined;

  if (randomNumber2 < 5)
  {
    randomXPosition = 310;
  } else {
    randomXPosition = 460;
  }

  let newLetter = new LetterClass(randomXPosition, name);
  arrayOfLetters.push(newLetter);
  //console.log(arrayOfLetters);
}

function drawLetters()
{
  for (let letterIndex = 0; letterIndex < arrayOfLetters.length; letterIndex++)
  {
    arrayOfLetters[letterIndex].draw();
  }
}

function moveLetters()
{
  for (let letterIndex = 0; letterIndex < arrayOfLetters.length; letterIndex++)
  {
    arrayOfLetters[letterIndex].y += 3;
  }
}
