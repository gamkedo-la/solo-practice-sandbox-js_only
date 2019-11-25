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

function LetterClass(letterName)
{
  this.name = letterName;
  this.x = Math.random() * 780;
  this.y = (Math.floor(Math.random() * 5) * 100) + 30/*font size*/ + 20/*offset for fillText*/;

  this.draw = function()
  {
    gameCanvasContext.fillStyle = 'red';
    gameCanvasContext.font = '30px Helvetica';
    gameCanvasContext.fillText(this.name, this.x,this.y);
  }
}

var m = new LetterClass('m');
arrayOfLetters.push(m);
var n = new LetterClass('n');
arrayOfLetters.push(n);

function drawLetters()
{
  for (let lettersIndex = 0; lettersIndex < arrayOfLetters.length; lettersIndex++)
  {
    arrayOfLetters[lettersIndex].draw();
  }
}

function resetLetterPositions()
{
  for (let letterIndex = 0; letterIndex < arrayOfLetters.length; letterIndex++)
  {
    arrayOfLetters[letterIndex].x = Math.random() * 780;
    arrayOfLetters[letterIndex].y = (Math.floor(Math.random() * 5) * 100) + 30/*font size*/ + 20/*offset for fillText*/;
  }
}
