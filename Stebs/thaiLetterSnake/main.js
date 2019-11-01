window.onload = function()
{
  gameCanvas = document.getElementById("snakeCanvas");
  gameCanvas.addEventListener('click', canvasClick, false);//canvasClick is in input.js
  canvasDrawingContext = gameCanvas.getContext("2d");
  statsCanvas = document.getElementById("statsCanvas");
  statsDrawingContext = statsCanvas.getContext("2d");
  document.addEventListener("keydown",keyPush);//keyPush is in input.js

  setCorrectLetter();
  setInterval(gameLoop, 1000/7);

}

var snake = new Snake();

var gridSize = tileCount = 20;

var letterม = new letter('ม');
var letterน = new letter('น');
var wordนา = new letter('นา');
var wordมา = new letter('มา');

letterม.x = letterม.y = 15;
letterน.x = letterน.y = 7;
wordนา.x = wordนา.y = 10;
wordมา.x = wordมา.y = 5;

var arrayOfLetters = [letterม, letterน, wordนา, wordมา];

var firstLetterAudio = true;

var amountCorrect = 0;
var amountIncorrect = 0;
var accuracy = 0;

function gameLoop()
{
  if (firstLetterAudio)
  {
    for (let i = 0; i < arrayOfLetters.length; i++)
    {
      if (arrayOfLetters[i].correctAnswer)
      {
        arrayOfLetters[i].audio.play();
        firstLetterAudio = false;
      }
    }
  }

  updateEverything();
  drawEverything();
}

function drawBackground()
{
    canvasDrawingContext.fillStyle='black';
    canvasDrawingContext.fillRect(0,0, gameCanvas.width,gameCanvas.height);
}

function updateEverything()
{
  snake.move();
  snake.handleOffScreen();
  handleSnakeCollisionsWithLetters();
}

function drawEverything()
{
  if (titleScreen)
  {
    drawTitleScreen();
  } else
  {
    drawBackground();
    snake.draw();
    drawLetters();
    drawStatsBackground();
    drawStats();
  }

}
